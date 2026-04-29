import { ArrowRight, Sparkles } from "lucide-react";

// ── Meaningful stats ──
const stats = [
  { value: "340", unit: "km/h", label: "Top Speed" },
  { value: "3.8s", unit: "", label: "0–100 km/h" },
  { value: "500+", unit: "", label: "Vehicles Sold" },
];

const tags = ["Hand-Picked Fleet", "White Glove Delivery", "5-Year Guarantee"];

// ── Gauge / Dashboard data ──
const metrics = [
  { label: "Acceleration", display: "9.4 / 10", pct: 94 },
  { label: "Top Speed", display: "340 km/h", pct: 85 },
  { label: "Engine Output", display: "550 hp", pct: 78 },
];

// ── SVG gauge maths ──
const CX = 160;
const CY = 148;
const R = 112;
const START_ANGLE = 150;
const END_ANGLE = 30;
const TOTAL_SWEEP = 240;
const TICK_COUNT = 10;
const FILL_PCT = 0.82;

function polar(angleDeg: number, r = R) {
  const rad = (angleDeg * Math.PI) / 180;
  return { x: CX + r * Math.cos(rad), y: CY + r * Math.sin(rad) };
}

const arcStart = polar(START_ANGLE);
const arcEnd = polar(END_ANGLE);
const ARC_D = `M ${arcStart.x.toFixed(2)} ${arcStart.y.toFixed(2)} A ${R} ${R} 0 1 1 ${arcEnd.x.toFixed(2)} ${arcEnd.y.toFixed(2)}`;
const tickAngles = Array.from(
  { length: TICK_COUNT + 1 },
  (_, i) => START_ANGLE + (TOTAL_SWEEP / TICK_COUNT) * i
);

export const Hero = () => {
  return (
    <section className="relative isolate w-full overflow-hidden bg-[#05060b] text-white">
      {/* Background */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,rgba(14,165,233,0.16),transparent_32%),radial-gradient(circle_at_bottom_right,rgba(34,211,238,0.08),transparent_28%),linear-gradient(180deg,#090b12_0%,#05060b_58%,#0a0a0a_100%)]" />

      {/* Floating orbs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-24 top-20 h-72 w-72 rounded-full bg-cyan-400/10 blur-3xl" />
        <div className="absolute right-[-80px] top-1/3 h-80 w-80 rounded-full bg-blue-500/10 blur-3xl" />
      </div>

      {/* Main Grid */}
      <div className="mx-auto grid min-h-[100svh] max-w-7xl items-center gap-8 overflow-hidden px-4 py-10 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:py-10">
        {/* Left */}
        <div className="mx-auto flex max-w-2xl flex-col items-center text-center lg:mx-0 lg:items-start lg:text-left">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[11px] tracking-[0.26em] text-cyan-200/80 uppercase backdrop-blur-md">
            <Sparkles size={14} />
            Premium automotive collection
          </div>

          <h1 className="mt-5 text-center text-5xl font-black leading-[0.92] sm:text-6xl md:text-7xl lg:text-left xl:text-8xl">
            PERFORMANCE,
            <br />
            <span className="bg-gradient-to-r from-white via-cyan-100 to-cyan-400 bg-clip-text text-transparent">
              CURATED.
            </span>
          </h1>

          <p className="mt-5 max-w-xl text-pretty text-sm leading-7 text-white/55 sm:text-base">
            We source the world's most exceptional performance machines — every
            vehicle privately inspected, track-tested, and certified before it
            earns its place in our collection. No compromises. No exceptions.
          </p>

          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row lg:items-start">
            <a
              href="#collection"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-cyan-400 px-6 py-3.5 text-sm font-semibold text-slate-950 transition-transform hover:scale-[1.02] active:scale-[0.98]"
            >
              Explore collection
              <ArrowRight size={16} />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/12 bg-white/6 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur-md transition hover:bg-white/10"
            >
              Contact us
            </a>
          </div>
        </div>

        {/* Right - bounce animation - isolated layer */}
        <div className="relative w-full max-w-lg justify-self-center lg:max-w-none" style={{ isolation: "isolate", zIndex: 10 }}>
          <div className="absolute -inset-3 rounded-[2rem] bg-cyan-400/5 blur-2xl" />

          <div
            className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.035] p-5 shadow-2xl shadow-black/40 backdrop-blur-md sm:p-6"
            style={{
              animation: "floatUpDown 3s ease-in-out infinite",
            }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-cyan-300" />
                <span className="text-[10px] tracking-[0.3em] text-cyan-200/70 uppercase">
                  Apex Studio
                </span>
              </div>
              <span className="text-[10px] tracking-[0.22em] text-white/30 uppercase">
                01
              </span>
            </div>

            <div className="mt-6 space-y-4">
              <div className="h-px w-full bg-gradient-to-r from-transparent via-white/15 to-transparent" />
              <p className="max-w-sm text-balance text-2xl font-black leading-[1.05] sm:text-[2rem]">
                Driven by detail, defined by power.
              </p>
              <p className="max-w-md text-sm leading-7 text-white/50">
                Every car in our collection is chosen for its presence, precision, and performance. From the first glance to the final drive, we make sure every detail feels exceptional — because we know that's what true enthusiasts demand.
              </p>
            </div>

            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {["Exclusive", "Precision", "Performance"].map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-white/8 bg-white/[0.03] px-3 py-4 text-center text-[10px] tracking-[0.18em] text-white/55 uppercase"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom vignette */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/80 to-transparent" />

      {/* Keyframes for bounce animation */}
      <style>{`
        @keyframes floatUpDown {
          0%, 100% { transform: translateY(0); }
          50%       { transform: translateY(-12px); }
        }
      `}</style>
    </section>
  );
};