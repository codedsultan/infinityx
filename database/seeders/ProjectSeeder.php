<?php

namespace Database\Seeders;

use App\Models\Project;
use Illuminate\Database\Seeder;

class ProjectSeeder extends Seeder
{
    public function run(): void
    {

        Project::truncate();
        $projects = [
            [
                'title' => 'Enterprise API Gateway',
                'slug' => 'enterprise-api-gateway',
                'description' => 'Scalable microservices architecture with Docker containerization and CI/CD pipeline automation for seamless deployments',
                'full_description' => 'Built a comprehensive API gateway handling over 100,000+ requests daily. Implemented OAuth2 authentication, rate limiting, request transformation, and service mesh integration. The system handles multiple microservices with automatic service discovery and load balancing. Deployed on AWS with auto-scaling capabilities and comprehensive monitoring through CloudWatch and Grafana.',
                'technologies' => ['Laravel', 'Docker', 'AWS EC2', 'PostgreSQL', 'Redis', 'GitHub Actions', 'Nginx'],
                'category' => 'backend',
                // 'featured_image' => 'projects/api-gateway.jpg',
                'featured_image' => null,
                'gallery_images' => ['projects/api-gateway-1.jpg', 'projects/api-gateway-2.jpg'],
                'github_url' => 'https://github.com/codedsultan/api-gateway',
                'live_url' => null,
                'is_featured' => true,
                'order' => 1,
                'completion_date' => '2024-03-15',
            ],
            [
                'title' => 'Real-time Analytics Dashboard',
                'slug' => 'realtime-analytics-dashboard',
                'description' => 'Interactive admin dashboard with live data visualization, real-time updates using WebSockets, and comprehensive reporting features',
                'full_description' => 'Developed a full-featured analytics dashboard for monitoring business KPIs in real-time. Features include customizable widgets, drag-and-drop interface, export to PDF/Excel, user role management, and advanced filtering. Integrated with multiple data sources and provides real-time updates via Laravel Echo and Pusher. Built with React and Recharts for smooth, interactive visualizations.',
                'technologies' => ['React', 'Inertia.js', 'Laravel', 'MongoDB', 'Redis', 'Pusher', 'Tailwind CSS'],
                'category' => 'fullstack',
                // 'featured_image' => 'projects/dashboard.jpg',
                'featured_image' => null,
                'gallery_images' => ['projects/dashboard-1.jpg', 'projects/dashboard-2.jpg', 'projects/dashboard-3.jpg'],
                'github_url' => 'https://github.com/codedsultan/analytics-dashboard',
                'live_url' => 'https://demo.analytics-dashboard.com',
                'is_featured' => true,
                'order' => 2,
                'completion_date' => '2023-11-20',
            ],
            [
                'title' => 'Payment Integration Platform',
                'slug' => 'payment-integration-platform',
                'description' => 'Multi-gateway payment processing system with webhook management, subscription billing, and fraud detection',
                'full_description' => 'Created a unified payment platform supporting multiple payment gateways including Stripe, Paystack, and Flutterwave. Handles one-time payments, recurring subscriptions, refunds, and chargebacks. Implemented webhook verification, payment reconciliation, and comprehensive reporting. Features include PCI compliance, fraud detection rules, and automatic retry logic for failed payments.',
                'technologies' => ['FastAPI', 'Python', 'Redis', 'PostgreSQL', 'Celery', 'Docker', 'Stripe API'],
                'category' => 'backend',
                // 'featured_image' => 'projects/payment-platform.jpg',
                'featured_image' => null,
                'gallery_images' => ['projects/payment-1.jpg', 'projects/payment-2.jpg'],
                'github_url' => 'https://github.com/codedsultan/payment-platform',
                'live_url' => null,
                'is_featured' => true,
                'order' => 3,
                'completion_date' => '2024-01-10',
            ],
            [
                'title' => 'E-commerce Solution',
                'slug' => 'ecommerce-solution',
                'description' => 'Full-featured online store with inventory management, order tracking, customer accounts, and admin panel',
                'full_description' => 'Built a complete e-commerce platform from scratch with product catalog, shopping cart, checkout process, and order management. Features include inventory tracking, customer reviews, wishlist, coupon codes, and email notifications. Admin panel allows product management, order processing, customer management, and sales analytics. Integrated with multiple payment gateways and shipping providers.',
                'technologies' => ['Vue.js', 'Laravel', 'MySQL', 'Stripe', 'AWS S3', 'Algolia', 'Tailwind CSS'],
                'category' => 'fullstack',
                // 'featured_image' => 'projects/ecommerce.jpg',
                'featured_image' => null,
                'gallery_images' => ['projects/ecommerce-1.jpg', 'projects/ecommerce-2.jpg', 'projects/ecommerce-3.jpg'],
                'github_url' => 'https://github.com/codedsultan/ecommerce-platform',
                'live_url' => 'https://demo.ecommerce-platform.com',
                'is_featured' => true,
                'order' => 4,
                'completion_date' => '2023-08-25',
            ],
            [
                'title' => 'Multi-tenant SaaS Platform',
                'slug' => 'multitenant-saas-platform',
                'description' => 'Scalable SaaS application with tenant isolation, subscription management, and API access',
                'full_description' => 'Architected a multi-tenant SaaS platform supporting thousands of organizations with complete data isolation. Implemented tenant onboarding, subscription tiers, usage tracking, and billing automation. Features include custom domain support, white-labeling, API rate limiting per tenant, and comprehensive audit logging. Built with Laravel Tenancy package and deployed on AWS with RDS multi-tenant database architecture.',
                'technologies' => ['Laravel', 'MySQL', 'AWS RDS', 'Redis', 'Vue.js', 'Stripe', 'CloudFlare'],
                'category' => 'fullstack',
                // 'featured_image' => 'projects/saas-platform.jpg',
                'featured_image' => null,
                'gallery_images' => ['projects/saas-1.jpg', 'projects/saas-2.jpg'],
                'github_url' => null,
                'live_url' => 'https://platform.example.com',
                'is_featured' => false,
                'order' => 5,
                'completion_date' => '2023-06-30',
            ],
            [
                'title' => 'Healthcare Appointment System',
                'slug' => 'healthcare-appointment-system',
                'description' => 'Patient management system with online booking, video consultations, and medical records',
                'full_description' => 'Developed a HIPAA-compliant healthcare management system enabling patients to book appointments, access medical records, and conduct video consultations. Features include doctor availability management, appointment reminders via SMS/email, prescription management, and billing integration. Implemented role-based access control for doctors, nurses, and administrative staff.',
                'technologies' => ['Laravel', 'Vue.js', 'MySQL', 'Twilio', 'AWS', 'WebRTC', 'Bootstrap'],
                'category' => 'fullstack',
                // 'featured_image' => 'projects/healthcare.jpg',
                'featured_image' => null,
                'gallery_images' => ['projects/healthcare-1.jpg', 'projects/healthcare-2.jpg'],
                'github_url' => null,
                'live_url' => null,
                'is_featured' => false,
                'order' => 6,
                'completion_date' => '2023-04-15',
            ],
        ];

        foreach ($projects as $project) {
            Project::create($project);
        }
    }
}
