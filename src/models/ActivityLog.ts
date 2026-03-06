import mongoose, { Schema, Document } from "mongoose";
import type { IActivityLog } from "@/types";

export interface ActivityLogDocument extends Omit<IActivityLog, "_id" | "userId" | "organizationId">, Document {
    userId: mongoose.Types.ObjectId;
    organizationId?: mongoose.Types.ObjectId;
}

const ActivityLogSchema = new Schema<ActivityLogDocument>(
    {
        userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
        organizationId: { type: Schema.Types.ObjectId, ref: "Organization" },
        action: { type: String, required: true },
        metadata: { type: Schema.Types.Mixed, default: {} },
        ipAddress: { type: String, default: "" },
        userAgent: { type: String, default: "" },
    },
    { timestamps: true }
);

ActivityLogSchema.index({ createdAt: -1 });
ActivityLogSchema.index({ userId: 1 });
ActivityLogSchema.index({ organizationId: 1 });

export default mongoose.models.ActivityLog ||
    mongoose.model<ActivityLogDocument>("ActivityLog", ActivityLogSchema);
