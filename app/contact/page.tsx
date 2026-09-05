import type { Metadata } from "next";
import Link from "next/link";
import SectionHeading from "@/components/SectionHeading";
import { getSiteConfig } from "@/lib/content";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch about projects, collaboration, or engineering work.",
};

export default function ContactPage() {
  const site = getSiteConfig() as {
    contact?: {
      kicker?: string;
      headline?: string;
      email?: string;
      phone?: string;
      preferredMethod?: string;
      note?: string;
    };
    location?: string;
    social?: { github?: string; linkedin?: string };
  };
  const contact = site.contact ?? {};

  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 py-16">
      <SectionHeading
        kicker={contact.kicker ?? "Contact"}
        title={contact.headline ?? "Let's talk about your project."}
      />

      <div className="p-8 rounded-xl border border-accent/25 bg-surface glow-accent text-center">
        <p className="font-mono text-xs uppercase tracking-[0.25em] text-accent mb-5">
          {contact.preferredMethod ?? "Email"}
        </p>
        {contact.email && (
          <a
            href={`mailto:${contact.email}`}
            className="text-2xl md:text-3xl font-bold text-foreground hover:text-accent transition-colors break-all"
          >
            {contact.email}
          </a>
        )}
        {contact.note && (
          <p className="mt-6 text-sm text-muted leading-relaxed max-w-md mx-auto">
            {contact.note}
          </p>
        )}
      </div>

      {/* Contact details */}
      {(contact.phone || site.location) && (
        <dl className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {contact.phone && (
            <div className="p-5 rounded-xl border border-line bg-surface">
              <dt className="text-faint font-mono text-xs uppercase tracking-wider">
                Phone
              </dt>
              <dd className="mt-1.5 text-foreground text-sm">{contact.phone}</dd>
            </div>
          )}
          {site.location && (
            <div className="p-5 rounded-xl border border-line bg-surface">
              <dt className="text-faint font-mono text-xs uppercase tracking-wider">
                Location
              </dt>
              <dd className="mt-1.5 text-foreground text-sm">{site.location}</dd>
            </div>
          )}
        </dl>
      )}

      {/* Social links */}
      {site.social && (site.social.github || site.social.linkedin) && (
        <div className="mt-8 p-5 rounded-xl border border-line bg-surface">
          <p className="text-faint font-mono text-xs uppercase tracking-wider mb-3">
            Elsewhere
          </p>
          <div className="flex flex-wrap gap-3">
            {site.social.github && (
              <a
                href={site.social.github}
                target="_blank"
                rel="nofollow noopener noreferrer"
                className="px-4 py-2 rounded-lg bg-background-soft border border-line text-sm text-foreground hover:border-accent/60 hover:text-accent transition-colors"
              >
                GitHub ↗
              </a>
            )}
            {site.social.linkedin && (
              <a
                href={site.social.linkedin}
                target="_blank"
                rel="nofollow noopener noreferrer"
                className="px-4 py-2 rounded-lg bg-background-soft border border-line text-sm text-foreground hover:border-accent/60 hover:text-accent transition-colors"
              >
                LinkedIn ↗
              </a>
            )}
          </div>
        </div>
      )}

      <div className="mt-8 space-y-4 text-sm text-muted leading-relaxed">
        <p>
          <span className="text-foreground font-semibold">What I can help with:</span>{" "}
          enterprise IT infrastructure, Windows Server and Active Directory,
          networking, automation, cybersecurity hardening, and AI-assisted
          software development.
        </p>
        <p>
          <span className="text-foreground font-semibold">Before you write:</span>{" "}
          this portfolio documents how I work. If you&apos;re evaluating a
          collaboration, the{" "}
          <Link href="/case-studies" className="text-accent hover:text-sky-300">
            case studies
          </Link>{" "}
          and{" "}
          <Link href="/how-i-work" className="text-accent hover:text-sky-300">
            methodology
          </Link>{" "}
          pages are the best place to start.
        </p>
      </div>
    </div>
  );
}