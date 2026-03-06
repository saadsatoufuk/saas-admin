/* eslint-disable @typescript-eslint/no-explicit-any */
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import dbConnect from "./db";
import User from "@/models/User";

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        Credentials({
            name: "credentials",
            credentials: {
                email: { label: "البريد الإلكتروني", type: "email" },
                password: { label: "كلمة المرور", type: "password" },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    return null;
                }

                await dbConnect();

                const user = await User.findOne({ email: credentials.email }).lean();
                if (!user || !user.isActive) {
                    return null;
                }

                const hashToCompare = user.passwordHash || (user as any).password;
                if (!hashToCompare) {
                    return null;
                }

                const isValid = await bcrypt.compare(
                    credentials.password as string,
                    hashToCompare
                );
                if (!isValid) {
                    return null;
                }

                // Update last login
                await User.findByIdAndUpdate(user._id, { lastLogin: new Date() });

                return {
                    id: user._id.toString(),
                    name: user.name,
                    email: user.email,
                    role: user.role,
                    plan: user.plan,
                    organizationId: user.organizationId?.toString() || "",
                    avatar: user.avatar,
                };
            },
        }),
    ],
    session: {
        strategy: "jwt",
        maxAge: 30 * 24 * 60 * 60, // 30 days
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.role = (user as any).role;
                token.plan = (user as any).plan;
                token.organizationId = (user as any).organizationId;
                token.avatar = (user as any).avatar;
            }
            return token;
        },
        async session({ session, token }) {
            if (session.user) {
                (session.user as any).id = token.id as string;
                (session.user as any).role = token.role as string;
                (session.user as any).plan = token.plan as string;
                (session.user as any).organizationId = token.organizationId as string;
                (session.user as any).avatar = token.avatar as string;
            }
            return session;
        },
    },
    pages: {
        signIn: "/login",
        error: "/login",
    },
    secret: process.env.NEXTAUTH_SECRET || "super-secret-key-change-in-production",
});
