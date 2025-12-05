import React, { useState } from "react";
import { Send } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type SubmitStatus = {
    type: "success" | "error";
    message: string;
} | null;

interface ContactFormProps {
    className?: string;
    onSuccess?: () => void;
}

const ContactForm: React.FC<ContactFormProps> = ({ className = "", onSuccess }) => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: ""
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<SubmitStatus>(null);

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        if (submitStatus) setSubmitStatus(null);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus(null);

        try {
            const response = await fetch("/contact", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRF-TOKEN":
                        document
                            .querySelector('meta[name="csrf-token"]')
                            ?.getAttribute("content") || ""
                },
                body: JSON.stringify(formData)
            });


            const data = await response.json();
            console.log("data", data);

            if (response.ok) {
                setSubmitStatus({
                    type: "success",
                    message: "Thank you for your message! I will get back to you soon."
                });

                setFormData({ name: "", email: "", message: "" });
                onSuccess?.();
            } else {
                setSubmitStatus({
                    type: "error",
                    message: data.message || "Something went wrong. Please try again."
                });
            }
        } catch {
            // console.log("error", data.messaged);
            setSubmitStatus({
                type: "error",
                message: "Network error. Please check your connection and try again."
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div
            className={cn(
                "p-6 rounded-xl bg-card border border-border shadow-md",
                "transition-colors duration-300",
                className
            )}
        >
            {/* STATUS MESSAGE */}
            {submitStatus && (
                <div
                    className={cn(
                        "mb-4 p-3 rounded-lg text-sm",
                        submitStatus.type === "success" &&
                        "bg-green-500/15 text-green-600 dark:text-green-400",
                        submitStatus.type === "error" &&
                        "bg-red-500/15 text-red-600 dark:text-red-400"
                    )}
                >
                    {submitStatus.message}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
                {/* NAME */}
                <div className="space-y-1">
                    <label className="text-sm font-medium">Name</label>
                    <Input
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        disabled={isSubmitting}
                        placeholder="Your name"
                        required
                        className="bg-background text-foreground placeholder:text-muted-foreground"
                    />
                </div>

                {/* EMAIL */}
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
                        className="bg-background text-foreground placeholder:text-muted-foreground"
                    />
                </div>

                {/* MESSAGE */}
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
                        className="bg-background text-foreground placeholder:text-muted-foreground"
                    />
                </div>

                {/* SUBMIT BUTTON */}
                <Button
                    type="submit"
                    disabled={isSubmitting}
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
