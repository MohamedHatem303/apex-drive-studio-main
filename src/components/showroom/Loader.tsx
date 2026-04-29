import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

interface LoaderProps {
  onComplete: () => void;
}

export const Loader = ({ onComplete }: LoaderProps) => {
  const [rpm, setRpm] = useState(0);
  const [showEnterButton, setShowEnterButton] = useState(false);
  const [isEntering, setIsEntering] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const needleRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const keepAudioPlayingRef = useRef(false);

  useEffect(() => {
    const audio = new Audio("/sounds/engine-rev.mp3");
    audio.preload = "auto";
    audio.volume = 1;
    audioRef.current = audio;

    const counter = { val: 0 };

    const tl = gsap.timeline({
      onComplete: () => {
        setRpm(8000);
        setShowEnterButton(true);
      },
    });

    tl.to(needleRef.current, {
      rotate: 135,
      duration: 2.8,
      ease: "power4.out",
    }).to(
      counter,
      {
        val: 8000,
        duration: 2.8,
        ease: "power4.out",
        onUpdate: () => setRpm(Math.floor(counter.val)),
      },
      "<"
    );

    return () => {
      tl.kill();

      if (!keepAudioPlayingRef.current) {
        audio.pause();
        audio.currentTime = 0;
      }
    };
  }, []);

  const handleEnter = async () => {
    if (isEntering) return;

    setIsEntering(true);
    keepAudioPlayingRef.current = true;

    const audio = audioRef.current ?? new Audio("/sounds/engine-rev.mp3");
    audioRef.current = audio;
    audio.currentTime = 0;
    audio.volume = 1;

    try {
      await audio.play();
    } catch {}

    gsap.to(containerRef.current, {
      opacity: 0,
      duration: 0.8,
      ease: "power2.inOut",
      onComplete: () => {
        onComplete();
      },
    });
  };

  const ticks = Array.from({ length: 9 }, (_, i) => i);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background overflow-hidden"
      // ↑ أضفنا overflow-hidden هنا — ده بيمنع أي عنصر داخلي من إنه يعمل scrollbar
    >
      <div className="pointer-events-none absolute inset-0 bg-gradient-hero" />

      <div className="font-display mb-10 text-xs tracking-[0.4em] text-muted-foreground">
        IGNITION SEQUENCE
      </div>

      {/* Gauge + Button Wrapper */}
      <div className="flex flex-col items-center w-full max-w-[90vw] mx-auto">
        {/* ↑ أضفنا w-full max-w-[90vw] mx-auto عشان نضمن إن الـ gauge مش بيتجاوز الشاشة */}

        <div className="relative h-[280px] w-[280px] sm:h-[360px] sm:w-[360px] shrink-0">
          {/* ↑ أضفنا shrink-0 عشان الـ gauge ميتضغطش */}

          <div className="absolute inset-0 rounded-full border border-border/60 bg-gradient-metal shadow-elegant" />
          <div className="absolute inset-3 rounded-full border border-border/40" />

          {ticks.map((t) => {
            const angle = -135 + (t / 8) * 270;
            const isRedline = t >= 7;

            return (
              <div
                key={t}
                className="absolute left-1/2 top-1/2 origin-bottom"
                style={{
                  height: "45%",
                  transform: `translate(-50%, -100%) rotate(${angle}deg)`,
                }}
              >
                <div
                  className={`mx-auto h-3 w-[2px] ${
                    isRedline ? "bg-destructive" : "bg-silver/70"
                  }`}
                />
                <div
                  className={`mt-2 text-center font-display text-[10px] sm:text-xs ${
                    isRedline ? "text-destructive" : "text-silver/80"
                  }`}
                  style={{ transform: `rotate(${-angle}deg)` }}
                >
                  {t}
                </div>
              </div>
            );
          })}

          <div
            ref={needleRef}
            className="absolute left-1/2 top-1/2 h-[42%] w-[4px] origin-bottom -translate-x-1/2 -translate-y-full rounded-full bg-gradient-to-t from-primary to-primary-glow shadow-glow"
            style={{ transform: "translate(-50%, -100%) rotate(-135deg)" }}
          />

          <div className="absolute left-1/2 top-1/2 h-6 w-6 -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/50 bg-background shadow-glow-sm" />

          <div className="absolute bottom-12 left-1/2 -translate-x-1/2 text-center">
            <div className="font-display text-3xl font-bold tabular-nums text-foreground sm:text-4xl">
              {rpm.toLocaleString()}
            </div>
            <div className="font-display text-[10px] tracking-[0.3em] text-muted-foreground">
              RPM
            </div>
          </div>
        </div>

        {/* ENTER Button BELOW gauge circle */}
        {showEnterButton && (
          <button
            onClick={handleEnter}
            disabled={isEntering}
            className="mt-8 rounded-full border border-primary/40 bg-primary/10 px-10 py-3 font-display text-sm tracking-[0.35em] text-foreground shadow-glow transition-all duration-300 hover:scale-105 hover:bg-primary/20 disabled:cursor-wait disabled:opacity-70"
          >
            ENTER
          </button>
        )}
      </div>

      <div className="font-display mt-12 text-sm tracking-[0.5em] text-gradient-silver">
        APEX MOTORS
      </div>
    </div>
  );
};