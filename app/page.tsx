import Link from "next/link";
import SectionHeading from "@/components/SectionHeading";
import StatusBadge from "@/components/StatusBadge";
import { DepthCard, SimpleDepthCard } from "@/components/DepthCard";
import { Hero3D } from "@/components/Hero3D";
import { CurrentlyBuildingStack } from "@/components/CurrentlyBuildingStack";
import { HowIWorkScroll } from "@/components/HowIWorkScroll";
import {
  getProjects,
  getJournal,
  getUpdates,
  getSiteConfig,
  getSkills,
  getCaseStudies,
  toPublicProject,
} from "@/lib/content";
import { formatDate } from "@/lib/format";

export const dynamic = "force-dynamic";

export default function HomePage() {
  const site = getSiteConfig() as {
    name?: string;
    professionalTitle?: string;
    hero?: {
      kicker?: string;
      headline?: string;
      subheadline?: string;
      primaryCta?: { label: string; href: string };
      secondaryCta?: { label: string; href: string };
      tertiaryCta?: { label: string; href: string };
      quaternaryCta?: { label: string; href: string };
    };
    currentlyBuilding?: {
      project?: string;
      status?: string;
      phase?: string;
      lastPublicUpdate?: string;
      technologies?: string[];
      description?: string;
    };
    currentlyLearning?: { topic: string; level: string }[];
    methodology?: { step: string; detail: string }[];
    aiUsage?: {
      kicker?: string;
      headline?: string;
      usedFor?: string[];
      principle?: string;
    };
    contact?: { headline?: string; email?: string; note?: string };
  };

  const projects = getProjects().map(toPublicProject);
  const caseStudies = getCaseStudies();
  const updates = getUpdates();
  const skills = getSkills();

  const hero = site.hero ?? {};
  const building = site.currentlyBuilding ?? {};

  return (
    <>
      {/* ------------------------------------------------------------------ */}
      {/* HERO — 3D Scroll Experience                                        */}
      {/* ------------------------------------------------------------------ */}
      <Hero3D
        kicker={hero.kicker}
        headline={hero.headline}
        subheadline={hero.subheadline}
        primaryCta={hero.primaryCta}
        secondaryCta={hero.secondaryCta}
        tertiaryCta={hero.tertiaryCta}
        quaternaryCta={hero.quaternaryCta}
        name={site.name}
        professionalTitle={site.professionalTitle}
      />

      {/* ------------------------------------------------------------------ */}
      {/* CURRENTLY BUILDING                                                  */}
      {/* ------------------------------------------------------------------ */}
      {building.project && (
        <section className="border-y border-line bg-background-soft/50">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 py-14">
            <SectionHeading
              kicker="Live status"
              title="Currently Building"
              description="A controlled public view of what I am working on right now — never private implementation details."
            />
            <div className="p-6 rounded-xl border border-accent/25 bg-surface glow-accent">
              <div className="flex flex-wrap items-center gap-3">
                <h3 className="text-xl font-bold text-foreground">
                  {building.project}
                </h3>
                <span className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full border border-emerald-500/25 bg-emerald-500/10 text-emerald-400 text-xs font-medium">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  {building.status}
                </span>
              </div>
              <dl className="mt-5 grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                <div>
                  <dt className="text-faint font-mono text-xs uppercase tracking-wider">
                    Current phase
                  </dt>
                  <dd className="mt-1 text-foreground">{building.phase}</dd>
                </div>
                <div>
                  <dt className="text-faint font-mono text-xs uppercase tracking-wider">
                    Last public update
                  </dt>
                  <dd className="mt-1 text-foreground">
                    {building.lastPublicUpdate
                      ? formatDate(building.lastPublicUpdate)
                      : "Not yet available"}
                  </dd>
                </div>
                <div>
                  <dt className="text-faint font-mono text-xs uppercase tracking-wider">
                    Technology
                  </dt>
                  <dd className="mt-1 flex flex-wrap gap-1.5">
                    {(building.technologies ?? []).map((t) => (
                      <span
                        key={t}
                        className="px-2 py-0.5 rounded border border-line bg-background-soft font-mono text-xs text-accent"
                      >
                        {t}
                      </span>
                    ))}
                  </dd>
                </div>
              </dl>
              <p className="mt-5 text-muted leading-relaxed max-w-3xl">
                {building.description}
              </p>
            </div>
          </div>
</section>
      )}
 
      {/* ------------------------------------------------------------------ */}
      {/* CURRENTLY BUILDING — 3D Stack Visualization                        */}
      {/* ------------------------------------------------------------------ */}
      {building.project && (
        <CurrentlyBuildingStack
          project={building.project}
          status={building.status}
          phase={building.phase}
          lastPublicUpdate={building.lastPublicUpdate}
          technologies={building.technologies}
          description={building.description}
        />
      )}
 
      {/* ------------------------------------------------------------------ */}
      {/* FEATURED PROJECTS — Depth Cards                                    */}
      {/* ------------------------------------------------------------------ */}
      {projects.length > 0 && (
        <section>
          <div className="mx-auto max-w-6xl px-4 sm:px-6 py-16">
            <SectionHeading
              kicker="Selected work"
              title="Featured Projects"
              description="Real projects with documented problems, decisions, verification, and lessons learned."
            />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {projects.slice(0, 3).map((p, index) => (
                <SimpleDepthCard key={p.slug} entryDelay={index * 100}>
                  <Link
                    href={`/projects/${p.slug}`}
                    className="group p-6 rounded-xl border border-line bg-surface hover:border-accent/50 transition-colors flex flex-col"
                  >
                    <div className="flex items-center justify-between gap-2 mb-4">
                      <StatusBadge status={p.status} />
                      <span className="font-mono text-xs text-faint">
                        {p.lastUpdated ? formatDate(p.lastUpdated) : ""}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-foreground group-hover:text-accent transition-colors">
                      {p.title}
                    </h3>
                    <p className="mt-2 text-sm text-muted leading-relaxed flex-1">
                      {p.summary}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {(p.technologies ?? []).slice(0, 4).map((t) => (
                        <span
                          key={t}
                          className="px-2 py-0.5 rounded border border-line bg-background-soft font-mono text-[11px] text-muted"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                    <p className="mt-4 font-mono text-xs text-accent opacity-0 group-hover:opacity-100 transition-opacity">
                      Read the case study →
                    </p>
                  </Link>
                </SimpleDepthCard>
              ))}
            </div>
          </div>
        </section>
      )}
 
      {/* ------------------------------------------------------------------ */}
      {/* HOW I WORK — Scroll Progression                                    */}
      {/* ------------------------------------------------------------------ */}
      {(site.methodology?.length ?? 0) > 0 && (
        <HowIWorkScroll methodology={site.methodology} />
      )}

      {/* ------------------------------------------------------------------ */}
      {/* HOW I USE AI                                                        */}
      {/* ------------------------------------------------------------------ */}
      {(site.aiUsage?.usedFor?.length ?? 0) > 0 && (
        <section>
          <div className="mx-auto max-w-6xl px-4 sm:px-6 py-16">
            <SectionHeading
              kicker={site.aiUsage?.kicker ?? "AI-assisted development"}
              title={site.aiUsage?.headline ?? "How I Use AI"}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {site.aiUsage!.usedFor!.map((u) => (
                  <li
                    key={u}
                    className="flex items-start gap-2.5 p-3 rounded-lg border border-line bg-surface text-sm text-foreground"
                  >
                    <span aria-hidden="true" className="text-accent font-mono">
                      ▸
                    </span>
                    {u}
                  </li>
                ))}
              </ul>
              <div className="p-6 rounded-xl border border-accent/25 bg-surface glow-accent self-start">
                <p className="font-mono text-xs uppercase tracking-[0.25em] text-accent mb-3">
                  Non-negotiable
                </p>
                <p className="text-lg leading-relaxed text-foreground">
                  {site.aiUsage?.principle}
                </p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ------------------------------------------------------------------ */}
      {/* RECENT ENGINEERING ACTIVITY                                         */}
      {/* ------------------------------------------------------------------ */}
      {updates.length > 0 && (
        <section className="border-y border-line bg-background-soft/50">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 py-16">
            <SectionHeading
              kicker="Activity feed"
              title="Recent Engineering Activity"
              description="Selected milestones from a continuously updated engineering log."
            />
            <ol className="relative border-l border-line ml-3 space-y-8">
              {updates.slice(0, 5).map((u) => (
                <li key={u.id} className="pl-6 relative">
                  <span
                    aria-hidden="true"
                    className="absolute -left-[5px] top-1.5 h-2.5 w-2.5 rounded-full bg-accent glow-accent"
                  />
                  <p className="font-mono text-xs text-faint uppercase tracking-wider">
                    {formatDate(u.date)}
                  </p>
                  <p className="mt-1.5 text-sm font-semibold text-foreground">
                    {u.summary}
                  </p>
                  {u.detail && (
                    <p className="mt-1 text-sm text-muted leading-relaxed">
                      {u.detail}
                    </p>
                  )}
                  <div className="mt-2 flex flex-wrap gap-2 font-mono text-[11px]">
                    <span className="px-2 py-0.5 rounded border border-line text-muted">
                      {u.project}
                    </span>
                    <span className="px-2 py-0.5 rounded border border-line text-accent">
                      {u.category}
                    </span>
                  </div>
                </li>
              ))}
            </ol>
            <Link
              href="/journal"
              className="mt-8 inline-block font-mono text-sm text-accent hover:text-sky-300 transition-colors"
            >
              Read the engineering journal →
            </Link>
          </div>
        </section>
      )}

      {/* ------------------------------------------------------------------ */}
      {/* TECHNICAL SKILLS (preview)                                          */}
      {/* ------------------------------------------------------------------ */}
      {skills.length > 0 && (
        <section>
          <div className="mx-auto max-w-6xl px-4 sm:px-6 py-16">
            <SectionHeading
              kicker="Capabilities"
              title="Technical Skills"
              description="Grouped by domain — only what is evidenced by the projects in this portfolio."
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {skills.map((group) => (
                <div
                  key={group.name}
                  className="p-5 rounded-xl border border-line bg-surface"
                >
                  <h3 className="font-bold text-foreground text-sm">
                    {group.name}
                  </h3>
                  <ul className="mt-3 space-y-1.5">
                    {group.skills.slice(0, 4).map((s) => (
                      <li
                        key={s.name}
                        className="text-xs text-muted flex items-baseline gap-2"
                      >
                        <span aria-hidden="true" className="text-accent">▸</span>
                        {s.name}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <Link
              href="/skills"
              className="mt-6 inline-block font-mono text-sm text-accent hover:text-sky-300 transition-colors"
            >
              View all skills →
            </Link>
          </div>
        </section>
      )}

      {/* ------------------------------------------------------------------ */}
      {/* FEATURED CASE STUDY                                                 */}
      {/* ------------------------------------------------------------------ */}
      {caseStudies.length > 0 && (
        <section className="border-y border-line bg-background-soft/50">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 py-16">
            <SectionHeading
              kicker="Featured case study"
              title="Engineering in Depth"
              description="A full walkthrough of a real problem: context, approach, implementation, testing, and lessons learned."
            />
            {caseStudies.slice(0, 1).map((c) => (
              <Link
                key={c.slug}
                href={`/case-studies/${c.slug}`}
                className="block p-6 md:p-8 rounded-xl border border-line bg-surface hover:border-accent/50 transition-colors"
              >
                <div className="flex flex-wrap items-center gap-2 mb-4 font-mono text-[11px]">
                  <span className="px-2 py-0.5 rounded border border-accent/30 text-accent">
                    {c.category}
                  </span>
                  {c.date && (
                    <span className="text-faint">{formatDate(c.date)}</span>
                  )}
                </div>
                <h3 className="text-xl font-bold text-foreground">{c.title}</h3>
                <p className="mt-2 text-sm text-muted leading-relaxed max-w-3xl">
                  {c.summary}
                </p>
                <p className="mt-4 font-mono text-sm text-accent">
                  Read the case study →
                </p>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* ------------------------------------------------------------------ */}
      {/* CONTACT                                                             */}
      {/* ------------------------------------------------------------------ */}
      <section>
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-16 text-center">
          <SectionHeading
            kicker="Contact"
            title={site.contact?.headline ?? "Let's talk about your project."}
          />
          {site.contact?.email ? (
            <a
              href={`mailto:${site.contact.email}`}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-accent text-background font-semibold text-base hover:bg-sky-400 transition-colors shadow-lg shadow-sky-500/20"
            >
              {site.contact.email}
            </a>
          ) : (
            <p className="text-muted">Contact details coming soon.</p>
          )}
          {site.contact?.note && (
            <p className="mt-4 text-sm text-muted">{site.contact.note}</p>
          )}
        </div>
      </section>
    </>
  );
}


