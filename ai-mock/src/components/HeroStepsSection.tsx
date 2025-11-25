"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

/**
 * Hero section with steps implemented per /C:/Users/Acer/Desktop/AI Mock/news.json
 * Strict adherence to typography, colors, spacing, and responsive behavior.
 */
export default function HeroStepsSection() {
  const [starting, setStarting] = useState(false);
  const [status, setStatus] = useState<string | null>(null);
  const router = useRouter();

  const steps = [
    {
      number: "1",
      title: "Sign Up",
      description:
        "Register for a complimentary account on our AI interview platform.",
    },
    {
      number: "2",
      title: "Upload Details",
      description:
        "Submit your resume and target job description for customized question generation.",
    },
    {
      number: "3",
      title: "Choose Your Role",
      description:
        "Access personalized AI interview sessions tailored to your specific industry and position.",
    },
    {
      number: "4",
      title: "Practice",
      description:
        "Launch an AI-powered mock interview, respond to questions, and receive real-time feedback.",
    },
    {
      number: "5",
      title: "Enhance",
      description:
        "Analyze AI-generated insights to improve your answers and maximize your interview performance.",
    },
  ];

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
      aria-label="How to master AI mock interviews"
      style={{
        width: "100%",
        background: "linear-gradient(135deg, #E8E4F3 0%, #F5F3FF 50%, #E0F7FA 100%)",
        paddingTop: "32px",
        paddingBottom: "40px",
        paddingLeft: "5%",
        paddingRight: "5%",
      }}
      className=""
    >
      <div className="mx-auto max-w-[1200px] text-center">
        <h1
          className="mx-auto"
          style={{
            fontFamily: "Georgia, Times New Roman, serif",
            fontSize: "32px",
            fontWeight: 600,
            color: "#2D2D2D",
            lineHeight: 1.2,
            letterSpacing: "0.5px",
            marginBottom: "16px",
          }}
        >
          Master AI Mock Interviews in Under 2 Minutes
        </h1>

        <p
          className="mx-auto"
          style={{
            fontFamily: "Arial, Helvetica, sans-serif",
            fontSize: "14px",
            fontWeight: 400,
            color: "#5A5A5A",
            lineHeight: 1.6,
            marginBottom: "20px",
            opacity: 0.95,
            maxWidth: "900px",
          }}
        >
          Our intelligent interview preparation platform simplifies your interview readiness and boosts
          your confidence for real-world success.
        </p>

        <button
          onClick={handleStartPractice}
          aria-label="Start your free practice now"
          style={{
            background: "linear-gradient(to right, #F97316, #EA580C)",
            color: "#FFFFFF",
            fontFamily: "Arial, Helvetica, sans-serif",
            fontSize: "16px",
            fontWeight: 600,
            paddingTop: "12px",
            paddingBottom: "12px",
            paddingLeft: "28px",
            paddingRight: "28px",
            borderRadius: "8px",
            border: "none",
            marginBottom: "32px",
            boxShadow: "0 4px 12px rgba(249, 115, 22, 0.3)",
            cursor: "pointer",
            transition: "all 0.3s ease",
          }}
          className="inline-block focus:outline-none focus:ring-4 focus:ring-orange-500/30 active:translate-y-[1px]"
          onMouseEnter={(e) => {
            const el = e.currentTarget;
            el.style.background = "linear-gradient(to right, #EA580C, #C2410C)";
            el.style.transform = "translateY(-2px)";
            el.style.boxShadow = "0 6px 16px rgba(234, 88, 12, 0.4)";
          }}
          onMouseLeave={(e) => {
            const el = e.currentTarget;
            el.style.background = "linear-gradient(to right, #F97316, #EA580C)";
            el.style.transform = "translateY(0)";
            el.style.boxShadow = "0 4px 12px rgba(249, 115, 22, 0.3)";
          }}
        >
          {starting ? "Initializing..." : "Start Your Free Practice Now"}
        </button>

        {status && (
          <p
            role="status"
            className="mx-auto"
            style={{
              fontFamily: "Arial, Helvetica, sans-serif",
              fontSize: "14px",
              fontWeight: 400,
              color: "#2D2D2D",
              lineHeight: 1.6,
              marginBottom: "16px",
              maxWidth: "900px",
            }}
          >
            {status}
          </p>
        )}
      </div>

      {/* Steps Section */}
      <div
        className="mx-auto"
        style={{ maxWidth: "1400px" }}
      >
        <div
          className="flex justify-between items-start gap-[40px] flex-wrap md:flex-nowrap md:gap-[60px]"
        >
          {steps.map((s) => (
            <div key={s.number} className="min-w-[220px]">
              <div
                aria-hidden
                style={{
                  backgroundColor: "#FFFFFF",
                  color: "#EA580C",
                  fontSize: "20px",
                  fontWeight: 700,
                  width: "44px",
                  height: "44px",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "14px",
                  boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
                }}
              >
                {s.number}
              </div>
              <h3
                style={{
                  fontFamily: "Arial, Helvetica, sans-serif",
                  fontSize: "18px",
                  fontWeight: 600,
                  color: "#2D2D2D",
                  marginBottom: "8px",
                  lineHeight: 1.3,
                }}
              >
                {s.title}
              </h3>
              <p
                style={{
                  fontFamily: "Arial, Helvetica, sans-serif",
                  fontSize: "14px",
                  fontWeight: 400,
                  color: "#2D2D2D",
                  lineHeight: 1.6,
                  opacity: 0.9,
                  maxWidth: "250px",
                }}
              >
                {s.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}