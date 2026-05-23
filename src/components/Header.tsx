import { Language, ActiveTab, ViewMode } from '../types';
import { Sparkles, Monitor, Smartphone, Settings } from 'lucide-react';

interface HeaderProps {
  language: Language;
  setLanguage: (lang: Language) => void;
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
}

export default function Header({
  language,
  setLanguage,
  activeTab,
  setActiveTab,
  viewMode,
  setViewMode
}: HeaderProps) {
  return (
    <header className="fixed top-0 w-full z-50 bg-[#F5F1EA]/95 backdrop-blur-md border-b border-[#0B0D10]/10 px-4 md:px-12 py-4 flex flex-col sm:flex-row justify-between items-center gap-4">
      {/* Brand Title */}
      <div 
        className="flex items-center gap-3 cursor-pointer select-none" 
        onClick={() => setActiveTab('home')}
      >
        <span className="font-headline text-3xl font-light tracking-[0.3em] uppercase text-[#0B0D10] transition-colors duration-200 hover:text-[#7A3A2E]">
          SASALLE
        </span>
        <span className="text-[9px] font-mono border border-[#0B0D10]/20 text-[#7A3A2E] px-2 py-0.5 tracking-widest uppercase font-bold">
          BATAM
        </span>
      </div>

      {/* Main Mode & Language Switchers */}
      <div className="flex flex-wrap items-center justify-center gap-4">
        {/* Device Switcher */}
        <div className="hidden md:flex bg-[#0B0D10]/5 p-1 border border-[#0B0D10]/10 text-xs">
          <button
            id="btn-view-desktop"
            onClick={() => setViewMode('desktop')}
            className={`flex items-center gap-1.5 px-3 py-1.5 transition-all text-[10px] uppercase tracking-wider font-semibold ${
              viewMode === 'desktop'
                ? 'bg-[#0B0D10] text-[#F5F1EA]'
                : 'text-[#0B0D10]/70 hover:text-[#0B0D10] hover:bg-[#0B0D10]/5'
            }`}
          >
            <Monitor size={12} />
            <span className="tracking-wide">DESKTOP</span>
          </button>
          <button
            id="btn-view-mobile"
            onClick={() => setViewMode('mobile')}
            className={`flex items-center gap-1.5 px-3 py-1.5 transition-all text-[10px] uppercase tracking-wider font-semibold ${
              viewMode === 'mobile'
                ? 'bg-[#0B0D10] text-[#F5F1EA]'
                : 'text-[#0B0D10]/70 hover:text-[#0B0D10] hover:bg-[#0B0D10]/5'
            }`}
          >
            <Smartphone size={12} />
            <span className="tracking-wide">MOBILE</span>
          </button>
        </div>

        {/* Global Tab Controls (Visible on Desktop Mode) */}
        <div className="hidden lg:flex items-center gap-2 font-sans text-[11px] uppercase tracking-[0.2em] font-medium">
          {(['home', 'rooms', 'key', 'concierge', 'admin'] as ActiveTab[]).map((tab) => {
            const labelMap: Record<ActiveTab, string> = {
              home: 'The Hotel',
              rooms: 'Suites',
              key: 'Digital Key',
              concierge: 'Dining & Chat',
              admin: 'Backstage Portal'
            };
            return (
              <button
                key={tab}
                id={`tab-desktop-${tab}`}
                onClick={() => setActiveTab(tab)}
                className={`px-3 py-2 transition-all border-b ${
                  activeTab === tab
                    ? 'border-[#0B0D10] text-[#7A3A2E] font-bold'
                    : 'border-transparent text-[#0B0D10]/60 hover:text-[#0B0D10] hover:opacity-100'
                }`}
              >
                {labelMap[tab]}
              </button>
            );
          })}
        </div>

        {/* Languages Selection */}
        <div className="flex gap-2 text-[11px] uppercase tracking-[0.2em] font-sans font-medium">
          {(['en', 'id', 'zh'] as Language[]).map((lang) => {
            const labels: Record<Language, string> = { en: 'EN', id: 'ID', zh: 'ZH' };
            return (
              <button
                key={lang}
                id={`lang-${lang}`}
                onClick={() => setLanguage(lang)}
                className={`w-8 h-8 flex items-center justify-center text-[10px] font-bold border transition-all ${
                  language === lang
                    ? 'bg-[#0B0D10] text-[#F5F1EA] border-[#0B0D10]'
                    : 'border-[#0B0D10]/10 text-[#0B0D10]/40 hover:border-[#0B0D10]/30 hover:text-[#0B0D10]'
                }`}
              >
                {labels[lang]}
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
}
