import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { SectionTitle } from "./SectionTitle";
import amg from "@/assets/car-amg.jpg";
import bmw from "@/assets/car-bmw.jpg";

export const Compare = () => {
  const [pos, setPos] = useState(50);
  const ref = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const update = (clientX: number) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const p = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.max(8, Math.min(92, p)));
  };

  return (
    <section id="compare" className="relative py-32">
      <div className="container">
        <SectionTitle
          eyebrow="HEAD TO HEAD"
          title={<>AMG vs <span className="text-gradient-silver">M Power</span></>}
          description="Two philosophies of performance. Drag the divider to compare."
        />

        <div
          ref={ref}
          onMouseMove={(e) => dragging.current && update(e.clientX)}
          onMouseUp={() => (dragging.current = false)}
          onMouseLeave={() => (dragging.current = false)}
          onTouchMove={(e) => update(e.touches[0].clientX)}
          className="relative aspect-[16/9] w-full select-none overflow-hidden rounded-3xl border border-border bg-card shadow-elegant"
        >
          {/* BMW (right) base */}
          <img
            src={bmw}
            alt="BMW M comparison"
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute right-6 top-6 rounded-full glass px-4 py-1.5 font-display text-[10px] tracking-[0.3em] text-primary-glow">
            BMW M
          </div>

          {/* AMG (left) clipped */}
          <div
            className="absolute inset-0 overflow-hidden"
            style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
          >
            <img
              src={amg}
              alt="Mercedes-AMG comparison"
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute left-6 top-6 rounded-full glass px-4 py-1.5 font-display text-[10px] tracking-[0.3em] text-primary-glow">
              MERCEDES-AMG
            </div>
          </div>

          {/* Divider */}
          <div
            className="absolute inset-y-0 z-10 w-[2px] bg-gradient-to-b from-primary via-primary-glow to-primary shadow-glow"
            style={{ left: `${pos}%`, transform: "translateX(-50%)" }}
          >
            <button
              onMouseDown={() => (dragging.current = true)}
              onTouchStart={() => (dragging.current = true)}
              className="absolute top-1/2 left-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 cursor-ew-resize items-center justify-center rounded-full border border-primary/60 bg-background/90 backdrop-blur shadow-glow animate-pulse-glow"
              aria-label="Drag to compare"
            >
              <span className="font-display text-xs text-primary-glow">↔</span>
            </button>
          </div>
        </div>

        {/* Specs comparison */}
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {[
            {
              brand: "MERCEDES-AMG",
              soul: "Hand-built V8 character",
              rows: [
                ["Engine", "4.0L Biturbo V8"],
                ["Power", "730 hp"],
                ["Torque", "800 Nm"],
                ["Soul", "Cinematic, theatrical"],
              ],
            },
            {
              brand: "BMW M",
              soul: "Surgical inline-six precision",
              rows: [
                ["Engine", "3.0L Twin-Turbo I6"],
                ["Power", "503 hp"],
                ["Torque", "650 Nm"],
                ["Soul", "Sharp, analytical"],
              ],
            },
          ].map((c, i) => (
            <motion.div
              key={c.brand}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.15 }}
              className="glass rounded-2xl p-7"
            >
              <div className="font-display text-[10px] tracking-[0.3em] text-primary-glow">{c.brand}</div>
              <div className="mt-2 font-display text-xl font-bold">{c.soul}</div>
              <div className="mt-5 space-y-3">
                {c.rows.map(([k, v]) => (
                  <div key={k} className="flex items-center justify-between border-b border-border/60 pb-2 text-sm">
                    <span className="text-muted-foreground">{k}</span>
                    <span className="font-display tracking-wide text-foreground">{v}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
