<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;

class CaptchaService
{
    public function validate(string $type, ?string $token, ?string $action = null): bool
    {
        // Allow globally disabling captcha
        if ($type === 'none') return true;

        // If you want to force using CAPTCHA_TYPE from env/config:
        $type = config('captcha.type', $type);

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
        $secret = config('captcha.recaptcha_v2.secret');
        if (!$secret) return false;

        $res = Http::asForm()->post('https://www.google.com/recaptcha/api/siteverify', [
            'secret' => $secret,
            'response' => $token,
            'remoteip' => request()->ip(), // optional, helpful
        ])->json();

        return (bool) data_get($res, 'success', false);
    }

    private function verifyGoogleV3(string $token, ?string $expectedAction): bool
    {
        $secret = config('captcha.recaptcha_v3.secret');
        if (!$secret) return false;

        $res = Http::asForm()->post('https://www.google.com/recaptcha/api/siteverify', [
            'secret' => $secret,
            'response' => $token,
            'remoteip' => request()->ip(), // optional, helpful
        ])->json();

        // Keep logging while you validate staging/prod (remove later if you want)
        logger()->info('captcha_response', ['response' => $res]);

        if (!data_get($res, 'success', false)) return false;

        // Action check (matches frontend captchaAction)
        if ($expectedAction && data_get($res, 'action') !== $expectedAction) return false;

        // Score check (tune via env RECAPTCHA_V3_SCORE_THRESHOLD)
        $threshold = (float) config('captcha.recaptcha_v3.score_threshold', 0.5);
        $score = (float) data_get($res, 'score', 0.0);

        return $score >= $threshold;
    }

    private function verifyHCaptcha(string $token): bool
    {
        $secret = config('captcha.hcaptcha.secret');
        if (!$secret) return false;

        $res = Http::asForm()->post('https://hcaptcha.com/siteverify', [
            'secret' => $secret,
            'response' => $token,
            'remoteip' => request()->ip(), // optional
        ])->json();

        return (bool) data_get($res, 'success', false);
    }

    private function verifyTurnstile(string $token): bool
    {
        $secret = config('captcha.turnstile.secret');
        if (!$secret) return false;

        $res = Http::asForm()->post('https://challenges.cloudflare.com/turnstile/v0/siteverify', [
            'secret' => $secret,
            'response' => $token,
            'remoteip' => request()->ip(), // optional
        ])->json();

        return (bool) data_get($res, 'success', false);
    }
}
