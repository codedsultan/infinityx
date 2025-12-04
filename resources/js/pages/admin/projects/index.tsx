import React, { useState } from "react";
import { Head, router } from "@inertiajs/react";
import AppLayout from "@/layouts/app-layout";

import type {
    ProjectsPagination,
    ProjectSummary,
    ProjectDetail,
    ProjectFilters,
} from '@/types/admin';

import AdminCard from "@/components/admin/AdminCard";
import AdminListItem from "@/components/admin/AdminListItem";
import AdminSectionHeader from "@/components/admin/AdminSectionHeader";
import AdminPageWrapper from "@/components/admin/AdminPageWrapper";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";

import {
    Search,
    Plus,
    Edit,
    Trash2,
    Star,
    ExternalLink,
    Github,
    Filter,
    ChevronRight
} from "lucide-react";

interface ProjectsPageProps {
    projects: ProjectsPagination;
    filters: ProjectFilters;
}

export default function ProjectsIndex({ projects, filters }: ProjectsPageProps) {
    const [search, setSearch] = useState(filters.search ?? "");
    const [category, setCategory] = useState(filters.category ?? "all");

    // FEATURED FILTER NOT SUPPORTED IN UI → NOT USED
    const [showFilters, setShowFilters] = useState(false);

    // MODAL STATE
    const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState<ProjectSummary | null>(null);

    const openModal = (project: ProjectSummary) => {
        setSelected(project);
        setOpen(true);
    };

    const applyFilters = () => {
        router.get("/manage/projects", { search, category });
    };

    const toggleFeatured = (id: number) =>
        router.post(`/manage/projects/${id}/toggle-featured`, {}, { preserveScroll: true });

    const deleteProject = (project: ProjectSummary) => {
        if (confirm(`Delete project "${project.title}"? This cannot be undone.`)) {
            router.delete(`/manage/projects/${project.id}`, { preserveScroll: true });
        }
    };

    return (
        <AppLayout breadcrumbs={[{ title: "Projects", href: "#" }]}>
            <Head title="Projects" />

            <AdminPageWrapper>
                {/* HEADER */}
                <div className="flex items-center justify-between">
                    <AdminSectionHeader
                        title="Projects"
                        description="Manage your portfolio projects."
                    />

                    <a
                        href="/manage/projects/create"
                        className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                        <Plus size={18} />
                        Add Project
                    </a>
                </div>

                {/* SEARCH & FILTER ROW */}
                <AdminCard className="p-4">
                    <div className="flex flex-col md:flex-row gap-4">

                        {/* Search Field */}
                        <div className="flex-1 relative">
                            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                            <Input
                                className="pl-10"
                                placeholder="Search projects…"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>

                        {/* Filters */}
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => setShowFilters(!showFilters)}
                            className="flex items-center gap-2"
                        >
                            <Filter size={16} /> Filters
                        </Button>

                        <Button onClick={applyFilters}>Search</Button>
                    </div>

                    {/* DROPDOWN FILTERS */}
                    {showFilters && (
                        <div className="mt-4 border-t border-border pt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="text-sm text-muted-foreground mb-1 block">Category</label>
                                <select
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                    className="w-full px-4 py-2 border rounded-lg bg-background text-foreground"
                                >
                                    <option value="all">All</option>
                                    <option value="backend">Backend</option>
                                    <option value="frontend">Frontend</option>
                                    <option value="fullstack">Fullstack</option>
                                </select>
                            </div>
                        </div>
                    )}
                </AdminCard>

                {/* PROJECT GRID */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {projects.data.map((project) => (
                        <AdminCard
                            key={project.id}
                            className="p-0 overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
                            onClick={() => openModal(project)}
                        >
                            {/* IMAGE */}
                            {project.featured_image && (
                                <img
                                    src={project.featured_image}
                                    alt={project.title}
                                    className="w-full h-48 object-cover rounded-t-xl"
                                />
                            )}

                            {/* CONTENT */}
                            <div className="p-6">

                                <div className="flex justify-between items-start">
                                    <div>
                                        <h3 className="text-xl font-semibold text-foreground">
                                            {project.title}
                                        </h3>

                                        <div className="flex items-center gap-2 mt-1">
                                            <span className="px-2 py-1 text-xs bg-muted rounded text-muted-foreground">
                                                {project.category}
                                            </span>

                                            {project.is_featured && (
                                                <span className="px-2 py-1 text-xs bg-yellow-500/20 text-yellow-600 dark:text-yellow-400 rounded flex items-center gap-1">
                                                    <Star size={12} />
                                                    Featured
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    {/* FEATURE TOGGLE */}
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            toggleFeatured(project.id);
                                        }}
                                        className={`p-2 rounded-lg transition ${project.is_featured
                                            ? "text-yellow-600 hover:bg-yellow-500/10"
                                            : "text-muted-foreground hover:bg-muted/40"
                                            }`}
                                    >
                                        <Star size={18} fill={project.is_featured ? "currentColor" : "none"} />
                                    </button>
                                </div>

                                <p className="text-muted-foreground text-sm mt-2 line-clamp-3">
                                    {project.description}
                                </p>

                                {/* VIEW BUTTON */}
                                <div className="flex justify-end mt-4">
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            openModal(project);
                                        }}
                                        className="text-blue-600 hover:text-blue-700 text-sm flex items-center gap-1"
                                    >
                                        View Details
                                        <ChevronRight size={14} />
                                    </button>
                                </div>
                            </div>
                        </AdminCard>
                    ))}
                </div>

                {/* PAGINATION */}
                {projects.links.length > 3 && (
                    <div className="flex justify-center mt-6">
                        <nav className="flex gap-2">
                            {projects.links.map((link, index) => (
                                <button
                                    key={index}
                                    disabled={!link.url}
                                    onClick={() => link.url && router.visit(link.url)}
                                    className={`px-4 py-2 rounded-lg ${link.active
                                        ? "bg-blue-600 text-white"
                                        : "bg-card border border-border text-foreground hover:bg-muted"
                                        } ${!link.url && "opacity-50 cursor-not-allowed"}`}
                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                />
                            ))}
                        </nav>
                    </div>
                )}

                {/* ========= PROJECT DETAILS MODAL ========= */}
                <Dialog open={open} onOpenChange={setOpen}>
                    <DialogContent className="max-w-3xl max-h-[85vh] overflow-y-auto">
                        <DialogHeader>
                            <DialogTitle>{selected?.title}</DialogTitle>
                            <DialogDescription>
                                Full project details and actions.
                            </DialogDescription>
                        </DialogHeader>

                        {selected && (
                            <div className="space-y-6 mt-4">
                                {/* FEATURED IMAGE */}
                                {selected.featured_image && (
                                    <img
                                        src={selected.featured_image}
                                        className="w-full rounded-lg"
                                        alt="Featured"
                                    />
                                )}

                                {/* DESCRIPTION */}
                                <div>
                                    <h3 className="font-medium text-foreground mb-1">Short Description</h3>
                                    <p className="text-muted-foreground">{selected.description}</p>
                                </div>

                                {/* TECHNOLOGIES */}
                                <div>
                                    <h3 className="font-medium text-foreground mb-1">Technologies</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {selected.technologies.map((tech) => (
                                            <span
                                                key={tech}
                                                className="px-2 py-1 text-xs bg-blue-500/10 text-blue-600 dark:text-blue-400 rounded"
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* LINKS */}
                                <div className="flex items-center gap-4">
                                    {selected.github_url && (
                                        <a
                                            href={selected.github_url}
                                            target="_blank"
                                            className="flex items-center gap-1 text-muted-foreground hover:text-foreground"
                                        >
                                            <Github size={16} /> GitHub
                                        </a>
                                    )}
                                    {selected.live_url && (
                                        <a
                                            href={selected.live_url}
                                            target="_blank"
                                            className="flex items-center gap-1 text-muted-foreground hover:text-foreground"
                                        >
                                            <ExternalLink size={16} /> Live Demo
                                        </a>
                                    )}
                                </div>

                                {/* ACTION BUTTONS */}
                                <div className="flex gap-4 pt-4 border-t border-border">
                                    <a
                                        href={`/manage/projects/${selected.id}/edit`}
                                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
                                    >
                                        <Edit size={16} /> Edit
                                    </a>

                                    <button
                                        onClick={() => selected && deleteProject(selected)}
                                        className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 flex items-center gap-2"
                                    >
                                        <Trash2 size={16} /> Delete
                                    </button>
                                </div>
                            </div>
                        )}
                    </DialogContent>
                </Dialog>
            </AdminPageWrapper>
        </AppLayout>
    );
}
