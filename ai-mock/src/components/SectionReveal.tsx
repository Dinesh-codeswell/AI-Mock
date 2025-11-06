"use client";
import React, { useEffect, useRef, useState } from "react";

type SectionRevealProps = {
  children: React.ReactNode;
  className?: string;
};

export default function SectionReveal({ children, className = "" }: SectionRevealProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setHasScrolled(true);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && hasScrolled) {
            setVisible(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.15 }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [hasScrolled]);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transition: "opacity 700ms cubic-bezier(0.22, 1, 0.36, 1)",
        willChange: "opacity",
      }}
    >
      {children}
    </div>
  );
}