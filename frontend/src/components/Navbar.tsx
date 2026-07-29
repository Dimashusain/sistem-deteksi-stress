"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

export default function Navbar() {
  const pathname = usePathname();

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Diagnosis", href: "/diagnosis" },
    { name: "About", href: "/tentang" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800/80 py-4 px-6">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Logo (Plain text, no icon as in screenshot) */}
        <Link href="/" className="font-sans font-bold text-xl tracking-tight text-[#0f172a] dark:text-white">
          SereneCheck
        </Link>

        {/* Navigation Links */}
        <nav className="flex items-center space-x-8">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`font-sans font-semibold text-sm transition-colors duration-200 relative py-1 ${
                  isActive
                    ? "text-[#0f172a] dark:text-white"
                    : "text-slate-500 hover:text-[#0f172a] dark:hover:text-white"
                }`}
              >
                {link.name}
                {isActive && (
                  <motion.div
                    layoutId="activeNavIndicator"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#0f172a] dark:bg-white"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* CTA Button (Black, rounded, no icons) */}
        <div>
          <Link
            href="/diagnosis"
            className="bg-[#0f172a] hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-[#0f172a] px-5 py-2.5 rounded-lg font-sans font-bold text-sm transition-all shadow-sm block cursor-pointer select-none"
          >
            Get Started
          </Link>
        </div>

      </div>
    </header>
  );
}
