import { sendMail } from "@/helpers/sendMail";
import  dbconnect  from "@/lib/dbconnect";
import User from "@/models/User";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    await dbconnect();
    const { username, email, password, branch, year, studentId } = await request.json();

    // Check if the user already exists and is verified
    const user = await User.findOne({ email });

    if (user && user.isVerified) {
      return NextResponse.json(
        {
          success: false,
          message: "User already exists",
        },
        { status: 400 }
      );
    }

    // Generate a 6-digit random OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpiration = new Date(Date.now() + 15 * 60 * 1000); // OTP expires in 15 minutes

    if (user) {
      // Update existing user with new OTP
      user.verifyCode = otp;
      user.verifyCodeExpires = otpExpiration;
      await user.save();
    } else {
      // Create new user with OTP
      const newUser = new User({
        username,
        email,
        password,
        branch,
        year,
        studentId,
        verifyCode: otp,
        verifyCodeExpires: otpExpiration,
      });
      await newUser.save();
    }

    // Send OTP via email
    await sendMail({
      to: email,
      subject: "Verify Your Email",
      html: `Your OTP is: <strong>${otp}</strong>. It will expire in 15 minutes.`,
    });

    return NextResponse.json(
      {
        success: true,
        message: "OTP sent to email",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Signup error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Signup failed",
      },
      { status: 500 }
    );
  }
}
