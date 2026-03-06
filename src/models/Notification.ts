import mongoose, { Schema, Document } from "mongoose";
import type { INotification } from "@/types";

export interface NotificationDocument extends Omit<INotification, "_id">, Document { }

const NotificationSchema = new Schema<NotificationDocument>(
    {
        userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
        title: { type: String, required: true },
        message: { type: String, required: true },
        type: {
            type: String,
            enum: ["info", "success", "warning", "error"],
            default: "info",
        },
        isRead: { type: Boolean, default: false },
        link: { type: String, default: "" },
    },
    { timestamps: true }
);

NotificationSchema.index({ userId: 1, isRead: 1 });

export default mongoose.models.Notification ||
    mongoose.model<NotificationDocument>("Notification", NotificationSchema);
