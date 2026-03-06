"use client";

import {
    AreaChart as RechartsAreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

interface AreaChartProps {
    data: Array<Record<string, unknown>>;
    dataKey: string;
    xAxisKey: string;
    color?: string;
    height?: number;
    showGrid?: boolean;
}

export function AreaChartComponent({
    data,
    dataKey,
    xAxisKey,
    color = "#6366F1",
    height = 300,
    showGrid = false,
}: AreaChartProps) {
    return (
        <ResponsiveContainer width="100%" height={height}>
            <RechartsAreaChart data={data} margin={{ top: 5, right: 0, left: 0, bottom: 5 }}>
                {showGrid && <CartesianGrid strokeDasharray="3 3" stroke="#2A2A2A" />}
                <defs>
                    <linearGradient id={`gradient-${dataKey}`} x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={color} stopOpacity={0.3} />
                        <stop offset="95%" stopColor={color} stopOpacity={0} />
                    </linearGradient>
                </defs>
                <XAxis
                    dataKey={xAxisKey}
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "#6B7280", fontSize: 12 }}
                />
                <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "#6B7280", fontSize: 12 }}
                    width={40}
                />
                <Tooltip
                    contentStyle={{
                        backgroundColor: "#1A1A1A",
                        border: "1px solid #2A2A2A",
                        borderRadius: "0.75rem",
                        color: "#fff",
                        fontSize: "0.875rem",
                    }}
                />
                <Area
                    type="monotone"
                    dataKey={dataKey}
                    stroke={color}
                    strokeWidth={2}
                    fill={`url(#gradient-${dataKey})`}
                />
            </RechartsAreaChart>
        </ResponsiveContainer>
    );
}
