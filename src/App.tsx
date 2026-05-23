import { useState, useEffect } from 'react';
import { Language, ActiveTab, ViewMode, Booking, HousekeepingRequest, InRoomDiningOrder, ActivityLog, Room } from './types';
import { INITIAL_BOOKINGS } from './data';
import Header from './components/Header';
import BottomNav from './components/BottomNav';
import GuestView from './components/GuestView';
import AdminView from './components/AdminView';
import ConciergeChat from './components/ConciergeChat';
import DigitalKey from './components/DigitalKey';
import MobileDeviceFrame from './components/MobileDeviceFrame';

export default function App() {
  // Global States
  const [language, setLanguage] = useState<Language>('en');
  const [viewMode, setViewMode] = useState<ViewMode>(() => {
    return typeof window !== 'undefined' && window.innerWidth < 768 ? 'mobile' : 'desktop';
  });
  const [activeTab, setActiveTab] = useState<ActiveTab>('home');
  const [isRealMobile, setIsRealMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      const isMobileSize = window.innerWidth < 768 || window.hasOwnProperty('Capacitor');
      setIsRealMobile(isMobileSize);
      if (isMobileSize) {
        setViewMode('mobile');
      }
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Interactive database nodes mapped from or satisfying persistent storage
  const [bookings, setBookings] = useState<Booking[]>(() => {
    const cached = localStorage.getItem('sasalle_bookings');
    return cached ? JSON.parse(cached) : INITIAL_BOOKINGS;
  });

  const [housekeeping, setHousekeeping] = useState<HousekeepingRequest[]>(() => {
    const cached = localStorage.getItem('sasalle_housekeeping');
    return cached ? JSON.parse(cached) : [
      { id: 'HK-401', type: 'turndown', status: 'requested', time: '18:15' }
    ];
  });

  const [diningOrders, setDiningOrders] = useState<InRoomDiningOrder[]>(() => {
    const cached = localStorage.getItem('sasalle_dining');
    return cached ? JSON.parse(cached) : [
      { id: 'DIN-912', items: [{ item: 'Clay-Baked Batam Crab', price: 42, quantity: 1 }], status: 'ordered', time: '19:10' }
    ];
  });

  const [logs, setLogs] = useState<ActivityLog[]>(() => {
    const cached = localStorage.getItem('sasalle_logs');
    return cached ? JSON.parse(cached) : [
      { id: 'LOG-01', title: 'Bootstrapped', description: 'Sasalle Hospitality Engine version 4.7.2 active.', timestamp: new Date().toLocaleTimeString(), type: 'booking' },
      { id: 'LOG-02', title: 'PMS Connected', description: 'Linked local Batam port custom manifest database.', timestamp: new Date().toLocaleTimeString(), type: 'preference' }
    ];
  });

  const [selectedRoomForWizard, setSelectedRoomForWizard] = useState<Room | null>(null);
  const [isWizardOpen, setIsWizardOpen] = useState(false);

  // Sync caches
  useEffect(() => {
    localStorage.setItem('sasalle_bookings', JSON.stringify(bookings));
  }, [bookings]);

  useEffect(() => {
    localStorage.setItem('sasalle_housekeeping', JSON.stringify(housekeeping));
  }, [housekeeping]);

  useEffect(() => {
    localStorage.setItem('sasalle_dining', JSON.stringify(diningOrders));
  }, [diningOrders]);

  useEffect(() => {
    localStorage.setItem('sasalle_logs', JSON.stringify(logs));
  }, [logs]);

  // Derived Active Resident Booking
  const activeBooking = bookings.length > 0 ? bookings[bookings.length - 1] : null;

  // Actions
  const appendLog = (description: string, type: ActivityLog['type']) => {
    const newLog: ActivityLog = {
      id: `LOG-${Date.now()}`,
      title: 'Action Logged',
      description,
      timestamp: new Date().toLocaleTimeString(),
      type
    };
    setLogs(prev => [newLog, ...prev]);
  };

  const handleBookingComplete = (newBooking: Booking) => {
    setBookings(prev => [...prev, newBooking]);
    appendLog(`Lodge new booking reservation ${newBooking.id} under ${newBooking.roomName}.`, 'booking');
  };

  const handleOpenBookingWizard = (room: Room) => {
    setSelectedRoomForWizard(room);
    setIsWizardOpen(true);
  };

  const handleCloseBookingWizard = () => {
    setIsWizardOpen(false);
    setSelectedRoomForWizard(null);
  };

  const handleUpdateBookingPrefs = (p: Partial<Booking['preferences']>) => {
    if (!activeBooking) return;
    setBookings(prev => prev.map(booking => {
      if (booking.id === activeBooking.id) {
        return {
          ...booking,
          preferences: { ...booking.preferences, ...p }
        };
      }
      return booking;
    }));
    if (p.roomTemp) {
      appendLog(`Adjust room temp target to ${p.roomTemp}°C.`, 'preference');
    }
  };

  const handleAddHousekeeping = (req: HousekeepingRequest) => {
    setHousekeeping(prev => [req, ...prev]);
    appendLog(`Dispatched housekeeping request ${req.id} (${req.type}).`, 'key');
  };

  const handleAddDining = (order: InRoomDiningOrder) => {
    setDiningOrders(prev => [order, ...prev]);
    appendLog(`Kitchen registered food service order ${order.id}.`, 'dining');
  };

  // Switch action status in Admin ledger panel
  const handleToggleHousekeeping = (id: string) => {
    setHousekeeping(prev => prev.map(h => 
      h.id === id ? { ...h, status: h.status === 'completed' ? 'requested' : 'completed' } : h
    ));
    appendLog(`Toggled status of Housekeeping index: ${id}.`, 'key');
  };

  const handleToggleDining = (id: string) => {
    setDiningOrders(prev => prev.map(d => 
      d.id === id ? { ...d, status: d.status === 'delivered' ? 'ordered' : 'delivered' } : d
    ));
    appendLog(`Toggled delivery state of Food order: ${id}.`, 'dining');
  };

  const handleCancelBooking = (id: string) => {
    setBookings(prev => prev.filter(b => b.id !== id));
    appendLog(`Voided booking ledger segment: ${id}.`, 'booking');
  };

  return (
    <div className="min-h-screen bg-[#F5F1EA] bg-dot-grid font-sans antialiased text-[#0B0D10] relative">
      {/* Editorial Luxury Header Top navbar */}
      <Header
        language={language}
        setLanguage={setLanguage}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        viewMode={viewMode}
        setViewMode={setViewMode}
      />

      {/* Primary Workspace Space Adjuster */}
      <main className="pt-28 pb-10 min-h-[calc(100vh-120px)] transition-all relative z-10">
        {viewMode === 'mobile' ? (
          /* High Fidelity Mobile Simulation UI Frame */
          <div className={isRealMobile ? "w-full max-w-md mx-auto min-h-[calc(100vh-120px)] flex flex-col relative pb-20" : "px-4"}>
            {isRealMobile ? (
              // Bypasses simulated device bezel frame on real physical screens/Capacitor build
              <div className="flex-1 w-full bg-[#F5F1EA] flex flex-col relative">
                <div className="flex-1 overflow-y-auto pb-4">
                  {activeTab === 'home' && (
                    <GuestView
                      language={language}
                      activeTab="home"
                      activeBooking={activeBooking}
                      onBookingComplete={handleBookingComplete}
                      onOpenBookingWizard={handleOpenBookingWizard}
                      selectedRoomForWizard={selectedRoomForWizard}
                      onCloseBookingWizard={handleCloseBookingWizard}
                      isWizardOpen={isWizardOpen}
                    />
                  )}
                  {activeTab === 'rooms' && (
                    <GuestView
                      language={language}
                      activeTab="rooms"
                      activeBooking={activeBooking}
                      onBookingComplete={handleBookingComplete}
                      onOpenBookingWizard={handleOpenBookingWizard}
                      selectedRoomForWizard={selectedRoomForWizard}
                      onCloseBookingWizard={handleCloseBookingWizard}
                      isWizardOpen={isWizardOpen}
                    />
                  )}
                  {activeTab === 'key' && (
                    <div className="pt-4 px-4">
                      <DigitalKey activeBooking={activeBooking} language={language} />
                    </div>
                  )}
                  {activeTab === 'concierge' && (
                    <div className="min-h-[500px] flex flex-col">
                      <ConciergeChat
                        language={language}
                        activeBooking={activeBooking}
                        onUpdateBookingPrefs={handleUpdateBookingPrefs}
                        onAddHousekeeping={handleAddHousekeeping}
                        onAddDining={handleAddDining}
                      />
                    </div>
                  )}
                  {activeTab === 'admin' && (
                    <div className="p-4 bg-white/95 font-mono text-center text-xs space-y-4 border border-[#0B0D10]/10">
                      <span className="font-bold text-[#7A3A2E]">BACKSTAGE NOT SUITED FOR SMARTPHONE PORTRAIT VIEW</span>
                      <p className="text-stone-500">Please switch view mode to [ DESKTOP ] using the switcher above.</p>
                    </div>
                  )}
                </div>
                <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} language={language} />
              </div>
            ) : (
              // Displays detailed simulated Apple hardware notch and frame in desktop web browsers
              <MobileDeviceFrame
                bottomNav={
                  <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} language={language} />
                }
              >
                {activeTab === 'home' && (
                  <GuestView
                    language={language}
                    activeTab="home"
                    activeBooking={activeBooking}
                    onBookingComplete={handleBookingComplete}
                    onOpenBookingWizard={handleOpenBookingWizard}
                    selectedRoomForWizard={selectedRoomForWizard}
                    onCloseBookingWizard={handleCloseBookingWizard}
                    isWizardOpen={isWizardOpen}
                  />
                )}
                {activeTab === 'rooms' && (
                  <GuestView
                    language={language}
                    activeTab="rooms"
                    activeBooking={activeBooking}
                    onBookingComplete={handleBookingComplete}
                    onOpenBookingWizard={handleOpenBookingWizard}
                    selectedRoomForWizard={selectedRoomForWizard}
                    onCloseBookingWizard={handleCloseBookingWizard}
                    isWizardOpen={isWizardOpen}
                  />
                )}
                {activeTab === 'key' && (
                  <div className="pt-4 px-4">
                    <DigitalKey activeBooking={activeBooking} language={language} />
                  </div>
                )}
                {activeTab === 'concierge' && (
                  <div className="h-[730px] flex flex-col">
                    <ConciergeChat
                      language={language}
                      activeBooking={activeBooking}
                      onUpdateBookingPrefs={handleUpdateBookingPrefs}
                      onAddHousekeeping={handleAddHousekeeping}
                      onAddDining={handleAddDining}
                    />
                  </div>
                )}
                {activeTab === 'admin' && (
                  <div className="p-4 bg-white/95 font-mono text-center text-xs space-y-4 border border-[#0B0D10]/10">
                    <span className="font-bold text-[#7A3A2E]">BACKSTAGE NOT SUITED FOR SMARTPHONE PORTRAIT VIEW</span>
                    <p className="text-stone-500">Please switch view mode to [ DESKTOP ] using the switcher above.</p>
                  </div>
                )}
              </MobileDeviceFrame>
            )}
          </div>
        ) : (
          /* Desktop Luxury Web view (fully stretched, clean, spacious columns layout) */
          <div className="max-w-7xl mx-auto px-4 sm:px-8">
            {activeTab === 'admin' ? (
              <AdminView
                bookings={bookings}
                housekeeping={housekeeping}
                diningOrders={diningOrders}
                logs={logs}
                onToggleHousekeeping={handleToggleHousekeeping}
                onToggleDining={handleToggleDining}
                onCancelBooking={handleCancelBooking}
              />
            ) : activeTab === 'concierge' ? (
              <div className="max-w-2xl mx-auto bg-white/90 backdrop-blur-md border border-[#0B0D10]/15 p-4 md:p-8 shadow-lg">
                <ConciergeChat
                  language={language}
                  activeBooking={activeBooking}
                  onUpdateBookingPrefs={handleUpdateBookingPrefs}
                  onAddHousekeeping={handleAddHousekeeping}
                  onAddDining={handleAddDining}
                />
              </div>
            ) : activeTab === 'key' ? (
              <div className="max-w-md mx-auto py-10">
                <DigitalKey activeBooking={activeBooking} language={language} />
              </div>
            ) : (
              <GuestView
                language={language}
                activeTab={activeTab === 'rooms' ? 'rooms' : 'home'}
                activeBooking={activeBooking}
                onBookingComplete={handleBookingComplete}
                onOpenBookingWizard={handleOpenBookingWizard}
                selectedRoomForWizard={selectedRoomForWizard}
                onCloseBookingWizard={handleCloseBookingWizard}
                isWizardOpen={isWizardOpen}
              />
            )}
          </div>
        )}
      </main>

      {/* Flat Desktop Footer Info Panel (only displays on desktop viewMode to avoid blocking device frame layout) */}
      {viewMode === 'desktop' && (
        <footer className="border-t border-[#0B0D10]/10 px-12 py-8 flex flex-col md:flex-row justify-between items-center z-20 text-[#0B0D10]/60 font-sans text-[10px] uppercase tracking-[0.2em] gap-4 bg-[#F5F1EA]/80 backdrop-blur-sm">
          <div className="flex gap-8">
            <span className="font-bold text-[#0B0D10]">Batam, Indonesia</span>
            <span>+62 778 456 000</span>
          </div>
          <div className="text-center font-headline tracking-[0.1em] text-[#7A3A2E] text-xs">
            © SASALLE RESORTS • ARCHITECTURAL STILLNESS
          </div>
          <div className="flex gap-8 items-center">
            <span>Instagram</span>
            <span>Journal</span>
            <div className="flex gap-2 items-center">
              <div className="w-2 h-2 rounded-full bg-[#7A3A2E] animate-pulse"></div>
              <span className="text-[#0B0D10] font-bold">Status: Open</span>
            </div>
          </div>
        </footer>
      )}

    </div>
  );
}
