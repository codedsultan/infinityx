<?php

namespace App\Http\Controllers;

use App\Http\Requests\ContactRequest;
use App\Models\Contact;
use App\Notifications\NewContactMessage;
use App\Services\CaptchaService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Notification;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Validation\ValidationException;

class ContactController extends Controller
{
    /**
     * Store a new contact form submission
     */
    // public function store(Request $request, CaptchaService $captcha)
    // {
    //     // Rate limiting - 3 submissions per hour per IP
    //     $key = 'contact-form:' . $request->ip();

    //     // if (RateLimiter::tooManyAttempts($key, 3)) {
    //     //     $seconds = RateLimiter::availableIn($key);

    //     //     throw ValidationException::withMessages([
    //     //         'email' => "Too many contact attempts. Please try again in {$seconds} seconds.",
    //     //     ]);
    //     // }

    //     $validated = $request->validate([
    //         'name' => 'required|string|max:255',
    //         'email' => 'required|email|max:255',
    //         'message' => 'required|string|min:10|max:1000',
    //         'captchaType' => 'required|string',
    //         'captchaToken' => 'nullable|string',
    //     ]);

    //     // Validate CAPTCHA
    //     if (! $captcha->validate($validated['captchaType'], $validated['captchaToken'])) {
    //         return response()->json([
    //             'message' => 'CAPTCHA verification failed.',
    //         ], 422);
    //     }

    //     // dd($validated);
    //     $contact = Contact::create([
    //         'name' => $validated['name'],
    //         'email' => $validated['email'],
    //         'message' => $validated['message'],
    //         'ip_address' => $request->ip(),
    //         'user_agent' => $request->userAgent(),
    //     ]);

    //     // dd($contact);

    //     Notification::route('mail', 'codesultan369@gmail.com')
    //         ->notify(new NewContactMessage($contact));

    //     // RateLimiter::hit($key, 3600);

    //     // dd('here');

    //     // return back()->with('success', 'Thank you for your message! I will get back to you soon.');
    //     return response()->json(['status' => 'ok'], 200);
    // }

    public function store(ContactRequest $request, CaptchaService $captcha)
    {
        // Validate CAPTCHA
        if (! $captcha->validate($request->captchaType, $request->captchaToken)) {
            throw ValidationException::withMessages([
                'captchaToken' => 'CAPTCHA verification failed.',
            ]);
        }

        $contact = Contact::create([
            'name' => $request->name,
            'email' => $request->email,
            'message' => $request->message,
            'ip_address' => $request->ip(),
            'user_agent' => $request->userAgent(),
        ]);

        Notification::route('mail', 'codesultan369@gmail.com')
            ->notify(new NewContactMessage($contact));

        // return response()->json(['status' => 'ok'], 200);
        return back()->with('success', 'Thank you for your message! I will get back to you soon.');
    }
}
