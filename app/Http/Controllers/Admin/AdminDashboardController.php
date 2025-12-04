<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Contact;
use App\Models\Project;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class AdminDashboardController extends Controller
{
    /**
     * Display the admin dashboard
     */
    public function index(): Response
    {
        // Get statistics
        $stats = [
            'total_projects' => Project::count(),
            'featured_projects' => Project::where('is_featured', true)->count(),
            'total_contacts' => Contact::count(),
            'unread_contacts' => Contact::where('is_read', false)->count(),
            'unreplied_contacts' => Contact::where('is_replied', false)->count(),
        ];

        // Recent projects
        $recentProjects = Project::orderBy('created_at', 'desc')
            ->take(5)
            ->get()
            ->map(function ($project) {
                return [
                    'id' => $project->id,
                    'title' => $project->title,
                    'category' => $project->category,
                    'is_featured' => $project->is_featured,
                    'created_at' => $project->created_at->format('M d, Y'),
                ];
            });

        // Recent contacts
        $recentContacts = Contact::orderBy('created_at', 'desc')
            ->take(5)
            ->get()
            ->map(function ($contact) {
                return [
                    'id' => $contact->id,
                    'name' => $contact->name,
                    'email' => $contact->email,
                    'message' => substr($contact->message, 0, 100) . '...',
                    'is_read' => $contact->is_read,
                    'is_replied' => $contact->is_replied,
                    'created_at' => $contact->created_at->diffForHumans(),
                ];
            });

        // Projects by category
        $projectsByCategory = [
            'backend' => Project::where('category', 'backend')->count(),
            'frontend' => Project::where('category', 'frontend')->count(),
            'fullstack' => Project::where('category', 'fullstack')->count(),
        ];

        // Contacts trend (last 7 days)
        $contactsTrend = [];
        for ($i = 6; $i >= 0; $i--) {
            $date = now()->subDays($i);
            $contactsTrend[] = [
                'date' => $date->format('M d'),
                'count' => Contact::whereDate('created_at', $date)->count(),
            ];
        }

        return Inertia::render('admin/dashboard', [
            'stats' => $stats,
            'recentProjects' => $recentProjects,
            'recentContacts' => $recentContacts,
            'projectsByCategory' => $projectsByCategory,
            'contactsTrend' => $contactsTrend,
        ]);
    }
}
