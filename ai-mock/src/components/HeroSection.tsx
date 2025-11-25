// HeroSection component
"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useMemo, useState, useRef } from "react";
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
import lottie from "lottie-web";
import { createClient as createSupabase } from "../lib/supabase-client";

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
  ctaLink = "/ai-interview/start",
}: HeroSectionProps) {
  const router = useRouter();
  const typingText = "AI Powered Practice";
  const [displayText, setDisplayText] = useState("");
  const [phase, setPhase] = useState<"typing" | "pausing" | "deleting">("typing");
  const [index, setIndex] = useState(0);
  const [caretVisible, setCaretVisible] = useState(true);
  const animationContainerRef = useRef<HTMLDivElement | null>(null);
  const [isSignedIn, setIsSignedIn] = useState<boolean>(false);

  const brandCaret = "#334EAC";

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

  // Initialize Lottie animation in the hero visual container
  useEffect(() => {
    if (!animationContainerRef.current) return;

    const animation = lottie.loadAnimation({
      container: animationContainerRef.current,
      renderer: "svg",
      loop: true,
      autoplay: true,
      path: encodeURI("/Man and robot with computers sitting together in workplace.json"),
      rendererSettings: {
        // Use 'meet' to keep full visual in bounds and avoid cropping
        preserveAspectRatio: "xMidYMid meet",
        progressiveLoad: true,
        hideOnTransparent: true,
      },
    });

    // Restore original speed for natural motion
    animation.setSpeed(0.6);

    return () => {
      animation.destroy();
    };
  }, []);

  // Detect auth state for dynamic CTA labeling
  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const supabase = createSupabase();
        const { data } = await supabase.auth.getSession();
        if (mounted) {
          setIsSignedIn(!!data.session);
        }
      } catch (err) {
        // Fallback: try server session endpoint if available
        try {
          const res = await fetch('/api/auth/session', { cache: 'no-store' });
          const json = await res.json();
          if (mounted) setIsSignedIn(!!json?.hasSession);
        } catch {}
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <section id="hero-section" className="w-full bg-gradient-to-br from-white via-[#F7F2EB]/30 to-[#BAD6EB]/20">
      {/* Restore 50/50 horizontal layout with sensible spacing */}
      <div className="max-w-7xl mx-auto px-6 lg:px-16 py-12 lg:py-20 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        {/* Left column */}
        <div className="flex flex-col justify-center space-y-7 lg:pr-8">
          <div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-[#081F5C] leading-tight tracking-tight">
              <span style={{ display: "block", whiteSpace: "nowrap" }}>Master your</span>
              <span style={{ display: "block", whiteSpace: "nowrap" }}>next interview with</span>
              {/* Use solid brand color for typed text to avoid background-clip rendering glitches during dynamic updates */}
              <span className="text-[#334EAC] block whitespace-nowrap">
                {displayText}
                <span
                  className="inline-block align-middle"
                  style={{
                    width: 0,
                    height: "1em",
                    borderLeft: `3px solid ${brandCaret}`,
                    marginLeft: 8,
                    opacity: caretVisible ? 1 : 0,
                  }}
                  aria-hidden="true"
                />
              </span>
            </h1>
          </div>

          <p className="text-base md:text-lg lg:text-xl text-black/70 leading-relaxed max-w-xl">
            {subtitle}
          </p>

          {/* CTA with improved vertical spacing for a professional look */}
          <div className="flex flex-col sm:flex-row items-center gap-4 mt-4">
            <CTAButton
              href={ctaLink}
              ariaLabel="Start practicing mock interviews"
              variant="brand"
              onClick={async (e: React.MouseEvent) => {
                e.preventDefault();
                const startPath = '/ai-interview/start';
                try {
                  const res = await fetch('/api/auth/session', { cache: 'no-store' });
                  const data = await res.json();
                  if (data?.hasSession) {
                    router.push(startPath);
                    return;
                  }
                } catch (_) {
                  // fall through to unauthenticated flow
                }

                try {
                  if (typeof window !== 'undefined') {
                    sessionStorage.setItem('redirectAfterSignup', startPath);
                  }
                  await fetch('/auth/set-intent', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ intent: startPath })
                  });
                } catch (_) {
                  // Non-blocking
                }
                router.push(`/login?redirectTo=${encodeURIComponent(startPath)}`);
              }}
            >
              {isSignedIn ? "Start practice free" : "Explore now"}
              <ArrowRight className="ml-2" size={22} aria-hidden="true" />
            </CTAButton>
          </div>
          <div className="mt-6 flex flex-col sm:flex-row gap-4 text-sm text-gray-500">
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

        {/* Right column: Lottie animation aligned to half-width column */}
        <div className="w-full flex items-center justify-center p-2 lg:p-3">
          <div
            className="w-full max-w-[640px]"
            style={{
              width: "100%",
              aspectRatio: "4 / 3",
              background: "transparent",
            }}
          >
            <div
              ref={animationContainerRef}
              className="w-full h-full"
              style={{
                mixBlendMode: "normal",
                opacity: 1,
                filter:
                  "drop-shadow(0 6px 18px rgba(0,0,0,0.08)) contrast(1.08) saturate(1.06)",
                willChange: "transform",
                pointerEvents: "none",
                // Restore original scale for proper alignment
                transform: "scale(1)",
                transformOrigin: "center",
              }}
              aria-label="AI mock interview animated hero visual"
              role="img"
            />
          </div>
        </div>
      </div>
    </section>
  );
}