"use client";

import {
    BarChart as RechartsBarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

interface BarChartProps {
    data: Array<Record<string, unknown>>;
    dataKey: string;
    xAxisKey: string;
    color?: string;
    height?: number;
}

export function BarChartComponent({
    data,
    dataKey,
    xAxisKey,
    color = "#6366F1",
    height = 300,
}: BarChartProps) {
    return (
        <ResponsiveContainer width="100%" height={height}>
            <RechartsBarChart data={data} margin={{ top: 5, right: 0, left: 0, bottom: 5 }}>
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
                    cursor={{ fill: "rgba(99, 102, 241, 0.1)" }}
                />
                <Bar
                    dataKey={dataKey}
                    fill={color}
                    radius={[6, 6, 0, 0]}
                    maxBarSize={40}
                />
            </RechartsBarChart>
        </ResponsiveContainer>
    );
}
