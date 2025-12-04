import { Head } from "@inertiajs/react";
import AppLayout from "@/layouts/app-layout";
import type { BreadcrumbItem } from "@/types";
import AdminProjectForm from "./partials/form";
import type { ProjectDetail } from "@/types/admin";

export default function Edit({
    project,
    errors,
}: {
    project: ProjectDetail;
    errors: Record<string, string>;
}) {
    const breadcrumbs: BreadcrumbItem[] = [
        { title: "Projects", href: "/manage/projects" },
        { title: "Edit Project", href: "#" },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Edit: ${project.title}`} />
            <div className="p-6">
                <AdminProjectForm project={project} errors={errors} />
            </div>
        </AppLayout>
    );
}
