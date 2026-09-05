import Link from "next/link";
import { getSiteConfig } from "@/lib/content";

const FOOTER_LINKS = [
  { href: "/projects", label: "Projects" },
  { href: "/journal", label: "Engineering Journal" },
  { href: "/case-studies", label: "Case Studies" },
  { href: "/skills", label: "Skills" },
  { href: "/how-i-work", label: "How I Work" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Footer() {
  const site = getSiteConfig() as {
    name?: string;
    seo?: { siteName?: string };
  };

  return (
    <footer className="border-t border-line bg-background-soft/60">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-12">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-8">
          <div className="max-w-sm">
            <p className="font-mono text-sm text-foreground">
              {site.name ?? "Marlon"}
              <span className="text-accent">_</span>
            </p>
            <p className="mt-3 text-sm text-muted leading-relaxed">
              A living engineering portfolio. Real projects, real decisions,
              verified work.
            </p>
            <p className="mt-4 font-mono text-xs text-faint">
              PRIVATE BY DEFAULT · PUBLIC BY APPROVAL
            </p>
          </div>

          <nav aria-label="Footer navigation">
            <ul className="grid grid-cols-2 sm:grid-cols-3 gap-x-10 gap-y-2.5">
              {FOOTER_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted hover:text-accent transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-10 pt-6 border-t border-line-soft flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <p className="text-xs text-faint">
            © {new Date().getFullYear()} {site.name ?? "Marlon"}. Built with an
            AI-assisted, human-verified workflow.
          </p>
          <div className="flex items-center gap-4">
            <Link
              href="/admin"
              className="font-mono text-xs text-faint hover:text-muted transition-colors"
            >
              /admin
            </Link>
            <Link
              href="/contact"
              className="font-mono text-xs text-accent hover:text-sky-300 transition-colors"
            >
              → Get in touch
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}