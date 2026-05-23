import { useState, useRef, useEffect, ChangeEvent } from 'react';
import { Booking, Language } from '../types';
import { DICTIONARY } from '../data';
import { Key, Unlock, Lock, Sparkles, Check } from 'lucide-react';

interface DigitalKeyProps {
  activeBooking: Booking | null;
  language: Language;
}

export default function DigitalKey({ activeBooking, language }: DigitalKeyProps) {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [sliderVal, setSliderVal] = useState(0);
  const [rippleActive, setRippleActive] = useState(false);
  const sliderRef = useRef<HTMLInputElement>(null);

  const getLabel = (key: string) => {
    return DICTIONARY[key]?.[language] || key;
  };

  const handleSliderChange = (e: ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value);
    setSliderVal(val);

    if (val >= 95) {
      setIsUnlocked(true);
      setSliderVal(100);
      setRippleActive(true);
      // Trigger temporary haptic nfc feel
      setTimeout(() => setRippleActive(false), 2500);
    }
  };

  const handleRelock = () => {
    setIsUnlocked(false);
    setSliderVal(0);
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

      {/* Actual NFC Animation Visualizer */}
      <div className="relative my-10 flex items-center justify-center">
        {/* Clay Breeze Block Motif Layer */}
        <div className="absolute inset-0 bg-[radial-gradient(circle,#0B0D10_1px,transparent_1px)] bg-[size:16px_16px] opacity-10 rounded-full w-56 h-56 mx-auto" />

        {/* Outer Pulsing Ripples */}
        <div className={`absolute w-44 h-44 rounded-full border-2 border-dashed transition-all duration-1000 ${
          isUnlocked 
            ? 'border-[#466557]/40 scale-110 animate-spin' 
            : 'border-[#7A3A2E]/25'
        }`} />
        
        <div className={`absolute w-36 h-36 rounded-full border transition-all duration-700 ${
          rippleActive ? 'scale-125 border-[#466557] opacity-100' : 'scale-100 border-[#0B0D10]/10 opacity-40'
        }`} />

        {/* Core Ceramic Key Button */}
        <div 
          onClick={() => isUnlocked && handleRelock()}
          className={`w-28 h-28 rounded-full flex flex-col items-center justify-center cursor-pointer transition-all duration-500 shadow-lg ${
            isUnlocked 
              ? 'bg-[#466557] text-[#F5F1EA]' 
              : 'bg-white border border-[#0B0D10]/20 text-[#0B0D10] hover:border-[#7A3A2E]'
          }`}
        >
          {isUnlocked ? (
            <>
              <Unlock size={32} className="animate-bounce" />
              <span className="font-mono text-[9px] mt-2 tracking-widest font-black">UNLOCKED</span>
            </>
          ) : (
            <>
              <Lock size={32} />
              <span className="font-mono text-[9px] mt-2 tracking-widest font-black">LOCKED</span>
            </>
          )}
        </div>
      </div>

      {activeBooking ? (
        <div className="space-y-6">
          {/* Reservation stats metadata inside the key container */}
          <div className="bg-white/80 border border-[#0B0D10]/10 p-4 text-center rounded-none select-none">
            <span className="text-[9px] font-mono tracking-widest text-[#0B0D10]/65 uppercase">Active Sanctuary Residence</span>
            <p className="font-headline text-lg text-[#0B0D10] font-light mt-1">
              {activeBooking.roomName}
            </p>
            <div className="flex justify-between font-mono text-[10px] text-[#0B0D10]/80 mt-2 border-t pt-2 border-stone-100">
              <span>RM: {activeBooking.id.replace('RSV-', '#')}</span>
              <span>TEMP: {activeBooking.preferences.roomTemp}°C</span>
              <span className="text-[#466557] font-black">SECURE CONNECTED</span>
            </div>
          </div>

          {isUnlocked ? (
            <div className="text-center">
              <p className="text-[#466557] font-bold text-xs flex items-center justify-center gap-1.5 animate-pulse">
                <Check size={14} /> {getLabel('unlocked_message')}
              </p>
              <button 
                id="btn-relock"
                onClick={handleRelock}
                className="mt-3 text-[10px] font-mono tracking-widest text-[#7A3A2E] underline border border-transparent hover:border-[#7A3A2E]/20 px-2 py-1"
              >
                RE-ENGAGE SECURE RESTRAINT
              </button>
            </div>
          ) : (
            <div className="space-y-2">
              <div className="relative flex items-center">
                <input 
                  type="range"
                  id="slider-unlock"
                  ref={sliderRef}
                  min="0"
                  max="100"
                  value={sliderVal}
                  onChange={handleSliderChange}
                  className="w-full h-11 bg-white/70 border border-[#0B0D10]/15 appearance-none outline-none cursor-pointer rounded-none relative accent-[#7A3A2E]" 
                />
                
                {/* Visual Label */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none text-[9px] font-mono tracking-[0.2em] text-[#0B0D10]/80 uppercase font-bold">
                  {getLabel('slide_to_unlock')}
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="bg-[#0B0D10]/5 border border-[#0B0D10]/10 p-5 text-center space-y-3 rounded-none">
          <p className="text-xs text-[#7A3A2E] italic font-medium">
            "No active residential stay sequence detected."
          </p>
          <p className="text-[11px] text-[#0B0D10]/80 leading-relaxed font-sans">
            A digital room key is only issued once you have selected and confirmed an active stay under the **Suites** menu.
          </p>
        </div>
      )}
    </div>
  );
}
