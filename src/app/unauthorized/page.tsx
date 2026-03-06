import Link from "next/link";
import { ShieldOff, ArrowRight } from "lucide-react";

export default function UnauthorizedPage() {
    return (
        <div className="min-h-screen bg-background flex items-center justify-center p-4">
            <div className="text-center animate-fade-in max-w-md">
                <div className="w-20 h-20 rounded-3xl bg-danger/10 border border-danger/20 flex items-center justify-center mx-auto mb-6">
                    <ShieldOff className="w-10 h-10 text-danger" />
                </div>
                <h1 className="text-3xl font-bold text-white mb-3">غير مصرح</h1>
                <p className="text-muted mb-8">
                    ليس لديك الصلاحية للوصول إلى هذه الصفحة. تواصل مع مدير النظام إذا كنت تعتقد أن هذا خطأ.
                </p>
                <Link
                    href="/dashboard"
                    className="btn-primary inline-flex items-center gap-2 px-6 py-3"
                >
                    <ArrowRight className="w-4 h-4" />
                    العودة للوحة التحكم
                </Link>
            </div>
        </div>
    );
}
