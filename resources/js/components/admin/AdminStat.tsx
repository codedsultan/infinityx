import React from "react";
import { cn } from "@/lib/utils";

export default function AdminStat({
    icon: Icon,
    label,
    value,
    color,
}: {
    icon: React.ElementType;
    label: string;
    value: number | string;
    color: string; // e.g. "blue", "green", "yellow"
}) {
    return (
        <div className="bg-card text-card-foreground rounded-xl border border-border p-4 shadow-sm flex items-center gap-4">
            <div
                className={cn(
                    "p-3 rounded-lg flex items-center justify-center",
                    `bg-${color}-500/10 text-${color}-600 dark:text-${color}-400`
                )}
            >
                <Icon size={22} />
            </div>

            <div>
                <p className="text-2xl font-semibold text-foreground">{value}</p>
                <p className="text-sm text-muted-foreground">{label}</p>
            </div>
        </div>
    );
}
