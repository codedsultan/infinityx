import React from "react";

interface AboutImageProps {
    profileImage: string | null;
}

const AboutImage: React.FC<AboutImageProps> = ({ profileImage }) => {
    return (
        <div className="relative w-full flex justify-center animate-fade-in-up">
            <div className="rounded-2xl overflow-hidden shadow-xl border border-border bg-card w-full max-w-sm">
                {profileImage ? (
                    <img
                        src={profileImage}
                        alt="Profile"
                        className="w-full object-cover h-[380px]"
                    />
                ) : (
                    <div className="h-[380px] w-full bg-muted grid place-items-center text-muted-foreground">
                        No image
                    </div>
                )}
            </div>

            {/* Glow effect */}
            <div className="absolute -inset-1 bg-gradient-to-b from-[#F53003]/40 to-transparent opacity-20 blur-2xl rounded-2xl pointer-events-none" />
        </div>
    );
};

export default AboutImage;
