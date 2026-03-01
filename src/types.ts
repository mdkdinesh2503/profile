export type ExperienceRole = {
  title: string;
  employmentType: string;
  timeframe: string;
};

export type ExperienceItem = {
  company: string;
  logo?: string;
  location?: string;
  domains?: string[];
  title?: string;
  startDate: string;
  endDate?: string | null;
  timeframe?: string;
  summary?: string;
  roles?: ExperienceRole[];
  outcomes: string[];
};

export type SkillGroup = {
  group: "Frontend" | "Backend" | "Data" | "Infra" | "Tools";
  items: string[];
};

export type ExperienceSectionHeading = {
  eyebrow: string;
  title: string;
  description: string;
};

export type BlogMeta = {
  slug: string;
  title: string;
  date: string;
  summary: string;
  tags: string[];
  image?: string;
  readTime?: number;
};

export type Blog = BlogMeta & {
  content: string;
};

/** Project category for Selected Work sections */
export type ProjectCategory = "real-time" | "academic" | "self-learn";

/** Markdown-based project (content/projects/real-time/*.md or content/projects/academic-self-learn/*.md), same pattern as blogs */
export type ProjectPostMeta = {
  slug: string;
  name: string;
  summary: string;
  /** Optional: e.g. "Backend Engineer" (omit for learning projects) */
  role?: string;
  /** Optional: e.g. "4 weeks • 2024" (omit for learning projects) */
  timeline?: string;
  category: ProjectCategory;
  context?: string;
  stackNote?: string;
  image?: string;
  tags: string[];
  /** Live demo URL (used for academic/self-learn: "View" link) */
  demoUrl?: string;
  /** GitHub/repo URL (used for academic/self-learn: "Code" link) */
  repoUrl?: string;
  /** Year worked (e.g. "2024") */
  year?: string;
  /** Tech used for the demo / View link (e.g. "HTML, CSS, JS") */
  demoStack?: string;
  /** Tech used for the original repo / Code link (e.g. "Angular") */
  originalStack?: string;
};

export type ProjectPost = ProjectPostMeta & {
  content: string;
};

export type Certification = {
  name: string;
  issuer: string;
  year: string;
  thumbnail: string;
  pdf: string;
  verifyLink?: string;
};

export type PrimaryCta = {
  label: string;
  href: string;
};

export type HowICanHelpCard = {
  title: string;
  body: string;
};

export type HowICanHelp = {
  cards: HowICanHelpCard[];
};

export type ProfileLinks = {
  github: string;
  linkedin: string;
  instagram?: string;
};

export type Hero = {
  headline: string;
  subhead: string;
  initials?: string;
  technologiesLabel: string;
  yearsExperience?: string;
};

export type SelectedSectionHeading = {
  eyebrow: string;
  title: string;
  description: string;
};

export type Resume = {
  pdfSrc: string;
  pdfTitle: string;
};

export type Profile = {
  name: string;
  role: string;
  location: string;
  phone: string;
  email: string;
  avatar?: string;
  primaryCta: PrimaryCta;
  hero: Hero;
  howICanHelp: HowICanHelp;
  links: ProfileLinks;
  certifications: Certification[];
  resume: Resume;
};