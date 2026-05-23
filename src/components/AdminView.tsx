import { Booking, HousekeepingRequest, InRoomDiningOrder, ActivityLog } from '../types';
import { Shield, Sparkles, TrendingUp, Users, Coffee, Truck, Server, Layers } from 'lucide-react';

interface AdminViewProps {
  bookings: Booking[];
  housekeeping: HousekeepingRequest[];
  diningOrders: InRoomDiningOrder[];
  logs: ActivityLog[];
  onToggleHousekeeping: (id: string) => void;
  onToggleDining: (id: string) => void;
  onCancelBooking: (id: string) => void;
}

export default function AdminView({
  bookings,
  housekeeping,
  diningOrders,
  logs,
  onToggleHousekeeping,
  onToggleDining,
  onCancelBooking
}: AdminViewProps) {
  // Analytical estimates
  const activeBookingsCount = bookings.filter(b => b.status === 'confirmed').length;
  const totalRevenue = bookings
    .filter(b => b.status === 'confirmed')
    .reduce((acc, curr) => acc + curr.totalAmount, 0);

  return (
    <div className="bg-[#F5F1EA] text-[#0B0D10] p-6 min-h-screen">
      {/* Title block */}
      <div className="border-b border-[#0B0D10]/10 pb-4 mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 select-none">
        <div>
          <div className="flex items-center gap-2">
            <Shield className="text-[#7A3A2E]" size={18} />
            <span className="font-mono text-[9px] tracking-[0.2em] font-bold text-[#7A3A2E] uppercase">
              BOH OPERATIONS BACKSTAGE Portal
            </span>
          </div>
          <h2 className="font-headline text-3xl text-[#0B0D10] font-light mt-1">
            Sasalle Hospitality Ledger
          </h2>
        </div>
        
        {/* Connection status badges */}
        <div className="flex gap-2">
          <span className="text-[9px] font-mono bg-[#466557]/5 text-[#466557] border border-[#466557]/15 px-2.5 py-1 uppercase font-bold">
            ● PMS SYSTEM: SYNCHRONIZED
          </span>
          <span className="text-[9px] font-mono bg-[#B89B5E]/5 text-[#B89B5E] border border-[#B89B5E]/15 px-2.5 py-1 uppercase font-bold">
            GEMINI AI: ON-CALL
          </span>
        </div>
      </div>

      {/* Analytics Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 select-none">
        {/* KPI 1 */}
        <div className="bg-white p-5 border border-[#0B0D10]/10 relative shadow-sm">
          <span className="text-[10px] font-mono text-[#0B0D10]/50 uppercase tracking-widest block mb-2 font-bold">
            ACTIVE REGISTRY INDEX
          </span>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-headline font-light text-[#0B0D10]">
              {activeBookingsCount}
            </span>
            <span className="text-xs text-[#466557] font-bold">Confirmed Stays</span>
          </div>
          <p className="text-[11px] text-[#0B0D10]/60 mt-3 border-t pt-2 border-stone-100">
            Real-time synchronization against Batam Port passenger registers.
          </p>
        </div>

        {/* KPI 2 */}
        <div className="bg-white p-5 border border-[#0B0D10]/10 relative shadow-sm">
          <span className="text-[10px] font-mono text-[#0B0D10]/50 uppercase tracking-widest block mb-2 font-bold">
            GROSS LEDGER REVENUE
          </span>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-headline font-light text-[#0B0D10]">
              ${totalRevenue.toLocaleString()}
            </span>
            <span className="text-xs text-[#0B0D10]/60 font-mono">USD</span>
          </div>
          <p className="text-[11px] text-[#0B0D10]/60 mt-3 border-t pt-2 border-stone-100">
            Including 21% Indonesian legal government taxes & resort fees.
          </p>
        </div>

        {/* KPI 3 (Beautiful SVG Donut Chart for occupancy source attribution) */}
        <div className="bg-white p-5 border border-[#0B0D10]/10 flex items-center gap-4 shadow-sm">
          <div className="w-16 h-16 flex-shrink-0">
            <svg viewBox="0 0 36 36" className="w-full h-full">
              <circle cx="18" cy="18" r="15.915" fill="none" stroke="#F5F1EA" strokeWidth="4" />
              <circle cx="18" cy="18" r="15.915" fill="none" stroke="#7A3A2E" strokeWidth="4" strokeDasharray="45 55" strokeDashoffset="100" />
              <circle cx="18" cy="18" r="15.915" fill="none" stroke="#0B0D10" strokeWidth="4" strokeDasharray="30 70" strokeDashoffset="55" />
              <circle cx="18" cy="18" r="15.915" fill="none" stroke="#B89B5E" strokeWidth="4" strokeDasharray="25 75" strokeDashoffset="25" />
            </svg>
          </div>
          <div className="flex-1 text-[11px] font-mono leading-tight space-y-1">
            <span className="text-[9px] text-stone-500 block uppercase font-sans mb-1 select-none font-bold">REVENUE ATTRIBUTION</span>
            <div className="flex justify-between">
              <span className="text-[#7A3A2E] font-bold">● Heritage (45%)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#0B0D10] font-bold">● Obsidian (30%)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#B89B5E] font-bold">● Ivory Pav. (25%)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Operations Split */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Column 1 & 2: Reservations & Live CRM Database */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-6 border border-[#0B0D10]/10 shadow-sm">
            <h3 className="font-sans text-base text-[#0B0D10] mb-4 font-bold border-b pb-2 flex justify-between items-center select-none">
              <span className="font-headline text-lg font-light">Guest CRM registry database</span>
              <span className="font-mono text-[9px] text-[#0B0D10]/40 font-normal">SECURE HTTPS PROTOCOL ACTIVE</span>
            </h3>

            {bookings.length === 0 ? (
              <p className="text-stone-400 text-xs italic py-4 text-center">
                No bookings lodged against current storage layer.
              </p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left font-mono text-xs">
                  <thead>
                    <tr className="border-b border-stone-100 text-stone-400">
                      <th className="py-2.5">RSV ID</th>
                      <th className="py-2.5">SANCTUARY</th>
                      <th className="py-2.5">PERIOD</th>
                      <th className="py-2.5">CLIMATE</th>
                      <th className="py-2.5 text-right">LEDGER</th>
                      <th className="py-2.5 text-right">RECOVERY</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100">
                    {bookings.map((booking) => (
                      <tr key={booking.id} className="hover:bg-[#F5F1EA]/60 transition-colors">
                        <td className="py-3.5 font-bold text-[#7A3A2E]">{booking.id}</td>
                        <td className="py-3.5 font-sans font-bold text-stone-800">
                          {booking.roomName}
                          {booking.packageName && (
                            <span className="block font-mono text-[9px] text-[#7A3A2E] font-black uppercase">
                              + Package: {booking.packageName}
                            </span>
                          )}
                        </td>
                        <td className="py-3.5 text-stone-600">
                          {booking.checkIn} — {booking.checkOut}
                          <span className="block text-[10px] text-stone-400 font-bold">
                            {booking.guests} Guests • Priority transfer: {booking.preferences.airportTransfer.enabled ? 'YES' : 'NO'}
                          </span>
                        </td>
                        <td className="py-3.5">
                          <span className="bg-[#B89B5E]/10 text-[#0B0D10] px-1.5 py-0.5 border border-[#B89B5E]/10 font-bold">
                            {booking.preferences.roomTemp}°C
                          </span>
                        </td>
                        <td className="py-3.5 text-right font-bold text-[#0B0D10]">
                          ${booking.totalAmount.toLocaleString()}
                        </td>
                        <td className="py-3.5 text-right">
                          <button
                            id={`btn-cancel-${booking.id}`}
                            onClick={() => onCancelBooking(booking.id)}
                            className="bg-red-50 text-red-600 border border-red-200/50 px-2.5 py-1 text-[9px] font-mono hover:bg-red-100"
                          >
                            VOID
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Activity Logs Telemetry */}
          <div className="bg-white p-6 border border-[#0B0D10]/10 shadow-sm select-none">
            <h3 className="font-headline text-lg text-[#0B0D10] font-light mb-4 border-b pb-2">
              Operation Transaction Logs
            </h3>
            <div className="space-y-3 font-mono text-[11px] max-h-48 overflow-y-auto">
              {logs.map((log) => (
                <div key={log.id} className="flex gap-3 justify-between items-start border-b border-stone-100 pb-2">
                  <div className="flex gap-2 items-center">
                    <span className={`px-1.5 py-0.5 text-[8px] font-black uppercase ${
                      log.type === 'booking' ? 'bg-orange-100 text-orange-800' :
                      log.type === 'checkin' ? 'bg-green-100 text-green-800' :
                      log.type === 'dining' ? 'bg-indigo-100 text-indigo-800' : 'bg-stone-100 text-stone-800'
                    }`}>
                      {log.type}
                    </span>
                    <span className="text-stone-800">{log.description}</span>
                  </div>
                  <span className="text-stone-400 text-[10px] whitespace-nowrap">{log.timestamp}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Column 3: Live Service Actions (Housekeeping and Dining) */}
        <div className="space-y-6">
          {/* Housekeeping list widget */}
          <div className="bg-white p-5 border border-[#0B0D10]/10 shadow-sm">
            <h3 className="font-sans text-base text-[#0B0D10] mb-3 font-bold flex justify-between items-center select-none">
              <span className="font-headline font-light text-md text-[#0B0D10]">Housekeeping Requests</span>
              <span className="font-mono text-[9px] bg-[#B89B5E]/10 text-[#7A3A2E] px-2 py-0.5 font-bold uppercase">
                {housekeeping.filter(h => h.status === 'requested').length} active
              </span>
            </h3>

            {housekeeping.length === 0 ? (
              <p className="text-stone-400 text-xs italic py-4 text-center select-none">
                No immediate housecleaning actions dispatched.
              </p>
            ) : (
              <div className="space-y-3">
                {housekeeping.map((req) => (
                  <div
                    key={req.id}
                    className="p-3 bg-[#F5F1EA]/40 border border-[#0B0D10]/5 text-xs flex justify-between items-center transition-all hover:bg-[#F5F1EA]/80"
                  >
                    <div>
                      <div className="font-mono font-bold text-[#0B0D10] uppercase">
                        {req.type}
                      </div>
                      <span className="text-stone-400 font-mono text-[9px]">
                        Dispatched at {req.time}
                      </span>
                    </div>

                    <button
                      id={`btn-complete-hk-${req.id}`}
                      onClick={() => onToggleHousekeeping(req.id)}
                      className={`font-mono text-[9px] font-bold px-2 py-1.5 border transition-all ${
                        req.status === 'completed'
                          ? 'bg-[#466557]/10 text-[#466557] border-[#466557]'
                          : 'bg-[#0B0D10] text-white border-[#0B0D10] hover:bg-[#7A3A2E]'
                      }`}
                    >
                      {req.status === 'completed' ? 'COMPLETED' : 'RESOLVE'}
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Dining orders live dashboard list */}
          <div className="bg-white p-5 border border-[#0B0D10]/10 shadow-sm">
            <h3 className="font-sans text-base text-[#0B0D10] mb-3 font-bold flex justify-between items-center select-none">
              <span className="font-headline font-light text-md text-[#0B0D10]">Kitchen Order Board</span>
              <span className="font-mono text-[9px] bg-[#B89B5E]/10 text-[#7A3A2E] px-2 py-0.5 font-bold uppercase">
                {diningOrders.filter(d => d.status === 'ordered').length} active
              </span>
            </h3>

            {diningOrders.length === 0 ? (
              <p className="text-stone-400 text-xs italic py-4 text-center select-none">
                No orders active on kitchen fires currently.
              </p>
            ) : (
              <div className="space-y-3">
                {diningOrders.map((order) => (
                  <div
                    key={order.id}
                    className="p-3 bg-[#F5F1EA]/40 border border-[#0B0D10]/5 text-xs flex justify-between items-center transition-all hover:bg-[#F5F1EA]/80"
                  >
                    <div>
                      <div className="font-bold text-[#0B0D10]">
                        {order.items.map(i => `${i.quantity}x ${i.item}`).join(', ')}
                      </div>
                      <span className="text-stone-400 font-mono text-[9px] block">
                        Order Id: {order.id} • {order.time}
                      </span>
                    </div>

                    <button
                      id={`btn-complete-dining-${order.id}`}
                      onClick={() => onToggleDining(order.id)}
                      className={`font-mono text-[9px] font-bold px-2 py-1.5 border transition-all ${
                        order.status === 'delivered'
                          ? 'bg-[#466557]/10 text-[#466557] border-[#466557]'
                          : 'bg-[#0B0D10] text-white border-[#0B0D10] hover:bg-[#7A3A2E]'
                      }`}
                    >
                      {order.status === 'delivered' ? 'SERVED' : 'DELIVER'}
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
