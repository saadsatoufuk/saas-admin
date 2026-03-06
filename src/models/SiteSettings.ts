import mongoose, { Schema, Document } from "mongoose";
import type { ISiteSettings } from "@/types";

export interface SiteSettingsDocument extends Omit<ISiteSettings, "_id">, Document { }

const SiteSettingsSchema = new Schema<SiteSettingsDocument>(
    {
        siteName: { type: String, default: "مشروعي" },
        logoUrl: { type: String, default: "/logo.png" },
        primaryColor: { type: String, default: "#6366F1" },
        contactEmail: { type: String, default: "hello@example.com" },
        phone: { type: String, default: "" },
        footerText: { type: String, default: "© 2025 مشروعي" },
    },
    { timestamps: true }
);

export default mongoose.models.SiteSettings ||
    mongoose.model<SiteSettingsDocument>("SiteSettings", SiteSettingsSchema);
