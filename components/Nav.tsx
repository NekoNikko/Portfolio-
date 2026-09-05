"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/journal", label: "Engineering Journal" },
  { href: "/case-studies", label: "Case Studies" },
  { href: "/skills", label: "Skills" },
  { href: "/how-i-work", label: "How I Work" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

function isActive(pathname: string, href: string): boolean {
  if (href === "/") return pathname === "/";
  return pathname.startsWith(href);
}

export default function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-background/85 backdrop-blur-md">
      <nav
        aria-label="Main navigation"
        className="mx-auto max-w-6xl px-4 sm:px-6 flex items-center justify-between h-16"
      >
        <Link
          href="/"
          className="flex items-center gap-2.5 font-mono text-sm tracking-wide text-foreground"
        >
          <span
            aria-hidden="true"
            className="flex items-center justify-center h-8 w-8 rounded-md bg-surface-raised border border-line text-accent text-xs font-bold glow-accent"
          >
            MA
          </span>
          <span className="hidden sm:inline">
            Marlon<span className="text-accent">_</span>
          </span>
        </Link>

        {/* Desktop links */}
        <ul className="hidden lg:flex items-center gap-1">
          {LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                aria-current={isActive(pathname, link.href) ? "page" : undefined}
                className={`px-3 py-2 rounded-md text-sm transition-colors ${
                  isActive(pathname, link.href)
                    ? "text-accent bg-surface-raised/60"
                    : "text-muted hover:text-foreground hover:bg-surface"
                }`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Mobile toggle */}
        <button
          type="button"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close navigation" : "Open navigation"}
          className="lg:hidden flex flex-col justify-center gap-[5px] h-9 w-9 items-center rounded-md border border-line bg-surface"
        >
          <span
            className={`block h-px w-4 bg-foreground transition-transform ${open ? "translate-y-[6px] rotate-45" : ""}`}
          />
          <span className={`block h-px w-4 bg-foreground ${open ? "opacity-0" : ""}`} />
          <span
            className={`block h-px w-4 bg-foreground transition-transform ${open ? "-translate-y-[6px] -rotate-45" : ""}`}
          />
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div id="mobile-nav" className="lg:hidden border-t border-line bg-background-soft">
          <ul className="mx-auto max-w-6xl px-4 py-3 flex flex-col">
            {LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={`block px-3 py-2.5 rounded-md text-sm ${
                    isActive(pathname, link.href)
                      ? "text-accent bg-surface-raised/60"
                      : "text-muted hover:text-foreground"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}