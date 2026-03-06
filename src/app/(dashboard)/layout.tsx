"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/login");
        }
    }, [status, router]);

    if (status === "loading") {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-10 h-10 border-2 border-accent border-t-transparent rounded-full animate-spin" />
                    <p className="text-sm text-muted">جاري التحميل...</p>
                </div>
            </div>
        );
    }

    if (!session?.user) return null;

    const user = session.user as Record<string, unknown>;

    return (
        <div className="flex min-h-screen bg-background">
            {/* Desktop Sidebar */}
            <div className="hidden lg:block">
                <Sidebar
                    userRole={(user.role as string) || "member"}
                    onSignOut={() => signOut({ callbackUrl: "/login" })}
                />
            </div>

            {/* Mobile sidebar overlay */}
            {mobileMenuOpen && (
                <div className="fixed inset-0 z-40 lg:hidden">
                    <div className="absolute inset-0 bg-black/60" onClick={() => setMobileMenuOpen(false)} />
                    <div className="relative z-50">
                        <Sidebar
                            userRole={(user.role as string) || "member"}
                            onSignOut={() => signOut({ callbackUrl: "/login" })}
                        />
                    </div>
                </div>
            )}

            {/* Main Content */}
            <div className="flex-1 flex flex-col min-w-0">
                <Header
                    userName={(user.name as string) || ""}
                    userEmail={(user.email as string) || ""}
                    userAvatar={(user.avatar as string) || ""}
                    userRole={(user.role as string) || "member"}
                    notificationCount={3}
                    onMenuToggle={() => setMobileMenuOpen(!mobileMenuOpen)}
                />
                <main className="flex-1 p-6">
                    {children}
                </main>
            </div>
        </div>
    );
}
