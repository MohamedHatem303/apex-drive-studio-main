import { motion } from "framer-motion";

interface Props {
  eyebrow: string;
  title: React.ReactNode;
  description?: string;
  align?: "left" | "center";
}

export const SectionTitle = ({ eyebrow, title, description, align = "center" }: Props) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={`mb-14 ${align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-2xl text-left"}`}
    >
      <div className={`mb-4 inline-flex items-center gap-3 ${align === "center" ? "" : ""}`}>
        <span className="h-[1px] w-8 bg-primary" />
        <span className="font-display text-[10px] tracking-[0.4em] text-primary">{eyebrow}</span>
      </div>
      <h2 className="font-display text-4xl font-bold leading-tight text-balance sm:text-5xl lg:text-6xl">
        {title}
      </h2>
      {description && (
        <p className="mx-auto mt-5 max-w-xl text-balance text-muted-foreground">
          {description}
        </p>
      )}
    </motion.div>
  );
};
