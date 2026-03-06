"use client";

import { useState } from "react";
import { Avatar } from "@/components/ui/Avatar";
import { RoleBadge, StatusBadge } from "@/components/ui/Badge";
import { Modal } from "@/components/ui/Modal";
import { ConfirmDialog } from "@/components/ui/ConfirmDialog";
import { TabGroup } from "@/components/ui/TabGroup";
import { EmptyState } from "@/components/ui/EmptyState";
import { useToast } from "@/components/ui/Toast";
import { formatRelativeTime } from "@/lib/utils";
import {
    UserPlus,
    MoreHorizontal,
    Mail,
    RefreshCw,
    X,
} from "lucide-react";

const teamMembers = [
    { id: "1", name: "أحمد محمد", email: "ahmed@company.com", role: "admin", joinedAt: new Date("2024-03-15"), lastActive: new Date(Date.now() - 1000 * 60 * 30) },
    { id: "2", name: "سارة أحمد", email: "sara@company.com", role: "admin", joinedAt: new Date("2024-05-20"), lastActive: new Date(Date.now() - 1000 * 60 * 60 * 2) },
    { id: "3", name: "محمد علي", email: "mohamed@company.com", role: "member", joinedAt: new Date("2024-07-10"), lastActive: new Date(Date.now() - 1000 * 60 * 60 * 5) },
    { id: "4", name: "فاطمة حسن", email: "fatima@company.com", role: "member", joinedAt: new Date("2024-08-01"), lastActive: new Date(Date.now() - 1000 * 60 * 60 * 24) },
    { id: "5", name: "خالد عمر", email: "khaled@company.com", role: "member", joinedAt: new Date("2024-09-12"), lastActive: new Date(Date.now() - 1000 * 60 * 60 * 48) },
];

const pendingInvitations = [
    { id: "1", email: "new.member@example.com", role: "member", sentAt: new Date(Date.now() - 1000 * 60 * 60 * 2), status: "pending" },
    { id: "2", email: "dev@example.com", role: "admin", sentAt: new Date(Date.now() - 1000 * 60 * 60 * 24), status: "pending" },
];

export default function TeamPage() {
    const { showToast } = useToast();
    const [activeTab, setActiveTab] = useState("members");
    const [showInvite, setShowInvite] = useState(false);
    const [showRemove, setShowRemove] = useState<string | null>(null);
    const [actionMenu, setActionMenu] = useState<string | null>(null);

    return (
        <div className="space-y-6 animate-fade-in">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-white">الفريق</h1>
                    <p className="text-sm text-muted mt-1">إدارة أعضاء فريقك والدعوات</p>
                </div>
                <button onClick={() => setShowInvite(true)} className="btn-primary flex items-center gap-2">
                    <UserPlus className="w-4 h-4" />
                    دعوة عضو
                </button>
            </div>

            <TabGroup
                tabs={[
                    { id: "members", label: "الأعضاء", count: teamMembers.length },
                    { id: "invitations", label: "الدعوات المعلقة", count: pendingInvitations.length },
                ]}
                activeTab={activeTab}
                onTabChange={setActiveTab}
            />

            {activeTab === "members" && (
                <div className="bg-card rounded-xl border border-border overflow-hidden">
                    <div className="overflow-x-auto">
                        <table>
                            <thead>
                                <tr>
                                    <th>العضو</th>
                                    <th>الدور</th>
                                    <th>تاريخ الانضمام</th>
                                    <th>آخر نشاط</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {teamMembers.map((member) => (
                                    <tr key={member.id}>
                                        <td>
                                            <div className="flex items-center gap-3">
                                                <Avatar name={member.name} size="sm" />
                                                <div>
                                                    <p className="text-sm font-medium text-white">{member.name}</p>
                                                    <p className="text-xs text-muted">{member.email}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td><RoleBadge role={member.role} /></td>
                                        <td className="text-sm text-muted">{formatRelativeTime(member.joinedAt)}</td>
                                        <td className="text-sm text-muted">{formatRelativeTime(member.lastActive)}</td>
                                        <td>
                                            <div className="relative">
                                                <button
                                                    onClick={() => setActionMenu(actionMenu === member.id ? null : member.id)}
                                                    className="p-1.5 rounded-lg text-muted hover:text-white hover:bg-surface transition-colors"
                                                >
                                                    <MoreHorizontal className="w-4 h-4" />
                                                </button>
                                                {actionMenu === member.id && (
                                                    <div className="absolute left-0 top-full mt-1 w-40 bg-card border border-border rounded-xl shadow-2xl z-20 animate-fade-in">
                                                        <button
                                                            onClick={() => {
                                                                showToast({ type: "info", title: "تم تغيير الدور" });
                                                                setActionMenu(null);
                                                            }}
                                                            className="flex items-center gap-2 w-full px-3 py-2 text-sm text-muted hover:text-white hover:bg-surface transition-colors rounded-t-xl"
                                                        >
                                                            تغيير الدور
                                                        </button>
                                                        <button
                                                            onClick={() => {
                                                                setShowRemove(member.id);
                                                                setActionMenu(null);
                                                            }}
                                                            className="flex items-center gap-2 w-full px-3 py-2 text-sm text-danger hover:bg-surface transition-colors rounded-b-xl"
                                                        >
                                                            إزالة من الفريق
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
                </div>
            )}

            {activeTab === "invitations" && (
                <>
                    {pendingInvitations.length === 0 ? (
                        <EmptyState
                            icon={Mail}
                            title="لا توجد دعوات معلقة"
                            description="جميع الدعوات المرسلة تم قبولها"
                            action={{ label: "دعوة عضو جديد", onClick: () => setShowInvite(true) }}
                        />
                    ) : (
                        <div className="bg-card rounded-xl border border-border overflow-hidden">
                            <div className="overflow-x-auto">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>البريد الإلكتروني</th>
                                            <th>الدور</th>
                                            <th>تاريخ الإرسال</th>
                                            <th>الحالة</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {pendingInvitations.map((inv) => (
                                            <tr key={inv.id}>
                                                <td className="text-sm text-white">{inv.email}</td>
                                                <td><RoleBadge role={inv.role} /></td>
                                                <td className="text-sm text-muted">{formatRelativeTime(inv.sentAt)}</td>
                                                <td><StatusBadge status={inv.status} /></td>
                                                <td>
                                                    <div className="flex items-center gap-1">
                                                        <button
                                                            onClick={() => showToast({ type: "success", title: "تمت إعادة إرسال الدعوة" })}
                                                            className="p-1.5 rounded-lg text-muted hover:text-accent hover:bg-surface transition-colors"
                                                            title="إعادة إرسال"
                                                        >
                                                            <RefreshCw className="w-4 h-4" />
                                                        </button>
                                                        <button
                                                            onClick={() => showToast({ type: "info", title: "تم إلغاء الدعوة" })}
                                                            className="p-1.5 rounded-lg text-muted hover:text-danger hover:bg-surface transition-colors"
                                                            title="إلغاء"
                                                        >
                                                            <X className="w-4 h-4" />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}
                </>
            )}

            {/* Invite Modal */}
            <Modal isOpen={showInvite} onClose={() => setShowInvite(false)} title="دعوة عضو جديد">
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        showToast({ type: "success", title: "تم إرسال الدعوة بنجاح" });
                        setShowInvite(false);
                    }}
                    className="space-y-4"
                >
                    <div>
                        <label className="block text-sm font-medium text-muted-foreground mb-1.5">البريد الإلكتروني</label>
                        <input type="email" placeholder="member@example.com" dir="ltr" required />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-muted-foreground mb-1.5">الدور</label>
                        <select defaultValue="member">
                            <option value="admin">مدير</option>
                            <option value="member">عضو</option>
                        </select>
                    </div>
                    <div className="flex gap-3 pt-2">
                        <button type="button" onClick={() => setShowInvite(false)} className="btn-ghost flex-1">إلغاء</button>
                        <button type="submit" className="btn-primary flex-1">إرسال الدعوة</button>
                    </div>
                </form>
            </Modal>

            {/* Remove Confirm */}
            <ConfirmDialog
                isOpen={!!showRemove}
                onClose={() => setShowRemove(null)}
                onConfirm={() => {
                    showToast({ type: "success", title: "تمت إزالة العضو من الفريق" });
                    setShowRemove(null);
                }}
                title="إزالة العضو"
                message="هل أنت متأكد من إزالة هذا العضو من الفريق؟"
                confirmText="إزالة"
            />
        </div>
    );
}
