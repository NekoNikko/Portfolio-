"use client";

import { forwardRef, useEffect, useRef } from "react";
import { useElementScroll, useReducedMotion } from "@/lib/scroll";

const PARALLAX_THRESHOLDS: number[] = [0, 0.1, 0.25, 0.5, 0.75, 0.9, 1];
const DEFAULT_SCALE_RANGE: [number, number] = [1, 1.1];
const DEFAULT_OPACITY_RANGE: [number, number] = [0.3, 1];

export interface ParallaxLayerProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /** Speed factor: 0 = fixed, 0.5 = half scroll speed, 1 = normal, >1 = faster */
  speed?: number;
  /** Z-index layer for depth ordering */
  zIndex?: number;
  /** Whether to apply scale transform */
  scale?: boolean;
  /** Scale range [min, max] */
  scaleRange?: [number, number];
  /** Whether to apply opacity fade */
  fade?: boolean;
  /** Opacity range [min, max] */
  opacityRange?: [number, number];
  /** Absolute for decorative layers, flow for interactive/content layers */
  layout?: "absolute" | "flow";
  /** Additional className */
  className?: string;
  /** Children content */
  children: React.ReactNode;
}

export const ParallaxLayer = forwardRef<HTMLDivElement, ParallaxLayerProps>(
  (
    {
      speed = 0.5,
      zIndex = 0,
      scale = false,
      scaleRange = DEFAULT_SCALE_RANGE,
      fade = false,
      opacityRange = DEFAULT_OPACITY_RANGE,
      layout = "absolute",
      className = "",
      children,
    },
    ref
  ) => {
    const layerRef = useRef<HTMLDivElement>(null);

    const combinedRef = (node: HTMLDivElement | null) => {
      layerRef.current = node;

      if (ref) {
        if (typeof ref === "function") {
          ref(node);
        } else {
          ref.current = node;
        }
      }
    };

    const reducedMotion = useReducedMotion();

    const { progress } = useElementScroll(layerRef, {
      rootMargin: "100% 0px",
      threshold: PARALLAX_THRESHOLDS,
    });
    const viewportHeight =
      typeof window === "undefined"
        ? 0
        : window.innerHeight;

    const translateY =
      -progress * viewportHeight * speed;

    const scaleValue = scale
      ? scaleRange[0] +
        (scaleRange[1] - scaleRange[0]) * progress
      : 1;

    const opacityValue = fade
      ? opacityRange[1] -
        (opacityRange[1] - opacityRange[0]) * progress
      : 1;

    const style: React.CSSProperties = reducedMotion
      ? {}
      : {
          transform: `translate3d(0, ${translateY}px, 0) scale(${scaleValue})`,
          opacity: opacityValue,
          willChange: "transform, opacity",
        };

    return (
      <div
        ref={combinedRef}
        style={{
          position: layout === "flow" ? "relative" : "absolute",
          ...(layout === "absolute" ? { inset: 0 } : {}),
          zIndex,
          pointerEvents: layout === "flow" ? "auto" : "none",
          ...style,
        }}
        className={className}
      >
        {children}
      </div>
    );
  }
);

ParallaxLayer.displayName = "ParallaxLayer";

export interface ScrollProgressProps {
  /** Callback fired with progress (0-1) */
  onProgress?: (progress: number) => void;
  /** Root margin for intersection observer */
  rootMargin?: string;
  /** Threshold for intersection observer */
  threshold?: number | number[];
  children: (progress: number, isInView: boolean) => React.ReactNode;
  className?: string;
}

export function ScrollProgress({
  onProgress,
  rootMargin = "0px",
  threshold = PARALLAX_THRESHOLDS,
  children,
  className = "",
}: ScrollProgressProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  const { progress, isInView } = useElementScroll(ref, {
    rootMargin,
    threshold,
  });

  useEffect(() => {
    if (onProgress) {
      onProgress(progress);
    }
  }, [onProgress, progress]);

  if (reducedMotion) {
    return (
      <div ref={ref} className={className}>
        {children(1, true)}
      </div>
    );
  }

  return (
    <div ref={ref} className={className}>
      {children(progress, isInView)}
    </div>
  );
}