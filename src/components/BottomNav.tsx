import { ActiveTab, Language } from '../types';
import { Home, Compass, Key, HelpCircle } from 'lucide-react';
import { DICTIONARY } from '../data';

interface BottomNavProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  language: Language;
  fixed?: boolean;
  nativeShell?: boolean;
}

export default function BottomNav({ activeTab, setActiveTab, language, fixed = false, nativeShell = false }: BottomNavProps) {
  const getLabel = (key: string) => {
    return DICTIONARY[key]?.[language] || key;
  };

  const navItems = [
    { id: 'home' as ActiveTab, icon: Home, labelKey: 'home' },
    { id: 'rooms' as ActiveTab, icon: Compass, labelKey: 'rooms' },
    { id: 'key' as ActiveTab, icon: Key, labelKey: 'key' },
    { id: 'concierge' as ActiveTab, icon: HelpCircle, labelKey: 'concierge' },
  ];

  const navClass = nativeShell
    ? 'shrink-0 z-50 bg-[#F5F1EA]/98 backdrop-blur-md border-t border-[#0B0D10]/10 shadow-[0_-4px_24px_rgba(11,13,16,0.06)] flex justify-around items-stretch w-full'
    : fixed
    ? 'fixed bottom-0 left-0 right-0 z-50 bg-[#F5F1EA]/98 backdrop-blur-md border-t border-[#0B0D10]/10 shadow-[0_-4px_24px_rgba(11,13,16,0.06)] flex justify-around items-stretch'
    : 'absolute bottom-0 left-0 right-0 z-40 bg-[#F5F1EA] border-t border-[#0B0D10]/10 shadow-sm flex justify-around items-center h-20 pb-3';

  return (
    <nav
      className={navClass}
      style={
        fixed || nativeShell
          ? {
              paddingBottom: 'var(--safe-bottom)',
              minHeight: 'var(--mobile-nav-h)',
            }
          : undefined
      }
      role="navigation"
      aria-label="Main navigation"
    >
      {navItems.map((item) => {
        const isActive = activeTab === item.id;
        const Icon = item.icon;
        const label = getLabel(item.labelKey).split(' ')[0];
        return (
          <button
            key={item.id}
            id={`bottom-nav-${item.id}`}
            type="button"
            onClick={() => setActiveTab(item.id)}
            aria-current={isActive ? 'page' : undefined}
            className={`flex flex-1 flex-col items-center justify-center gap-0.5 py-2 min-h-[3.25rem] transition-colors active:scale-95 ${
              isActive ? 'text-[#7A3A2E]' : 'text-[#0B0D10]/55 active:text-[#7A3A2E]'
            }`}
          >
            <Icon size={22} className={isActive ? 'stroke-[2.5px]' : 'stroke-[1.5px]'} />
            <span className={`font-mono text-[9px] tracking-wider uppercase ${isActive ? 'font-bold' : 'font-medium'}`}>
              {label}
            </span>
          </button>
        );
      })}
    </nav>
  );
}
