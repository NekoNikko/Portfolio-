import type { Metadata } from "next";
import Link from "next/link";
import SectionHeading from "@/components/SectionHeading";
import {
  getSiteConfig,
  getExperience,
  getTestimonials,
  getProjects,
} from "@/lib/content";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "About",
  description:
    "About Marlon T. Argente — IT Specialist and Software Support Engineer with 15+ years in enterprise IT infrastructure, networking, and automation.",
};

export default function AboutPage() {
  const site = getSiteConfig() as {
    name?: string;
    professionalTitle?: string;
    tagline?: string;
    location?: string;
    bio?: string;
    stats?: { value?: string; dynamic?: string; label: string }[];
    education?: { degree: string; institution: string; year: string };
    social?: { github?: string; linkedin?: string };
  };
  const experience = getExperience();
  const testimonials = getTestimonials();

  // Stats marked "dynamic" are computed from published content — never
  // fabricated. Projects Completed = count of published projects whose
  // lifecycle status is COMPLETED.
  const completedProjects = getProjects().filter(
    (p) => p.projectStatus === "COMPLETED"
  ).length;

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 py-16">
      <SectionHeading
        kicker="About"
        title={site.name ?? "About"}
      />

      {/* Bio */}
      <p className="text-muted leading-relaxed">{site.bio}</p>
      <p className="mt-4 font-mono text-xs text-faint">
        {site.location}
      </p>

      {/* Stats — from the owner's own portfolio */}
      {(site.stats?.length ?? 0) > 0 && (
        <dl className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
          {site.stats!.map((s) => {
            const value =
              s.dynamic === "projects-completed"
                ? String(completedProjects)
                : (s.value ?? "Not yet available");
            return (
              <div key={s.label} className="p-4 rounded-lg border border-line bg-surface">
                <dd className="text-2xl font-bold text-accent font-mono">{value}</dd>
                <dt className="mt-1 text-[11px] text-faint font-mono uppercase tracking-wider">
                  {s.label}
                </dt>
              </div>
            );
          })}
        </dl>
      )}

      {/* Education */}
      {site.education && (
        <section className="mt-14">
          <SectionHeading kicker="Education" title="Formal Training" />
          <div className="p-6 rounded-xl border border-line bg-surface">
            <h3 className="font-bold text-foreground">{site.education.degree}</h3>
            <p className="mt-1 text-sm text-muted">{site.education.institution}</p>
            <p className="mt-1 font-mono text-xs text-accent">{site.education.year}</p>
          </div>
        </section>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <section className="mt-14">
          <SectionHeading
            kicker="Career"
            title="Experience"
            description="Over 15 years across government and academic institutions — infrastructure, systems administration, support, and automation."
          />
          <ol className="relative border-l border-line ml-3 space-y-8">
            {experience.map((pos) => (
              <li key={`${pos.role}-${pos.company}`} className="pl-6 relative">
                <span
                  aria-hidden="true"
                  className="absolute -left-[5px] top-1.5 h-2.5 w-2.5 rounded-full bg-accent glow-accent"
                />
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="font-bold text-foreground">{pos.role}</h3>
                  <span className="font-mono text-xs text-faint">{pos.period}</span>
                </div>
                <p className="mt-0.5 text-sm text-accent">{pos.company}</p>
                <p className="mt-2 text-sm text-muted leading-relaxed">
                  {pos.description}
                </p>
                <ul className="mt-3 space-y-1.5">
                  {pos.highlights.map((h) => (
                    <li
                      key={h}
                      className="flex items-start gap-2 text-sm text-muted leading-relaxed"
                    >
                      <span aria-hidden="true" className="text-accent font-mono">▸</span>
                      {h}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        </section>
      )}

      {/* Testimonials */}
      {testimonials.length > 0 && (
        <section className="mt-14">
          <SectionHeading
            kicker="Endorsements"
            title="What colleagues say"
            description="Testimonials from the institutions where I worked."
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {testimonials.map((t) => (
              <figure
                key={t.name}
                className="p-5 rounded-xl border border-line bg-surface flex flex-col"
              >
                <blockquote className="text-sm text-muted leading-relaxed flex-1">
                  &ldquo;{t.content}&rdquo;
                </blockquote>
                <figcaption className="mt-4 pt-4 border-t border-line-soft">
                  <p className="font-semibold text-foreground text-sm">{t.name}</p>
                  <p className="text-xs text-faint">
                    {[t.role, t.company].filter(Boolean).join(" · ")}
                  </p>
                </figcaption>
              </figure>
            ))}
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="mt-14">
        <SectionHeading
          kicker="Next step"
          title="Want to see how this work happens?"
        />
        <div className="flex flex-wrap gap-3">
          <Link
            href="/how-i-work"
            className="px-6 py-3 rounded-lg bg-surface border border-line text-foreground font-semibold text-sm hover:border-accent/60 hover:text-accent transition-colors"
          >
            How I Work →
          </Link>
          <Link
            href="/contact"
            className="px-6 py-3 rounded-lg bg-accent text-background font-semibold text-sm hover:bg-sky-400 transition-colors"
          >
            Contact
          </Link>
        </div>
      </section>
    </div>
  );
}