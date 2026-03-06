"use client";

import { useState, useRef, useEffect } from "react";
import { Bell, Search, ChevronDown, Menu } from "lucide-react";
import { Avatar } from "@/components/ui/Avatar";

interface HeaderProps {
    userName: string;
    userEmail: string;
    userAvatar?: string;
    userRole: string;
    notificationCount?: number;
    onMenuToggle?: () => void;
}

export function Header({
    userName,
    userEmail,
    userAvatar,
    userRole,
    notificationCount = 0,
    onMenuToggle,
}: HeaderProps) {
    const [showProfile, setShowProfile] = useState(false);
    const profileRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClick = (e: MouseEvent) => {
            if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
                setShowProfile(false);
            }
        };
        document.addEventListener("mousedown", handleClick);
        return () => document.removeEventListener("mousedown", handleClick);
    }, []);

    const roleLabels: Record<string, string> = {
        superadmin: "مدير عام",
        admin: "مدير",
        member: "عضو",
    };

    return (
        <header className="sticky top-0 z-20 h-16 bg-surface/80 backdrop-blur-lg border-b border-border">
            <div className="flex items-center justify-between h-full px-6">
                {/* Left: Mobile Menu + Search */}
                <div className="flex items-center gap-4">
                    {onMenuToggle && (
                        <button
                            onClick={onMenuToggle}
                            className="lg:hidden p-2 rounded-lg text-muted hover:text-white hover:bg-card transition-colors"
                        >
                            <Menu className="w-5 h-5" />
                        </button>
                    )}
                    <div className="hidden md:flex items-center gap-2 px-3 py-2 rounded-xl bg-card border border-border w-72">
                        <Search className="w-4 h-4 text-muted" />
                        <input
                            type="text"
                            placeholder="بحث..."
                            className="bg-transparent border-none outline-none text-sm text-white placeholder:text-muted w-full"
                        />
                    </div>
                </div>

                {/* Right: Notifications + Profile */}
                <div className="flex items-center gap-3">
                    <a
                        href="/dashboard/notifications"
                        className="relative p-2.5 rounded-xl text-muted hover:text-white hover:bg-card transition-colors"
                    >
                        <Bell className="w-5 h-5" />
                        {notificationCount > 0 && (
                            <span className="absolute -top-0.5 -left-0.5 w-5 h-5 rounded-full bg-accent text-white text-[10px] font-bold flex items-center justify-center">
                                {notificationCount > 9 ? "9+" : notificationCount}
                            </span>
                        )}
                    </a>

                    <div ref={profileRef} className="relative">
                        <button
                            onClick={() => setShowProfile(!showProfile)}
                            className="flex items-center gap-3 px-3 py-1.5 rounded-xl hover:bg-card transition-colors"
                        >
                            <Avatar src={userAvatar} name={userName} size="sm" />
                            <div className="hidden sm:block text-right">
                                <p className="text-sm font-medium text-white leading-tight">{userName}</p>
                                <p className="text-[11px] text-muted leading-tight">{roleLabels[userRole]}</p>
                            </div>
                            <ChevronDown className="w-4 h-4 text-muted hidden sm:block" />
                        </button>

                        {showProfile && (
                            <div className="absolute left-0 top-full mt-2 w-64 bg-card border border-border rounded-xl shadow-2xl overflow-hidden animate-fade-in">
                                <div className="p-4 border-b border-border">
                                    <p className="text-sm font-medium text-white">{userName}</p>
                                    <p className="text-xs text-muted mt-0.5">{userEmail}</p>
                                </div>
                                <div className="p-2">
                                    <a
                                        href="/dashboard/settings"
                                        className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-muted hover:text-white hover:bg-surface transition-colors"
                                    >
                                        الإعدادات
                                    </a>
                                    <a
                                        href="/dashboard/billing"
                                        className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-muted hover:text-white hover:bg-surface transition-colors"
                                    >
                                        الفواتير
                                    </a>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
}
