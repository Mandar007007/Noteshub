"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectContent, SelectItem } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { signUpSchema } from "@/schemas/SignupSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux"; // Import useDispatch
import { setEmail } from "@/store/slices/verifyotp"; // Import the setEmail action

const SignupForm = () => {
  const router = useRouter();
  const dispatch = useDispatch(); // Initialize useDispatch

  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit = async (data: z.infer<typeof signUpSchema>) => {
    try {
      const response = await axios.post("http://localhost:3000/api/sign-up", { ...data, year: parseInt(data.year) }, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.data.success) {
        dispatch(setEmail(data.email)); // Dispatch the email to the Redux store
        router.push("/verify-otp"); // Navigate to the verification page
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="pt-10 flex justify-center items-center min-h-screen">
        <div className="w-full max-w-md p-8 mx-4 bg-white shadow-lg rounded-lg space-y-6">
          <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Sign Up</h2>

          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your username"
                    {...field}
                    className="w-full border-0 border-b-2 border-black focus:border-black focus:ring-0 focus:outline-none bg-transparent placeholder-gray-500"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    {...field}
                    className="w-full border-0 border-b-2 border-black focus:border-black focus:ring-0 focus:outline-none bg-transparent placeholder-gray-500"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Enter your password"
                    {...field}
                    className="w-full border-0 border-b-2 border-black focus:border-black focus:ring-0 focus:outline-none bg-transparent placeholder-gray-500"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="branch"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Branch</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="w-full border-0 border-b-2 border-black focus:border-black focus:ring-0 bg-transparent placeholder-gray-500">
                      <span>{field.value ? field.value : "Select your branch"}</span>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="CE">CE</SelectItem>
                      <SelectItem value="EC">EC</SelectItem>
                      <SelectItem value="ME">ME</SelectItem>
                      <SelectItem value="CH">CH</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="year"
            render={() => (
              <FormItem>
                <FormLabel>Year</FormLabel>
                <div className="flex gap-4">
                  {["1", "2", "3", "4"].map((year) => (
                    <label key={year} className="flex items-center gap-2 text-gray-700">
                      <input
                        {...form.register("year")}
                        type="radio"
                        value={year}
                        className="h-4 w-4 text-black border-gray-300 focus:ring-black"
                      />
                      <span className="text-sm font-medium">{year}</span>
                    </label>
                  ))}
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="studentId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Student ID</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your student ID"
                    {...field}
                    className="w-full border-0 border-b-2 border-black focus:border-black focus:ring-0 focus:outline-none bg-transparent placeholder-gray-500"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-center mt-6">
            <Button
              type="submit"
              className="px-6 py-2 bg-black border-2 border-white text-white rounded-md transition-all duration-300 hover:text-black hover:bg-white hover:shadow-[0px_0px_15px_4px_rgba(255,255,255,0.9)] hover:border-black"
            >
              Sign Up
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default SignupForm;
