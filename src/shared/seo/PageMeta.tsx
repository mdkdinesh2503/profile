import { Helmet } from "react-helmet-async";
import { absolutePath, SITE_URL, GOOGLE_SITE_VERIFICATION } from "@/config/site";
import { profile } from "@/data/profile";

type PageMetaProps = {
  title: string;
  description: string;
  path: string;
  ogType?: "website" | "article" | "profile";
  keywords?: string[];
  image?: string;
  noindex?: boolean;
};

export function PageMeta({
  title,
  description,
  path,
  ogType = "website",
  keywords,
  image,
  noindex = false,
}: PageMetaProps) {
  const url = absolutePath(path);

  // Natural branding format for backend engineer positioning
  const fullTitle =
    path === "/" || path === ""
      ? "Dinesh Kumar M | Backend-focused Software Engineer"
      : title.includes("Dinesh Kumar M")
      ? title
      : `${title} | Dinesh Kumar M`;

  // Standard Open Graph image URL
  const defaultImage = absolutePath(image || "/profile/mdk_3.png");

  // Authentically curated search keywords
  const allKeywords = [
    "Dinesh Kumar M",
    "Dinesh Kumar",
    "MDK Dinesh",
    "MDKDinesh2503",
    "Backend-focused Software Engineer",
    "Software Engineer",
    "Backend Engineer",
    "Java Spring Boot Developer",
    "Rust Backend Engineer",
    "Distributed Systems",
    "PostgreSQL",
    "Redis",
    "Microservices",
    ...(keywords || []),
  ].join(", ");

  // Schema.org Structured Data graph (Person, WebSite, WebPage / ProfilePage / Article)
  const schemaOrgGraph: Record<string, unknown>[] = [
    {
      "@type": "Person",
      "@id": `${SITE_URL}/#person`,
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
      "url": `${SITE_URL}/`,
      "image": absolutePath("/profile/mdk_3.png"),
      "jobTitle": "Backend-focused Software Engineer",
      "worksFor": {
        "@type": "Organization",
        "name": "Aretedge Technologies"
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
        "MySQL",
        "Redis",
        "DynamoDB",
        "Microservices",
        "Distributed Systems",
        "Docker",
        "AWS",
        "REST APIs",
        "GraphQL",
        "gRPC",
        "Node.js",
        "NestJS",
        "React",
        "Next.js"
      ],
      "alumniOf": {
        "@type": "EducationalOrganization",
        "name": "K.S.R. College of Engineering"
      }
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      "url": `${SITE_URL}/`,
      "name": "Dinesh Kumar M - Software Engineer Portfolio",
      "description": "Official software engineering portfolio of Dinesh Kumar M – Backend-focused Software Engineer specializing in Java, Spring Boot, Rust, PostgreSQL, Redis, and Distributed Systems.",
      "publisher": {
        "@id": `${SITE_URL}/#person`
      }
    }
  ];

  if (ogType === "article") {
    schemaOrgGraph.push({
      "@type": "Article",
      "@id": `${url}#article`,
      "url": url,
      "headline": fullTitle,
      "description": description,
      "image": defaultImage,
      "author": {
        "@id": `${SITE_URL}/#person`
      },
      "publisher": {
        "@id": `${SITE_URL}/#person`
      },
      "mainEntityOfPage": url
    });
  } else {
    schemaOrgGraph.push({
      "@type": path === "/" ? "ProfilePage" : "WebPage",
      "@id": `${url}#webpage`,
      "url": url,
      "name": fullTitle,
      "description": description,
      "isPartOf": {
        "@id": `${SITE_URL}/#website`
      },
      "about": {
        "@id": `${SITE_URL}/#person`
      }
    });
  }

  const schemaOrgJSONLD = {
    "@context": "https://schema.org",
    "@graph": schemaOrgGraph
  };

  const robotsContent = noindex
    ? "noindex, nofollow"
    : "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1";

  return (
    <Helmet>
      {/* Primary HTML Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={description} />
      <meta name="keywords" content={allKeywords} />
      <meta name="author" content="Dinesh Kumar M" />
      <meta name="robots" content={robotsContent} />
      <meta name="googlebot" content={robotsContent} />
      <link rel="canonical" href={url} />

      {/* Google Search Console Verification tag (if provided via environment variable) */}
      {GOOGLE_SITE_VERIFICATION && (
        <meta name="google-site-verification" content={GOOGLE_SITE_VERIFICATION} />
      )}

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={url} />
      <meta property="og:site_name" content="Dinesh Kumar M | Software Engineer" />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={defaultImage} />
      <meta property="og:image:alt" content="Dinesh Kumar M - Backend-focused Software Engineer" />
      {ogType === "profile" && (
        <>
          <meta property="profile:first_name" content="Dinesh" />
          <meta property="profile:last_name" content="Kumar M" />
          <meta property="profile:username" content="mdkdinesh2503" />
        </>
      )}

      {/* Twitter / X Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={defaultImage} />
      <meta name="twitter:image:alt" content="Dinesh Kumar M - Backend-focused Software Engineer" />

      {/* Schema.org Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(schemaOrgJSONLD)}
      </script>
    </Helmet>
  );
}
