import { Phone, MessageCircle } from "lucide-react";
import { business } from "@/lib/business";
import type { Locale } from "@/lib/business";

interface Props { locale: Locale; }

export default function MobileActionBar({ locale }: Props) {
  const callLabel = locale === "de" ? "Anrufen" : "اتّصال";
  return (
    <div className="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-[var(--color-paper)]/92 backdrop-blur-md border-t border-[var(--color-rule)] px-5 py-3 flex gap-3">
      <a
        href={`tel:${business.phoneHref}`}
        className="flex-1 flex items-center justify-center gap-2 bg-[var(--color-ink)] text-[var(--color-paper)] py-3 text-xs font-medium tracking-[0.22em] uppercase min-h-[48px]"
      >
        <Phone className="w-4 h-4" />
        {callLabel}
      </a>
      <a
        href={`https://wa.me/${business.whatsappHref}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex-1 flex items-center justify-center gap-2 border border-[var(--color-ink)] text-[var(--color-ink)] py-3 text-xs font-medium tracking-[0.22em] uppercase min-h-[48px]"
      >
        <MessageCircle className="w-4 h-4" />
        WhatsApp
      </a>
    </div>
  );
}
