import React, { useState, useEffect } from "react";
import { usePage } from "@inertiajs/react";
import { PageProps } from '@inertiajs/core';
import { Toaster } from "sonner";

import {
    Github,
    Linkedin,
    Mail,
    Phone,
    MapPin,
    Download,
    Menu,
    X,
    ChevronDown,
    ExternalLink,
    Code,
    Database,
    Cloud,
    Layers,
    Award,
    Briefcase,
} from "lucide-react";

import SEOHead from "@/components/SEOHead";
import ContactForm from "@/components/ContactForm";
import AboutImage from "@/components/about/AboutImage";
import AboutSummary from "@/components/about/AboutSummary";
import EducationSection from "@/components/about/EducationSection";
import EngineeringPractices from "@/components/about/EngineeringPractices";
import { useAppearance } from "@/hooks/use-appearance";
import { PersonSchema, PortfolioSchema, WebsiteSchema } from "@/types/schema";

interface CaptchaConfig {
    type: "recaptcha-v3" | "recaptcha-v2" | "hcaptcha" | "turnstile" | "none";
    siteKey: string;
}

interface PortfolioPageProps extends PageProps {
    captcha: CaptchaConfig;
}
interface Project {
    id: number;
    title: string;
    slug: string;
    description: string;
    tech: string[];
    category: string;
    image: string | null;
    github_url?: string | null;
    live_url?: string | null;
}

interface Experience {
    company: string;
    role: string;
    location: string;
    period: string;
    achievements: string[];
}

interface Skills {
    [category: string]: string[];
}

interface ContactInfo {
    email?: string;
    phone?: string;
    location?: string;
    github?: string;
    linkedin?: string;
}

interface SEOInfo {
    title?: string;
    description?: string;
    keywords?: string;
    image?: string;
    url?: string | null;
    // schemas?: {
    //     person?: any;
    //     website?: any;
    //     portfolio?: any;
    // };
    schemas?: {
        person?: PersonSchema;
        website?: WebsiteSchema;
        portfolio?: PortfolioSchema;
    };
}

interface PortfolioProps {
    projects: Project[];
    experiences: Experience[];
    skills: Skills;
    profileImage: string | null;
    contactInfo: ContactInfo;
    seo: SEOInfo;
    // captcha: CaptchaConfig;
}

const Portfolio: React.FC<PortfolioProps> = ({
    projects = [],
    experiences = [],
    skills = {},
    profileImage = null,
    contactInfo = {},
    seo = {},
    // captcha = { type: "none", siteKey: "" },
}) => {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState("home");
    const { captcha } = usePage<PortfolioPageProps>().props;


    const { appearance, updateAppearance } = useAppearance();
    console.log(captcha);

    const categorizedProjects = {
        wordpress: [
            {
                title: "Infinibrium Global",
                description: "Corporate website for Infinibrium Global — built with WordPress, custom theme and plugins with SEO optimisations.",
                image: null,
                tech: ["WordPress", "Custom Theme", "PHP", "SEO"],
                live_url: "https://www.infinibriumglobal.com/",
            },
            {
                title: "SDEP",
                description: "Informational website for SDEP — WordPress powered.",
                image: null,
                tech: ["WordPress", "Responsive Design", "Custom Theme", "PHP"],
                live_url: "https://www.sdep.info/",
            },
            {
                title: "Veci Technologies",
                description: "Tech Agency website powered by WordPress — showcases services and portfolio.",
                image: null,
                tech: ["WordPress", "Custom Theme", "PHP"],
                live_url: "https://www.vecitechnologies.net/",
            },
        ],


        landing_pages: [
            {
                title: "Marketing Landing Page",
                description: "High-conversion sales page built with React + Tailwind.",
                image: "/images/landing.jpg",
                tech: ["React", "Tailwind", "SEO"],
                live_url: "#",
            },
        ],

        laravel_apps: [
            {
                title: "HR Automation System",
                description: "A full HR automation suite including payroll, onboarding and employee analytics.",
                image: "/images/laravel-hr.jpg",
                tech: ["Laravel", "MySQL", "Redis", "Inertia"],
                live_url: "#",
            },
        ],
    };


    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);

            const sections = [
                "home",
                "about",
                "skills",
                "experience",
                "projects",
                "contact",
            ];

            const current = sections.find((section) => {
                const el = document.getElementById(section);
                if (!el) return false;
                const rect = el.getBoundingClientRect();
                return rect.top <= 100 && rect.bottom >= 100;
            });

            if (current) setActiveSection(current);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleDownloadCV = () => {
        window.location.href = "/download-cv";
    };

    return (
        <>
            <div className="min-h-screen bg-background text-foreground transition-colors duration-300">

                {/* SEO */}
                <SEOHead
                    title={seo.title}
                    description={seo.description}
                    keywords={seo.keywords}
                    image={seo.image}
                    url={seo.url ?? null}
                    schema={seo.schemas?.person}
                />

                {/* Animated Color Blobs */}
                <div className="fixed inset-0 pointer-events-none opacity-20 overflow-hidden">
                    <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-gradient-to-br from-red-500 to-orange-500 blur-3xl animate-pulse" />
                    <div
                        className="absolute top-1/3 right-1/4 w-96 h-96 rounded-full bg-gradient-to-br from-yellow-500 to-pink-500 blur-3xl animate-pulse"
                        style={{ animationDelay: "2s" }}
                    />
                    <div
                        className="absolute bottom-1/4 left-1/3 w-96 h-96 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 blur-3xl animate-pulse"
                        style={{ animationDelay: "4s" }}
                    />
                </div>

                {/* Navbar */}
                <nav
                    className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-background/90 backdrop-blur-lg shadow-lg border-b border-border" : ""
                        }`}
                >
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between items-center h-16">
                            <div className="text-xl font-bold">
                                <span className="text-[#F53003]">Olusegun</span> Ibraheem
                            </div>

                            <div className="hidden md:flex items-center space-x-8">
                                {["home", "about", "skills", "experience", "projects", "contact"].map(
                                    (item) => (
                                        <a
                                            key={item}
                                            href={`#${item}`}
                                            className={`capitalize transition-colors ${activeSection === item
                                                ? "text-[#F53003]"
                                                : "text-muted-foreground hover:text-foreground"
                                                }`}
                                        >
                                            {item}
                                        </a>
                                    )
                                )}

                                {/* Theme Toggle */}
                                <button
                                    onClick={() =>
                                        updateAppearance(
                                            appearance === "dark" ? "light" : "dark"
                                        )
                                    }
                                    className="p-2 rounded-lg border border-border hover:bg-muted transition"
                                >
                                    {appearance === "dark" ? "☀️" : "🌙"}
                                </button>
                            </div>

                            <button
                                className="md:hidden p-2"
                                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            >
                                {mobileMenuOpen ? <X /> : <Menu />}
                            </button>
                        </div>
                    </div>

                    {/* Mobile menu */}
                    {mobileMenuOpen && (
                        <div className="md:hidden bg-background border-t border-border">
                            <div className="px-4 py-4 space-y-3">
                                {["home", "about", "skills", "experience", "projects", "contact"].map(
                                    (item) => (
                                        <a
                                            key={item}
                                            href={`#${item}`}
                                            className="block capitalize py-2"
                                            onClick={() => setMobileMenuOpen(false)}
                                        >
                                            {item}
                                        </a>
                                    )
                                )}
                            </div>
                        </div>
                    )}
                </nav>

                {/* ================= HERO SECTION ================= */}
                <section
                    id="home"
                    className="min-h-screen flex items-center justify-center relative pt-16 px-4"
                >
                    <div className="max-w-7xl mx-auto text-center z-10">
                        <h1 className="text-5xl md:text-7xl font-bold mb-4 animate-fade-in-up">
                            Hi, I'm <span className="text-[#F53003]">Olusegun Ibraheem</span>
                        </h1>

                        <div
                            className="text-2xl md:text-3xl text-muted-foreground mb-6 animate-fade-in-up"
                            style={{ animationDelay: "0.15s" }}
                        >
                            <span className="inline-block animate-pulse">
                                Senior Software Engineer
                            </span>
                        </div>

                        <p
                            className="text-lg md:text-xl max-w-2xl mx-auto mb-8 leading-relaxed animate-fade-in-up"
                            style={{ animationDelay: "0.25s" }}
                        >
                            Architecting scalable solutions across the full stack with expertise
                            in Laravel, React, AWS, and modern DevOps practices.
                        </p>

                        {/* CTAs */}
                        <div
                            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12 animate-fade-in-up"
                            style={{ animationDelay: "0.35s" }}
                        >
                            <a
                                href="#projects"
                                className="px-8 py-3 bg-[#F53003] text-white rounded-lg hover:bg-[#d42a02] transition transform hover:scale-105 shadow-lg"
                            >
                                View My Work
                            </a>

                            <a
                                href="#contact"
                                className="px-8 py-3 border border-border rounded-lg hover:bg-muted transition transform hover:scale-105"
                            >
                                Get In Touch
                            </a>
                        </div>

                        {/* Social Icons */}
                        <div className="flex justify-center gap-6">
                            <a
                                href={contactInfo.github}
                                target="_blank"
                                className="hover:text-[#F53003] transition-colors"
                            >
                                <Github size={24} />
                            </a>
                            <a
                                href={contactInfo.linkedin}
                                target="_blank"
                                className="hover:text-[#F53003] transition-colors"
                            >
                                <Linkedin size={24} />
                            </a>
                            <a
                                href={`mailto:${contactInfo.email}`}
                                className="hover:text-[#F53003] transition-colors"
                            >
                                <Mail size={24} />
                            </a>
                        </div>

                        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
                            <ChevronDown size={32} className="text-[#F53003]" />
                        </div>
                    </div>
                </section>

                {/* ================= ABOUT SECTION ================= */}
                <section id="about" className="py-20 px-4 scroll-mt-20 relative overflow-hidden">
                    <div className="max-w-5xl mx-auto relative">
                        <div className="grid md:grid-cols-2 gap-12 items-start">
                            <AboutImage profileImage={profileImage} />
                            <AboutSummary />
                        </div>

                        <EducationSection />
                        <EngineeringPractices />
                    </div>
                </section>

                {/* ================= SKILLS SECTION ================= */}
                <section id="skills" className="py-20 px-4 bg-muted/30">
                    <div className="max-w-5xl mx-auto">
                        <h2 className="text-4xl font-bold mb-12 text-center">Technical Skills</h2>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {Object.entries(skills).map(([category, items]) => (
                                <div
                                    key={category}
                                    className="p-6 rounded-lg bg-card border border-border shadow hover:shadow-xl transition transform hover:-translate-y-1"
                                >
                                    <div className="flex items-center gap-3 mb-4">
                                        {category === "languages" && (
                                            <Code className="text-[#F53003]" />
                                        )}
                                        {category === "backend" && (
                                            <Layers className="text-[#F53003]" />
                                        )}
                                        {category === "frontend" && (
                                            <Briefcase className="text-[#F53003]" />
                                        )}
                                        {category === "databases" && (
                                            <Database className="text-[#F53003]" />
                                        )}
                                        {category === "devops" && (
                                            <Cloud className="text-[#F53003]" />
                                        )}

                                        <h3 className="text-xl font-bold capitalize">{category}</h3>
                                    </div>

                                    <div className="flex flex-wrap gap-2">
                                        {items.map((skill) => (
                                            <span
                                                key={skill}
                                                className="px-3 py-1 bg-muted rounded-full text-sm"
                                            >
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ================= EXPERIENCE ================= */}
                <section id="experience" className="py-20 px-4">
                    <div className="max-w-5xl mx-auto">
                        <h2 className="text-4xl font-bold mb-12 text-center">Work Experience</h2>

                        <div className="space-y-8">
                            {experiences.map((exp, idx) => (
                                <div
                                    key={idx}
                                    className="p-6 rounded-lg bg-card border border-border shadow hover:shadow-xl transition"
                                >
                                    <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
                                        <div>
                                            <h3 className="text-2xl font-bold">{exp.role}</h3>
                                            <p className="text-[#F53003] text-lg">{exp.company}</p>
                                            <p className="text-sm text-muted-foreground">
                                                {exp.location}
                                            </p>
                                        </div>

                                        <span className="mt-2 md:mt-0 px-4 py-1 rounded-full text-sm bg-muted text-muted-foreground">
                                            {exp.period}
                                        </span>
                                    </div>

                                    <ul className="space-y-2">
                                        {exp.achievements.map((achievement, i) => (
                                            <li key={i} className="flex items-start gap-2">
                                                <span className="text-[#F53003] mt-1">▹</span>
                                                <span>{achievement}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ================= PROJECTS ================= */}
                <section id="projects" className="py-20 px-4 bg-muted/30">
                    <div className="max-w-5xl mx-auto">
                        <h2 className="text-4xl font-bold mb-12 text-center">Featured Projects</h2>

                        <div className="grid md:grid-cols-2 gap-8">
                            {projects.map((project) => (
                                <div
                                    key={project.id}
                                    className="p-6 rounded-lg bg-card border border-border shadow hover:shadow-xl transition transform hover:-translate-y-2 group"
                                >
                                    {/* Image */}
                                    {project.image ? (
                                        <div className="mb-4 rounded-lg overflow-hidden">
                                            <img
                                                src={project.image}
                                                alt={project.title}
                                                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                                            />
                                        </div>
                                    ) : (
                                        <div className="w-full h-48 grid place-items-center bg-muted text-[#F53003] text-4xl font-bold rounded-lg">
                                            {project.title.charAt(0).toUpperCase()}
                                        </div>
                                    )}

                                    <h3 className="text-2xl font-bold mb-3 group-hover:text-[#F53003] transition-colors">
                                        {project.title}
                                    </h3>

                                    <p className="mb-4 text-muted-foreground">
                                        {project.description}
                                    </p>

                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {project.tech.map((tech) => (
                                            <span
                                                key={tech}
                                                className="px-3 py-1 bg-[#F53003]/10 text-[#F53003] rounded-full text-sm"
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                    </div>

                                    <div className="flex gap-4">
                                        {project.github_url && (
                                            <a
                                                href={project.github_url}
                                                target="_blank"
                                                className="flex items-center gap-2 text-sm hover:text-[#F53003]"
                                            >
                                                <Github size={16} />
                                                Code
                                            </a>
                                        )}

                                        {project.live_url && (
                                            <a
                                                href={project.live_url}
                                                target="_blank"
                                                className="flex items-center gap-2 text-sm hover:text-[#F53003]"
                                            >
                                                <ExternalLink size={16} />
                                                Live Demo
                                            </a>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ================= PROJECTS BY CATEGORY ================= */}
                <section id="project-categories" className="py-20 px-4">
                    <div className="max-w-5xl mx-auto">
                        <h2 className="text-4xl font-bold mb-12 text-center">
                            Recent Projects
                        </h2>

                        {/* ===== WORDPRESS PROJECTS (3-column) ===== */}
                        <div className="mb-16">
                            <h3 className="text-2xl font-bold mb-6 text-[#F53003]">
                                WordPress Projects
                            </h3>

                            <div className="grid md:grid-cols-3 gap-8">
                                {categorizedProjects.wordpress.map((project, index) => (
                                    <div
                                        key={index}
                                        className="p-6 rounded-lg bg-card border border-border shadow hover:shadow-xl transition transform hover:-translate-y-2 group"
                                    >
                                        {project.image ? (
                                            <img
                                                src={project.image}
                                                alt={project.title}
                                                className="w-full h-48 object-cover rounded-lg mb-4 group-hover:scale-105 transition-transform duration-300"
                                            />
                                        ) : (
                                            <div className="w-full h-48 grid place-items-center bg-muted rounded-lg text-4xl font-bold text-[#F53003] mb-4">
                                                {project.title.charAt(0)}
                                            </div>
                                        )}

                                        <h3 className="text-xl font-bold mb-2 group-hover:text-[#F53003] transition-colors">
                                            {project.title}
                                        </h3>

                                        <p className="text-muted-foreground mb-4">
                                            {project.description}
                                        </p>

                                        <div className="flex flex-wrap gap-2 mb-4">
                                            {project.tech.map((tech) => (
                                                <span
                                                    key={tech}
                                                    className="px-3 py-1 bg-[#F53003]/10 text-[#F53003] rounded-full text-sm"
                                                >
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>

                                        <a
                                            href={project.live_url}
                                            target="_blank"
                                            className="flex items-center gap-2 text-sm hover:text-[#F53003]"
                                        >
                                            <ExternalLink size={16} />
                                            View Site
                                        </a>
                                    </div>
                                ))}
                            </div>
                        </div>
                        {/* Add more categories here if needed */}
                    </div>
                </section>



                {/* ================= CONTACT ================= */}
                <section id="contact" className="py-20 px-4">
                    <div className="max-w-5xl mx-auto">
                        <h2 className="text-4xl font-bold mb-12 text-center">
                            Get In Touch
                        </h2>

                        <div className="grid md:grid-cols-2 gap-8">
                            {/* Left */}
                            <div>
                                <h3 className="text-2xl font-bold mb-6">
                                    Let's Work Together
                                </h3>

                                <p className="mb-6 text-muted-foreground">
                                    I'm always interested in hearing about new projects
                                    and opportunities. Whether you have a question or
                                    just want to say hi, feel free to reach out!
                                </p>

                                <div className="space-y-4">
                                    <div className="flex items-center gap-3">
                                        <Mail className="text-[#F53003]" />
                                        <a
                                            href={`mailto:${contactInfo.email}`}
                                            className="hover:text-[#F53003]"
                                        >
                                            {contactInfo.email}
                                        </a>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <Phone className="text-[#F53003]" />
                                        <span>{contactInfo.phone}</span>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <MapPin className="text-[#F53003]" />
                                        <span>{contactInfo.location}</span>
                                    </div>
                                </div>

                                <button
                                    onClick={handleDownloadCV}
                                    className="mt-6 flex items-center gap-2 px-6 py-3 bg-[#F53003] text-white rounded-lg hover:bg-[#d42a02] transition"
                                >
                                    <Download size={20} />
                                    Download CV
                                </button>
                            </div>

                            {/* Right */}
                            {/* <ContactForm /> */}
                            <ContactForm
                                captchaType={captcha.type}
                                captchaSiteKey={captcha.siteKey}
                                captchaAction="contact_form"
                            />
                        </div>
                    </div>
                </section>

                {/* Footer */}
                <footer className="py-8 px-4 border-t border-border bg-background">
                    <div className="max-w-7xl mx-auto text-center">
                        <p className="text-muted-foreground">
                            © 2025 Olusegun Ibraheem. Built with React, Tailwind CSS
                            & Inertia.js
                        </p>
                    </div>
                </footer>
            </div>
            <Toaster position="top-right" richColors duration={4000} />
        </>

    );
};

export default Portfolio;
