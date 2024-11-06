import mongoose, { Schema, Document } from "mongoose";
import bcrypt from "bcryptjs";

export interface IUser extends Document {
    username: string;
    email: string;
    password: string;
    branch: string;
    year: number;
    studentId: string;
    role: string;
    isVerified: boolean;
    verifyCode: string;
    verifyCodeExpires: Date;
}

const userSchema: Schema<IUser> = new Schema({
    username: { type: String, required: true, unique: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true, lowercase: true },
    password: { type: String, required: true, minlength: [6, "Password must be at least 6 characters long"] },
    branch: { type: String, required: true },
    year: { type: Number, required: true },
    studentId: { type: String, required: true, unique: true },
    role: { type: String, enum: ["admin", "user"], default: "user" },
    isVerified: { type: Boolean, default: false },
    verifyCode: { type: String },
    verifyCodeExpires: { type: Date }
});

userSchema.pre<IUser>("save", async function () {
    if (this.isModified("password")) {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
    }
});

userSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
    return await bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.models?.User || mongoose.model<IUser>("User", userSchema);

export default User;
