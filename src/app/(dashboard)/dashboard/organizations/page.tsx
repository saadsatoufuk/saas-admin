"use client";

import { useState } from "react";
import { SearchInput } from "@/components/ui/SearchInput";
import { PlanBadge, StatusBadge } from "@/components/ui/Badge";
import { Avatar } from "@/components/ui/Avatar";
import { EmptyState } from "@/components/ui/EmptyState";
import { Pagination } from "@/components/ui/Pagination";
import { useToast } from "@/components/ui/Toast";
import { formatCurrency, formatRelativeTime } from "@/lib/utils";
import { Building2, Users, Eye } from "lucide-react";


const demoOrgs = Array.from({ length: 25 }, (_, i) => ({
    id: `org-${i + 1}`,
    name: ["شركة التقنية", "مؤسسة الابتكار", "مجموعة النجاح", "شركة الرؤية", "مشاريع المستقبل", "حلول رقمية", "شركة البرمجيات", "مؤسسة التطوير"][i % 8],
    plan: (["free", "pro", "enterprise", "pro", "free"] as const)[i % 5],
    owner: ["أحمد محمد", "سارة أحمد", "محمد علي", "فاطمة حسن", "خالد عمر"][i % 5],
    members: Math.floor(Math.random() * 50 + 3),
    mrr: [0, 49, 199, 49, 0][i % 5] * (Math.floor(Math.random() * 5) + 1),
    status: (["active", "active", "trialing", "active", "past_due"] as const)[i % 5],
    createdAt: new Date(Date.now() - Math.random() * 1000 * 60 * 60 * 24 * 365),
}));

export default function OrganizationsPage() {
    const { showToast } = useToast();
    const [search, setSearch] = useState("");
    const [filterPlan, setFilterPlan] = useState("all");
    const [page, setPage] = useState(1);
    const pageSize = 20;

    const filtered = demoOrgs.filter((o) => {
        if (search && !o.name.includes(search)) return false;
        if (filterPlan !== "all" && o.plan !== filterPlan) return false;
        return true;
    });

    const paginated = filtered.slice((page - 1) * pageSize, page * pageSize);
    const totalPages = Math.ceil(filtered.length / pageSize);

    return (
        <div className="space-y-6 animate-fade-in">
            <div>
                <h1 className="text-2xl font-bold text-white">المنظمات</h1>
                <p className="text-sm text-muted mt-1">إدارة جميع منظمات المنصة</p>
            </div>

            <div className="bg-card rounded-xl border border-border p-4">
                <div className="flex flex-col sm:flex-row gap-3">
                    <SearchInput placeholder="بحث بالاسم..." onSearch={setSearch} className="flex-1" />
                    <select value={filterPlan} onChange={(e) => setFilterPlan(e.target.value)} className="w-full sm:w-40">
                        <option value="all">جميع الخطط</option>
                        <option value="free">مجاني</option>
                        <option value="pro">احترافي</option>
                        <option value="enterprise">مؤسسات</option>
                    </select>
                </div>
            </div>

            {filtered.length === 0 ? (
                <EmptyState icon={Building2} title="لا توجد منظمات" description="لا توجد منظمات مطابقة" />
            ) : (
                <div className="bg-card rounded-xl border border-border overflow-hidden">
                    <div className="overflow-x-auto">
                        <table>
                            <thead>
                                <tr>
                                    <th>المنظمة</th>
                                    <th>الخطة</th>
                                    <th>المالك</th>
                                    <th>الأعضاء</th>
                                    <th>الإيراد الشهري</th>
                                    <th>الحالة</th>
                                    <th>تاريخ الإنشاء</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {paginated.map((org) => (
                                    <tr key={org.id}>
                                        <td>
                                            <div className="flex items-center gap-3">
                                                <div className="w-9 h-9 rounded-xl bg-accent/10 flex items-center justify-center">
                                                    <Building2 className="w-4 h-4 text-accent" />
                                                </div>
                                                <span className="font-medium text-white">{org.name}</span>
                                            </div>
                                        </td>
                                        <td><PlanBadge plan={org.plan} /></td>
                                        <td>
                                            <div className="flex items-center gap-2">
                                                <Avatar name={org.owner} size="sm" />
                                                <span className="text-sm text-muted">{org.owner}</span>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="flex items-center gap-1 text-sm text-muted">
                                                <Users className="w-3.5 h-3.5" />
                                                {org.members}
                                            </div>
                                        </td>
                                        <td className="text-sm">{formatCurrency(org.mrr)}</td>
                                        <td><StatusBadge status={org.status} /></td>
                                        <td className="text-sm text-muted">{formatRelativeTime(org.createdAt)}</td>
                                        <td>
                                            <button
                                                onClick={() => showToast({ type: "info", title: "عرض تفاصيل المنظمة" })}
                                                className="p-1.5 rounded-lg text-muted hover:text-white hover:bg-surface transition-colors"
                                            >
                                                <Eye className="w-4 h-4" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <Pagination currentPage={page} totalPages={totalPages} totalItems={filtered.length} pageSize={pageSize} onPageChange={setPage} />
                </div>
            )}
        </div>
    );
}
