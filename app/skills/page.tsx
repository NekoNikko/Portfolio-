import type { Metadata } from "next";
import SectionHeading from "@/components/SectionHeading";
import {
  getSkills,
  getTechStack,
  getCertifications,
  getSiteConfig,
} from "@/lib/content";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Technical Skills",
  description:
    "Technical skills across systems administration, networking, asset lifecycle, cybersecurity, web development, and AI-assisted engineering — with real certifications.",
};

export default function SkillsPage() {
  const groups = getSkills();
  const techStack = getTechStack();
  const certifications = getCertifications();
  const site = getSiteConfig() as {
    currentlyLearning?: { topic: string; level: string }[];
  };

  // Group certifications by category for readability
  const certGroups = certifications.reduce<Record<string, typeof certifications>>(
    (acc, cert) => {
      const key = cert.category ?? "Other";
      acc[key] = acc[key] ?? [];
      acc[key].push(cert);
      return acc;
    },
    {}
  );

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 py-16">
      <SectionHeading
        kicker="Capabilities"
        title="Technical Skills"
        description="Grouped by domain — skills and levels from my own portfolio; nothing invented."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {groups.map((group) => (
          <div
            key={group.name}
            className="p-6 rounded-xl border border-line bg-surface"
          >
            <h2 className="font-bold text-foreground text-sm uppercase tracking-wider text-accent">
              {group.name}
            </h2>
            <ul className="mt-4 space-y-2.5">
              {group.skills.map((s) => (
                <li key={s.name} className="flex items-baseline justify-between gap-4">
                  <span className="text-sm text-foreground">{s.name}</span>
                  <span className="font-mono text-[11px] text-faint text-right shrink-0">
                    {s.level}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Tech stack badges */}
      {techStack.length > 0 && (
        <section className="mt-16">
          <SectionHeading
            kicker="Stack"
            title="Technology Stack"
            description="The platforms and tools I work with daily."
          />
          <div className="flex flex-wrap gap-2">
            {techStack.map((t) => (
              <span
                key={t.name}
                className="px-3 py-1.5 rounded-md border border-line bg-surface font-mono text-xs text-foreground"
                title={t.level}
              >
                {t.name}
                <span className="ml-1.5 text-faint">· {t.level}</span>
              </span>
            ))}
          </div>
        </section>
      )}

      {/* Certifications */}
      {certifications.length > 0 && (
        <section className="mt-16">
          <SectionHeading
            kicker="Credentials"
            title="Certifications & Training"
            description={`${certifications.length} verified certifications and training completions, with public verification links where available.`}
          />
          <div className="space-y-8">
            {Object.entries(certGroups).map(([category, certs]) => (
              <div key={category}>
                <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-accent mb-3">
                  {category}
                </h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {certs.map((cert) => (
                    <li
                      key={`${cert.title}-${cert.date}`}
                      className="flex items-start justify-between gap-3 p-3 rounded-lg border border-line bg-surface"
                    >
                      <div>
                        <p className="text-sm text-foreground">{cert.title}</p>
                        <p className="mt-0.5 text-xs text-faint">
                          {cert.issuer} · {cert.date}
                        </p>
                      </div>
                      {cert.verificationUrl && (
                        <a
                          href={cert.verificationUrl}
                          target="_blank"
                          rel="nofollow noopener noreferrer"
                          className="shrink-0 font-mono text-xs text-accent hover:text-sky-300 transition-colors"
                          aria-label={`Verify ${cert.title}`}
                        >
                          Verify ↗
                        </a>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Currently learning */}
      {site.currentlyLearning && site.currentlyLearning.length > 0 && (
        <section className="mt-16">
          <SectionHeading
            kicker="In progress"
            title="Currently Learning"
            description="What I'm actively exploring — stated honestly, without claiming mastery."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {site.currentlyLearning.map((item) => (
              <div
                key={item.topic}
                className="p-5 rounded-xl border border-line bg-surface"
              >
                <h3 className="font-semibold text-foreground text-sm">
                  {item.topic}
                </h3>
                <p className="mt-1.5 font-mono text-xs text-accent">
                  {item.level}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}