<?php

return [
    /*
    |--------------------------------------------------------------------------
    | Active CAPTCHA Provider
    |--------------------------------------------------------------------------
    | Use one of: turnstile, recaptcha-v2, recaptcha-v3, hcaptcha, none
    */
    'type' => env('CAPTCHA_TYPE', 'none'),

    /*
    |--------------------------------------------------------------------------
    | Google reCAPTCHA v2
    |--------------------------------------------------------------------------
    */
    'recaptcha_v2' => [
        'site'   => env('RECAPTCHA_V2_SITE'),
        'secret' => env('RECAPTCHA_V2_SECRET'),
    ],

    /*
    |--------------------------------------------------------------------------
    | Google reCAPTCHA v3
    |--------------------------------------------------------------------------
    */
    'recaptcha_v3' => [
        'site'   => env('RECAPTCHA_V3_SITE'),
        'secret' => env('RECAPTCHA_V3_SECRET'),
        'score_threshold' => (float) env('RECAPTCHA_V3_SCORE_THRESHOLD', 0.5),
    ],

    /*
    |--------------------------------------------------------------------------
    | hCaptcha
    |--------------------------------------------------------------------------
    */
    'hcaptcha' => [
        'site'   => env('HCAPTCHA_SITE'),
        'secret' => env('HCAPTCHA_SECRET'),
    ],

    /*
    |--------------------------------------------------------------------------
    | Cloudflare Turnstile
    |--------------------------------------------------------------------------
    */
    'turnstile' => [
        'site'   => env('TURNSTILE_SITE'),
        'secret' => env('TURNSTILE_SECRET'),
    ],
];
