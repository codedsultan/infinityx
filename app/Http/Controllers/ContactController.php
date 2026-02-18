<?php

namespace App\Http\Controllers;

use App\Http\Requests\ContactRequest;
use App\Models\Contact;
use App\Notifications\NewContactMessage;
use App\Services\CaptchaService;
use Illuminate\Support\Facades\Notification;
use Illuminate\Validation\ValidationException;

class ContactController extends Controller
{
    public function store(ContactRequest $request, CaptchaService $captcha)
    {

        logger()->info('captcha_incoming', [
            'type_config' => config('captcha.type'),
            'token_len' => is_string($request->captchaToken) ? strlen($request->captchaToken) : null,
            'action' => $request->captchaAction,
        ]);

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

        Notification::route('mail', config('admin.email'))
            ->notify(new NewContactMessage($contact));

        // return response()->json(['status' => 'ok'], 200);
        return back()->with('success', 'Thank you for your message! I will get back to you soon.');
    }
}
