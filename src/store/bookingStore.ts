import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface BookingState {
  // Booking form data
  date: string;
  partySize: number;
  ticketType: string;
  addOns: string[];
  
  // Guest info
  firstName: string;
  lastName: string;
  email: string;
  phone: string;

  // Backend IDs
  bookingId: string;
  ticketId: string;
  
  // Total
  total: number;
  
  // Methods
  setDate: (date: string) => void;
  setPartySize: (size: number) => void;
  setTicketType: (type: string) => void;
  toggleAddOn: (id: string) => void;
  setGuestInfo: (info: Partial<Omit<BookingState, 'setDate' | 'setPartySize' | 'setTicketType' | 'toggleAddOn' | 'setGuestInfo' | 'calculateTotal' | 'reset'>>) => void;
  calculateTotal: (ticketPrice: number, addOnPrices: number[]) => void;
  reset: () => void;
}

const initialState = {
  date: '',
  partySize: 1,
  ticketType: '',
  addOns: [],
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  bookingId: '',
  ticketId: '',
  total: 0,
};

export const useBookingStore = create<BookingState>()(
  persist(
    (set) => ({
      ...initialState,
      
      setDate: (date: string) => set({ date }),
      
      setPartySize: (partySize: number) => set({ partySize }),
      
      setTicketType: (ticketType: string) => set({ ticketType }),
      
      toggleAddOn: (id: string) => set((state) => ({
        addOns: state.addOns.includes(id)
          ? state.addOns.filter(addon => addon !== id)
          : [...state.addOns, id],
      })),
      
      setGuestInfo: (info: any) => set(info),
      
      calculateTotal: (ticketPrice: number, addOnPrices: number[]) => set((state) => ({
        total: (ticketPrice * state.partySize) + addOnPrices.reduce((a, b) => a + b, 0) * state.partySize,
      })),
      
      reset: () => set(initialState),
    }),
    {
      name: 'waterpark-booking',
    }
  )
);
