import { Language } from '../types';
import { HOTEL_ADDRESS, MAPS_URL } from '../constants/links';
import { MapPin } from 'lucide-react';

interface HotelAddressProps {
  language: Language;
  variant?: 'compact' | 'card';
}

export default function HotelAddress({ language, variant = 'card' }: HotelAddressProps) {
  const t = {
    en: { title: 'The Residence', maps: 'Open in Maps' },
    id: { title: 'Kediaman', maps: 'Buka di Peta' },
    zh: { title: '庄园地址', maps: '打开地图' },
  }[language];

  if (variant === 'compact') {
    return (
      <a
        href={MAPS_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="block text-center active:opacity-80 transition-opacity"
      >
        <p className="font-mono text-[10px] leading-relaxed text-[#0B0D10]/65 tracking-wide">
          {HOTEL_ADDRESS.line1}, {HOTEL_ADDRESS.line2}
          <br />
          {HOTEL_ADDRESS.line3}, {HOTEL_ADDRESS.region}
        </p>
      </a>
    );
  }

  return (
    <section className="text-center space-y-3 px-2">
      <span className="font-mono text-[9px] tracking-[0.35em] text-[#7A3A2E] uppercase font-bold">
        {t.title}
      </span>
      <div className="border border-[#0B0D10]/10 bg-white/50 px-4 py-4 space-y-3">
        <MapPin size={16} className="mx-auto text-[#7A3A2E] stroke-[1.5px]" aria-hidden />
        <address className="not-italic font-mono text-[10px] leading-[1.65] text-[#0B0D10]/75 tracking-wide">
          {HOTEL_ADDRESS.line1}
          <br />
          {HOTEL_ADDRESS.line2}
          <br />
          {HOTEL_ADDRESS.line3}
          <br />
          {HOTEL_ADDRESS.region}
        </address>
        <a
          href={MAPS_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block font-mono text-[9px] tracking-[0.2em] uppercase text-[#7A3A2E] border-b border-[#7A3A2E]/40 pb-0.5 active:text-[#0B0D10] transition-colors"
        >
          {t.maps}
        </a>
      </div>
    </section>
  );
}
