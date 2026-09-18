"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */

import Link from "next/link";
import Script from "next/script";
import {
  useCallback,
  useEffect,
  useRef,
  useSyncExternalStore,
} from "react";

const THREE_CDN =
  "https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js";

const NODE_COUNT = 45;
const MOBILE_QUERY = "(max-width: 767px)";
const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

declare global {
  interface Window {
    THREE?: any;
  }
}

function subscribeToMobileQuery(callback: () => void) {
  if (typeof window === "undefined") {
    return () => {};
  }

  const mediaQuery = window.matchMedia(MOBILE_QUERY);
  mediaQuery.addEventListener("change", callback);

  return () => {
    mediaQuery.removeEventListener("change", callback);
  };
}

function getMobileSnapshot() {
  return typeof window !== "undefined"
    ? window.matchMedia(MOBILE_QUERY).matches
    : false;
}

function getServerMobileSnapshot() {
  return false;
}

function subscribeToReducedMotion(callback: () => void) {
  if (typeof window === "undefined") {
    return () => {};
  }

  const mediaQuery = window.matchMedia(REDUCED_MOTION_QUERY);
  mediaQuery.addEventListener("change", callback);

  return () => {
    mediaQuery.removeEventListener("change", callback);
  };
}

function getReducedMotionSnapshot() {
  return typeof window !== "undefined"
    ? window.matchMedia(REDUCED_MOTION_QUERY).matches
    : false;
}

function getServerReducedMotionSnapshot() {
  return false;
}

type CurrentlyBuildingInfo = {
  project?: string;
  status?: string;
  phase?: string;
  lastPublicUpdate?: string;
  technologies?: string[];
  description?: string;
};

const DEFAULT_CURRENT_BUILDING: Required<CurrentlyBuildingInfo> = {
  project: "JARVIS Agentic OS",
  status: "Active development",
  phase: "Portfolio publication layer",
  lastPublicUpdate: "2026-09-05",
  technologies: [
    "Obsidian",
    "Markdown",
    "Agentic Workflows",
    "Verification Systems",
  ],
  description:
    "Building a local-first AI engineering command center for project scanning, planning, governed tasks, verification, and knowledge management.",
};

export interface Hero3DProps {
  kicker?: string;
  headline?: string;
  subheadline?: string;
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  name?: string;
  professionalTitle?: string;
  currentlyBuilding?: CurrentlyBuildingInfo;
}

function formatPublicDate(value: string) {
  const [year, month, day] = value.split("-");
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const monthIndex = Number(month) - 1;

  if (
    !year ||
    !day ||
    monthIndex < 0 ||
    monthIndex >= months.length
  ) {
    return value;
  }

  return `${months[monthIndex]} ${Number(day)}, ${year}`;
}

export function Hero3D({
  kicker = "Live Agentic Engineering Portfolio",
  headline = "IT infrastructure.\nAutomation.\nAI-assisted engineering.",
  subheadline =
    "I design, operate, and improve practical IT systems — from infrastructure and networking to automation and governed AI workflows. Every result is reviewed, tested, and verified before it's called done.",
  primaryCta = {
    label: "View selected work",
    href: "/#work",
  },
  secondaryCta = {
    label: "Contact me",
    href: "/#contact",
  },
  name = "Marlon T. Argente",
  professionalTitle = "IT Specialist & Software Support Engineer",
  currentlyBuilding,
}: Hero3DProps) {
  const topologyRef = useRef<HTMLDivElement>(null);
  const cleanupTopologyRef = useRef<() => void>(() => {});

  const isMobile = useSyncExternalStore(
    subscribeToMobileQuery,
    getMobileSnapshot,
    getServerMobileSnapshot
  );

  const reducedMotion = useSyncExternalStore(
    subscribeToReducedMotion,
    getReducedMotionSnapshot,
    getServerReducedMotionSnapshot
  );

  const building =
    currentlyBuilding && currentlyBuilding.project
      ? {
          ...DEFAULT_CURRENT_BUILDING,
          ...currentlyBuilding,
          technologies:
            currentlyBuilding.technologies ??
            DEFAULT_CURRENT_BUILDING.technologies,
        }
      : DEFAULT_CURRENT_BUILDING;

  const headlineLines = headline
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

  const initTopology = useCallback(() => {
    cleanupTopologyRef.current();

    const container = topologyRef.current;
    const THREE = window.THREE;

    if (!container || !THREE) {
      return;
    }

    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      42,
      1,
      0.1,
      100
    );

    camera.position.z = isMobile ? 9.2 : 7.4;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "low-power",
    });

    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(
      Math.min(window.devicePixelRatio || 1, 1.5)
    );

    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";
    renderer.domElement.style.display = "block";

    container.appendChild(renderer.domElement);

    const group = new THREE.Group();
    scene.add(group);

    const nodes: any[] = [];
    const goldenAngle = Math.PI * (3 - Math.sqrt(5));

    for (let index = 0; index < NODE_COUNT; index += 1) {
      const normalized = index / (NODE_COUNT - 1);

      const y = 1 - normalized * 2;
      const horizontalRadius = Math.sqrt(
        Math.max(0, 1 - y * y)
      );

      const angle = goldenAngle * index;
      const shellRadius =
        3 + Math.sin(index * 1.73) * 0.16;

      nodes.push(
        new THREE.Vector3(
          Math.cos(angle) *
            horizontalRadius *
            shellRadius,
          y * shellRadius,
          Math.sin(angle) *
            horizontalRadius *
            shellRadius
        )
      );
    }

    const nodeGeometry =
      new THREE.BufferGeometry().setFromPoints(nodes);

    const nodeMaterial = new THREE.PointsMaterial({
      color: 0xe8a33d,
      size: isMobile ? 0.075 : 0.065,
      transparent: true,
      opacity: 0.82,
      depthWrite: false,
      sizeAttenuation: true,
    });

    const pointCloud = new THREE.Points(
      nodeGeometry,
      nodeMaterial
    );

    group.add(pointCloud);

    const lineVertices: number[] = [];
    const connectionDistance = 1.7;

    for (let a = 0; a < nodes.length; a += 1) {
      for (let b = a + 1; b < nodes.length; b += 1) {
        if (
          nodes[a].distanceTo(nodes[b]) <=
          connectionDistance
        ) {
          lineVertices.push(
            nodes[a].x,
            nodes[a].y,
            nodes[a].z,
            nodes[b].x,
            nodes[b].y,
            nodes[b].z
          );
        }
      }
    }

    const lineGeometry = new THREE.BufferGeometry();

    lineGeometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(
        lineVertices,
        3
      )
    );

    const lineMaterial =
      new THREE.LineBasicMaterial({
        color: 0x26333f,
        transparent: true,
        opacity: 0.72,
        depthWrite: false,
      });

    const connectionLines = new THREE.LineSegments(
      lineGeometry,
      lineMaterial
    );

    group.add(connectionLines);

    const resize = () => {
      const rect = container.getBoundingClientRect();
      const width = Math.max(rect.width, 1);
      const height = Math.max(rect.height, 1);

      renderer.setSize(width, height, false);

      camera.aspect = width / height;
      camera.updateProjectionMatrix();

      renderer.render(scene, camera);
    };

    let pointerX = 0;
    let pointerY = 0;

    const handlePointerMove = (
      event: PointerEvent
    ) => {
      const rect = container.getBoundingClientRect();

      if (
        rect.width <= 0 ||
        rect.height <= 0
      ) {
        return;
      }

      pointerX =
        ((event.clientX - rect.left) /
          rect.width -
          0.5) *
        0.5;

      pointerY =
        ((event.clientY - rect.top) /
          rect.height -
          0.5) *
        0.35;
    };

    resize();

    let animationFrame = 0;
    let autoRotation = 0;

    const animate = () => {
      autoRotation += 0.00125;

      group.rotation.y =
        autoRotation + pointerX * 0.35;

      group.rotation.x +=
        (pointerY * 0.22 -
          group.rotation.x) *
        0.025;

      renderer.render(scene, camera);

      animationFrame =
        window.requestAnimationFrame(animate);
    };

    if (reducedMotion) {
      group.rotation.x = -0.06;
      group.rotation.y = 0.22;
      renderer.render(scene, camera);
    } else {
      window.addEventListener(
        "pointermove",
        handlePointerMove,
        { passive: true }
      );

      animationFrame =
        window.requestAnimationFrame(animate);
    }

    window.addEventListener("resize", resize);

    cleanupTopologyRef.current = () => {
      if (animationFrame) {
        window.cancelAnimationFrame(
          animationFrame
        );
      }

      window.removeEventListener(
        "pointermove",
        handlePointerMove
      );

      window.removeEventListener(
        "resize",
        resize
      );

      nodeGeometry.dispose();
      nodeMaterial.dispose();
      lineGeometry.dispose();
      lineMaterial.dispose();
      renderer.dispose();

      if (
        renderer.domElement.parentElement ===
        container
      ) {
        container.removeChild(
          renderer.domElement
        );
      }
    };
  }, [isMobile, reducedMotion]);

  useEffect(() => {
    if (window.THREE) {
      initTopology();
    }

    return () => {
      cleanupTopologyRef.current();
    };
  }, [initTopology]);

  return (
    <section
      id="hero"
      className="scroll-mt-24 relative overflow-hidden  lg:min-h-[calc(100svh-4rem)]"
      aria-label="Hero section"
    >
      <Script
        src={THREE_CDN}
        strategy="afterInteractive"
        onLoad={initTopology}
      />

      <div
        ref={topologyRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 opacity-50"
        style={{
          WebkitMaskImage:
            "linear-gradient(to bottom, black 0%, black 68%, transparent 100%)",
          maskImage:
            "linear-gradient(to bottom, black 0%, black 68%, transparent 100%)",
        }}
      />

      <div className="relative z-10 mx-auto w-full max-w-[1520px] px-5 py-12 sm:px-8 sm:py-14 md:py-16 lg:min-h-[calc(100svh-4rem)] lg:px-10 lg:py-16 lg:flex lg:items-center">
        <div className="grid w-full grid-cols-1 items-start gap-12 lg:grid-cols-[minmax(0,1.55fr)_minmax(340px,0.75fr)] lg:gap-14">
          <div className="min-w-0 lg:pt-6">
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-accent">
              {kicker}
            </p>

            <p className="mt-4 font-mono text-xs text-faint sm:text-sm">
              {name}
              <span className="mx-2 text-line">
                ·
              </span>
              {professionalTitle}
            </p>

            <h1 className="mt-8 max-w-5xl font-heading text-[2.7rem] font-semibold leading-[0.98] tracking-[-0.045em] sm:text-5xl lg:text-[4rem] xl:text-[4.6rem]">
              {headlineLines.map(
                (line, index) => {
                  const isLast =
                    index ===
                    headlineLines.length - 1;

                  return (
                    <span
                      key={line}
                      className={`block ${
                        isLast
                          ? "text-accent"
                          : "text-foreground"
                      }`}
                    >
                      {line}
                    </span>
                  );
                }
              )}
            </h1>

            <p className="mt-7 max-w-2xl text-base leading-7 text-muted sm:text-lg sm:leading-8">
              {subheadline}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href={primaryCta.href}
                className="rounded-[4px] border border-accent bg-accent px-5 py-3 text-sm font-semibold text-background transition-colors hover:bg-[#d89432]"
              >
                {primaryCta.label}
              </Link>

              <Link
                href={secondaryCta.href}
                className="rounded-[4px] border border-line bg-transparent px-5 py-3 text-sm font-semibold text-foreground transition-colors hover:border-accent hover:text-accent"
              >
                {secondaryCta.label}
              </Link>
            </div>
          </div>

          <aside className="space-y-4">
            <div className="rounded-[6px] border border-line bg-surface p-6 sm:p-7">
              <div className="flex items-start justify-between gap-6">
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-faint">
                    Currently building
                  </p>

                  <h2 className="mt-5 text-[21px] font-semibold tracking-tight text-foreground">
                    {building.project}
                  </h2>
                </div>

                <span className="mt-0.5 inline-flex shrink-0 items-center gap-2 font-mono text-[10px] tracking-[0.08em] text-success">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-40" />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-success" />
                  </span>
                  Live
                </span>
              </div>

              <p className="mt-1 font-mono text-xs text-accent">
                {building.status}
              </p>

              <dl className="mt-6 space-y-3">
                <div className="grid grid-cols-[120px_1fr] items-baseline gap-4">
                  <dt className="text-sm text-faint">
                    Current phase
                  </dt>

                  <dd className="text-right text-sm text-muted">
                    {building.phase}
                  </dd>
                </div>

                <div className="grid grid-cols-[120px_1fr] items-baseline gap-4">
                  <dt className="text-sm text-faint">
                    Last public update
                  </dt>

                  <dd className="text-right text-sm text-muted">
                    {formatPublicDate(
                      building.lastPublicUpdate
                    )}
                  </dd>
                </div>
              </dl>

              <div className="mt-4 flex flex-wrap gap-2">
                {building.technologies.map(
                  (technology) => (
                    <span
                      key={technology}
                      className="rounded-full border border-line bg-transparent px-3 py-1 font-mono text-[10px] text-muted"
                    >
                      {technology}
                    </span>
                  )
                )}
              </div>

              <p className="mt-6 text-sm leading-6 text-muted">
                {building.description}
              </p>

              <p className="mt-6 border-t border-line-soft/70 pt-5 font-mono text-[10px] leading-5 text-faint">
                A controlled public view of current
                work — never private implementation
                details.
              </p>
            </div>

            <div className="media-placeholder rounded-[4px] border border-dashed border-line bg-background/70 p-5">
              <div className="flex min-h-24 items-center justify-center gap-3 text-faint">
                <svg
                  aria-hidden="true"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect
                    x="3"
                    y="4"
                    width="18"
                    height="16"
                    rx="2"
                  />
                  <circle
                    cx="8.5"
                    cy="9"
                    r="1.5"
                  />
                  <path d="m4 17 5-5 4 4 2-2 5 4" />
                </svg>

                <div>
                  <p className="text-sm text-muted">
                    Photo or demo clip goes here.
                  </p>

                  <p className="mt-1 text-sm text-faint">
                    Real headshot or screen recording placeholder
                  </p>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}