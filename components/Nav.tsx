"use client";

import Link from "next/link";
import { useState } from "react";

const LINKS = [
  { href: "/#work", label: "Work" },
  { href: "/#method", label: "Method" },
  { href: "/#ai-use", label: "AI use" },
  { href: "/#skills", label: "Skills" },
  { href: "/#journal", label: "Journal" },
  { href: "/#contact", label: "Contact" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 h-16 border-b border-line bg-background/95 backdrop-blur-sm">
      <nav
        aria-label="Main navigation"
        className="mx-auto grid h-full max-w-[1520px] grid-cols-[1fr_auto_1fr] items-center px-5 sm:px-8 lg:px-10"
      >
        <Link
          href="/"
          aria-label="MA·Argente"
          className="justify-self-start font-mono text-sm font-medium tracking-[0.02em] text-foreground transition-colors hover:text-accent"
        >
          MA<span className="text-accent">·</span>Argente
        </Link>

        <div className="hidden justify-self-center lg:block">
          <ul className="flex items-center gap-8">
            {LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="font-mono text-[11px] uppercase tracking-[0.1em] text-muted transition-colors hover:text-accent"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="col-start-3 justify-self-end">
          <div
            className="hidden items-center gap-2 rounded-[4px] border border-line px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.08em] text-muted lg:flex"
            aria-label="Open to work"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-40" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-success" />
            </span>
            Open to work
          </div>

          <div className="flex items-center gap-3 lg:hidden">
            <div className="hidden items-center gap-2 font-mono text-[10px] uppercase tracking-[0.08em] text-muted sm:flex">
              <span className="h-2 w-2 rounded-full bg-success" />
              Open to work
            </div>

            <button
              type="button"
              onClick={() => setOpen((value) => !value)}
              aria-expanded={open}
              aria-controls="mobile-nav"
              aria-label={open ? "Close navigation" : "Open navigation"}
              className="grid h-9 w-9 place-items-center rounded-[4px] border border-line bg-surface"
            >
              <span className="sr-only">
                {open ? "Close navigation" : "Open navigation"}
              </span>

              <span className="flex flex-col gap-[5px]">
                <span
                  className={`block h-px w-4 bg-foreground transition-transform ${
                    open ? "translate-y-[6px] rotate-45" : ""
                  }`}
                />
                <span
                  className={`block h-px w-4 bg-foreground ${
                    open ? "opacity-0" : ""
                  }`}
                />
                <span
                  className={`block h-px w-4 bg-foreground transition-transform ${
                    open ? "-translate-y-[6px] -rotate-45" : ""
                  }`}
                />
              </span>
            </button>
          </div>
        </div>
      </nav>

      {open && (
        <div id="mobile-nav" className="border-t border-line bg-background lg:hidden">
          <ul className="mx-auto max-w-[1520px] px-5 py-3 sm:px-8">
            {LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block border-b border-line-soft py-3 font-mono text-xs uppercase tracking-[0.08em] text-muted transition-colors hover:text-accent last:border-b-0"
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
