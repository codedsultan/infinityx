import React from 'react';
import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import type {
    DashboardStats,
    DashboardProject,
    DashboardContact,
    DashboardCategoryCount,
    DashboardTrendPoint
} from '@/types/admin';
import type { BreadcrumbItem } from '@/types';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Package, Mail, Star, Clock, CheckCircle, Eye, TrendingUp } from 'lucide-react';
import AdminCard from "@/components/admin/AdminCard";
import AdminStat from "@/components/admin/AdminStat";
import AdminSectionHeader from "@/components/admin/AdminSectionHeader";
import AdminPageWrapper from "@/components/admin/AdminPageWrapper";

interface AdminDashboardProps {
    stats: DashboardStats;
    recentProjects: DashboardProject[];
    recentContacts: DashboardContact[];
    projectsByCategory: DashboardCategoryCount;
    contactsTrend: DashboardTrendPoint[];
}

export default function AdminDashboard({
    stats,
    recentProjects,
    recentContacts,
    projectsByCategory,
    contactsTrend
}: AdminDashboardProps) {
    const breadcrumbs: BreadcrumbItem[] = [
        { title: "Dashboard", href: "#" },
    ];

    const categoryData = [
        { name: "Backend", value: projectsByCategory.backend },
        { name: "Frontend", value: projectsByCategory.frontend },
        { name: "Fullstack", value: projectsByCategory.fullstack },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />

            <AdminPageWrapper>
                {/* 🔹 Section Header */}
                <AdminSectionHeader
                    title="Overview"
                    description="Quick insights into your portfolio performance."
                />

                {/* 🔹 STAT CARDS */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <AdminStat
                        icon={Package}
                        label="Total Projects"
                        value={stats.total_projects}
                        color="blue"
                    />
                    <AdminStat
                        icon={Star}
                        label="Featured Projects"
                        value={stats.featured_projects}
                        color="yellow"
                    />
                    <AdminStat
                        icon={Mail}
                        label="Total Messages"
                        value={stats.total_contacts}
                        color="green"
                    />
                    <AdminStat
                        icon={Clock}
                        label="Pending Replies"
                        value={stats.unreplied_contacts}
                        color="red"
                    />
                </div>

                {/* 🔹 CHARTS */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                    {/* Projects by Category */}
                    <AdminCard className="p-6">
                        <AdminSectionHeader title="Projects by Category" />
                        <ResponsiveContainer width="100%" height={260}>
                            <BarChart data={categoryData}>
                                <CartesianGrid strokeDasharray="3 3" className="text-muted-foreground/20" />
                                <XAxis dataKey="name" stroke="currentColor" />
                                <YAxis stroke="currentColor" />
                                <Tooltip />
                                <Bar dataKey="value" fill="#F53003" radius={[8, 8, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </AdminCard>

                    {/* Contacts Trend */}
                    <AdminCard className="p-6">
                        <AdminSectionHeader title="Messages (Last 7 Days)" />
                        <ResponsiveContainer width="100%" height={260}>
                            <LineChart data={contactsTrend}>
                                <CartesianGrid strokeDasharray="3 3" className="text-muted-foreground/20" />
                                <XAxis dataKey="date" stroke="currentColor" />
                                <YAxis stroke="currentColor" />
                                <Tooltip />
                                <Line type="monotone" dataKey="count" stroke="#F53003" strokeWidth={2} />
                            </LineChart>
                        </ResponsiveContainer>
                    </AdminCard>
                </div>

                {/* 🔹 RECENT ACTIVITY */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                    {/* Recent Projects */}
                    <AdminCard>
                        <div className="p-6 border-b border-border">
                            <AdminSectionHeader title="Recent Projects" />
                        </div>

                        <div className="divide-y divide-border">
                            {recentProjects.map((project) => (
                                <div key={project.id} className="p-6 hover:bg-muted/40 transition-colors">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h3 className="text-foreground font-semibold">{project.title}</h3>
                                            <p className="text-muted-foreground text-sm mt-1">{project.category}</p>
                                        </div>
                                        <span className="text-sm text-muted-foreground">
                                            {project.created_at}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="p-4 border-t border-border">
                            <a
                                href="/admin/projects"
                                className="text-blue-600 hover:underline text-sm"
                            >
                                View all projects →
                            </a>
                        </div>
                    </AdminCard>

                    {/* Recent Messages */}
                    <AdminCard>
                        <div className="p-6 border-b border-border">
                            <AdminSectionHeader title="Recent Messages" />
                        </div>

                        <div className="divide-y divide-border">
                            {recentContacts.map((contact) => (
                                <div key={contact.id} className="p-6 hover:bg-muted/40 transition-colors">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h3 className="text-foreground font-semibold">{contact.name}</h3>
                                            <p className="text-muted-foreground text-sm">{contact.email}</p>
                                            <p className="text-muted-foreground text-sm mt-1 line-clamp-2">
                                                {contact.message}
                                            </p>
                                        </div>
                                        <span className="text-sm text-muted-foreground">
                                            {contact.created_at}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="p-4 border-t border-border">
                            <a
                                href="/admin/contacts"
                                className="text-blue-600 hover:underline text-sm"
                            >
                                View all messages →
                            </a>
                        </div>
                    </AdminCard>
                </div>

                {/* QUICK ACTIONS */}
                <AdminCard className="p-6">
                    <AdminSectionHeader title="Quick Actions" />

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        <a
                            href="/admin/projects/create"
                            className="flex items-center justify-center gap-2 p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                        >
                            <Package size={20} /> Add Project
                        </a>
                        <a
                            href="/admin/projects"
                            className="flex items-center justify-center gap-2 p-3 bg-muted text-foreground rounded-lg border border-border hover:bg-muted/60 transition"
                        >
                            <Package size={20} /> Manage Projects
                        </a>
                        <a
                            href="/admin/contacts?status=unread"
                            className="flex items-center justify-center gap-2 p-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                        >
                            <Mail size={20} /> View Unread Messages
                        </a>
                        <a
                            href="/"
                            target="_blank"
                            className="flex items-center justify-center gap-2 p-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
                        >
                            <TrendingUp size={20} /> View Live Site
                        </a>
                    </div>
                </AdminCard>
            </AdminPageWrapper>
        </AppLayout>
    );
}
