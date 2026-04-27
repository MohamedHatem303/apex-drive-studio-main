import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { SectionTitle } from "./SectionTitle";

const stats = [
  { label: "HORSEPOWER", value: 730, unit: "HP", max: 1000 },
  { label: "TORQUE", value: 800, unit: "Nm", max: 1000 },
  { label: "TOP SPEED", value: 325, unit: "KM/H", max: 400 },
  { label: "0–100 KM/H", value: 2.6, unit: "SEC", max: 5, decimals: 1, invert: true },
];

const Counter = ({ to, decimals = 0, active }: { to: number; decimals?: number; active: boolean }) => {
  const mv = useMotionValue(0);
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!active) return;
    const c = animate(mv, to, { duration: 2.2, ease: [0.22, 1, 0.36, 1] });
    const u = mv.on("change", (x) => setV(x));
    return () => { c.stop(); u(); };
  }, [active, to, mv]);
  return <>{decimals ? v.toFixed(decimals) : Math.floor(v).toLocaleString()}</>;
};

export const Stats = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="relative py-32">
      <div className="container">
        <SectionTitle
          eyebrow="ENGINEERED FORCE"
          title={<>Numbers that <span className="text-gradient-glow">redefine</span></>}
        />

        <div ref={ref} className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s, i) => {
            const pct = s.invert
              ? Math.max(10, 100 - (s.value / s.max) * 100)
              : (s.value / s.max) * 100;
            return (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 40 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: i * 0.12 }}
                className="glass relative overflow-hidden rounded-2xl p-7"
              >
                <div className="font-display text-[10px] tracking-[0.3em] text-muted-foreground">
                  {s.label}
                </div>
                <div className="mt-3 flex items-baseline gap-2">
                  <span className="font-display text-5xl font-bold text-foreground tabular-nums">
                    <Counter to={s.value} decimals={s.decimals} active={inView} />
                  </span>
                  <span className="font-display text-xs tracking-[0.2em] text-muted-foreground">
                    {s.unit}
                  </span>
                </div>

                {/* Progress bar */}
                <div className="mt-6 h-1 w-full overflow-hidden rounded-full bg-border">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={inView ? { width: `${pct}%` } : {}}
                    transition={{ duration: 1.6, delay: 0.3 + i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                    className="h-full rounded-full bg-gradient-glow shadow-glow-sm"
                  />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
