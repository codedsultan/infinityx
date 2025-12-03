import React, { useState, useEffect, useRef } from "react";
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
    GraduationCap,
    Send,
} from "lucide-react";

import { useGsapFadeIn } from "@/animations/useGsapFadeIn";
import { useGsapParallax } from "@/animations/useGsapParallax";
import { initSectionAnimations } from "@/animations/initSectionAnimations";

import gsap from "gsap";

const Portfolio = () => {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState("home");
    const [darkMode, setDarkMode] = useState(true);
    const [formData, setFormData] = useState({ name: "", email: "", message: "" });

    // 3D Tilt Reference
    const aboutImageRef = useRef<HTMLDivElement>(null);

    // SCROLLSPY + NAVBAR CHANGE
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);

            const sections = ["home", "about", "skills", "experience", "projects", "contact"];
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

    // INIT SECTION TITLE ANIMATIONS
    useEffect(() => {
        initSectionAnimations();
    }, []);

    // Fade-in usage everywhere
    useGsapFadeIn({ selector: ".hero-title, .hero-sub, .hero-buttons", y: 40, stagger: 0.2 });
    useGsapFadeIn({ selector: "#about .fade-item", y: 35 });
    useGsapFadeIn({ selector: ".skill-card", y: 30 });
    useGsapFadeIn({ selector: ".project-card", y: 30 });
    useGsapFadeIn({ selector: "#contact .fade-item", y: 30 });

    // Parallax blobs
    useGsapParallax({ selector: ".parallax-blob", y: -80 });

    // SAFE 3D TILT FOR ABOUT PHOTO
    useEffect(() => {
        const el = aboutImageRef.current;
        if (!el) return;

        const handleMove = (e: MouseEvent) => {
            const rect = el.getBoundingClientRect();
            const x = e.clientX - (rect.left + rect.width / 2);
            const y = e.clientY - (rect.top + rect.height / 2);

            gsap.to(el, {
                rotateX: (-y / 20).toFixed(2),
                rotateY: (x / 20).toFixed(2),
                scale: 1.05,
                duration: 0.3,
            });
        };

        const reset = () => {
            gsap.to(el, { rotateX: 0, rotateY: 0, scale: 1, duration: 0.5 });
        };

        el.addEventListener("mousemove", handleMove);
        el.addEventListener("mouseleave", reset);

        return () => {
            el.removeEventListener("mousemove", handleMove);
            el.removeEventListener("mouseleave", reset);
        };
    }, []);

    // FORM HANDLING
    const toggleDarkMode = () => setDarkMode(!darkMode);
    const handleInputChange = (e: any) => setFormData({ ...formData, [e.target.name]: e.target.value });
    const handleSubmit = () => {
        alert("Thank you for your message!");
        setFormData({ name: "", email: "", message: "" });
    };

    // Skills, Experiences, Projects Data
    const skills = {
        languages: ["PHP", "JavaScript", "Python", "Go"],
        backend: ["Laravel", "Node.js", "FastAPI", "Express.js"],
        frontend: ["React", "Vue.js", "Inertia.js", "Tailwind CSS"],
        databases: ["MySQL", "PostgreSQL", "MongoDB", "Firebase"],
        devops: ["AWS (EC2, RDS)", "Docker", "CI/CD", "Ansible", "Cloudways"],
    };

    const experiences = [
        {
            company: "Tech1m",
            role: "Senior Software Engineer",
            location: "Lagos, Nigeria",
            period: "October 2022 - Present",
            achievements: [
                "Architected and deployed scalable APIs across AWS, Cloudways and VPS infrastructures",
                "Led CI/CD automation using GitHub Actions, Docker and Ansible",
                "Optimised SQL/NoSQL databases, enforced security/TDD standards",
                "Mentored engineers through code reviews and pair programming",
                "Drove Agile delivery across multiple projects",
            ],
        },
        {
            company: "Tedbree",
            role: "Fullstack Engineer",
            location: "Lagos, Nigeria",
            period: "April 2021 - October 2022",
            achievements: [
                "Designed scalable REST APIs using Laravel, FastAPI, and Node.js",
                "Integrated payment gateways, geolocation, SSO, and social auth",
                "Developed modern dashboards with Inertia.js, Vue.js, and React.js",
                "Built custom WordPress themes/plugins",
                "Optimized database performance using indexing and queries",
            ],
        },
        {
            company: "Veci Technologies",
            role: "Web Developer",
            location: "Ibadan, Nigeria",
            period: "September 2017 - March 2021",
            achievements: [
                "Built dynamic and static websites using PHP frameworks",
                "Developed custom WordPress themes/plugins",
                "Managed hosting environments & developed relational DBs",
                "Deployed client websites via cPanel/FTP",
            ],
        },
    ];

    const projects = [
        {
            title: "Enterprise API Gateway",
            description: "Scalable microservices architecture with Docker and CI/CD pipeline",
            tech: ["Laravel", "Docker", "AWS", "PostgreSQL"],
        },
        {
            title: "Real-time Analytics Dashboard",
            description: "Live visualization platform using React + Laravel + MongoDB",
            tech: ["React", "Inertia.js", "Laravel", "MongoDB"],
        },
        {
            title: "Payment Integration Platform",
            description: "Multi-gateway processor with webhook tracking",
            tech: ["FastAPI", "Python", "Redis", "PostgreSQL"],
        },
        {
            title: "E-commerce Solution",
            description: "Full online store with inventory & order management",
            tech: ["Vue.js", "Laravel", "MySQL", "Stripe"],
        },
    ];

    return (
        <div className={darkMode ? "bg-[#0a0a0a] text-[#EDEDEC]" : "bg-[#FDFDFC] text-[#1b1b18]"}>
            {/* BACKGROUND BLOBS */}
            <div className="fixed inset-0 opacity-20 pointer-events-none">
                <div className="parallax-blob absolute top-1/4 left-1/4 w-96 h-96 bg-red-500 rounded-full blur-3xl mix-blend-multiply"></div>
                <div className="parallax-blob absolute top-1/3 right-1/4 w-96 h-96 bg-yellow-500 rounded-full blur-3xl mix-blend-multiply"></div>
                <div className="parallax-blob absolute bottom-1/4 left-1/3 w-96 h-96 bg-purple-500 rounded-full blur-3xl mix-blend-multiply"></div>
            </div>

            {/* NAVIGATION */}
            <nav className={`fixed top-0 left-0 right-0 z-50 p-4 ${scrolled ? "bg-black/30 backdrop-blur shadow-lg" : ""}`}>
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    <div className="font-bold text-xl">
                        <span className="text-[#F53003]">Olusegun</span> Ibraheem
                    </div>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex gap-6">
                        {["home", "about", "skills", "experience", "projects", "contact"].map((item) => (
                            <a key={item} href={`#${item}`} className={activeSection === item ? "text-[#F53003]" : "hover:text-[#F53003]"}>
                                {item}
                            </a>
                        ))}
                        <button onClick={toggleDarkMode}>{darkMode ? "☀️" : "🌙"}</button>
                    </div>

                    {/* Mobile Nav Toggle */}
                    <button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                        {mobileMenuOpen ? <X /> : <Menu />}
                    </button>
                </div>

                {/* Mobile Menu */}
                {mobileMenuOpen && (
                    <div className="md:hidden bg-black/50 backdrop-blur p-4">
                        {["home", "about", "skills", "experience", "projects", "contact"].map((item) => (
                            <a key={item} href={`#${item}`} className="block py-2" onClick={() => setMobileMenuOpen(false)}>
                                {item}
                            </a>
                        ))}
                    </div>
                )}
            </nav>

            {/* ================= HERO ================= */}
            <section id="home" className="min-h-screen flex items-center justify-center text-center px-4 pt-20">
                <div>
                    <h1 className="hero-title text-5xl md:text-7xl font-bold mb-4">
                        Hi, I'm <span className="text-[#F53003]">Olusegun Ibraheem</span>
                    </h1>

                    <div className="hero-sub text-xl md:text-3xl text-[#A1A09A] mb-6">
                        Senior Software Engineer
                    </div>

                    <p className="fade-item max-w-2xl mx-auto mb-8 text-lg">
                        I build scalable backend systems, APIs, dashboards and cloud deployments.
                    </p>

                    <div className="hero-buttons flex flex-col sm:flex-row gap-4 justify-center">
                        <a href="#projects" className="bg-[#F53003] text-white px-8 py-3 rounded-lg">View My Work</a>
                        <a href="#contact" className="border px-8 py-3 rounded-lg">Get In Touch</a>
                    </div>

                    {/* <div className="mt-10 animate-bounce text-[#F53003]">
                        <ChevronDown size={32} />
                    </div> */}
                    <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
                        <ChevronDown size={32} className="text-[#F53003]" />
                    </div>

                </div>
            </section>

            {/* ================= ABOUT ================= */}
            <section id="about" className="py-20 px-4">
                <div className="max-w-7xl mx-auto">
                    <h2 className="section-title fade-item text-4xl font-bold text-center mb-12">About Me</h2>

                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        {/* Photo */}
                        <div className="fade-item flex justify-center">
                            <div ref={aboutImageRef} className="w-64 h-64 rounded-2xl overflow-hidden border-4 border-[#F53003] shadow-2xl">
                                <div className={darkMode ? "bg-[#161615]" : "bg-gray-200"}>
                                    <div className="w-full h-full flex items-center justify-center text-6xl text-[#F53003] font-bold">
                                        OI
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* About Text */}
                        <div>
                            <p className="fade-item text-lg mb-6">
                                With 7+ years building complex backend systems, I specialize in scalable APIs, cloud infrastructure, and system architecture.
                            </p>

                            <p className="fade-item text-lg mb-6">
                                I write clean code, optimize databases, lead engineering teams, and mentor developers.
                            </p>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="fade-item flex gap-2"><MapPin className="text-[#F53003]" /> Yaba, Lagos</div>
                                <div className="fade-item flex gap-2"><Phone className="text-[#F53003]" /> Available</div>
                                <div className="fade-item flex gap-2"><Award className="text-[#F53003]" /> BCS HEQ</div>
                                <div className="fade-item flex gap-2"><GraduationCap className="text-[#F53003]" /> B.Eng</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ================= SKILLS ================= */}
            <section id="skills" className={`py-20 px-4 ${darkMode ? "bg-[#161615]" : "bg-gray-50"}`}>
                <div className="max-w-7xl mx-auto">
                    <h2 className="section-title fade-item text-4xl font-bold text-center mb-12">Technical Skills</h2>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {Object.entries(skills).map(([category, items]) => (
                            <div key={category} className="skill-card p-6 rounded-lg shadow-lg bg-white/5">
                                <h3 className="text-xl font-bold mb-4 capitalize">{category}</h3>
                                <div className="flex flex-wrap gap-2">
                                    {items.map((skill) => (
                                        <span key={skill} className="fade-item bg-[#3E3E3A] px-3 py-1 rounded-full text-sm">
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
                <div className="max-w-7xl mx-auto">
                    <h2 className="section-title fade-item text-4xl font-bold text-center mb-12">Work Experience</h2>

                    <div className="space-y-8">
                        {experiences.map((exp, idx) => (
                            <div key={idx} className="fade-item p-6 rounded-lg shadow-lg bg-white/5 border-l-4 border-[#F53003]">
                                <h3 className="text-2xl font-bold">{exp.role}</h3>
                                <p className="text-[#F53003]">{exp.company}</p>
                                <p className="text-sm text-[#A1A09A] mb-4">{exp.location}</p>

                                <ul className="space-y-2">
                                    {exp.achievements.map((a, i) => (
                                        <li key={i} className="fade-item flex gap-2">
                                            <span className="text-[#F53003]">▹</span> {a}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ================= PROJECTS ================= */}
            <section id="projects" className={`py-20 px-4 ${darkMode ? "bg-[#161615]" : "bg-gray-50"}`}>
                <div className="max-w-7xl mx-auto">
                    <h2 className="section-title fade-item text-4xl font-bold text-center mb-12">Featured Projects</h2>

                    <div className="grid md:grid-cols-2 gap-8">
                        {projects.map((p, idx) => (
                            <div key={idx} className="project-card p-6 rounded-lg shadow-lg bg-white/5">
                                <h3 className="text-2xl font-bold mb-2">{p.title}</h3>

                                <p className="text-[#A1A09A] mb-4">{p.description}</p>

                                <div className="flex flex-wrap gap-2 mb-4">
                                    {p.tech.map((t) => (
                                        <span key={t} className="fade-item bg-[#F53003]/10 text-[#F53003] px-3 py-1 rounded-full text-sm">
                                            {t}
                                        </span>
                                    ))}
                                </div>

                                <div className="flex gap-4">
                                    <button className="fade-item flex gap-2 hover:text-[#F53003]"><Github size={16} /> Code</button>
                                    <button className="fade-item flex gap-2 hover:text-[#F53003]"><ExternalLink size={16} /> Demo</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ================= CONTACT ================= */}
            <section id="contact" className="py-20 px-4">
                <div className="max-w-4xl mx-auto">
                    <h2 className="section-title fade-item text-4xl font-bold text-center mb-12">Get In Touch</h2>

                    <div className="grid md:grid-cols-2 gap-8">
                        <div>
                            <h3 className="fade-item text-2xl font-bold mb-4">Let's Work Together</h3>

                            <p className="fade-item text-[#A1A09A] mb-6">
                                Feel free to reach out for collaborations or opportunities.
                            </p>

                            <div className="space-y-3">
                                <div className="fade-item flex gap-2"><Mail className="text-[#F53003]" /> codesultan369@gmail.com</div>
                                <div className="fade-item flex gap-2"><Phone className="text-[#F53003]" /> +234-813-796-2936</div>
                                <div className="fade-item flex gap-2"><MapPin className="text-[#F53003]" /> Yaba, Lagos</div>
                            </div>
                        </div>

                        {/* FORM */}
                        <div className="fade-item p-6 rounded-lg shadow-lg bg-white/5">
                            <div className="fade-item mb-4">
                                <label>Name</label>
                                <input
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    className="w-full p-3 border rounded bg-white/10"
                                />
                            </div>

                            <div className="fade-item mb-4">
                                <label>Email</label>
                                <input
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    className="w-full p-3 border rounded bg-white/10"
                                />
                            </div>

                            <div className="fade-item mb-4">
                                <label>Message</label>
                                <textarea
                                    name="message"
                                    value={formData.message}
                                    onChange={handleInputChange}
                                    rows={4}
                                    className="w-full p-3 border rounded bg-white/10"
                                />
                            </div>

                            <button
                                onClick={handleSubmit}
                                className="fade-item w-full bg-[#F53003] text-white p-3 rounded-lg"
                            >
                                <Send size={18} className="inline-block mr-2" />
                                Send Message
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* ================= FOOTER ================= */}
            <footer className="py-6 text-center opacity-70">
                © 2024 Olusegun Ibraheem — Built with React & Tailwind CSS
            </footer>
        </div>
    );
};

export default Portfolio;
