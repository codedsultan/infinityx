import React, { useState, useEffect, useRef, useCallback } from "react";
import { Send } from "lucide-react";
import { useForm } from "@inertiajs/react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import InputError from "@/components/input-error";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

type CaptchaType = "recaptcha-v3" | "recaptcha-v2" | "hcaptcha" | "turnstile" | "none";

interface ContactFormProps {
    className?: string;
    onSuccess?: () => void;
    captchaType: CaptchaType;
    captchaSiteKey: string;
    captchaAction?: string;
}

/** Minimal typings to avoid `any` */
type CaptchaWidgetId = string | number;

interface GrecaptchaV2 {
    render: (container: HTMLElement, params: { sitekey: string }) => CaptchaWidgetId;
    getResponse: (widgetId?: CaptchaWidgetId | null) => string;
    reset: (widgetId?: CaptchaWidgetId | null) => void;
    ready: (cb: () => void) => void;
}

interface GrecaptchaV3 {
    execute: (siteKey: string, options: { action: string }) => Promise<string>;
    ready: (cb: () => void) => void;
}

type Grecaptcha = Partial<GrecaptchaV2> & Partial<GrecaptchaV3>;

interface Hcaptcha {
    render: (container: HTMLElement, params: { sitekey: string }) => CaptchaWidgetId;
    getResponse: (widgetId?: CaptchaWidgetId | null) => string;
    reset: (widgetId?: CaptchaWidgetId | null) => void;
}

interface Turnstile {
    render: (container: HTMLElement, params: { sitekey: string }) => CaptchaWidgetId;
    getResponse: (widgetId?: CaptchaWidgetId | null) => string;
    reset: (widgetId?: CaptchaWidgetId | null) => void;
}

declare global {
    interface Window {
        grecaptcha?: Grecaptcha;
        hcaptcha?: Hcaptcha;
        turnstile?: Turnstile;
        // If you ever rely on explicit onload callbacks, type them here:
        // onRecaptchaLoaded?: () => void;
    }
}

export default function ContactForm({
    className = "",
    onSuccess,
    captchaType,
    captchaSiteKey,
    captchaAction = "submit",
}: ContactFormProps) {
    const [captchaLoaded, setCaptchaLoaded] = useState(false);
    const [v3Ready, setV3Ready] = useState(false);

    const recaptchaV2Ref = useRef<HTMLDivElement>(null);
    const hcaptchaRef = useRef<HTMLDivElement>(null);
    const turnstileRef = useRef<HTMLDivElement>(null);
    const widgetIdRef = useRef<CaptchaWidgetId | null>(null);

    const form = useForm({
        name: "",
        email: "",
        message: "",
        captchaType,
        captchaToken: "",
        captchaAction,
    });

    /* -------------------------------------------------------------
     * Render CAPTCHA widgets (v2, hCaptcha, Turnstile) — stable callback
     * ------------------------------------------------------------- */
    const renderCaptcha = useCallback(() => {
        if (!captchaSiteKey) return;

        if (
            captchaType === "recaptcha-v2" &&
            recaptchaV2Ref.current &&
            window.grecaptcha?.render
        ) {
            widgetIdRef.current = window.grecaptcha.render(recaptchaV2Ref.current, {
                sitekey: captchaSiteKey,
            });
        }

        if (captchaType === "hcaptcha" && hcaptchaRef.current && window.hcaptcha?.render) {
            widgetIdRef.current = window.hcaptcha.render(hcaptchaRef.current, {
                sitekey: captchaSiteKey,
            });
        }

        if (captchaType === "turnstile" && turnstileRef.current && window.turnstile?.render) {
            widgetIdRef.current = window.turnstile.render(turnstileRef.current, {
                sitekey: captchaSiteKey,
            });
        }
    }, [captchaSiteKey, captchaType]);

    /* -------------------------------------------------------------
     * Load CAPTCHA scripts
     * ------------------------------------------------------------- */
    useEffect(() => {
        if (captchaType === "none" || !captchaSiteKey) {
            setCaptchaLoaded(true);
            return;
        }

        const scriptId = `captcha-script-${captchaType}`;
        if (document.getElementById(scriptId)) {
            setCaptchaLoaded(true);
            return;
        }

        const script = document.createElement("script");
        script.id = scriptId;
        script.async = true;
        script.defer = true;

        switch (captchaType) {
            case "recaptcha-v3":
                script.src = `https://www.google.com/recaptcha/api.js?render=${captchaSiteKey}`;
                break;
            case "recaptcha-v2":
                script.src = "https://www.google.com/recaptcha/api.js?render=explicit";
                break;
            case "hcaptcha":
                script.src = "https://js.hcaptcha.com/1/api.js";
                break;
            case "turnstile":
                script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js";
                break;
            default:
                break;
        }

        script.onload = () => {
            setCaptchaLoaded(true);
            renderCaptcha();
        };

        document.body.appendChild(script);
    }, [captchaType, captchaSiteKey, renderCaptcha]);

    useEffect(() => {
        if (captchaLoaded) renderCaptcha();
    }, [captchaLoaded, renderCaptcha]);

    /* -------------------------------------------------------------
     * reCAPTCHA v3 Warm-Up Loop
     * ------------------------------------------------------------- */
    useEffect(() => {
        if (captchaType !== "recaptcha-v3") return;
        if (!captchaLoaded) return;

        const grecaptcha = window.grecaptcha;
        const ready = grecaptcha?.ready;
        const execute = grecaptcha?.execute;

        if (!grecaptcha || !ready || !execute) return;

        let cancelled = false;

        const warmup = () => {
            ready(() => {
                void (async () => {
                    try {
                        const token = await execute(captchaSiteKey, { action: "warmup" });
                        if (cancelled) return;

                        if (token && token.length > 0) {
                            setV3Ready(true);
                        } else {
                            setTimeout(warmup, 300);
                        }
                    } catch {
                        if (!cancelled) setTimeout(warmup, 300);
                    }
                })();
            });
        };

        const id = window.setTimeout(warmup, 200);

        return () => {
            cancelled = true;
            window.clearTimeout(id);
        };
    }, [captchaLoaded, captchaSiteKey, captchaType]);


    /* -------------------------------------------------------------
     * Retrieve token for the correct provider
     * ------------------------------------------------------------- */
    const executeV3 = useCallback(async (): Promise<string | null> => {
        const grecaptcha = window.grecaptcha;
        const ready = grecaptcha?.ready;
        const execute = grecaptcha?.execute;

        if (!grecaptcha || !ready || !execute) return null;

        await new Promise<void>((resolve) => ready(resolve));

        const token = await execute(captchaSiteKey, { action: captchaAction });
        return token || null;
    }, [captchaAction, captchaSiteKey]);

    const getCaptchaToken = useCallback(async (): Promise<string | null> => {
        switch (captchaType) {
            case "recaptcha-v3":
                return await executeV3();

            case "recaptcha-v2": {
                const getResponse = window.grecaptcha?.getResponse;
                if (!getResponse) return null;
                return getResponse(widgetIdRef.current);
            }

            case "hcaptcha": {
                const getResponse = window.hcaptcha?.getResponse;
                if (!getResponse) return null;
                return getResponse(widgetIdRef.current);
            }

            case "turnstile": {
                const getResponse = window.turnstile?.getResponse;
                if (!getResponse) return null;
                return getResponse(widgetIdRef.current);
            }

            default:
                return null;
        }
    }, [captchaType, executeV3]);

    /* -------------------------------------------------------------
     * Submit handler
     * ------------------------------------------------------------- */
    const submit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const token = await getCaptchaToken();

        if (captchaType === "recaptcha-v3" && !token) {
            toast.error("Security verification failed. Please try again.");
            return;
        }

        form.transform((data) => ({
            ...data,
            captchaToken: token ?? "",
            captchaType,
            captchaAction,
        }));

        form.post("/contact", {
            preserveScroll: true,

            onSuccess: () => {
                toast.success("Your message has been sent successfully!");
                form.reset("name", "email", "message");
                onSuccess?.();
            },

            onError: () => {
                toast.error("Please fix the errors and try again.");
            },
        });
    };

    return (
        <div className={cn("p-6 rounded-xl bg-card border border-border shadow-md", className)}>
            <form onSubmit={submit} className="space-y-4">
                <div>
                    <label className="text-sm font-medium">Name</label>
                    <Input
                        name="name"
                        value={form.data.name}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            form.setData("name", e.target.value)
                        }
                    />
                    <InputError message={form.errors.name} />
                </div>

                <div>
                    <label className="text-sm font-medium">Email</label>
                    <Input
                        type="email"
                        name="email"
                        value={form.data.email}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            form.setData("email", e.target.value)
                        }
                    />
                    <InputError message={form.errors.email} />
                </div>

                <div>
                    <label className="text-sm font-medium">Message</label>
                    <Textarea
                        name="message"
                        rows={5}
                        value={form.data.message}
                        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                            form.setData("message", e.target.value)
                        }
                    />
                    <InputError message={form.errors.message} />
                </div>

                {/* CAPTCHA WIDGETS */}
                {captchaType === "recaptcha-v2" && <div ref={recaptchaV2Ref} />}
                {captchaType === "hcaptcha" && <div ref={hcaptchaRef} />}
                {captchaType === "turnstile" && <div ref={turnstileRef} />}

                <InputError message={form.errors.captchaToken} />

                <Button
                    type="submit"
                    disabled={
                        form.processing ||
                        !captchaLoaded ||
                        (captchaType === "recaptcha-v3" && !v3Ready)
                    }
                    className="text-white w-full p-6 flex items-center gap-2 bg-[#F53003] hover:bg-[#d42a02]"
                >
                    {form.processing ? <Spinner /> : <Send size={18} />}
                    Send Message
                </Button>
            </form>
        </div>
    );
}
