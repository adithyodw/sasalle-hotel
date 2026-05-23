import { useState } from 'react';
import { Room, Booking, BookingPreference } from '../types';
import { Calendar, Users, Award, Car, Check, ChevronRight, Sparkles, Sliders } from 'lucide-react';
import { ROOMS } from '../data';

interface BookingWizardProps {
  room: Room;
  onBookingComplete: (booking: Booking) => void;
  onClose: () => void;
  language: string;
}

export default function BookingWizard({ room, onBookingComplete, onClose, language }: BookingWizardProps) {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [guests, setGuests] = useState<number>(2);
  const [checkIn, setCheckIn] = useState<string>('2026-06-15');
  const [checkOut, setCheckOut] = useState<string>('2026-06-18');
  const [promoCode, setPromoCode] = useState<string>('');
  const [promoDiscount, setPromoDiscount] = useState<number>(0);
  const [promoApplied, setPromoApplied] = useState<boolean>(false);
  const [selectedBundle, setSelectedBundle] = useState<'none' | 'botanical' | 'epicurean'>('none');

  // Preferences
  const [pillow, setPillow] = useState<BookingPreference['pillowType']>('memory');
  const [roomTemp, setRoomTemp] = useState<number>(21.5);
  const [dietary, setDietary] = useState<string>('');
  const [airportPickup, setAirportPickup] = useState<boolean>(true);
  const [flightNum, setFlightNum] = useState<string>('SQ-954');
  const [arrivalTime, setArrivalTime] = useState<string>('15:15');
  const [pantryItems, setPantryItems] = useState<string[]>(['Vanuatu Cocoa Beans']);
  const [vehiclePref, setVehiclePref] = useState<BookingPreference['airportTransfer']['vehiclePref']>('s-class');

  const baseNights = 3;
  const roomRate = room.price;
  const promoRateMultiplier = promoApplied ? (1 - promoDiscount) : 1;
  const bundleAddition = selectedBundle === 'botanical' ? 250 : selectedBundle === 'epicurean' ? 400 : 0;
  
  const subTotal = (roomRate * baseNights + bundleAddition) * promoRateMultiplier;
  const taxAndService = subTotal * 0.21; // 21% Government tax & high-end service charge customary in luxury Indonesia spa hotels
  const totalAmount = subTotal + taxAndService;

  const handleApplyPromo = () => {
    const code = promoCode.toUpperCase().trim();
    if (code === 'STILLNESS') {
      setPromoDiscount(0.15);
      setPromoApplied(true);
    } else if (code === 'HERITAGE') {
      setPromoDiscount(0.10);
      setPromoApplied(true);
    } else {
      alert('Code unrecognized across Sasalle registry.');
    }
  };

  const handleTogglePantry = (item: string) => {
    if (pantryItems.includes(item)) {
      setPantryItems(pantryItems.filter(p => p !== item));
    } else {
      setPantryItems([...pantryItems, item]);
    }
  };

  const executeReservationComplete = () => {
    const newBooking: Booking = {
      id: `RSV-${Math.floor(1000 + Math.random() * 9000)}`,
      roomId: room.id,
      roomName: room.name,
      checkIn,
      checkOut,
      guests,
      totalAmount: Math.round(totalAmount),
      promoCode: promoApplied ? promoCode.toUpperCase() : undefined,
      packageName: selectedBundle !== 'none' ? `${selectedBundle === 'botanical' ? 'Botanical Wellness' : 'Epicurean Feast'}` : undefined,
      status: 'confirmed',
      preferences: {
        pillowType: pillow,
        roomTemp,
        dietaryNotes: dietary || 'None declared',
        preArrivalPantry: pantryItems,
        airportTransfer: {
          enabled: airportPickup,
          flightNumber: flightNum,
          arrivalTime,
          vehiclePref
        }
      }
    };
    onBookingComplete(newBooking);
    setStep(3);
  };

  return (
    <div className="bg-[#F5F1EA] text-[#0B0D10] p-6 md:p-8 border border-[#0B0D10]/15 max-w-xl mx-auto rounded-none relative shadow-xl">
      <button 
        id="btn-close-wizard"
        onClick={onClose} 
        className="absolute top-4 right-4 font-sans text-[10px] tracking-widest hover:text-[#7A3A2E] border border-[#0B0D10]/10 px-3 py-1 bg-white/50"
      >
        CLOSE
      </button>

      {/* Progress Line */}
      <div className="flex justify-between items-center mb-10 border-b border-[#0B0D10]/10 pb-4 select-none">
        <h3 className="font-headline text-xl text-[#0B0D10] font-light tracking-wide">
          {step === 1 ? 'Step I: Sanctuary Setup' : step === 2 ? 'Step II: Personalize Presence' : 'Step III: Complete Sanction'}
        </h3>
        <span className="font-mono text-xs text-[#0B0D10]/50 font-bold">
          STEP {step} / 3
        </span>
      </div>

      {step === 1 && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] font-mono tracking-widest text-[#0B0D10]/70 uppercase mb-1">
                Sanctuary Target
              </label>
              <div className="font-bold border-b border-[#0B0D10]/10 pb-1 text-[#7A3A2E]">
                {room.name}
              </div>
            </div>
            <div>
              <label className="block text-[10px] font-mono tracking-widest text-[#0B0D10]/70 uppercase mb-1">
                Nightly Rate
              </label>
              <div className="font-bold border-b border-[#0B0D10]/10 pb-1 text-right text-[#7A3A2E]">
                ${room.price} USD
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] font-mono tracking-widest text-[#0B0D10]/70 uppercase mb-1">
                CHECK-IN
              </label>
              <input 
                type="date"
                id="input-check-in" 
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
                className="w-full bg-transparent border-b border-[#0B0D10]/20 focus:border-[#7A3A2E] focus:outline-none py-1 text-sm font-semibold rounded-none"
              />
            </div>
            <div>
              <label className="block text-[10px] font-mono tracking-widest text-[#0B0D10]/70 uppercase mb-1">
                CHECK-OUT
              </label>
              <input 
                type="date"
                id="input-check-out" 
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
                className="w-full bg-transparent border-b border-[#0B0D10]/20 focus:border-[#7A3A2E] focus:outline-none py-1 text-sm font-semibold rounded-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-mono tracking-widest text-[#0B0D10]/70 uppercase mb-2">
              Package Bundling Accent
            </label>
            <div className="space-y-3">
              <label className={`block border p-3 cursor-pointer transition-all ${selectedBundle === 'none' ? 'border-[#0B0D10] bg-white shadow-sm' : 'border-[#0B0D10]/10'}`}>
                <input 
                  type="radio" 
                  name="bundle" 
                  checked={selectedBundle === 'none'} 
                  onChange={() => setSelectedBundle('none')} 
                  className="hidden"
                />
                <div className="flex justify-between items-center">
                  <span className="font-mono text-xs font-bold uppercase text-[#0B0D10]">Restoration Standard Stay</span>
                  <span className="text-xs font-semibold">Included</span>
                </div>
                <p className="text-[11px] text-[#0B0D10]/75 mt-1">
                  Includes raw herbal welcome blends and structural silence.
                </p>
              </label>

              <label className={`block border p-3 cursor-pointer transition-all ${selectedBundle === 'botanical' ? 'border-[#7A3A2E] bg-[#466557]/10' : 'border-[#0B0D10]/10'}`}>
                <input 
                  type="radio" 
                  name="bundle" 
                  checked={selectedBundle === 'botanical'} 
                  onChange={() => setSelectedBundle('botanical')} 
                  className="hidden"
                />
                <div className="flex justify-between items-center">
                  <span className="font-mono text-xs font-bold text-[#466557] uppercase">The Botanical Spa Ritual</span>
                  <span className="text-xs font-bold text-[#466557]">+ $250 USD</span>
                </div>
                <p className="text-[11px] text-[#0B0D10]/75 mt-1">
                  Adds (1) custom Stone Bathing Ritual and full-set Hijau Nyonya Clay Wrap session.
                </p>
              </label>

              <label className={`block border p-3 cursor-pointer transition-all ${selectedBundle === 'epicurean' ? 'border-[#7A3A2E] bg-white shadow-sm' : 'border-[#0B0D10]/10'}`}>
                <input 
                  type="radio" 
                  name="bundle" 
                  checked={selectedBundle === 'epicurean'} 
                  onChange={() => setSelectedBundle('epicurean')} 
                  className="hidden"
                />
                <div className="flex justify-between items-center">
                  <span className="font-mono text-xs font-bold text-[#7A3A2E] uppercase">The Epicurean Brick Manifestation</span>
                  <span className="text-xs font-bold text-[#7A3A2E]">+ $400 USD</span>
                </div>
                <p className="text-[11px] text-[#0B0D10]/75 mt-1">
                  Adds full phase five-course culinary progression at The Brick & Iron with curated wine matches.
                </p>
              </label>
            </div>
          </div>

          {/* Promo Code System */}
          <div className="pt-2 border-t border-[#0B0D10]/10">
            <label className="block text-[10px] font-mono tracking-widest text-[#0B0D10]/70 uppercase mb-1">
              PROMO CODE
            </label>
            <div className="flex gap-2">
              <input 
                type="text" 
                id="input-promo"
                placeholder="PROMPT CODE (e.g. STILLNESS)" 
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                className="flex-1 bg-white border border-[#0B0D10]/10 focus:outline-none focus:border-[#7A3A2E] px-3 py-1.5 font-mono text-xs uppercase"
              />
              <button 
                id="btn-apply-promo"
                onClick={handleApplyPromo}
                className="bg-[#0B0D10] text-[#F5F1EA] px-4 py-1.5 text-xs font-mono font-bold hover:bg-[#7A3A2E] transition-colors"
              >
                APPLY
              </button>
            </div>
            {promoApplied && (
              <p className="text-[#466557] text-xs font-bold mt-1.5 flex items-center gap-1">
                <Check size={12} /> {promoDiscount * 100}% discount registered against "{promoCode.toUpperCase()}"!
              </p>
            )}
            <p className="text-[10px] text-[#0B0D10]/50 italic mt-1">
              Tip: Enter 'STILLNESS' for 15% discount as an inaugural guest.
            </p>
          </div>

          <button 
            id="btn-next-step"
            onClick={() => setStep(2)}
            className="w-full bg-[#0B0D10] text-[#F5F1EA] py-4 font-sans text-xs font-black tracking-widest uppercase hover:bg-[#7A3A2E] flex items-center justify-center gap-2 mt-4 transition-colors"
          >
            FORWARD TO DESIGN PREFERENCES
            <ChevronRight size={14} />
          </button>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-6">
          <p className="text-xs text-[#0B0D10]/80 italic border-l-2 border-[#7A3A2E] pl-3 py-1 bg-[#0B0D10]/5 pr-2">
            "These settings are mapped directly into your room computer node ahead of physical arrival."
          </p>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] font-mono tracking-widest text-[#0B0D10]/70 uppercase mb-2">
                Pillow Configuration
              </label>
              <select
                id="select-pillow"
                value={pillow}
                onChange={(e) => setPillow(e.target.value as BookingPreference['pillowType'])}
                className="w-full bg-white border border-[#0B0D10]/10 p-2 font-mono text-xs focus:outline-none rounded-none focus:border-[#7A3A2E]"
              >
                <option value="feather">Natural White Goose Feather (Soft)</option>
                <option value="memory">Volcanic Mineral Infused Memory (Support)</option>
                <option value="buckwheat">Indonesian Buckwheat Husk (Cooling)</option>
                <option value="none">Empty Plinth (Austere Minimal)</option>
              </select>
            </div>

            <div>
              <label className="block text-[10px] font-mono tracking-widest text-[#0B0D10]/70 uppercase mb-2">
                Room Climate Control
              </label>
              <div className="flex items-center gap-3">
                <input 
                  type="range" 
                  min={18} 
                  max={26} 
                  step={0.5} 
                  value={roomTemp}
                  onChange={(e) => setRoomTemp(parseFloat(e.target.value))}
                  className="flex-1 accent-[#7A3A2E]"
                />
                <span className="font-mono text-xs font-bold bg-white px-2 py-1 border border-[#0B0D10]/10">
                  {roomTemp}°C
                </span>
              </div>
            </div>
          </div>

          {/* Airport Pickup */}
          <div className="border border-[#0B0D10]/10 p-4 bg-white/40">
            <div className="flex items-center justify-between mb-3">
              <label className="flex items-center gap-2 cursor-pointer font-bold text-xs font-mono uppercase text-[#0B0D10]">
                <input 
                  type="checkbox" 
                  checked={airportPickup} 
                  onChange={(e) => setAirportPickup(e.target.checked)}
                  className="rounded-none accent-[#7A3A2E]"
                />
                Secure Private Batam Port Pickup
              </label>
              <Car size={16} className="text-[#7A3A2E]" />
            </div>

            {airportPickup && (
              <div className="grid grid-cols-3 gap-3 pt-2">
                <div>
                  <label className="block text-[9px] font-mono text-[#0B0D10]/75 uppercase mb-1">Flight/Ferry</label>
                  <input 
                    type="text" 
                    value={flightNum} 
                    onChange={(e) => setFlightNum(e.target.value)}
                    className="w-full bg-white border border-[#0B0D10]/10 px-2 py-1 text-xs"
                  />
                </div>
                <div>
                  <label className="block text-[9px] font-mono text-[#0B0D10]/75 uppercase mb-1">Est. Arrival Time</label>
                  <input 
                    type="text" 
                    value={arrivalTime} 
                    onChange={(e) => setArrivalTime(e.target.value)}
                    className="w-full bg-white border border-[#0B0D10]/10 px-2 py-1 text-xs"
                  />
                </div>
                <div>
                  <label className="block text-[9px] font-mono text-[#0B0D10]/75 uppercase mb-1">Vehicle Selection</label>
                  <select 
                    value={vehiclePref} 
                    onChange={(e) => setVehiclePref(e.target.value as any)}
                    className="w-full bg-white border border-[#0B0D10]/10 p-1 text-xs"
                  >
                    <option value="s-class">Mercedes S-Class</option>
                    <option value="velfire">Toyota Vellfire Lounge</option>
                    <option value="eqs">Mercedes electric EQS</option>
                  </select>
                </div>
              </div>
            )}
          </div>

          {/* Pantry selection */}
          <div>
            <label className="block text-[10px] font-mono tracking-widest text-[#0B0D10]/70 uppercase mb-2">
              Bespoke Pantry Pre-Stock
            </label>
            <div className="grid grid-cols-2 gap-2 text-xs">
              {[
                'Vanuatu Cocoa Beans',
                'Fermented Papaya Essence',
                'Local Batam Wildflower Honey',
                'Cold Brew Sumatran Peaberry',
                'Raw Aloe Vera Water'
              ].map((item) => {
                const isSelected = pantryItems.includes(item);
                return (
                  <button
                    key={item}
                    type="button"
                    onClick={() => handleTogglePantry(item)}
                    className={`p-2 border text-left transition-all flex justify-between items-center ${
                      isSelected ? 'bg-[#0B0D10] text-[#F5F1EA] border-[#0B0D10]' : 'bg-white border-[#0B0D10]/10 text-[#0B0D10]/80'
                    }`}
                  >
                    <span>{item}</span>
                    {isSelected && <Check size={12} />}
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-mono tracking-widest text-[#0B0D10]/70 uppercase mb-1">
              Dietary Restrictions / In-Room Dining Directives
            </label>
            <input 
              type="text" 
              placeholder="Allergies, organic preferences, fasting schedules..." 
              value={dietary}
              onChange={(e) => setDietary(e.target.value)}
              className="w-full bg-white border border-[#0B0D10]/10 p-2 text-xs focus:outline-none focus:border-[#7A3A2E]"
            />
          </div>

          <div className="flex gap-2">
            <button 
              id="btn-back-step"
              onClick={() => setStep(1)}
              className="w-1/3 border border-[#0B0D10]/20 text-[#0B0D10] py-4 text-xs font-mono uppercase font-bold"
            >
              BACK
            </button>
            <button 
              id="btn-complete-booking"
              onClick={executeReservationComplete}
              className="flex-1 bg-[#0B0D10] text-[#F5F1EA] py-4 text-xs font-sans font-black tracking-widest uppercase hover:bg-[#7A3A2E] transition-colors"
            >
              COMPLETE BOOKING
            </button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="text-center space-y-6 py-6">
          <div className="w-16 h-16 bg-[#B89B5E] text-[#F5F1EA] rounded-full flex items-center justify-center mx-auto shadow-lg">
            <Check size={32} />
          </div>

          <div>
            <h4 className="font-headline text-3xl text-[#0B0D10] font-light">
              Sanctuary Confirmed
            </h4>
            <p className="font-mono text-xs text-[#0B0D10]/50 mt-2 tracking-widest font-black uppercase">
              RESERVATION COMPLETED SUCCESSFULLY
            </p>
          </div>

          <div className="bg-white border border-[#0B0D10]/15 p-5 text-left font-mono text-[11px] space-y-2 mt-4 shadow-sm">
            <div className="flex justify-between border-b pb-1 border-stone-100">
              <span className="text-stone-400">RESIST COMP ID:</span>
              <span className="font-bold">SAS-8104</span>
            </div>
            <div className="flex justify-between">
              <span className="text-stone-400">ROOM:</span>
              <span className="font-bold">{room.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-stone-400">DATES:</span>
              <span className="font-bold">{checkIn} to {checkOut}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-stone-400">PACKAGES:</span>
              <span className="font-bold uppercase text-[#7A3A2E]">
                {selectedBundle !== 'none' ? `${selectedBundle}` : 'Restoration Standard'}
              </span>
            </div>
            {airportPickup && (
              <div className="flex justify-between">
                <span className="text-stone-400">PORT TRANSFER:</span>
                <span className="font-bold uppercase">{vehiclePref} Lounge</span>
              </div>
            )}
            <div className="flex justify-between border-t border-dashed pt-2 font-bold text-sm text-[#7A3A2E] border-stone-200">
              <span>TOTAL (TAX INC):</span>
              <span>${Math.round(totalAmount).toLocaleString()} USD</span>
            </div>
          </div>

          <p className="text-xs text-[#0B0D10]/70 italic max-w-sm mx-auto font-sans leading-relaxed">
            "Your digital entry code has been provisioned. Please head over to the Digital Key section to pre-authorize your physical unlocking sequence."
          </p>

          <button 
            id="btn-close-and-view"
            onClick={onClose}
            className="w-full bg-[#0B0D10] text-white py-4 font-sans text-xs font-black tracking-widest uppercase hover:bg-[#7A3A2E] transition-colors"
          >
            DISMISS AND RETURN
          </button>
        </div>
      )}
    </div>
  );
}
