import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import dbConnect from "@/lib/db";
import User from "@/models/User";
import Organization from "@/models/Organization";
import { registerSchema } from "@/lib/validations";
import { generateSlug } from "@/lib/utils";

export async function POST(request: NextRequest) {
    try {
        await dbConnect();
        const body = await request.json();
        const validation = registerSchema.safeParse(body);

        if (!validation.success) {
            return NextResponse.json(
                { error: validation.error.issues[0].message },
                { status: 400 }
            );
        }

        const { name, email, password, organizationName } = validation.data;

        // Check existing user
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return NextResponse.json(
                { error: "البريد الإلكتروني مُستخدم بالفعل" },
                { status: 400 }
            );
        }

        // Hash password
        const passwordHash = await bcrypt.hash(password, 12);

        const userId = new mongoose.Types.ObjectId();

        // Create organization
        const org = await Organization.create({
            name: organizationName,
            slug: generateSlug(organizationName) + "-" + Date.now().toString(36),
            plan: "free",
            ownerId: userId,
            members: [{ userId: userId, role: "admin" }],
            billingEmail: email,
            subscriptionStatus: "active",
            usageStats: { apiCalls: 0, storageUsed: 0, activeUsers: 1 },
        });

        // Create user
        await User.create({
            _id: userId,
            name,
            email,
            passwordHash,
            role: "admin",
            plan: "free",
            organizationId: org._id,
            isActive: true,
            emailVerified: false,
        });

        return NextResponse.json(
            { message: "تم إنشاء الحساب بنجاح" },
            { status: 201 }
        );
    } catch {
        return NextResponse.json(
            { error: "حدث خطأ في إنشاء الحساب" },
            { status: 500 }
        );
    }
}
