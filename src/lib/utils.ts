import { formatDistanceToNow, format } from "date-fns";
import { ar } from "date-fns/locale";

export function cn(...classes: (string | boolean | undefined | null)[]): string {
    return classes.filter(Boolean).join(" ");
}

export function formatRelativeTime(date: Date | string): string {
    return formatDistanceToNow(new Date(date), { addSuffix: true, locale: ar });
}

export function formatDate(date: Date | string): string {
    return format(new Date(date), "dd MMMM yyyy", { locale: ar });
}

export function formatDateTime(date: Date | string): string {
    return format(new Date(date), "dd MMMM yyyy HH:mm", { locale: ar });
}

export function getInitials(name: string): string {
    return name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2);
}

export function formatCurrency(amount: number): string {
    return new Intl.NumberFormat("ar-SA", {
        style: "currency",
        currency: "USD",
    }).format(amount);
}

export function formatNumber(num: number): string {
    return new Intl.NumberFormat("ar-SA").format(num);
}

export function formatBytes(bytes: number): string {
    if (bytes === 0) return "0 بايت";
    const k = 1024;
    const sizes = ["بايت", "كيلوبايت", "ميغابايت", "غيغابايت"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
}

export function generateSlug(name: string): string {
    return name
        .toLowerCase()
        .replace(/[^a-z0-9\u0600-\u06FF]+/g, "-")
        .replace(/^-+|-+$/g, "");
}

export function truncateText(text: string, maxLength: number): string {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + "...";
}

export const planLabels: Record<string, string> = {
    free: "مجاني",
    pro: "احترافي",
    enterprise: "مؤسسات",
};

export const roleLabels: Record<string, string> = {
    superadmin: "مدير عام",
    admin: "مدير",
    member: "عضو",
};

export const statusLabels: Record<string, string> = {
    active: "نشط",
    trialing: "تجريبي",
    cancelled: "ملغى",
    past_due: "متأخر",
};

export const actionLabels: Record<string, string> = {
    "user.created": "تم إنشاء مستخدم",
    "user.updated": "تم تحديث مستخدم",
    "user.deleted": "تم حذف مستخدم",
    "user.suspended": "تم تعليق مستخدم",
    "plan.upgraded": "تم ترقية الخطة",
    "plan.downgraded": "تم تخفيض الخطة",
    "member.invited": "تم دعوة عضو",
    "member.removed": "تم إزالة عضو",
    "member.joined": "انضم عضو جديد",
    "org.created": "تم إنشاء منظمة",
    "org.updated": "تم تحديث المنظمة",
    "payment.received": "تم استلام دفعة",
    "settings.updated": "تم تحديث الإعدادات",
    "login.success": "تسجيل دخول ناجح",
    "login.failed": "فشل تسجيل الدخول",
};
