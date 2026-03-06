"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { Shield, Loader2, ArrowRight, CheckCircle } from "lucide-react";
import { forgotPasswordSchema, type ForgotPasswordInput } from "@/lib/validations";

export default function ForgotPasswordPage() {
    const [submitted, setSubmitted] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<ForgotPasswordInput>({
        resolver: zodResolver(forgotPasswordSchema),
    });

    const onSubmit = async () => {
        // Simulate API call
        await new Promise((r) => setTimeout(r, 1500));
        setSubmitted(true);
    };

    if (submitted) {
        return (
            <div className="animate-fade-in text-center">
                <div className="w-14 h-14 rounded-2xl bg-success/10 border border-success/20 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-7 h-7 text-success" />
                </div>
                <h1 className="text-2xl font-bold text-white mb-2">تم الإرسال!</h1>
                <p className="text-sm text-muted mb-6">
                    تم إرسال رابط إعادة تعيين كلمة المرور إلى بريدك الإلكتروني.
                </p>
                <Link href="/login" className="text-accent hover:text-accent-hover text-sm font-medium">
                    العودة لتسجيل الدخول
                </Link>
            </div>
        );
    }

    return (
        <div className="animate-fade-in">
            <div className="text-center mb-8">
                <div className="w-14 h-14 rounded-2xl bg-accent/10 border border-accent/20 flex items-center justify-center mx-auto mb-4">
                    <Shield className="w-7 h-7 text-accent" />
                </div>
                <h1 className="text-2xl font-bold text-white">نسيت كلمة المرور؟</h1>
                <p className="text-sm text-muted mt-2">أدخل بريدك الإلكتروني وسنرسل لك رابط إعادة التعيين</p>
            </div>

            <div className="bg-card border border-border rounded-2xl p-6">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-muted-foreground mb-1.5">
                            البريد الإلكتروني
                        </label>
                        <input type="email" {...register("email")} placeholder="you@example.com" dir="ltr" />
                        {errors.email && <p className="text-xs text-danger mt-1">{errors.email.message}</p>}
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="btn-primary w-full flex items-center justify-center gap-2 py-3"
                    >
                        {isSubmitting ? (
                            <>
                                <Loader2 className="w-4 h-4 animate-spin" />
                                جاري الإرسال...
                            </>
                        ) : (
                            "إرسال رابط التعيين"
                        )}
                    </button>
                </form>

                <div className="mt-6 text-center">
                    <Link
                        href="/login"
                        className="inline-flex items-center gap-1 text-sm text-muted hover:text-white transition-colors"
                    >
                        <ArrowRight className="w-4 h-4" />
                        العودة لتسجيل الدخول
                    </Link>
                </div>
            </div>
        </div>
    );
}
