<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;

class CaptchaService
{
    /**
     * Validate captcha response from any provider.
     */
    public function validate(string $type, ?string $token): bool
    {
        if ($type === 'none') {
            return true;
        }

        if (!$token) {
            return false;
        }

        return match ($type) {

            'recaptcha-v2' => $this->verifyGoogle(
                env('RECAPTCHA_V2_SECRET'),
                $token
            ),

            'recaptcha-v3' => $this->verifyGoogle(
                env('RECAPTCHA_V3_SECRET'),
                $token
            ),

            'hcaptcha' => $this->verifyHCaptcha($token),

            'turnstile' => $this->verifyTurnstile($token),

            default => false,
        };
    }

    /**
     * Google reCAPTCHA V2 & V3
     */
    private function verifyGoogle(string $secret, string $token): bool
    {
        $response = Http::asForm()->post(
            'https://www.google.com/recaptcha/api/siteverify',
            [
                'secret'   => $secret,
                'response' => $token,
            ]
        );

        return $response->json('success') === true;
    }

    /**
     * hCaptcha
     */
    private function verifyHCaptcha(string $token): bool
    {
        $response = Http::asForm()->post(
            'https://hcaptcha.com/siteverify',
            [
                'secret'   => env('HCAPTCHA_SECRET'),
                'response' => $token,
            ]
        );

        return $response->json('success') === true;
    }

    /**
     * Cloudflare Turnstile
     */
    private function verifyTurnstile(string $token): bool
    {
        $response = Http::asForm()->post(
            'https://challenges.cloudflare.com/turnstile/v0/siteverify',
            [
                'secret'   => env('TURNSTILE_SECRET'),
                'response' => $token,
            ]
        );

        return $response->json('success') === true;
    }
}
