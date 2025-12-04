<?php

namespace App\Http\Controllers;

use App\Models\Contact;
use App\Notifications\NewContactMessage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Notification;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Validation\ValidationException;

class ContactController extends Controller
{
    /**
     * Store a new contact form submission
     */
    public function store(Request $request)
    {
        // Rate limiting - 3 submissions per hour per IP
        $key = 'contact-form:' . $request->ip();

        // if (RateLimiter::tooManyAttempts($key, 3)) {
        //     $seconds = RateLimiter::availableIn($key);

        //     throw ValidationException::withMessages([
        //         'email' => "Too many contact attempts. Please try again in {$seconds} seconds.",
        //     ]);
        // }

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'message' => 'required|string|min:10|max:1000',
        ]);

        // dd($validated);
        $contact = Contact::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'message' => $validated['message'],
            'ip_address' => $request->ip(),
            'user_agent' => $request->userAgent(),
        ]);

        // dd($contact);

        Notification::route('mail', 'codesultan369@gmail.com')
            ->notify(new NewContactMessage($contact));

        // RateLimiter::hit($key, 3600);

        // dd('here');

        // return back()->with('success', 'Thank you for your message! I will get back to you soon.');
        return response()->json(['status' => 'ok'], 200);
    }
}
