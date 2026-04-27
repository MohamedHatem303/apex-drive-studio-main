import { motion } from "framer-motion";
import { SectionTitle } from "./SectionTitle";
import { useState } from "react";
import { toast } from "sonner";
import { z } from "zod";
import { ArrowRight } from "lucide-react";

const schema = z.object({
  name: z.string().trim().min(1, "Name required").max(80),
  email: z.string().trim().email("Invalid email").max(160),
  phone: z.string().trim().min(4, "Phone required").max(30),
  model: z.string().min(1, "Choose a model"),
  message: z.string().trim().max(800).optional().or(z.literal("")),
});

const models = ["AMG GT Black Series", "AMG SL 63", "BMW M4 Competition", "BMW M8 Competition", "Other"];

export const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", phone: "", model: models[0], message: "" });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const r = schema.safeParse(form);
    if (!r.success) {
      toast.error(r.error.issues[0].message);
      return;
    }
    toast.success("Booking received. Our concierge will contact you shortly.");
    setForm({ name: "", email: "", phone: "", model: models[0], message: "" });
  };

  return (
    <section id="contact" className="relative py-32">
      <div className="container">
        <SectionTitle
          eyebrow="RESERVE YOUR DRIVE"
          title={<>Step into the <span className="text-gradient-glow">driver's seat</span></>}
          description="Schedule a private viewing or test drive. White-glove service from inquiry to ignition."
        />

        <motion.form
          onSubmit={submit}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="glass-strong mx-auto max-w-3xl rounded-3xl p-8 sm:p-12"
        >
          <div className="grid gap-6 sm:grid-cols-2">
            <Field label="FULL NAME">
              <input
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                maxLength={80}
                className="input-luxury"
                placeholder="Jonathan Reyes"
              />
            </Field>
            <Field label="EMAIL">
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                maxLength={160}
                className="input-luxury"
                placeholder="you@domain.com"
              />
            </Field>
            <Field label="PHONE">
              <input
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                maxLength={30}
                className="input-luxury"
                placeholder="+1 555 0100"
              />
            </Field>
            <Field label="PREFERRED MODEL">
              <select
                value={form.model}
                onChange={(e) => setForm({ ...form, model: e.target.value })}
                className="input-luxury"
              >
                {models.map((m) => (
                  <option key={m} value={m} className="bg-background">{m}</option>
                ))}
              </select>
            </Field>
          </div>
          <div className="mt-6">
            <Field label="MESSAGE">
              <textarea
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                maxLength={800}
                rows={4}
                className="input-luxury resize-none"
                placeholder="Tell us what you're looking for..."
              />
            </Field>
          </div>

          <button
            type="submit"
            className="mt-8 inline-flex w-full items-center justify-center gap-3 rounded-full bg-gradient-glow px-7 py-4 font-display text-xs font-bold tracking-[0.3em] text-primary-foreground shadow-glow transition-transform hover:scale-[1.01] sm:w-auto"
          >
            REQUEST APPOINTMENT
            <ArrowRight size={16} />
          </button>
        </motion.form>
      </div>

      <style>{`
        .input-luxury {
          width: 100%;
          background: hsl(var(--input));
          border: 1px solid hsl(var(--border));
          border-radius: 12px;
          padding: 14px 16px;
          color: hsl(var(--foreground));
          font-family: inherit;
          font-size: 14px;
          transition: border-color .25s, box-shadow .25s;
          outline: none;
        }
        .input-luxury:focus {
          border-color: hsl(var(--primary) / 0.6);
          box-shadow: 0 0 0 3px hsl(var(--primary) / 0.15);
        }
        .input-luxury::placeholder { color: hsl(var(--muted-foreground)); }
      `}</style>
    </section>
  );
};

const Field = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <label className="block">
    <span className="font-display mb-2 block text-[10px] tracking-[0.3em] text-muted-foreground">{label}</span>
    {children}
  </label>
);
