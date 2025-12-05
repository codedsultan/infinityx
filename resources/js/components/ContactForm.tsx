import React, { useState, useEffect, useRef } from "react";
import { Send } from "lucide-react";
import { useForm } from "@inertiajs/react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import InputError from "@/components/input-error";
import { Spinner } from '@/components/ui/spinner';
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
    const widgetIdRef = useRef<any>(null);

    const form = useForm({
        name: "",
        email: "",
        message: "",
        captchaType,
        captchaToken: "",
        captchaAction,
    });

    /* -------------------------------------------------------------
     * reCAPTCHA v3 Warm-Up Loop
     * ------------------------------------------------------------- */
    useEffect(() => {
        if (captchaType !== "recaptcha-v3") return;
        if (!captchaLoaded) return;
        if (!window.grecaptcha) return;

        const warmup = () => {
            window.grecaptcha.ready(async () => {
                try {
                    const token = await window.grecaptcha.execute(captchaSiteKey, {
                        action: "warmup",
                    });

                    if (token && token.length > 0) {
                        setV3Ready(true);
                    } else {
                        setTimeout(warmup, 300);
                    }
                } catch {
                    setTimeout(warmup, 300);
                }
            });
        };

        setTimeout(warmup, 200);
    }, [captchaLoaded, captchaType]);

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
                script.src =
                    "https://www.google.com/recaptcha/api.js?onload=onRecaptchaLoaded&render=explicit";
                break;

            case "hcaptcha":
                script.src = "https://js.hcaptcha.com/1/api.js";
                break;

            case "turnstile":
                script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js";
                break;
        }

        script.onload = () => {
            setCaptchaLoaded(true);
            renderCaptcha();
        };

        document.body.appendChild(script);
    }, [captchaType, captchaSiteKey]);

    /* -------------------------------------------------------------
     * Render CAPTCHA widgets (v2, hCaptcha, Turnstile)
     * ------------------------------------------------------------- */
    const renderCaptcha = () => {
        if (captchaType === "recaptcha-v2" && recaptchaV2Ref.current && window.grecaptcha) {
            widgetIdRef.current = window.grecaptcha.render(recaptchaV2Ref.current, {
                sitekey: captchaSiteKey,
            });
        }

        if (captchaType === "hcaptcha" && hcaptchaRef.current && window.hcaptcha) {
            widgetIdRef.current = window.hcaptcha.render(hcaptchaRef.current, {
                sitekey: captchaSiteKey,
            });
        }

        if (captchaType === "turnstile" && turnstileRef.current && window.turnstile) {
            widgetIdRef.current = window.turnstile.render(turnstileRef.current, {
                sitekey: captchaSiteKey,
            });
        }
    };

    useEffect(() => {
        if (captchaLoaded) renderCaptcha();
    }, [captchaLoaded]);

    /* -------------------------------------------------------------
     * Retrieve token for the correct provider
     * ------------------------------------------------------------- */
    const executeV3 = async (): Promise<string | null> => {
        if (!window.grecaptcha) return null;

        await new Promise((resolve) => window.grecaptcha.ready(resolve));

        const token = await window.grecaptcha.execute(captchaSiteKey, {
            action: captchaAction,
        });

        return token || null;
    };

    const getCaptchaToken = async (): Promise<string | null> => {
        switch (captchaType) {
            case "recaptcha-v3":
                return await executeV3();

            case "recaptcha-v2":
                return window.grecaptcha?.getResponse(widgetIdRef.current);

            case "hcaptcha":
                return window.hcaptcha?.getResponse(widgetIdRef.current);

            case "turnstile":
                return window.turnstile?.getResponse(widgetIdRef.current);

            default:
                return null;
        }
    };

    /* -------------------------------------------------------------
     * Submit handler (with transform() fix)
     * ------------------------------------------------------------- */
    const submit = async (e: React.FormEvent) => {
        e.preventDefault();

        const token = await getCaptchaToken();
        console.log("Retrieved CAPTCHA token:", token);

        if (captchaType === "recaptcha-v3" && !token) {
            toast.error("Security verification failed. Please try again.");
            return;
        }

        // ❗ Fix: Use transform() to ensure token is sent IMMEDIATELY
        form.transform((data) => ({
            ...data,
            captchaToken: token,
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

    /* -------------------------------------------------------------
     * Render
     * ------------------------------------------------------------- */
    return (
        <div className={cn("p-6 rounded-xl bg-card border border-border shadow-md", className)}>
            <form onSubmit={submit} className="space-y-4">
                {/* NAME */}
                <div>
                    <label className="text-sm font-medium">Name</label>
                    <Input
                        name="name"
                        value={form.data.name}
                        onChange={(e) => form.setData("name", e.target.value)}
                    />
                    <InputError message={form.errors.name} />
                </div>

                {/* EMAIL */}
                <div>
                    <label className="text-sm font-medium">Email</label>
                    <Input
                        type="email"
                        name="email"
                        value={form.data.email}
                        onChange={(e) => form.setData("email", e.target.value)}
                    />
                    <InputError message={form.errors.email} />
                </div>

                {/* MESSAGE */}
                <div>
                    <label className="text-sm font-medium">Message</label>
                    <Textarea
                        name="message"
                        rows={5}
                        value={form.data.message}
                        onChange={(e) => form.setData("message", e.target.value)}
                    />
                    <InputError message={form.errors.message} />
                </div>

                {/* CAPTCHA WIDGETS */}
                {captchaType === "recaptcha-v2" && <div ref={recaptchaV2Ref} />}
                {captchaType === "hcaptcha" && <div ref={hcaptchaRef} />}
                {captchaType === "turnstile" && <div ref={turnstileRef} />}

                <InputError message={form.errors.captchaToken} />

                {/* SUBMIT */}
                <Button
                    type="submit"
                    disabled={
                        form.processing ||
                        !captchaLoaded ||
                        (captchaType === "recaptcha-v3" && !v3Ready)
                    }
                    className="text-white w-full p-6 flex items-center gap-2 bg-[#F53003] hover:bg-[#d42a02]"
                >
                    {/* {form.processing && <span className="animate-spin">⏳</span>} */}
                    {form.processing ? <Spinner /> : <Send size={18} />}
                    Send Message
                </Button>
            </form>
        </div>
    );
}
