"use client";

import Link from "next/link";
import { useScrollDepth } from "@/lib/scroll";
import { ParallaxLayer } from "@/components/ParallaxLayer";

export interface Hero3DProps {
  kicker?: string;
  headline?: string;
  subheadline?: string;
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  tertiaryCta?: { label: string; href: string };
  quaternaryCta?: { label: string; href: string };
  name?: string;
  professionalTitle?: string;
}

export function Hero3D({
  kicker = "Live Agentic Engineering Portfolio",
  headline = "IT INFRASTRUCTURE.\nAUTOMATION.\nAI-ASSISTED\nENGINEERING.",
  subheadline = "I design, operate, and improve practical IT systems — from infrastructure and networking to automation and governed AI workflows.",
  primaryCta = { label: "View Selected Work", href: "/work" },
  secondaryCta = { label: "Contact Me", href: "/contact" },
  tertiaryCta,
  quaternaryCta,
  name = "Marlon T. Argente",
  professionalTitle = "IT Specialist & Software Support Engineer",
}: Hero3DProps) {
  const { progress, isReducedMotion } = useScrollDepth();
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  // Split headline into lines for layered effect
  const headlineLines = headline.split("\n").filter(Boolean);

  return (
    <section 
      className="relative overflow-hidden"
      style={{ 
        perspective: "1000px",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
      }}
      aria-label="Hero section"
    >
      {/* Background - Technical grid with slow parallax */}
      {!isReducedMotion && (
        <>
          <ParallaxLayer speed={0.15} zIndex={-3} className="opacity-30">
            <TechnicalGrid />
          </ParallaxLayer>
          
          <ParallaxLayer speed={0.25} zIndex={-2} className="opacity-40">
            <TopologyLines />
          </ParallaxLayer>
          
          <ParallaxLayer speed={0.35} zIndex={-1} className="opacity-50">
            <InfrastructureNodes />
          </ParallaxLayer>
        </>
      )}

      {/* Foreground content */}
      <div 
        className="relative mx-auto max-w-[1280px] px-6 lg:px-8 pt-24 pb-20"
        style={{
          transform: isReducedMotion ? undefined : `translateZ(${progress * 50}px)`,
          transition: "transform 0.1s linear",
        }}
      >
        {/* Kicker */}
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-accent mb-5">
          {kicker}
        </p>

        {/* Headline with depth layers */}
        <div style={{ transformStyle: "preserve-3d" }}>
          {headlineLines.map((line, index) => (
            <ParallaxLayer
              key={index}
              speed={0.1 + index * 0.05}
              zIndex={index + 1}
              className="relative"
            >
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight leading-[1.08] max-w-3xl">
                {line}
              </h1>
            </ParallaxLayer>
          ))}
        </div>

        {/* Subheadline */}
        <ParallaxLayer speed={0.15} zIndex={10}>
          <p className="mt-6 text-lg text-muted leading-relaxed max-w-2xl">
            {subheadline}
          </p>
        </ParallaxLayer>

        {/* CTAs */}
        <ParallaxLayer speed={0.2} zIndex={11}>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href={primaryCta.href}
              className="px-6 py-3 rounded-lg bg-accent text-background font-semibold text-sm hover:bg-sky-400 transition-colors shadow-lg shadow-sky-500/20"
            >
              {primaryCta.label}
            </Link>
            <Link
              href={secondaryCta.href}
              className="px-6 py-3 rounded-lg bg-surface border border-line text-foreground font-semibold text-sm hover:border-accent/60 hover:text-accent transition-colors"
            >
              {secondaryCta.label}
            </Link>
            {tertiaryCta && (
              <Link
                href={tertiaryCta.href}
                className="px-6 py-3 rounded-lg text-muted font-medium text-sm hover:text-foreground transition-colors"
              >
                {tertiaryCta.label} →
              </Link>
            )}
            {quaternaryCta && (
              <Link
                href={quaternaryCta.href}
                className="px-6 py-3 rounded-lg text-muted font-medium text-sm hover:text-foreground transition-colors"
              >
                {quaternaryCta.label} →
              </Link>
            )}
          </div>
        </ParallaxLayer>

        {/* Name and title */}
        <ParallaxLayer speed={0.25} zIndex={12}>
          <p className="mt-10 font-mono text-xs text-faint">
            {name} · {professionalTitle}
          </p>
        </ParallaxLayer>
      </div>

      {/* Scroll indicator */}
      {!isReducedMotion && !isMobile && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce font-mono text-xs text-faint">
          Scroll
          <svg className="inline h-4 w-4 ml-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 5v14M19 12l-7 7-7-7" />
          </svg>
        </div>
      )}
    </section>
  );
}

/** Technical grid background */
function TechnicalGrid() {
  return (
    <svg 
      className="absolute inset-0 h-full w-full" 
      viewBox="0 0 100 100" 
      preserveAspectRatio="none"
      style={{ pointerEvents: "none" }}
    >
      <defs>
        <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
          <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.3" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#grid)" />
    </svg>
  );
}

/** Topology lines - subtle connecting lines */
function TopologyLines() {
  const lines = [
    { x1: 10, y1: 20, x2: 90, y2: 80 },
    { x1: 90, y1: 20, x2: 10, y2: 80 },
    { x1: 50, y1: 5, x2: 50, y2: 95 },
    { x1: 5, y1: 50, x2: 95, y2: 50 },
    { x1: 20, y1: 10, x2: 80, y2: 90 },
    { x1: 80, y1: 10, x2: 20, y2: 90 },
  ];

  return (
    <svg 
      className="absolute inset-0 h-full w-full" 
      viewBox="0 0 100 100" 
      preserveAspectRatio="none"
      style={{ pointerEvents: "none" }}
    >
      {lines.map((line, i) => (
        <line
          key={i}
          x1={`${line.x1}%`}
          y1={`${line.y1}%`}
          x2={`${line.x2}%`}
          y2={`${line.y2}%`}
          stroke="currentColor"
          strokeWidth="0.3"
          opacity="0.15"
          strokeDasharray="5,10"
        />
      ))}
    </svg>
  );
}

/** Infrastructure nodes - floating dots */
function InfrastructureNodes() {
  const nodes = [
    { x: 15, y: 15, size: 3 },
    { x: 85, y: 15, size: 2 },
    { x: 15, y: 85, size: 2 },
    { x: 85, y: 85, size: 3 },
    { x: 50, y: 50, size: 4 },
    { x: 30, y: 70, size: 2 },
    { x: 70, y: 30, size: 2 },
    { x: 40, y: 20, size: 1.5 },
    { x: 60, y: 80, size: 1.5 },
  ];

  return (
    <svg 
      className="absolute inset-0 h-full w-full" 
      viewBox="0 0 100 100" 
      preserveAspectRatio="none"
      style={{ pointerEvents: "none" }}
    >
      {nodes.map((node, i) => (
        <circle
          key={i}
          cx={`${node.x}%`}
          cy={`${node.y}%`}
          r={node.size}
          fill="currentColor"
          opacity="0.2"
          style={{ filter: "blur(1px)" }}
        />
      ))}
    </svg>
  );
}