"use client";

import { useState } from "react";
import { Shield, Loader2, CheckCircle, UserPlus } from "lucide-react";
import Link from "next/link";

export default function InvitePage() {
    const [status, setStatus] = useState<"pending" | "success" | "error">("pending");
    const [loading, setLoading] = useState(false);

    const handleAccept = async () => {
        setLoading(true);
        await new Promise((r) => setTimeout(r, 2000));
        setStatus("success");
        setLoading(false);
    };

    if (status === "success") {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center p-4">
                <div className="animate-fade-in text-center max-w-md">
                    <div className="w-14 h-14 rounded-2xl bg-success/10 border border-success/20 flex items-center justify-center mx-auto mb-4">
                        <CheckCircle className="w-7 h-7 text-success" />
                    </div>
                    <h1 className="text-2xl font-bold text-white mb-2">تم قبول الدعوة!</h1>
                    <p className="text-sm text-muted mb-6">تم إضافتك للفريق بنجاح. سجّل الدخول للبدء.</p>
                    <Link href="/login" className="btn-primary inline-block px-6 py-2.5">تسجيل الدخول</Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background flex items-center justify-center p-4">
            <div className="animate-fade-in text-center max-w-md">
                <div className="w-14 h-14 rounded-2xl bg-accent/10 border border-accent/20 flex items-center justify-center mx-auto mb-4">
                    <UserPlus className="w-7 h-7 text-accent" />
                </div>
                <h1 className="text-2xl font-bold text-white mb-2">دعوة للانضمام</h1>
                <p className="text-sm text-muted mb-2">لقد تمت دعوتك للانضمام إلى فريق المنظمة</p>

                <div className="bg-card border border-border rounded-2xl p-6 mt-6">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
                            <Shield className="w-5 h-5 text-accent" />
                        </div>
                        <div className="text-right">
                            <p className="font-medium text-white">منظمة تجريبية</p>
                            <p className="text-xs text-muted">دور: عضو</p>
                        </div>
                    </div>

                    <button
                        onClick={handleAccept}
                        disabled={loading}
                        className="btn-primary w-full flex items-center justify-center gap-2 py-3"
                    >
                        {loading ? (
                            <>
                                <Loader2 className="w-4 h-4 animate-spin" />
                                جاري القبول...
                            </>
                        ) : (
                            "قبول الدعوة"
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
}
