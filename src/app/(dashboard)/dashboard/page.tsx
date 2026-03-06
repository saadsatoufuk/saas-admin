"use client";

import { useSession } from "next-auth/react";
import { StatsCard } from "@/components/ui/StatsCard";
import { AreaChartComponent } from "@/components/charts/AreaChart";
import { BarChartComponent } from "@/components/charts/BarChart";
import { DonutChart } from "@/components/charts/DonutChart";
import { Badge, PlanBadge, StatusBadge } from "@/components/ui/Badge";
import { Avatar } from "@/components/ui/Avatar";
import { formatRelativeTime, formatCurrency, actionLabels } from "@/lib/utils";
import {
    Users,
    DollarSign,
    CreditCard,
    TrendingDown,
    Zap,
    HardDrive,
    UsersRound,
    ArrowUpLeft,
    UserPlus,
    BookOpen,
} from "lucide-react";
import Link from "next/link";

// Demo data
const revenueData = [
    { month: "يناير", revenue: 4200 }, { month: "فبراير", revenue: 4800 },
    { month: "مارس", revenue: 5100 }, { month: "أبريل", revenue: 4900 },
    { month: "مايو", revenue: 5600 }, { month: "يونيو", revenue: 6200 },
    { month: "يوليو", revenue: 5800 }, { month: "أغسطس", revenue: 6500 },
    { month: "سبتمبر", revenue: 7200 }, { month: "أكتوبر", revenue: 7800 },
    { month: "نوفمبر", revenue: 8100 }, { month: "ديسمبر", revenue: 8900 },
];

const userGrowthData = [
    { month: "يناير", users: 120 }, { month: "فبراير", users: 145 },
    { month: "مارس", users: 180 }, { month: "أبريل", users: 210 },
    { month: "مايو", users: 250 }, { month: "يونيو", users: 310 },
    { month: "يوليو", users: 280 }, { month: "أغسطس", users: 340 },
    { month: "سبتمبر", users: 390 }, { month: "أكتوبر", users: 420 },
    { month: "نوفمبر", users: 460 }, { month: "ديسمبر", users: 520 },
];

const planDistribution = [
    { name: "مجاني", value: 450, color: "#6B7280" },
    { name: "احترافي", value: 280, color: "#6366F1" },
    { name: "مؤسسات", value: 90, color: "#F59E0B" },
];

const recentActivity = [
    { id: "1", user: "أحمد محمد", action: "user.created", time: new Date(Date.now() - 1000 * 60 * 15) },
    { id: "2", user: "سارة أحمد", action: "plan.upgraded", time: new Date(Date.now() - 1000 * 60 * 45) },
    { id: "3", user: "محمد علي", action: "member.invited", time: new Date(Date.now() - 1000 * 60 * 120) },
    { id: "4", user: "فاطمة حسن", action: "payment.received", time: new Date(Date.now() - 1000 * 60 * 180) },
    { id: "5", user: "خالد عمر", action: "org.created", time: new Date(Date.now() - 1000 * 60 * 300) },
    { id: "6", user: "نور الدين", action: "login.success", time: new Date(Date.now() - 1000 * 60 * 420) },
    { id: "7", user: "ليلى يوسف", action: "settings.updated", time: new Date(Date.now() - 1000 * 60 * 600) },
];

const topOrganizations = [
    { name: "شركة التقنية", plan: "enterprise", mrr: 2400, members: 45, status: "active" },
    { name: "مؤسسة الابتكار", plan: "pro", mrr: 900, members: 18, status: "active" },
    { name: "مجموعة النجاح", plan: "pro", mrr: 600, members: 12, status: "active" },
    { name: "شركة الرؤية", plan: "enterprise", mrr: 1800, members: 35, status: "trialing" },
    { name: "مشاريع المستقبل", plan: "pro", mrr: 450, members: 8, status: "active" },
];

const apiUsageData = Array.from({ length: 30 }, (_, i) => ({
    day: `${i + 1}`,
    calls: Math.floor(Math.random() * 1000 + 500),
}));

function SuperAdminDashboard() {
    return (
        <div className="space-y-6 animate-fade-in">
            <div>
                <h1 className="text-2xl font-bold text-white">لوحة التحكم</h1>
                <p className="text-sm text-muted mt-1">نظرة عامة على أداء المنصة</p>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatsCard title="إجمالي المستخدمين" value="2,847" change={12.5} changeLabel="من الشهر الماضي" icon={Users} iconColor="text-accent" />
                <StatsCard title="الإيراد الشهري (MRR)" value={formatCurrency(8900)} change={8.2} changeLabel="من الشهر الماضي" icon={DollarSign} iconColor="text-success" />
                <StatsCard title="الاشتراكات النشطة" value="820" change={5.1} changeLabel="من الشهر الماضي" icon={CreditCard} iconColor="text-warning" />
                <StatsCard title="معدل التسرب" value="2.4%" change={-0.8} changeLabel="من الشهر الماضي" icon={TrendingDown} iconColor="text-danger" />
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-card rounded-xl border border-border p-6">
                    <h3 className="text-base font-semibold text-white mb-4">الإيراد الشهري</h3>
                    <AreaChartComponent data={revenueData} dataKey="revenue" xAxisKey="month" color="#22C55E" />
                </div>
                <div className="bg-card rounded-xl border border-border p-6">
                    <h3 className="text-base font-semibold text-white mb-4">نمو المستخدمين</h3>
                    <BarChartComponent data={userGrowthData} dataKey="users" xAxisKey="month" />
                </div>
            </div>

            {/* Bottom Row */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Plan Distribution */}
                <div className="bg-card rounded-xl border border-border p-6">
                    <h3 className="text-base font-semibold text-white mb-4">توزيع الخطط</h3>
                    <DonutChart data={planDistribution} height={250} />
                </div>

                {/* Recent Activity */}
                <div className="bg-card rounded-xl border border-border p-6 lg:col-span-2">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-base font-semibold text-white">النشاط الأخير</h3>
                        <Link href="/dashboard/activity" className="text-xs text-accent hover:text-accent-hover transition-colors">
                            عرض الكل
                        </Link>
                    </div>
                    <div className="space-y-3">
                        {recentActivity.map((item) => (
                            <div key={item.id} className="flex items-center gap-3 py-2">
                                <Avatar name={item.user} size="sm" />
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm text-white">
                                        <span className="font-medium">{item.user}</span>{" "}
                                        <span className="text-muted">{actionLabels[item.action] || item.action}</span>
                                    </p>
                                </div>
                                <span className="text-xs text-muted whitespace-nowrap">
                                    {formatRelativeTime(item.time)}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Top Organizations */}
            <div className="bg-card rounded-xl border border-border overflow-hidden">
                <div className="flex items-center justify-between p-6 pb-0">
                    <h3 className="text-base font-semibold text-white">أفضل المنظمات</h3>
                    <Link href="/dashboard/organizations" className="text-xs text-accent hover:text-accent-hover transition-colors">
                        عرض الكل
                    </Link>
                </div>
                <div className="overflow-x-auto">
                    <table>
                        <thead>
                            <tr>
                                <th>المنظمة</th>
                                <th>الخطة</th>
                                <th>الإيراد الشهري</th>
                                <th>الأعضاء</th>
                                <th>الحالة</th>
                            </tr>
                        </thead>
                        <tbody>
                            {topOrganizations.map((org, i) => (
                                <tr key={i}>
                                    <td className="font-medium text-white">{org.name}</td>
                                    <td><PlanBadge plan={org.plan} /></td>
                                    <td>{formatCurrency(org.mrr)}</td>
                                    <td>{org.members}</td>
                                    <td><StatusBadge status={org.status} /></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

function UserDashboard() {
    return (
        <div className="space-y-6 animate-fade-in">
            <div>
                <h1 className="text-2xl font-bold text-white">لوحة التحكم</h1>
                <p className="text-sm text-muted mt-1">مرحباً بك! إليك ملخص استخدامك</p>
            </div>

            {/* Usage Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <StatsCard title="طلبات API" value="7,245 / 10,000" change={15} changeLabel="هذا الشهر" icon={Zap} iconColor="text-accent" />
                <StatsCard title="التخزين المستخدم" value="2.4 GB / 5 GB" change={8} icon={HardDrive} iconColor="text-warning" />
                <StatsCard title="أعضاء الفريق" value="8 / 15" icon={UsersRound} iconColor="text-success" />
            </div>

            {/* API Usage Chart */}
            <div className="bg-card rounded-xl border border-border p-6">
                <h3 className="text-base font-semibold text-white mb-4">استخدام API - آخر 30 يوم</h3>
                <AreaChartComponent data={apiUsageData} dataKey="calls" xAxisKey="day" />
            </div>

            {/* Quick Actions + Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Quick Actions */}
                <div className="bg-card rounded-xl border border-border p-6">
                    <h3 className="text-base font-semibold text-white mb-4">إجراءات سريعة</h3>
                    <div className="grid grid-cols-2 gap-3">
                        <Link
                            href="/dashboard/team"
                            className="flex items-center gap-3 p-4 rounded-xl bg-surface border border-border hover:border-accent/30 transition-all group"
                        >
                            <UserPlus className="w-5 h-5 text-accent" />
                            <span className="text-sm font-medium text-white">دعوة عضو</span>
                        </Link>
                        <Link
                            href="/dashboard/billing"
                            className="flex items-center gap-3 p-4 rounded-xl bg-surface border border-border hover:border-accent/30 transition-all group"
                        >
                            <ArrowUpLeft className="w-5 h-5 text-success" />
                            <span className="text-sm font-medium text-white">ترقية الخطة</span>
                        </Link>
                        <Link
                            href="/dashboard/settings"
                            className="flex items-center gap-3 p-4 rounded-xl bg-surface border border-border hover:border-accent/30 transition-all group"
                        >
                            <Badge variant="accent">جديد</Badge>
                            <span className="text-sm font-medium text-white">الإعدادات</span>
                        </Link>
                        <a
                            href="#"
                            className="flex items-center gap-3 p-4 rounded-xl bg-surface border border-border hover:border-accent/30 transition-all group"
                        >
                            <BookOpen className="w-5 h-5 text-muted" />
                            <span className="text-sm font-medium text-white">التوثيق</span>
                        </a>
                    </div>
                </div>

                {/* Recent Activity */}
                <div className="bg-card rounded-xl border border-border p-6">
                    <h3 className="text-base font-semibold text-white mb-4">نشاطك الأخير</h3>
                    <div className="space-y-3">
                        {recentActivity.slice(0, 5).map((item) => (
                            <div key={item.id} className="flex items-center gap-3 py-2">
                                <div className="w-2 h-2 rounded-full bg-accent shrink-0" />
                                <p className="text-sm text-muted-foreground flex-1">
                                    {actionLabels[item.action] || item.action}
                                </p>
                                <span className="text-xs text-muted">
                                    {formatRelativeTime(item.time)}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function DashboardPage() {
    const { data: session } = useSession();
    const user = session?.user as Record<string, unknown> | undefined;
    const role = (user?.role as string) || "member";

    if (role === "superadmin") {
        return <SuperAdminDashboard />;
    }

    return <UserDashboard />;
}
