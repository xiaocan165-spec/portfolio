"use client";

import { useState, useEffect, useRef } from "react";

export default function BackToTop() {
  const [visible, setVisible] = useState(true);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const resetTimer = () => {
      setVisible(true);
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => setVisible(false), 3000);
    };

    // Show on mount, hide after 3s if no scroll
    timerRef.current = setTimeout(() => setVisible(false), 3000);

    window.addEventListener("scroll", resetTimer, { passive: true });

    return () => {
      window.removeEventListener("scroll", resetTimer);
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-8 right-8 z-40 p-3 rounded-full bg-white/[0.05] border border-white/[0.07] backdrop-blur-md transition-all duration-500 hover:bg-white/[0.10] hover:border-white/[0.14] ${
        visible
          ? "opacity-60 translate-y-0 pointer-events-auto"
          : "opacity-0 translate-y-2 pointer-events-none"
      }`}
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M3 10L8 5.5L13 10"
          stroke="rgba(255,255,255,0.65)"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}
