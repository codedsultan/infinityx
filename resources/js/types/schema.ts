// @/types/schema.ts (create this file)
export interface SchemaAddress {
  "@type": "PostalAddress";
  addressLocality: string;
  addressRegion?: string;
  addressCountry: string;
}

export interface SchemaOrganization {
  "@type": "Organization";
  name: string;
  address: SchemaAddress;
}

export interface SchemaEducationalOrg {
  "@type": "EducationalOrganization";
  name: string;
  location: string;
}

export interface SchemaListItem {
  "@type": "ListItem";
  position: number;
  name: string;
  item: string;
}

export interface SchemaPotentialAction {
  "@type": "SearchAction";
  target: {
    "@type": "EntryPoint";
    urlTemplate: string;
  };
  "query-input": string;
}

// Person Schema (for individuals)
export interface PersonSchema {
  "@context": "https://schema.org";
  "@type": "Person";
  name: string;
  jobTitle: string;
  description: string;
  url: string;
  image: string;
  email: string;
  telephone: string;
  address: SchemaAddress;
  alumniOf: SchemaEducationalOrg[];
  knowsAbout: string[];
  sameAs: string[];
  worksFor: SchemaOrganization;
}

// Website Schema
export interface WebsiteSchema {
  "@context": "https://schema.org";
  "@type": "WebSite";
  name: string;
  description: string;
  url: string;
  author: {
    "@type": "Person";
    name: string;
  };
  potentialAction: SchemaPotentialAction;
}

// Breadcrumb Schema
export interface BreadcrumbSchema {
  "@context": "https://schema.org";
  "@type": "BreadcrumbList";
  itemListElement: SchemaListItem[];
}

// Portfolio Schema
export interface PortfolioSchema {
  "@context": "https://schema.org";
  "@type": "CollectionPage";
  name: string;
  description: string;
  url: string;
  hasPart: Array<{
    "@type": "CreativeWork";
    name: string;
    description: string;
    url: string;
    image?: string;
    dateCreated?: string;
  }>;
}

// Software Application Schema (for projects)
export interface SoftwareApplicationSchema {
  "@context": "https://schema.org";
  "@type": "SoftwareApplication";
  name: string;
  description: string;
  url: string;
  image?: string;
  applicationCategory: string;
  operatingSystem: "Web";
  author: {
    "@type": "Person";
    name: string;
    url: string;
    email: string;
  };
  programmingLanguage: string[];
  sourceCode?: string;
  dateCreated: string;
  dateModified: string;
}

// Union type for all possible schemas
export type SchemaType =
  | PersonSchema
  | WebsiteSchema
  | BreadcrumbSchema
  | PortfolioSchema
  | SoftwareApplicationSchema;
