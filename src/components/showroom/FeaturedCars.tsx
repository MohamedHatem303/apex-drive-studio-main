import { motion } from "framer-motion";
import { SectionTitle } from "./SectionTitle";
import amg from "@/assets/car-amg.jpg";
import bmw from "@/assets/car-bmw.jpg";
import sl from "@/assets/car-sl.jpg";
import m8 from "@/assets/car-m8.jpg";

const cars = [
  {
    name: "AMG GT Black Series",
    brand: "MERCEDES-AMG",
    desc: "A track-bred icon. Hand-built V8 biturbo engineered for the apex.",
    hp: "730",
    top: "325",
    accel: "3.2",
    img: amg,
  },
  {
    name: "M4 Competition",
    brand: "BMW M",
    desc: "Race precision meets daily refinement. Six cylinders of pure intent.",
    hp: "503",
    top: "290",
    accel: "3.5",
    img: bmw,
  },
  {
    name: "AMG SL 63",
    brand: "MERCEDES-AMG",
    desc: "Open-air luxury, track-day capability. The roadster reimagined.",
    hp: "585",
    top: "315",
    accel: "3.6",
    img: sl,
  },
  {
    name: "M8 Competition",
    brand: "BMW M",
    desc: "Grand tourer with the soul of a supercar. Effortless and ferocious.",
    hp: "617",
    top: "305",
    accel: "3.0",
    img: m8,
  },
];

export const FeaturedCars = () => {
  return (
    <section id="collection" className="relative py-32">
      <div className="container">
        <SectionTitle
          eyebrow="THE COLLECTION"
          title={<>Curated <span className="text-gradient-silver">Performance</span></>}
          description="Four masterpieces from two iconic divisions. Each engineered without compromise."
        />

        <div className="grid gap-8 md:grid-cols-2">
          {cars.map((car, i) => (
            <motion.article
              key={car.name}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.8, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="group relative overflow-hidden rounded-3xl bg-gradient-card p-1 hover-lift"
            >
              <div className="overflow-hidden rounded-[20px] bg-card">
                <div className="relative aspect-[16/10] overflow-hidden bg-background">
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent z-10" />
                  <img
                    src={car.img}
                    alt={`${car.name} luxury performance car`}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-110"
                  />
                  <div className="absolute left-5 top-5 z-20 rounded-full bg-background/70 px-3 py-1 backdrop-blur">
                    <span className="font-display text-[9px] tracking-[0.3em] text-primary-glow">
                      {car.brand}
                    </span>
                  </div>
                </div>

                <div className="p-7">
                  <h3 className="font-display text-2xl font-bold text-foreground">
                    {car.name}
                  </h3>
                  <p className="mt-3 text-sm text-muted-foreground">{car.desc}</p>

                  <div className="mt-6 grid grid-cols-3 gap-4 border-t border-border pt-6">
                    <Stat label="HORSEPOWER" value={car.hp} />
                    <Stat label="TOP SPEED" value={`${car.top}`} unit="km/h" />
                    <Stat label="0–100" value={car.accel} unit="sec" />
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

const Stat = ({ label, value, unit }: { label: string; value: string; unit?: string }) => (
  <div>
    <div className="flex items-baseline gap-1">
      <span className="font-display text-2xl font-bold text-foreground">{value}</span>
      {unit && <span className="text-[10px] text-muted-foreground">{unit}</span>}
    </div>
    <div className="font-display mt-1 text-[9px] tracking-[0.25em] text-muted-foreground">{label}</div>
  </div>
);
