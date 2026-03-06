import mongoose, { Schema, Document } from "mongoose";
import type { IUser } from "@/types";

export interface UserDocument extends Omit<IUser, "_id">, Document { }

const UserSchema = new Schema<UserDocument>(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        passwordHash: { type: String, required: true },
        role: {
            type: String,
            enum: ["superadmin", "admin", "member"],
            default: "member",
        },
        avatar: { type: String, default: "" },
        plan: {
            type: String,
            enum: ["free", "pro", "enterprise"],
            default: "free",
        },
        organizationId: { type: Schema.Types.ObjectId, ref: "Organization" },
        lastLogin: { type: Date, default: Date.now },
        isActive: { type: Boolean, default: true },
        emailVerified: { type: Boolean, default: false },
    },
    { timestamps: true }
);

export default mongoose.models.User || mongoose.model<UserDocument>("User", UserSchema);
