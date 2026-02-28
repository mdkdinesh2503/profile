import type { Project, ProjectCaseStudy } from "@/types";

function mapProjectToCaseStudy(p: Project): ProjectCaseStudy {
  return {
    slug: p.slug,
    title: p.name,
    context: p.context,
    role: p.role,
    decisions: p.caseStudy.approach.map((a) => ({
      title: a.title,
      tradeoff: "",
      result: a.details,
    })),
    outcomes: p.caseStudy.highlights,
  };
}

export const projects: Project[] = [
  {
    slug: "tournaments-challenges-rule-driven-flows",
    name: "Tournaments, Challenges & Rule-Driven Flows",
    summary:
      "Delivered core domain workflows for challenges, tournaments, and rule-driven flows with maintainable business logic and clear edge-case handling.",
    role: "Associate Software Engineer",
    timeline: "2024 — Present",
    context:
      "Product required robust workflows for challenges, tournaments, and rule-driven flows. Logic had to stay maintainable while handling many edge cases and integration points.",
    outcome:
      "Shipped core domain workflows with clear behavior, improved API design across gRPC/GraphQL/REST, and better performance via targeted caching and validation under production constraints.",
    stackNote: "Full-stack, gRPC, GraphQL, REST, Postgres, DynamoDB, Redis.",
    caseStudy: {
      problem:
        "Core domain (challenges, tournaments, rules) needed consistent behavior across clients and services while supporting different integration styles and strict correctness expectations.",
      constraints: [
        "Multiple API styles in use: gRPC for internal services, GraphQL and REST for clients—design had to fit each without duplicating business rules.",
        "Edge cases around tournament lifecycle, challenge eligibility, and rule evaluation had to be explicit and testable.",
        "Performance and correctness had to hold under real production load and data growth.",
      ],
      approach: [
        {
          title: "Centralize domain logic, expose via appropriate APIs",
          details:
            "Kept tournament, challenge, and rule-driven logic in a single domain layer and exposed it through gRPC, GraphQL, and REST depending on the consumer, so behavior stayed consistent and testable.",
        },
        {
          title: "Model rules and state transitions explicitly",
          details:
            "Defined clear state machines and rule evaluation paths so edge cases (eligibility, transitions, invalidation) were explicit and easier to reason about and test.",
        },
        {
          title: "Target caching and validation where it mattered",
          details:
            "Applied Redis caching and validation at boundaries to improve response times and ensure correctness under real production constraints without over-engineering.",
        },
      ],
      highlights: [
        "Delivered core domain workflows (challenges, tournaments, and rule-driven flows) with maintainable business logic and clear edge-case handling.",
        "Designed and implemented APIs across gRPC, GraphQL, and REST depending on the integration and client needs.",
        "Improved response times by applying targeted Redis caching and validating correctness under real production constraints.",
        "Worked across Postgres and DynamoDB persistence, including schema design and pragmatic data modeling for evolving requirements.",
      ],
      impact: [
        "Core workflows shipped with predictable behavior and fewer production surprises.",
        "Faster and more reliable APIs for clients and internal services.",
        "Solid foundation for future tournament and challenge features with clear rules and state.",
      ],
      learned: [
        "Domain logic belongs in one place; API shape can vary by consumer without duplicating rules.",
        "Explicit state and rule modeling pays off for correctness and debugging in production.",
      ],
    },
  },
  {
    slug: "billing-reliability-hardening",
    name: "Billing Reliability Hardening",
    summary:
      "Reduced failed payments and support escalations by making retries, reconciliation, and observability explicit.",
    role: "Full-Stack Engineer (Owner)",
    timeline: "6 weeks • 2025",
    context:
      "A subscription product with growing enterprise usage was seeing intermittent billing failures and unclear root causes.",
    outcome:
      "Improved payment success rate, shortened incident time-to-diagnosis, and established a safer change path for future billing work.",
    stackNote:
      "React (admin UI), Node APIs, Postgres, background workers, logging/metrics.",
    caseStudy: {
      problem:
        "Billing failures were handled inconsistently across the system: some retries lived in code, some in the payment provider, and reconciliation was mostly manual. Support couldn’t reliably answer “what happened” for a given invoice.",
      constraints: [
        "No full rewrite: billing was intertwined with legacy flows and external provider behavior.",
        "Data correctness mattered more than speed: changes needed safe rollout and strong auditability.",
        "Limited team bandwidth: improvements had to be incremental and operationally visible.",
      ],
      approach: [
        {
          title: "Make the billing state machine explicit",
          details:
            "Defined a small set of authoritative invoice states and transitions, and mapped legacy behaviors into those states to avoid silent edge cases.",
        },
        {
          title: "Add reconciliation as a first-class job",
          details:
            "Built an idempotent worker that compares provider events to internal records and repairs drift with a clear audit trail.",
        },
        {
          title: "Instrument for diagnosis, not dashboards",
          details:
            "Added structured logging with correlation IDs and focused metrics to answer the questions support and on-call actually asked.",
        },
      ],
      highlights: [
        "Introduced idempotency keys and safe retry semantics for payment attempts.",
        "Built a reconciliation worker with deterministic “repair” actions and audit notes.",
        "Added a support-facing admin view for invoice timelines and key events.",
        "Implemented guardrails for provider webhooks (ordering, duplication, signature checks).",
      ],
      impact: [
        "Fewer payment-related tickets and less manual intervention.",
        "Clearer incident timelines and faster root-cause identification.",
        "Safer changes: billing logic became testable around explicit state transitions.",
      ],
      learned: [
        "Operational clarity is a feature: when systems handle money, “what happened” must be answerable.",
        "Idempotency is easiest when designed early, but still possible to layer in with discipline.",
      ],
    },
  },
  {
    slug: "platform-ui-standardization",
    name: "Platform UI Standardization",
    summary:
      "Unified fragmented UI patterns into a maintainable component system without blocking feature delivery.",
    role: "Frontend Engineer (Lead)",
    timeline: "8 weeks • 2024",
    context:
      "Multiple teams shipped UI quickly over time; the product felt inconsistent and changes were expensive.",
    outcome:
      "Reduced duplicated UI work, made common screens faster to build, and improved perceived quality without a redesign project.",
    stackNote:
      "React, TypeScript, Tailwind, design tokens, migration strategy.",
    caseStudy: {
      problem:
        "The UI had subtle inconsistencies (spacing, typography, states) that made the product feel less trustworthy. Engineers avoided refactors because “fixing one screen breaks another.”",
      constraints: [
        "No dedicated design sprint: improvements needed to ride along real product work.",
        "Existing screens couldn’t be frozen; migration had to be incremental.",
        "Accessibility requirements: focus states and semantics had to be reliable.",
      ],
      approach: [
        {
          title: "Establish primitives first",
          details:
            "Created a small set of stable, well-documented primitives (buttons, inputs, cards, layout) aligned to tokens, not one-off styling.",
        },
        {
          title: "Migrate where it pays back",
          details:
            "Targeted high-traffic screens and shared flows first, so consistency improvements were noticeable quickly.",
        },
        {
          title: "Bake quality into defaults",
          details:
            "Made the right choice the easy choice: sensible spacing, focus styles, and states came for free with the primitives.",
        },
      ],
      highlights: [
        "Built a compact design token layer for spacing, radius, borders, and color roles.",
        "Standardized interactive states (hover, focus, disabled) across components.",
        "Added lightweight visual regression checks for key components.",
      ],
      impact: [
        "Faster feature development through reuse and clearer patterns.",
        "More consistent and accessible UI with fewer edge-case bugs.",
        "Lower long-term maintenance cost: fewer custom one-off components.",
      ],
    },
  },
  {
    slug: "api-performance-audit",
    name: "API Performance Audit",
    summary:
      "Improved tail latency by tightening queries, shaping responses, and adding guardrails against slow paths.",
    role: "Backend Engineer (Driver)",
    timeline: "4 weeks • 2024",
    context:
      "A key endpoint powering multiple screens slowed down with data growth, creating a “slow product” feeling.",
    outcome:
      "Stabilized response times under load and made performance regressions easier to catch early.",
    stackNote:
      "Postgres, SQL, API response shaping, caching where appropriate.",
    caseStudy: {
      problem:
        "The endpoint returned more data than needed and executed multiple non-selective queries. A few large tenants dominated latency, and the worst cases were hard to reproduce.",
      constraints: [
        "Couldn’t change client behavior everywhere at once; needed backward compatibility.",
        "Data growth was continuous; the solution had to scale with tenants.",
        "Performance work needed measurement, not assumptions.",
      ],
      approach: [
        {
          title: "Measure first, then change",
          details:
            "Added query timing and request traces to understand where time was spent and which tenants were affected.",
        },
        {
          title: "Shape the response to the UI’s needs",
          details:
            "Introduced versioned response fields to return only what the UI required, while keeping a compatibility path.",
        },
        {
          title: "Make slow paths obvious",
          details:
            "Added guardrails: query limits, safer defaults, and alerts when latency crosses thresholds.",
        },
      ],
      highlights: [
        "Rewrote expensive joins into targeted queries supported by indexes.",
        "Reduced payload size via selective fields and pagination defaults.",
        "Added tenant-aware tracing to pinpoint real-world tail latency.",
      ],
      impact: [
        "Lower tail latency and fewer “random slowness” reports.",
        "Clear performance budget and alerting around key endpoints.",
        "A repeatable pattern for future API performance work.",
      ],
    },
  },
  {
    slug: "ops-automation-agent",
    name: "Ops Automation Agent",
    summary:
      "Automated repetitive operational tasks with guardrails, reducing interruptions and making changes more consistent.",
    role: "Full-Stack Engineer",
    timeline: "3 weeks • 2025",
    context:
      "Engineers spent time on predictable “small ops” work: access checks, environment diffs, and routine cleanups.",
    outcome:
      "Saved engineering time and reduced errors by turning tribal knowledge into safe, repeatable automation.",
    stackNote:
      "Task automation, reviewable actions, audit logs, safe defaults.",
    caseStudy: {
      problem:
        "Operational tasks were handled via ad-hoc scripts and memory. That created inconsistency, avoidable mistakes, and context switching during feature work.",
      constraints: [
        "Automation couldn’t be “magic”: actions needed to be reviewable and auditable.",
        "Low risk tolerance: changes had to be reversible and scoped.",
        "Integrations varied by environment; the agent needed resilient fallbacks.",
      ],
      approach: [
        {
          title: "Start with safe, high-frequency tasks",
          details:
            "Chose tasks that were common and low-risk, then expanded only after proving reliability and adoption.",
        },
        {
          title: "Design for approval and audit",
          details:
            "Every action produced a proposed plan, required confirmation, and stored a durable audit record.",
        },
      ],
      highlights: [
        "Implemented a “plan then execute” workflow for safe automation.",
        "Logged actions with context, actor, and rollback instructions.",
        "Added lightweight policy checks to prevent risky operations by default.",
      ],
      impact: [
        "Fewer interruptions and less operational drift across environments.",
        "More predictable outcomes and clearer ownership of changes.",
      ],
      learned: [
        "Automation succeeds when it reduces cognitive load without hiding critical details.",
      ],
    },
  },
];

export const projectsData: ProjectCaseStudy[] = projects.map(
  mapProjectToCaseStudy,
);

export function getProjectBySlug(slug: string): ProjectCaseStudy | null {
  const p = projects.find((pr) => pr.slug === slug) ?? null;
  return p ? mapProjectToCaseStudy(p) : null;
}