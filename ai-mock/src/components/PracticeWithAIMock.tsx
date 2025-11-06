"use client";

import React, { useState } from "react";

// Practice with AI Mock Interviews section implemented per /C:/Users/Acer/Desktop/AI Mock/Why.json
export default function PracticeWithAIMock() {
  const [starting, setStarting] = useState(false);
  const [status, setStatus] = useState<string | null>(null);

  const cards = [
    {
      roleTitle: "AI Engineer",
      description:
        "Prepare for your Microsoft AI Engineer interview with practice questions to boost confidence.",
      companyName: "Microsoft",
      background: "linear-gradient(135deg, #FFD7A8 0%, #FFA94D 100%)",
    },
    {
      roleTitle: "Platform Engineer",
      description:
        "Prepare for your Netflix Platform Engineer interview with practice questions to boost confidence.",
      companyName: "Netflix",
      background: "linear-gradient(135deg, #FFB6E5 0%, #FF6EC7 100%)",
    },
    {
      roleTitle: "Research Engineer",
      description:
        "Prepare for your OpenAI Research Engineer interview with practice questions to boost confidence.",
      companyName: "OpenAI",
      background: "linear-gradient(135deg, #B8C7E0 0%, #8BA3C7 100%)",
    },
    {
      roleTitle: "AI Engineer",
      description:
        "Prepare for your McKinsey AI Engineer interview with practice questions to boost confidence.",
      companyName: "McKinsey & Company",
      background: "linear-gradient(135deg, #B8E6F6 0%, #7DD3F0 100%)",
    },
  ];

  async function handleStartPractice() {
    // Redirect all practice CTAs to the unified `/start` page
    try {
      setStarting(true);
      setStatus(null);
      window.location.href = "/start";
    } finally {
      setStarting(false);
    }
  }

  return (
    <section
      aria-label="Practice with AI Mock Interviews"
      style={{
        width: "100%",
        background:
          "linear-gradient(135deg, #E8E4F3 0%, #F5F3FF 50%, #E0F7FA 100%)",
        paddingTop: "80px",
        paddingBottom: "100px",
        paddingLeft: "5%",
        paddingRight: "5%",
      }}
    >
      {/* Header */}
      <div className="mx-auto" style={{ maxWidth: 1200, textAlign: "center" }}>
        <div
          style={{ lineHeight: 1.3, marginBottom: 32, marginLeft: "auto", marginRight: "auto" }}
        >
          <h2 aria-label="Practice with AI Mock Interviews">
            <span
              style={{
                fontFamily: "Georgia, 'Times New Roman', serif",
                fontSize: "56px",
                fontWeight: 400,
                color: "#2D2D2D",
                display: "inline",
              }}
              className="md:text-[42px] sm:text-[32px]"
            >
              Practice with
            </span>
            <span
              style={{
                fontFamily: "Georgia, 'Times New Roman', serif",
                fontSize: "56px",
                fontWeight: 600,
                color: "#2D2D2D",
                background:
                  "linear-gradient(135deg, #FFB6D9 0%, #FFA07A 50%, #FFD700 100%)",
                paddingTop: 8,
                paddingBottom: 8,
                paddingLeft: 20,
                paddingRight: 20,
                borderRadius: 12,
                display: "inline-block",
                marginLeft: 8,
              }}
              className="md:text-[42px] sm:text-[32px] sm:block"
            >
              AI Mock Interviews
            </span>
          </h2>
        </div>

        <p
          className="mx-auto"
          style={{
            fontFamily: "Arial, Helvetica, sans-serif",
            fontSize: "18px",
            fontWeight: 400,
            color: "#5A5A5A",
            lineHeight: 1.7,
            marginBottom: 32,
            maxWidth: 900,
          }}
        >
          Practice interviews anytime with an AI interviewer that delivers realistic questions and instant
          feedback. It adapts to your job description and experience level to help you refine your
          responses and build confidence. AI Mock Interview operates 24/7 without scheduling or
          preparation time.
        </p>

        <button
          onClick={handleStartPractice}
          aria-label="Take a free AI mock interview now"
          style={{
            backgroundColor: "#FF5722",
            color: "#FFFFFF",
            fontFamily: "Arial, Helvetica, sans-serif",
            fontSize: "18px",
            fontWeight: 600,
            paddingTop: 16,
            paddingBottom: 16,
            paddingLeft: 36,
            paddingRight: 36,
            borderRadius: 8,
            border: "none",
            marginBottom: 32,
            boxShadow: "0 4px 12px rgba(255, 87, 34, 0.3)",
            cursor: "pointer",
            transition: "all 0.3s ease",
          }}
          className="inline-block focus:outline-none focus:ring-4 focus:ring-orange-500/30 active:translate-y-[1px]"
          onMouseEnter={(e) => {
            const el = e.currentTarget;
            el.style.backgroundColor = "#E64A19";
            el.style.transform = "translateY(-2px)";
            el.style.boxShadow = "0 6px 16px rgba(255,87,34,0.4)";
          }}
          onMouseLeave={(e) => {
            const el = e.currentTarget;
            el.style.backgroundColor = "#FF5722";
            el.style.transform = "translateY(0)";
            el.style.boxShadow = "0 4px 12px rgba(255,87,34,0.3)";
          }}
        >
          {starting ? "Initializing..." : "Take a free AI mock interview now"}
        </button>

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
        <div
          style={{ marginBottom: 60 }}
          className="flex justify-center gap-4 flex-wrap"
        >
          {["REALISTIC PRACTICE", "ACTIONABLE FEEDBACK", "MAXIMUM IMPACT"].map((text) => (
            <span
              key={text}
              style={{
                backgroundColor: "transparent",
                color: "#2D2D2D",
                fontFamily: "Arial, Helvetica, sans-serif",
                fontSize: 14,
                fontWeight: 700,
                letterSpacing: 1,
                paddingTop: 8,
                paddingBottom: 8,
                paddingLeft: 16,
                paddingRight: 16,
                border: "2px solid #2D2D2D",
                borderRadius: 24,
              }}
            >
              {text}
            </span>
          ))}
        </div>
      </div>

      {/* Cards */}
      <div className="mx-auto" style={{ maxWidth: 1400 }}>
        <div className="grid gap-[24px] grid-cols-1 md:grid-cols-2 xl:grid-cols-4">
          {cards.map((card, idx) => (
            <article
              key={card.companyName + idx}
              style={{
                background: card.background,
                borderRadius: 16,
                paddingTop: 25,
                paddingBottom: 25,
                paddingLeft: 26,
                paddingRight: 26,
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
              }}
              className="hover:-translate-y-2 hover:shadow-[0_8px_24px_rgba(0,0,0,0.12)]"
            >
              <h3
                style={{
                  fontFamily: "Arial, Helvetica, sans-serif",
                  fontSize: 19.8,
                  fontWeight: 700,
                  color: "#2D2D2D",
                  marginBottom: 12,
                }}
              >
                {card.roleTitle}
              </h3>
              <p
                style={{
                  fontFamily: "Arial, Helvetica, sans-serif",
                  fontSize: 13.5,
                  fontWeight: 400,
                  color: "#3D3D3D",
                  lineHeight: 1.6,
                  marginBottom: 18,
                  minHeight: 63,
                }}
              >
                {card.description}
              </p>
              <button
                onClick={handleStartPractice}
                style={{
                  fontFamily: "Arial, Helvetica, sans-serif",
                  fontSize: 14.4,
                  fontWeight: 600,
                  color: "#2D2D2D",
                  textDecoration: "underline",
                  marginBottom: 21,
                  display: "block",
                  cursor: "pointer",
                }}
                className="hover:text-black"
              >
                Start Interview
              </button>
              <div
                style={{
                  backgroundColor: "#FFFFFF",
                  borderRadius: 12,
                  paddingTop: 18,
                  paddingBottom: 18,
                  paddingLeft: 24,
                  paddingRight: 24,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  minHeight: 72,
                  boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
                }}
                aria-label={`${card.companyName} logo container`}
              >
                {/* Fallback to company name text per implementation notes */}
                <span
                  style={{
                    fontFamily: "Arial, Helvetica, sans-serif",
                    fontSize: 14.4,
                    fontWeight: 600,
                    color: "#2D2D2D",
                  }}
                >
                  {card.companyName}
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}