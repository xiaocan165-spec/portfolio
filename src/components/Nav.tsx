"use client";

import { useState, useEffect } from "react";

const NAV_ITEMS = [
  { id: "hero", label: "Home" },
  { id: "about", label: "About" },
  { id: "demo", label: "Demo" },
  { id: "tech", label: "Tech" },
  { id: "contact", label: "Contact" },
] as const;

export default function Nav() {
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        }
      },
      { rootMargin: "-50% 0px -50% 0px" }
    );

    NAV_ITEMS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav className="fixed top-0 inset-x-0 z-50 h-[48px] bg-[#0b0b0f]/80 backdrop-blur-xl border-b border-white/[0.06]">
      <div className="max-w-4xl mx-auto h-full flex items-center justify-between px-5">
        {/* Name */}
        <button
          onClick={() => scrollTo("hero")}
          className="flex items-center gap-2 text-[14px] font-semibold tracking-tight text-white/80 hover:text-white transition-colors"
        >
          {/* Robot icon */}
          <svg
            width="16" height="16" viewBox="0 0 16 16"
            fill="none" xmlns="http://www.w3.org/2000/svg"
            className="text-ios-blue shrink-0"
          >
            {/* Antenna */}
            <line x1="8" y1="1" x2="8" y2="3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
            <circle cx="8" cy="1" r="1" fill="currentColor" opacity="0.6" />
            {/* Head */}
            <rect x="3" y="3.5" width="10" height="7.5" rx="2" stroke="currentColor" strokeWidth="1.2" />
            {/* Eyes */}
            <circle cx="6" cy="6.5" r="1" fill="currentColor" opacity="0.7" />
            <circle cx="10" cy="6.5" r="1" fill="currentColor" opacity="0.7" />
            {/* Mouth */}
            <rect x="5.5" y="8.5" width="5" height="1.2" rx="0.6" fill="currentColor" opacity="0.35" />
            {/* Ears */}
            <rect x="1.8" y="5.5" width="1.5" height="3" rx="0.5" stroke="currentColor" strokeWidth="0.8" />
            <rect x="12.7" y="5.5" width="1.5" height="3" rx="0.5" stroke="currentColor" strokeWidth="0.8" />
          </svg>
          刘灿
        </button>

        {/* Links */}
        <div className="flex items-center gap-1">
          {NAV_ITEMS.map(({ id, label }) => (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              className={`text-[12px] sm:text-[13px] font-medium tracking-tight px-3 py-1.5 rounded-lg transition-colors ${
                activeSection === id
                  ? "text-white bg-white/[0.06]"
                  : "text-white/40 hover:text-white/70"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}
