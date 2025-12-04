<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Project;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Inertia\Inertia;

class AdminProjectController extends Controller
{
    /**
     * Display a listing of projects
     */
    public function index(Request $request)
    {
        $query = Project::query();

        // Search
        if ($request->has('search')) {
            $search = $request->get('search');
            $query->where(function ($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                    ->orWhere('description', 'like', "%{$search}%");
            });
        }

        // Filter by category
        if ($request->has('category') && $request->get('category') !== 'all') {
            $query->where('category', $request->get('category'));
        }

        // Filter by featured
        if ($request->has('featured')) {
            $query->where('is_featured', $request->boolean('featured'));
        }

        $projects = $query->orderBy('order', 'asc')
            ->orderBy('created_at', 'desc')
            ->paginate(10)
            ->through(function ($project) {
                return [
                    'id' => $project->id,
                    'title' => $project->title,
                    'slug' => $project->slug,
                    'description' => $project->description,
                    'category' => $project->category,
                    'technologies' => $project->technologies,
                    'is_featured' => $project->is_featured,
                    'order' => $project->order,
                    'featured_image' => $project->featured_image ? asset('storage/' . $project->featured_image) : null,
                    'github_url' => $project->github_url,
                    'live_url' => $project->live_url,
                    'created_at' => $project->created_at->format('M d, Y'),
                ];
            });

        return Inertia::render('admin/projects/index', [
            'projects' => $projects,
            'filters' => $request->only(['search', 'category', 'featured']),
        ]);
    }

    /**
     * Show the form for creating a new project
     */
    public function create()
    {
        return Inertia::render('admin/projects/create');
    }

    /**
     * Store a newly created project
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string|max:500',
            'full_description' => 'nullable|string',
            'category' => 'required|in:backend,frontend,fullstack',
            'technologies' => 'required|array|min:1',
            'technologies.*' => 'string',
            'featured_image' => 'nullable|image|max:2048',
            'gallery_images' => 'nullable|array',
            'gallery_images.*' => 'image|max:2048',
            'github_url' => 'nullable|url',
            'live_url' => 'nullable|url',
            'is_featured' => 'boolean',
            'completion_date' => 'nullable|date',
        ]);

        // Generate slug
        $validated['slug'] = Str::slug($validated['title']);

        // Handle featured image upload
        if ($request->hasFile('featured_image')) {
            $validated['featured_image'] = $request->file('featured_image')
                ->store('projects', 'public');
        }

        // Handle gallery images upload
        if ($request->hasFile('gallery_images')) {
            $galleryPaths = [];
            foreach ($request->file('gallery_images') as $image) {
                $galleryPaths[] = $image->store('projects', 'public');
            }
            $validated['gallery_images'] = $galleryPaths;
        }

        // Set order
        $validated['order'] = Project::max('order') + 1;

        Project::create($validated);

        return redirect()->route('admin.projects.index')
            ->with('success', 'Project created successfully.');
    }

    /**
     * Show the form for editing a project
     */
    public function edit(Project $project)
    {
        return Inertia::render('admin/projects/edit', [
            'project' => [
                'id' => $project->id,
                'title' => $project->title,
                'slug' => $project->slug,
                'description' => $project->description,
                'full_description' => $project->full_description,
                'category' => $project->category,
                'technologies' => $project->technologies,
                'featured_image' => $project->featured_image ? asset('storage/' . $project->featured_image) : null,
                'gallery_images' => $project->gallery_images ? array_map(fn($img) => asset('storage/' . $img), $project->gallery_images) : [],
                'github_url' => $project->github_url,
                'live_url' => $project->live_url,
                'is_featured' => $project->is_featured,
                'completion_date' => $project->completion_date?->format('Y-m-d'),
            ]
        ]);
    }

    /**
     * Update the specified project
     */
    public function update(Request $request, Project $project)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string|max:500',
            'full_description' => 'nullable|string',
            'category' => 'required|in:backend,frontend,fullstack',
            'technologies' => 'required|array|min:1',
            'technologies.*' => 'string',
            'featured_image' => 'nullable|image|max:2048',
            'remove_featured_image' => 'boolean',
            'gallery_images' => 'nullable|array',
            'gallery_images.*' => 'image|max:2048',
            'github_url' => 'nullable|url',
            'live_url' => 'nullable|url',
            'is_featured' => 'boolean',
            'completion_date' => 'nullable|date',
        ]);

        // Update slug if title changed
        if ($validated['title'] !== $project->title) {
            $validated['slug'] = Str::slug($validated['title']);
        }

        // Handle featured image removal
        if ($request->boolean('remove_featured_image') && $project->featured_image) {
            Storage::disk('public')->delete($project->featured_image);
            $validated['featured_image'] = null;
        }

        // Handle new featured image upload
        if ($request->hasFile('featured_image')) {
            // Delete old image
            if ($project->featured_image) {
                Storage::disk('public')->delete($project->featured_image);
            }
            $validated['featured_image'] = $request->file('featured_image')
                ->store('projects', 'public');
        }

        // Handle new gallery images
        if ($request->hasFile('gallery_images')) {
            $galleryPaths = $project->gallery_images ?? [];
            foreach ($request->file('gallery_images') as $image) {
                $galleryPaths[] = $image->store('projects', 'public');
            }
            $validated['gallery_images'] = $galleryPaths;
        }

        $project->update($validated);

        return redirect()->route('admin.projects.index')
            ->with('success', 'Project updated successfully.');
    }

    /**
     * Remove the specified project
     */
    public function destroy(Project $project)
    {
        // Delete images
        if ($project->featured_image) {
            Storage::disk('public')->delete($project->featured_image);
        }
        if ($project->gallery_images) {
            foreach ($project->gallery_images as $image) {
                Storage::disk('public')->delete($image);
            }
        }

        $project->delete();

        return redirect()->route('admin.projects.index')
            ->with('success', 'Project deleted successfully.');
    }

    /**
     * Toggle featured status
     */
    public function toggleFeatured(Project $project)
    {
        $project->update(['is_featured' => !$project->is_featured]);

        return back()->with('success', 'Featured status updated.');
    }

    /**
     * Reorder projects
     */
    public function reorder(Request $request)
    {
        $request->validate([
            'projects' => 'required|array',
            'projects.*.id' => 'required|exists:projects,id',
            'projects.*.order' => 'required|integer',
        ]);

        foreach ($request->projects as $projectData) {
            Project::where('id', $projectData['id'])
                ->update(['order' => $projectData['order']]);
        }

        return back()->with('success', 'Projects reordered successfully.');
    }

    public function show(Project $project)
    {
        return Inertia::render('admin/projects/show', [
            'project' => [
                'id' => $project->id,
                'title' => $project->title,
                'slug' => $project->slug,
                'description' => $project->description,
                'full_description' => $project->full_description,
                'category' => $project->category,
                'technologies' => $project->technologies,
                'featured_image' => $project->featured_image ? asset('storage/' . $project->featured_image) : null,
                'gallery_images' => $project->gallery_images ? array_map(fn($img) => asset('storage/' . $img), $project->gallery_images) : [],
                'github_url' => $project->github_url,
                'live_url' => $project->live_url,
                'is_featured' => $project->is_featured,
                'completion_date' => $project->completion_date?->format('Y-m-d'),
                'created_at' => $project->created_at->format('M d, Y h:i A'),
            ]
        ]);
    }
}
