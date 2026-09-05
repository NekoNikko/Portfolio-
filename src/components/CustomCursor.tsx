import { useEffect, useState } from "react";

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [trail, setTrail] = useState({ x: -100, y: -100 });
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Only enable on desktop
    const isDesktop = window.matchMedia("(min-width: 1024px)").matches;
    if (!isDesktop) return;

    setVisible(true);
    document.body.classList.add("custom-cursor-active");

    const moveCursor = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseDown = () => setClicked(true);
    const handleMouseUp = () => setClicked(false);

    // Event listener to check for interactive hover elements
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === "BUTTON" ||
        target.tagName === "A" ||
        target.closest("button") ||
        target.closest("a") ||
        target.classList.contains("interactive") ||
        target.closest(".interactive")
      ) {
        setHovered(true);
      } else {
        setHovered(false);
      }
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("mouseover", handleMouseOver);
      document.body.classList.remove("custom-cursor-active");
    };
  }, []);

  // Smooth trail effect
  useEffect(() => {
    if (!visible) return;
    let reqId: number;
    
    const updateTrail = () => {
      setTrail((prev) => {
        const dx = position.x - prev.x;
        const dy = position.y - prev.y;
        // Adjust the ease factor to control lag speed (0.15 is smooth)
        return {
          x: prev.x + dx * 0.15,
          y: prev.y + dy * 0.15
        };
      });
      reqId = requestAnimationFrame(updateTrail);
    };
    
    updateTrail();
    return () => cancelAnimationFrame(reqId);
  }, [position, visible]);

  if (!visible) return null;

  return (
    <>
      {/* Inner solid dot */}
      <div
        id="custom-cursor-dot"
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-accent pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 transition-transform duration-100 ease-out"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: `translate(-50%, -50%) scale(${clicked ? 0.6 : hovered ? 1.5 : 1})`,
        }}
      />
      {/* Outer lazy trail circle */}
      <div
        id="custom-cursor-ring"
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-primary pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ease-out"
        style={{
          left: `${trail.x}px`,
          top: `${trail.y}px`,
          transform: `translate(-50%, -50%) scale(${clicked ? 0.8 : hovered ? 1.8 : 1})`,
          backgroundColor: hovered ? "rgba(37, 99, 235, 0.08)" : "transparent",
          borderColor: hovered ? "#06b6d4" : "#2563eb",
        }}
      />
    </>
  );
}
