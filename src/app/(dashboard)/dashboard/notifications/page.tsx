"use client";

import { useState } from "react";
import { TabGroup } from "@/components/ui/TabGroup";
import { EmptyState } from "@/components/ui/EmptyState";
import { useToast } from "@/components/ui/Toast";
import { formatRelativeTime } from "@/lib/utils";
import {
    Bell,
    CheckCircle,
    AlertCircle,
    AlertTriangle,
    Check,
    CreditCard,
    UserPlus,
    Settings,
    Shield,
} from "lucide-react";

const notifications = [
    { id: "1", title: "تم ترقية الخطة بنجاح", message: "تم ترقية خطتك إلى الخطة الاحترافية", type: "success" as const, isRead: false, icon: CheckCircle, createdAt: new Date(Date.now() - 1000 * 60 * 15) },
    { id: "2", title: "فشل في الدفع", message: "لم نتمكن من معالجة دفعتك الأخيرة. يرجى تحديث معلومات الدفع.", type: "error" as const, isRead: false, icon: AlertCircle, createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2) },
    { id: "3", title: "عضو جديد انضم للفريق", message: "انضم محمد علي إلى فريقك كعضو", type: "info" as const, isRead: false, icon: UserPlus, createdAt: new Date(Date.now() - 1000 * 60 * 60 * 5) },
    { id: "4", title: "تنبيه حد الاستخدام", message: "لقد استخدمت 80% من حد طلبات API الشهري", type: "warning" as const, isRead: true, icon: AlertTriangle, createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24) },
    { id: "5", title: "تم تحديث الإعدادات", message: "تم تحديث إعدادات المنظمة بنجاح", type: "info" as const, isRead: true, icon: Settings, createdAt: new Date(Date.now() - 1000 * 60 * 60 * 48) },
    { id: "6", title: "فاتورة جديدة متاحة", message: "فاتورة شهر فبراير 2025 جاهزة للتحميل", type: "info" as const, isRead: true, icon: CreditCard, createdAt: new Date(Date.now() - 1000 * 60 * 60 * 72) },
    { id: "7", title: "تسجيل دخول من جهاز جديد", message: "تم تسجيل الدخول من Chrome على Mac OS في الرياض", type: "warning" as const, isRead: true, icon: Shield, createdAt: new Date(Date.now() - 1000 * 60 * 60 * 96) },
];

const typeColors = {
    success: "text-success bg-success/10",
    error: "text-danger bg-danger/10",
    warning: "text-warning bg-warning/10",
    info: "text-blue-400 bg-blue-400/10",
};

const tabFilters: Record<string, string[]> = {
    all: ["success", "error", "warning", "info"],
    unread: ["success", "error", "warning", "info"],
    system: ["info", "warning"],
    billing: ["success", "error"],
};

export default function NotificationsPage() {
    const { showToast } = useToast();
    const [activeTab, setActiveTab] = useState("all");
    const [readItems, setReadItems] = useState<string[]>(
        notifications.filter((n) => n.isRead).map((n) => n.id)
    );

    const unreadCount = notifications.filter((n) => !readItems.includes(n.id)).length;

    const filtered = notifications.filter((n) => {
        if (activeTab === "unread") return !readItems.includes(n.id);
        return tabFilters[activeTab]?.includes(n.type);
    });

    const markAllRead = () => {
        setReadItems(notifications.map((n) => n.id));
        showToast({ type: "success", title: "تم تحديد الكل كمقروء" });
    };

    return (
        <div className="space-y-6 animate-fade-in">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-white">الإشعارات</h1>
                    <p className="text-sm text-muted mt-1">{unreadCount} إشعار غير مقروء</p>
                </div>
                <button onClick={markAllRead} className="btn-ghost flex items-center gap-2">
                    <Check className="w-4 h-4" />
                    تحديد الكل كمقروء
                </button>
            </div>

            <TabGroup
                tabs={[
                    { id: "all", label: "الكل", count: notifications.length },
                    { id: "unread", label: "غير مقروء", count: unreadCount },
                    { id: "system", label: "النظام" },
                    { id: "billing", label: "الفواتير" },
                ]}
                activeTab={activeTab}
                onTabChange={setActiveTab}
            />

            {filtered.length === 0 ? (
                <EmptyState icon={Bell} title="لا توجد إشعارات" description="ستظهر الإشعارات الجديدة هنا" />
            ) : (
                <div className="space-y-2">
                    {filtered.map((n) => {
                        const isRead = readItems.includes(n.id);
                        return (
                            <div
                                key={n.id}
                                onClick={() => !isRead && setReadItems((prev) => [...prev, n.id])}
                                className={`flex items-start gap-4 p-4 rounded-xl border transition-all cursor-pointer ${isRead
                                    ? "bg-card border-border opacity-70"
                                    : "bg-card border-accent/20 hover:border-accent/40"
                                    }`}
                            >
                                <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${typeColors[n.type]}`}>
                                    <n.icon className="w-5 h-5" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2">
                                        <h4 className="text-sm font-medium text-white">{n.title}</h4>
                                        {!isRead && <div className="w-2 h-2 rounded-full bg-accent shrink-0" />}
                                    </div>
                                    <p className="text-sm text-muted mt-1">{n.message}</p>
                                </div>
                                <span className="text-xs text-muted whitespace-nowrap">
                                    {formatRelativeTime(n.createdAt)}
                                </span>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
