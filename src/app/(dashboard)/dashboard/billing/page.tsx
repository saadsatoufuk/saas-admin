"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { StatsCard } from "@/components/ui/StatsCard";
import { PlanBadge, StatusBadge, Badge } from "@/components/ui/Badge";
import { Pagination } from "@/components/ui/Pagination";
import { AreaChartComponent } from "@/components/charts/AreaChart";
import { useToast } from "@/components/ui/Toast";
import { formatCurrency } from "@/lib/utils";
import {
    DollarSign,
    TrendingUp,
    CreditCard,
    Receipt,
    Check,
    Star,
    Download,
} from "lucide-react";

const revenueByPlan = [
    { month: "يناير", free: 0, pro: 2400, enterprise: 1800 },
    { month: "فبراير", free: 0, pro: 2800, enterprise: 2000 },
    { month: "مارس", free: 0, pro: 3100, enterprise: 2200 },
    { month: "أبريل", free: 0, pro: 2900, enterprise: 2400 },
    { month: "مايو", free: 0, pro: 3500, enterprise: 2100 },
    { month: "يونيو", free: 0, pro: 3800, enterprise: 2800 },
];

const subscriptions = Array.from({ length: 15 }, (_, i) => ({
    id: `sub-${i + 1}`,
    org: ["شركة التقنية", "مؤسسة الابتكار", "مجموعة النجاح", "شركة الرؤية", "مشاريع المستقبل"][i % 5],
    plan: (["pro", "enterprise", "pro", "enterprise", "pro"] as const)[i % 5],
    amount: [49, 199, 49, 199, 49][i % 5],
    status: (["active", "active", "trialing", "active", "past_due"] as const)[i % 5],
    nextBilling: new Date(Date.now() + Math.random() * 1000 * 60 * 60 * 24 * 30),
}));

const billingHistory = [
    { id: "1", date: "2025-02-01", description: "اشتراك شهري - احترافي", amount: 49, status: "paid" },
    { id: "2", date: "2025-01-01", description: "اشتراك شهري - احترافي", amount: 49, status: "paid" },
    { id: "3", date: "2024-12-01", description: "ترقية إلى احترافي", amount: 49, status: "paid" },
    { id: "4", date: "2024-11-15", description: "اشتراك شهري - مجاني", amount: 0, status: "paid" },
];

const plans = [
    {
        id: "free",
        name: "مجاني",
        price: 0,
        features: ["1,000 طلب API شهرياً", "1 GB تخزين", "3 أعضاء", "دعم عبر البريد"],
        isCurrent: true,
    },
    {
        id: "pro",
        name: "احترافي",
        price: 49,
        features: ["50,000 طلب API شهرياً", "10 GB تخزين", "15 عضو", "دعم سريع", "تحليلات متقدمة"],
        isCurrent: false,
        popular: true,
    },
    {
        id: "enterprise",
        name: "مؤسسات",
        price: 199,
        features: ["طلبات غير محدودة", "100 GB تخزين", "أعضاء غير محدود", "دعم مخصص 24/7", "SLA", "API مخصص"],
        isCurrent: false,
    },
];

function AdminBilling() {
    const [page, setPage] = useState(1);

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatsCard title="الإيراد الشهري (MRR)" value={formatCurrency(8900)} change={8.2} icon={DollarSign} iconColor="text-success" />
                <StatsCard title="الإيراد السنوي (ARR)" value={formatCurrency(106800)} change={12.5} icon={TrendingUp} iconColor="text-accent" />
                <StatsCard title="إجمالي الإيرادات" value={formatCurrency(245000)} icon={Receipt} iconColor="text-warning" />
                <StatsCard title="متوسط الإيراد/حساب" value={formatCurrency(42)} change={3.1} icon={CreditCard} iconColor="text-muted" />
            </div>

            <div className="bg-card rounded-xl border border-border p-6">
                <h3 className="text-base font-semibold text-white mb-4">الإيراد حسب الخطة</h3>
                <AreaChartComponent data={revenueByPlan} dataKey="pro" xAxisKey="month" color="#6366F1" />
            </div>

            <div className="bg-card rounded-xl border border-border overflow-hidden">
                <div className="p-6 pb-0">
                    <h3 className="text-base font-semibold text-white">الاشتراكات</h3>
                </div>
                <div className="overflow-x-auto">
                    <table>
                        <thead>
                            <tr>
                                <th>المنظمة</th>
                                <th>الخطة</th>
                                <th>المبلغ</th>
                                <th>الحالة</th>
                                <th>الفاتورة القادمة</th>
                            </tr>
                        </thead>
                        <tbody>
                            {subscriptions.slice(0, 10).map((sub) => (
                                <tr key={sub.id}>
                                    <td className="font-medium text-white">{sub.org}</td>
                                    <td><PlanBadge plan={sub.plan} /></td>
                                    <td>{formatCurrency(sub.amount)}</td>
                                    <td><StatusBadge status={sub.status} /></td>
                                    <td className="text-sm text-muted">{sub.nextBilling.toLocaleDateString("ar-SA")}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <Pagination currentPage={page} totalPages={2} totalItems={subscriptions.length} pageSize={10} onPageChange={setPage} />
            </div>
        </div>
    );
}

function UserBilling() {
    const { showToast } = useToast();

    return (
        <div className="space-y-6">
            {/* Current Plan */}
            <div className="bg-card rounded-xl border border-border p-6">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-base font-semibold text-white">الخطة الحالية</h3>
                    <PlanBadge plan="free" />
                </div>
                <p className="text-sm text-muted mb-4">أنت حالياً على الخطة المجانية. قم بالترقية للحصول على ميزات إضافية.</p>
                <div className="text-sm text-muted">الفاتورة القادمة: <span className="text-white">لا توجد</span></div>
            </div>

            {/* Plan Cards */}
            <div>
                <h3 className="text-lg font-semibold text-white mb-4">ترقية خطتك</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {plans.map((plan) => (
                        <div
                            key={plan.id}
                            className={`relative bg-card rounded-2xl border p-6 transition-all ${plan.popular
                                    ? "border-accent shadow-lg shadow-accent/10"
                                    : plan.isCurrent
                                        ? "border-success/30"
                                        : "border-border hover:border-accent/30"
                                }`}
                        >
                            {plan.popular && (
                                <div className="absolute -top-3 right-4">
                                    <Badge variant="accent" size="md">
                                        <Star className="w-3 h-3 ml-1" />
                                        الأكثر شعبية
                                    </Badge>
                                </div>
                            )}
                            <h4 className="text-lg font-semibold text-white">{plan.name}</h4>
                            <div className="mt-2 mb-4">
                                <span className="text-3xl font-bold text-white">${plan.price}</span>
                                <span className="text-sm text-muted">/شهر</span>
                            </div>
                            <ul className="space-y-2 mb-6">
                                {plan.features.map((f, i) => (
                                    <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                                        <Check className="w-4 h-4 text-success shrink-0" />
                                        {f}
                                    </li>
                                ))}
                            </ul>
                            {plan.isCurrent ? (
                                <button className="btn-ghost w-full" disabled>الخطة الحالية</button>
                            ) : (
                                <button
                                    onClick={() => showToast({ type: "success", title: `تم طلب الترقية إلى ${plan.name}` })}
                                    className={`w-full py-2.5 rounded-xl font-medium text-sm transition-all ${plan.popular ? "btn-primary" : "btn-ghost"
                                        }`}
                                >
                                    ترقية
                                </button>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Payment Method */}
            <div className="bg-card rounded-xl border border-border p-6">
                <h3 className="text-base font-semibold text-white mb-4">طريقة الدفع</h3>
                <div className="flex items-center gap-4 p-4 bg-surface rounded-xl border border-border">
                    <div className="w-12 h-8 bg-accent/10 rounded-lg flex items-center justify-center">
                        <CreditCard className="w-5 h-5 text-accent" />
                    </div>
                    <div className="flex-1">
                        <p className="text-sm font-medium text-white">•••• •••• •••• 4242</p>
                        <p className="text-xs text-muted">تنتهي 12/2026</p>
                    </div>
                    <button className="btn-ghost text-xs">تعديل</button>
                </div>
            </div>

            {/* Billing History */}
            <div className="bg-card rounded-xl border border-border overflow-hidden">
                <div className="p-6 pb-0">
                    <h3 className="text-base font-semibold text-white">سجل الفواتير</h3>
                </div>
                <div className="overflow-x-auto">
                    <table>
                        <thead>
                            <tr>
                                <th>التاريخ</th>
                                <th>الوصف</th>
                                <th>المبلغ</th>
                                <th>الحالة</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {billingHistory.map((item) => (
                                <tr key={item.id}>
                                    <td className="text-sm">{item.date}</td>
                                    <td className="text-sm text-white">{item.description}</td>
                                    <td className="text-sm">{formatCurrency(item.amount)}</td>
                                    <td><Badge variant="success">مدفوع</Badge></td>
                                    <td>
                                        <button className="p-1.5 rounded-lg text-muted hover:text-white hover:bg-surface transition-colors">
                                            <Download className="w-4 h-4" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default function BillingPage() {
    const { data: session } = useSession();
    const user = session?.user as Record<string, unknown> | undefined;
    const role = (user?.role as string) || "member";

    return (
        <div className="space-y-6 animate-fade-in">
            <div>
                <h1 className="text-2xl font-bold text-white">الفواتير</h1>
                <p className="text-sm text-muted mt-1">
                    {role === "superadmin" ? "نظرة عامة على الإيرادات والاشتراكات" : "إدارة خطتك وفواتيرك"}
                </p>
            </div>
            {role === "superadmin" ? <AdminBilling /> : <UserBilling />}
        </div>
    );
}
