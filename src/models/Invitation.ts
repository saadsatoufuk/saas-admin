import mongoose, { Schema, Document } from "mongoose";
import type { IInvitation } from "@/types";

export interface InvitationDocument extends Omit<IInvitation, "_id" | "organizationId" | "invitedBy">, Document {
    organizationId: mongoose.Types.ObjectId;
    invitedBy: mongoose.Types.ObjectId;
}

const InvitationSchema = new Schema<InvitationDocument>(
    {
        organizationId: { type: Schema.Types.ObjectId, ref: "Organization", required: true },
        invitedEmail: { type: String, required: true },
        invitedBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
        role: { type: String, default: "member" },
        token: { type: String, required: true, unique: true },
        status: {
            type: String,
            enum: ["pending", "accepted", "expired"],
            default: "pending",
        },
        expiresAt: { type: Date, required: true },
    },
    { timestamps: true }
);

export default mongoose.models.Invitation ||
    mongoose.model<InvitationDocument>("Invitation", InvitationSchema);
