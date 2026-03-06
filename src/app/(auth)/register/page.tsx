"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Shield, Loader2, Eye, EyeOff } from "lucide-react";
import { registerSchema, type RegisterInput } from "@/lib/validations";

export default function RegisterPage() {
    const router = useRouter();
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<RegisterInput>({
        resolver: zodResolver(registerSchema),
    });

    const onSubmit = async (data: RegisterInput) => {
        try {
            setError("");
            const res = await fetch("/api/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            const result = await res.json();
            if (!res.ok) {
                setError(result.error || "حدث خطأ في التسجيل");
                return;
            }

            router.push("/login?registered=true");
        } catch {
            setError("حدث خطأ غير متوقع. حاول مرة أخرى.");
        }
    };

    return (
        <div className="animate-fade-in">
            <div className="text-center mb-8">
                <div className="w-14 h-14 rounded-2xl bg-accent/10 border border-accent/20 flex items-center justify-center mx-auto mb-4">
                    <Shield className="w-7 h-7 text-accent" />
                </div>
                <h1 className="text-2xl font-bold text-white">إنشاء حساب جديد</h1>
                <p className="text-sm text-muted mt-2">انضم إلينا وابدأ رحلتك</p>
            </div>

            <div className="bg-card border border-border rounded-2xl p-6">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    {error && (
                        <div className="p-3 rounded-xl bg-danger/10 border border-danger/20 text-sm text-danger">
                            {error}
                        </div>
                    )}

                    <div>
                        <label className="block text-sm font-medium text-muted-foreground mb-1.5">الاسم الكامل</label>
                        <input type="text" {...register("name")} placeholder="أحمد محمد" />
                        {errors.name && <p className="text-xs text-danger mt-1">{errors.name.message}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-muted-foreground mb-1.5">البريد الإلكتروني</label>
                        <input type="email" {...register("email")} placeholder="you@example.com" dir="ltr" />
                        {errors.email && <p className="text-xs text-danger mt-1">{errors.email.message}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-muted-foreground mb-1.5">كلمة المرور</label>
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
                                className="absolute left-3 top-1/2 -translate-y-1/2 text-muted hover:text-white transition-colors"
                            >
                                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            </button>
                        </div>
                        {errors.password && <p className="text-xs text-danger mt-1">{errors.password.message}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-muted-foreground mb-1.5">اسم المنظمة</label>
                        <input type="text" {...register("organizationName")} placeholder="شركتي" />
                        {errors.organizationName && <p className="text-xs text-danger mt-1">{errors.organizationName.message}</p>}
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="btn-primary w-full flex items-center justify-center gap-2 py-3"
                    >
                        {isSubmitting ? (
                            <>
                                <Loader2 className="w-4 h-4 animate-spin" />
                                جاري إنشاء الحساب...
                            </>
                        ) : (
                            "إنشاء حساب"
                        )}
                    </button>
                </form>

                <div className="mt-6 text-center">
                    <p className="text-sm text-muted">
                        لديك حساب بالفعل؟{" "}
                        <Link href="/login" className="text-accent hover:text-accent-hover font-medium transition-colors">
                            تسجيل الدخول
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
