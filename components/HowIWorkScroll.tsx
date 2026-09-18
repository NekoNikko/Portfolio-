export interface HowIWorkScrollProps {
  methodology?: {
    step: string;
    detail: string;
  }[];
}

const DEFAULT_METHODOLOGY = [
  {
    step: "Understand",
    detail:
      "Define the problem, scope, constraints, and evidence required before changing anything.",
  },
  {
    step: "Research",
    detail:
      "Review documentation, existing systems, dependencies, and known failure modes.",
  },
  {
    step: "Plan",
    detail:
      "Break the work into ordered, atomic tasks and review the approach before execution.",
  },
  {
    step: "Build",
    detail:
      "Implement incrementally while matching existing architecture and conventions.",
  },
  {
    step: "Test",
    detail:
      "Use automated tests together with manual checks of the actual system behavior.",
  },
  {
    step: "Verify",
    detail:
      "Record evidence and confidence; completion is not claimed without verification.",
  },
  {
    step: "Document",
    detail:
      "Capture decisions, findings, changes, and operational notes so the work remains usable.",
  },
  {
    step: "Improve",
    detail:
      "Review what worked and what did not, then feed those lessons into the next iteration.",
  },
];

function StepIcon({ step }: { step: string }) {
  const common = {
    width: 22,
    height: 22,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.6,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };

  switch (step) {
    case "Understand":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="7" />
          <circle cx="12" cy="12" r="2" />
          <path d="M12 2v3M12 19v3M2 12h3M19 12h3" />
        </svg>
      );

    case "Research":
      return (
        <svg {...common}>
          <circle cx="10.5" cy="10.5" r="6.5" />
          <path d="m15.5 15.5 5 5" />
        </svg>
      );

    case "Plan":
      return (
        <svg {...common}>
          <path d="M9 6h11M9 12h11M9 18h11" />
          <path d="m3.5 6 1.5 1.5L7.5 5M3.5 12 5 13.5 7.5 11M3.5 18 5 19.5 7.5 17" />
        </svg>
      );

    case "Build":
      return (
        <svg {...common}>
          <path d="M14.5 6.5a4 4 0 0 0-5 5L3 18l3 3 6.5-6.5a4 4 0 0 0 5-5l-3 3-3-3 3-3Z" />
        </svg>
      );

    case "Test":
      return (
        <svg {...common}>
          <path d="M9 3h6M10 3v5l-5 9a3 3 0 0 0 2.6 4h8.8A3 3 0 0 0 19 17l-5-9V3" />
          <path d="M7.5 15h9" />
        </svg>
      );

    case "Verify":
      return (
        <svg {...common}>
          <path d="M12 3 4.5 6v5c0 4.7 3.1 8.1 7.5 10 4.4-1.9 7.5-5.3 7.5-10V6L12 3Z" />
          <path d="m8.5 12 2.2 2.2 4.8-5" />
        </svg>
      );

    case "Document":
      return (
        <svg {...common}>
          <path d="M6 3h8l4 4v14H6Z" />
          <path d="M14 3v5h5M9 13h6M9 17h6" />
        </svg>
      );

    default:
      return (
        <svg {...common}>
          <path d="M20 7v5h-5" />
          <path d="M4 17v-5h5" />
          <path d="M6.1 8A7 7 0 0 1 18.5 6L20 7M4 17l1.5 1A7 7 0 0 0 17.9 16" />
        </svg>
      );
  }
}

export function HowIWorkScroll({
  methodology = [],
}: HowIWorkScrollProps) {
  const suppliedDetails = new Map(
    methodology.map((item) => [
      item.step.toLowerCase(),
      item.detail,
    ])
  );

  const steps = DEFAULT_METHODOLOGY.map((item) => ({
    ...item,
    detail:
      suppliedDetails.get(item.step.toLowerCase()) ??
      item.detail,
  }));

  return (
    <section
      id="method"
      className="scroll-mt-24 border-y border-line bg-background-soft/50"
    >
      <div className="mx-auto max-w-[1520px] px-5 py-16 sm:px-8 lg:px-10">
        <div className="mb-10 max-w-2xl">
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-accent">
            Methodology
          </p>

          <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
            How I Work
          </h2>

          <p className="mt-3 text-muted">
            A disciplined engineering loop: nothing is
            considered complete without evidence.
          </p>
        </div>

        <ol className="grid grid-cols-1 border-l border-t border-line sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((item, index) => (
            <li
              key={item.step}
              className="min-h-48 border-b border-r border-line bg-surface p-5"
            >
              <div className="flex items-start justify-between gap-4">
                <span className="text-accent">
                  <StepIcon step={item.step} />
                </span>

                <span className="font-mono text-[10px] text-faint">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>

              <h3 className="mt-6 text-base font-semibold text-foreground">
                {item.step}
              </h3>

              <p className="mt-2 text-sm leading-6 text-muted">
                {item.detail}
              </p>
            </li>
          ))}
        </ol>

        <p className="mt-7 max-w-4xl text-sm leading-6 text-muted">
          AI is used as an engineering assistant across
          this loop — but every AI-generated result is
          reviewed, tested, and verified before it is
          accepted.{" "}
          <a
            href="/how-i-work"
            className="text-accent underline underline-offset-4 hover:text-foreground"
          >
            Learn more →
          </a>
        </p>
      </div>
    </section>
  );
}