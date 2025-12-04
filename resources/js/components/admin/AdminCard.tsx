import React from "react";
import { cn } from "@/lib/utils";

interface AdminCardProps {
    className?: string;
    children: React.ReactNode;
    onClick?: () => void; // ✅ allow onClick
}

export default function AdminCard({ className, children, onClick }: AdminCardProps) {
    return (
        <div
            onClick={onClick}
            className={cn(
                "bg-card text-card-foreground rounded-xl border border-border shadow-sm transition-colors",
                onClick && "cursor-pointer", // auto-add cursor:pointer if clickable
                className
            )}
        >
            {children}
        </div>
    );
}
