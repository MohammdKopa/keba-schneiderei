"use client";

import { useState, useRef } from "react";
import { Phone, Mail, MessageCircle, MapPin } from "lucide-react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { business, openingHours } from "@/lib/business";
import type { Locale } from "@/lib/business";
import { t } from "@/lib/dictionary";

gsap.registerPlugin(ScrollTrigger);

interface Props { locale: Locale; }

export default function ContactSection({ locale }: Props) {
  const ref = useRef<HTMLElement>(null);
  const lang = t(locale);
  const [status, setStatus] = useState<"idle" | "sent">("idle");

  useGSAP(() => {
    if (!ref.current) return;
    const ctx = gsap.context(() => {
      gsap.from("[data-contact-head] > *", {
        opacity: 0, y: 30, duration: 1.1, ease: "power3.out", stagger: 0.12,
        scrollTrigger: { trigger: "[data-contact-head]", start: "top 80%", toggleActions: "play none none none" },
      });
      gsap.from("[data-contact-rail] > *", {
        opacity: 0, y: 20, duration: 0.9, ease: "power3.out", stagger: 0.08,
        scrollTrigger: { trigger: "[data-contact-rail]", start: "top 80%", toggleActions: "play none none none" },
      });
      gsap.from("[data-contact-form] .field", {
        opacity: 0, y: 20, duration: 0.9, ease: "power3.out", stagger: 0.1,
        scrollTrigger: { trigger: "[data-contact-form]", start: "top 80%", toggleActions: "play none none none" },
      });
    }, ref);
    return () => ctx.revert();
  }, { scope: ref });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = encodeURIComponent(String(data.get("name") || ""));
    const email = encodeURIComponent(String(data.get("email") || ""));
    const phone = encodeURIComponent(String(data.get("phone") || ""));
    const subject = encodeURIComponent(String(data.get("subject") || ""));
    const message = encodeURIComponent(String(data.get("message") || ""));
    const body = `Name: ${name}%0AEmail: ${email}%0ATelefon: ${phone}%0A%0A${message}`;
    window.location.href = `mailto:${business.email}?subject=${subject}&body=${body}`;
    setStatus("sent");
    form.reset();
  };

  return (
    <section ref={ref} id="kontakt" className="bg-[var(--color-ink)] text-[var(--color-paper)] section">
      <div className="wrap grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
        <div className="lg:col-span-5">
          <div data-contact-head>
            <p className="eyebrow mb-8 text-[var(--color-mushroom)]">— {lang.contact.eyebrow}</p>
            <h2 className="font-display text-[clamp(2.8rem,7vw,6rem)] leading-[0.9] tracking-[-0.025em] text-[var(--color-paper)]">
              {locale === "de" ? (
                <>Ein Gespräch, <span className="font-italic-display text-[var(--color-cognac)]">dann</span> ein Stück.</>
              ) : (
                <>حوارٌ, <span className="font-italic-display text-[var(--color-cognac)]">ثُمّ</span> قطعة.</>
              )}
            </h2>
            <p className="mt-8 text-[var(--color-paper)]/70 leading-relaxed max-w-md text-pretty">
              {lang.contact.body}
            </p>
          </div>

          <ul data-contact-rail className="mt-14 space-y-0">
            <ContactRow icon={<Phone className="w-4 h-4" />} eyebrow={lang.contact.details.call} value={business.phone} href={`tel:${business.phoneHref}`} />
            <ContactRow icon={<MessageCircle className="w-4 h-4" />} eyebrow="WhatsApp" value={business.whatsapp} href={`https://wa.me/${business.whatsappHref}`} external />
            <ContactRow icon={<Mail className="w-4 h-4" />} eyebrow={lang.contact.details.write} value={business.email} href={`mailto:${business.email}`} />
            <ContactRow icon={<MapPin className="w-4 h-4" />} eyebrow={lang.contact.details.findUs} value={`${business.address.street}, ${business.address.zip} ${business.address.city}`} href={business.googleMaps} external />
          </ul>

          <div className="mt-14">
            <p className="eyebrow mb-5 text-[var(--color-mushroom)]">{lang.contact.hours}</p>
            <ul className="space-y-2 max-w-md">
              {openingHours.map((oh) => (
                <li key={oh.dayEn} className="flex justify-between items-start gap-4 text-sm text-[var(--color-paper)]/80 border-b border-[var(--color-paper)]/10 pb-2">
                  <span className="font-medium">{locale === "de" ? oh.dayDe : oh.dayAr}</span>
                  {oh.sessions.length === 0 ? (
                    <span className="italic text-[var(--color-paper)]/40">{lang.contact.closed}</span>
                  ) : (
                    <span className="text-right leading-relaxed">
                      {oh.sessions.map((s, i) => (
                        <span key={i} className="block whitespace-nowrap">{s}</span>
                      ))}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="lg:col-span-6 lg:col-start-7">
          <form data-contact-form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
              <div className="field">
                <label htmlFor="name">{lang.contact.form.name}</label>
                <input id="name" name="name" type="text" required placeholder={lang.contact.form.namePh} style={{ borderColor: "rgba(245,239,228,0.25)", color: "var(--color-paper)" }} />
              </div>
              <div className="field">
                <label htmlFor="email">{lang.contact.form.email}</label>
                <input id="email" name="email" type="email" required placeholder={lang.contact.form.emailPh} style={{ borderColor: "rgba(245,239,228,0.25)", color: "var(--color-paper)" }} />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
              <div className="field">
                <label htmlFor="phone">{lang.contact.form.phone}</label>
                <input id="phone" name="phone" type="tel" placeholder={lang.contact.form.phonePh} style={{ borderColor: "rgba(245,239,228,0.25)", color: "var(--color-paper)" }} />
              </div>
              <div className="field">
                <label htmlFor="subject">{lang.contact.form.subject}</label>
                <select id="subject" name="subject" required defaultValue="" style={{ borderColor: "rgba(245,239,228,0.25)", color: "var(--color-paper)", background: "transparent" }}>
                  <option value="" disabled>—</option>
                  {lang.contact.form.subjects.map((s) => (
                    <option key={s} value={s} style={{ color: "var(--color-ink)" }}>{s}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="field">
              <label htmlFor="message">{lang.contact.form.message}</label>
              <textarea id="message" name="message" required rows={5} placeholder={lang.contact.form.messagePh} style={{ borderColor: "rgba(245,239,228,0.25)", color: "var(--color-paper)" }} />
            </div>
            <div className="flex items-center justify-between flex-wrap gap-4 pt-6">
              <p className="text-xs text-[var(--color-paper)]/50 max-w-xs">{lang.contact.form.note}</p>
              <button type="submit" className="btn btn-ghost" data-cursor-hover>
                <span>{status === "sent" ? "✓ " + lang.contact.form.submit : lang.contact.form.submit}</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

function ContactRow({
  icon, eyebrow, value, href, external,
}: { icon: React.ReactNode; eyebrow: string; value: string; href: string; external?: boolean }) {
  return (
    <li>
      <a
        href={href}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        data-cursor-hover
        className="group flex items-center gap-6 py-5 border-b border-[var(--color-paper)]/15 hover:border-[var(--color-paper)]/60 transition-colors"
      >
        <span className="text-[var(--color-cognac)]">{icon}</span>
        <div className="flex-1">
          <p className="eyebrow mb-1 text-[var(--color-mushroom)]">{eyebrow}</p>
          <p className="font-display text-xl text-[var(--color-paper)]">{value}</p>
        </div>
        <span className="text-[var(--color-paper)] opacity-0 group-hover:opacity-100 transition-opacity">→</span>
      </a>
    </li>
  );
}
