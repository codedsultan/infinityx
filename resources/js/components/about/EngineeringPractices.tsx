import { Settings } from "lucide-react";

const EngineeringPractices = () => {
    const practices = [
        "Software Architecture & System Design",
        "Agile/Scrum Development",
        "Test-Driven Development (TDD)",
        "Database Optimization & Security",
        "Containerization & Microservices",
        "Technical Mentorship",
        "Performance Optimization",
        "DevOps & CI/CD Pipelines",
        "Cloud Infrastructure & Automation",
    ];

    return (
        <div className="mt-12 animate-fade-in-up">
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <Settings className="text-[#F53003]" size={24} />
                Engineering Practices & Expertise
            </h3>
            <div
                className="
                rounded-2xl relative
                bg-card text-foreground border border-border shadow-xl
                p-4 md:p-6
            "
                style={{ animationDelay: "0.3s" }}
            >


                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                    {practices.map((practice, idx) => (
                        <div
                            key={idx}
                            className="
                            flex items-start gap-2 p-1 rounded-lg
                            hover:bg-muted dark:hover:bg-muted/40
                            transition-all group
                        "
                        >
                            <div
                                className="
                                w-2 h-2 mt-2 rounded-full bg-[#F53003]
                                group-hover:scale-125 transition-transform
                            "
                            />
                            <span className="text-sm md:text-base">{practice}</span>
                        </div>
                    ))}
                </div>

                <div className="mt-6 pt-6 border-t border-border text-center">
                    <p className="text-muted-foreground italic text-sm md:text-base">
                        Committed to delivering high-quality, maintainable code that
                        stands the test of time.
                    </p>
                </div>

                <div
                    className="
                    absolute -inset-0.5 bg-gradient-to-r
                    from-[#F53003]/20 to-[#F8B803]/20
                    rounded-2xl blur-xl opacity-20 pointer-events-none
                "
                />
            </div>
        </div>
    );
};

export default EngineeringPractices;
