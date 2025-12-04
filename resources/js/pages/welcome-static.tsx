import React, { useState, useEffect } from 'react';
import { Github, Linkedin, Mail, Phone, MapPin, Download, Menu, X, ChevronDown, ExternalLink, Code, Database, Cloud, Layers, Award, Briefcase, GraduationCap, Send, MessageSquare, ArrowRight, Settings } from 'lucide-react';

const Portfolio = () => {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('home');
    const [darkMode, setDarkMode] = useState(true);
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);

            const sections = ['home', 'about', 'skills', 'experience', 'projects', 'contact'];
            const current = sections.find(section => {
                const element = document.getElementById(section);
                if (element) {
                    const rect = element.getBoundingClientRect();
                    return rect.top <= 100 && rect.bottom >= 100;
                }
                return false;
            });
            if (current) setActiveSection(current);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const skills = {
        languages: ['PHP', 'JavaScript', 'Python', 'Go'],
        backend: ['Laravel', 'Node.js', 'FastAPI', 'Express.js'],
        frontend: ['React', 'Vue.js', 'Inertia.js', 'Tailwind CSS'],
        databases: ['MySQL', 'PostgreSQL', 'MongoDB', 'Firebase'],
        devops: ['AWS (EC2, RDS)', 'Docker', 'CI/CD', 'Ansible', 'Cloudways']
    };

    const experiences = [
        {
            company: 'Tech1m',
            role: 'Senior Software Engineer',
            location: 'Lagos, Nigeria',
            period: 'October 2022 - Present',
            achievements: [
                'Architected and deployed scalable APIs across AWS, Cloudways and VPS infrastructures',
                'Led CI/CD automation using GitHub Actions, Docker and Ansible',
                'Optimised SQL/NoSQL databases, enforced security/TDD standards',
                'Mentored engineers through code reviews and pair programming',
                'Drove Agile delivery across multiple projects'
            ]
        },
        {
            company: 'Tedbree',
            role: 'Fullstack Engineer',
            location: 'Lagos, Nigeria',
            period: 'April 2021 - October 2022',
            achievements: [
                'Designed and built scalable REST APIs using Laravel, FastAPI, and Node.js',
                'Orchestrated integrations with payment gateways, geolocation, SSO, social auth',
                'Developed interactive admin dashboards using Inertia.js, Laravel, Vue.js, and React.js',
                'Engineered custom WordPress themes and plugins',
                'Improved database performance through query optimization and indexing'
            ]
        },
        {
            company: 'Veci Technologies',
            role: 'Web Developer',
            location: 'Ibadan, Nigeria',
            period: 'September 2017 - March 2021',
            achievements: [
                'Delivered dynamic and static websites using CodeIgniter, Laravel, PHP',
                'Developed custom WordPress themes/plugins',
                'Designed relational databases and managed hosting environments',
                'Deployed websites via cPanel and FTP'
            ]
        }
    ];

    const projects = [
        {
            title: 'Enterprise API Gateway',
            description: 'Scalable microservices architecture with Docker containerization and CI/CD pipeline',
            tech: ['Laravel', 'Docker', 'AWS', 'PostgreSQL'],
            category: 'backend'
        },
        {
            title: 'Real-time Analytics Dashboard',
            description: 'Interactive admin dashboard with live data visualization and reporting',
            tech: ['React', 'Inertia.js', 'Laravel', 'MongoDB'],
            category: 'fullstack'
        },
        {
            title: 'Payment Integration Platform',
            description: 'Multi-gateway payment processing system with webhook management',
            tech: ['FastAPI', 'Python', 'Redis', 'PostgreSQL'],
            category: 'backend'
        },
        {
            title: 'E-commerce Solution',
            description: 'Full-featured online store with inventory management and order tracking',
            tech: ['Vue.js', 'Laravel', 'MySQL', 'Stripe'],
            category: 'fullstack'
        }
    ];

    const toggleDarkMode = () => setDarkMode(!darkMode);

    const handleInputChange = (e: any) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = () => {
        console.log('Form submitted:', formData);
        alert('Thank you for your message! I will get back to you soon.');
        setFormData({ name: '', email: '', message: '' });
    };

    return (
        <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-[#0a0a0a] text-[#EDEDEC]' : 'bg-[#FDFDFC] text-[#1b1b18]'}`}>
            {/* Animated Background */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none opacity-20">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-red-500 to-orange-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" />
                <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-gradient-to-br from-yellow-500 to-pink-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
                <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" style={{ animationDelay: '4s' }} />
            </div>

            {/* Navigation */}
            <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? (darkMode ? 'bg-[#161615]/90 backdrop-blur-lg shadow-lg' : 'bg-white/90 backdrop-blur-lg shadow-lg') : ''}`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="text-xl font-bold">
                            <span className="text-[#F53003]">Olusegun</span> Ibraheem
                        </div>

                        <div className="hidden md:flex items-center space-x-8">
                            {['home', 'about', 'skills', 'experience', 'projects', 'contact'].map((item) => (
                                <a
                                    key={item}
                                    href={`#${item}`}
                                    className={`capitalize transition-colors ${activeSection === item ? 'text-[#F53003]' : darkMode ? 'text-[#A1A09A] hover:text-[#EDEDEC]' : 'text-[#706f6c] hover:text-[#1b1b18]'}`}
                                >
                                    {item}
                                </a>
                            ))}
                            <button
                                onClick={toggleDarkMode}
                                className="p-2 rounded-lg border border-[#3E3E3A] hover:border-[#62605b] transition-colors"
                            >
                                {darkMode ? '☀️' : '🌙'}
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

                {mobileMenuOpen && (
                    <div className={`md:hidden ${darkMode ? 'bg-[#161615]' : 'bg-white'} border-t ${darkMode ? 'border-[#3E3E3A]' : 'border-gray-200'}`}>
                        <div className="px-4 py-4 space-y-3">
                            {['home', 'about', 'skills', 'experience', 'projects', 'contact'].map((item) => (
                                <a
                                    key={item}
                                    href={`#${item}`}
                                    className="block capitalize py-2"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    {item}
                                </a>
                            ))}
                        </div>
                    </div>
                )}
            </nav>

            {/* Hero Section */}
            <section id="home" className="min-h-screen flex items-center justify-center relative pt-16 px-4">
                <div className="max-w-7xl mx-auto text-center z-10">
                    <div className="mb-8">
                        <h1 className="text-5xl md:text-7xl font-bold mb-4">
                            Hi, I'm <span className="text-[#F53003]">Olusegun Ibraheem</span>
                        </h1>
                        <div className="text-2xl md:text-3xl text-[#A1A09A] mb-6">
                            <span className="inline-block animate-pulse">Senior Software Engineer</span>
                        </div>
                        <p className="text-lg md:text-xl max-w-2xl mx-auto mb-8">
                            Architecting scalable solutions across the full stack with expertise in Laravel, React, AWS, and modern DevOps practices.
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
                        <a
                            href="#projects"
                            className="px-8 py-3 bg-[#F53003] text-white rounded-lg hover:bg-[#d42a02] transition-all transform hover:scale-105 shadow-lg"
                        >
                            View My Work
                        </a>
                        <a
                            href="#contact"
                            className="px-8 py-3 border border-[#3E3E3A] rounded-lg hover:border-[#62605b] transition-all transform hover:scale-105"
                        >
                            Get In Touch
                        </a>
                    </div>

                    <div className="flex justify-center gap-6">
                        <a href="https://github.com/codedsultan" target="_blank" rel="noopener noreferrer" className="hover:text-[#F53003] transition-colors">
                            <Github size={24} />
                        </a>
                        <a href="https://linkedin.com/in/codesultan" target="_blank" rel="noopener noreferrer" className="hover:text-[#F53003] transition-colors">
                            <Linkedin size={24} />
                        </a>
                        <a href="mailto:codesultan369@gmail.com" className="hover:text-[#F53003] transition-colors">
                            <Mail size={24} />
                        </a>
                    </div>

                    <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
                        <ChevronDown size={32} className="text-[#F53003]" />
                    </div>
                </div>
            </section>

            {/* About Section */}
            <section id="about" className="py-20 px-4 scroll-mt-20 relative overflow-hidden">
                <div className="max-w-5xl mx-auto relative">
                    <h2 className="text-4xl font-bold mb-12 text-center animate-fade-in-up">About Me</h2>

                    <div className="grid md:grid-cols-2 gap-12 items-start">
                        {/* Left: Image */}
                        <div className="flex flex-col items-center md:items-start animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
                            <div className="mb-8 relative group w-full">
                                <div className="absolute inset-0 bg-gradient-to-br from-[#F53003] to-[#F8B803] rounded-2xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-500" />
                                <div className="relative overflow-hidden group">
                                    <div className="absolute inset-0 bg-gradient-to-br from-[#F53003]/20 to-[#F8B803]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />
                                    <div className="relative w-full aspect-square rounded-2xl overflow-hidden border-4 border-[#F53003] shadow-2xl">
                                        <img
                                            src="/codesultan/static/Olusegun-Ibraheem.jpg"
                                            alt="Olusegun Ibraheem - Senior Software Engineer"
                                            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Quick Info Badges */}
                            <div className="grid grid-cols-2 gap-4 w-full">
                                {[
                                    { icon: MapPin, text: "Yaba, Lagos", desc: "Based in Lagos" },
                                    { icon: Phone, text: "Available", desc: "Open to opportunities" },
                                    { icon: Award, text: "BCS HEQ", desc: "Professional Certification" },
                                    { icon: GraduationCap, text: "B.Eng.", desc: "Engineering Degree" }
                                ].map((item, idx) => (
                                    <div
                                        key={idx}
                                        className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300 group hover:shadow-md"
                                    >
                                        <div className="p-2 bg-gradient-to-br from-[#F53003]/10 to-[#F8B803]/10 rounded-lg">
                                            <item.icon className="text-[#F53003]" size={20} />
                                        </div>
                                        <div>
                                            <div className="font-semibold text-sm md:text-base">{item.text}</div>
                                            <div className="text-xs text-gray-500 dark:text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity">
                                                {item.desc}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Right: Text + Content */}
                        <div className="animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
                            <h3 className="text-2xl font-semibold mb-4 text-gray-700 dark:text-gray-300">
                                Senior Software Engineer & Technical Lead
                            </h3>

                            <p className="text-xl mb-4 text-[#F53003] font-medium">
                                Turning complex problems into elegant solutions
                            </p>

                            <p className="text-lg mb-6 leading-relaxed">
                                A <span className="font-semibold">Senior Software Engineer</span> with <span className="font-semibold text-[#F53003]">7+ years of experience</span> architecting and building
                                scalable, production-ready applications that serve millions of users. I bridge the gap between
                                business requirements and technical execution.
                            </p>

                            <p className="text-lg mb-8 leading-relaxed">
                                I'm passionate about clean code, best practices, and mentoring fellow engineers.
                                Currently leading technical initiatives at Tech1m, where I drive innovation through
                                Agile methodologies and cutting-edge technologies to deliver exceptional value.
                            </p>

                            {/* Achievement Metrics */}
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-8">
                                {[
                                    { value: "7+", label: "Years Experience" },
                                    { value: "50+", label: "Projects Delivered" },
                                    { value: "100%", label: "Client Satisfaction" }
                                ].map((metric, idx) => (
                                    <div
                                        key={idx}
                                        className="text-center p-3 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-[#F53003] transition-colors"
                                    >
                                        <div className="text-2xl md:text-3xl font-bold text-[#F53003]">{metric.value}</div>
                                        <div className="text-xs md:text-sm text-gray-600 dark:text-gray-400 mt-1">{metric.label}</div>
                                    </div>
                                ))}
                            </div>

                            {/* CTA Button */}
                            <div className="mt-6">
                                <a
                                    href="#contact"
                                    className="inline-flex items-center gap-3 bg-gradient-to-r from-[#F53003] to-[#F8B803] text-white font-semibold px-6 py-3 rounded-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] shadow-lg text-sm md:text-base"
                                >
                                    <MessageSquare size={20} />
                                    <span>Let's Build Something Amazing</span>
                                    <ArrowRight className="ml-1" size={18} />
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Engineering Practices - Full Width Below */}
                    <div className={`mt-12  rounded-2xl ${darkMode ? 'bg-[#161615]' : 'bg-white'} shadow-2xl border border-gray-200 dark:border-gray-800 animate-fade-in-up`} style={{ animationDelay: "0.3s" }}>
                        <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                            <Settings className="text-[#F53003]" size={24} />
                            Engineering Practices & Expertise
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                            {[
                                'Software Architecture & System Design',
                                'Agile/Scrum Development',
                                'Test-Driven Development (TDD)',
                                'Database Optimization & Security',
                                'Containerization & Microservices',
                                'Technical Mentorship',
                                'Performance Optimization',
                                'DevOps & CI/CD Pipelines'
                            ].map((practice, idx) => (
                                <div
                                    key={idx}
                                    className="flex items-start gap-3 p-3 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-all duration-300 group"
                                >
                                    <div className="w-2 h-2 bg-[#F53003] rounded-full flex-shrink-0 mt-2 group-hover:scale-125 transition-transform" />
                                    <span className="text-sm md:text-base">{practice}</span>
                                </div>
                            ))}
                        </div>

                        {/* Optional: Add a small tagline below the practices */}
                        <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700 text-center">
                            <p className="text-gray-600 dark:text-gray-400 italic text-sm md:text-base">
                                Committed to delivering high-quality, maintainable code that stands the test of time.
                            </p>
                        </div>
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-[#F53003]/30 to-[#F8B803]/30 rounded-2xl blur-xl opacity-20"></div>
                    </div>

                </div>
            </section>



            {/* Skills Section */}
            <section id="skills" className={`py-20 px-4 ${darkMode ? 'bg-[#161615]' : 'bg-gray-50'}`}>
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-4xl font-bold mb-12 text-center">Technical Skills</h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {Object.entries(skills).map(([category, items]) => (
                            <div
                                key={category}
                                className={`p-6 rounded-lg ${darkMode ? 'bg-[#0a0a0a]' : 'bg-white'} shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1`}
                            >
                                <div className="flex items-center gap-3 mb-4">
                                    {category === 'languages' && <Code className="text-[#F53003]" />}
                                    {category === 'backend' && <Layers className="text-[#F53003]" />}
                                    {category === 'frontend' && <Briefcase className="text-[#F53003]" />}
                                    {category === 'databases' && <Database className="text-[#F53003]" />}
                                    {category === 'devops' && <Cloud className="text-[#F53003]" />}
                                    <h3 className="text-xl font-bold capitalize">{category}</h3>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {items.map((skill) => (
                                        <span
                                            key={skill}
                                            className={`px-3 py-1 rounded-full text-sm ${darkMode ? 'bg-[#3E3E3A]' : 'bg-gray-200'}`}
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

            {/* Experience Section */}
            <section id="experience" className="py-20 px-4">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-4xl font-bold mb-12 text-center">Work Experience</h2>
                    <div className="space-y-8">
                        {experiences.map((exp, idx) => (
                            <div
                                key={idx}
                                className={`p-6 rounded-lg ${darkMode ? 'bg-[#161615]' : 'bg-white'} shadow-lg hover:shadow-xl transition-all border-l-4 border-[#F53003]`}
                            >
                                <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
                                    <div>
                                        <h3 className="text-2xl font-bold">{exp.role}</h3>
                                        <p className="text-[#F53003] text-lg">{exp.company}</p>
                                        <p className="text-sm text-[#A1A09A]">{exp.location}</p>
                                    </div>
                                    <span className={`mt-2 md:mt-0 px-4 py-1 rounded-full text-sm ${darkMode ? 'bg-[#3E3E3A]' : 'bg-gray-200'}`}>
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

            {/* Projects Section */}
            <section id="projects" className={`py-20 px-4 ${darkMode ? 'bg-[#161615]' : 'bg-gray-50'}`}>
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-4xl font-bold mb-12 text-center">Featured Projects</h2>
                    <div className="grid md:grid-cols-2 gap-8">
                        {projects.map((project, idx) => (
                            <div
                                key={idx}
                                className={`p-6 rounded-lg ${darkMode ? 'bg-[#0a0a0a]' : 'bg-white'} shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-2 group`}
                            >
                                <h3 className="text-2xl font-bold mb-3 group-hover:text-[#F53003] transition-colors">
                                    {project.title}
                                </h3>
                                <p className="mb-4 text-[#A1A09A]">{project.description}</p>
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
                                    <button className="flex items-center gap-2 text-sm hover:text-[#F53003] transition-colors">
                                        <Github size={16} />
                                        Code
                                    </button>
                                    <button className="flex items-center gap-2 text-sm hover:text-[#F53003] transition-colors">
                                        <ExternalLink size={16} />
                                        Live Demo
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Contact Section */}
            <section id="contact" className="py-20 px-4">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-4xl font-bold mb-12 text-center">Get In Touch</h2>
                    <div className="grid md:grid-cols-2 gap-8">
                        <div>
                            <h3 className="text-2xl font-bold mb-6">Let's Work Together</h3>
                            <p className="mb-6 text-[#A1A09A]">
                                I'm always interested in hearing about new projects and opportunities. Whether you have a question or just want to say hi, feel free to reach out!
                            </p>
                            <div className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <Mail className="text-[#F53003]" />
                                    <a href="mailto:codesultan369@gmail.com" className="hover:text-[#F53003]">
                                        codesultan369@gmail.com
                                    </a>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Phone className="text-[#F53003]" />
                                    <span>+234-813-796-2936</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <MapPin className="text-[#F53003]" />
                                    <span>Yaba, Lagos, Nigeria</span>
                                </div>
                            </div>
                            {/* <button className="mt-6 flex items-center gap-2 px-6 py-3 bg-[#F53003] text-white rounded-lg hover:bg-[#d42a02] transition-all">
                                <Download size={20} />
                                Download CV
                            </button> */}
                            <a
                                href="/codesultan/download/Olusegun-Ibraheem-CV.pdf"  // your file path here
                                download="Olusegun-Ibraheem-CV"  // optional custom filename
                                className="mt-6 flex items-center justify-center w-48 gap-2 px-6 py-3 bg-[#F53003] text-white rounded-lg hover:bg-[#d42a02] transition-all"
                            >
                                <Download size={20} />
                                Download CV
                            </a>
                        </div>
                        <div className={`p-6 rounded-lg ${darkMode ? 'bg-[#161615]' : 'bg-white'} shadow-lg`}>
                            <div className="mb-4">
                                <label className="block mb-2 text-sm font-medium">Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    className={`w-full px-4 py-2 rounded-lg border ${darkMode ? 'bg-[#0a0a0a] border-[#3E3E3A]' : 'bg-white border-gray-300'} focus:outline-none focus:border-[#F53003]`}
                                    placeholder="Your name"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block mb-2 text-sm font-medium">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    className={`w-full px-4 py-2 rounded-lg border ${darkMode ? 'bg-[#0a0a0a] border-[#3E3E3A]' : 'bg-white border-gray-300'} focus:outline-none focus:border-[#F53003]`}
                                    placeholder="your@email.com"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block mb-2 text-sm font-medium">Message</label>
                                <textarea
                                    name="message"
                                    value={formData.message}
                                    onChange={handleInputChange}
                                    rows={4}
                                    className={`w-full px-4 py-2 rounded-lg border ${darkMode ? 'bg-[#0a0a0a] border-[#3E3E3A]' : 'bg-white border-gray-300'} focus:outline-none focus:border-[#F53003]`}
                                    placeholder="Your message..."
                                />
                            </div>
                            <button
                                onClick={handleSubmit}
                                className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-[#F53003] text-white rounded-lg hover:bg-[#d42a02] transition-all"
                            >
                                <Send size={20} />
                                Send Message
                            </button>


                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className={`py-8 px-4 border-t ${darkMode ? 'border-[#3E3E3A] bg-[#161615]' : 'border-gray-200 bg-white'}`}>
                <div className="max-w-7xl mx-auto text-center">
                    <p className="text-[#A1A09A]">
                        © 2024 Olusegun Ibraheem. Built with React, Tailwind CSS & Inertia.js
                    </p>
                </div>
            </footer>
        </div>
    );
};

export default Portfolio;
