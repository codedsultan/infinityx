<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;

class CaptchaService
{
    public function validate(string $type, ?string $token, ?string $action = null): bool
    {
        if ($type === 'none') return true;
        if (!is_string($token) || trim($token) === '') return false;

        return match ($type) {
            'recaptcha-v2' => $this->verifyGoogleV2($token),
            'recaptcha-v3' => $this->verifyGoogleV3($token, $action),
            'hcaptcha'     => $this->verifyHCaptcha($token),
            'turnstile'    => $this->verifyTurnstile($token),
            default        => false,
        };
    }

    private function verifyGoogleV2(string $token): bool
    {
        $secret = env('RECAPTCHA_V2_SECRET');
        if (!$secret) return false;

        $res = Http::asForm()->post('https://www.google.com/recaptcha/api/siteverify', [
            'secret' => $secret,
            'response' => $token,
        ])->json();

        return (bool) data_get($res, 'success', false);
    }

    private function verifyGoogleV3(string $token, ?string $expectedAction): bool
    {
        $secret = env('RECAPTCHA_V3_SECRET');
        if (!$secret) return false;

        $res = Http::asForm()->post('https://www.google.com/recaptcha/api/siteverify', [
            'secret' => $secret,
            'response' => $token,
        ])->json();

        log('reCAPTCHA v3 response:', $res);
        if (!data_get($res, 'success', false)) return false;

        // Action check (matches your frontend captchaAction)
        if ($expectedAction && data_get($res, 'action') !== $expectedAction) return false;

        // Score check (tune threshold if needed)
        $score = (float) data_get($res, 'score', 0.0);
        return $score >= 0.5;
    }

    private function verifyHCaptcha(string $token): bool
    {
        $secret = env('HCAPTCHA_SECRET');
        if (!$secret) return false;

        $res = Http::asForm()->post('https://hcaptcha.com/siteverify', [
            'secret' => $secret,
            'response' => $token,
        ])->json();

        return (bool) data_get($res, 'success', false);
    }

    private function verifyTurnstile(string $token): bool
    {
        $secret = env('TURNSTILE_SECRET');
        if (!$secret) return false;

        $res = Http::asForm()->post('https://challenges.cloudflare.com/turnstile/v0/siteverify', [
            'secret' => $secret,
            'response' => $token,
        ])->json();

        return (bool) data_get($res, 'success', false);
    }
}
