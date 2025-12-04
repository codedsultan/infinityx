import React, { useState } from "react";
import { Head, router } from "@inertiajs/react";
import AppLayout from "@/layouts/app-layout";

import type {
    ContactSummary,
    ContactsPagination,
    ContactStats,
    ContactFilters,
    ContactDetail,
} from "@/types/admin";

import AdminCard from "@/components/admin/AdminCard";
import AdminListItem from "@/components/admin/AdminListItem";
import AdminSectionHeader from "@/components/admin/AdminSectionHeader";
import AdminPageWrapper from "@/components/admin/AdminPageWrapper";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetDescription,
} from "@/components/ui/sheet";

import {
    Search,
    Eye,
    Mail,
    CheckCircle,
    Trash2,
    MailOpen,
    ChevronRight,
} from "lucide-react";

interface ContactsPageProps {
    contacts: ContactsPagination;
    stats: ContactStats;
    filters: ContactFilters;
}

export default function AdminContactsIndex({
    contacts,
    stats,
    filters,
}: ContactsPageProps) {
    const [search, setSearch] = useState(filters.search ?? "");
    const [status, setStatus] = useState(filters.status ?? "all");

    const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState<ContactDetail | null>(null);

    const openDrawer = (contact: ContactSummary) => {
        // Convert summary → detail shape for the drawer
        const detail: ContactDetail = {
            ...contact,
            ip_address: null,
            user_agent: null,
            read_at: contact.is_read ? "" : null,
            replied_at: contact.is_replied ? "" : null,
        };
        setSelected(detail);
        setOpen(true);
    };

    const applyFilters = () => {
        router.get("/manage/contacts", { search, status });
    };

    const markRead = (id: number) =>
        router.post(`/manage/contacts/${id}/mark-read`, {}, { preserveScroll: true });

    const markReplied = (id: number) =>
        router.post(`/manage/contacts/${id}/mark-replied`, {}, { preserveScroll: true });

    const deleteContact = (contact: ContactSummary) => {
        if (confirm(`Delete message from "${contact.name}"?`)) {
            router.delete(`/manage/contacts/${contact.id}`, { preserveScroll: true });
        }
    };

    return (
        <AppLayout breadcrumbs={[{ title: "Messages", href: "#" }]}>
            <Head title="Messages" />

            <AdminPageWrapper>
                {/* HEADER */}
                <AdminSectionHeader
                    title="Messages"
                    description="Manage messages received via your contact form."
                />

                {/* STATS */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                    <AdminCard className="p-4 flex items-center justify-between">
                        <div>
                            <p className="text-sm text-muted-foreground">Total</p>
                            <p className="text-2xl font-bold text-foreground">{stats.total}</p>
                        </div>
                        <Mail className="text-blue-500" size={28} />
                    </AdminCard>

                    <AdminCard className="p-4 flex items-center justify-between">
                        <div>
                            <p className="text-sm text-muted-foreground">Unread</p>
                            <p className="text-2xl font-bold text-foreground">{stats.unread}</p>
                        </div>
                        <MailOpen className="text-yellow-500" size={28} />
                    </AdminCard>

                    <AdminCard className="p-4 flex items-center justify-between">
                        <div>
                            <p className="text-sm text-muted-foreground">Unreplied</p>
                            <p className="text-2xl font-bold text-foreground">{stats.unreplied}</p>
                        </div>
                        <CheckCircle className="text-red-500" size={28} />
                    </AdminCard>

                    <AdminCard className="p-4 flex items-center justify-between">
                        <div>
                            <p className="text-sm text-muted-foreground">Today</p>
                            <p className="text-2xl font-bold text-foreground">{stats.today}</p>
                        </div>
                        <Mail className="text-green-500" size={28} />
                    </AdminCard>
                </div>

                {/* SEARCH + FILTER */}
                <AdminCard className="p-4">
                    <div className="flex flex-col md:flex-row gap-4">
                        {/* Search input */}
                        <div className="flex-1 relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
                            <Input
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Search messages…"
                                className="pl-10"
                            />
                        </div>

                        <select
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            className="border bg-background text-foreground rounded-lg px-4 py-2"
                        >
                            <option value="all">All</option>
                            <option value="unread">Unread</option>
                            <option value="read">Read</option>
                            <option value="replied">Replied</option>
                            <option value="unreplied">Unreplied</option>
                        </select>

                        <Button onClick={applyFilters}>Search</Button>
                    </div>
                </AdminCard>

                {/* LIST OF CONTACTS */}
                <AdminCard className="p-0 divide-y divide-border">
                    {contacts.data.map((contact) => (
                        <AdminListItem
                            key={contact.id}
                            onClick={() => openDrawer(contact)}
                            className={!contact.is_read ? "bg-muted/40 dark:bg-muted/20" : ""}
                        >
                            <div className="flex justify-between items-start">
                                <div>
                                    {/* Name + badges */}
                                    <div className="flex items-center gap-2">
                                        <h3 className="font-semibold text-foreground">
                                            {contact.name}
                                        </h3>

                                        {!contact.is_read && (
                                            <span className="text-xs bg-blue-500/15 text-blue-600 dark:text-blue-400 px-2 py-0.5 rounded-full flex items-center gap-1">
                                                <Eye size={12} /> New
                                            </span>
                                        )}

                                        {contact.is_replied && (
                                            <span className="text-xs bg-green-500/15 text-green-600 dark:text-green-400 px-2 py-0.5 rounded-full flex items-center gap-1">
                                                <CheckCircle size={12} /> Replied
                                            </span>
                                        )}
                                    </div>

                                    <p className="text-sm text-blue-600 dark:text-blue-400">
                                        {contact.email}
                                    </p>

                                    <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                                        {contact.message}
                                    </p>

                                    <p className="text-xs text-muted-foreground mt-2">
                                        {contact.created_at_human}
                                    </p>
                                </div>

                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        openDrawer(contact);
                                    }}
                                    className="text-muted-foreground hover:text-foreground"
                                >
                                    <ChevronRight size={20} />
                                </button>
                            </div>
                        </AdminListItem>
                    ))}
                </AdminCard>

                {/* PAGINATION */}
                {contacts.links.length > 3 && (
                    <div className="flex justify-center mt-4">
                        <nav className="flex gap-2">
                            {contacts.links.map((link, i) => (
                                <button
                                    key={i}
                                    disabled={!link.url}
                                    onClick={() => link.url && router.visit(link.url)}
                                    className={`px-4 py-2 rounded-lg transition ${link.active
                                        ? "bg-blue-600 text-white"
                                        : "bg-card text-foreground border border-border hover:bg-muted"
                                        } ${!link.url && "opacity-50 cursor-not-allowed"}`}
                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                />
                            ))}
                        </nav>
                    </div>
                )}

                {/* DRAWER — CONTACT DETAILS */}
                <Sheet open={open} onOpenChange={setOpen}>
                    <SheetContent side="right" className="w-[400px] sm:w-[450px] overflow-y-auto">
                        <SheetHeader>
                            <SheetTitle>Message Details</SheetTitle>
                            <SheetDescription>
                                Full message information and quick actions.
                            </SheetDescription>
                        </SheetHeader>

                        {selected && (
                            <div className="mt-6 space-y-6 pb-10">

                                <Detail label="Name" value={selected.name} />
                                <Detail label="Email" value={selected.email} />
                                <Detail label="Message" value={selected.message} multiline />

                                <Detail label="Created At" value={selected.created_at} />
                                <Detail label="Read At" value={selected.read_at ?? "Not read"} />
                                <Detail label="Replied At" value={selected.replied_at ?? "Not replied"} />

                                {/* ACTION BUTTONS */}
                                <div className="flex flex-col gap-3 pt-4 border-t border-border">
                                    {!selected.is_read && (
                                        <ActionButton
                                            icon={Eye}
                                            label="Mark as Read"
                                            onClick={() => markRead(selected.id)}
                                        />
                                    )}

                                    {!selected.is_replied && (
                                        <ActionButton
                                            icon={CheckCircle}
                                            label="Mark as Replied"
                                            onClick={() => markReplied(selected.id)}
                                        />
                                    )}

                                    <ActionButton
                                        icon={Trash2}
                                        label="Delete Message"
                                        danger
                                        onClick={() =>
                                            deleteContact({
                                                ...selected,
                                                created_at_human: "",
                                            } as ContactSummary)
                                        }
                                    />
                                </div>
                            </div>
                        )}
                    </SheetContent>
                </Sheet>
            </AdminPageWrapper>
        </AppLayout>
    );
}

/* =============================
    SMALL REUSABLE SUBCOMPONENTS
============================= */

function Detail({
    label,
    value,
    multiline,
}: {
    label: string;
    value: string;
    multiline?: boolean;
}) {
    return (
        <div>
            <p className="text-sm font-medium text-muted-foreground">{label}</p>
            <p
                className={`mt-1 text-foreground ${multiline ? "whitespace-pre-wrap" : ""
                    }`}
            >
                {value}
            </p>
        </div>
    );
}

function ActionButton({
    icon: Icon,
    label,
    danger,
    onClick,
}: {
    icon: any;
    label: string;
    danger?: boolean;
    onClick: () => void;
}) {
    return (
        <button
            onClick={onClick}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors ${danger
                ? "text-red-600 border-red-300 hover:bg-red-500/10"
                : "text-blue-600 border-blue-300 hover:bg-blue-500/10"
                }`}
        >
            <Icon size={16} />
            {label}
        </button>
    );
}
