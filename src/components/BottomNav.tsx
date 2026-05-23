import { ActiveTab, Language } from '../types';
import { Home, Compass, Key, HelpCircle } from 'lucide-react';
import { DICTIONARY } from '../data';

interface BottomNavProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  language: Language;
}

export default function BottomNav({ activeTab, setActiveTab, language }: BottomNavProps) {
  const getLabel = (key: string) => {
    return DICTIONARY[key]?.[language] || key;
  };

  const navItems = [
    { id: 'home' as ActiveTab, icon: Home, labelKey: 'home' },
    { id: 'rooms' as ActiveTab, icon: Compass, labelKey: 'rooms' },
    { id: 'key' as ActiveTab, icon: Key, labelKey: 'key' },
    { id: 'concierge' as ActiveTab, icon: HelpCircle, labelKey: 'concierge' }
  ];

  return (
    <nav className="absolute bottom-0 left-0 right-0 z-40 bg-[#F5F1EA] border-t border-[#0B0D10]/10 shadow-sm flex justify-around items-center h-20 pb-3">
      {navItems.map((item) => {
        const isActive = activeTab === item.id;
        const Icon = item.icon;
        return (
          <button
            key={item.id}
            id={`bottom-nav-${item.id}`}
            onClick={() => setActiveTab(item.id)}
            className={`flex flex-col items-center justify-center w-20 h-full transition-transform active:scale-95 ${
              isActive ? 'text-[#7A3A2E] font-extrabold' : 'text-[#0B0D10]/60 hover:text-[#7A3A2E]'
            }`}
          >
            <Icon size={20} className={isActive ? 'stroke-[2.5px]' : 'stroke-[1.5px]'} />
            <span className="font-mono text-[9px] mt-1 tracking-wider uppercase">
              {getLabel(item.labelKey).split(' ')[0]} {/* Short word first */}
            </span>
          </button>
        );
      })}
    </nav>
  );
}
