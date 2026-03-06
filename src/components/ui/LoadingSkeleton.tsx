import { cn } from "@/lib/utils";

interface LoadingSkeletonProps {
    className?: string;
    count?: number;
}

export function LoadingSkeleton({ className, count = 1 }: LoadingSkeletonProps) {
    return (
        <>
            {Array.from({ length: count }).map((_, i) => (
                <div key={i} className={cn("skeleton h-4 w-full", className)} />
            ))}
        </>
    );
}

export function StatsCardSkeleton() {
    return (
        <div className="bg-card rounded-xl border border-border p-6">
            <div className="flex items-start justify-between">
                <div className="flex-1 space-y-3">
                    <div className="skeleton h-3 w-20" />
                    <div className="skeleton h-7 w-32" />
                    <div className="skeleton h-3 w-24" />
                </div>
                <div className="skeleton w-11 h-11 rounded-xl" />
            </div>
        </div>
    );
}

export function TableSkeleton({ rows = 5, cols = 5 }: { rows?: number; cols?: number }) {
    return (
        <div className="bg-card rounded-xl border border-border overflow-hidden">
            <div className="p-4 border-b border-border flex gap-4">
                <div className="skeleton h-9 w-64" />
                <div className="skeleton h-9 w-32" />
            </div>
            <table className="w-full">
                <thead>
                    <tr>
                        {Array.from({ length: cols }).map((_, i) => (
                            <th key={i} className="p-3">
                                <div className="skeleton h-3 w-20" />
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {Array.from({ length: rows }).map((_, i) => (
                        <tr key={i}>
                            {Array.from({ length: cols }).map((_, j) => (
                                <td key={j} className="p-3">
                                    <div className="skeleton h-4 w-full" />
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export function ChartSkeleton() {
    return (
        <div className="bg-card rounded-xl border border-border p-6">
            <div className="skeleton h-5 w-40 mb-6" />
            <div className="skeleton h-64 w-full rounded-lg" />
        </div>
    );
}
