import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import SiteSettings from "@/models/SiteSettings";

export async function GET() {
    try {
        await dbConnect();
        let settings = await SiteSettings.findOne();
        if (!settings) {
            settings = await SiteSettings.create({
                siteName: "مشروعي",
                logoUrl: "/logo.png",
                primaryColor: "#6366F1",
                contactEmail: "hello@example.com",
                phone: "",
                footerText: "© 2025 مشروعي",
            });
        }
        return NextResponse.json(settings);
    } catch {
        return NextResponse.json(
            { error: "حدث خطأ في جلب الإعدادات" },
            { status: 500 }
        );
    }
}
