import { MessageSquare, ArrowRight } from 'lucide-react';

const AboutSummary = () => {
    return (
        <div className="animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
            <h3 className="text-2xl font-semibold mb-4 text-gray-700 dark:text-gray-300">
                Senior Software Engineer & Technical Lead
            </h3>

            <p className="text-xl mb-4 text-[#F53003] font-medium">
                Turning complex problems into elegant solutions
            </p>

            <p className="text-lg mb-6 leading-relaxed">
                A <span className="font-semibold">Senior Software Engineer</span> with <span className="font-semibold text-[#F53003]">7+ years of experience</span> architecting and building scalable applications.
            </p>

            <p className="text-lg mb-8 leading-relaxed">
                Passionate about clean code, architecture, DevOps, and mentorship. Leading engineering initiatives at Tech1M.
            </p>

            {/* Metrics */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-8">
                {[
                    { value: "7+", label: "Years Experience" },
                    { value: "50+", label: "Projects Delivered" },
                    { value: "100%", label: "Client Satisfaction" }
                ].map((metric, idx) => (
                    <div key={idx} className="text-center p-3 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-[#F53003] transition-colors">
                        <div className="text-2xl md:text-3xl font-bold text-[#F53003]">{metric.value}</div>
                        <div className="text-xs md:text-sm text-gray-600 dark:text-gray-400 mt-1">{metric.label}</div>
                    </div>
                ))}
            </div>

            {/* CTA */}
            <a
                href="#contact"
                className="inline-flex items-center gap-3 bg-gradient-to-r from-[#F53003] to-[#F8B803] text-white font-semibold px-6 py-3 rounded-lg hover:shadow-xl transition-all hover:scale-[1.02]"
            >
                <MessageSquare size={20} />
                <span>Let's Build Something Amazing</span>
                <ArrowRight size={18} />
            </a>
        </div>
    );
};

export default AboutSummary;
