import type { Metadata } from "next";
import SectionHeading from "@/components/SectionHeading";
import { getSiteConfig } from "@/lib/content";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "How I Work",
  description:
    "The engineering methodology behind this portfolio: understand, research, plan, build, test, verify, document, improve — with AI as an assisted, human-verified workflow.",
};

export default function HowIWorkPage() {
  const site = getSiteConfig() as {
    methodology?: { step: string; detail: string }[];
    aiUsage?: {
      kicker?: string;
      headline?: string;
      usedFor?: string[];
      principle?: string;
      confidenceLevels?: string[];
    };
  };

  const methodology = site.methodology ?? [];
  const aiUsage = site.aiUsage ?? {};

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 py-16">
      <SectionHeading
        kicker="Methodology"
        title="How I Work"
        description="A fixed engineering loop. Every request moves through the same stages, and every stage produces evidence."
      />

      <ol className="space-y-4">
        {methodology.map((m, i) => (
          <li
            key={m.step}
            className="flex gap-5 p-5 rounded-xl border border-line bg-surface"
          >
            <span className="font-mono text-sm text-accent pt-0.5">
              {String(i + 1).padStart(2, "0")}
            </span>
            <div>
              <h2 className="font-bold text-foreground text-lg">{m.step}</h2>
              <p className="mt-1 text-sm text-muted leading-relaxed">
                {m.detail}
              </p>
            </div>
          </li>
        ))}
      </ol>

      <section className="mt-16">
        <SectionHeading
          kicker={aiUsage.kicker ?? "AI-assisted development"}
          title={aiUsage.headline ?? "How I Use AI"}
          description="AI is a member of the engineering workflow — with clearly defined limits."
        />
        <div className="p-6 rounded-xl border border-accent/25 bg-surface glow-accent">
          <p className="text-lg leading-relaxed text-foreground">
            {aiUsage.principle}
          </p>
        </div>
        <ul className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {(aiUsage.usedFor ?? []).map((u) => (
            <li
              key={u}
              className="flex items-start gap-2.5 p-3 rounded-lg border border-line bg-surface text-sm text-foreground"
            >
              <span aria-hidden="true" className="text-accent font-mono">▸</span>
              {u}
            </li>
          ))}
        </ul>
        <p className="mt-8 text-sm text-muted leading-relaxed">
          Every claim in this portfolio carries a confidence level. Nothing is
          presented as fact without evidence:
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {(aiUsage.confidenceLevels ?? ["VERIFIED", "LIKELY", "POSSIBLE", "UNKNOWN"]).map(
            (level) => (
              <span
                key={level}
                className="px-3 py-1.5 rounded-md border border-line bg-surface font-mono text-xs text-accent"
              >
                {level}
              </span>
            )
          )}
        </div>
      </section>
    </div>
  );
}