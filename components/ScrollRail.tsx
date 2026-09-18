"use client";

import { usePathname } from "next/navigation";
import {
  type MouseEvent,
  useCallback,
  useEffect,
  useState,
  useSyncExternalStore,
} from "react";

const SECTIONS = [
  { id: "hero", label: "Hero" },
  { id: "work", label: "Selected work" },
  { id: "journal", label: "Recent activity" },
  { id: "method", label: "Methodology" },
  { id: "skills", label: "Capabilities" },
  { id: "ai-use", label: "AI use" },
  { id: "contact", label: "Contact" },
];

function subscribeToScroll(callback: () => void) {
  window.addEventListener("scroll", callback, {
    passive: true,
  });

  window.addEventListener("resize", callback);

  return () => {
    window.removeEventListener("scroll", callback);
    window.removeEventListener("resize", callback);
  };
}

function getScrollSnapshot() {
  if (typeof window === "undefined") {
    return 0;
  }

  const available =
    document.documentElement.scrollHeight -
    window.innerHeight;

  if (available <= 0) {
    return 0;
  }

  return Math.min(
    1,
    Math.max(0, window.scrollY / available)
  );
}

function getServerScrollSnapshot() {
  return 0;
}

function HomeScrollRail() {
  const progress = useSyncExternalStore(
    subscribeToScroll,
    getScrollSnapshot,
    getServerScrollSnapshot
  );

  const [activeId, setActiveId] =
    useState("hero");

  const [sectionPositions, setSectionPositions] =
    useState<Record<string, number>>({});
  useEffect(() => {
    const previousScrollRestoration =
      window.history.scrollRestoration;

    window.history.scrollRestoration = "manual";

    const navigation =
      performance.getEntriesByType(
        "navigation"
      )[0] as PerformanceNavigationTiming | undefined;

    const isReload = navigation?.type === "reload";

    const resetScroll = () => {
      if (isReload) {
        window.history.replaceState(
          null,
          "",
          window.location.pathname + window.location.search
        );

        window.scrollTo({
          top: 0,
          left: 0,
          behavior: "auto",
        });

        return;
      }

      const hash =
        window.location.hash.replace(/^#/, "");

      if (!hash || hash === "hero") {
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: "auto",
        });

        return;
      }

      const target =
        document.getElementById(hash);

      target?.scrollIntoView({
        block: "start",
        behavior: "auto",
      });
    };

    resetScroll();

    const frame =
      window.requestAnimationFrame(resetScroll);

    return () => {
      window.cancelAnimationFrame(frame);

      window.history.scrollRestoration =
        previousScrollRestoration;
    };
  }, []);

  const measureSections = useCallback(() => {
    const maxScroll = Math.max(
      1,
      document.documentElement.scrollHeight -
        window.innerHeight
    );

    const next: Record<string, number> = {};

    for (const section of SECTIONS) {
      const element =
        document.getElementById(section.id);

      if (!element) {
        continue;
      }

      const documentTop =
        element.getBoundingClientRect().top +
        window.scrollY;

      // Matches the homepage scroll-mt-24 offset.
      const targetScroll = Math.max(
        0,
        documentTop - 96
      );

      const percentage =
        (targetScroll / maxScroll) * 100;

      // Keep first/last nodes visibly inside the rail.
      next[section.id] = Math.min(
        98,
        Math.max(2, percentage)
      );
    }

    setSectionPositions(next);
  }, []);

  useEffect(() => {
    const frame = window.requestAnimationFrame(
      measureSections
    );

    window.addEventListener(
      "resize",
      measureSections
    );

    const resizeObserver =
      typeof ResizeObserver !== "undefined"
        ? new ResizeObserver(measureSections)
        : null;

    if (resizeObserver) {
      resizeObserver.observe(document.body);
    }

    return () => {
      window.cancelAnimationFrame(frame);

      window.removeEventListener(
        "resize",
        measureSections
      );

      resizeObserver?.disconnect();
    };
  }, [measureSections]);

  useEffect(() => {
    const elements = SECTIONS
      .map((section) =>
        document.getElementById(section.id)
      )
      .filter(
        (element): element is HTMLElement =>
          Boolean(element)
      );

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (a, b) =>
              b.intersectionRatio -
              a.intersectionRatio
          );

        if (visible[0]) {
          setActiveId(visible[0].target.id);
        }
      },
      {
        rootMargin: "-24% 0px -58% 0px",
        threshold: [0, 0.1, 0.25, 0.5, 0.75, 1],
      }
    );

    elements.forEach((element) =>
      observer.observe(element)
    );

    const keepHeroActiveAtTop = () => {
      if (window.scrollY <= 8) {
        setActiveId("hero");
      }
    };

    keepHeroActiveAtTop();

    window.addEventListener("scroll", keepHeroActiveAtTop, {
      passive: true,
    });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", keepHeroActiveAtTop);
    };
  }, []);

  function handleSectionClick(
    event: MouseEvent<HTMLAnchorElement>,
    id: string
  ) {
    event.preventDefault();

    const target =
      document.getElementById(id);

    if (!target) {
      return;
    }

    setActiveId(id);

    window.history.replaceState(
      null,
      "",
      `#${id}`
    );

    const reducedMotion =
      window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

    target.scrollIntoView({
      behavior: reducedMotion
        ? "auto"
        : "smooth",
      block: "start",
    });
  }

  return (
    <>
      <div
        className="scroll-progress-mobile"
        aria-hidden="true"
      >
        <div
          className="scroll-progress-mobile__fill"
          style={{
            transform: `scaleX(${progress})`,
          }}
        />
      </div>

      <nav
        className="scroll-rail-desktop"
        aria-label="Homepage sections"
      >
        <div
          className="scroll-rail-track"
          aria-hidden="true"
        >
          <div
            className="scroll-rail-fill"
            style={{
              transform: `scaleY(${progress})`,
            }}
          />
        </div>

        <ul className="scroll-rail-list">
          {SECTIONS.map((section, index) => {
            const active =
              activeId === section.id;

            const fallback =
              (index /
                (SECTIONS.length - 1)) *
              100;

            const position =
              sectionPositions[section.id] ??
              fallback;

            return (
              <li
                key={section.id}
                className="scroll-rail-item"
                style={{
                  top: `${position}%`,
                }}
              >
                <a
                  href={`#${section.id}`}
                  className="scroll-rail-link"
                  data-active={
                    active ? "true" : "false"
                  }
                  aria-current={
                    active
                      ? "location"
                      : undefined
                  }
                  onClick={(event) =>
                    handleSectionClick(
                      event,
                      section.id
                    )
                  }
                >
                  <span
                    className="scroll-rail-node"
                    aria-hidden="true"
                  />

                  <span className="scroll-rail-label">
                    {section.label}
                  </span>
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
}

export default function ScrollRail() {
  const pathname = usePathname();

  if (pathname !== "/") {
    return null;
  }

  return <HomeScrollRail />;
}