import { motion } from "framer-motion";
import { SectionTitle } from "./SectionTitle";
import { Quote, Star } from "lucide-react";

const items = [
  {
    quote: "Apex delivers an experience I haven't felt at any dealership. Every detail is intentional.",
    name: "Adrian Vossberg",
    role: "Collector — Munich",
  },
  {
    quote: "From configurator to keys in hand — flawless. The cars speak for themselves; the service amplifies them.",
    name: "Lina Marchetti",
    role: "Architect — Milan",
  },
  {
    quote: "An honest love for performance machines. They listen, then deliver beyond expectation.",
    name: "Daniel Okafor",
    role: "Founder — London",
  },
];

const trust = ["MERCEDES-AMG", "BMW M", "PIRELLI", "AKRAPOVIČ", "BREMBO"];

export const Testimonials = () => {
  return (
    <section className="relative py-32">
      <div className="container">
        <SectionTitle
          eyebrow="TRUSTED BY DRIVERS"
          title={<>Voices from the <span className="text-gradient-silver">paddock</span></>}
        />

        <div className="grid gap-6 md:grid-cols-3">
          {items.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.12 }}
              className="glass relative rounded-2xl p-7 hover-lift"
            >
              <Quote className="text-primary/40" size={28} />
              <p className="mt-4 text-balance text-sm text-foreground/90">"{t.quote}"</p>
              <div className="mt-6 flex items-center justify-between border-t border-border pt-4">
                <div>
                  <div className="font-display text-sm text-foreground">{t.name}</div>
                  <div className="font-display text-[10px] tracking-[0.2em] text-muted-foreground">{t.role}</div>
                </div>
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, k) => (
                    <Star key={k} size={12} className="fill-primary text-primary" />
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Trust strip */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="mt-20 flex flex-wrap items-center justify-center gap-x-12 gap-y-4 border-y border-border py-8"
        >
          {trust.map((t) => (
            <span key={t} className="font-display text-xs tracking-[0.3em] text-muted-foreground">
              {t}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
