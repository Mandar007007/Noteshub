// components/Navbar.tsx
"use client";
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu"
import { MenuIcon } from "lucide-react" // Ensure you have `lucide-react` installed

export default function Navbar() {
  const router = useRouter()

  return (
    <nav className="fixed inset-x-0 top-0 z-50 bg-white shadow-sm dark:bg-gray-950/90">
      <div className="w-full max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-14">
          {/* Logo */}
          <Link href="/" className="text-element flex items-center">
            <span className="text-xl font-bold">Acme Inc</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex gap-4">
            <Link href="/" className="text-element text-sm font-medium hover:underline">
              Home
            </Link>
            <Link href="/about" className="text-element text-sm font-medium hover:underline">
              About
            </Link>
            <Link href="/services" className="text-element text-sm font-medium hover:underline">
              Services
            </Link>
            <Link href="/contact" className="text-element text-sm font-medium hover:underline">
              Contact
            </Link>
          </div>

          {/* Actions */}
          <div className="text-element flex items-center gap-4">
            <Button variant="outline" size="sm">
              Sign in
            </Button>
            <Button size="sm" onClick={() => router.push('/sign-up')}>Sign up</Button>
          </div>

          {/* Mobile Navigation */}
          <div className="text-element md:hidden">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm">
                  <MenuIcon />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent sideOffset={5} align="end" className="w-48 bg-white dark:bg-gray-950/90 shadow-lg">
                <DropdownMenuItem asChild>
                  <Link href="/" className="block px-4 py-2 text-sm">Home</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/about" className="block px-4 py-2 text-sm">About</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/services" className="block px-4 py-2 text-sm">Services</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/contact" className="block px-4 py-2 text-sm">Contact</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </nav>
  )
}
