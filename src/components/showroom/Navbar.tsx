import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useState } from "react";

const links = [
  { label: "Collection", href: "#collection" },
  { label: "3D View", href: "#viewer" },
  { label: "Compare", href: "#compare" },
  { label: "Configure", href: "#configurator" },
  { label: "Contact", href: "#contact" },
];

export const Navbar = () => {
  const [open, setOpen] = useState(false);
  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
      className="fixed inset-x-0 top-0 z-50"
    >
      <div className="container flex items-center justify-between py-5">
        <a href="#" className="font-display text-sm font-bold tracking-[0.4em] text-gradient-silver">
          APEX<span className="text-primary">.</span>MOTORS
        </a>

        <nav className="hidden items-center gap-10 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="font-display text-xs tracking-[0.25em] text-muted-foreground transition-colors hover:text-foreground"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <a
          href="#contact"
          className="hidden rounded-full border border-primary/40 bg-primary/10 px-5 py-2 font-display text-xs tracking-[0.25em] text-primary-glow shadow-glow-sm transition hover:bg-primary/20 md:inline-block"
        >
          BOOK DRIVE
        </a>

        <button onClick={() => setOpen(!open)} className="md:hidden text-foreground">
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {open && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-strong mx-4 mb-2 rounded-2xl px-6 py-6 md:hidden"
        >
          <div className="flex flex-col gap-4">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="font-display text-xs tracking-[0.25em] text-muted-foreground hover:text-foreground"
              >
                {l.label}
              </a>
            ))}
          </div>
        </motion.div>
      )}
    </motion.header>
  );
};
