import { Head } from '@inertiajs/react';


interface SEOHeadProps {
    title?: string;
    description?: string;
    keywords?: string;
    image?: string;
    url?: string | null;   // <-- IMPORTANT FIX
    type?: string;
    author?: string;
    // schema?: any;
    schema?: Record<string, any> | null;
}

const SEOHead: React.FC<SEOHeadProps> = ({
    title = "Olusegun Ibraheem - Senior Software Engineer | Full Stack Developer",
    description = "Senior Software Engineer specializing in Laravel, React, AWS, and modern DevOps...",
    keywords = "software engineer, full stack developer...",
    image = "/images/og-image.png",
    url = null,
    type = "website",
    author = "Olusegun Ibraheem",
    schema = null
}) => {

    const siteUrl = typeof window !== 'undefined' ? window.location.origin : 'https://yourdomain.com';
    const currentUrl = url || (typeof window !== 'undefined' ? window.location.href : siteUrl);
    const imageUrl = image.startsWith('http') ? image : `${siteUrl}${image}`;

    // Default structured data
    const defaultSchema = {
        "@context": "https://schema.org",
        "@type": "Person",
        "name": "Olusegun Ibraheem",
        "jobTitle": "Senior Software Engineer",
        "description": description,
        "url": siteUrl,
        "image": imageUrl,
        "email": "codesultan369@gmail.com",
        "telephone": "+234-813-796-2936",
        "address": {
            "@type": "PostalAddress",
            "addressLocality": "Lagos",
            "addressRegion": "Yaba",
            "addressCountry": "Nigeria"
        },
        "alumniOf": [
            {
                "@type": "EducationalOrganization",
                "name": "The Chartered Institute of IT (BCS)",
                "location": "London, UK"
            },
            {
                "@type": "EducationalOrganization",
                "name": "Osun State University",
                "location": "Osogbo, Nigeria"
            }
        ],
        "knowsAbout": [
            "Software Engineering",
            "Full Stack Development",
            "Laravel",
            "React",
            "Vue.js",
            "Node.js",
            "Python",
            "AWS",
            "Docker",
            "DevOps",
            "API Development",
            "Database Design",
            "Agile Methodologies"
        ],
        "sameAs": [
            "https://github.com/codedsultan",
            "https://linkedin.com/in/codesultan"
        ],
        "worksFor": {
            "@type": "Organization",
            "name": "Tech1m",
            "address": {
                "@type": "PostalAddress",
                "addressLocality": "Lagos",
                "addressCountry": "Nigeria"
            }
        }
    };

    const schemaData = schema || defaultSchema;

    return (
        <Head>
            {/* Primary Meta Tags */}
            <title>{title}</title>
            <meta name="title" content={title} />
            <meta name="description" content={description} />
            <meta name="keywords" content={keywords} />
            <meta name="author" content={author} />
            <meta name="robots" content="index, follow" />
            <meta name="language" content="English" />
            <meta name="revisit-after" content="7 days" />

            {/* Canonical URL */}
            <link rel="canonical" href={currentUrl} />

            {/* Open Graph / Facebook */}
            <meta property="og:type" content={type} />
            <meta property="og:url" content={currentUrl} />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={imageUrl} />
            <meta property="og:image:width" content="1200" />
            <meta property="og:image:height" content="630" />
            <meta property="og:locale" content="en_US" />
            <meta property="og:site_name" content="Olusegun Ibraheem Portfolio" />

            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:url" content={currentUrl} />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={imageUrl} />
            <meta name="twitter:creator" content="@codesultan" />

            {/* Additional Meta Tags */}
            <meta name="theme-color" content="#F53003" />
            <meta name="msapplication-TileColor" content="#F53003" />

            {/* Geo Tags */}
            <meta name="geo.region" content="NG-LA" />
            <meta name="geo.placename" content="Lagos" />
            <meta name="geo.position" content="6.5244;3.3792" />
            <meta name="ICBM" content="6.5244, 3.3792" />

            {/* Structured Data / JSON-LD */}
            <script type="application/ld+json">
                {JSON.stringify(schemaData)}
            </script>
        </Head>
    );
};

export default SEOHead;
