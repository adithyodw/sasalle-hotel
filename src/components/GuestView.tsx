import { useState } from 'react';
import { Room, Booking, Language } from '../types';
import { ROOMS, DICTIONARY, INDONESIA_BOTANICALS } from '../data';
import { Calendar, Users, Clock, ArrowRight, ShieldCheck, Heart, Award, Sparkles } from 'lucide-react';
import BookingWizard from './BookingWizard';

interface GuestViewProps {
  language: Language;
  activeTab: 'home' | 'rooms' | 'key' | 'concierge';
  activeBooking: Booking | null;
  onBookingComplete: (booking: Booking) => void;
  onOpenBookingWizard: (room: Room) => void;
  selectedRoomForWizard: Room | null;
  onCloseBookingWizard: () => void;
  isWizardOpen: boolean;
  isNativeMobile?: boolean;
}

export default function GuestView({
  language,
  activeTab,
  activeBooking,
  onBookingComplete,
  onOpenBookingWizard,
  selectedRoomForWizard,
  onCloseBookingWizard,
  isWizardOpen,
  isNativeMobile = false,
}: GuestViewProps) {
  const [activeSubTab, setActiveSubTab] = useState<'intro' | 'dining' | 'spa'>('intro');
  const [partySize, setPartySize] = useState(2);
  const [diningDate, setDiningDate] = useState('2026-06-16');
  const [diningHour, setDiningHour] = useState('19:30');
  const [diningSubmitted, setDiningSubmitted] = useState(false);

  const getLabel = (key: string) => {
    return DICTIONARY[key]?.[language] || key;
  };

  const handleBookDining = () => {
    setDiningSubmitted(true);
    setTimeout(() => setDiningSubmitted(false), 5000);
  };

  return (
    <div className={`bg-[#F5F1EA] text-[#0B0D10] font-sans relative w-full ${isNativeMobile ? 'pb-2' : 'pb-16'}`}>
      
      {/* HOME PAGE TAB */}
      {activeTab === 'home' && (
        <div className="space-y-12">
          {/* Sub-navigation bar inside HOME dashboard */}
          <div className={`flex justify-center border-b border-[#0B0D10]/10 bg-[#F5F1EA]/95 backdrop-blur-md sticky z-30 py-2.5 select-none ${isNativeMobile ? 'top-0' : 'top-20'} px-2`}>
            <div className="flex gap-1 sm:gap-2 bg-[#0B0D10]/5 p-1 text-[9px] sm:text-[10px] font-mono font-bold w-full max-w-md">
              {(['intro', 'dining', 'spa'] as const).map((sub) => {
                const subLabels = isNativeMobile
                  ? { intro: 'JOURNEY', dining: 'DINING', spa: 'SPA' }
                  : { intro: 'JOURNEY', dining: 'THE BRICK & IRON', spa: 'THE SANCTUARY SPA' };
                return (
                  <button
                    key={sub}
                    id={`sub-tab-${sub}`}
                    type="button"
                    onClick={() => setActiveSubTab(sub)}
                    className={`flex-1 px-2 sm:px-4 py-2 transition-all uppercase tracking-wider text-center ${
                      activeSubTab === sub
                        ? 'bg-[#0B0D10] text-white font-bold'
                        : 'text-[#0B0D10]/60 active:text-[#0B0D10]'
                    }`}
                  >
                    {subLabels[sub]}
                  </button>
                );
              })}
            </div>
          </div>

          {/* INTRO JOURNEY PANEL */}
          {activeSubTab === 'intro' && (
            <div className={`space-y-8 sm:space-y-12 max-w-4xl mx-auto ${isNativeMobile ? 'px-0' : 'px-4 md:px-12'}`}>
              
              {/* Massive Cinematic Hero Banner with Text Overlay */}
              <div
                className={`relative w-full bg-cover bg-center select-none ${isNativeMobile ? 'h-[52vw] min-h-[220px] max-h-[360px]' : 'h-[480px]'}`}
                style={{ backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuACA1bW6pzkHrNaWU7651J1uvHwuF48gcD38-P49yYDemIgPKkZ_boZLkpEwZgqtVyiyDGTR3xcwEXuqt73xpKIKz0TgpQmrj1rQkJq0rjnLnhMPx0RjcTTyyoS1JUA3y7D5cnzOaCpQzhGLNEo0SjqZ4YU4I6jlBblW72d7VkAcs1O8_sPTr4EZ3CeDpIkVSgvtG5-lu29R4EJU6evVVR7jwJxvuoeGxJsUPg2MjDFnJ2Naprb-VmC73Lw3laRIQzq7UbohZ8TdS_R')` }}
              >
                <div className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10 flex flex-col justify-end text-white ${isNativeMobile ? 'p-5' : 'p-8 md:p-12'}`}>
                  <span className="text-[10px] font-mono tracking-[0.2em] opacity-80 mb-2 uppercase text-[#B89B5E] font-bold">
                    {getLabel('hero_subtitle')}
                  </span>
                  <h1 className={`font-headline font-light tracking-tight leading-tight text-[#F5F1EA] ${isNativeMobile ? 'text-2xl sm:text-3xl' : 'text-4xl md:text-6xl max-w-xl'}`}>
                    {getLabel('hero_title')}
                  </h1>
                </div>
              </div>

              {/* Editorial Intro Narrative */}
              <div className={`text-center max-w-2xl mx-auto space-y-4 py-6 ${isNativeMobile ? 'px-4' : ''}`}>
                <span className="font-mono text-xs text-[#7A3A2E] tracking-widest font-black uppercase">
                  {getLabel('section1_num')}
                </span>
                <h2 className="font-headline text-3xl md:text-5xl text-[#0B0D10] font-light leading-snug">
                  {getLabel('section1_title')}
                </h2>
                <p className="text-[#0B0D10]/80 leading-relaxed text-sm md:text-base">
                  {getLabel('section1_desc')}
                </p>
              </div>

              {/* Aesthetic Material Pairings Grid */}
              <div className={`grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 select-none ${isNativeMobile ? 'px-4' : ''}`}>
                <div className="space-y-4">
                  <div className={`overflow-hidden ${isNativeMobile ? 'h-48' : 'h-64'}`}>
                    <img
                      loading="lazy"
                      className="w-full h-full object-cover grayscale opacity-90 md:hover:grayscale-0 transition-all duration-700"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuCr4p6em0177fbmUi22y1r_j09M115Qc3c2mLjF70gMCGPLM49jbNZBrBZXN1eNkfk0SEVmsIbvU_yXtTHIUHQ5a-jOkEEwCEmHIJWmoqoNLX1o6OtLMQRO4O2GM-2Z5Q9kam3OSsVCUec47MtsnhghGSguAiZqRhNqVV9NoL6pATEYzYSHdSQ1hpS3i0U74UA7AlV4ejCKKFiqE6xcqZqs1_jnWQyi2f4ofnFkyObCd8vKMnfaGHq_OI8amMdJb_VcN9qfe6cSP1M-" 
                      alt="Material Integrity"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <h3 className="font-headline text-xl text-[#0B0D10] font-semibold tracking-wide">
                    {getLabel('craft_title')}
                  </h3>
                  <p className="text-xs text-[#0B0D10]/80 leading-relaxed">
                    {getLabel('craft_desc')}
                  </p>
                </div>

                <div className="space-y-4">
                  <div className={`overflow-hidden ${isNativeMobile ? 'h-48' : 'h-64'}`}>
                    <img
                      loading="lazy"
                      className="w-full h-full object-cover opacity-95"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuAMJOTaYWp6dwSyET66aApi6HbIoGxv9GqWnPaHAvUwnLMAABWv-X9cKglK4Alf9wHsB4vupu9CiWyEk4unTzHoJ5SdJYxUFzKABK-45C9VUysS5PvfHyYZYWhHKJPT9JPHD8PyX88DuP5172ZPO0P7huYzY9BX5qLSDS3Bkjo90WKawZuUO6jjvUp3hkqTKzCLuhjWQz41IhuDbEzt0lNPTW87J5o8ImC7zJHcr1EgVy7s6HwJigj9i8JyRuKyQO0NKycyCkEDvrwQ" 
                      alt="The Quietude"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <h3 className="font-headline text-xl text-[#0B0D10] font-semibold tracking-wide">
                    {getLabel('space_title')}
                  </h3>
                  <p className="text-xs text-[#0B0D10]/80 leading-relaxed">
                    {getLabel('space_desc')}
                  </p>
                </div>
              </div>

              {/* Bottom Large Stillness Text Pattern */}
              <div className={`border-[#0B0D10]/10 border-t border-b py-8 sm:py-10 text-center bg-[#0B0D10]/5 select-none my-8 sm:my-12 ${isNativeMobile ? 'mx-4' : ''}`}>
                <span className="font-mono text-[9px] tracking-[0.4em] text-[#B89B5E] font-bold uppercase mb-2 block">
                  {getLabel('stillness_banner')}
                </span>
                <p className="font-headline text-2xl md:text-3xl font-light italic text-[#0B0D10] max-w-xl mx-auto leading-relaxed">
                  "Quietness is not empty, it is full of answer."
                </p>
              </div>

              {/* The House Principles (List block) */}
              <div className={`space-y-4 pt-4 ${isNativeMobile ? 'px-4 pb-4' : ''}`}>
                <h3 className="font-headline text-xl sm:text-2xl text-center text-[#0B0D10] font-light tracking-[0.1em] border-b border-[#0B0D10]/15 pb-2 select-none">
                  {getLabel('house_principles')}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 text-xs text-[#0B0D10]/80 select-none">
                  <div className="p-4 border border-[#0B0D10]/10 hover:border-[#7A3A2E]/30 bg-white/40 transition-colors">
                    <span className="font-bold text-[#7A3A2E] block uppercase font-mono text-[10px] mb-1">01. {getLabel('p1_title')}</span>
                    Real materials speak directly. High-contrast custom glazed Hijau Nyonya mosaics, kiln-fired tiles, and volcanic stone.
                  </div>
                  <div className="p-4 border border-[#0B0D10]/10 hover:border-[#7A3A2E]/30 bg-white/40 transition-colors">
                    <span className="font-bold text-[#7A3A2E] block uppercase font-mono text-[10px] mb-1">02. {getLabel('p2_title')}</span>
                    We respect your presence. House staff operate with silent steps, minimizing unrequested physical visual intervention.
                  </div>
                  <div className="p-4 border border-[#0B0D10]/10 hover:border-[#7A3A2E]/30 bg-white/40 transition-colors">
                    <span className="font-bold text-[#7A3A2E] block uppercase font-mono text-[10px] mb-1">03. {getLabel('p3_title')}</span>
                    Time is deceleration. Rooms are optimized dynamically to reset natural circadian rhythms soundlessly.
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* THE BRICK & IRON (DINING) PANEL */}
          {activeSubTab === 'dining' && (
            <div className={`space-y-8 sm:space-y-10 max-w-4xl mx-auto ${isNativeMobile ? 'px-0' : 'px-4 md:px-12'}`}>
              {/* Dining Cinematic Hero Banner */}
              <div
                className={`relative w-full bg-cover bg-center select-none ${isNativeMobile ? 'h-[45vw] min-h-[200px] max-h-[320px]' : 'h-96'}`}
                style={{ backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuDkB6TCeS9QAaIWChe7IYfvbuM47yjeswfLA7MGh9iKSsrEbWIOQjwHShJXiw1h4cP1Qj9iW0HbgMxhfjQib5n-10XnA2QpP023iz2JxwjDq_kq4Ve1tNqIbJRvtEAWwY7yQUci7oruVbN-Xjubi_KBrnuZprSkMNBoATWXRYq8CiLaTGC7RrL_5p8noYgakcPW5V2PAww-MbCGI5uXsNcaGj4MZPVrXXmm3wPOiOFd9eVa1LvE0h6wHSZXAuoSf1FbsfR8nPScziVG')` }}
              >
                <div className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/10 flex flex-col justify-end text-white ${isNativeMobile ? 'p-5' : 'p-8'}`}>
                  <span className="text-[10px] font-mono tracking-[0.2em] opacity-80 mb-2 uppercase text-[#B89B5E] font-bold">
                    {getLabel('dining_subtitle')}
                  </span>
                  <h2 className="font-headline text-3xl md:text-5xl font-light text-[#F5F1EA] tracking-wide">
                    {getLabel('dining_title')}
                  </h2>
                </div>
              </div>

              {/* Culinary Philosophy narrative */}
              <div className={`max-w-xl mx-auto text-center space-y-3 ${isNativeMobile ? 'px-4' : ''}`}>
                <span className="font-mono text-[10px] text-[#7A3A2E] tracking-widest font-black uppercase">
                  {getLabel('seasonal_manifestations')}
                </span>
                <p className="text-[#0B0D10]/80 text-sm leading-relaxed">
                  {getLabel('dining_desc')}
                </p>
              </div>

              {/* Progression Phases */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-3 select-none">
                <div className="bg-white/80 p-6 border border-[#0B0D10]/10 space-y-2">
                  <h4 className="font-headline text-lg text-[#7A3A2E] font-medium tracking-wide">{getLabel('phase1_title')}</h4>
                  <p className="text-xs text-[#0B0D10]/80 leading-relaxed">
                    {getLabel('phase1_desc')}
                  </p>
                </div>
                <div className="bg-white/80 p-6 border border-[#0B0D10]/10 space-y-2">
                  <h4 className="font-headline text-lg text-[#7A3A2E] font-medium tracking-wide">{getLabel('phase2_title')}</h4>
                  <p className="text-xs text-[#0B0D10]/80 leading-relaxed">
                    {getLabel('phase2_desc')}
                  </p>
                </div>
                <div className="bg-white/80 p-6 border border-[#0B0D10]/10 space-y-2">
                  <h4 className="font-headline text-lg text-[#7A3A2E] font-medium tracking-wide">{getLabel('phase3_title')}</h4>
                  <p className="text-xs text-[#0B0D10]/80 leading-relaxed">
                    {getLabel('phase3_desc')}
                  </p>
                </div>
              </div>

              {/* Dining interactive Table Reservation Scheduler */}
              <div className={`border border-[#0B0D10]/15 bg-white/70 backdrop-blur-md shadow-sm ${isNativeMobile ? 'mx-4 p-5' : 'p-8'}`}>
                <h3 className="font-headline text-2xl text-[#0B0D10] mb-4 font-light text-center uppercase tracking-wider">
                  {getLabel('secure_table')}
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-[10px] font-mono tracking-widest text-[#0B0D10]/70 uppercase mb-1">
                      {getLabel('guests')}
                    </label>
                    <select 
                      id="select-dining-guests"
                      value={partySize} 
                      onChange={(e) => setPartySize(parseInt(e.target.value))}
                      className="w-full bg-white border border-[#0B0D10]/10 p-2 text-xs focus:outline-none focus:border-[#7A3A2E]"
                    >
                      <option value="1">1 Seat</option>
                      <option value="2">2 Seats (Private Table)</option>
                      <option value="3">3 Seats</option>
                      <option value="4">4 Seats (Chef Hearth)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono tracking-widest text-[#0B0D10]/70 uppercase mb-1">
                      {getLabel('calendar')}
                    </label>
                    <input 
                      type="date" 
                      id="input-dining-date"
                      value={diningDate} 
                      onChange={(e) => setDiningDate(e.target.value)}
                      className="w-full bg-white border border-[#0B0D10]/10 p-1.5 text-xs rounded-none focus:outline-none focus:border-[#7A3A2E]"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono tracking-widest text-[#0B0D10]/70 uppercase mb-1">
                      {getLabel('available_hours')}
                    </label>
                    <select 
                      id="select-dining-hour"
                      value={diningHour} 
                      onChange={(e) => setDiningHour(e.target.value)}
                      className="w-full bg-white border border-[#0B0D10]/10 p-2 text-xs focus:outline-none focus:border-[#7A3A2E]"
                    >
                      <option value="18:00">18:00 (Sunset Glow)</option>
                      <option value="19:30">19:30 (Hearth Ignition)</option>
                      <option value="21:00">21:00 (Obsidian Twilight)</option>
                    </select>
                  </div>
                </div>

                <button
                  id="btn-dining-reserve"
                  onClick={handleBookDining}
                  className="w-full bg-[#0B0D10] text-[#F5F1EA] py-4 text-[11px] uppercase tracking-[0.2em] font-sans font-bold hover:bg-[#7A3A2E] transition-colors mt-6 select-none"
                >
                  {getLabel('request_reservation')}
                </button>

                {diningSubmitted ? (
                  <p className="text-[#466557] font-bold text-xs font-mono mt-3 text-center">
                    ✓ Request logged against system registry code. Hearth allocation matches pending confirmation.
                  </p>
                ) : (
                  <p className="text-[10px] text-[#534340]/50 text-center mt-2 italic font-mono uppercase">
                    {getLabel('reservation_subtext')}
                  </p>
                )}
              </div>
            </div>
          )}

          {/* THE SANCTUARY WELLNESS SPA PANEL */}
          {activeSubTab === 'spa' && (
            <div className={`space-y-8 sm:space-y-10 max-w-4xl mx-auto ${isNativeMobile ? 'px-0' : 'px-4 md:px-12'}`}>
              
              {/* Centered cinematic image */}
              <div
                className={`relative w-full bg-cover bg-center select-none ${isNativeMobile ? 'h-[45vw] min-h-[200px] max-h-[320px]' : 'h-96'}`}
                style={{ backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuAIu0BFbmGeuTDKAQzdypncSr-hCBWAZLU0HDCawYVKpikFMawiy_UeClWZAh9sjcud68UEoWi8bii3_jESPdeozDzN2vEJQsEr6b__js1M-_apXI7Jdk0cisV29vKIQ_Fhr4sddZOKd53JrALEcyl9zJ6A2DS8FzxpQWtUSM6Fy-gkVXym5qqJmET2EMAWGQHS2nh6yNnJunzwxb7KUTHxsMNtVJFeYu2_VgJv4fA_s-FGmG-1fmhBWnJJEJz_T2nUnhGtRyxdwhOE')` }}
              >
                <div className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 flex flex-col justify-end text-white ${isNativeMobile ? 'p-5' : 'p-8'}`}>
                  <h2 className="font-headline text-3xl md:text-5xl font-light text-[#F5F1EA] tracking-wide">
                    {getLabel('spa_title')}
                  </h2>
                </div>
              </div>

              {/* Quote block and introduction */}
              <div className={`max-w-2xl mx-auto text-center space-y-4 ${isNativeMobile ? 'px-4' : ''}`}>
                <span className="font-headline text-2xl font-light italic text-[#7A3A2E] block">
                  {getLabel('spa_intro_quote')}
                </span>
                <p className="text-[#0B0D10]/80 text-sm leading-relaxed">
                  {getLabel('spa_intro_body')}
                </p>
              </div>

              {/* Rituals list in design layout with image nodes */}
              <div className="space-y-6 pt-3 select-none">
                <span className="block font-mono text-[10px] tracking-widest font-bold text-[#7A3A2E] text-center uppercase">
                  {getLabel('curated_experiences')}
                </span>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Ritual 1 */}
                  <div className="bg-white/90 border border-[#0B0D10]/10 p-6 space-y-4 shadow-sm hover:border-[#7A3A2E]/20 transition-all">
                    <div className="h-56 overflow-hidden">
                      <img 
                        className="w-full h-full object-cover"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuCT20K8chCKOyb-8ar2fQATc3-m1bXhPfwr5YMRoVy7rXgIABhQQAMi8hmiSDtUldwYsYTJz87R_O5CrQoMzIXyHkr5HqD9nSaGAfyKpVcXOaF8VpDxDzQp2P0i-Ln6opevOyrsmQ7fS9csDmGqClX426qDCL-Yo_Wa_a4pR_4vcCGKsFKPEjSKBJy1SZht1i1Yx5wba2EPkRQTL9Xoy5x5IdYI7iw6J-kgAeRT5_XZs6uFpSogKttBikYPTlaEr26WxkJv8Wko_RCq" 
                        alt="Stone Bathing Ritual"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-headline text-xl text-[#0B0D10] font-light leading-snug">{getLabel('stone_ritual')}</h4>
                      <p className="text-xs text-[#0B0D10]/70">
                        Volcanic basalt riverbeds are heated under kiln embers and immersed in mineral baths to draw micro-fatigue dynamically from bone connective linings.
                      </p>
                    </div>
                  </div>

                  {/* Ritual 2 */}
                  <div className="bg-white/90 border border-[#0B0D10]/10 p-6 space-y-4 shadow-sm hover:border-[#7A3A2E]/20 transition-all">
                    <div className="h-56 overflow-hidden">
                      <img 
                        className="w-full h-full object-cover"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuAlLpdci3Ce3hQJi8TNFAY9wZx77ByALYprhuCP4iRLUXc4iAcUI0_UY6MoBBRi0-2EU7g5ivK_PbmM0w8_nqM7G31BlOJkYYp7wPOmSAfl12INUhaXoyGLYURafxMwqxiED9q79DhYDfswhCvPvZq7eeYyum5_VeEQxHNTIFoRn_-6pzS7np1kZIJmaY82VrdEEcALMZT7RKZrhDVflGTlwdzQn-dJra86sPEgX1b7hJih8FU2cFjX8vyZ0VuNmI4mopaz3ShvZEnS" 
                        alt="Clay Wrap"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div className="space-y-2">
                       <h4 className="font-headline text-xl text-[#0B0D10] font-light leading-snug">{getLabel('clay_wrap')}</h4>
                       <p className="text-xs text-[#0B0D10]/70">
                         Utilizes our iconic glazed heritage tiles' minerals and organic sediment, generating a skin-pore cell detoxifying mask from head to chest.
                       </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Wellness call-down CTA section with pattern background */}
              <div className={`bg-[#7A3A2E] text-white text-center space-y-5 relative border border-[#0B0D10]/10 shadow-lg select-none ${isNativeMobile ? 'mx-4 p-6' : 'p-10'}`}>
                <h3 className="font-headline text-3xl text-[#F5F1EA] font-light tracking-wide">
                  {getLabel('reserve_moment')}
                </h3>
                <p className="text-sm text-[#F5F1EA]/80 max-w-md mx-auto leading-relaxed font-sans">
                  {getLabel('reserve_moment_desc')}
                </p>
                <button
                  id="btn-spa-inquiry"
                  onClick={() => alert('Bespoke wellness inquiry routed. Sasalle Sanctuary concierge will engage shortly.')}
                  className="bg-white text-[#7A3A2E] px-8 py-3 text-[11px] uppercase tracking-[0.2em] font-sans font-bold hover:bg-[#F5F1EA] hover:text-[#0B0D10] transition-colors duration-300"
                >
                  {getLabel('inquire_ritual')}
                </button>
              </div>
            </div>
          )}

        </div>
      )}

      {/* ROOMS PAGE SANCTUARIES */}
      {activeTab === 'rooms' && (
        <div className={`max-w-4xl mx-auto space-y-6 sm:space-y-8 select-none ${isNativeMobile ? 'px-4' : 'px-4 md:px-12'}`}>
          <div className="text-center space-y-2 py-4">
            <div className="mb-4 flex items-center justify-center gap-4">
              <div className="w-12 h-[1px] bg-[#B89B5E]"></div>
              <span className="text-[11px] uppercase tracking-[0.3em] text-[#B89B5E] font-sans font-bold">
                {getLabel('residential_architecture')}
              </span>
              <div className="w-12 h-[1px] bg-[#B89B5E]"></div>
            </div>
            <h2 className="font-headline text-3xl md:text-5xl text-[#0B0D10] font-light tracking-tight pb-4">
              {getLabel('sanctuaries_stillness')}
            </h2>
          </div>

          <div className="space-y-12">
            {ROOMS.map((room) => (
              <div 
                key={room.id}
                id={`room-card-${room.id}`}
                className="bg-white/95 border border-[#0B0D10]/10 overflow-hidden flex flex-col md:flex-row shadow-sm transition-all duration-300 hover:shadow-lg"
              >
                {/* Room Image */}
                <div className={`md:w-1/2 overflow-hidden ${isNativeMobile ? 'h-52' : 'h-80'}`}>
                  <img
                    loading="lazy"
                    className="w-full h-full object-cover select-none"
                    src={room.image} 
                    alt={room.name}
                    referrerPolicy="no-referrer"
                  />
                </div>

                {/* Room copy details */}
                <div className="md:w-1/2 p-6 md:p-8 flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="flex justify-between items-baseline">
                      <span className="font-mono text-[10px] text-[#7A3A2E] font-bold tracking-widest uppercase font-black">
                        {room.collection}
                      </span>
                      <span className="text-xs text-stone-500 font-mono">
                        {room.size} • {room.bed}
                      </span>
                    </div>

                    <h3 className="font-headline text-xl font-bold text-[#0B0D10]">
                      {room.name}
                    </h3>
                    
                    <p className="text-xs text-[#0B0D10]/80 leading-relaxed">
                      {room.description}
                    </p>

                    <div className="text-[11px] font-mono text-[#0B0D10]/70 bg-[#0B0D10]/5 p-3.5 border-l-2 border-[#B89B5E]">
                      <strong>Highlight:</strong> {room.highlight}
                    </div>
                  </div>

                  <div className={`pt-6 border-t border-stone-100 flex gap-3 mt-4 ${isNativeMobile ? 'flex-col' : 'items-center justify-between'}`}>
                    <div>
                      <span className="text-[10px] font-mono text-stone-400 uppercase block tracking-wider">
                        {getLabel('starting_from')}
                      </span>
                      <span className="text-lg font-bold text-[#7A3A2E]">
                        ${room.price} USD <span className="text-xs font-normal text-stone-500">/ night</span>
                      </span>
                    </div>

                    <button
                      type="button"
                      id={`btn-book-${room.id}`}
                      onClick={() => onOpenBookingWizard(room)}
                      className={`bg-[#0B0D10] text-[#F5F1EA] text-[10px] uppercase tracking-[0.2em] font-sans font-bold active:bg-[#7A3A2E] transition-colors ${isNativeMobile ? 'w-full py-3.5' : 'px-6 py-3 hover:bg-[#7A3A2E] hover:translate-x-1 duration-200'}`}
                    >
                      {getLabel('view_sanctuary')}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Elegant 4-dot motif underroom card lists */}
          <div className="flex justify-center gap-1.5 py-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[#7A3A2E]/50" />
            <span className="w-1.5 h-1.5 rounded-full bg-[#7A3A2E]/20" />
            <span className="w-1.5 h-1.5 rounded-full bg-[#7A3A2E]/20" />
            <span className="w-1.5 h-1.5 rounded-full bg-[#7A3A2E]/20" />
          </div>
        </div>
      )}

      {/* POPUP OVERLAY WIZARD */}
      {isWizardOpen && selectedRoomForWizard && !isNativeMobile && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4 backdrop-blur-sm overflow-y-auto">
          <BookingWizard
            room={selectedRoomForWizard}
            onBookingComplete={onBookingComplete}
            onClose={onCloseBookingWizard}
            language={language}
          />
        </div>
      )}

    </div>
  );
}
