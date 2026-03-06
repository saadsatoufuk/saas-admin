"use client";

import { cn } from "@/lib/utils";

interface Tab {
    id: string;
    label: string;
    count?: number;
}

interface TabGroupProps {
    tabs: Tab[];
    activeTab: string;
    onTabChange: (tabId: string) => void;
    className?: string;
}

export function TabGroup({ tabs, activeTab, onTabChange, className }: TabGroupProps) {
    return (
        <div className={cn("flex gap-1 p-1 bg-surface rounded-xl border border-border", className)}>
            {tabs.map((tab) => (
                <button
                    key={tab.id}
                    onClick={() => onTabChange(tab.id)}
                    className={cn(
                        "px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                        activeTab === tab.id
                            ? "bg-card text-white shadow-sm"
                            : "text-muted hover:text-white"
                    )}
                >
                    {tab.label}
                    {tab.count !== undefined && (
                        <span
                            className={cn(
                                "mr-2 px-1.5 py-0.5 rounded-md text-[11px]",
                                activeTab === tab.id
                                    ? "bg-accent/20 text-accent"
                                    : "bg-surface text-muted"
                            )}
                        >
                            {tab.count}
                        </span>
                    )}
                </button>
            ))}
        </div>
    );
}
