import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import dbconnect from "./lib/dbconnect";
import User, { IUser } from "./models/User";

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text", placeholder: "email" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req: Request) {
                try {
                    await dbconnect();

                    const user = await User.findOne({
                        email: credentials.email,
                        isVerified: true
                    }).lean(); // Convert Mongoose document to plain object
                    
                    console.log(user);
                    if (user) {
                        return user as IUser;
                    } else {
                        return null;
                    }
                } catch (err) {
                    console.error(err);
                    return null;
                }
            }
        })
    ],
    callbacks: {
        async session({ session, token }) {
            // Customize the session to include required properties
            if (token) {
                session.user = {
                    id: token.id as string, // Ensure it's a string
                    email: token.email as string, // Include email if available
                    name: token.name as string || '', // Fallback to empty string
                    emailVerified: token.emailVerified || Date.now() // Set to null if not available
                };
            }
            return session; // return the modified session
        },
        async jwt({ token, user }) {
            // Add user info to token
            if (user) {
                token.id = user.id; // add user id to the token
                token.email = user.email; // add user email
                token.name = user.username || ''; // Add username if available
                token.emailVerified = user.emailVerified || null; // Add emailVerified if available
            }
            return token;
        }
    }
});
