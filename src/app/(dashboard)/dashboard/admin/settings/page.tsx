"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/components/ui/Toast";
import { siteSettingsSchema, type SiteSettingsInput } from "@/lib/validations";
import { Palette, Loader2, Upload, Globe, Phone, Mail, FileText } from "lucide-react";

export default function AdminSettingsPage() {
    const { showToast } = useToast();
    const [loading, setLoading] = useState(true);

    const {
        register,
        handleSubmit,
        reset,
        watch,
        formState: { errors, isSubmitting },
    } = useForm<SiteSettingsInput>({
        resolver: zodResolver(siteSettingsSchema),
    });

    const primaryColor = watch("primaryColor");

    useEffect(() => {
        fetch("/api/settings")
            .then((r) => r.json())
            .then((data) => {
                reset({
                    siteName: data.siteName || "مشروعي",
                    logoUrl: data.logoUrl || "/logo.png",
                    primaryColor: data.primaryColor || "#6366F1",
                    contactEmail: data.contactEmail || "hello@example.com",
                    phone: data.phone || "",
                    footerText: data.footerText || "© 2025 مشروعي",
                });
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, [reset]);

    const onSubmit = async (data: SiteSettingsInput) => {
        try {
            const res = await fetch("/api/admin/settings", {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            if (!res.ok) {
                const err = await res.json();
                throw new Error(err.error);
            }

            // Update CSS variable
            document.documentElement.style.setProperty("--color-primary", data.primaryColor);
            showToast({ type: "success", title: "تم حفظ إعدادات الموقع بنجاح" });
        } catch (err: unknown) {
            showToast({
                type: "error",
                title: "حدث خطأ",
                message: err instanceof Error ? err.message : "تعذر حفظ الإعدادات",
            });
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center py-20">
                <Loader2 className="w-6 h-6 animate-spin text-accent" />
            </div>
        );
    }

    return (
        <div className="space-y-6 animate-fade-in max-w-2xl">
            <div>
                <h1 className="text-2xl font-bold text-white">إعدادات الموقع</h1>
                <p className="text-sm text-muted mt-1">تخصيص العلامة التجارية والمعلومات الأساسية</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="bg-card rounded-xl border border-border p-6 space-y-5">
                    <div className="flex items-center gap-3 mb-2">
                        <Palette className="w-5 h-5 text-accent" />
                        <h3 className="text-base font-semibold text-white">العلامة التجارية</h3>
                    </div>

                    <div>
                        <label className="flex items-center gap-2 text-sm font-medium text-muted-foreground mb-1.5">
                            <Globe className="w-4 h-4" />
                            اسم الموقع
                        </label>
                        <input type="text" {...register("siteName")} />
                        {errors.siteName && <p className="text-xs text-danger mt-1">{errors.siteName.message}</p>}
                    </div>

                    <div>
                        <label className="flex items-center gap-2 text-sm font-medium text-muted-foreground mb-1.5">
                            <Upload className="w-4 h-4" />
                            رابط الشعار
                        </label>
                        <input type="text" {...register("logoUrl")} dir="ltr" placeholder="/logo.png" />
                    </div>

                    <div>
                        <label className="flex items-center gap-2 text-sm font-medium text-muted-foreground mb-1.5">
                            <Palette className="w-4 h-4" />
                            اللون الرئيسي
                        </label>
                        <div className="flex items-center gap-3">
                            <input type="color" {...register("primaryColor")} className="w-12 h-10 rounded-lg border border-border bg-surface cursor-pointer p-1" />
                            <input type="text" value={primaryColor || ""} readOnly className="flex-1 font-mono text-sm" dir="ltr" />
                            <div className="w-10 h-10 rounded-xl border border-border" style={{ backgroundColor: primaryColor }} />
                        </div>
                        {errors.primaryColor && <p className="text-xs text-danger mt-1">{errors.primaryColor.message}</p>}
                    </div>
                </div>

                <div className="bg-card rounded-xl border border-border p-6 space-y-5">
                    <h3 className="text-base font-semibold text-white">معلومات الاتصال</h3>

                    <div>
                        <label className="flex items-center gap-2 text-sm font-medium text-muted-foreground mb-1.5">
                            <Mail className="w-4 h-4" />
                            البريد الإلكتروني
                        </label>
                        <input type="email" {...register("contactEmail")} dir="ltr" />
                        {errors.contactEmail && <p className="text-xs text-danger mt-1">{errors.contactEmail.message}</p>}
                    </div>

                    <div>
                        <label className="flex items-center gap-2 text-sm font-medium text-muted-foreground mb-1.5">
                            <Phone className="w-4 h-4" />
                            رقم الهاتف
                        </label>
                        <input type="tel" {...register("phone")} dir="ltr" placeholder="+966 5xx xxx xxx" />
                    </div>

                    <div>
                        <label className="flex items-center gap-2 text-sm font-medium text-muted-foreground mb-1.5">
                            <FileText className="w-4 h-4" />
                            نص التذييل
                        </label>
                        <input type="text" {...register("footerText")} />
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-primary w-full flex items-center justify-center gap-2 py-3"
                >
                    {isSubmitting ? (
                        <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            جاري الحفظ...
                        </>
                    ) : (
                        "حفظ الإعدادات"
                    )}
                </button>
            </form>
        </div>
    );
}
