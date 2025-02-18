export interface Zone {
  name: string;
  status: 'online' | 'offline';
}

export interface Location {
  name: string;
  zones: Zone[];
}

export interface Company {
  company: string;
  locations: Location[];
} 