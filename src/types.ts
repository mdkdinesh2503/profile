export type Project = {
  slug: string;
  name: string;
  summary: string;
  role: string;
  timeline: string;
  context: string;
  outcome: string;
  stackNote?: string;
  caseStudy: {
    problem: string;
    constraints: string[];
    approach: { title: string; details: string }[];
    highlights: string[];
    impact: string[];
    learned?: string[];
  };
};

export type ProjectCaseStudy = {
  slug: string;
  title: string;
  context: string;
  role: string;
  decisions: { title: string; tradeoff: string; result: string }[];
  outcomes: string[];
};

export type ExperienceRole = {
  title: string;
  employmentType: string;
  timeframe: string;
};

export type ExperienceItem = {
  company: string;
  logo?: string;
  location?: string;
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
};

export type Blog = BlogMeta & {
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