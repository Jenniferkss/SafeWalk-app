export type ScreenType =
  | 'login'
  | 'permissions'
  | 'home'
  | 'active-route'
  | 'motion-alert'
  | 'emergency-help'
  | 'route-summary'
  | 'history'
  | 'route-detail'
  | 'contacts'
  | 'gps-unavailable';

export interface Contact {
  id: string;
  name: string;
  relationship: string;
  phone: string;
  receivesSms: boolean;
  receivesWhatsapp: boolean;
  active: boolean;
  initials: string;
  colorBg: string;
  colorText: string;
}

export interface RouteRecord {
  id: string;
  title: string;
  origin: string;
  destination: string;
  dateStr: string;
  timeRange: string;
  durationMin: number;
  distanceKm: number;
  status: 'safe' | 'warning';
  safeZoneHub?: string;
  guardiansNotified: number;
  guardianNames: string[];
}

export interface UserProfile {
  name: string;
  email: string;
  phone: string;
  batteryLevel: number;
  avatarUrl: string;
}
