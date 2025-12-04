// ======================
// CONTACTS
// ======================
export interface ContactSummary {
  id: number;
  name: string;
  email: string;
  message: string;
  is_read: boolean;
  is_replied: boolean;
  created_at: string;
  created_at_human: string;
}

export interface ContactDetail {
  id: number;
  name: string;
  email: string;
  message: string;
  ip_address: string | null;
  user_agent: string | null;
  is_read: boolean;
  is_replied: boolean;
  read_at: string | null;
  replied_at: string | null;
  created_at: string;
}

export interface ContactsPagination {
  data: ContactSummary[];
  links: {
    url: string | null;
    label: string;
    active: boolean;
  }[];
}

export interface ContactStats {
  total: number;
  unread: number;
  unreplied: number;
  today: number;
}

export interface ContactFilters {
  search?: string;
  status?: string;
}

// ======================
// PROJECTS
// ======================
export interface ProjectSummary {
  id: number;
  title: string;
  slug: string;
  description: string;
  category: 'backend' | 'frontend' | 'fullstack';
  technologies: string[];
  is_featured: boolean;
  order: number;
  featured_image: string | null;
  github_url: string | null;
  live_url: string | null;
  created_at: string;
}

export interface ProjectDetail {
  id: number;
  title: string;
  slug: string;
  description: string;
  full_description: string | null;
  category: 'backend' | 'frontend' | 'fullstack';
  technologies: string[];
  featured_image: string | null;
  gallery_images: string[];
  github_url: string | null;
  live_url: string | null;
  is_featured: boolean;
  completion_date: string | null;
}

export interface ProjectsPagination {
  data: ProjectSummary[];
  links: {
    url: string | null;
    label: string;
    active: boolean;
  }[];
}

export interface ProjectFilters {
  search?: string;
  category?: string;
  featured?: string;
}

// ======================
// DASHBOARD
// ======================
export interface DashboardStats {
  total_projects: number;
  featured_projects: number;
  total_contacts: number;
  unread_contacts: number;
  unreplied_contacts: number;
}

export interface DashboardProject {
  id: number;
  title: string;
  category: string;
  is_featured: boolean;
  created_at: string;
}

export interface DashboardContact {
  id: number;
  name: string;
  email: string;
  message: string;
  is_read: boolean;
  is_replied: boolean;
  created_at: string;
}

export interface DashboardCategoryCount {
  backend: number;
  frontend: number;
  fullstack: number;
}

export interface DashboardTrendPoint {
  date: string;
  count: number;
}
