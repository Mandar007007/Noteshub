import { dbconnect } from "@/lib/dbconnect";
import User from "@/models/User";

export async function POST(request: Request) {
    try{
        await dbconnect();
        const {email,otp} = await request.json();
        const user = await User.findOne({email});

        if(!user){
            return Response.json({
                success:false,
                message:"User not found"
            },{
                status:400
            })
        }
        if(user.verifyCode !== otp)
        {
            return Response.json({
                success:false,
                message:"otp is not valid"
            },{
                status:402
            })
        }

        // Check if the OTP has expired
        if (user.verifyCodeExpires < new Date()) {
            return Response.json({
                success: false,
                message: "OTP has been expired"
            }, {
                status: 400
            });
        }else{
            user.isVerified = true;
            await user.save();
            return Response.json({
                success:true,
                message:"OTP verified successfully"
            },{
                status:200
            })
        }


    }catch(error){
        console.log(error);
        return Response.json({
            success:false,
            message:"Internal Server Error"
        },{
            status:500
        })
    }
}
