"use client";

import { forwardRef, useEffect, useRef, useState } from "react";
import { useElementScroll, useReducedMotion } from "@/lib/scroll";

export interface ParallaxLayerProps extends React.HTMLAttributes<HTMLDivElement> {
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
      scaleRange = [1, 1.1],
      fade = false,
      opacityRange = [0.3, 1],
      className = "",
      children,
    },
    ref
  ) => {
    const layerRef = useRef<HTMLDivElement>(null);
    const combinedRef = (node: HTMLDivElement | null) => {
      layerRef.current = node;
      if (ref) {
        if (typeof ref === "function") ref(node);
        else ref.current = node;
      }
    };

    const reducedMotion = useReducedMotion();
    const { progress, isInView } = useElementScroll(layerRef, {
      rootMargin: "100% 0px",
      threshold: [0, 0.1, 0.25, 0.5, 0.75, 0.9, 1],
    });

    const [style, setStyle] = useState<React.CSSProperties>({});

    useEffect(() => {
      if (reducedMotion) {
        setStyle({});
        return;
      }

      // Progress goes from 0 (element bottom at viewport top) to 1 (element top at viewport top)
      // For parallax, we want the element to move opposite to scroll direction
      // At progress 0 (just entering), translateY = 0
      // At progress 1 (leaving), translateY = -viewportHeight * speed
      const translateY = -progress * window.innerHeight * speed;

      let scaleValue = 1;
      if (scale) {
        scaleValue = scaleRange[0] + (scaleRange[1] - scaleRange[0]) * progress;
      }

      let opacityValue = 1;
      if (fade) {
        opacityValue = opacityRange[1] - (opacityRange[1] - opacityRange[0]) * progress;
      }

      setStyle({
        transform: `translate3d(0, ${translateY}px, 0) scale(${scaleValue})`,
        opacity: opacityValue,
        willChange: "transform, opacity",
      });
    }, [progress, speed, scale, scaleRange, fade, opacityRange, reducedMotion]);

    return (
      <div
        ref={combinedRef}
        style={{
          position: "absolute",
          inset: 0,
          zIndex,
          pointerEvents: "none",
          ...style,
        } as React.CSSProperties}
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
  threshold = [0, 0.1, 0.25, 0.5, 0.75, 0.9, 1],
  children,
  className = "",
}: ScrollProgressProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const { progress, isInView } = useElementScroll(ref, { rootMargin, threshold });

  useEffect(() => {
    if (onProgress) onProgress(progress);
  }, [onProgress, progress]);

  if (reducedMotion) {
    return <div ref={ref} className={className}>{children(1, true)}</div>;
  }

  return <div ref={ref} className={className}>{children(progress, isInView)}</div>;
}