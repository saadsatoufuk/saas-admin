"use client";

import {
    PieChart,
    Pie,
    Cell,
    ResponsiveContainer,
    Tooltip,
    Legend,
} from "recharts";

interface DonutChartProps {
    data: Array<{ name: string; value: number; color: string }>;
    height?: number;
}

export function DonutChart({ data, height = 300 }: DonutChartProps) {
    return (
        <ResponsiveContainer width="100%" height={height}>
            <PieChart>
                <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={4}
                    dataKey="value"
                    stroke="none"
                >
                    {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                </Pie>
                <Tooltip
                    contentStyle={{
                        backgroundColor: "#1A1A1A",
                        border: "1px solid #2A2A2A",
                        borderRadius: "0.75rem",
                        color: "#fff",
                        fontSize: "0.875rem",
                    }}
                />
                <Legend
                    wrapperStyle={{ fontSize: "0.75rem", color: "#9CA3AF" }}
                    iconType="circle"
                    iconSize={8}
                />
            </PieChart>
        </ResponsiveContainer>
    );
}
