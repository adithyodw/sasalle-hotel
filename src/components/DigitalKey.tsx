import { useState } from 'react';
import { Booking, Language } from '../types';
import { DICTIONARY } from '../data';
import { Unlock, Lock, Check } from 'lucide-react';
import SlideToUnlock from './SlideToUnlock';

interface DigitalKeyProps {
  activeBooking: Booking | null;
  language: Language;
}

export default function DigitalKey({ activeBooking, language }: DigitalKeyProps) {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [rippleActive, setRippleActive] = useState(false);

  const getLabel = (key: string) => {
    return DICTIONARY[key]?.[language] || key;
  };

  const handleUnlock = () => {
    setIsUnlocked(true);
    setRippleActive(true);
    setTimeout(() => setRippleActive(false), 2500);
  };

  const handleRelock = () => {
    setIsUnlocked(false);
  };

  return (
    <div className="bg-[#F5F1EA] text-[#0B0D10] p-5 sm:p-6 w-full max-w-sm mx-auto min-h-0 flex flex-col justify-between border border-[#0B0D10]/10">
      <div className="text-center space-y-2 select-none">
        <h3 className="font-headline text-2xl text-[#0B0D10] tracking-[0.1em] uppercase font-light">
          {getLabel('key_title')}
        </h3>
        <p className="text-xs text-[#0B0D10]/70 max-w-xs mx-auto">
          {getLabel('key_desc')}
        </p>
      </div>

      <div className="relative my-8 flex items-center justify-center">
        <div className="absolute inset-0 bg-[radial-gradient(circle,#0B0D10_1px,transparent_1px)] bg-[size:16px_16px] opacity-10 rounded-full w-52 h-52 sm:w-56 sm:h-56 mx-auto" />

        <div
          className={`absolute w-40 h-40 sm:w-44 sm:h-44 rounded-full border-2 border-dashed transition-all duration-1000 ${
            isUnlocked ? 'border-[#466557]/40 scale-110 animate-spin' : 'border-[#7A3A2E]/25'
          }`}
        />

        <div
          className={`absolute w-32 h-32 sm:w-36 sm:h-36 rounded-full border transition-all duration-700 ${
            rippleActive ? 'scale-125 border-[#466557] opacity-100' : 'scale-100 border-[#0B0D10]/10 opacity-40'
          }`}
        />

        <button
          type="button"
          onClick={() => isUnlocked && handleRelock()}
          className={`w-24 h-24 sm:w-28 sm:h-28 rounded-full flex flex-col items-center justify-center transition-all duration-500 shadow-lg ${
            isUnlocked
              ? 'bg-[#466557] text-[#F5F1EA]'
              : 'bg-white border border-[#0B0D10]/20 text-[#0B0D10] active:border-[#7A3A2E]'
          }`}
        >
          {isUnlocked ? (
            <>
              <Unlock size={30} />
              <span className="font-mono text-[9px] mt-2 tracking-widest font-black">UNLOCKED</span>
            </>
          ) : (
            <>
              <Lock size={30} />
              <span className="font-mono text-[9px] mt-2 tracking-widest font-black">LOCKED</span>
            </>
          )}
        </button>
      </div>

      {activeBooking ? (
        <div className="space-y-5">
          <div className="bg-white/80 border border-[#0B0D10]/10 p-4 text-center select-none">
            <span className="text-[9px] font-mono tracking-widest text-[#0B0D10]/65 uppercase">
              Active Sanctuary Residence
            </span>
            <p className="font-headline text-lg text-[#0B0D10] font-light mt-1">{activeBooking.roomName}</p>
            <div className="flex justify-between font-mono text-[10px] text-[#0B0D10]/80 mt-2 border-t pt-2 border-stone-100">
              <span>RM: {activeBooking.id.replace('RSV-', '#')}</span>
              <span>TEMP: {activeBooking.preferences.roomTemp}°C</span>
              <span className="text-[#466557] font-black">SECURE</span>
            </div>
          </div>

          {isUnlocked ? (
            <div className="text-center">
              <p className="text-[#466557] font-bold text-xs flex items-center justify-center gap-1.5">
                <Check size={14} /> {getLabel('unlocked_message')}
              </p>
              <button
                type="button"
                id="btn-relock"
                onClick={handleRelock}
                className="mt-3 text-[10px] font-mono tracking-widest text-[#7A3A2E] border border-transparent active:border-[#7A3A2E]/20 px-2 py-1"
              >
                RE-ENGAGE SECURE RESTRAINT
              </button>
            </div>
          ) : (
            <SlideToUnlock label={getLabel('slide_to_unlock')} onUnlock={handleUnlock} />
          )}
        </div>
      ) : (
        <div className="bg-[#0B0D10]/5 border border-[#0B0D10]/10 p-5 text-center space-y-3">
          <p className="text-xs text-[#7A3A2E] italic font-medium">
            No active residential stay sequence detected.
          </p>
          <p className="text-[11px] text-[#0B0D10]/80 leading-relaxed">
            A digital room key is issued once you confirm a stay under Suites.
          </p>
        </div>
      )}
    </div>
  );
}
