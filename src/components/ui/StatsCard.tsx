import { cn } from "@/lib/utils";
import { LucideIcon, TrendingUp, TrendingDown } from "lucide-react";

interface StatsCardProps {
    title: string;
    value: string | number;
    change?: number;
    changeLabel?: string;
    icon: LucideIcon;
    iconColor?: string;
}

export function StatsCard({ title, value, change, changeLabel, icon: Icon, iconColor = "text-accent" }: StatsCardProps) {
    const isPositive = change !== undefined && change >= 0;

    return (
        <div className="bg-card rounded-xl border border-border p-6 hover:border-accent/30 transition-all duration-300 group">
            <div className="flex items-start justify-between">
                <div className="flex-1">
                    <p className="text-sm text-muted mb-1">{title}</p>
                    <p className="text-2xl font-bold text-white">{value}</p>
                    {change !== undefined && (
                        <div className="flex items-center gap-1 mt-2">
                            {isPositive ? (
                                <TrendingUp className="w-3.5 h-3.5 text-success" />
                            ) : (
                                <TrendingDown className="w-3.5 h-3.5 text-danger" />
                            )}
                            <span
                                className={cn(
                                    "text-xs font-medium",
                                    isPositive ? "text-success" : "text-danger"
                                )}
                            >
                                {isPositive ? "+" : ""}{change}%
                            </span>
                            {changeLabel && (
                                <span className="text-xs text-muted mr-1">{changeLabel}</span>
                            )}
                        </div>
                    )}
                </div>
                <div className={cn("p-3 rounded-xl bg-surface", iconColor)}>
                    <Icon className="w-5 h-5" />
                </div>
            </div>
        </div>
    );
}
