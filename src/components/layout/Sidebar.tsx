"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
    LayoutDashboard,
    Users,
    Building2,
    CreditCard,
    UsersRound,
    Settings,
    Bell,
    Activity,
    Shield,
    ChevronRight,
    ChevronLeft,
    LogOut,
    Palette,
} from "lucide-react";

interface SidebarProps {
    userRole: string;
    siteName?: string;
    logoUrl?: string;
    onSignOut: () => void;
}

interface NavItem {
    label: string;
    href: string;
    icon: React.ElementType;
    roles: string[];
}

const navItems: NavItem[] = [
    { label: "لوحة التحكم", href: "/dashboard", icon: LayoutDashboard, roles: ["superadmin", "admin", "member"] },
    { label: "المستخدمون", href: "/dashboard/users", icon: Users, roles: ["superadmin"] },
    { label: "المنظمات", href: "/dashboard/organizations", icon: Building2, roles: ["superadmin"] },
    { label: "الفواتير", href: "/dashboard/billing", icon: CreditCard, roles: ["superadmin", "admin"] },
    { label: "الفريق", href: "/dashboard/team", icon: UsersRound, roles: ["superadmin", "admin"] },
    { label: "الإشعارات", href: "/dashboard/notifications", icon: Bell, roles: ["superadmin", "admin", "member"] },
    { label: "سجل النشاط", href: "/dashboard/activity", icon: Activity, roles: ["superadmin", "admin", "member"] },
    { label: "الإعدادات", href: "/dashboard/settings", icon: Settings, roles: ["superadmin", "admin", "member"] },
    { label: "إعدادات الموقع", href: "/dashboard/admin/settings", icon: Palette, roles: ["superadmin"] },
];

export function Sidebar({ userRole, siteName = "مشروعي", logoUrl, onSignOut }: SidebarProps) {
    const [collapsed, setCollapsed] = useState(false);
    const pathname = usePathname();

    const filteredItems = navItems.filter((item) => item.roles.includes(userRole));

    return (
        <aside
            className={cn(
                "sticky top-0 h-screen bg-surface border-l border-border flex flex-col transition-all duration-300 z-30",
                collapsed ? "w-[72px]" : "w-64"
            )}
        >
            {/* Logo */}
            <div className="flex items-center gap-3 px-4 h-16 border-b border-border">
                {logoUrl ? (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img src={logoUrl} alt={siteName} className="w-8 h-8 rounded-lg object-cover" />
                ) : (
                    <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center">
                        <Shield className="w-4 h-4 text-white" />
                    </div>
                )}
                {!collapsed && (
                    <span className="font-bold text-white text-sm truncate">{siteName}</span>
                )}
            </div>

            {/* Nav Items */}
            <nav className="flex-1 py-4 px-2 space-y-1 overflow-y-auto">
                {filteredItems.map((item) => {
                    const isActive = pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href));
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group",
                                isActive
                                    ? "bg-accent/10 text-accent"
                                    : "text-muted hover:text-white hover:bg-card"
                            )}
                        >
                            <item.icon className={cn("w-5 h-5 shrink-0", isActive && "text-accent")} />
                            {!collapsed && <span className="truncate">{item.label}</span>}
                        </Link>
                    );
                })}
            </nav>

            {/* Bottom */}
            <div className="p-2 border-t border-border space-y-1">
                <button
                    onClick={onSignOut}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-muted hover:text-danger hover:bg-danger/10 transition-all w-full"
                >
                    <LogOut className="w-5 h-5 shrink-0" />
                    {!collapsed && <span>تسجيل الخروج</span>}
                </button>
                <button
                    onClick={() => setCollapsed(!collapsed)}
                    className="flex items-center justify-center w-full py-2 rounded-xl text-muted hover:text-white hover:bg-card transition-all"
                >
                    {collapsed ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                </button>
            </div>
        </aside>
    );
}
