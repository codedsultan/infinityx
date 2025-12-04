import { Head } from "@inertiajs/react";
import AppLayout from "@/layouts/app-layout";
import type { BreadcrumbItem } from "@/types";
import AdminProjectForm from "./partials/form";

export default function Create({ errors }: { errors: Record<string, string> }) {
    const breadcrumbs: BreadcrumbItem[] = [
        { title: "Projects", href: "/manage/projects" },
        { title: "Create Project", href: "#" },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Project" />
            <div className="p-6">
                <AdminProjectForm errors={errors} />
            </div>
        </AppLayout>
    );
}
