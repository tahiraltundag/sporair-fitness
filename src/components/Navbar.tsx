"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";

const links = [
  { label: "Classes",  href: "#schedule" },
  { label: "Trainers", href: "#trainers" },
  { label: "Pricing",  href: "#cta" },
  { label: "About",    href: "#" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open,     setOpen]     = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 48);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <>
      <nav
        className={cn(
          "fixed top-0 inset-x-0 z-50 transition-all duration-300",
          scrolled
            ? "bg-[#0a0a0a]/95 backdrop-blur-sm border-b border-white/[0.06]"
            : "bg-transparent",
        )}
      >
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex items-center gap-3 group">
            <span className="font-display text-2xl tracking-[0.12em] text-white group-hover:text-[#facc15] transition-colors duration-200">
              ATLAS
            </span>
            <span
              className="w-[6px] h-[6px] bg-[#facc15] rotate-45 shrink-0"
              aria-hidden
            />
          </a>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-9">
            {links.map((l) => (
              <a
                key={l.label}
                href={l.href}
                className="font-body text-[11px] tracking-[0.18em] uppercase text-white/50 hover:text-white transition-colors duration-150"
              >
                {l.label}
              </a>
            ))}
          </div>

          {/* Book CTA */}
          <a
            href="#cta"
            className="hidden md:inline-block bg-[#facc15] text-[#0a0a0a] font-display text-[13px] tracking-[0.18em] uppercase px-6 py-[10px] hover:bg-[#fafaf5] transition-colors duration-150"
          >
            Book Session
          </a>

          {/* Burger */}
          <button
            className="md:hidden text-white p-1.5"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-[#0a0a0a] flex flex-col items-start justify-center px-10 md:hidden"
          >
            <div className="flex flex-col gap-1 w-full">
              {links.map((l, i) => (
                <motion.a
                  key={l.label}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.07, duration: 0.3, ease: [0.25, 0.4, 0.25, 1] }}
                  className="font-display text-5xl tracking-[0.06em] uppercase text-white/80 hover:text-[#facc15] py-2 transition-colors"
                >
                  {l.label}
                </motion.a>
              ))}
            </div>
            <motion.a
              href="#cta"
              onClick={() => setOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.32 }}
              className="mt-10 bg-[#facc15] text-[#0a0a0a] font-display text-xl tracking-[0.14em] uppercase px-10 py-5 hover:bg-[#fafaf5] transition-colors"
            >
              Book Intro Session
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
