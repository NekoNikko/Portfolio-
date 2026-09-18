"use client";

import { useEffect, useState, useCallback, useRef } from "react";

export interface ScrollDepth {
  progress: number; // 0-1 overall page progress
  viewportHeight: number;
  documentHeight: number;
  scrollY: number;
  isReducedMotion: boolean;
}

export function useScrollDepth(): ScrollDepth {
  const [depth, setDepth] = useState<ScrollDepth>({
    progress: 0,
    viewportHeight: typeof window !== "undefined" ? window.innerHeight : 0,
    documentHeight: typeof document !== "undefined" ? document.documentElement.scrollHeight : 0,
    scrollY: typeof window !== "undefined" ? window.scrollY : 0,
    isReducedMotion: typeof window !== "undefined" ? window.matchMedia("(prefers-reduced-motion: reduce)").matches : false,
  });

  const rafRef = useRef<number | null>(null);

  const updateDepth = useCallback(() => {
    if (typeof window === "undefined" || typeof document === "undefined") return;

    const scrollY = window.scrollY;
    const viewportHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const progress = documentHeight > viewportHeight ? scrollY / (documentHeight - viewportHeight) : 0;

    setDepth({
      progress: Math.max(0, Math.min(1, progress)),
      viewportHeight,
      documentHeight,
      scrollY,
      isReducedMotion: window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    });
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(updateDepth);
    };

    const handleResize = () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(updateDepth);
    };

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handleMediaChange = () => updateDepth();

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize, { passive: true });
    mediaQuery.addEventListener("change", handleMediaChange);

    updateDepth();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
      mediaQuery.removeEventListener("change", handleMediaChange);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [updateDepth]);

  return depth;
}

export interface ElementScrollPosition {
  progress: number; // 0-1 within element's viewport range
  isInView: boolean;
  isVisible: boolean;
  rect: DOMRect | null;
}

export function useElementScroll(
  elementRef: React.RefObject<HTMLElement | null>,
  options: { rootMargin?: string; threshold?: number | number[] } = {}
): ElementScrollPosition {
  const [position, setPosition] = useState<ElementScrollPosition>({
    progress: 0,
    isInView: false,
    isVisible: false,
    rect: null,
  });

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry) return;

        const rect = entry.boundingClientRect;
        const viewportHeight = window.innerHeight;
        
        // Calculate progress within viewport
        const elementTop = rect.top;
        const elementBottom = rect.bottom;
        const elementHeight = rect.height;
        
        // Progress: 0 when bottom enters viewport, 1 when top leaves viewport
        let progress = 0;
        if (elementBottom > 0 && elementTop < viewportHeight) {
          const visibleTop = Math.max(0, -elementTop);
          const visibleBottom = Math.min(elementHeight, viewportHeight - elementTop);
          progress = visibleTop / elementHeight;
        } else if (elementTop <= 0) {
          progress = 1;
        }

        setPosition({
          progress: Math.max(0, Math.min(1, progress)),
          isInView: entry.isIntersecting,
          isVisible: entry.intersectionRatio > 0,
          rect,
        });
      },
      {
        rootMargin: options.rootMargin ?? "0px",
        threshold: options.threshold ?? [0, 0.1, 0.25, 0.5, 0.75, 0.9, 1],
      }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [elementRef, options.rootMargin, options.threshold]);

  return position;
}

export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => setReduced(e.matches);
    mediaQuery.addEventListener("change", handler);

    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  return reduced;
}

export function lerp(start: number, end: number, factor: number): number {
  return start + (end - start) * factor;
}

export function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}