<?php

namespace App\Http\Controllers;

use App\Models\Project;
use Illuminate\Http\Response;

class SitemapController extends Controller
{
    /**
     * Generate XML sitemap
     */
    public function index(): Response
    {
        $siteUrl = url('/');

        // Static pages
        $staticPages = [
            ['url' => $siteUrl, 'priority' => '1.0', 'changefreq' => 'weekly'],
            ['url' => $siteUrl . '/#about', 'priority' => '0.8', 'changefreq' => 'monthly'],
            ['url' => $siteUrl . '/#skills', 'priority' => '0.8', 'changefreq' => 'monthly'],
            ['url' => $siteUrl . '/#experience', 'priority' => '0.8', 'changefreq' => 'monthly'],
            ['url' => $siteUrl . '/#projects', 'priority' => '0.9', 'changefreq' => 'weekly'],
            ['url' => $siteUrl . '/#contact', 'priority' => '0.7', 'changefreq' => 'yearly'],
        ];

        // Dynamic project pages (if you create individual project pages)
        $projects = Project::where('is_featured', true)->get();
        $projectPages = $projects->map(function ($project) use ($siteUrl) {
            return [
                'url' => $siteUrl . '/projects/' . $project->slug,
                'priority' => '0.7',
                'changefreq' => 'monthly',
                'lastmod' => $project->updated_at->toAtomString(),
            ];
        });

        $allPages = array_merge($staticPages, $projectPages->toArray());

        $sitemap = view('sitemap', ['pages' => $allPages])->render();

        return response($sitemap, 200)
            ->header('Content-Type', 'text/xml');
    }

    /**
     * Generate robots.txt
     */
    public function robots(): Response
    {
        $siteUrl = url('/');

        $content = "User-agent: *\n";
        $content .= "Allow: /\n";
        $content .= "Disallow: /admin\n";
        $content .= "Disallow: /admin/*\n\n";
        $content .= "Sitemap: {$siteUrl}/sitemap.xml\n";

        return response($content, 200)
            ->header('Content-Type', 'text/plain');
    }
}
