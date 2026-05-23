/**
 * SASALLE HOTEL - Type Definitions
 * SPDX-License-Identifier: Apache-2.0
 */

export type Language = 'en' | 'id' | 'zh';

export type ActiveTab = 'home' | 'rooms' | 'key' | 'concierge' | 'admin';

export type ViewMode = 'desktop' | 'mobile';

export interface Room {
  id: string;
  name: string;
  collection: string;
  price: number;
  image: string;
  description: string;
  size: string;
  bed: string;
  occupancy: number;
  highlight: string;
  details: string[];
}

export interface BookingPreference {
  pillowType: 'feather' | 'memory' | 'buckwheat' | 'none';
  roomTemp: number; // in Celsius
  dietaryNotes: string;
  preArrivalPantry: string[];
  airportTransfer: {
    enabled: boolean;
    flightNumber: string;
    arrivalTime: string;
    vehiclePref: 'velfire' | 's-class' | 'eqs';
  };
}

export interface Booking {
  id: string;
  roomId: string;
  roomName: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  totalAmount: number;
  packageName?: string;
  promoCode?: string;
  status: 'pending' | 'confirmed' | 'active' | 'completed' | 'cancelled';
  preferences: BookingPreference;
}

export interface InRoomDiningOrder {
  id: string;
  items: { item: string; price: number; quantity: number }[];
  status: 'ordered' | 'preparing' | 'delivered';
  time: string;
}

export interface HousekeepingRequest {
  id: string;
  type: 'turndown' | 'full' | 'towels' | 'pillow';
  status: 'requested' | 'completed';
  time: string;
}

export interface ChatMessage {
  id: string;
  sender: 'guest' | 'ai' | 'concierge';
  text: string;
  timestamp: string;
}

export interface ActivityLog {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  type: 'booking' | 'checkin' | 'key' | 'dining' | 'preference';
}
