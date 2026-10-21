"use client";

import { useEffect, useRef } from "react";

const CHARS = "01<>/\\{}[];:=+*#$%&";
const FONT_SIZE = 14;
const FRAME_MS = 60;

export default function MatrixRain({ className = "matrix-rain", opacity = 0.45 }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = canvas.getContext("2d");
    let width = 0;
    let height = 0;
    let drops = [];
    let rafId = 0;
    let last = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const columns = Math.ceil(width / FONT_SIZE);
      drops = Array.from({ length: columns }, () => Math.random() * -50);

      ctx.fillStyle = "#000";
      ctx.fillRect(0, 0, width, height);
    };

    const draw = (time) => {
      rafId = requestAnimationFrame(draw);
      if (time - last < FRAME_MS) return;
      last = time;

      // trail memudar
      ctx.fillStyle = "rgba(0, 0, 0, 0.09)";
      ctx.fillRect(0, 0, width, height);
      ctx.font = `${FONT_SIZE}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const char = CHARS[Math.floor(Math.random() * CHARS.length)];
        const x = i * FONT_SIZE;
        const y = drops[i] * FONT_SIZE;

        // sesekali karakter "head" putih terang, sisanya abu-abu
        ctx.fillStyle = Math.random() > 0.96 ? "#ffffff" : "#b8b8b8";
        ctx.fillText(char, x, y);

        if (y > height && Math.random() > 0.975) drops[i] = 0;
        drops[i] += 1;
      }
    };

    resize();
    rafId = requestAnimationFrame(draw);
    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden="true" className={className} style={{ opacity }} />;
}
