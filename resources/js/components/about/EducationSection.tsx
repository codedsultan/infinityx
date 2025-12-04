import { Award } from "lucide-react";

const EducationSection = () => {
    const items = [
        {
            school: "The Chartered Institute of IT (BCS), London, UK",
            program: "Higher Education Qualification (HEQ) in IT",
            date: "Completed: April 2022",
        },
        {
            school: "Osun State University, Osogbo, Nigeria",
            program: "Bachelor of Engineering (B.Eng.) in Civil Engineering",
            date: "Completed: September 2015",
        },
    ];

    return (
        <div
            className="w-full mt-12 space-y-6 animate-fade-in-up"
            style={{ animationDelay: "0.15s" }}
        >
            <h3 className="text-2xl font-bold flex items-center gap-3 text-foreground">
                <Award className="text-[#F53003]" size={24} />
                Education & Certifications
            </h3>

            {/* GRID: 2 columns on md+ */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {items.map((item, i) => (
                    <div
                        key={i}
                        className="
                            p-4 rounded-lg bg-card border border-border
                            hover:shadow-lg transition-all duration-300
                        "
                    >
                        <div className="font-semibold text-base">
                            {item.school}
                        </div>

                        <div className="text-sm text-muted-foreground">
                            {item.program}
                        </div>

                        <div className="text-xs text-muted-foreground mt-1">
                            {item.date}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default EducationSection;
