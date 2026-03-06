"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Shield, Loader2, Eye, EyeOff } from "lucide-react";
import { loginSchema, type LoginInput } from "@/lib/validations";

export default function LoginPage() {
    const router = useRouter();
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<LoginInput>({
        resolver: zodResolver(loginSchema),
    });

    const onSubmit = async (data: LoginInput) => {
        try {
            setError("");
            const result = await signIn("credentials", {
                email: data.email,
                password: data.password,
                redirect: false,
            });

            if (result?.error) {
                setError("البريد الإلكتروني أو كلمة المرور غير صحيحة");
                return;
            }

            router.push("/dashboard");
            router.refresh();
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
                <h1 className="text-2xl font-bold text-white">مرحباً بعودتك</h1>
                <p className="text-sm text-muted mt-2">سجّل الدخول إلى حسابك</p>
            </div>

            <div className="bg-card border border-border rounded-2xl p-6">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    {error && (
                        <div className="p-3 rounded-xl bg-danger/10 border border-danger/20 text-sm text-danger">
                            {error}
                        </div>
                    )}

                    <div>
                        <label className="block text-sm font-medium text-muted-foreground mb-1.5">
                            البريد الإلكتروني
                        </label>
                        <input
                            type="email"
                            {...register("email")}
                            placeholder="you@example.com"
                            className="w-full"
                            dir="ltr"
                        />
                        {errors.email && (
                            <p className="text-xs text-danger mt-1">{errors.email.message}</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-muted-foreground mb-1.5">
                            كلمة المرور
                        </label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                {...register("password")}
                                placeholder="••••••••"
                                className="w-full pl-10"
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
                        {errors.password && (
                            <p className="text-xs text-danger mt-1">{errors.password.message}</p>
                        )}
                    </div>

                    <div className="flex items-center justify-between">
                        <label className="flex items-center gap-2 text-sm text-muted cursor-pointer">
                            <input type="checkbox" className="w-4 h-4 rounded border-border bg-surface accent-accent" />
                            تذكرني
                        </label>
                        <Link href="/forgot-password" className="text-sm text-accent hover:text-accent-hover transition-colors">
                            نسيت كلمة المرور؟
                        </Link>
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="btn-primary w-full flex items-center justify-center gap-2 py-3"
                    >
                        {isSubmitting ? (
                            <>
                                <Loader2 className="w-4 h-4 animate-spin" />
                                جاري تسجيل الدخول...
                            </>
                        ) : (
                            "تسجيل الدخول"
                        )}
                    </button>
                </form>

                <div className="mt-6 text-center">
                    <p className="text-sm text-muted">
                        ليس لديك حساب؟{" "}
                        <Link href="/register" className="text-accent hover:text-accent-hover font-medium transition-colors">
                            إنشاء حساب
                        </Link>
                    </p>
                </div>
            </div>

            <p className="text-center text-xs text-muted mt-6">
                حساب تجريبي: admin@demo.com / password123
            </p>
        </div>
    );
}
