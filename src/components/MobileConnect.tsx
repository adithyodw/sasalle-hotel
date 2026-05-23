import { Language } from '../types';
import { SOCIAL_LINKS, OTA_PARTNERS, PHONE_DISPLAY, PHONE_TEL } from '../constants/links';
import WhatsAppConciergeButton from './WhatsAppConciergeButton';
import HotelAddress from './HotelAddress';

interface MobileConnectProps {
  language: Language;
  checkIn?: string;
  checkOut?: string;
  roomName?: string;
  guests?: number;
}

const SOCIAL_ITEMS = [
  { id: 'instagram', label: 'Instagram', href: SOCIAL_LINKS.instagram },
  { id: 'tiktok', label: 'TikTok', href: SOCIAL_LINKS.tiktok },
  { id: 'facebook', label: 'Facebook', href: SOCIAL_LINKS.facebook },
  { id: 'whatsapp', label: 'WhatsApp', href: SOCIAL_LINKS.whatsapp },
] as const;

export default function MobileConnect({
  language,
  checkIn,
  checkOut,
  roomName,
  guests,
}: MobileConnectProps) {
  const t = {
    en: {
      social: 'Connect',
      ota: 'Reserve via Partners',
      otaNote: 'Curated distribution channels',
    },
    id: {
      social: 'Terhubung',
      ota: 'Reservasi Melalui Mitra',
      otaNote: 'Saluran distribusi terkurasi',
    },
    zh: {
      social: '联络',
      ota: '合作渠道预订',
      otaNote: '精选分销合作',
    },
  }[language];

  return (
    <div className="space-y-10 px-4 pb-6">
      <HotelAddress language={language} />

      <section className="space-y-4 border-t border-[#0B0D10]/10 pt-8">
        <div className="text-center space-y-1">
          <span className="font-mono text-[9px] tracking-[0.35em] text-[#7A3A2E] uppercase font-bold">
            {t.social}
          </span>
        </div>
        <div className="flex justify-center gap-6">
          {SOCIAL_ITEMS.map((item) => (
            <a
              key={item.id}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={item.label}
              className="group flex flex-col items-center gap-1.5 text-[#0B0D10]/70 active:text-[#7A3A2E] transition-colors"
            >
              <span className="w-10 h-10 border border-[#0B0D10]/15 flex items-center justify-center bg-white/50 group-active:border-[#7A3A2E]/40 transition-colors">
                <SocialIcon id={item.id} />
              </span>
              <span className="font-mono text-[8px] tracking-[0.15em] uppercase">{item.label}</span>
            </a>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <div className="text-center space-y-1 border-t border-[#0B0D10]/10 pt-8">
          <span className="font-mono text-[9px] tracking-[0.35em] text-[#7A3A2E] uppercase font-bold">
            {t.ota}
          </span>
          <p className="text-[10px] text-[#0B0D10]/45 font-mono tracking-wider">{t.otaNote}</p>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {OTA_PARTNERS.map((partner) => (
            <a
              key={partner.id}
              href={partner.url}
              target="_blank"
              rel="noopener noreferrer"
              className="border border-[#0B0D10]/12 bg-white/40 px-3 py-3.5 text-center active:bg-[#0B0D10]/5 transition-colors"
            >
              <span className="font-mono text-[10px] tracking-[0.12em] text-[#0B0D10]/80 uppercase">
                {partner.name}
              </span>
            </a>
          ))}
        </div>
      </section>

      <section className="border-t border-[#0B0D10]/10 pt-8 space-y-6 text-center">
        <a
          href={PHONE_TEL}
          className="block font-mono text-[11px] tracking-[0.2em] text-[#0B0D10]/70 uppercase active:text-[#7A3A2E] transition-colors"
        >
          {PHONE_DISPLAY}
        </a>
        <WhatsAppConciergeButton
          language={language}
          checkIn={checkIn}
          checkOut={checkOut}
          roomName={roomName}
          guests={guests}
          variant="primary"
        />
      </section>
    </div>
  );
}

function SocialIcon({ id }: { id: string }) {
  const stroke = 'currentColor';
  const props = { width: 18, height: 18, fill: 'none', stroke, strokeWidth: 1.25 };

  switch (id) {
    case 'instagram':
      return (
        <svg {...props} viewBox="0 0 24 24">
          <rect x="2" y="2" width="20" height="20" rx="5" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="17.5" cy="6.5" r="1" fill={stroke} stroke="none" />
        </svg>
      );
    case 'tiktok':
      return (
        <svg {...props} viewBox="0 0 24 24">
          <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
        </svg>
      );
    case 'facebook':
      return (
        <svg {...props} viewBox="0 0 24 24">
          <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v9h4v-9h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
        </svg>
      );
    case 'whatsapp':
      return (
        <svg {...props} viewBox="0 0 24 24">
          <path d="M21 11.5a8.5 8.5 0 0 1-12.9 7.3L3 21l2.2-5.1A8.5 8.5 0 1 1 21 11.5z" />
        </svg>
      );
    default:
      return null;
  }
}
