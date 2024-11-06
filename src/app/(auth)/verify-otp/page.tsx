"use client";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { z } from "zod";

// Define a schema for OTP
const otpSchema = z.object({
  otp: z.string().length(6, "OTP must be exactly 6 digits"),
});

const Page = () => {
  const form = useForm({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      otp: "",
    },
  });

  const email = useSelector(state => state.verifyEmailSlice.email)

  const [otpArray, setOtpArray] = useState(["", "", "", "", "", ""]);

  const handleOtpChange = (e, index) => {
    const value = e.target.value;
    if (!/^\d?$/.test(value)) return; // Only allow a single digit

    const newOtpArray = [...otpArray];
    newOtpArray[index] = value;
    setOtpArray(newOtpArray);
    form.setValue("otp", newOtpArray.join("")); // Update form OTP value

    // Move focus to the next input
    if (value && index < otpArray.length - 1) {
      document.getElementById(`otp-slot-${index + 1}`)?.focus();
    }
  };

  const onSubmit = async (data : z.infer<typeof otpSchema>) => {
    try{
      const response = await axios.post("http://localhost:3000/api/verify-otp",{email,otp:data.otp})
      console.log(response)
    }catch(err)
    {
      console.log(err)
    }
    // alert(`OTP Submitted: ${data.otp}`);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-element text-2xl font-semibold text-gray-800 mb-6">Verify OTP</h1>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full max-w-sm space-y-4">
          <FormField
            name="otp"
            control={form.control}
            render={() => (
              <FormItem>
                <FormLabel>Enter OTP</FormLabel>
                <FormControl>
                  <div className="flex gap-2">
                    {otpArray.map((digit, index) => (
                      <input
                        key={index}
                        id={`otp-slot-${index}`}
                        type="text"
                        maxLength="1"
                        value={digit}
                        onChange={(e) => handleOtpChange(e, index)}
                        className="text-element w-12 h-12 text-center border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 transition duration-200"
                      />
                    ))}
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <button
            type="submit"
            className="mt-4 w-full py-2 bg-black text-white rounded-md hover:bg-white hover:text-black hover:border hover:border-black transition duration-200 ease-in-out"
          >
            Submit
          </button>
        </form>
      </Form>
    </div>
  );
};

export default Page;
