"use client";

import { useScrollDepth, useElementScroll, useReducedMotion } from "@/lib/scroll";
import { useRef, useState, useEffect } from "react";

export interface CurrentlyBuildingStackProps {
  project?: string;
  status?: string;
  phase?: string;
  lastPublicUpdate?: string;
  technologies?: string[];
  description?: string;
}

export function CurrentlyBuildingStack({
  project = "JARVIS Agentic OS",
  status = "Active Development",
  phase = "Portfolio publication layer",
  lastPublicUpdate = "2026-09-05",
  technologies = ["Obsidian", "Markdown", "Agentic Workflows", "Verification Systems"],
  description = "Building a local-first AI engineering command center with project scanning, planning, task management, verification and knowledge management. The portfolio you are reading is the controlled public window into that workspace.",
}: CurrentlyBuildingStackProps) {
  const { progress, isReducedMotion } = useScrollDepth();
  const containerRef = useRef<HTMLDivElement>(null);
  const { progress: containerProgress, isInView } = useElementScroll(containerRef, {
    rootMargin: "100px 0px",
    threshold: [0, 0.1, 0.25, 0.5, 0.75, 0.9, 1],
  });
  const [isHovered, setIsHovered] = useState(false);
  const reducedMotion = useReducedMotion();

  const stackLayers = [
    { name: "JARVIS", color: "bg-sky-500/20 border-sky-500/30", icon: "⚙", z: 0 },
    { name: "Agentic OS", color: "bg-emerald-500/20 border-emerald-500/30", icon: "🤖", z: 1 },
    { name: "Cloudflare\nObservability", color: "bg-orange-500/20 border-orange-500/30", icon: "☁", z: 2 },
    { name: "Automation", color: "bg-violet-500/20 border-violet-500/30", icon: "⚡", z: 3 },
    { name: "Verification", color: "bg-amber-500/20 border-amber-500/30", icon: "✓", z: 4 },
  ];

  return (
    <section ref={containerRef} className="border-y border-line bg-background-soft/50">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-14">
        <div className="mb-10">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-accent mb-2">
            Live status
          </p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            Currently Building
          </h2>
        </div>

        <div className="relative">
          {/* Background depth indicator */}
          {!isReducedMotion && (
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                transform: isReducedMotion ? undefined : `translateY(${containerProgress * 30}px)`,
                transition: "transform 0.1s linear",
              }}
            >
              <StackDepthLines />
            </div>
          )}

          {/* Main stack visualization */}
          <div className="relative z-10">
            <div 
              className="p-6 rounded-xl border border-accent/25 bg-surface glow-accent"
              style={{
                transform: isReducedMotion ? undefined : `translateY(${-containerProgress * 20}px)`,
                transition: "transform 0.1s linear",
              }}
            >
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <h3 className="text-xl font-bold text-foreground">
                  {project}
                </h3>
                <span className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full border border-emerald-500/25 bg-emerald-500/10 text-emerald-400 text-xs font-medium">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  {status}
                </span>
              </div>

              {/* Technical stack visualization */}
              <div className="relative">
                <StackVisualization 
                  layers={stackLayers} 
                  progress={containerProgress}
                  reducedMotion={reducedMotion}
                  isHovered={isHovered}
                  setIsHovered={setIsHovered}
                />
              </div>

              <dl className="mt-5 grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                <div>
                  <dt className="text-faint font-mono text-xs uppercase tracking-wider">
                    Current phase
                  </dt>
                  <dd className="mt-1 text-foreground">{phase}</dd>
                </div>
                <div>
                  <dt className="text-faint font-mono text-xs uppercase tracking-wider">
                    Last public update
                  </dt>
                  <dd className="mt-1 text-foreground">
                    {lastPublicUpdate ? new Date(lastPublicUpdate).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric"
                    }) : "Not yet available"}
                  </dd>
                </div>
                <div>
                  <dt className="text-faint font-mono text-xs uppercase tracking-wider">
                    Technology
                  </dt>
                  <dd className="mt-1 flex flex-wrap gap-1.5">
                    {technologies.map((t) => (
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
                {description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function StackDepthLines() {
  return (
    <svg className="absolute inset-0 w-full h-full" style={{ pointerEvents: "none" }}>
      <defs>
        <linearGradient id="depthGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="currentColor" stopOpacity="0.05" />
          <stop offset="50%" stopColor="currentColor" stopOpacity="0.02" />
          <stop offset="100%" stopColor="currentColor" stopOpacity="0.05" />
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#depthGradient)" />
    </svg>
  );
}

function StackVisualization({
  layers,
  progress,
  reducedMotion,
  isHovered,
  setIsHovered,
}: {
  layers: Array<{ name: string; color: string; icon: string; z: number }>;
  progress: number;
  reducedMotion: boolean;
  isHovered: boolean;
  setIsHovered: (hovered: boolean) => void;
}) {
  return (
    <div
      className="relative"
      onMouseEnter={() => !reducedMotion && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        transformStyle: "preserve-3d",
        perspective: "800px",
      }}
    >
      {layers.map((layer, index) => (
        <div
          key={layer.name}
          className="relative"
          style={{
            transformStyle: "preserve-3d",
            transform: reducedMotion
              ? undefined
              : `translateZ(${(layers.length - index) * 30 + progress * 40}px) rotateX(${-progress * 5}deg)`,
            transition: "transform 0.3s ease-out",
          }}
        >
          <div
            className={`p-4 rounded-xl border ${layer.color} flex items-center gap-3 min-w-[200px] transition-all duration-300`}
            style={{
              transform: reducedMotion
                ? undefined
                : `translateZ(${index * 12}px) scale(${isHovered ? 1.02 : 1})`,
              boxShadow: isHovered
                ? "0 16px 32px -8px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(14, 165, 233, 0.1)"
                : "0 8px 16px -4px rgba(0, 0, 0, 0.2)",
              transition: "all 300ms ease",
            }}
          >
            <span className="text-2xl" aria-hidden="true">{layer.icon}</span>
            <span className="font-bold text-foreground whitespace-nowrap">{layer.name}</span>
          </div>
        </div>
      ))}
    </div>
  );
}