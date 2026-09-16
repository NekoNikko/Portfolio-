"use client";

import { useScrollDepth, useElementScroll, useReducedMotion } from "@/lib/scroll";
import { useRef, useState, useEffect } from "react";

export interface HowIWorkScrollProps {
  methodology?: { step: string; detail: string }[];
}

export function HowIWorkScroll({
  methodology = [
    { step: "Understand", detail: "Define the problem and constraints before touching anything." },
    { step: "Plan", detail: "Break work into atomic tasks with dependencies; plans are reviewed before implementation." },
    { step: "Secure", detail: "Apply security-first thinking: least privilege, secrets management, threat modeling." },
    { step: "Build", detail: "Implement task by task, matching the project's existing conventions." },
    { step: "Test", detail: "Automated tests plus manual verification of the actual behavior." },
    { step: "Verify", detail: "Record evidence and confidence levels. Never claim completion without evidence." },
  ],
}: HowIWorkScrollProps) {
  const { progress, isReducedMotion } = useScrollDepth();
  const containerRef = useRef<HTMLDivElement>(null);
  const { progress: containerProgress, isInView } = useElementScroll(containerRef, {
    rootMargin: "100px 0px",
    threshold: [0, 0.1, 0.25, 0.5, 0.75, 0.9, 1],
  });
  const [activeIndex, setActiveIndex] = useState(0);
  const reducedMotion = useReducedMotion();

  // Determine active step based on scroll progress within this section
  useEffect(() => {
    if (reducedMotion || !isInView) return;
    
    const stepCount = methodology.length;
    const stepProgress = 1 / stepCount;
    const newIndex = Math.min(stepCount - 1, Math.floor(containerProgress / stepProgress));
    setActiveIndex(newIndex);
  }, [containerProgress, isInView, methodology.length, reducedMotion]);

  return (
    <section ref={containerRef} className="border-y border-line bg-background-soft/50">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-16">
        <div className="mb-12">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-accent mb-2">
            Methodology
          </p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            How I Work
          </h2>
          <p className="mt-2 text-muted max-w-2xl">
            A fixed engineering loop: nothing is claimed complete without evidence.
          </p>
        </div>

        {/* Background progress indicator */}
        {!isReducedMotion && (
          <div
            className="absolute inset-0 pointer-events-none -z-10"
            style={{
              transform: `translateY(${containerProgress * -50}px)`,
              transition: "transform 0.1s linear",
            }}
          >
            <MethodologyProgressBar progress={containerProgress} stepCount={methodology.length} />
          </div>
        )}

        <ol className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-px bg-line rounded-xl overflow-hidden border border-line">
          {methodology.map((m, i) => (
            <MethodologyStep
              key={m.step}
              index={i}
              step={m.step}
              detail={m.detail}
              isActive={i === activeIndex}
              progress={containerProgress}
              reducedMotion={reducedMotion}
              totalSteps={methodology.length}
            />
          ))}
        </ol>

        <p className="mt-8 text-sm text-muted max-w-3xl">
          AI is used as an engineering assistant across this loop — but
          every AI-generated result is reviewed, tested, and verified
          before it is accepted.{" "}
          <a href="/how-i-work" className="text-accent hover:text-sky-300 underline underline-offset-2">
            Learn more →
          </a>
        </p>
      </div>
    </section>
  );
}

function MethodologyProgressBar({ progress, stepCount }: { progress: number; stepCount: number }) {
  return (
    <svg className="absolute left-0 top-1/2 -translate-y-1/2 h-0.5 w-full" viewBox="0 0 100 1" style={{ pointerEvents: "none" }}>
      <defs>
        <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#0ea5e9" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#22d3ee" stopOpacity="0.5" />
        </linearGradient>
      </defs>
      <rect x="0" y="0" width={`${progress * 100}%`} height="1" fill="url(#progressGradient)" />
      {/* Step markers */}
      {Array.from({ length: stepCount - 1 }).map((_, i) => (
        <line
          key={i}
          x1={`${((i + 1) / stepCount) * 100}%`}
          y1="0"
          x2={`${((i + 1) / stepCount) * 100}%`}
          y2="1"
          stroke="#1e293b"
          strokeWidth="1"
        />
      ))}
    </svg>
  );
}

interface MethodologyStepProps {
  index: number;
  step: string;
  detail: string;
  isActive: boolean;
  progress: number;
  reducedMotion: boolean;
  totalSteps: number;
}

function MethodologyStep({ 
  index, 
  step, 
  detail, 
  isActive, 
  progress, 
  reducedMotion,
  totalSteps,
}: MethodologyStepProps) {
  const stepProgress = 1 / totalSteps;
  const stepStart = index * stepProgress;
  const stepEnd = (index + 1) * stepProgress;
  
  // Calculate step-specific progress (0-1 within this step)
  const stepLocalProgress = Math.max(0, Math.min(1, (progress - stepStart) / stepProgress));
  
  const [isHovered, setIsHovered] = useState(false);
  
  const rotateX = reducedMotion ? 0 : (isActive ? -2 : 0);
  const rotateY = reducedMotion ? 0 : (isActive ? 2 : 0);
  const translateZ = isActive ? 20 : 0;
  const scale = isActive ? 1.01 : 1;
  
  // Entrance animation
  const [hasEntered, setHasEntered] = useState(false);
  
  useEffect(() => {
    if (reducedMotion) {
      setHasEntered(true);
      return;
    }
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setHasEntered(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "50px" }
    );
    
    const element = document.querySelector(`[data-step-index="${index}"]`);
    if (element) observer.observe(element);
    return () => observer.disconnect();
  }, [index, reducedMotion]);

  return (
    <li
      ref={(el: HTMLLIElement | null) => {
        if (el) el.setAttribute("data-step-index", index.toString());
      }}
      className="bg-background-soft p-5 relative group transition-all duration-500"
      style={{
        opacity: hasEntered ? 1 : 0,
        transform: hasEntered 
          ? (reducedMotion ? undefined : `rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(${translateZ}px) scale(${scale})`)
          : "translateY(20px)",
        transition: "all 500ms ease-out",
        zIndex: isActive ? 10 : 1,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Step number with depth */}
      <div className="absolute -top-3 left-4 font-mono text-xs text-accent opacity-0 group-hover:opacity-100 transition-opacity">
        {String(index + 1).padStart(2, "0")}
      </div>
      
      {/* Active indicator bar */}
      {!reducedMotion && (
        <div
          className="absolute left-0 top-0 bottom-0 w-1 bg-accent"
          style={{
            transform: `scaleY(${stepLocalProgress})`,
            transformOrigin: "top",
            transition: "transform 0.3s ease-out",
            opacity: isActive ? 1 : 0.3,
          }}
        />
      )}
      
      <div 
        className="relative h-full transition-all duration-300"
        style={{
          transform: reducedMotion ? undefined : `rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(${translateZ}px) scale(${scale})`,
          boxShadow: isActive 
            ? "0 16px 32px -8px rgba(14, 165, 233, 0.15)"
            : isHovered
            ? "0 8px 16px -4px rgba(0, 0, 0, 0.2)"
            : "none",
          transition: "all 300ms ease",
        }}
      >
        <h3 className="font-bold text-foreground mb-2">{step}</h3>
        <p className="text-xs text-muted leading-relaxed">{detail}</p>
        
        {/* Active step glow */}
        {isActive && !reducedMotion && (
          <div 
            className="absolute inset-0 rounded-xl pointer-events-none"
            style={{
              boxShadow: "inset 0 0 0 1px rgba(14, 165, 233, 0.3), 0 0 20px rgba(14, 165, 233, 0.1)",
              animation: "pulse 2s ease-in-out infinite",
            }}
          />
        )}
      </div>
    </li>
  );
}
