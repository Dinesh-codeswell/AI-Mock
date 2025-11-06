"use client";
import { useState } from "react";
import Image from "next/image";
import { Plus } from "lucide-react";

export default function Header() {
  const [activeTab, setActiveTab] = useState<string>("Dashboard");
  return (
    <header
      className="w-screen bg-white text-black border-b border-gray-200 shadow-sm"
      style={{ height: 72 }}
      aria-label="Primary navigation header"
    >
      <nav className="max-w-full w-screen h-full px-6 lg:px-8 grid grid-cols-[auto_1fr_auto] items-center" aria-label="Main navigation">
        {/* Left: logo */}
        <div className="flex items-center h-full">
          <Image
            src="/beyond-career-main-logo.png"
            alt="Beyond Career main logo"
            width={140}
            height={44}
            priority
            className="object-contain"
          />
        </div>

        {/* Center: tabs */}
        <div
          className="flex items-center justify-center gap-2"
          role="tablist"
          aria-label="Navigation tabs"
          style={{ marginLeft: "-20%" }}
        >
          {[
            { label: "Dashboard" },
            { label: "Practice" },
            { label: "Analytics" },
            { label: "Resources" },
          ].map((t) => {
            const isActive = activeTab === t.label;
            return (
              <button
                key={t.label}
                role="tab"
                aria-selected={isActive}
                aria-current={isActive ? "page" : undefined}
                onClick={() => setActiveTab(t.label)}
                className={`px-5 py-2 text-[16px] font-medium rounded-md transition-colors ${
                  isActive ? "text-indigo-600 bg-indigo-50" : "text-black hover:bg-gray-50"
                }`}
              >
                {t.label}
              </button>
            );
          })}
        </div>

        {/* Right: actions */}
        <div className="flex items-center justify-end" style={{ gap: "24px" }}>
          <button
            type="button"
            aria-label="Upgrade Pro"
            className="h-[44px] min-w-[130px] px-5 text-[15px] font-semibold text-purple-700 bg-gradient-to-br from-purple-50 to-purple-100 border-2 border-purple-300 rounded-[10px] transition"
            style={{ transform: "translateX(-30%)" }}
          >
            Upgrade Pro
          </button>
          <button
            type="button"
            aria-label="User profile menu"
            className="h-[44px] w-[44px] rounded-full border-2 border-white bg-gradient-to-br from-teal-500 via-blue-500 to-purple-500 text-white font-bold shadow-sm flex items-center justify-center"
            style={{ transform: "translateX(-15%)" }}
          >
            JD
          </button>
        </div>
      </nav>
    </header>
  );
}