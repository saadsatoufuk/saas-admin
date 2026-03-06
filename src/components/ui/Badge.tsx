import { cn } from "@/lib/utils";

interface BadgeProps {
    children: React.ReactNode;
    variant?: "default" | "success" | "warning" | "danger" | "info" | "accent";
    size?: "sm" | "md";
}

const variantClasses: Record<string, string> = {
    default: "bg-surface text-muted-foreground border-border",
    success: "bg-success/10 text-success border-success/20",
    warning: "bg-warning/10 text-warning border-warning/20",
    danger: "bg-danger/10 text-danger border-danger/20",
    info: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    accent: "bg-accent/10 text-accent border-accent/20",
};

export function Badge({ children, variant = "default", size = "sm" }: BadgeProps) {
    return (
        <span
            className={cn(
                "inline-flex items-center font-medium border rounded-full",
                size === "sm" ? "px-2 py-0.5 text-[11px]" : "px-3 py-1 text-xs",
                variantClasses[variant]
            )}
        >
            {children}
        </span>
    );
}

export function PlanBadge({ plan }: { plan: string }) {
    const variants: Record<string, "default" | "info" | "accent" | "warning"> = {
        free: "default",
        pro: "accent",
        enterprise: "warning",
    };
    const labels: Record<string, string> = {
        free: "مجاني",
        pro: "احترافي",
        enterprise: "مؤسسات",
    };
    return <Badge variant={variants[plan] || "default"}>{labels[plan] || plan}</Badge>;
}

export function StatusBadge({ status }: { status: string }) {
    const variants: Record<string, "success" | "warning" | "danger" | "info"> = {
        active: "success",
        trialing: "info",
        cancelled: "danger",
        past_due: "warning",
        pending: "warning",
        accepted: "success",
        expired: "danger",
    };
    const labels: Record<string, string> = {
        active: "نشط",
        trialing: "تجريبي",
        cancelled: "ملغى",
        past_due: "متأخر",
        pending: "معلق",
        accepted: "مقبول",
        expired: "منتهي",
    };
    return <Badge variant={variants[status] || "default"}>{labels[status] || status}</Badge>;
}

export function RoleBadge({ role }: { role: string }) {
    const variants: Record<string, "accent" | "info" | "default"> = {
        superadmin: "accent",
        admin: "info",
        member: "default",
    };
    const labels: Record<string, string> = {
        superadmin: "مدير عام",
        admin: "مدير",
        member: "عضو",
    };
    return <Badge variant={variants[role] || "default"}>{labels[role] || role}</Badge>;
}
