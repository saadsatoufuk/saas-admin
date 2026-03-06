import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import SiteSettings from "@/models/SiteSettings";
import { auth } from "@/lib/auth";
import { siteSettingsSchema } from "@/lib/validations";

export async function PATCH(request: NextRequest) {
    try {
        const session = await auth();
        if (!session?.user || (session.user as Record<string, unknown>).role !== "superadmin") {
            return NextResponse.json({ error: "غير مصرح" }, { status: 403 });
        }

        const body = await request.json();
        const validation = siteSettingsSchema.safeParse(body);
        if (!validation.success) {
            return NextResponse.json(
                { error: validation.error.issues[0].message },
                { status: 400 }
            );
        }

        await dbConnect();
        const settings = await SiteSettings.findOneAndUpdate(
            {},
            { ...validation.data, updatedAt: new Date() },
            { new: true, upsert: true }
        );

        return NextResponse.json(settings);
    } catch {
        return NextResponse.json(
            { error: "حدث خطأ في تحديث الإعدادات" },
            { status: 500 }
        );
    }
}
