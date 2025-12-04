import React, { useState } from "react";
import { useForm } from "@inertiajs/react";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import InputError from "@/components/input-error";
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from "@/components/ui/select";


import { Plus, X, Upload } from "lucide-react";

import type { ProjectDetail } from "@/types/admin";

interface AdminProjectFormProps {
    project?: ProjectDetail | null;
    errors: Record<string, string>;
}

export default function AdminProjectForm({
    project = null,
    errors,
}: AdminProjectFormProps) {
    const isEdit = Boolean(project);

    // Inertia form state (THIS is the correct pattern)
    const form = useForm({
        title: project?.title ?? "",
        description: project?.description ?? "",
        full_description: project?.full_description ?? "",
        category: project?.category ?? "fullstack",
        technologies: project?.technologies ?? [],
        github_url: project?.github_url ?? "",
        live_url: project?.live_url ?? "",
        is_featured: project?.is_featured ?? false,
        completion_date: project?.completion_date ?? "",
        featured_image: null as File | null,
        remove_featured_image: false,
    });

    // Local UI state
    const [techInput, setTechInput] = useState("");
    const [preview, setPreview] = useState<string | null>(
        project?.featured_image ?? null
    );

    // Handle image upload
    const handleImageUpload = (file: File | null) => {
        if (!file) return;

        form.setData("featured_image", file);

        const reader = new FileReader();
        reader.onload = () => setPreview(reader.result as string);
        reader.readAsDataURL(file);
    };

    // Submit handler
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const url = isEdit
            ? `/admin/projects/${project!.id}`
            : "/admin/projects";

        form.post(url, {
            forceFormData: true,
            method: isEdit ? "put" : "post",
            onSuccess: () => {
                if (!isEdit) {
                    form.reset("title", "description", "technologies");
                    setPreview(null);
                }
            },
        });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-8">

            {/* ========================= */}
            {/* BASIC INFORMATION */}
            {/* ========================= */}
            <Card>
                <CardHeader>
                    <CardTitle>Basic Information</CardTitle>
                </CardHeader>

                <CardContent className="space-y-6">

                    {/* Title */}
                    <div>
                        <Label>Project Title *</Label>
                        <Input
                            value={form.data.title}
                            onChange={(e) => form.setData("title", e.target.value)}
                            placeholder="e.g., Enterprise API Gateway"
                        />
                        <InputError message={errors.title} />
                    </div>

                    {/* Description */}
                    <div>
                        <Label>Short Description *</Label>
                        <Textarea
                            rows={3}
                            value={form.data.description}
                            onChange={(e) =>
                                form.setData("description", e.target.value)
                            }
                            placeholder="Max 500 characters"
                        />
                        <InputError message={errors.description} />
                    </div>

                    {/* Full Description */}
                    <div>
                        <Label>Full Description</Label>
                        <Textarea
                            rows={6}
                            value={form.data.full_description}
                            onChange={(e) =>
                                form.setData("full_description", e.target.value)
                            }
                        />
                    </div>

                    {/* Category */}
                    <div>
                        <Label>Category *</Label>

                        <Select
                            value={form.data.category}
                            onValueChange={(value) =>
                                form.setData("category", value as "backend" | "frontend" | "fullstack")
                            }
                        >
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select category" />
                            </SelectTrigger>

                            <SelectContent>
                                <SelectItem value="backend">Backend</SelectItem>
                                <SelectItem value="frontend">Frontend</SelectItem>
                                <SelectItem value="fullstack">Fullstack</SelectItem>
                            </SelectContent>
                        </Select>

                        <InputError message={errors.category} />
                    </div>


                    {/* Completion Date */}
                    <div>
                        <Label>Completion Date</Label>
                        <Input
                            type="date"
                            value={form.data.completion_date ?? ""}
                            onChange={(e) =>
                                form.setData("completion_date", e.target.value)
                            }
                        />
                    </div>
                </CardContent>
            </Card>

            {/* ========================= */}
            {/* TECHNOLOGIES */}
            {/* ========================= */}
            <Card>
                <CardHeader>
                    <CardTitle>Technologies</CardTitle>
                </CardHeader>

                <CardContent className="space-y-4">

                    {/* Add tech */}
                    <div className="flex gap-2">
                        <Input
                            value={techInput}
                            onChange={(e) => setTechInput(e.target.value)}
                            placeholder="Add technology…"
                        />
                        <Button
                            type="button"
                            onClick={() => {
                                const tag = techInput.trim();
                                if (tag && !form.data.technologies.includes(tag)) {
                                    form.setData("technologies", [
                                        ...form.data.technologies,
                                        tag,
                                    ]);
                                    setTechInput("");
                                }
                            }}
                        >
                            <Plus size={16} />
                        </Button>
                    </div>

                    {/* Tech badges */}
                    <div className="flex flex-wrap gap-2">
                        {form.data.technologies.map((tech) => (
                            <Badge
                                key={tech}
                                variant="secondary"
                                className="px-3 py-1 flex items-center gap-1"
                            >
                                {tech}
                                <button
                                    type="button"
                                    onClick={() =>
                                        form.setData(
                                            "technologies",
                                            form.data.technologies.filter(
                                                (t) => t !== tech
                                            )
                                        )
                                    }
                                >
                                    <X size={12} />
                                </button>
                            </Badge>
                        ))}
                    </div>

                    <InputError message={errors.technologies} />
                </CardContent>
            </Card>

            {/* ========================= */}
            {/* FEATURED IMAGE */}
            {/* ========================= */}
            <Card>
                <CardHeader>
                    <CardTitle>Featured Image</CardTitle>
                </CardHeader>

                <CardContent className="space-y-4">

                    {/* Preview */}
                    <div className="flex gap-4 items-start">
                        {preview && (
                            <div className="relative">
                                <img
                                    src={preview}
                                    className="w-32 h-32 object-cover rounded-lg"
                                />
                                <button
                                    type="button"
                                    className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full p-1"
                                    onClick={() => {
                                        setPreview(null);
                                        form.setData("featured_image", null);
                                        form.setData("remove_featured_image", true);
                                    }}
                                >
                                    <X size={14} />
                                </button>
                            </div>
                        )}

                        {/* Upload */}
                        <Label className="border border-dashed rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer hover:border-blue-500 text-center">
                            <Upload size={20} className="mb-2 text-muted-foreground" />
                            <span>Upload Image</span>
                            <Input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={(e) =>
                                    handleImageUpload(e.target.files?.[0] ?? null)
                                }
                            />
                        </Label>
                    </div>

                    <InputError message={errors.featured_image} />
                </CardContent>
            </Card>

            {/* ========================= */}
            {/* LINKS */}
            {/* ========================= */}
            <Card>
                <CardHeader>
                    <CardTitle>Project Links</CardTitle>
                </CardHeader>

                <CardContent className="space-y-4">
                    <div>
                        <Label>GitHub URL</Label>
                        <Input
                            value={form.data.github_url}
                            onChange={(e) =>
                                form.setData("github_url", e.target.value)
                            }
                        />
                    </div>

                    <div>
                        <Label>Live URL</Label>
                        <Input
                            value={form.data.live_url}
                            onChange={(e) =>
                                form.setData("live_url", e.target.value)
                            }
                        />
                    </div>
                </CardContent>
            </Card>

            {/* ========================= */}
            {/* SETTINGS */}
            {/* ========================= */}
            <Card>
                <CardHeader>
                    <CardTitle>Settings</CardTitle>
                </CardHeader>

                <CardContent>
                    <div className="flex items-center gap-3">
                        <Checkbox
                            checked={form.data.is_featured}
                            onCheckedChange={(val) =>
                                form.setData("is_featured", Boolean(val))
                            }
                        />
                        <Label>Feature this project on homepage</Label>
                    </div>
                </CardContent>
            </Card>

            {/* ========================= */}
            {/* SUBMIT BUTTON */}
            {/* ========================= */}
            <Button
                type="submit"
                disabled={form.processing}
                className="w-full py-3 text-lg text-white  bg-blue-600 hover:bg-blue-700"
            >
                {form.processing
                    ? "Saving..."
                    : isEdit
                        ? "Update Project"
                        : "Create Project"}
            </Button>
        </form>
    );
}
