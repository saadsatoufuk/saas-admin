"use client";

import { useState } from "react";
import { TabGroup } from "@/components/ui/TabGroup";
import { useToast } from "@/components/ui/Toast";
import { ConfirmDialog } from "@/components/ui/ConfirmDialog";
import { Badge } from "@/components/ui/Badge";
import { Avatar } from "@/components/ui/Avatar";
import { formatRelativeTime } from "@/lib/utils";
import {
    Building2,
    User,
    Bell,
    Shield,
    AlertTriangle,
    Upload,
    Key,
    Copy,
    Trash2,
    Monitor,
    Smartphone,
    Eye,
    EyeOff,
} from "lucide-react";

const sessions = [
    { id: "1", device: "Chrome - Mac OS", location: "الرياض، السعودية", lastActive: new Date(Date.now() - 1000 * 60 * 5), icon: Monitor, current: true },
    { id: "2", device: "Safari - iPhone", location: "جدة، السعودية", lastActive: new Date(Date.now() - 1000 * 60 * 60 * 3), icon: Smartphone, current: false },
];

const apiKeys = [
    { id: "1", name: "مفتاح الإنتاج", key: "sk_live_abc123...xyz", created: new Date("2024-11-01") },
    { id: "2", name: "مفتاح التطوير", key: "sk_test_def456...uvw", created: new Date("2024-12-15") },
];

export default function SettingsPage() {
    const { showToast } = useToast();
    const [activeTab, setActiveTab] = useState("general");
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const tabs = [
        { id: "general", label: "عام" },
        { id: "profile", label: "الملف الشخصي" },
        { id: "notifications", label: "الإشعارات" },
        { id: "security", label: "الأمان" },
        { id: "danger", label: "خطر" },
    ];

    return (
        <div className="space-y-6 animate-fade-in">
            <div>
                <h1 className="text-2xl font-bold text-white">الإعدادات</h1>
                <p className="text-sm text-muted mt-1">إدارة إعدادات حسابك ومنظمتك</p>
            </div>

            <TabGroup tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />

            {/* General Tab */}
            {activeTab === "general" && (
                <div className="bg-card rounded-xl border border-border p-6 space-y-6">
                    <div className="flex items-center gap-3 mb-2">
                        <Building2 className="w-5 h-5 text-accent" />
                        <h3 className="text-base font-semibold text-white">إعدادات المنظمة</h3>
                    </div>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-muted-foreground mb-1.5">اسم المنظمة</label>
                            <input type="text" defaultValue="شركة التقنية" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-muted-foreground mb-1.5">شعار المنظمة</label>
                            <div className="flex items-center gap-4">
                                <div className="w-16 h-16 rounded-2xl bg-surface border border-border flex items-center justify-center">
                                    <Upload className="w-6 h-6 text-muted" />
                                </div>
                                <button className="btn-ghost">رفع شعار</button>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-muted-foreground mb-1.5">المنطقة الزمنية</label>
                                <select defaultValue="Asia/Riyadh">
                                    <option value="Asia/Riyadh">الرياض (GMT+3)</option>
                                    <option value="Asia/Dubai">دبي (GMT+4)</option>
                                    <option value="Africa/Cairo">القاهرة (GMT+2)</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-muted-foreground mb-1.5">اللغة</label>
                                <select defaultValue="ar">
                                    <option value="ar">العربية</option>
                                    <option value="en">English</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <button
                        onClick={() => showToast({ type: "success", title: "تم حفظ الإعدادات" })}
                        className="btn-primary"
                    >
                        حفظ التغييرات
                    </button>
                </div>
            )}

            {/* Profile Tab */}
            {activeTab === "profile" && (
                <div className="space-y-6">
                    <div className="bg-card rounded-xl border border-border p-6 space-y-6">
                        <div className="flex items-center gap-3 mb-2">
                            <User className="w-5 h-5 text-accent" />
                            <h3 className="text-base font-semibold text-white">المعلومات الشخصية</h3>
                        </div>
                        <div className="flex items-center gap-4 mb-4">
                            <Avatar name="أحمد محمد" size="lg" />
                            <button className="btn-ghost">تغيير الصورة</button>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-muted-foreground mb-1.5">الاسم</label>
                                <input type="text" defaultValue="أحمد محمد" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-muted-foreground mb-1.5">البريد الإلكتروني</label>
                                <input type="email" defaultValue="ahmed@company.com" dir="ltr" />
                            </div>
                        </div>
                        <button onClick={() => showToast({ type: "success", title: "تم تحديث الملف الشخصي" })} className="btn-primary">
                            حفظ
                        </button>
                    </div>

                    <div className="bg-card rounded-xl border border-border p-6 space-y-4">
                        <h3 className="text-base font-semibold text-white">تغيير كلمة المرور</h3>
                        <div>
                            <label className="block text-sm font-medium text-muted-foreground mb-1.5">كلمة المرور الحالية</label>
                            <div className="relative">
                                <input type={showPassword ? "text" : "password"} placeholder="••••••••" className="pl-10" dir="ltr" />
                                <button onClick={() => setShowPassword(!showPassword)} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted hover:text-white">
                                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                </button>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-muted-foreground mb-1.5">كلمة المرور الجديدة</label>
                                <input type="password" placeholder="••••••••" dir="ltr" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-muted-foreground mb-1.5">تأكيد كلمة المرور</label>
                                <input type="password" placeholder="••••••••" dir="ltr" />
                            </div>
                        </div>
                        <button onClick={() => showToast({ type: "success", title: "تم تغيير كلمة المرور" })} className="btn-primary">
                            تحديث كلمة المرور
                        </button>
                    </div>
                </div>
            )}

            {/* Notifications Tab */}
            {activeTab === "notifications" && (
                <div className="bg-card rounded-xl border border-border p-6 space-y-6">
                    <div className="flex items-center gap-3 mb-2">
                        <Bell className="w-5 h-5 text-accent" />
                        <h3 className="text-base font-semibold text-white">تفضيلات الإشعارات</h3>
                    </div>
                    {[
                        { label: "إشعارات البريد الإلكتروني", desc: "استلام الإشعارات عبر البريد", default: true },
                        { label: "إشعارات داخل التطبيق", desc: "عرض الإشعارات داخل التطبيق", default: true },
                        { label: "الملخص الأسبوعي", desc: "استلام ملخص أسبوعي بالأنشطة", default: false },
                        { label: "تنبيهات الفواتير", desc: "تنبيه عند اقتراب موعد الفوترة", default: true },
                        { label: "تنبيهات الأمان", desc: "تنبيه عند تسجيل دخول من جهاز جديد", default: true },
                    ].map((item, i) => (
                        <div key={i} className="flex items-center justify-between py-3 border-b border-border last:border-0">
                            <div>
                                <p className="text-sm font-medium text-white">{item.label}</p>
                                <p className="text-xs text-muted mt-0.5">{item.desc}</p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input type="checkbox" defaultChecked={item.default} className="sr-only peer" />
                                <div className="w-11 h-6 bg-surface rounded-full peer peer-checked:bg-accent transition-colors after:content-[''] after:absolute after:top-[2px] after:right-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-[-20px]" />
                            </label>
                        </div>
                    ))}
                    <button onClick={() => showToast({ type: "success", title: "تم حفظ التفضيلات" })} className="btn-primary">
                        حفظ
                    </button>
                </div>
            )}

            {/* Security Tab */}
            {activeTab === "security" && (
                <div className="space-y-6">
                    <div className="bg-card rounded-xl border border-border p-6">
                        <div className="flex items-center gap-3 mb-4">
                            <Shield className="w-5 h-5 text-accent" />
                            <h3 className="text-base font-semibold text-white">الجلسات النشطة</h3>
                        </div>
                        <div className="space-y-3">
                            {sessions.map((s) => (
                                <div key={s.id} className="flex items-center gap-4 p-4 bg-surface rounded-xl border border-border">
                                    <s.icon className="w-5 h-5 text-muted" />
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2">
                                            <p className="text-sm font-medium text-white">{s.device}</p>
                                            {s.current && <Badge variant="success">الجلسة الحالية</Badge>}
                                        </div>
                                        <p className="text-xs text-muted mt-0.5">{s.location} • {formatRelativeTime(s.lastActive)}</p>
                                    </div>
                                    {!s.current && (
                                        <button onClick={() => showToast({ type: "info", title: "تم إنهاء الجلسة" })} className="btn-ghost text-xs">
                                            إنهاء
                                        </button>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-card rounded-xl border border-border p-6">
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-3">
                                <Key className="w-5 h-5 text-accent" />
                                <h3 className="text-base font-semibold text-white">مفاتيح API</h3>
                            </div>
                            <button onClick={() => showToast({ type: "success", title: "تم إنشاء مفتاح جديد" })} className="btn-primary text-xs py-1.5">
                                إنشاء مفتاح
                            </button>
                        </div>
                        <div className="space-y-3">
                            {apiKeys.map((k) => (
                                <div key={k.id} className="flex items-center gap-4 p-4 bg-surface rounded-xl border border-border">
                                    <div className="flex-1">
                                        <p className="text-sm font-medium text-white">{k.name}</p>
                                        <p className="text-xs text-muted font-mono mt-0.5" dir="ltr">{k.key}</p>
                                    </div>
                                    <button
                                        onClick={() => showToast({ type: "success", title: "تم نسخ المفتاح" })}
                                        className="p-2 rounded-lg text-muted hover:text-white hover:bg-card transition-colors"
                                    >
                                        <Copy className="w-4 h-4" />
                                    </button>
                                    <button
                                        onClick={() => showToast({ type: "info", title: "تم إلغاء المفتاح" })}
                                        className="p-2 rounded-lg text-muted hover:text-danger hover:bg-card transition-colors"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* Danger Zone */}
            {activeTab === "danger" && (
                <div className="bg-card rounded-xl border border-danger/30 p-6 space-y-6">
                    <div className="flex items-center gap-3 mb-2">
                        <AlertTriangle className="w-5 h-5 text-danger" />
                        <h3 className="text-base font-semibold text-danger">منطقة خطرة</h3>
                    </div>

                    <div className="p-4 bg-surface rounded-xl border border-border">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-white">مغادرة المنظمة</p>
                                <p className="text-xs text-muted mt-0.5">ستفقد الوصول إلى جميع موارد المنظمة</p>
                            </div>
                            <button onClick={() => showToast({ type: "warning", title: "يرجى التواصل مع المدير" })} className="btn-ghost text-danger border-danger/30 text-xs">
                                مغادرة
                            </button>
                        </div>
                    </div>

                    <div className="p-4 bg-surface rounded-xl border border-danger/20">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-white">حذف الحساب</p>
                                <p className="text-xs text-muted mt-0.5">سيتم حذف جميع بياناتك نهائياً ولا يمكن التراجع</p>
                            </div>
                            <button onClick={() => setShowDeleteConfirm(true)} className="btn-danger text-xs">
                                حذف الحساب
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <ConfirmDialog
                isOpen={showDeleteConfirm}
                onClose={() => setShowDeleteConfirm(false)}
                onConfirm={() => {
                    showToast({ type: "info", title: "تم طلب حذف الحساب" });
                    setShowDeleteConfirm(false);
                }}
                title="حذف الحساب نهائياً"
                message="هذا الإجراء لا يمكن التراجع عنه. سيتم حذف جميع بياناتك ومشاريعك وملفاتك نهائياً."
                confirmText="حذف نهائياً"
            />
        </div>
    );
}
