interface AboutImageProps {
    profileImage: string | null;

}

const AboutImage: React.FC<AboutImageProps> = ({ profileImage }) => {
    return (
        <div className="flex flex-col items-center md:items-start animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
            <div className="mb-8 relative group w-full">
                <div className="absolute inset-0 bg-gradient-to-br from-[#F53003] to-[#F8B803] rounded-2xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-500" />
                <div className="relative overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#F53003]/20 to-[#F8B803]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />
                    <div className="relative w-full  aspect-square rounded-2xl overflow-hidden border-4 border-[#F53003] shadow-2xl">
                        {profileImage ? (
                            <img
                                src={profileImage}
                                alt="Olusegun Ibraheem"
                                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center bg-gray-200 dark:bg-[#161615] text-[#F53003] text-6xl font-bold">
                                OI
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutImage;
