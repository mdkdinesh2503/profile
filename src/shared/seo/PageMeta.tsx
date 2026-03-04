import { Helmet } from "react-helmet-async";
import { absolutePath } from "@/config/site";

type PageMetaProps = {
  title: string;
  description: string;
  path: string;
  ogType?: "website" | "article" | "profile";
};

export function PageMeta({
  title,
  description,
  path,
  ogType = "website",
}: PageMetaProps) {
  const url = absolutePath(path);
  const fullTitle = title.includes("Dinesh") ? title : `${title} | Dinesh Kumar M`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={ogType} />
    </Helmet>
  );
}
