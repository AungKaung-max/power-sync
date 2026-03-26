export interface Session {
    id: string;
    hubName: string;
    date: string;
    duration: string;
    kwh: number;
    cost: number;
    status: 'pending' | 'success'; // ✅ new status field
}

export const MOCK_HISTORY: Session[] = [
  { id: '1', hubName: 'GreenCharge Alpha', date: '2024-03-18', duration: '45m 12s', kwh: 12.5, cost: 3.12, status: 'success' },
  { id: '2', hubName: 'VoltStation Prime', date: '2024-03-15', duration: '1h 05m', kwh: 45.2, cost: 15.82, status: 'pending' },
  { id: '3', hubName: 'EcoCharge Hub', date: '2024-03-14', duration: '30m 40s', kwh: 8.7, cost: 2.18, status: 'success' },
  { id: 'h5', hubName: 'VoltStation Beta', date: '2024-03-12', duration: '1h 15m', kwh: 35.0, cost: 10.25, status: 'pending' },
  { id: 'h6', hubName: 'GreenCharge Beta', date: '2024-03-10', duration: '40m 50s', kwh: 14.2, cost: 3.56, status: 'success' },
  { id: 'h7', hubName: 'PowerHub Central', date: '2024-03-08', duration: '55m 20s', kwh: 22.8, cost: 5.75, status: 'pending' },
  { id: 'h8', hubName: 'EcoCharge Plus', date: '2024-03-07', duration: '1h 05m', kwh: 30.4, cost: 8.12, status: 'success' },
  { id: 'h9', hubName: 'SolarStation Prime', date: '2024-03-05', duration: '35m 45s', kwh: 10.9, cost: 2.80, status: 'pending' },
  { id: 'h10', hubName: 'VoltStation Gamma', date: '2024-03-02', duration: '1h 10m', kwh: 38.6, cost: 11.30, status: 'success' },
];

export interface Hub {
  id: string;
  name: string;
  distance: string;
  power: string;
  price: string;
  address: string;
  wifi: boolean;
  fees: string;
  lat: number;
  lng: number;
}


export const MOCK_HUBS: Hub[] = [
  {
    id: '1',
    name: 'GreenCharge Alpha',
    distance: '0.8 km',
    power: '50 kW',
    price: '$0.25/kWh',
    address: '123 Eco St, Green Valley',
    wifi: true,
    fees: 'No parking fees',
    lat: 16.8409,
    lng: 96.1735,
  },
  {
    id: '2',
    name: 'VoltStation Prime',
    distance: '1.2 km',
    power: '150 kW',
    price: '$0.35/kWh',
    address: '456 Electric Ave, Spark City',
    wifi: true,
    fees: '$2/hr parking',
    lat: 16.8660,
    lng: 96.1951,
  },
  {
    id: '3',
    name: 'EcoHub Central',
    distance: '2.5 km',
    power: '22 kW',
    price: '$0.15/kWh',
    address: '789 Nature Blvd, Leafy Suburb',
    wifi: false,
    fees: 'Free parking',
    lat: 16.8256,
    lng: 96.1457,
  },
  {
    id: '4',
    name: 'PowerPoint Express',
    distance: '3.1 km',
    power: '100 kW',
    price: '$0.30/kWh',
    address: '101 Speed Way, Fast Track',
    wifi: true,
    fees: 'No parking fees',
    lat: 16.8512,
    lng: 96.1284,
  },
];