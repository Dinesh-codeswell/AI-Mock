"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import CTAButton from "@/components/CTAButton";

// Practice with AI Mock Interviews section implemented per /C:/Users/Acer/Desktop/AI Mock/Why.json
export default function PracticeWithAIMock() {
  const [starting, setStarting] = useState(false);
  const [status, setStatus] = useState<string | null>(null);
  const router = useRouter();

  async function handleStartPractice() {
    // Send signed-in users directly to start page; otherwise login with intent
    const startPath = '/ai-interview/start';
    try {
      setStarting(true);
      setStatus(null);
      const res = await fetch('/api/auth/session', { cache: 'no-store' });
      const data = await res.json();
      if (data?.hasSession) {
        router.push(startPath);
        return;
      }
    } catch (_) {
      // proceed to unauthenticated flow
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
    setStarting(false);
  }

  return (
    <section
      aria-label="Practice with AI Mock Interviews"
      className="w-full bg-gradient-to-br from-white via-[#F7F2EB]/30 to-[#BAD6EB]/20 py-16 px-6 lg:px-16"
    >
      {/* Header */}
      <div className="mx-auto max-w-7xl text-center">
        <div className="mb-8">
          <h2 aria-label="Practice with AI Mock Interviews" className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#081F5C]">
            Practice with <span className="bg-gradient-to-r from-[#4ebbf8] to-[#334EAC] bg-clip-text text-transparent">AI Mock Interviews</span>
          </h2>
        </div>

        <p className="mx-auto max-w-3xl text-base md:text-lg text-black/70 leading-relaxed mb-8">
          Practice interviews anytime with an AI interviewer that delivers realistic questions and instant feedback.
          It adapts to your job description and experience level to help you refine your responses and build confidence.
          AI Mock Interview operates 24/7 without scheduling or preparation time.
        </p>

        <div className="mb-8">
          <CTAButton
            href="/ai-interview/start"
            ariaLabel="Take a free AI mock interview now"
            variant="brand"
            className="w-full sm:w-auto"
            onClick={async (e) => {
              e.preventDefault();
              setStarting(true);
              await handleStartPractice();
              setStarting(false);
            }}
          >
            {starting ? "Initializing..." : "Take a free AI mock interview now"}
          </CTAButton>
        </div>

        {status && (
          <p
            role="status"
            className="mx-auto"
            style={{
              fontFamily: "Arial, Helvetica, sans-serif",
              fontSize: 16,
              fontWeight: 400,
              color: "#2D2D2D",
              lineHeight: 1.65,
              marginBottom: 24,
              maxWidth: 900,
            }}
          >
            {status}
          </p>
        )}

        {/* Feature pills */}
        <div className="flex justify-center gap-4 flex-wrap mb-14">
          {["REALISTIC PRACTICE", "ACTIONABLE FEEDBACK", "MAXIMUM IMPACT"].map((text) => (
            <span
              key={text}
              className="px-4 py-2 border border-[#081F5C] text-[#081F5C] font-semibold rounded-full tracking-wide"
            >
              {text}
            </span>
          ))}
        </div>
      </div>

      {/* Cards removed per request: keep section header, description, CTA, and feature pills. */}
    </section>
  );
}