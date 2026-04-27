import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { SectionTitle } from "./SectionTitle";
import interior from "@/assets/interior.jpg";
import wheel from "@/assets/interior-wheel.jpg";

export const Interior = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y1 = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const y2 = useTransform(scrollYProgress, [0, 1], [-40, 40]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  return (
    <section ref={ref} className="relative py-32 overflow-hidden">
      <div className="container">
        <SectionTitle
          eyebrow="INSIDE THE COCKPIT"
          title={<>A sanctuary of <span className="text-gradient-silver">craft</span></>}
          description="Hand-stitched leather. Carbon fiber. Ambient illumination tuned for the driver."
        />

        <div className="grid gap-8 lg:grid-cols-12">
          <motion.div
            style={{ y: y1 }}
            className="relative overflow-hidden rounded-3xl shadow-elegant lg:col-span-7"
          >
            <motion.img
              style={{ scale }}
              src={interior}
              alt="Luxury car cockpit with ambient blue lighting and carbon fiber dashboard"
              loading="lazy"
              className="aspect-[16/10] w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <div className="font-display text-[10px] tracking-[0.3em] text-primary-glow">DASHBOARD</div>
              <div className="mt-1 font-display text-2xl font-bold">Digital cluster, analog soul</div>
            </div>
          </motion.div>

          <div className="grid gap-8 lg:col-span-5">
            <motion.div
              style={{ y: y2 }}
              className="relative overflow-hidden rounded-3xl shadow-elegant"
            >
              <img
                src={wheel}
                alt="Luxury sports car steering wheel close-up"
                loading="lazy"
                className="aspect-[4/3] w-full object-cover transition-transform duration-1000 hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
              <div className="absolute bottom-5 left-5">
                <div className="font-display text-[10px] tracking-[0.3em] text-primary-glow">CONTROL</div>
                <div className="font-display text-xl font-bold">Carbon-rim helm</div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="glass rounded-3xl p-7"
            >
              <div className="font-display text-[10px] tracking-[0.3em] text-primary-glow">AMBIENCE</div>
              <h3 className="mt-2 font-display text-2xl font-bold">64-color illumination</h3>
              <p className="mt-3 text-sm text-muted-foreground">
                Tune the cabin to your mood. From sunset amber to electric ice — every drive becomes a scene.
              </p>
              <div className="mt-5 flex gap-2">
                {["#3b82f6", "#a855f7", "#ec4899", "#f59e0b", "#10b981"].map((c) => (
                  <div
                    key={c}
                    className="h-2 flex-1 rounded-full"
                    style={{ background: c, boxShadow: `0 0 12px ${c}` }}
                  />
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
