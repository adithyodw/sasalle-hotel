/** Concierge & distribution — update with live URLs when available */
export const WHATSAPP_NUMBER = '628778456000';

export const SOCIAL_LINKS = {
  instagram: 'https://instagram.com/sasallehotel',
  tiktok: 'https://tiktok.com/@sasallehotel',
  facebook: 'https://facebook.com/sasallehotel',
  whatsapp: `https://wa.me/${WHATSAPP_NUMBER}`,
} as const;

export const OTA_PARTNERS = [
  { id: 'booking', name: 'Booking.com', url: 'https://www.booking.com/hotel/id/sasalle-batam.html' },
  { id: 'agoda', name: 'Agoda', url: 'https://www.agoda.com/sasalle-hotel' },
  { id: 'traveloka', name: 'Traveloka', url: 'https://www.traveloka.com/en-id/hotel/indonesia/sasalle-hotel' },
  { id: 'tiket', name: 'Tiket.com', url: 'https://www.tiket.com/hotel/indonesia/sasalle-hotel' },
  { id: 'trip', name: 'Trip.com', url: 'https://www.trip.com/hotels/sasalle-hotel' },
] as const;

export function buildWhatsAppBookingUrl(opts?: {
  checkIn?: string;
  checkOut?: string;
  roomName?: string;
  guests?: number;
}) {
  const lines = [
    'Good day, Sasalle Concierge.',
    'I would like to arrange a private stay at SASALLE Hotel, Batam.',
    '',
    opts?.checkIn ? `Arrival: ${opts.checkIn}` : 'Arrival: [please advise]',
    opts?.checkOut ? `Departure: ${opts.checkOut}` : 'Departure: [please advise]',
    opts?.roomName ? `Suite: ${opts.roomName}` : 'Suite preference: [please advise]',
    opts?.guests ? `Guests: ${opts.guests}` : 'Guests: [please advise]',
    '',
    'Kindly assist with availability and preferred rates.',
  ];
  const text = encodeURIComponent(lines.join('\n'));
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`;
}
