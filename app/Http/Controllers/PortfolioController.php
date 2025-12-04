<?php

namespace App\Http\Controllers;

use App\Helpers\SEOHelper;
use App\Models\Project;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Symfony\Component\HttpFoundation\BinaryFileResponse;

class PortfolioController extends Controller
{
    /**
     * Display the portfolio homepage
     */
    public function index(): Response
    {
        $siteUrl = url('/');

        $rawProjects = Project::where('is_featured', true)
            ->orderBy('order', 'asc')
            ->get();

        $projects = $rawProjects->map(function ($project) {
            return [
                'id' => $project->id,
                'title' => $project->title,
                'slug' => $project->slug,
                'description' => $project->description,
                'tech' => $project->technologies,
                'category' => $project->category,
                'image' => $project->featured_image ? asset('storage/' . $project->featured_image) : null,
                'github_url' => $project->github_url,
                'live_url' => $project->live_url,
            ];
        });

        $experiences = [
            [
                'company' => 'Tech1M',
                'role' => 'Senior Software Engineer',
                'location' => 'Lagos, Nigeria',
                'period' => 'October 2022 - Present',
                'achievements' => [
                    'Architected and deployed scalable APIs across AWS, Cloudways and VPS infrastructures',
                    'Led CI/CD automation using GitHub Actions, Docker and Ansible',
                    'Optimised SQL/NoSQL databases, enforced security/TDD standards',
                    'Mentored engineers through code reviews and pair programming',
                    'Drove Agile delivery across multiple projects'
                ]
            ],
            [
                'company' => 'Tedbree',
                'role' => 'Fullstack Engineer',
                'location' => 'Lagos, Nigeria',
                'period' => 'April 2021 - October 2022',
                'achievements' => [
                    'Designed and built scalable REST APIs using Laravel, FastAPI, and Node.js',
                    'Orchestrated integrations with payment gateways, geolocation, SSO, social auth',
                    'Developed interactive admin dashboards using Inertia.js, Laravel, Vue.js, and React.js',
                    'Engineered custom WordPress themes and plugins',
                    'Improved database performance through query optimization and indexing'
                ]
            ],
            [
                'company' => 'Veci Technologies',
                'role' => 'Web Developer',
                'location' => 'Ibadan, Nigeria',
                'period' => 'September 2017 - March 2021',
                'achievements' => [
                    'Delivered dynamic and static websites using CodeIgniter, Laravel, PHP',
                    'Developed custom WordPress themes/plugins',
                    'Designed relational databases and managed hosting environments',
                    'Deployed websites via cPanel and FTP'
                ]
            ]
        ];

        $skills = [
            'languages' => ['PHP', 'JavaScript', 'Python', 'Go'],
            'backend' => ['Laravel', 'Node.js', 'FastAPI', 'Express.js'],
            'frontend' => ['React', 'Vue.js', 'Inertia.js', 'Tailwind CSS'],
            'databases' => ['MySQL', 'PostgreSQL', 'MongoDB', 'Firebase'],
            'devops' => ['AWS (EC2, RDS)', 'Docker', 'CI/CD', 'Ansible', 'Cloudways']
        ];

        return Inertia::render('welcome', [
            'projects' => $projects,
            'experiences' => $experiences,
            'skills' => $skills,
            'profileImage' => asset('storage/profile/codesultan/olusegun-ibraheem.jpg'),
            'contactInfo' => [
                'email' => 'codesultan369@gmail.com',
                'phone' => '+234-813-796-2936',
                'location' => 'Yaba, Lagos, Nigeria',
                'github' => 'https://github.com/codedsultan',
                'linkedin' => 'https://linkedin.com/in/codesultan',
            ],
            'seo' => [
                'title' => 'Olusegun Ibraheem - Senior Software Engineer | Full Stack Developer',
                'description' => 'Senior Software Engineer with 7+ years of experience building scalable web applications using Laravel, React, AWS, and modern DevOps practices. Based in Lagos, Nigeria.',
                'keywords' => 'software engineer, full stack developer, Laravel, React, AWS, DevOps, Lagos Nigeria, backend engineer, API development',
                'image' => asset('images/og-image.jpg'),
                'url' => $siteUrl,
                'schemas' => [
                    'person' => SEOHelper::generateOrganizationSchema($siteUrl),
                    'website' => SEOHelper::generateWebsiteSchema($siteUrl),
                    'portfolio' => SEOHelper::generatePortfolioSchema($rawProjects, $siteUrl),

                ]
            ]
        ]);
    }

    /**
     * Download CV
     */
    public function downloadCV(): BinaryFileResponse
    {
        $filePath = storage_path('app/public/cv/codesultan/Olusegun_Ibraheem_CV.pdf');

        if (!file_exists($filePath)) {
            abort(404, 'CV not found');
        }

        return response()->download(
            $filePath,
            'Olusegun_Ibraheem_Software_Engineer_CV.pdf',
            [
                'Content-Type' => 'application/pdf',
            ]
        );
    }
}
