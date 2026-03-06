"use client";

import { useState } from "react";
import { SearchInput } from "@/components/ui/SearchInput";
import { Avatar } from "@/components/ui/Avatar";
import { PlanBadge, RoleBadge, StatusBadge } from "@/components/ui/Badge";
import { Modal } from "@/components/ui/Modal";
import { ConfirmDialog } from "@/components/ui/ConfirmDialog";
import { Drawer } from "@/components/ui/Drawer";
import { EmptyState } from "@/components/ui/EmptyState";
import { Pagination } from "@/components/ui/Pagination";
import { useToast } from "@/components/ui/Toast";
import { formatRelativeTime } from "@/lib/utils";
import {
    Plus,
    MoreHorizontal,
    Eye,
    Edit2,
    Ban,
    Trash2,
    Download,
    Users,
    Mail,
    Calendar,
    Shield,
    Activity,
    CreditCard,
} from "lucide-react";

// Demo users data
const demoUsers = Array.from({ length: 47 }, (_, i) => ({
    id: `user-${i + 1}`,
    name: [
        "أحمد محمد", "سارة أحمد", "محمد علي", "فاطمة حسن", "خالد عمر",
        "نور الدين", "ليلى يوسف", "عمر خالد", "هدى سعيد", "يوسف أحمد",
        "مريم محمد", "عبدالله سالم", "رنا خطيب", "طارق إبراهيم", "دانا عبدالرحمن",
    ][i % 15],
    email: `user${i + 1}@example.com`,
    role: (["superadmin", "admin", "member", "member", "member"] as const)[i % 5],
    plan: (["free", "pro", "enterprise", "pro", "free"] as const)[i % 5],
    organization: ["شركة التقنية", "مؤسسة الابتكار", "مجموعة النجاح", "شركة الرؤية"][i % 4],
    lastLogin: new Date(Date.now() - Math.random() * 1000 * 60 * 60 * 24 * 30),
    isActive: i % 7 !== 0,
    createdAt: new Date(Date.now() - Math.random() * 1000 * 60 * 60 * 24 * 365),
}));

export default function UsersPage() {
    const { showToast } = useToast();
    const [search, setSearch] = useState("");
    const [filterPlan, setFilterPlan] = useState("all");
    const [filterRole, setFilterRole] = useState("all");
    const [page, setPage] = useState(1);
    const [showCreate, setShowCreate] = useState(false);
    const [showDelete, setShowDelete] = useState<string | null>(null);
    const [selectedUser, setSelectedUser] = useState<string | null>(null);
    const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
    const [actionMenu, setActionMenu] = useState<string | null>(null);
    const pageSize = 20;

    const filtered = demoUsers.filter((u) => {
        if (search && !u.name.includes(search) && !u.email.includes(search)) return false;
        if (filterPlan !== "all" && u.plan !== filterPlan) return false;
        if (filterRole !== "all" && u.role !== filterRole) return false;
        return true;
    });

    const paginated = filtered.slice((page - 1) * pageSize, page * pageSize);
    const totalPages = Math.ceil(filtered.length / pageSize);

    const toggleSelect = (id: string) => {
        setSelectedUsers((prev) =>
            prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
        );
    };

    const toggleSelectAll = () => {
        if (selectedUsers.length === paginated.length) {
            setSelectedUsers([]);
        } else {
            setSelectedUsers(paginated.map((u) => u.id));
        }
    };

    const drawerUser = demoUsers.find((u) => u.id === selectedUser);

    return (
        <div className="space-y-6 animate-fade-in">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-white">المستخدمون</h1>
                    <p className="text-sm text-muted mt-1">إدارة جميع مستخدمي المنصة</p>
                </div>
                <button onClick={() => setShowCreate(true)} className="btn-primary flex items-center gap-2">
                    <Plus className="w-4 h-4" />
                    إضافة مستخدم
                </button>
            </div>

            {/* Filters */}
            <div className="bg-card rounded-xl border border-border p-4">
                <div className="flex flex-col sm:flex-row gap-3">
                    <SearchInput
                        placeholder="بحث بالاسم أو البريد..."
                        onSearch={setSearch}
                        className="flex-1"
                    />
                    <select
                        value={filterPlan}
                        onChange={(e) => setFilterPlan(e.target.value)}
                        className="w-full sm:w-40"
                    >
                        <option value="all">جميع الخطط</option>
                        <option value="free">مجاني</option>
                        <option value="pro">احترافي</option>
                        <option value="enterprise">مؤسسات</option>
                    </select>
                    <select
                        value={filterRole}
                        onChange={(e) => setFilterRole(e.target.value)}
                        className="w-full sm:w-40"
                    >
                        <option value="all">جميع الأدوار</option>
                        <option value="superadmin">مدير عام</option>
                        <option value="admin">مدير</option>
                        <option value="member">عضو</option>
                    </select>
                </div>

                {selectedUsers.length > 0 && (
                    <div className="flex items-center gap-3 mt-3 pt-3 border-t border-border">
                        <span className="text-sm text-muted">{selectedUsers.length} محدد</span>
                        <button
                            onClick={() => {
                                showToast({ type: "success", title: "تم تصدير المستخدمين" });
                                setSelectedUsers([]);
                            }}
                            className="btn-ghost text-xs py-1"
                        >
                            <Download className="w-3.5 h-3.5 ml-1 inline" />
                            تصدير CSV
                        </button>
                        <button
                            onClick={() => {
                                showToast({ type: "warning", title: `تم تعليق ${selectedUsers.length} مستخدم` });
                                setSelectedUsers([]);
                            }}
                            className="btn-ghost text-xs py-1 text-warning"
                        >
                            <Ban className="w-3.5 h-3.5 ml-1 inline" />
                            تعليق
                        </button>
                    </div>
                )}
            </div>

            {/* Table */}
            {filtered.length === 0 ? (
                <EmptyState
                    icon={Users}
                    title="لا توجد نتائج"
                    description="لم يتم العثور على مستخدمين مطابقين لمعايير البحث"
                />
            ) : (
                <div className="bg-card rounded-xl border border-border overflow-hidden">
                    <div className="overflow-x-auto">
                        <table>
                            <thead>
                                <tr>
                                    <th className="w-10">
                                        <input
                                            type="checkbox"
                                            checked={selectedUsers.length === paginated.length && paginated.length > 0}
                                            onChange={toggleSelectAll}
                                            className="w-4 h-4 rounded border-border bg-surface accent-accent"
                                        />
                                    </th>
                                    <th>المستخدم</th>
                                    <th>الدور</th>
                                    <th>الخطة</th>
                                    <th>المنظمة</th>
                                    <th>آخر دخول</th>
                                    <th>الحالة</th>
                                    <th className="w-10"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {paginated.map((user) => (
                                    <tr key={user.id}>
                                        <td>
                                            <input
                                                type="checkbox"
                                                checked={selectedUsers.includes(user.id)}
                                                onChange={() => toggleSelect(user.id)}
                                                className="w-4 h-4 rounded border-border bg-surface accent-accent"
                                            />
                                        </td>
                                        <td>
                                            <div className="flex items-center gap-3">
                                                <Avatar name={user.name} size="sm" />
                                                <div>
                                                    <p className="text-sm font-medium text-white">{user.name}</p>
                                                    <p className="text-xs text-muted">{user.email}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td><RoleBadge role={user.role} /></td>
                                        <td><PlanBadge plan={user.plan} /></td>
                                        <td className="text-sm text-muted">{user.organization}</td>
                                        <td className="text-sm text-muted">{formatRelativeTime(user.lastLogin)}</td>
                                        <td>
                                            <StatusBadge status={user.isActive ? "active" : "cancelled"} />
                                        </td>
                                        <td>
                                            <div className="relative">
                                                <button
                                                    onClick={() => setActionMenu(actionMenu === user.id ? null : user.id)}
                                                    className="p-1.5 rounded-lg text-muted hover:text-white hover:bg-surface transition-colors"
                                                >
                                                    <MoreHorizontal className="w-4 h-4" />
                                                </button>
                                                {actionMenu === user.id && (
                                                    <div className="absolute left-0 top-full mt-1 w-44 bg-card border border-border rounded-xl shadow-2xl z-20 animate-fade-in">
                                                        <button
                                                            onClick={() => { setSelectedUser(user.id); setActionMenu(null); }}
                                                            className="flex items-center gap-2 w-full px-3 py-2 text-sm text-muted hover:text-white hover:bg-surface transition-colors rounded-t-xl"
                                                        >
                                                            <Eye className="w-4 h-4" /> عرض الملف
                                                        </button>
                                                        <button
                                                            onClick={() => { showToast({ type: "info", title: "تم فتح محرر الدور" }); setActionMenu(null); }}
                                                            className="flex items-center gap-2 w-full px-3 py-2 text-sm text-muted hover:text-white hover:bg-surface transition-colors"
                                                        >
                                                            <Edit2 className="w-4 h-4" /> تعديل الدور
                                                        </button>
                                                        <button
                                                            onClick={() => { showToast({ type: "warning", title: "تم تعليق المستخدم" }); setActionMenu(null); }}
                                                            className="flex items-center gap-2 w-full px-3 py-2 text-sm text-warning hover:bg-surface transition-colors"
                                                        >
                                                            <Ban className="w-4 h-4" /> تعليق
                                                        </button>
                                                        <button
                                                            onClick={() => { setShowDelete(user.id); setActionMenu(null); }}
                                                            className="flex items-center gap-2 w-full px-3 py-2 text-sm text-danger hover:bg-surface transition-colors rounded-b-xl"
                                                        >
                                                            <Trash2 className="w-4 h-4" /> حذف
                                                        </button>
                                                    </div>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <Pagination
                        currentPage={page}
                        totalPages={totalPages}
                        totalItems={filtered.length}
                        pageSize={pageSize}
                        onPageChange={setPage}
                    />
                </div>
            )}

            {/* Create User Modal */}
            <Modal isOpen={showCreate} onClose={() => setShowCreate(false)} title="إضافة مستخدم جديد">
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        showToast({ type: "success", title: "تم إنشاء المستخدم بنجاح" });
                        setShowCreate(false);
                    }}
                    className="space-y-4"
                >
                    <div>
                        <label className="block text-sm font-medium text-muted-foreground mb-1.5">الاسم</label>
                        <input type="text" placeholder="اسم المستخدم" required />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-muted-foreground mb-1.5">البريد الإلكتروني</label>
                        <input type="email" placeholder="user@example.com" dir="ltr" required />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-muted-foreground mb-1.5">الدور</label>
                        <select defaultValue="member">
                            <option value="admin">مدير</option>
                            <option value="member">عضو</option>
                        </select>
                    </div>
                    <label className="flex items-center gap-2 text-sm text-muted cursor-pointer">
                        <input type="checkbox" defaultChecked className="w-4 h-4 rounded border-border bg-surface accent-accent" />
                        إرسال دعوة بالبريد
                    </label>
                    <div className="flex gap-3 pt-2">
                        <button type="button" onClick={() => setShowCreate(false)} className="btn-ghost flex-1">إلغاء</button>
                        <button type="submit" className="btn-primary flex-1">إنشاء</button>
                    </div>
                </form>
            </Modal>

            {/* Delete Confirm */}
            <ConfirmDialog
                isOpen={!!showDelete}
                onClose={() => setShowDelete(null)}
                onConfirm={() => {
                    showToast({ type: "success", title: "تم حذف المستخدم" });
                    setShowDelete(null);
                }}
                title="حذف المستخدم"
                message="هل أنت متأكد من حذف هذا المستخدم؟ لا يمكن التراجع عن هذا الإجراء."
                confirmText="حذف"
            />

            {/* User Detail Drawer */}
            <Drawer
                isOpen={!!selectedUser}
                onClose={() => setSelectedUser(null)}
                title="تفاصيل المستخدم"
            >
                {drawerUser && (
                    <div className="space-y-6">
                        <div className="flex items-center gap-4">
                            <Avatar name={drawerUser.name} size="lg" />
                            <div>
                                <h3 className="text-lg font-semibold text-white">{drawerUser.name}</h3>
                                <p className="text-sm text-muted">{drawerUser.email}</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-surface rounded-xl p-4">
                                <div className="flex items-center gap-2 mb-2">
                                    <Shield className="w-4 h-4 text-muted" />
                                    <span className="text-xs text-muted">الدور</span>
                                </div>
                                <RoleBadge role={drawerUser.role} />
                            </div>
                            <div className="bg-surface rounded-xl p-4">
                                <div className="flex items-center gap-2 mb-2">
                                    <CreditCard className="w-4 h-4 text-muted" />
                                    <span className="text-xs text-muted">الخطة</span>
                                </div>
                                <PlanBadge plan={drawerUser.plan} />
                            </div>
                            <div className="bg-surface rounded-xl p-4">
                                <div className="flex items-center gap-2 mb-2">
                                    <Mail className="w-4 h-4 text-muted" />
                                    <span className="text-xs text-muted">المنظمة</span>
                                </div>
                                <p className="text-sm text-white">{drawerUser.organization}</p>
                            </div>
                            <div className="bg-surface rounded-xl p-4">
                                <div className="flex items-center gap-2 mb-2">
                                    <Calendar className="w-4 h-4 text-muted" />
                                    <span className="text-xs text-muted">آخر دخول</span>
                                </div>
                                <p className="text-sm text-white">{formatRelativeTime(drawerUser.lastLogin)}</p>
                            </div>
                        </div>

                        <div>
                            <h4 className="text-sm font-semibold text-white flex items-center gap-2 mb-3">
                                <Activity className="w-4 h-4" />
                                سجل النشاط
                            </h4>
                            <div className="space-y-2">
                                {["تسجيل دخول ناجح", "تم تحديث الملف الشخصي", "تم ترقية الخطة"].map((act, i) => (
                                    <div key={i} className="flex items-center gap-2 py-2">
                                        <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                                        <span className="text-sm text-muted-foreground">{act}</span>
                                        <span className="text-xs text-muted mr-auto">{formatRelativeTime(new Date(Date.now() - i * 1000 * 60 * 60 * 24))}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </Drawer>
        </div>
    );
}
