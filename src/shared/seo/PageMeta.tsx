import { Helmet } from "react-helmet-async";
import { absolutePath, SITE_URL } from "@/config/site";
import { profile } from "@/data/profile";

type PageMetaProps = {
  title: string;
  description: string;
  path: string;
  ogType?: "website" | "article" | "profile";
  keywords?: string[];
  image?: string;
};

export function PageMeta({
  title,
  description,
  path,
  ogType = "website",
  keywords,
  image,
}: PageMetaProps) {
  const url = absolutePath(path);

  // SEO-optimized title formatting targeting "MDK Dinesh", "Dinesh Kumar M", "Dinesh Kumar"
  const fullTitle =
    path === "/" || path === ""
      ? "Dinesh Kumar M | Software Engineer"
      : title.includes("Dinesh")
      ? title
      : `${title} | Dinesh Kumar M`;

  const defaultImage = absolutePath(image || profile.avatar || "/profile/mdk.png");

  // Comprehensive keywords list specifically designed to rank for search queries
  const allKeywords = [
    "MDK Dinesh",
    "mdkdinesh",
    "mdkdinesh2503",
    "Dinesh Kumar",
    "Dinesh Kumar M",
    "Dinesh Kumar Namakkal",
    "Dinesh Kumar Software Engineer",
    "Dinesh Kumar Backend Developer",
    "Dinesh Kumar Portfolio",
    "Java Spring Boot Developer Dinesh",
    "Rust Backend Engineer Dinesh Kumar",
    "Software Engineer Tamil Nadu",
    ...(keywords || []),
  ].join(", ");

  // Schema.org Person & WebPage structured data graph for Google Knowledge Graph
  const schemaOrgJSONLD = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": `${SITE_URL}#person`,
        "name": "Dinesh Kumar M",
        "alternateName": [
          "MDK Dinesh",
          "mdkdinesh",
          "mdkdinesh2503",
          "Dinesh Kumar",
          "MDK",
          "Dinesh M"
        ],
        "givenName": "Dinesh",
        "familyName": "Kumar M",
        "url": SITE_URL,
        "image": defaultImage,
        "jobTitle": profile.role,
        "worksFor": {
          "@type": "Organization",
          "name": "Aretedge"
        },
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Namakkal",
          "addressRegion": "Tamil Nadu",
          "addressCountry": "India"
        },
        "email": profile.email,
        "telephone": profile.phone,
        "sameAs": [
          profile.links.github,
          profile.links.linkedin,
          "https://github.com/mdkdinesh2503",
          "https://www.linkedin.com/in/mdkdinesh2503"
        ],
        "knowsAbout": [
          "Java",
          "Spring Boot",
          "Rust",
          "Axum",
          "PostgreSQL",
          "Redis",
          "Microservices",
          "Distributed Systems",
          "Docker",
          "AWS",
          "REST APIs",
          "GraphQL",
          "gRPC",
          "TypeScript",
          "Next.js"
        ],
        "alumniOf": {
          "@type": "EducationalOrganization",
          "name": "K.S.R. College of Engineering"
        }
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}#website`,
        "url": SITE_URL,
        "name": "Dinesh Kumar M - Official Portfolio",
        "description": "Official software engineering portfolio of Dinesh Kumar M specializing in backend systems, distributed architecture, Java, Spring Boot, and Rust.",
        "publisher": {
          "@id": `${SITE_URL}#person`
        }
      },
      {
        "@type": "WebPage",
        "@id": `${url}#webpage`,
        "url": url,
        "name": fullTitle,
        "description": description,
        "isPartOf": {
          "@id": `${SITE_URL}#website`
        },
        "about": {
          "@id": `${SITE_URL}#person`
        }
      }
    ]
  };

  return (
    <Helmet>
      {/* Primary HTML Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={description} />
      <meta name="keywords" content={allKeywords} />
      <meta name="author" content="Dinesh Kumar M" />
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      <meta name="googlebot" content="index, follow, max-snippet:-1, max-image-preview:large" />
      <link rel="canonical" href={url} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={url} />
      <meta property="og:site_name" content="Dinesh Kumar M Portfolio" />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={defaultImage} />
      <meta property="og:image:alt" content="Dinesh Kumar M - Software Engineer" />
      <meta property="profile:first_name" content="Dinesh" />
      <meta property="profile:last_name" content="Kumar M" />
      <meta property="profile:username" content="mdkdinesh2503" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={defaultImage} />

      {/* Google Knowledge Graph / JSON-LD Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(schemaOrgJSONLD)}
      </script>
    </Helmet>
  );
}
