"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { scrollToId, lockScroll } from "@/components/SmoothScroll";
import { SITE } from "@/lib/site";

const LINKS = [
  { label: "Experience", href: "#experience" },
  { label: "Stories", href: "#stories" },
  { label: "Contact", href: "#contact" },
] as const;

export default function Nav() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let raf = 0;
    const read = () => {
      raf = 0;
      setScrolled(window.scrollY > 24);
      const probe = 48;
      const sections = document.querySelectorAll<HTMLElement>("[data-nav-theme]");
      let next: "light" | "dark" | null = null;
      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= probe && rect.bottom > probe) {
          next = section.dataset.navTheme === "dark" ? "dark" : "light";
        }
      });
      if (next) setTheme(next);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(read);
    };
    read();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  useEffect(() => {
    lockScroll(open);
    return () => lockScroll(false);
  }, [open]);

  const go = useCallback((href: string) => {
    setOpen(false);
    requestAnimationFrame(() => scrollToId(href));
  }, []);

  const dark = open || theme === "dark";
  const tone = dark ? "text-cream" : "text-ink";

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${tone}`}
      >
        <div
          className={`transition-all duration-500 ${
            scrolled || open
              ? dark
                ? "bg-night/60 backdrop-blur-xl shadow-[0_1px_0_rgba(253,244,238,0.08)]"
                : "bg-paper/70 backdrop-blur-xl shadow-[0_1px_0_rgba(19,27,66,0.08)]"
              : "bg-transparent"
          }`}
        >
          <nav
            className={`container-x flex items-center justify-between transition-all duration-500 ${
              scrolled ? "h-16 md:h-[68px]" : "h-[76px] md:h-20"
            }`}
          >
            <a
              href="#top"
              onClick={(e) => {
                e.preventDefault();
                go("#top");
              }}
              className="group flex flex-col leading-none"
              aria-label="Studio Memento — home"
            >
              <span className="text-sm font-semibold lowercase tracking-[0.02em] transition-transform duration-300 ease-luxe group-hover:-translate-y-px">
                studio
              </span>
              <span className="-mt-[10px] font-script text-[1.7rem] transition-transform duration-300 ease-luxe group-hover:translate-y-px md:text-[1.85rem]">
                memento
              </span>
            </a>

            <div className="hidden items-center gap-9 md:flex">
              {LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    go(link.href);
                  }}
                  className="relative text-[0.9rem] font-medium opacity-80 transition-opacity duration-300 after:absolute after:left-0 after:-bottom-1.5 after:h-[1.5px] after:w-full after:origin-left after:scale-x-0 after:bg-current after:transition-transform after:duration-300 after:ease-luxe hover:opacity-100 hover:after:scale-x-100"
                >
                  {link.label}
                </a>
              ))}
              <button
                onClick={() => go("#booking")}
                className={`rounded-full px-6 py-2.5 text-[0.9rem] font-semibold transition-all duration-300 ease-luxe hover:-translate-y-0.5 active:translate-y-0 ${
                  dark
                    ? "bg-pink text-white shadow-glow-pink hover:bg-pink-deep"
                    : "bg-blue text-white shadow-glow-blue hover:bg-blue-deep"
                }`}
              >
                Book a session
              </button>
            </div>

            <button
              className="relative flex h-11 w-11 items-center justify-center md:hidden"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
            >
              <span
                className={`absolute h-[1.5px] w-6 bg-current transition-all duration-300 ease-luxe ${
                  open ? "rotate-45" : "-translate-y-[4px]"
                }`}
              />
              <span
                className={`absolute h-[1.5px] w-6 bg-current transition-all duration-300 ease-luxe ${
                  open ? "-rotate-45" : "translate-y-[4px]"
                }`}
              />
            </button>
          </nav>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-40 flex flex-col justify-center bg-night md:hidden"
          >
            <div
              aria-hidden
              className="absolute inset-0 opacity-40 [background:radial-gradient(60%_50%_at_20%_20%,rgba(64,89,241,0.5),transparent_70%),radial-gradient(50%_45%_at_80%_75%,rgba(244,81,155,0.45),transparent_70%)]"
            />
            <nav className="container-x relative flex flex-col gap-2">
              {[{ label: "Book a session", href: "#booking" }, ...LINKS].map(
                (link, i) => (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    initial={{ opacity: 0, y: 28 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 12 }}
                    transition={{
                      delay: 0.08 + i * 0.07,
                      duration: 0.55,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    onClick={(e) => {
                      e.preventDefault();
                      go(link.href);
                    }}
                    className={`border-b border-night-line py-5 font-display text-3xl font-bold uppercase tracking-tight ${
                      link.href === "#booking" ? "text-pink" : "text-cream"
                    }`}
                  >
                    {link.label}
                  </motion.a>
                )
              )}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.4 }}
                className="mt-8 font-script text-2xl text-mist"
              >
                {SITE.hours} · every day
              </motion.p>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
