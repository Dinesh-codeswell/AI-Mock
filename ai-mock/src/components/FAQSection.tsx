"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import Link from "next/link";

// Use the existing AI Mock questions but apply homepage FAQ design
const faqs = [
  {
    question: "1. How does the AI Mock Interview work?",
    answer:
      "Our AI Mock Interview creates personalized practice sessions using your saved job roles. You’ll get role-specific questions in an interview-style flow. If you have an upcoming interview scheduled on our platform, you can rehearse with the exact interface and format you’ll see on the day—making your practice even more realistic.",
  },
  {
    question: "2. Will the AI Mock Interview feel realistic?",
    answer:
      "Absolutely. The AI Mock Interview is built to mirror a real video interview. It uses an asynchronous video experience with timed prompts and a structured sequence, closely matching what you’d face in a live setting for a genuinely authentic practice run.",
  },
  {
    question: "3. How can I make the most of my practice sessions?",
    answer:
      "Treat each session like the real thing. Turn on video to assess delivery and body language, practice consistently with varied question sets, and review your results over time to spot patterns and areas to improve.",
  },
  {
    question: "4. Can I use this for free?",
    answer:
      "Yes. The AI Mock Interview is available with our free trial. Create an account to access the core preparation tools and start practicing right away.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <>
      {/* FAQ Section matching homepage styling */}
      <section id="faq" className="py-16 px-4 bg-new-sky">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <div className="inline-flex items-center px-4 py-2 bg-[#4ebbf8]/10 rounded-full text-sm font-medium text-[#4ebbf8] mb-4">
              Frequently Asked Questions
            </div>
            <h2 className="text-3xl font-bold text-[#081F5C] mb-4">Got Questions? We Have Answers</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Everything you need to know about AI Mock Interview and how to practice effectively.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-gray-50 rounded-lg border border-gray-200">
                <button
                  className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-100 transition-colors rounded-lg"
                  onClick={() => toggleFAQ(index)}
                >
                  <span className="font-medium text-[#081F5C]">{faq.question}</span>
                  {openIndex === index ? (
                    <ChevronUp className="h-5 w-5 text-gray-500" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-gray-500" />
                  )}
                </button>
                {openIndex === index && (
                  <div className="px-6 pb-4">
                    <p className="text-gray-600">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Join Our Community CTA, exactly below FAQ */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto max-w-4xl">
          <div className="bg-[#334EAC] rounded-2xl p-8 md:p-12 text-center text-white">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">JOIN OUR COMMUNITY  UNLOCK YOUR POTENTIAL</h3>
            <p className="text-white/80 mb-6 max-w-2xl mx-auto">
              Create an account to explore job opportunities and connect with employers tailored for you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/signup" className="bg-[#BAD6EB] text-[#334EAC] hover:bg-white font-semibold px-6 py-3 rounded-md">
                Sign Up
              </Link>
              <a
                className="border border-white text-black bg-white font-bold rounded-md px-6 py-3"
                href="https://forms.gle/EZraf9vbcvXTbn1ZA"
                target="_blank"
                rel="noopener noreferrer"
              >
                Join Community
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}