import { ReactNode, useState, useEffect } from 'react';
import { Wifi, Battery, Signal } from 'lucide-react';

interface MobileDeviceFrameProps {
  children: ReactNode;
  bottomNav?: ReactNode;
}

export default function MobileDeviceFrame({ children, bottomNav }: MobileDeviceFrameProps) {
  const [currentTime, setCurrentTime] = useState('12:00');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      let hours = now.getHours();
      let minutes: string | number = now.getMinutes();
      if (minutes < 10) minutes = `0${minutes}`;
      setCurrentTime(`${hours}:${minutes}`);
    };
    updateTime();
    const timer = setInterval(updateTime, 10000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative mx-auto my-6 w-[385px] h-[812px] bg-[#0B0D10] rounded-[50px] p-3.5 shadow-2xl border-4 border-[#86736F]/40 overflow-hidden flex flex-col select-none">
      {/* Notch & Top Speaker */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-7 bg-[#0B0D10] rounded-b-2xl z-50 flex items-center justify-center">
        <div className="w-12 h-1 bg-[#222] rounded-full" />
      </div>

      {/* Screen Container */}
      <div className="relative w-full h-full bg-[#F5F1EA] rounded-[36px] overflow-hidden flex flex-col border border-black/10">
        
        {/* Status Bar */}
        <div className="h-10 px-6 flex justify-between items-end pb-1.5 text-xs font-semibold text-black/80 z-40 relative select-none">
          <span className="text-[11px] font-bold">{currentTime}</span>
          <div className="flex items-center gap-1.5 opacity-80">
            <Signal size={12} className="stroke-[2px]" />
            <span className="text-[10px] font-bold">5G</span>
            <Wifi size={12} />
            <Battery size={14} className="stroke-[1.5px]" />
          </div>
        </div>

        {/* Content Layer (allows inner scrolling, minus top status and bottom bar spacing) */}
        <div className="flex-1 overflow-y-auto no-scrollbar pb-24 relative">
          {children}
        </div>

        {bottomNav}

        {/* Home Swipe Indicator */}
        <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-32 h-1 bg-black/30 rounded-full z-50" />
      </div>
    </div>
  );
}
