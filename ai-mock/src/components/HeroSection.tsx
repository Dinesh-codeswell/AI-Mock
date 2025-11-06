"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useMemo, useState } from "react";
import {
  ArrowRight,
  CheckCircle,
  Users,
  Video,
  Bot,
  HelpCircle,
  Star,
  MessageCircle,
} from "lucide-react";
import CTAButton from "@/components/CTAButton";

type HeroSectionProps = {
  title?: string;
  subtitle?: string;
  ctaText?: string;
  ctaLink?: string;
};

export default function HeroSection({
  title = "Master Your Next Interview with AI-Powered Practice",
  subtitle =
    "Get real-time feedback, personalized questions, and detailed performance analytics to land your dream job.",
  ctaText = "Start Practicing Free",
  ctaLink = "/start",
}: HeroSectionProps) {
  const typingText = "AI Powered Practice";
  const [displayText, setDisplayText] = useState("");
  const [phase, setPhase] = useState<"typing" | "pausing" | "deleting">("typing");
  const [index, setIndex] = useState(0);
  const [caretVisible, setCaretVisible] = useState(true);

  const orangeAccent = "#EA580C"; // Tailwind orange-600, matching CTA gradient end color

  useEffect(() => {
    const blink = window.setInterval(() => setCaretVisible((v) => !v), 600);
    let timer: number;
    if (phase === "typing") {
      if (index < typingText.length) {
        timer = window.setTimeout(() => {
          setDisplayText((prev) => prev + typingText[index]);
          setIndex((i) => i + 1);
        }, 60);
      } else {
        timer = window.setTimeout(() => setPhase("pausing"), 1200);
      }
    } else if (phase === "pausing") {
      timer = window.setTimeout(() => setPhase("deleting"), 800);
    } else if (phase === "deleting") {
      if (displayText.length > 0) {
        timer = window.setTimeout(() => {
          setDisplayText((prev) => prev.slice(0, -1));
        }, 40);
      } else {
        setIndex(0);
        setPhase("typing");
      }
    }
    return () => {
      window.clearTimeout(timer);
      window.clearInterval(blink);
    };
  }, [phase, index, displayText, typingText]);

  return (
    <section id="hero-section" className="w-full bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8 lg:py-12 grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-6 lg:gap-8 items-center">
        {/* Left column */}
        <div className="flex flex-col justify-center space-y-7 lg:pr-7">
          <div style={{ maxWidth: "26ch" }}>
            <h1
              className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight tracking-tight"
              style={{ fontFamily: "Georgia, 'Times New Roman', serif", color: "#2D2D2D", letterSpacing: "-0.02em", lineHeight: "1.1" }}
            >
              <span style={{ display: "block", whiteSpace: "nowrap" }}>Master with your</span>
              <span style={{ display: "block", whiteSpace: "nowrap" }}>next interview with</span>
              <span style={{ color: orangeAccent, display: "block", whiteSpace: "nowrap" }}>
                {displayText}
                <span
                  className="inline-block align-middle"
                  style={{
                    width: 0,
                    height: "1em",
                    borderLeft: `3px solid ${orangeAccent}`,
                    marginLeft: 8,
                    opacity: caretVisible ? 1 : 0,
                  }}
                  aria-hidden="true"
                />
              </span>
            </h1>
          </div>

          <p
            className="text-base md:text-lg leading-relaxed max-w-xl"
            style={{ fontFamily: "Arial, Helvetica, sans-serif", color: "#5A5A5A", lineHeight: "1.6" }}
          >
            {subtitle}
          </p>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <CTAButton href={ctaLink} ariaLabel="Start practicing mock interviews">
              {ctaText}
              <ArrowRight className="ml-2" size={22} aria-hidden="true" />
            </CTAButton>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <CheckCircle aria-hidden="true" />
              <span>No credit card required</span>
            </div>
            <div className="flex items-center gap-2">
              <Users aria-hidden="true" />
              <span>10,000+ interviews completed</span>
            </div>
          </div>
        </div>

        {/* Right column illustration (adjusted for new hero text layout) */}
        <div className="w-full flex items-center justify-center p-2 lg:p-4">
          <div className="w-full max-w-[520px]">
            <Image
              src="/hero-generated.png"
              alt="Hero illustration for AI mock interviews"
              width={520}
              height={360}
              priority
              quality={90}
              unoptimized
              sizes="(min-width: 1024px) 520px, 84vw"
              className="rounded-2xl shadow-lg"
              style={{ objectFit: "contain" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}