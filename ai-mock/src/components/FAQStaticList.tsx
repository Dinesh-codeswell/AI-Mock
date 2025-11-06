"use client";

import React from "react";

// FAQ section implemented strictly per /C:/Users/Acer/Desktop/AI Mock/news.json
export default function FAQStaticList() {
  const items = [
    {
      id: "q1",
      question: "1. How does the AI Mock Interview work?",
      answer:
        "Our AI Mock Interview creates personalized practice sessions using your saved job roles. You’ll get role-specific questions in an interview-style flow. If you have an upcoming interview scheduled on our platform, you can rehearse with the exact interface and format you’ll see on the day—making your practice even more realistic.",
    },
    {
      id: "q2",
      question: "2. Will the AI Mock Interview feel realistic?",
      answer:
        "Absolutely. The AI Mock Interview is built to mirror a real video interview. It uses an asynchronous video experience with timed prompts and a structured sequence, closely matching what you’d face in a live setting for a genuinely authentic practice run.",
    },
    {
      id: "q3",
      question: "3. How can I make the most of my practice sessions?",
      answer:
        "Treat each session like the real thing. Turn on video to assess delivery and body language, practice consistently with varied question sets, and review your results over time to spot patterns and areas to improve.",
    },
    {
      id: "q4",
      question: "4. Can I use this for free?",
      answer:
        "Yes. The AI Mock Interview is available with our free trial. Create an account to access the core preparation tools and start practicing right away.",
    },
  ];

  return (
    <section
      aria-label="Frequently Asked Questions"
      style={{ width: "100%", backgroundColor: "#FFFFFF" }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          paddingLeft: 24,
          paddingRight: 24,
          paddingTop: 48,
          paddingBottom: 48,
        }}
      >
        <h2
          role="heading"
          aria-level={2}
          style={{
            color: "#2D2D2D",
            fontFamily: "Georgia, 'Times New Roman', serif",
            fontWeight: 700,
            letterSpacing: -0.2,
            lineHeight: 1.25,
          }}
          className="text-[35.2px] sm:text-[27.2px] md:text-[32px] lg:text-[38.4px] mb-[28px] sm:mb-6 md:mb-[26px] lg:mb-[32px] text-center"
        >
          Frequently Asked Questions
        </h2>

        <div role="list" className="space-y-[24px]">
          {items.map((item) => (
            <article
              key={item.id}
              role="listitem"
              style={{
                backgroundColor: "#FFFFFF",
                borderColor: "#E5E7EB",
                borderWidth: 1,
                borderStyle: "solid",
                borderRadius: 16,
                boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
                padding: 28,
              }}
              className="sm:[padding:16px] md:[padding:18px] lg:[padding:20px]"
            >
              <div className="flex flex-col gap-3">
                <h3
                  id={`faq-${item.id}-heading`}
                  style={{
                    color: "#2D2D2D",
                    fontFamily: "Arial, Helvetica, sans-serif",
                    fontSize: 22.4,
                    fontWeight: 700,
                    lineHeight: 1.35,
                    marginBottom: 4,
                  }}
                >
                  {item.question}
                </h3>
                <p
                  style={{
                    color: "#3D3D3D",
                    fontFamily: "Arial, Helvetica, sans-serif",
                    fontSize: 14.4,
                    fontWeight: 400,
                    lineHeight: 1.7,
                  }}
                >
                  {item.answer}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}