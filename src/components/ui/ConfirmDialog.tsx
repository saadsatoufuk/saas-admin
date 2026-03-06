"use client";

import { Modal } from "./Modal";
import { AlertTriangle } from "lucide-react";

interface ConfirmDialogProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title: string;
    message: string;
    confirmText?: string;
    cancelText?: string;
    variant?: "danger" | "warning";
    loading?: boolean;
}

export function ConfirmDialog({
    isOpen,
    onClose,
    onConfirm,
    title,
    message,
    confirmText = "تأكيد",
    cancelText = "إلغاء",
    variant = "danger",
    loading = false,
}: ConfirmDialogProps) {
    return (
        <Modal isOpen={isOpen} onClose={onClose} title={title} size="sm">
            <div className="flex flex-col items-center text-center">
                <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center mb-4 ${variant === "danger" ? "bg-danger/10" : "bg-warning/10"
                        }`}
                >
                    <AlertTriangle
                        className={`w-6 h-6 ${variant === "danger" ? "text-danger" : "text-warning"
                            }`}
                    />
                </div>
                <p className="text-sm text-muted-foreground mb-6">{message}</p>
                <div className="flex gap-3 w-full">
                    <button
                        onClick={onClose}
                        disabled={loading}
                        className="btn-ghost flex-1"
                    >
                        {cancelText}
                    </button>
                    <button
                        onClick={onConfirm}
                        disabled={loading}
                        className={`flex-1 px-4 py-2 rounded-lg font-medium text-sm text-white transition-colors ${variant === "danger"
                                ? "bg-danger hover:bg-danger/90"
                                : "bg-warning hover:bg-warning/90"
                            } disabled:opacity-50`}
                    >
                        {loading ? "جاري التنفيذ..." : confirmText}
                    </button>
                </div>
            </div>
        </Modal>
    );
}
