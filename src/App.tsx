import { useState, useEffect } from 'react';
import { Language, ActiveTab, ViewMode, Booking, HousekeepingRequest, InRoomDiningOrder, ActivityLog, Room } from './types';
import { INITIAL_BOOKINGS } from './data';
import Header from './components/Header';
import BottomNav from './components/BottomNav';
import GuestView from './components/GuestView';
import AdminView from './components/AdminView';
import ConciergeChat from './components/ConciergeChat';
import DigitalKey from './components/DigitalKey';
import BookingWizard from './components/BookingWizard';
import MobileDeviceFrame from './components/MobileDeviceFrame';
import { useIsMobile } from './hooks/useIsMobile';
import { PHONE_DISPLAY, PHONE_TEL } from './constants/links';

export default function App() {
  const isNativeMobile = useIsMobile();
  const [language, setLanguage] = useState<Language>('en');
  const [viewMode, setViewMode] = useState<ViewMode>(() => {
    if (typeof window === 'undefined') return 'desktop';
    const isCapacitor =
      typeof (window as Window & { Capacitor?: unknown }).Capacitor !== 'undefined';
    return window.innerWidth < 768 || isCapacitor ? 'mobile' : 'desktop';
  });
  const [activeTab, setActiveTab] = useState<ActiveTab>('home');

  useEffect(() => {
    if (isNativeMobile) {
      setViewMode('mobile');
      document.body.classList.add('native-mobile');
    } else {
      document.body.classList.remove('native-mobile');
    }
  }, [isNativeMobile]);

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

  const activeBooking = bookings.length > 0 ? bookings[bookings.length - 1] : null;

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

  const guestViewProps = {
    language,
    activeBooking,
    onBookingComplete: handleBookingComplete,
    onOpenBookingWizard: handleOpenBookingWizard,
    selectedRoomForWizard,
    onCloseBookingWizard: handleCloseBookingWizard,
    isWizardOpen,
    isNativeMobile,
  };

  const renderMobileTab = (tab: ActiveTab) => {
    if (tab === 'home' || tab === 'rooms') {
      return (
        <GuestView
          {...guestViewProps}
          activeTab={tab}
        />
      );
    }
    if (tab === 'key') {
      return (
        <div className="px-4 py-4 w-full max-w-lg mx-auto">
          <DigitalKey activeBooking={activeBooking} language={language} />
        </div>
      );
    }
    if (tab === 'concierge') {
      return (
        <div className="flex flex-col flex-1 min-h-0 w-full">
          <ConciergeChat
            language={language}
            activeBooking={activeBooking}
            onUpdateBookingPrefs={handleUpdateBookingPrefs}
            onAddHousekeeping={handleAddHousekeeping}
            onAddDining={handleAddDining}
            fillHeight
          />
        </div>
      );
    }
    return null;
  };

  /* ── Native mobile shell (real phones / Capacitor) ── */
  if (isNativeMobile) {
    return (
      <div className="native-app-shell bg-[#F5F1EA] bg-dot-grid font-sans antialiased text-[#0B0D10]">
        <Header
          language={language}
          setLanguage={setLanguage}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          viewMode={viewMode}
          setViewMode={setViewMode}
          isNativeMobile
        />

        <main
          className={`native-app-content relative z-10 w-full ${
            activeTab === 'concierge' ? '!overflow-hidden flex flex-col' : ''
          }`}
          style={{
            paddingTop: 'var(--mobile-header-h)',
            paddingBottom: 'var(--mobile-nav-h)',
          }}
        >
          {renderMobileTab(activeTab)}
        </main>

        {!isWizardOpen && (
          <BottomNav
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            language={language}
            fixed
          />
        )}

        {isWizardOpen && selectedRoomForWizard && (
          <div className="fixed inset-0 z-[200] bg-[#F5F1EA] flex flex-col">
            <BookingWizard
              room={selectedRoomForWizard}
              onBookingComplete={handleBookingComplete}
              onClose={handleCloseBookingWizard}
              language={language}
              presentation="sheet"
            />
          </div>
        )}
      </div>
    );
  }

  /* ── Desktop / browser preview ── */
  return (
    <div className="min-h-screen bg-[#F5F1EA] bg-dot-grid font-sans antialiased text-[#0B0D10] relative">
      <Header
        language={language}
        setLanguage={setLanguage}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        viewMode={viewMode}
        setViewMode={setViewMode}
      />

      <main className="pt-28 pb-10 min-h-[calc(100vh-120px)] transition-all relative z-10">
        {viewMode === 'mobile' ? (
          <div className="px-4">
            <MobileDeviceFrame
              bottomNav={
                <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} language={language} />
              }
            >
              {renderMobileTab(activeTab) ?? (
                <div className="p-4 bg-white/95 font-mono text-center text-xs space-y-4 border border-[#0B0D10]/10 m-4">
                  <span className="font-bold text-[#7A3A2E]">BACKSTAGE NOT SUITED FOR SMARTPHONE PORTRAIT VIEW</span>
                  <p className="text-stone-500">Please switch view mode to [ DESKTOP ] using the switcher above.</p>
                </div>
              )}
            </MobileDeviceFrame>
          </div>
        ) : (
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
                {...guestViewProps}
                activeTab={activeTab === 'rooms' ? 'rooms' : 'home'}
              />
            )}
          </div>
        )}
      </main>

      {viewMode === 'desktop' && (
        <footer className="border-t border-[#0B0D10]/10 px-12 py-8 flex flex-col md:flex-row justify-between items-center z-20 text-[#0B0D10]/60 font-sans text-[10px] uppercase tracking-[0.2em] gap-4 bg-[#F5F1EA]/80 backdrop-blur-sm">
          <div className="flex gap-8">
            <span className="font-bold text-[#0B0D10]">Batam, Indonesia</span>
            <a href={PHONE_TEL} className="hover:text-[#0B0D10] transition-colors">
              {PHONE_DISPLAY}
            </a>
          </div>
          <div className="text-center font-headline tracking-[0.1em] text-[#7A3A2E] text-xs">
            © SASALLE RESORTS • ARCHITECTURAL STILLNESS
          </div>
          <div className="flex gap-8 items-center">
            <span>Instagram</span>
            <span>Journal</span>
            <div className="flex gap-2 items-center">
              <div className="w-2 h-2 rounded-full bg-[#7A3A2E] animate-pulse" />
              <span className="text-[#0B0D10] font-bold">Status: Open</span>
            </div>
          </div>
        </footer>
      )}
    </div>
  );
}
