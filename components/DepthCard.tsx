"use client";

import { forwardRef, useRef, useState, useEffect } from "react";
import { useReducedMotion } from "@/lib/scroll";

export interface DepthCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Maximum rotation in degrees (kept restrained per spec) */
  maxRotation?: number;
  /** Perspective distance */
  perspective?: number;
  /** Elevation on hover */
  elevation?: number;
  /** Transition duration in ms */
  transitionDuration?: number;
  /** Whether to enable light/shadow response */
  lightResponse?: boolean;
  /** Z-depth on hover */
  hoverZ?: number;
  /** Scale on hover */
  hoverScale?: number;
  children: React.ReactNode;
  className?: string;
  /** Entry animation */
  animateEntry?: boolean;
}

export const DepthCard = forwardRef<HTMLDivElement, DepthCardProps>(
  (
    {
      maxRotation = 8,
      perspective = 1000,
      elevation = 8,
      transitionDuration = 300,
      lightResponse = true,
      hoverZ = 20,
      hoverScale = 1.02,
      children,
      className = "",
      animateEntry = true,
    },
    ref
  ) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const [isHovered, setIsHovered] = useState(false);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [hasEntered, setHasEntered] = useState(!animateEntry);
    const reducedMotion = useReducedMotion();

    const combinedRef = (node: HTMLDivElement | null) => {
      cardRef.current = node;
      if (ref) {
        if (typeof ref === "function") ref(node);
        else ref.current = node;
      }
    };

    // Handle mouse move for tilt effect
    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
      if (reducedMotion) return;
      
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left; // x position within the element
      const y = e.clientY - rect.top;  // y position within the element
      
      // Normalize to -1 to 1
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const normalizedX = (x - centerX) / centerX;
      const normalizedY = (y - centerY) / centerY;
      
      setMousePos({ x: normalizedX, y: normalizedY });
    };

    const handleMouseLeave = () => {
      if (reducedMotion) return;
      setMousePos({ x: 0, y: 0 });
    };

    // Handle entry animation
    useEffect(() => {
      if (!animateEntry || reducedMotion) {
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

      if (cardRef.current) {
        observer.observe(cardRef.current);
      }

      return () => observer.disconnect();
    }, [animateEntry, reducedMotion]);

    // Calculate transforms
    const rotateX = reducedMotion ? 0 : -mousePos.y * maxRotation;
    const rotateY = reducedMotion ? 0 : mousePos.x * maxRotation;
    const translateZ = isHovered && !reducedMotion ? hoverZ : 0;
    const scale = isHovered && !reducedMotion ? hoverScale : 1;
    const boxShadow = isHovered && !reducedMotion 
      ? `0 ${elevation * 2}px ${elevation * 4}px -${elevation}px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(14, 165, 233, 0.15)`
      : `0 ${elevation}px ${elevation * 2}px -${elevation}px rgba(0, 0, 0, 0.2)`;

    // Light response - subtle shine effect
    const shineX = reducedMotion ? 50 : 50 + mousePos.x * 30;
    const shineY = reducedMotion ? 50 : 50 - mousePos.y * 30;

    return (
      <div
        ref={combinedRef}
        className={`group relative rounded-xl border border-line bg-surface overflow-hidden transition-all duration-${transitionDuration} ${className}`}
        style={{
          perspective: `${perspective}px`,
          transformStyle: "preserve-3d",
          transform: hasEntered && !reducedMotion
            ? `rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(${translateZ}px) scale(${scale})`
            : hasEntered
            ? undefined
            : "translateY(20px)",
          boxShadow,
          opacity: hasEntered ? 1 : 0,
        } as React.CSSProperties}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => { setIsHovered(false); setMousePos({ x: 0, y: 0 }); }}
        onMouseEnter={() => setIsHovered(true)}
      >
        {/* Light response shine effect */}
        {lightResponse && !reducedMotion && (
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background: `radial-gradient(ellipse at ${shineX}% ${shineY}%, rgba(14, 165, 233, 0.08) 0%, transparent 70%)`,
              opacity: isHovered ? 1 : 0,
              transition: `opacity ${transitionDuration}ms ease`,
              pointerEvents: "none",
            }}
          />
        )}
        
        {/* Content wrapper to preserve 3D transform */}
        <div style={{ transform: "translateZ(0)" }}>
          {children}
        </div>
      </div>
    );
  }
);

DepthCard.displayName = "DepthCard";

/** Simpler depth card for project grids - less interactive, more subtle */
export interface SimpleDepthCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Entry delay in ms for staggered animations */
  entryDelay?: number;
  /** Hover elevation */
  hoverElevation?: number;
  children: React.ReactNode;
  className?: string;
}

export function SimpleDepthCard({
  entryDelay = 0,
  hoverElevation = 8,
  children,
  className = "",
}: SimpleDepthCardProps) {
  const [hasEntered, setHasEntered] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const reducedMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reducedMotion) {
      setHasEntered(true);
      return;
    }

    const timer = setTimeout(() => setHasEntered(true), entryDelay);
    return () => clearTimeout(timer);
  }, [entryDelay, reducedMotion]);

  useEffect(() => {
    if (reducedMotion) return;

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

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [reducedMotion]);

  return (
    <div
      ref={ref}
      className={`group relative rounded-xl border border-line bg-surface overflow-hidden transition-all duration-300 ${className}`}
      style={{
        opacity: hasEntered ? 1 : 0,
        transform: hasEntered ? "translateY(0)" : "translateY(20px)",
        boxShadow: isHovered
          ? `0 ${hoverElevation * 2}px ${hoverElevation * 3}px -${hoverElevation}px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(14, 165, 233, 0.15)`
          : `0 ${hoverElevation}px ${hoverElevation * 2}px -${hoverElevation}px rgba(0, 0, 0, 0.2)`,
        transition: "all 300ms ease",
      } as React.CSSProperties}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {children}
    </div>
  );
}