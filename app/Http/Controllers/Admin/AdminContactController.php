<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Contact;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminContactController extends Controller
{
    /**
     * Display a listing of contacts
     */
    public function index(Request $request)
    {
        $query = Contact::query();

        // Search
        if ($request->has('search')) {
            $search = $request->get('search');
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                    ->orWhere('email', 'like', "%{$search}%")
                    ->orWhere('message', 'like', "%{$search}%");
            });
        }

        // Filter by status
        if ($request->has('status')) {
            switch ($request->get('status')) {
                case 'unread':
                    $query->where('is_read', false);
                    break;
                case 'read':
                    $query->where('is_read', true);
                    break;
                case 'replied':
                    $query->where('is_replied', true);
                    break;
                case 'unreplied':
                    $query->where('is_replied', false);
                    break;
            }
        }

        $contacts = $query->orderBy('created_at', 'desc')
            ->paginate(15)
            ->through(function ($contact) {
                return [
                    'id' => $contact->id,
                    'name' => $contact->name,
                    'email' => $contact->email,
                    'message' => $contact->message,
                    'is_read' => $contact->is_read,
                    'is_replied' => $contact->is_replied,
                    'created_at' => $contact->created_at->format('M d, Y h:i A'),
                    'created_at_human' => $contact->created_at->diffForHumans(),
                ];
            });

        // Statistics
        $stats = [
            'total' => Contact::count(),
            'unread' => Contact::where('is_read', false)->count(),
            'unreplied' => Contact::where('is_replied', false)->count(),
            'today' => Contact::whereDate('created_at', today())->count(),
        ];

        return Inertia::render('admin/contacts/index', [
            'contacts' => $contacts,
            'stats' => $stats,
            'filters' => $request->only(['search', 'status']),
        ]);
    }

    /**
     * Display the specified contact
     */
    public function show(Contact $contact)
    {
        // Mark as read automatically when viewed
        if (!$contact->is_read) {
            $contact->markAsRead();
        }

        return Inertia::render('admin/contacts/show', [
            'contact' => [
                'id' => $contact->id,
                'name' => $contact->name,
                'email' => $contact->email,
                'message' => $contact->message,
                'ip_address' => $contact->ip_address,
                'user_agent' => $contact->user_agent,
                'is_read' => $contact->is_read,
                'is_replied' => $contact->is_replied,
                'read_at' => $contact->read_at?->format('M d, Y h:i A'),
                'replied_at' => $contact->replied_at?->format('M d, Y h:i A'),
                'created_at' => $contact->created_at->format('M d, Y h:i A'),
            ]
        ]);
    }

    /**
     * Mark contact as read
     */
    public function markAsRead(Contact $contact)
    {
        $contact->markAsRead();

        return back()->with('success', 'Contact marked as read.');
    }

    /**
     * Mark contact as replied
     */
    public function markAsReplied(Contact $contact)
    {
        $contact->markAsReplied();

        return back()->with('success', 'Contact marked as replied.');
    }

    /**
     * Remove the specified contact
     */
    public function destroy(Contact $contact)
    {
        $contact->delete();

        return redirect()->route('admin.contacts.index')
            ->with('success', 'Contact deleted successfully.');
    }
}
