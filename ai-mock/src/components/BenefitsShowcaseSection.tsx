"use client";
import React from "react";
import Image from "next/image";
import { useEffect, useRef } from "react";
import lottie from "lottie-web";

// Benefits section built per d:/Downloads/Startup_Draft/new.json
// Implements grid, typography, design tokens, and accessibility guidance

type CardConfig = {
  id: string;
  position: string;
  card_styling: {
    background_color: string;
    border_radius: string;
    padding: string;
    box_shadow: string;
    border: string;
    transition: string;
    hover_effect: { box_shadow: string; transform: string };
  };
  image_container: {
    position: string;
    width: string;
    height: string;
    margin_bottom: string;
    border_radius: string;
    overflow: string;
    background_color: string;
  };
  mockup_image: {
    description: string;
    display: string;
    width: string;
    height: string;
    object_fit: string;
    filter: string;
  };
  title: {
    text: string;
    tag: string;
    font_family: string;
    font_size: string;
    font_weight: string;
    color: string;
    margin_bottom: string;
    letter_spacing: string;
    line_height: string;
  };
};

// Extracted configuration from new.json (kept concise and exact for rendering)
const CONFIG = {
  section_config: {
    container_width: "full",
    max_width: "1400px",
    background_color: "#FAFBFC",
    padding_top: "80px",
    padding_bottom: "80px",
    padding_horizontal: "40px",
  },
  heading: {
    text: "Key Benefits with Beyond Career",
    tag: "h2",
    font_family: "Inter, system-ui, sans-serif",
    font_size: "48px",
    font_weight: "700",
    color: "#000000",
    text_align: "center",
    margin_bottom: "60px",
    letter_spacing: "-0.02em",
    line_height: "1.2",
  },
  grid_layout: {
    grid_template_columns: "repeat(3, 1fr)",
    grid_template_rows: "repeat(2, 1fr)",
    gap: "24px",
    responsive_breakpoints: {
      tablet: { max_width: "1024px", grid_template_columns: "repeat(2, 1fr)" },
      mobile: { max_width: "768px", grid_template_columns: "1fr" },
    },
  },
  design_tokens: {
    primary_color: "#6366F1",
    secondary_color: "#8B5CF6",
    text_primary: "#000000",
    text_secondary: "#6B7280",
    background_light: "#FAFBFC",
    card_background: "#FFFFFF",
    border_color: "#E8EAED",
    shadow_sm: "0 2px 8px rgba(0, 0, 0, 0.04)",
    shadow_md: "0 4px 12px rgba(0, 0, 0, 0.08)",
    shadow_lg: "0 8px 24px rgba(0, 0, 0, 0.08)",
  },
  benefit_cards: [
    {
      id: "card_1",
      position: "top_left",
      card_styling: {
        background_color: "#FFFFFF",
        border_radius: "16px",
        padding: "40px",
        box_shadow: "0 2px 8px rgba(0, 0, 0, 0.04)",
        border: "1px solid #E8EAED",
        transition: "all 0.3s ease",
        hover_effect: {
          box_shadow: "0 8px 24px rgba(0, 0, 0, 0.08)",
          transform: "translateY(-4px)",
        },
      },
      image_container: {
        position: "relative",
        width: "100%",
        height: "280px",
        margin_bottom: "24px",
        border_radius: "12px",
        overflow: "hidden",
        background_color: "#F8F9FA",
      },
      mockup_image: {
        description:
          "Dashboard interface showing digital marketing specialization with practice categories, AI persona selection, custom instructions, and scheduling features",
        display: "block",
        width: "100%",
        height: "auto",
        object_fit: "contain",
        filter: "drop-shadow(0 4px 12px rgba(0, 0, 0, 0.1))",
      },
      title: {
        text: "Ultimate Interview Mastery",
        tag: "h3",
        font_family: "Inter, system-ui, sans-serif",
        font_size: "24px",
        font_weight: "600",
        color: "#000000",
        margin_bottom: "0",
        letter_spacing: "-0.01em",
        line_height: "1.3",
      },
    },
    {
      id: "card_2",
      position: "top_center",
      card_styling: {
        background_color: "#FFFFFF",
        border_radius: "16px",
        padding: "40px",
        box_shadow: "0 2px 8px rgba(0, 0, 0, 0.04)",
        border: "1px solid #E8EAED",
        transition: "all 0.3s ease",
        hover_effect: {
          box_shadow: "0 8px 24px rgba(0, 0, 0, 0.08)",
          transform: "translateY(-4px)",
        },
      },
      image_container: {
        position: "relative",
        width: "100%",
        height: "280px",
        margin_bottom: "24px",
        border_radius: "12px",
        overflow: "hidden",
        background_color: "#F8F9FA",
      },
      mockup_image: {
        description:
          "Company selection interface showing various tech company logos like Google with tags for company types and industry sectors",
        display: "block",
        width: "100%",
        height: "auto",
        object_fit: "contain",
        filter: "drop-shadow(0 4px 12px rgba(0, 0, 0, 0.1))",
      },
      title: {
        text: "Company-Specific Practices",
        tag: "h3",
        font_family: "Inter, system-ui, sans-serif",
        font_size: "24px",
        font_weight: "600",
        color: "#000000",
        margin_bottom: "0",
        letter_spacing: "-0.01em",
        line_height: "1.3",
      },
    },
    {
      id: "card_3",
      position: "top_right",
      card_styling: {
        background_color: "#FFFFFF",
        border_radius: "16px",
        padding: "40px",
        box_shadow: "0 2px 8px rgba(0, 0, 0, 0.04)",
        border: "1px solid #E8EAED",
        transition: "all 0.3s ease",
        hover_effect: {
          box_shadow: "0 8px 24px rgba(0, 0, 0, 0.08)",
          transform: "translateY(-4px)",
        },
      },
      image_container: {
        position: "relative",
        width: "100%",
        height: "280px",
        margin_bottom: "24px",
        border_radius: "12px",
        overflow: "hidden",
        background_color: "#F8F9FA",
      },
      mockup_image: {
        description:
          "Resume analysis interface showing candidate profile with photo and AI-generated interview questions based on resume content",
        display: "block",
        width: "100%",
        height: "auto",
        object_fit: "contain",
        filter: "drop-shadow(0 4px 12px rgba(0, 0, 0, 0.1))",
      },
      title: {
        text: "Resume-Based Interviews",
        tag: "h3",
        font_family: "Inter, system-ui, sans-serif",
        font_size: "24px",
        font_weight: "600",
        color: "#000000",
        margin_bottom: "0",
        letter_spacing: "-0.01em",
        line_height: "1.3",
      },
    },
    {
      id: "card_4",
      position: "bottom_left",
      card_styling: {
        background_color: "#FFFFFF",
        border_radius: "16px",
        padding: "40px",
        box_shadow: "0 2px 8px rgba(0, 0, 0, 0.04)",
        border: "1px solid #E8EAED",
        transition: "all 0.3s ease",
        hover_effect: {
          box_shadow: "0 8px 24px rgba(0, 0, 0, 0.08)",
          transform: "translateY(-4px)",
        },
      },
      image_container: {
        position: "relative",
        width: "100%",
        height: "280px",
        margin_bottom: "24px",
        border_radius: "12px",
        overflow: "hidden",
        background_color: "#F8F9FA",
      },
      mockup_image: {
        description:
          "Analytics dashboard showing circular progress charts for communication, body language, content accuracy, and confidence with percentage scores in different colors",
        display: "block",
        width: "100%",
        height: "auto",
        object_fit: "contain",
        filter: "drop-shadow(0 4px 12px rgba(0, 0, 0, 0.1))",
      },
      title: {
        text: "Actionable Analytics",
        tag: "h3",
        font_family: "Inter, system-ui, sans-serif",
        font_size: "24px",
        font_weight: "600",
        color: "#000000",
        margin_bottom: "0",
        letter_spacing: "-0.01em",
        line_height: "1.3",
      },
    },
    {
      id: "card_5",
      position: "bottom_center",
      card_styling: {
        background_color: "#FFFFFF",
        border_radius: "16px",
        padding: "40px",
        box_shadow: "0 2px 8px rgba(0, 0, 0, 0.04)",
        border: "1px solid #E8EAED",
        transition: "all 0.3s ease",
        hover_effect: {
          box_shadow: "0 8px 24px rgba(0, 0, 0, 0.08)",
          transform: "translateY(-4px)",
        },
      },
      image_container: {
        position: "relative",
        width: "100%",
        height: "280px",
        margin_bottom: "24px",
        border_radius: "12px",
        overflow: "hidden",
        background_color: "#F8F9FA",
      },
      mockup_image: {
        description:
          "Interview creation wizard showing job description input with ID-based customization options and interview type selection",
        display: "block",
        width: "100%",
        height: "auto",
        object_fit: "contain",
        filter: "drop-shadow(0 4px 12px rgba(0, 0, 0, 0.1))",
      },
      title: {
        text: "Job Description-Based Interviews",
        tag: "h3",
        font_family: "Inter, system-ui, sans-serif",
        font_size: "24px",
        font_weight: "600",
        color: "#000000",
        margin_bottom: "0",
        letter_spacing: "-0.01em",
        line_height: "1.3",
      },
    },
    {
      id: "card_6",
      position: "bottom_right",
      card_styling: {
        background_color: "#FFFFFF",
        border_radius: "16px",
        padding: "40px",
        box_shadow: "0 2px 8px rgba(0, 0, 0, 0.04)",
        border: "1px solid #E8EAED",
        transition: "all 0.3s ease",
        hover_effect: {
          box_shadow: "0 8px 24px rgba(0, 0, 0, 0.08)",
          transform: "translateY(-4px)",
        },
      },
      image_container: {
        position: "relative",
        width: "100%",
        height: "280px",
        margin_bottom: "24px",
        border_radius: "12px",
        overflow: "hidden",
        background_color: "#F8F9FA",
      },
      mockup_image: {
        description:
          "Resume tools interface showing Resume Builder and Resume Analyzer features with purple accent buttons",
        display: "block",
        width: "100%",
        height: "auto",
        object_fit: "contain",
        filter: "drop-shadow(0 4px 12px rgba(0, 0, 0, 0.1))",
      },
      title: {
        text: "Resume Analyzer and Builder",
        tag: "h3",
        font_family: "Inter, system-ui, sans-serif",
        font_size: "24px",
        font_weight: "600",
        color: "#000000",
        margin_bottom: "0",
        letter_spacing: "-0.01em",
        line_height: "1.3",
      },
    },
  ] as CardConfig[],
};

export default function BenefitsShowcaseSection() {
  const { section_config, heading, grid_layout, benefit_cards, design_tokens } = CONFIG;

  const HOVER_BG = "hsl(216 100% 91%)"; // matches tailwind 'bg-new-sky'

  const HOVER_DESCRIPTIONS: Record<string, string> = {
    card_1:
      "Master interviews with realistic AI-led practice. Tailored question sets, role-specific scenarios, and structured sessions build confidence and clarity. Track progress over time to sharpen delivery and content.",
    card_2:
      "Practice for the exact companies you target. Calibrate with brand-specific expectations and industry norms to tune answers and examples. Train smarter with focused preparation.",
    card_3:
      "Turn your resume into interview-ready narratives. Our AI extracts achievements, skills, and impact to craft questions that showcase your strengths with authentic, relevant stories.",
    card_4:
      "See what matters most and act on it. Visual analytics highlight communication, content accuracy, and confidence so you can prioritize improvements and measure gains.",
    card_5:
      "Instantly generate interview flows from job descriptions. Align practice to role requirements, responsibilities, and desired outcomes—making every session more targeted.",
    card_6:
      "Build and refine a compelling resume. Analyze gaps, strengthen phrasing, and tailor content for roles and companies—then practice interviews informed by your profile.",
  };
  // Animation JSON paths (served from /public). Using exact filenames provided.
  const ANIM_PATHS: Record<string, string> = {
    card_1: "/The woman works in the office  Manager.json",
    card_2: "/Data analysis cart animation.json",
    card_3: "/Working Online.json",
    card_4: "/Girl working with laptop sitting on the sofa.json",
    card_5: "/AI animation.json",
    card_6: "/Time Money Efficiency.json",
  };

  const encodePublicPath = (p: string) => encodeURI(p);

  const AnimationPlayer: React.FC<{ path: string; speed?: number }> = ({ path, speed = 0.5 }) => {
    const containerRef = useRef<HTMLDivElement | null>(null);
    useEffect(() => {
      if (!containerRef.current) return;
      const anim = lottie.loadAnimation({
        container: containerRef.current,
        renderer: "svg",
        loop: true,
        autoplay: true,
        path: encodePublicPath(path),
        rendererSettings: {
          preserveAspectRatio: "xMidYMid slice",
          progressiveLoad: true,
          hideOnTransparent: false,
        },
      });
      anim.setSpeed(speed);
      return () => {
        try {
          anim.destroy();
        } catch (_) {}
      };
    }, [path, speed]);

    return (
      <div
        ref={containerRef}
        style={{
          width: "100%",
          height: "100%",
          filter: "brightness(1.05) contrast(1.05)",
        }}
      />
    );
  };

  // Helper to scale pixel values (reduce sizes by ~40%)
  const scalePx = (px: string, factor: number) => {
    const n = parseFloat(px);
    if (Number.isFinite(n)) return `${Math.round(n * factor)}px`;
    return px;
  };

  return (
    <section
      aria-label="Key Benefits with Beyond Career"
      className="w-full bg-gradient-to-br from-white via-[#F7F2EB]/30 to-[#BAD6EB]/20 py-20 px-10"
    >
      <div style={{ maxWidth: section_config.max_width, margin: "0 auto" }}>
        {/* Heading */}
        {heading.tag === "h2" ? (
          <h2 className="text-center text-2xl md:text-3xl font-bold text-[#081F5C] mb-12">
            {heading.text}
          </h2>
        ) : null}

        {/* Grid */}
        <div className="benefits-grid">
          {benefit_cards.map((card) => (
            <article
              key={card.id}
              role="article"
              aria-label={card.title.text}
              className="benefit-card"
              style={{
                borderRadius: card.card_styling.border_radius,
                padding: scalePx(card.card_styling.padding, 0.85),
                boxShadow: card.card_styling.box_shadow,
                border: card.card_styling.border,
                transition: card.card_styling.transition,
              }}
            >
              {/* Image area */}
              <div
                className="image-area"
                style={{
                  position: card.image_container.position as any,
                  width: card.image_container.width,
                  height: scalePx(card.image_container.height, 0.595),
                  marginBottom: card.image_container.margin_bottom,
                  borderRadius: card.image_container.border_radius,
                  overflow: card.image_container.overflow as any,
                  backgroundColor: card.image_container.background_color,
                }}
              >
                <div style={{ position: "relative", width: "100%", height: "100%" }}>
                  {ANIM_PATHS[card.id] ? (
                    <AnimationPlayer path={ANIM_PATHS[card.id]} speed={0.5} />
                  ) : (
                    <Image
                      src="/placeholder.svg"
                      alt={card.mockup_image.description}
                      fill
                      sizes="(max-width: 768px) 92vw, (max-width: 1200px) 44vw, 30vw"
                      style={{ objectFit: card.mockup_image.object_fit as any, filter: card.mockup_image.filter }}
                      priority
                    />
                  )}
                </div>
              </div>

              {/* Title */}
              {card.title.tag === "h3" ? (
                <h3 className="title text-lg font-semibold text-[#081F5C] text-center">
                  {card.title.text}
                </h3>
              ) : null}

              {/* Hover description (revealed on hover) */}
              <div className="hover-desc" aria-hidden="true">
                <p className="text-center text-gray-700 text-sm md:text-base font-medium leading-relaxed" style={{ fontSize: "0.75em" }}>
                  {HOVER_DESCRIPTIONS[card.id]}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Responsive grid styles */}
      <style jsx>{`
        .benefits-grid {
          display: grid;
          grid-template-columns: ${grid_layout.grid_template_columns};
          grid-template-rows: ${grid_layout.grid_template_rows};
          gap: ${grid_layout.gap};
          width: 70%;
          margin: 0 auto;
        }
        .benefit-card { background-color: #FFFFFF; display: flex; flex-direction: column; }
        .hover-desc { display: none; }
        .benefit-card:hover {
          box-shadow: ${design_tokens.shadow_lg};
          transform: translateY(-4px);
          background-color: ${HOVER_BG} !important;
        }
        .benefit-card:hover .image-area { display: none; }
        .benefit-card .title { text-align: center; }
        .benefit-card .title { text-align: center; transition: transform 160ms ease; }
        .benefit-card:hover { justify-content: center; align-items: center; }
        .benefit-card:hover .title { margin-bottom: 2px !important; transform: translateY(30%); }
        .benefit-card:hover .hover-desc {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 100%;
          padding: 2px 8px;
        }
        .image-area :global(svg) {
          width: 100%;
          height: 100%;
          display: block;
        }
        @media (max-width: ${grid_layout.responsive_breakpoints.tablet.max_width}) {
          .benefits-grid {
            grid-template-columns: ${grid_layout.responsive_breakpoints.tablet.grid_template_columns};
            grid-template-rows: auto;
            width: 80%;
          }
        }
        @media (max-width: ${grid_layout.responsive_breakpoints.mobile.max_width}) {
          .benefits-grid {
            grid-template-columns: ${grid_layout.responsive_breakpoints.mobile.grid_template_columns};
            grid-template-rows: auto;
            width: 92%;
          }
        }
      `}</style>
    </section>
  );
}