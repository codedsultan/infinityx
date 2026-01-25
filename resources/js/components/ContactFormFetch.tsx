import React, { useState, useEffect, useRef, useCallback } from "react";
import { Send } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type SubmitStatus =
    | {
        type: "success" | "error";
        message: string;
    }
    | null;

type CaptchaType =
    | "recaptcha-v3"
    | "recaptcha-v2"
    | "hcaptcha"
    | "turnstile"
    | "none";

interface ContactFormProps {
    className?: string;
    onSuccess?: () => void;
    captchaType?: CaptchaType;
    captchaSiteKey?: string;
    captchaAction?: string;
}

/** Minimal typings for the captcha providers to avoid `any` */
type CaptchaWidgetId = string | number;

interface GrecaptchaV2 {
    render: (container: HTMLElement, params: { sitekey: string }) => CaptchaWidgetId;
    getResponse: (widgetId?: CaptchaWidgetId | null) => string;
    reset: (widgetId?: CaptchaWidgetId | null) => void;
}

interface GrecaptchaV3 {
    execute: (siteKey: string, options: { action: string }) => Promise<string>;
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

// declare global {
//     interface Window {
//         grecaptcha?: Grecaptcha;
//         hcaptcha?: Hcaptcha;
//         turnstile?: Turnstile;
//     }
// }

type ContactResponse = { message?: string };

const ContactForm: React.FC<ContactFormProps> = ({
    className = "",
    onSuccess,
    captchaType = "none",
    captchaSiteKey = "",
    captchaAction = "submit"
}) => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: ""
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<SubmitStatus>(null);
    const [captchaLoaded, setCaptchaLoaded] = useState(false);

    const recaptchaV2Ref = useRef<HTMLDivElement>(null);
    const hcaptchaRef = useRef<HTMLDivElement>(null);
    const turnstileRef = useRef<HTMLDivElement>(null);

    // Widget id for visible captchas (v2/hcaptcha/turnstile)
    const widgetIdRef = useRef<CaptchaWidgetId | null>(null);

    // Renders captcha widgets for visible captchas (stable ref for hooks + script.onload)
    const renderVisibleCaptcha = useCallback(() => {
        if (!captchaSiteKey) return;

        if (
            captchaType === "recaptcha-v2" &&
            recaptchaV2Ref.current &&
            window.grecaptcha?.render
        ) {
            widgetIdRef.current = window.grecaptcha.render(recaptchaV2Ref.current, {
                sitekey: captchaSiteKey
            });
        }

        if (captchaType === "hcaptcha" && hcaptchaRef.current && window.hcaptcha?.render) {
            widgetIdRef.current = window.hcaptcha.render(hcaptchaRef.current, {
                sitekey: captchaSiteKey
            });
        }

        if (captchaType === "turnstile" && turnstileRef.current && window.turnstile?.render) {
            widgetIdRef.current = window.turnstile.render(turnstileRef.current, {
                sitekey: captchaSiteKey
            });
        }
    }, [captchaType, captchaSiteKey]);

    // Load captcha script dynamically
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
                script.src = "https://www.google.com/recaptcha/api.js";
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
            renderVisibleCaptcha();
        };

        document.body.appendChild(script);

        return () => {
            // optional: do not remove script since it may be shared across components/pages
        };
    }, [captchaType, captchaSiteKey, renderVisibleCaptcha]);

    useEffect(() => {
        if (captchaLoaded) renderVisibleCaptcha();
    }, [captchaLoaded, renderVisibleCaptcha]);

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        if (submitStatus) setSubmitStatus(null);
    };

    // Retrieves token from correct provider
    const getCaptchaToken = async (): Promise<string | null> => {
        if (captchaType === "none") return null;

        switch (captchaType) {
            case "recaptcha-v3": {
                const execute = window.grecaptcha?.execute;
                if (!execute) throw new Error("reCAPTCHA v3 not loaded");
                return await execute(captchaSiteKey, { action: captchaAction });
            }

            case "recaptcha-v2": {
                const getResponse = window.grecaptcha?.getResponse;
                if (!getResponse) throw new Error("reCAPTCHA v2 not loaded");
                const token = getResponse(widgetIdRef.current);
                if (!token) throw new Error("Please complete the CAPTCHA");
                return token;
            }

            case "hcaptcha": {
                const getResponse = window.hcaptcha?.getResponse;
                if (!getResponse) throw new Error("hCaptcha not loaded");
                const token = getResponse(widgetIdRef.current);
                if (!token) throw new Error("Please complete the CAPTCHA");
                return token;
            }

            case "turnstile": {
                const getResponse = window.turnstile?.getResponse;
                if (!getResponse) throw new Error("Turnstile not loaded");
                const token = getResponse(widgetIdRef.current);
                if (!token) throw new Error("Please complete the CAPTCHA");
                return token;
            }

            default:
                return null;
        }
    };

    const resetCaptcha = () => {
        if (captchaType === "recaptcha-v2" && window.grecaptcha?.reset) {
            window.grecaptcha?.reset?.(widgetIdRef.current);
            // ^ (typo-safe) but eslint/typescript might not like it. Use the line below instead.
        }

        if (captchaType === "recaptcha-v2" && window.grecaptcha?.reset) {
            window.grecaptcha.reset(widgetIdRef.current);
        } else if (captchaType === "hcaptcha" && window.hcaptcha?.reset) {
            window.hcaptcha.reset(widgetIdRef.current);
        } else if (captchaType === "turnstile" && window.turnstile?.reset) {
            window.turnstile.reset(widgetIdRef.current);
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus(null);

        try {
            const captchaToken = await getCaptchaToken();

            const response = await fetch("/contact", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRF-TOKEN":
                        document
                            .querySelector('meta[name="csrf-token"]')
                            ?.getAttribute("content") || ""
                },
                body: JSON.stringify({
                    ...formData,
                    captchaType,
                    captchaToken,
                    captchaAction
                })
            });

            const data = (await response.json()) as ContactResponse;

            if (response.ok) {
                setSubmitStatus({
                    type: "success",
                    message: "Thank you for your message! I will get back to you soon."
                });
                setFormData({ name: "", email: "", message: "" });
                resetCaptcha();
                onSuccess?.();
            } else {
                setSubmitStatus({
                    type: "error",
                    message: data.message || "Something went wrong. Please try again."
                });
                resetCaptcha();
            }
        } catch (error: unknown) {
            setSubmitStatus({
                type: "error",
                message: error instanceof Error ? error.message : "An error occurred."
            });
            resetCaptcha();
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className={cn("p-6 rounded-xl bg-card border border-border shadow-md", className)}>
            {submitStatus && (
                <div
                    className={cn(
                        "mb-4 p-3 rounded-lg text-sm",
                        submitStatus.type === "success"
                            ? "bg-green-500/15 text-green-600"
                            : "bg-red-500/15 text-red-600"
                    )}
                >
                    {submitStatus.message}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-1">
                    <label className="text-sm font-medium">Name</label>
                    <Input
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        disabled={isSubmitting}
                        placeholder="Your name"
                        required
                    />
                </div>

                <div className="space-y-1">
                    <label className="text-sm font-medium">Email</label>
                    <Input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        disabled={isSubmitting}
                        placeholder="you@email.com"
                        required
                    />
                </div>

                <div className="space-y-1">
                    <label className="text-sm font-medium">Message</label>
                    <Textarea
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        disabled={isSubmitting}
                        rows={5}
                        placeholder="Your message..."
                        required
                    />
                </div>

                {/* CAPTCHA Widgets */}
                {captchaLoaded && captchaType === "recaptcha-v2" && <div ref={recaptchaV2Ref} />}
                {captchaLoaded && captchaType === "hcaptcha" && <div ref={hcaptchaRef} />}
                {captchaLoaded && captchaType === "turnstile" && <div ref={turnstileRef} />}

                <Button
                    type="submit"
                    disabled={isSubmitting || !captchaLoaded}
                    className="w-full p-6 flex items-center gap-2 bg-[#F53003] hover:bg-[#d42a02]"
                >
                    {isSubmitting ? (
                        <>
                            <span className="animate-spin">⏳</span> Sending...
                        </>
                    ) : (
                        <>
                            <Send size={18} /> Send Message
                        </>
                    )}
                </Button>
            </form>
        </div>
    );
};

export default ContactForm;
