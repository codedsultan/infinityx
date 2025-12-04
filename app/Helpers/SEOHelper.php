<?php

namespace App\Helpers;

class SEOHelper
{
    /**
     * Generate project schema for structured data
     */
    public static function generateProjectSchema($project, $siteUrl)
    {
        return [
            "@context" => "https://schema.org",
            "@type" => "SoftwareApplication",
            "name" => $project->title,
            "description" => $project->description,
            "url" => $project->live_url,
            "image" => $project->featured_image ? asset('storage/' . $project->featured_image) : null,
            "applicationCategory" => "DeveloperApplication",
            "operatingSystem" => "Web",
            "author" => [
                "@type" => "Person",
                "name" => "Olusegun Ibraheem",
                "url" => $siteUrl,
                "email" => "codesultan369@gmail.com"
            ],
            "programmingLanguage" => self::extractLanguages($project->technologies),
            "sourceCode" => $project->github_url,
            "dateCreated" => $project->created_at->toIso8601String(),
            "dateModified" => $project->updated_at->toIso8601String(),
        ];
    }

    /**
     * Generate breadcrumb schema
     */
    public static function generateBreadcrumbSchema($items, $siteUrl)
    {
        $listItems = [];

        foreach ($items as $index => $item) {
            $listItems[] = [
                "@type" => "ListItem",
                "position" => $index + 1,
                "name" => $item['name'],
                "item" => $siteUrl . $item['url']
            ];
        }

        return [
            "@context" => "https://schema.org",
            "@type" => "BreadcrumbList",
            "itemListElement" => $listItems
        ];
    }

    /**
     * Generate website schema
     */
    public static function generateWebsiteSchema($siteUrl)
    {
        return [
            "@context" => "https://schema.org",
            "@type" => "WebSite",
            "name" => "Olusegun Ibraheem Portfolio",
            "description" => "Portfolio and professional website of Olusegun Ibraheem, Senior Software Engineer",
            "url" => $siteUrl,
            "author" => [
                "@type" => "Person",
                "name" => "Olusegun Ibraheem"
            ],
            "potentialAction" => [
                "@type" => "SearchAction",
                "target" => [
                    "@type" => "EntryPoint",
                    "urlTemplate" => $siteUrl . "/projects?search={search_term_string}"
                ],
                "query-input" => "required name=search_term_string"
            ]
        ];
    }

    /**
     * Generate organization schema
     */
    public static function generateOrganizationSchema($siteUrl)
    {
        return [
            "@context" => "https://schema.org",
            "@type" => "ProfilePage",
            "mainEntity" => [
                "@type" => "Person",
                "name" => "Olusegun Ibraheem",
                "alternateName" => "CodeSultan",
                "description" => "Senior Software Engineer with 7+ years of experience in full-stack development, cloud architecture, and DevOps.",
                "image" => asset('storage/profile/olusegun.jpg'),
                "url" => $siteUrl,
                "sameAs" => [
                    "https://github.com/codedsultan",
                    "https://linkedin.com/in/codesultan"
                ],
                "jobTitle" => "Senior Software Engineer",
                "worksFor" => [
                    "@type" => "Organization",
                    "name" => "Tech1m",
                    "address" => [
                        "@type" => "PostalAddress",
                        "addressLocality" => "Lagos",
                        "addressCountry" => "Nigeria"
                    ]
                ]
            ]
        ];
    }

    /**
     * Generate portfolio collection schema
     */
    public static function generatePortfolioSchema($projects, $siteUrl)
    {
        $workExamples = $projects->map(function ($project) use ($siteUrl) {
            return [
                "@type" => "CreativeWork",
                "name" => $project->title,
                "description" => $project->description,
                "url" => $project->live_url ?? $siteUrl . '/projects/' . $project->slug,
                "image" => $project->featured_image ? asset('storage/' . $project->featured_image) : null,
                "dateCreated" => $project->completion_date?->toIso8601String(),
            ];
        })->toArray();

        return [
            "@context" => "https://schema.org",
            "@type" => "CollectionPage",
            "name" => "Portfolio Projects",
            "description" => "A collection of software projects and applications developed by Olusegun Ibraheem",
            "url" => $siteUrl . "/#projects",
            "hasPart" => $workExamples
        ];
    }

    /**
     * Extract programming languages from technologies
     */
    private static function extractLanguages($technologies)
    {
        $languages = ['PHP', 'JavaScript', 'Python', 'Go', 'TypeScript'];

        return array_values(array_intersect($technologies, $languages));
    }

    /**
     * Generate meta description from text
     */
    public static function generateMetaDescription($text, $maxLength = 160)
    {
        $text = strip_tags($text);
        $text = preg_replace('/\s+/', ' ', $text);
        $text = trim($text);

        if (strlen($text) <= $maxLength) {
            return $text;
        }

        $text = substr($text, 0, $maxLength);
        $lastSpace = strrpos($text, ' ');

        if ($lastSpace !== false) {
            $text = substr($text, 0, $lastSpace);
        }

        return $text . '...';
    }

    /**
     * Generate keywords from text
     */
    public static function generateKeywords($technologies, $category)
    {
        $baseKeywords = [
            'software engineer',
            'full stack developer',
            'Lagos Nigeria',
            'portfolio',
            'web development'
        ];

        $categoryKeywords = [
            'backend' => ['backend developer', 'API development', 'server-side'],
            'frontend' => ['frontend developer', 'UI/UX', 'responsive design'],
            'fullstack' => ['full stack', 'end-to-end development', 'MERN stack', 'LAMP stack']
        ];

        $keywords = array_merge(
            $baseKeywords,
            $technologies,
            $categoryKeywords[$category] ?? []
        );

        return implode(', ', array_unique($keywords));
    }
}
