import Image from "next/image";

export default function HowItWorksSection() {
  const cards = [
    {
      number: "1",
      title: "Set Up Your Interview",
      imageSrc: "/setup.webp",
      body:
        "Select from different interview formats and let our AI interview coach customize the questions for your target role.",
    },
    {
      number: "2",
      title: "Practice Naturally",
      imageSrc: "/naturally.webp",
      body:
        "Have realistic conversations with our AI interviewer in a pressure-free environment at your own pace.",
    },
    {
      number: "3",
      title: "Get Instant Feedback",
      imageSrc: "/Feedback.webp",
      body:
        "Receive detailed performance insights and actionable recommendations after each practice session.",
    },
    {
      number: "4",
      title: "Build Confidence",
      imageSrc: "/confidence.webp",
      body:
        "Review your recorded sessions, track your improvement, and prepare effectively for real interviews.",
    },
  ];

  return (
    <section id="interview-process" aria-label="Master the interview process" className="bg-white">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-8 py-10 lg:py-14">
        <h2
          className="text-center font-bold tracking-tight"
          style={{ fontFamily: "Georgia, 'Times New Roman', serif", color: "#2D2D2D", fontSize: 36, letterSpacing: "-0.02em" }}
        >
          Master the Interview Process
        </h2>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {cards.map((c) => (
            <article
              key={c.title}
              className="relative bg-white border border-[#E5E7EB] rounded-2xl shadow-[0_6px_24px_rgba(0,0,0,0.06)]"
            >
              {/* number badge */}
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-9 h-9 rounded-full bg-emerald-600 text-white text-sm font-bold flex items-center justify-center shadow-md">
                {c.number}
              </div>

              {/* visual image container */}
              <div className="p-5">
                <div className="relative w-full h-40 rounded-xl border border-[#E5E7EB] overflow-hidden shadow-inner">
                  <Image
                    src={c.imageSrc}
                    alt={c.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    style={{ objectFit: "cover" }}
                    priority={false}
                  />
                </div>
              </div>

              {/* text */}
              <div className="px-6 pb-6 text-center">
                <h3
                  className="font-bold mb-2"
                  style={{ fontFamily: "Georgia, 'Times New Roman', serif", color: "#2D2D2D", fontSize: 20 }}
                >
                  {c.title}
                </h3>
                <p
                  className="leading-relaxed"
                  style={{ fontFamily: "Arial, Helvetica, sans-serif", color: "#5A5A5A", fontSize: 15 }}
                >
                  {c.body}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}