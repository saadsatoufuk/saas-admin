"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { Avatar } from "@/components/ui/Avatar";
import { SearchInput } from "@/components/ui/SearchInput";
import { Pagination } from "@/components/ui/Pagination";
import { EmptyState } from "@/components/ui/EmptyState";
import { formatRelativeTime, actionLabels } from "@/lib/utils";
import { Activity } from "lucide-react";

const demoActivity = Array.from({ length: 60 }, (_, i) => {
    const actions = Object.keys(actionLabels);
    const users = ["أحمد محمد", "سارة أحمد", "محمد علي", "فاطمة حسن", "خالد عمر", "نور الدين", "ليلى يوسف"];
    return {
        id: `act-${i + 1}`,
        user: users[i % users.length],
        action: actions[i % actions.length],
        ip: `192.168.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`,
        createdAt: new Date(Date.now() - i * 1000 * 60 * 60 * Math.floor(Math.random() * 12 + 1)),
    };
});

export default function ActivityPage() {
    const { data: session } = useSession();
    const user = session?.user as Record<string, unknown> | undefined;
    const role = (user?.role as string) || "member";
    const [search, setSearch] = useState("");
    const [filterAction, setFilterAction] = useState("all");
    const [page, setPage] = useState(1);
    const pageSize = 20;

    const filtered = demoActivity.filter((a) => {
        if (search && !a.user.includes(search) && !(actionLabels[a.action] || "").includes(search)) return false;
        if (filterAction !== "all" && a.action !== filterAction) return false;
        if (role !== "superadmin") return a.user === (user?.name as string);
        return true;
    });

    const paginated = filtered.slice((page - 1) * pageSize, page * pageSize);
    const totalPages = Math.ceil(filtered.length / pageSize);

    return (
        <div className="space-y-6 animate-fade-in">
            <div>
                <h1 className="text-2xl font-bold text-white">سجل النشاط</h1>
                <p className="text-sm text-muted mt-1">
                    {role === "superadmin" ? "جميع الأنشطة على المنصة" : "نشاطات منظمتك"}
                </p>
            </div>

            <div className="bg-card rounded-xl border border-border p-4">
                <div className="flex flex-col sm:flex-row gap-3">
                    <SearchInput placeholder="بحث في النشاطات..." onSearch={setSearch} className="flex-1" />
                    <select value={filterAction} onChange={(e) => setFilterAction(e.target.value)} className="w-full sm:w-48">
                        <option value="all">جميع الأنشطة</option>
                        {Object.entries(actionLabels).map(([key, label]) => (
                            <option key={key} value={key}>{label}</option>
                        ))}
                    </select>
                </div>
            </div>

            {filtered.length === 0 ? (
                <EmptyState icon={Activity} title="لا توجد نشاطات" description="لم يتم تسجيل أي نشاطات بعد" />
            ) : (
                <div className="bg-card rounded-xl border border-border overflow-hidden">
                    <div className="divide-y divide-border">
                        {paginated.map((item) => (
                            <div key={item.id} className="flex items-center gap-4 p-4 hover:bg-surface/50 transition-colors">
                                <Avatar name={item.user} size="sm" />
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm">
                                        <span className="font-medium text-white">{item.user}</span>{" "}
                                        <span className="text-muted">{actionLabels[item.action] || item.action}</span>
                                    </p>
                                    <p className="text-xs text-muted mt-0.5" dir="ltr">IP: {item.ip}</p>
                                </div>
                                <span className="text-xs text-muted whitespace-nowrap">
                                    {formatRelativeTime(item.createdAt)}
                                </span>
                            </div>
                        ))}
                    </div>
                    <Pagination currentPage={page} totalPages={totalPages} totalItems={filtered.length} pageSize={pageSize} onPageChange={setPage} />
                </div>
            )}
        </div>
    );
}
