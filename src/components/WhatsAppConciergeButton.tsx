import { Language } from '../types';
import { buildWhatsAppBookingUrl } from '../constants/links';
import { MessageCircle } from 'lucide-react';

interface WhatsAppConciergeButtonProps {
  language: Language;
  checkIn?: string;
  checkOut?: string;
  roomName?: string;
  guests?: number;
  variant?: 'primary' | 'inline';
}

export default function WhatsAppConciergeButton({
  language,
  checkIn,
  checkOut,
  roomName,
  guests,
  variant = 'primary',
}: WhatsAppConciergeButtonProps) {
  const labels = {
    en: {
      title: 'Book via Concierge',
      sub: 'Private WhatsApp line · VIP response',
    },
    id: {
      title: 'Pesan via Concierge',
      sub: 'Jalur WhatsApp pribadi · respons VIP',
    },
    zh: {
      title: '礼宾 WhatsApp 预约',
      sub: '专属线路 · VIP 回复',
    },
  }[language];

  const href = buildWhatsAppBookingUrl({ checkIn, checkOut, roomName, guests });

  if (variant === 'inline') {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 border border-[#0B0D10]/20 bg-white/60 px-4 py-2.5 text-[10px] font-mono tracking-[0.15em] uppercase text-[#0B0D10]/80 active:border-[#7A3A2E]/40 active:text-[#7A3A2E] transition-colors"
      >
        <MessageCircle size={14} strokeWidth={1.5} />
        {labels.title}
      </a>
    );
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex flex-col items-center gap-2 w-full border border-[#0B0D10]/15 bg-[#0B0D10] text-[#F5F1EA] py-4 px-6 active:bg-[#7A3A2E] transition-colors"
    >
      <span className="flex items-center gap-2 font-sans text-[11px] uppercase tracking-[0.22em] font-bold">
        <MessageCircle size={16} strokeWidth={1.5} />
        {labels.title}
      </span>
      <span className="font-mono text-[9px] tracking-[0.2em] text-[#F5F1EA]/55 uppercase">
        {labels.sub}
      </span>
    </a>
  );
}
