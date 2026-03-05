export interface TicketType {
  id: string;
  name: string;
  price: number;
  duration: string;
  description: string;
}

export interface AddOn {
  id: string;
  name: string;
  price: number;
  description: string;
  icon: string;
}

export const TICKET_TYPES: TicketType[] = [
  {
    id: 'day-pass',
    name: 'Day Pass',
    price: 45,
    duration: 'Full day access',
    description: 'Complete access to all attractions during operating hours',
  },
  {
    id: 'evening-pass',
    name: 'Evening Pass',
    price: 30,
    duration: '4 PM onwards',
    description: 'Access from 4 PM until park closure',
  },
  {
    id: 'annual-pass',
    name: 'Annual Pass',
    price: 199,
    duration: '12 months',
    description: 'Unlimited visits for one full year',
  },
];

export const ADD_ONS: AddOn[] = [
  {
    id: 'locker',
    name: 'Locker Rental',
    price: 10,
    description: 'Secure locker for your belongings',
    icon: '🔒',
  },
  {
    id: 'food-voucher',
    name: 'Food Voucher',
    price: 25,
    description: 'Rs. 25 food & beverage credit',
    icon: '🍔',
  },
  {
    id: 'photo-package',
    name: 'Photo Package',
    price: 15,
    description: 'Professional photos + digital copies',
    icon: '📸',
  },
  {
    id: 'vip-lounge',
    name: 'VIP Lounge Access',
    price: 35,
    description: 'Private lounge with seating & amenities',
    icon: '👑',
  },
];
