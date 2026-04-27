import { Instagram, Twitter, Youtube, Facebook } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="relative border-t border-border py-16">
      <div className="container">
        <div className="grid gap-12 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="font-display text-sm font-bold tracking-[0.4em] text-gradient-silver">
              APEX<span className="text-primary">.</span>MOTORS
            </div>
            <p className="mt-4 max-w-sm text-sm text-muted-foreground">
              A private showroom for the world's most desirable performance machines.
              Engineered experiences, beyond ownership.
            </p>
            <div className="mt-6 flex gap-3">
              {[Instagram, Twitter, Youtube, Facebook].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted-foreground transition hover:border-primary hover:text-primary-glow"
                  aria-label="Social link"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {[
            { title: "EXPLORE", links: ["Collection", "3D Viewer", "Compare", "Configure"] },
            { title: "COMPANY", links: ["About", "Showrooms", "Careers", "Press"] },
          ].map((col) => (
            <div key={col.title}>
              <div className="font-display text-[10px] tracking-[0.3em] text-primary-glow">{col.title}</div>
              <ul className="mt-5 space-y-3">
                {col.links.map((l) => (
                  <li key={l}>
                    <a href="#" className="text-sm text-muted-foreground transition hover:text-foreground">
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row">
          <span>© {new Date().getFullYear()} Apex Motors. Crafted for the obsessed.</span>
          <span className="font-display tracking-[0.25em]">PRIVACY · TERMS · COOKIES</span>
        </div>
      </div>
    </footer>
  );
};
