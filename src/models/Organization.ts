import mongoose, { Schema, Document } from "mongoose";
import type { IOrganization } from "@/types";

export interface OrganizationDocument extends Omit<IOrganization, "_id" | "ownerId" | "members">, Document {
    ownerId: mongoose.Types.ObjectId;
    members: { userId: mongoose.Types.ObjectId; role: string }[];
}

const OrganizationSchema = new Schema<OrganizationDocument>(
    {
        name: { type: String, required: true },
        slug: { type: String, required: true, unique: true },
        logo: { type: String, default: "" },
        plan: {
            type: String,
            enum: ["free", "pro", "enterprise"],
            default: "free",
        },
        ownerId: { type: Schema.Types.ObjectId, ref: "User", required: true },
        members: [
            {
                userId: { type: Schema.Types.ObjectId, ref: "User" },
                role: { type: String, default: "member" },
            },
        ],
        billingEmail: { type: String, default: "" },
        subscriptionStatus: {
            type: String,
            enum: ["active", "trialing", "cancelled", "past_due"],
            default: "active",
        },
        subscriptionEndsAt: { type: Date },
        monthlyRevenue: { type: Number, default: 0 },
        usageStats: {
            apiCalls: { type: Number, default: 0 },
            storageUsed: { type: Number, default: 0 },
            activeUsers: { type: Number, default: 0 },
        },
    },
    { timestamps: true }
);

export default mongoose.models.Organization ||
    mongoose.model<OrganizationDocument>("Organization", OrganizationSchema);
