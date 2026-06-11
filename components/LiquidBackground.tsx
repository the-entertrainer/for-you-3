"use client";

import { useEffect, useRef } from "react";

/**
 * Subtle liquid background canvas.
 * Very low opacity flowing "glass" orbs + soft noise for a living, breathing dark liquid feel.
 * "Now playing in your heart" text integrated subtly.
 */
export function LiquidBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let raf = 0;
    let t = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.scale(dpr, dpr);
    };

    resize();
    window.addEventListener("resize", resize);

    const orbs = Array.from({ length: 5 }, (_, i) => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      r: 120 + Math.random() * 180,
      speed: 0.0008 + Math.random() * 0.0012,
      phase: i * 1.7,
      alpha: 0.035 + Math.random() * 0.025,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width / (window.devicePixelRatio || 1), canvas.height / (window.devicePixelRatio || 1));

      const w = window.innerWidth;
      const h = window.innerHeight;

      // Very subtle dark liquid orbs
      ctx.globalCompositeOperation = "screen";

      orbs.forEach((orb, i) => {
        const x = orb.x + Math.sin(t * orb.speed + orb.phase) * (60 + i * 8);
        const y = orb.y + Math.cos(t * orb.speed * 0.8 + orb.phase * 1.3) * (40 + i * 12);

        const grad = ctx.createRadialGradient(x, y, orb.r * 0.2, x, y, orb.r);
        grad.addColorStop(0, `rgba(165, 180, 252, ${orb.alpha})`); // soft indigo tint
        grad.addColorStop(0.5, `rgba(180, 170, 220, ${orb.alpha * 0.6})`);
        grad.addColorStop(1, "rgba(5,5,5,0)");

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(x, y, orb.r, 0, Math.PI * 2);
        ctx.fill();
      });

      ctx.globalCompositeOperation = "source-over";

      // Extremely subtle liquid "now playing in your heart" text
      ctx.save();
      ctx.fillStyle = "rgba(255,255,255,0.035)";
      ctx.font = "500 13px var(--font-geist-mono, monospace)";
      ctx.textAlign = "center";
      ctx.fillText(
        "now playing in your heart",
        w / 2,
        h * 0.92 + Math.sin(t * 0.6) * 1.5
      );
      ctx.restore();

      t += 1;
      raf = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-10 pointer-events-none"
      style={{ opacity: 0.65, mixBlendMode: "normal" }}
    />
  );
}
