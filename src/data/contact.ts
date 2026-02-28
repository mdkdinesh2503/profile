export const contactData = {
  emailSubject: "Portfolio inquiry",
  reachMe: {
    title: "Reach me",
    description: "Email is best; for anything urgent, call or message.",
  },

  connect: {
    label: "Connect",
  },

  whatHelps: {
    title: "What helps",
    description: "Context that makes our conversation more useful",
    items: [
      "Role and team context (product stage, constraints, timelines)",
      "What you need most: shipping, reliability, performance, migrations",
      "Interview process and what success looks like in 90 days",
    ],
  },
} as const;

export type ContactData = typeof contactData;