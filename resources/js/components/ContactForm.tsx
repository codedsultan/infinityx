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

type CaptchaType =
    | "recaptcha-v3"
    | "recaptcha-v2"
    | "hcaptcha"
    | "turnstile"
    | "none";

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
    }
}

/**
 * Wait for a condition to become true. Idempotent & safe in SPA transitions.
 */
async function waitFor(
    condition: () => boolean,
    opts?: { timeoutMs?: number; intervalMs?: number }
): Promise<boolean> {
    const timeoutMs = opts?.timeoutMs ?? 8000;
    const intervalMs = opts?.intervalMs ?? 100;

    const start = Date.now();

    return await new Promise<boolean>((resolve) => {
        const tick = () => {
            if (condition()) return resolve(true);
            if (Date.now() - start >= timeoutMs) return resolve(false);
            window.setTimeout(tick, intervalMs);
        };
        tick();
    });
}

/**
 * Ensures a script is present; resolves after it loads (or immediately if already loaded).
 * Note: "loaded" means the script finished loading, not that a provider is ready.
 */
function ensureScript(id: string, src: string): Promise<void> {
    return new Promise<void>((resolve, reject) => {
        const existing = document.getElementById(id) as HTMLScriptElement | null;

        if (existing) {
            // If it already loaded before, resolve.
            if ((existing as any).dataset?.loaded === "true") return resolve();

            // Otherwise, attach listeners (idempotent).
            existing.addEventListener("load", () => resolve(), { once: true });
            existing.addEventListener("error", () => reject(new Error("captcha script failed")), {
                once: true,
            });
            return;
        }

        const script = document.createElement("script");
        script.id = id;
        script.src = src;
        script.async = true;
        script.defer = true;

        script.addEventListener(
            "load",
            () => {
                (script as any).dataset.loaded = "true";
                resolve();
            },
            { once: true }
        );

        script.addEventListener("error", () => reject(new Error("captcha script failed")), {
            once: true,
        });

        document.body.appendChild(script);
    });
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

    /**
     * Render widgets for explicit providers (v2/hcaptcha/turnstile).
     * Guarded so it won't double-render on re-renders.
     */
    const renderCaptcha = useCallback(() => {
        if (!captchaSiteKey) return;

        // Prevent double render
        if (widgetIdRef.current != null) return;

        if (
            captchaType === "recaptcha-v2" &&
            recaptchaV2Ref.current &&
            window.grecaptcha?.render
        ) {
            widgetIdRef.current = window.grecaptcha.render(recaptchaV2Ref.current, {
                sitekey: captchaSiteKey,
            });
            return;
        }

        if (captchaType === "hcaptcha" && hcaptchaRef.current && window.hcaptcha?.render) {
            widgetIdRef.current = window.hcaptcha.render(hcaptchaRef.current, {
                sitekey: captchaSiteKey,
            });
            return;
        }

        if (captchaType === "turnstile" && turnstileRef.current && window.turnstile?.render) {
            widgetIdRef.current = window.turnstile.render(turnstileRef.current, {
                sitekey: captchaSiteKey,
            });
        }
    }, [captchaSiteKey, captchaType]);

    /**
     * Reset widgets (useful on error/success for explicit widgets)
     */
    const resetCaptcha = useCallback(() => {
        if (captchaType === "recaptcha-v2" && window.grecaptcha?.reset) {
            window.grecaptcha.reset(widgetIdRef.current);
        }
        if (captchaType === "hcaptcha" && window.hcaptcha?.reset) {
            window.hcaptcha.reset(widgetIdRef.current);
        }
        if (captchaType === "turnstile" && window.turnstile?.reset) {
            window.turnstile.reset(widgetIdRef.current);
        }

        // allow re-render
        widgetIdRef.current = null;
    }, [captchaType]);

    /**
     * Load + wait for provider readiness (not just script tag)
     */
    useEffect(() => {
        let cancelled = false;

        const boot = async () => {
            setCaptchaLoaded(false);
            setV3Ready(false);
            widgetIdRef.current = null;

            if (captchaType === "none" || !captchaSiteKey) {
                if (!cancelled) {
                    setCaptchaLoaded(true);
                    setV3Ready(true);
                }
                return;
            }

            const scriptId = `captcha-script-${captchaType}`;

            let src = "";
            switch (captchaType) {
                case "recaptcha-v3":
                    src = `https://www.google.com/recaptcha/api.js?render=${captchaSiteKey}`;
                    break;
                case "recaptcha-v2":
                    src = "https://www.google.com/recaptcha/api.js?render=explicit";
                    break;
                case "hcaptcha":
                    src = "https://js.hcaptcha.com/1/api.js";
                    break;
                case "turnstile":
                    src = "https://challenges.cloudflare.com/turnstile/v0/api.js";
                    break;
                default:
                    break;
            }

            try {
                await ensureScript(scriptId, src);

                // Wait for the provider globals to actually be ready
                const ok = await waitFor(() => {
                    if (captchaType === "recaptcha-v3") {
                        return !!window.grecaptcha?.ready && !!window.grecaptcha?.execute;
                    }
                    if (captchaType === "recaptcha-v2") {
                        return !!window.grecaptcha?.render && !!window.grecaptcha?.getResponse;
                    }
                    if (captchaType === "hcaptcha") {
                        return !!window.hcaptcha?.render && !!window.hcaptcha?.getResponse;
                    }
                    if (captchaType === "turnstile") {
                        return !!window.turnstile?.render && !!window.turnstile?.getResponse;
                    }
                    return false;
                });

                if (!ok) {
                    if (!cancelled) {
                        setCaptchaLoaded(true); // script loaded, but provider not ready
                        toast.error("Security verification failed to initialise. Please refresh.");
                    }
                    return;
                }

                if (cancelled) return;

                setCaptchaLoaded(true);

                // v3 readiness should be based on grecaptcha.ready
                if (captchaType === "recaptcha-v3" && window.grecaptcha?.ready) {
                    window.grecaptcha.ready(() => {
                        if (!cancelled) setV3Ready(true);
                    });
                }

                // For explicit widgets, render once ready
                if (captchaType !== "recaptcha-v3") {
                    renderCaptcha();
                }
            } catch {
                if (!cancelled) {
                    setCaptchaLoaded(true);
                    toast.error("Security verification failed to load. Please refresh.");
                }
            }
        };

        void boot();

        return () => {
            cancelled = true;
        };
    }, [captchaType, captchaSiteKey, renderCaptcha]);

    /**
     * Execute v3 at submit time (compliant) — single-use token.
     */
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

    const submit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const token = await getCaptchaToken();

        // universal guard (prevents empty token posts)
        if (captchaType !== "none" && (!token || token.length === 0)) {
            toast.error("Please complete the security verification.");
            return;
        }

        // form.transform((data) => ({
        //     ...data,
        //     captchaToken: token ?? "",
        //     captchaType,
        //     captchaAction,
        // }));

        form.setData("captchaToken", token ?? "");
        form.setData("captchaType", captchaType);
        form.setData("captchaAction", captchaAction);

        form.post("/contact", {
            preserveScroll: true,

            onSuccess: () => {
                toast.success("Your message has been sent successfully!");
                form.reset("name", "email", "message");
                resetCaptcha();
                onSuccess?.();
            },

            onError: () => {
                resetCaptcha();
                toast.error("Please fix the errors and try again.");
            },
        });
    };

    const submitDisabled =
        form.processing ||
        !captchaLoaded ||
        (captchaType === "recaptcha-v3" && !v3Ready);

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

                {/* reCAPTCHA disclosure for compliance */}
                {(captchaType === "recaptcha-v2" || captchaType === "recaptcha-v3") && (
                    <p className="text-xs text-muted-foreground">
                        This site is protected by reCAPTCHA and the Google{" "}
                        <a
                            className="underline hover:text-foreground"
                            href="https://policies.google.com/privacy"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Privacy Policy
                        </a>{" "}
                        and{" "}
                        <a
                            className="underline hover:text-foreground"
                            href="https://policies.google.com/terms"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Terms of Service
                        </a>{" "}
                        apply.
                    </p>
                )}

                <Button
                    type="submit"
                    disabled={submitDisabled}
                    className="text-white w-full p-6 flex items-center gap-2 bg-[#F53003] hover:bg-[#d42a02]"
                >
                    {form.processing ? <Spinner /> : <Send size={18} />}
                    Send Message
                </Button>
            </form>
        </div>
    );
}
