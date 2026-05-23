import { Language, ActiveTab, ViewMode } from '../types';
import { Monitor, Smartphone } from 'lucide-react';

interface HeaderProps {
  language: Language;
  setLanguage: (lang: Language) => void;
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
  isNativeMobile?: boolean;
}

export default function Header({
  language,
  setLanguage,
  activeTab,
  setActiveTab,
  viewMode,
  setViewMode,
  isNativeMobile = false,
}: HeaderProps) {
  if (isNativeMobile) {
    return (
      <header
        className="shrink-0 z-50 bg-[#F5F1EA]/98 backdrop-blur-md border-b border-[#0B0D10]/10 flex items-center justify-between gap-3 px-4"
        style={{
          paddingTop: 'var(--safe-top)',
          minHeight: 'var(--mobile-header-h)',
        }}
      >
        <button
          type="button"
          className="flex items-center gap-2 min-w-0"
          onClick={() => setActiveTab('home')}
          aria-label="Go to home"
        >
          <span className="font-headline text-xl font-light tracking-[0.2em] uppercase text-[#0B0D10] truncate">
            SASALLE
          </span>
          <span className="shrink-0 text-[8px] font-mono border border-[#0B0D10]/20 text-[#7A3A2E] px-1.5 py-0.5 tracking-widest uppercase font-bold">
            BATAM
          </span>
        </button>

        <div className="flex gap-1 shrink-0">
          {(['en', 'id', 'zh'] as Language[]).map((lang) => {
            const labels: Record<Language, string> = { en: 'EN', id: 'ID', zh: 'ZH' };
            return (
              <button
                key={lang}
                id={`lang-${lang}`}
                type="button"
                onClick={() => setLanguage(lang)}
                className={`w-8 h-8 flex items-center justify-center text-[10px] font-bold border transition-colors ${
                  language === lang
                    ? 'bg-[#0B0D10] text-[#F5F1EA] border-[#0B0D10]'
                    : 'border-[#0B0D10]/10 text-[#0B0D10]/40 active:bg-[#0B0D10]/5'
                }`}
              >
                {labels[lang]}
              </button>
            );
          })}
        </div>
      </header>
    );
  }

  return (
    <header className="fixed top-0 w-full z-50 bg-[#F5F1EA]/95 backdrop-blur-md border-b border-[#0B0D10]/10 px-4 md:px-12 py-4 flex flex-col sm:flex-row justify-between items-center gap-4">
      <div
        className="flex items-center gap-3 cursor-pointer select-none"
        onClick={() => setActiveTab('home')}
        onKeyDown={(e) => e.key === 'Enter' && setActiveTab('home')}
        role="button"
        tabIndex={0}
      >
        <span className="font-headline text-3xl font-light tracking-[0.3em] uppercase text-[#0B0D10] transition-colors duration-200 hover:text-[#7A3A2E]">
          SASALLE
        </span>
        <span className="text-[9px] font-mono border border-[#0B0D10]/20 text-[#7A3A2E] px-2 py-0.5 tracking-widest uppercase font-bold">
          BATAM
        </span>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-4">
        <div className="hidden md:flex bg-[#0B0D10]/5 p-1 border border-[#0B0D10]/10 text-xs">
          <button
            id="btn-view-desktop"
            type="button"
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
            type="button"
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

        <div className="hidden lg:flex items-center gap-2 font-sans text-[11px] uppercase tracking-[0.2em] font-medium">
          {(['home', 'rooms', 'key', 'concierge', 'admin'] as ActiveTab[]).map((tab) => {
            const labelMap: Record<ActiveTab, string> = {
              home: 'The Hotel',
              rooms: 'Suites',
              key: 'Digital Key',
              concierge: 'Dining & Chat',
              admin: 'Backstage Portal',
            };
            return (
              <button
                key={tab}
                id={`tab-desktop-${tab}`}
                type="button"
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

        <div className="flex gap-2 text-[11px] uppercase tracking-[0.2em] font-sans font-medium">
          {(['en', 'id', 'zh'] as Language[]).map((lang) => {
            const labels: Record<Language, string> = { en: 'EN', id: 'ID', zh: 'ZH' };
            return (
              <button
                key={lang}
                id={`lang-${lang}`}
                type="button"
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
