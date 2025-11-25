"use client";

import Link from "next/link";
import type React from "react";
import type { ReactNode } from "react";

type CTAButtonProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "brand";
  className?: string;
  ariaLabel?: string;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
};

export default function CTAButton({
  href,
  children,
  variant = "primary",
  className = "",
  ariaLabel,
  onClick,
}: CTAButtonProps) {
  const base =
    "inline-flex items-center justify-center px-8 py-4 text-base font-semibold rounded-full transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-secondary";
  const styles =
    variant === "primary"
      ? "text-white bg-gradient-to-r from-orange-500 to-orange-600 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 hover:from-orange-600 hover:to-orange-700"
      : variant === "brand"
      ? "text-white bg-gradient-to-r from-[#334EAC] to-[#4ebbf8] shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 hover:opacity-90"
      : "text-gray-700 bg-white border-2 border-gray-300 hover:border-gray-400";

  return (
    <Link href={href} aria-label={ariaLabel} className={`${base} ${styles} ${className}`} onClick={onClick}>
      {children}
    </Link>
  );
}