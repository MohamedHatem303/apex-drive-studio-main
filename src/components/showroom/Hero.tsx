import { motion, useScroll, useTransform, type Variants } from "framer-motion";
import { useRef } from "react";
import heroImage from "@/assets/hearo.png";
import { ArrowRight } from "lucide-react";

export const Hero = () => {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const textY = useTransform(scrollYProgress, [0, 1], [0, -90]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);
  const opacity = useTransform(scrollYProgress, [0, 0.85], [1, 0]);

  const stagger: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
  };

  const item: Variants = {
    hidden: { opacity: 0, y: 40 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] as const },
    },
  };

  return (
    <section
      ref={ref}
      className="relative min-h-screen overflow-hidden pt-24"
    >
      {/* Background effects */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero" />
        <div className="absolute inset-0 bg-black/35" />

        <div
          className="animate-streak absolute top-1/4 left-0 h-[1px] w-1/2 bg-gradient-to-r from-transparent via-primary to-transparent"
          style={{ animationDelay: "0s" }}
        />
        <div
          className="animate-streak absolute top-2/3 left-0 h-[1px] w-1/3 bg-gradient-to-r from-transparent via-primary-glow to-transparent"
          style={{ animationDelay: "2s" }}
        />
        <div
          className="animate-streak absolute top-1/2 left-0 h-[2px] w-1/4 bg-gradient-to-r from-transparent via-primary/60 to-transparent"
          style={{ animationDelay: "4s" }}
        />

        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute h-1 w-1 rounded-full bg-primary/40 animate-float"
            style={{
              left: `${(i * 53) % 100}%`,
              top: `${(i * 37) % 100}%`,
              animationDelay: `${i * 0.4}s`,
              animationDuration: `${5 + (i % 4)}s`,
            }}
          />
        ))}
      </div>

      {/* Full hero image */}
      <motion.div
        style={{ scale: imageScale }}
        className="absolute inset-0 z-0"
      >
        <img
          src={heroImage}
          alt="Mercedes-AMG and BMW M performance cars"
          className="h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/25 to-background/5" />
        <div className="absolute inset-0 bg-black/20" />
      </motion.div>

      {/* Center content on top of the image */}
      <motion.div
        style={{ opacity }}
        className="relative z-10 flex min-h-screen items-center justify-center"
      >
        <motion.div
          style={{ y: textY }}
          variants={stagger}
          initial="hidden"
          animate="show"
          className="container px-4"
        >
          <div className="mx-auto max-w-4xl text-center">
            <motion.div
              variants={item}
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/30 px-4 py-1.5 backdrop-blur-md"
            >
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" />
              <span className="font-display text-[10px] tracking-[0.3em] text-white/75">
                2025 PERFORMANCE COLLECTION
              </span>
            </motion.div>

            <motion.h1
              variants={item}
              className="font-display text-5xl font-bold leading-[0.95] text-balance text-white sm:text-6xl lg:text-7xl xl:text-8xl"
            >
              DRIVE
              <br />
              <span className="text-gradient-silver">BEYOND</span>
              <br />
              <span className="text-gradient-glow">LIMITS.</span>
            </motion.h1>

            <motion.p
              variants={item}
              className="mx-auto mt-8 max-w-2xl text-balance text-base text-white/75 sm:text-lg"
            >
              A curated showroom of Mercedes-AMG and BMW M masterpieces. Where
              performance, elegance and engineering converge.
            </motion.p>

            <motion.div
              variants={item}
              className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
            >
              <a
                href="#collection"
                className="group inline-flex items-center gap-3 rounded-full bg-gradient-glow px-7 py-4 font-display text-xs font-bold tracking-[0.25em] text-primary-foreground shadow-glow transition-transform hover:scale-[1.03]"
              >
                EXPLORE COLLECTION
                <ArrowRight
                  size={16}
                  className="transition-transform group-hover:translate-x-1"
                />
              </a>

              <a
                href="#contact"
                className="inline-flex items-center gap-3 rounded-full border border-white/15 bg-black/25 px-7 py-4 font-display text-xs tracking-[0.25em] text-white backdrop-blur-md transition hover:border-primary/50 hover:bg-black/40"
              >
                BOOK A TEST DRIVE
              </a>
            </motion.div>

            <motion.div
              variants={item}
              className="mx-auto mt-14 grid max-w-md grid-cols-3 gap-6 text-left"
            >
              {[
                { v: "730", l: "HP" },
                { v: "2.6s", l: "0–100" },
                { v: "330", l: "KM/H" },
              ].map((s) => (
                <div
                  key={s.l}
                  className="border-l border-white/15 pl-4"
                >
                  <div className="font-display text-2xl font-bold text-white">
                    {s.v}
                  </div>
                  <div className="font-display text-[10px] tracking-[0.25em] text-white/65">
                    {s.l}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-center"
      >
        <div className="mx-auto h-10 w-[1px] bg-gradient-to-b from-transparent via-primary to-transparent" />
        <div className="mt-3 font-display text-[10px] tracking-[0.4em] text-white/65">
          SCROLL
        </div>
      </motion.div>
    </section>
  );
};