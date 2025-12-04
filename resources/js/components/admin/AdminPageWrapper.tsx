import React from "react";

export default function AdminPageWrapper({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex flex-col gap-6 p-6 lg:p-8">{children}</div>
    );
}
