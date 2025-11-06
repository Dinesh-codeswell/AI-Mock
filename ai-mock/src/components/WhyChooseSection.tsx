import Image from "next/image";
import SectionReveal from "@/components/SectionReveal";
import { Shield, Clock, Target, Briefcase } from "lucide-react";

type Feature = {
  id: string;
  title: string;
  description: string;
  imageMock: {
    container_classes: string;
    icon: "Shield" | "Clock" | "Target" | "Briefcase";
    color: string;
    text_overlay: string;
    text_classes: string;
  };
  actualImage?: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
};

type WhyChooseSectionProps = {
  title?: string;
  subtitle?: string;
  features?: Feature[];
};

const defaultFeatures: Feature[] = [
  {
    id: "feature-1",
    title: "Build Real Confidence",
    description:
      "Practice with AI that asks challenging questions and provides constructive feedback, helping you stay composed and articulate under pressure—just like in actual interviews.",
    imageMock: {
      container_classes:
        "w-full h-64 bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center",
      icon: "Shield",
      color: "#4A90E2",
      text_overlay: "Interview Confidence",
      text_classes: "text-blue-600 font-semibold mt-4",
    },
    actualImage: {
      src: "/Gemini_Generated_Image_4v31li4v31li4v31.png",
      alt: "Build real confidence",
      width: 600,
      height: 360,
    },
  },
  {
    id: "feature-2",
    title: "Save Valuable Time",
    description:
      "No scheduling hassles or waiting for coaches—practice instantly whenever you want, at your own pace, from anywhere in the world.",
    imageMock: {
      container_classes:
        "w-full h-64 bg-gradient-to-br from-green-100 to-emerald-200 flex items-center justify-center",
      icon: "Clock",
      color: "#10B981",
      text_overlay: "Time Flexibility",
      text_classes: "text-green-600 font-semibold mt-4",
    },
    actualImage: {
      src: "/Gemini_Generated_Image_8j0hjg8j0hjg8j0h.png",
      alt: "Save valuable time",
      width: 600,
      height: 360,
    },
  },
  {
    id: "feature-3",
    title: "Get Job-Ready Fast",
    description:
      "Receive customized questions tailored to your specific role and industry, ensuring you're thoroughly prepared for any scenario you might encounter.",
    imageMock: {
      container_classes:
        "w-full h-64 bg-gradient-to-br from-purple-100 to-pink-200 flex items-center justify-center",
      icon: "Target",
      color: "#A78BFA",
      text_overlay: "Role-Specific Training",
      text_classes: "text-purple-600 font-semibold mt-4",
    },
    actualImage: {
      src: "/Gemini_Generated_Image_1dvfzq1dvfzq1dvf.png",
      alt: "Get job ready fast",
      width: 600,
      height: 360,
    },
  },
];

function MockIcon({ name, color }: { name: Feature["imageMock"]["icon"]; color: string }) {
  const size = 64;
  switch (name) {
    case "Shield":
      return <Shield size={size} color={color} aria-hidden="true" />;
    case "Clock":
      return <Clock size={size} color={color} aria-hidden="true" />;
    case "Target":
      return <Target size={size} color={color} aria-hidden="true" />;
    case "Briefcase":
      return <Briefcase size={size} color={color} aria-hidden="true" />;
    default:
      return null;
  }
}

export default function WhyChooseSection({
  title = "Why Choose Final Round AI for Mock Interviews?",
  subtitle = "Intelligent Interview Preparation That Delivers Real Results",
  features = defaultFeatures,
}: WhyChooseSectionProps) {
  return (
    <section id="why-choose-section" className="w-full bg-gray-50 py-14 lg:py-20">
      <div className="max-w-[96rem] mx-auto px-6 lg:px-8">
        {/* Section header */}
        <SectionReveal>
        <div className="text-center mb-12 lg:mb-16">
          <h2
            className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3 tracking-tight"
            style={{ fontFamily: "Georgia, 'Times New Roman', serif", color: "#2D2D2D", letterSpacing: "-0.01em" }}
          >
            {title}
          </h2>
          <p
            className="text-base md:text-lg max-w-2xl mx-auto"
            style={{ fontFamily: "Arial, Helvetica, sans-serif", color: "#5A5A5A", lineHeight: "1.6" }}
          >
            {subtitle}
          </p>
        </div>
        </SectionReveal>

        {/* Features grid */}
        <SectionReveal>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {features.map((feature) => (
            <article
              key={feature.id}
              className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300"
              aria-label={feature.title}
            >
              {/* Image container: render actual image, perfectly aligned and non-overflowing */}
              <div className="w-full h-40 md:h-44 overflow-hidden relative">
                <Image
                  src={feature.actualImage?.src ?? ""}
                  alt={feature.actualImage?.alt ?? feature.title}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                  className="object-contain"
                  priority={false}
                />
              </div>

              {/* Content container */}
              <div className="p-5 lg:p-6">
                <h3
                  className="text-base md:text-lg font-bold mb-2"
                  style={{ fontFamily: "Georgia, 'Times New Roman', serif", color: "#2D2D2D" }}
                >
                  {feature.title}
                </h3>
                <p
                  className="text-sm leading-relaxed"
                  style={{ fontFamily: "Arial, Helvetica, sans-serif", color: "#5A5A5A" }}
                >
                  {feature.description}
                </p>
              </div>
            </article>
          ))}
        </div>
        </SectionReveal>
      </div>
    </section>
  );
}