import React from "react";
import { cn } from "@/lib/utils";

export default function AdminListItem({
    onClick,
    children,
    className,
}: {
    onClick?: () => void;
    children: React.ReactNode;
    className?: string;
}) {
    return (
        <div
            onClick={onClick}
            className={cn(
                "p-4 rounded-lg cursor-pointer border border-transparent hover:border-border hover:bg-muted transition-colors",
                "dark:hover:bg-muted/40",
                className
            )}
        >
            {children}
        </div>
    );
}
