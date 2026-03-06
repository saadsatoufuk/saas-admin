"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { Shield, Loader2, CheckCircle, Eye, EyeOff } from "lucide-react";
import { resetPasswordSchema, type ResetPasswordInput } from "@/lib/validations";

export default function ResetPasswordPage() {
    const [success, setSuccess] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<ResetPasswordInput>({
        resolver: zodResolver(resetPasswordSchema),
    });

    const onSubmit = async () => {
        await new Promise((r) => setTimeout(r, 1500));
        setSuccess(true);
    };

    if (success) {
        return (
            <div className="animate-fade-in text-center">
                <div className="w-14 h-14 rounded-2xl bg-success/10 border border-success/20 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-7 h-7 text-success" />
                </div>
                <h1 className="text-2xl font-bold text-white mb-2">تم تغيير كلمة المرور!</h1>
                <p className="text-sm text-muted mb-6">يمكنك الآن تسجيل الدخول بكلمة المرور الجديدة.</p>
                <Link href="/login" className="btn-primary inline-block px-6 py-2.5">
                    تسجيل الدخول
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
                <h1 className="text-2xl font-bold text-white">إعادة تعيين كلمة المرور</h1>
                <p className="text-sm text-muted mt-2">أدخل كلمة المرور الجديدة</p>
            </div>

            <div className="bg-card border border-border rounded-2xl p-6">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-muted-foreground mb-1.5">كلمة المرور الجديدة</label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                {...register("password")}
                                placeholder="••••••••"
                                className="pl-10"
                                dir="ltr"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute left-3 top-1/2 -translate-y-1/2 text-muted hover:text-white"
                            >
                                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            </button>
                        </div>
                        {errors.password && <p className="text-xs text-danger mt-1">{errors.password.message}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-muted-foreground mb-1.5">تأكيد كلمة المرور</label>
                        <input type="password" {...register("confirmPassword")} placeholder="••••••••" dir="ltr" />
                        {errors.confirmPassword && <p className="text-xs text-danger mt-1">{errors.confirmPassword.message}</p>}
                    </div>

                    <button type="submit" disabled={isSubmitting} className="btn-primary w-full flex items-center justify-center gap-2 py-3">
                        {isSubmitting ? (
                            <>
                                <Loader2 className="w-4 h-4 animate-spin" />
                                جاري التحديث...
                            </>
                        ) : (
                            "تحديث كلمة المرور"
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
}
