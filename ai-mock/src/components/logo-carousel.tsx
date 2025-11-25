"use client";

import { useState } from "react";

// Use absolute URLs to main site assets to ensure logos load in ai-mock
const CDN_BASE = "https://beyondcareer.online";

export default function LogoCarousel() {
  const [failedImages, setFailedImages] = useState(new Set<number>());

  const allLogos = [
    { name: "IIT Bombay", logo: `${CDN_BASE}/images/R.png`, height: "h-12", link: "https://www.iitb.ac.in/" },
    { name: "IIT Delhi", logo: `${CDN_BASE}/images/358-3581667_indian-institute-of-technology-delhi-indian-institute-of.png`, height: "h-12", link: "https://home.iitd.ac.in/" },
    { name: "IIT Madras", logo: `${CDN_BASE}/images/iit-madras-logo.png`, height: "h-12", link: "https://www.iitm.ac.in/" },
    { name: "IIT Kharagpur", logo: `${CDN_BASE}/images/iit-kharagpur-logo-freelogovectors.net_.png`, height: "h-12", link: "https://www.iitkgp.ac.in/" },
    { name: "IIT Roorkee", logo: `${CDN_BASE}/images/iit-rourkee-logo-16x9.png`, height: "h-12", link: "https://www.iitr.ac.in/" },
    { name: "IIM Ahmedabad", logo: `${CDN_BASE}/images/iim-ahmedabad-logo.png`, height: "h-12", link: "https://www.iima.ac.in/" },
    { name: "IIM Bangalore", logo: `${CDN_BASE}/images/520-5200027_indian-institute-of-management-bangalore-logo-clipart.png`, height: "h-12", link: "https://www.iimb.ac.in/" },
    { name: "IIM Calcutta", logo: `${CDN_BASE}/images/63-639287_iim-calcutta-logo-hd-png-download.png`, height: "h-12", link: "https://www.iimcal.ac.in/" },
    { name: "BITS Pilani", logo: `${CDN_BASE}/images/132-1327406_bits-pilani-logo-png-transparent-png.png`, height: "h-12", link: "https://www.bits-pilani.ac.in/" },
    { name: "NIT Trichy", logo: `${CDN_BASE}/images/NIT-Trichy-Recruitment-Notification.png`, height: "h-12", link: "https://www.nitt.edu/" },
    { name: "Delhi University", logo: `${CDN_BASE}/images/delhi-university-686256.jpg`, height: "h-12", link: "https://www.du.ac.in/" },
    { name: "St. Stephen's College", logo: `${CDN_BASE}/images/Crest_of_St.Stephens_Coll,_UOD.svg.png`, height: "h-12", link: "https://www.ststephens.edu/" },
    { name: "Lady Shri Ram College", logo: `${CDN_BASE}/images/218-2187086_lady-shri-ram-college-for-women-logo-hd.png`, height: "h-12", link: "https://lsr.edu.in/" },
    { name: "SRCC", logo: `${CDN_BASE}/images/56052dd0_logo.jpg`, height: "h-12", link: "https://www.srcc.edu/" },
    { name: "Google", logo: `${CDN_BASE}/images/300221.png`, height: "h-8", link: "https://www.google.com/" },
    { name: "Microsoft", logo: `${CDN_BASE}/images/732221.png`, height: "h-8", link: "https://www.microsoft.com/" },
    { name: "Amazon", logo: `${CDN_BASE}/images/14079391.png`, height: "h-8", link: "https://www.amazon.com/" },
    { name: "Apple", logo: `${CDN_BASE}/images/747.png`, height: "h-8", link: "https://www.apple.com/" },
    { name: "Meta", logo: `${CDN_BASE}/images/6033716.png`, height: "h-8", link: "https://about.meta.com/" },
    { name: "Netflix", logo: `${CDN_BASE}/images/732228.png`, height: "h-8", link: "https://www.netflix.com/" },
    { name: "TCS", logo: `${CDN_BASE}/images/Tata_Consultancy_Services_Logo.svg.png`, height: "h-8", link: "https://www.tcs.com/" },
    { name: "Infosys", logo: `${CDN_BASE}/images/Infosys-Logo-1536x960.png`, height: "h-8", link: "https://www.infosys.com/" },
    { name: "Wipro", logo: `${CDN_BASE}/images/Wipro-logo.png`, height: "h-8", link: "https://www.wipro.com/" },
    { name: "Reliance", logo: `${CDN_BASE}/images/reliance-industries-logo-1.png`, height: "h-8", link: "https://www.ril.com/" },
    { name: "McKinsey", logo: `${CDN_BASE}/images/McKinsey-Logo.png`, height: "h-8", link: "https://www.mckinsey.com/" },
    { name: "BCG", logo: `${CDN_BASE}/images/bc4661b032-bcg-logo-boston-consulting-group-logo.png`, height: "h-8", link: "https://www.bcg.com/" },
    { name: "Bain", logo: `${CDN_BASE}/images/bain_company_logo-freelogovectors.net_.png`, height: "h-8", link: "https://www.bain.com/" },
    { name: "Deloitte", logo: `${CDN_BASE}/images/Deloitte-Logo-PNG-Cutout.png`, height: "h-8", link: "https://www2.deloitte.com/" },
    { name: "PwC", logo: `${CDN_BASE}/images/PwC-PricewaterhouseCoopers-Logo.png`, height: "h-8", link: "https://www.pwc.com/" },
    { name: "Accenture", logo: `${CDN_BASE}/images/Accenture-Logo.png`, height: "h-8", link: "https://www.accenture.com/" },
  ];

  const handleImageError = (index: number) => {
    setFailedImages((prev) => new Set([...prev, index]));
  };

  const handleImageLoad = (index: number) => {
    setFailedImages((prev) => {
      const next = new Set(prev);
      next.delete(index);
      return next;
    });
  };

  return (
    <section className="py-16 bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-center text-sm text-gray-600 uppercase tracking-wide mb-8 font-medium">
          Our community members come from
        </h2>
        <div className="overflow-hidden">
          <div className="flex w-max animate-infinite-scroll">
            {allLogos.concat(allLogos).map((logo, index) => (
              <a
                key={`logo-${index}`}
                href={logo.link}
                className="flex-shrink-0 block mx-8"
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className={`${logo.height} w-auto flex items-center justify-center min-w-[120px]`}>
                  {/* Use native img for simplicity */}
                  <img
                    src={failedImages.has(index) ? `${CDN_BASE}/placeholder.svg` : logo.logo}
                    alt={logo.name}
                    className={`${logo.height} w-auto max-w-full transition-all duration-300 opacity-90 hover:opacity-100 object-contain`}
                    loading="lazy"
                    onError={() => handleImageError(index)}
                    onLoad={() => handleImageLoad(index)}
                    style={{ transition: "all 0.3s ease" }}
                    onMouseEnter={(e) => {
                      (e.target as HTMLImageElement).style.transform = "scale(1.05)";
                      (e.target as HTMLImageElement).style.opacity = "1";
                    }}
                    onMouseLeave={(e) => {
                      (e.target as HTMLImageElement).style.transform = "scale(1)";
                      (e.target as HTMLImageElement).style.opacity = "0.9";
                    }}
                  />
                </div>
              </a>
            ))}
          </div>
        </div>

        <div className="mt-12 text-center">
          <ul className="flex flex-wrap justify-center gap-2 sm:gap-3 md:gap-4 text-[10px] sm:text-xs text-gray-600 uppercase tracking-wider">
            {[
              "Premier Institutes",
              "Delhi University Colleges",
              "Tech Giants",
              "Consulting Firms",
              "Investment Banks",
              "Indian Unicorns",
            ].map((label) => (
              <li
                key={label}
                className="px-3 py-1 rounded-full border border-gray-200 bg-gray-50/80 backdrop-blur-sm shadow-sm/30"
              >
                {label}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <style jsx>{`
        @keyframes infinite-scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-infinite-scroll { animation: infinite-scroll 60s linear infinite; }
        .animate-infinite-scroll:hover { animation-play-state: paused; }
      `}</style>
    </section>
  );
}