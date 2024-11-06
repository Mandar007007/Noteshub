"use client"; // Keep this at the top since we're using hooks

// import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "./Navbar/Navbar";
import { useRef } from "react";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});
import {Provider} from "react-redux"
import store from "@/store/store";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const circleRef = useRef<HTMLDivElement>(null);

  const cursorFunc = (e: MouseEvent) => {
    const circle = circleRef.current;
    const x = e.clientX;
    const y = e.clientY;

    if (circle) {
      circle.style.left = `${x}px`;
      circle.style.top = `${y}px`;

      // Check for intersection with text and navbar
      const textElements = document.querySelectorAll('.text-element');
      const navbar = document.querySelector('.navbar');
      let isIntersecting = false;

      // Check against text elements
      textElements.forEach((textElement) => {
        const rect = textElement.getBoundingClientRect();
        if (
          x >= rect.left &&
          x <= rect.right &&
          y >= rect.top &&
          y <= rect.bottom
        ) {
          isIntersecting = true;
        }
      });

      // Check against the navbar
      if (navbar) {
        const navbarRect = navbar.getBoundingClientRect();
        if (
          x >= navbarRect.left &&
          x <= navbarRect.right &&
          y >= navbarRect.top &&
          y <= navbarRect.bottom
        ) {
          isIntersecting = true;
        }
      }

      // Scale the circle based on intersection
      if (isIntersecting) {
        circle.style.transform = 'translate(-50%, -50%) scale(1.5)'; // Scale up
      } else {
        circle.style.transform = 'translate(-50%, -50%) scale(1)'; // Reset scale
      }
    }
  };

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased overflow-x-hidden`}
        onMouseMove={cursorFunc} // Keep the cursor events for tracking
      >
        <Navbar className="navbar" />
        {/* <div className="fixed top-0 left-0 w-12 h-12 bg-white rounded-full mix-blend-mode transition duration-100 z-50 pointer-events-none" style={{
          transition: "0.1s",
          mixBlendMode: 'difference',
        }} ref={circleRef}></div> */}
        <div className="px-4 md:px-8 lg:px-16">
          <Provider store={store}>
            {children}
          </Provider>
        </div>
      </body>
    </html>
  );
}
