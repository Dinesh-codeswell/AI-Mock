"use client";

import Link from "next/link";
import Image from "next/image";
import LogoCarousel from "@/components/logo-carousel";

export default function Footer() {
  const footerLinks = {
    quick: [
      { name: "Home Page", href: "/" },
      { name: "About Us", href: "/about" },
      { name: "Contact Us", href: "/contact" },
      { name: "Careers", href: "/opportunities" },
      { name: "Blog Posts", href: "#" },
    ],
    resources: [
      { name: "FAQ", href: "#faq" },
      { name: "Community", href: "/community" },
      { name: "Join Community", href: "https://forms.gle/hPo7oX5mhhJxZhjt6" },
    ],
    socials: [
      { name: "Instagram", href: "https://www.instagram.com/beyond_career_/" },
      { name: "LinkedIn", href: "https://www.linkedin.com/company/beyondgradess/" },
    ],
  };

  return (
    <>
      {/* Company Logos Ribbon */}
      <LogoCarousel />

      <footer className="text-white py-12 md:py-16 bg-blue-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Brand Column & Newsletter */}
            <div className="space-y-4 md:col-span-1">
              <Link href="/" className="flex items-center space-x-2 bg-transparent">
                <Image
                  src="/beyond-career-main-logo.png"
                  alt="Beyond Career"
                  width={200}
                  height={80}
                  className="h-16 w-auto"
                />
              </Link>
              <p className="text-sm">Built with ❤ in India for the students</p>
              <p className="text-sm">Subscribe to our newsletter for the latest updates on features and releases.</p>
              <form className="flex space-x-2 mt-4">
                <input
                  type="email"
                  placeholder="Your Email Here"
                  className="flex-1 bg-white/20 border border-white/30 text-white placeholder:text-white/70 rounded-md px-3 py-2"
                />
                <button type="submit" className="bg-white text-orange-600 hover:bg-gray-100 rounded-md px-4 py-2 font-medium">
                  Subscribe
                </button>
              </form>
              <p className="text-xs text-white/80 mt-2">
                By subscribing, you consent to our Privacy Policy and agree to receive updates.
              </p>
            </div>

            {/* Quick Links Column */}
            <div className="md:col-span-1">
              <h3 className="font-semibold mb-4 text-base md:text-lg">Quick Links</h3>
              <ul className="space-y-2">
                {footerLinks.quick.map((link) => (
                  <li key={link.name}>
                    <Link href={link.href} className="text-white/80 hover:text-white transition-colors text-sm">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources Column */}
            <div className="md:col-span-1">
              <h3 className="font-semibold mb-4 text-base md:text-lg">Resources</h3>
              <ul className="space-y-2">
                {footerLinks.resources.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-white/80 hover:text-white transition-colors text-sm"
                      target={link.href.startsWith("http") ? "_blank" : undefined}
                      rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Connect With Us Column */}
            <div className="md:col-span-1">
              <h3 className="font-semibold mb-4 text-base md:text-lg">Connect With Us</h3>
              <ul className="space-y-2">
                {footerLinks.socials.map((social) => (
                  <li key={social.name}>
                    <Link
                      href={social.href}
                      className="flex items-center text-white/80 hover:text-white transition-colors text-sm"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span className="h-5 w-5 mr-3 inline-block rounded-full bg-white/20" />
                      {social.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Separator */}
          <div className="my-8 h-px bg-white/20" />

          {/* Bottom Section */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-white/80">
            <div>Copyright © {new Date().getFullYear()} Beyond Career Pvt Ltd - All rights reserved.</div>
            <div className="flex space-x-6">
              <Link href="/privacy" className="hover:text-white">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-white">
                Terms of Service
              </Link>
              <Link href="#" className="hover:text-white">
                Cookie Settings
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}