import { useState } from 'react';

interface BookingData {
  date: string;
  partySize: number;
  ticketType: string;
  addOns: string[];
  total: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  paymentToken?: string;
}

interface BookingResponse {
  success: boolean;
  message: string;
  booking: any;
  ticket: {
    id: string;
    bookingId: string;
  };
}

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const useBookingAPI = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submitBooking = async (bookingData: BookingData): Promise<BookingResponse | null> => {
    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem('waterpark-token');
      const response = await fetch(`${API_URL}/bookings`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token ? `Bearer ${token}` : '',
        },
        body: JSON.stringify(bookingData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to create booking');
      }

      setLoading(false);
      return data;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      setError(errorMessage);
      setLoading(false);
      return null;
    }
  };

  const getTicket = async (ticketId: string) => {
    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem('waterpark-token');
      const response = await fetch(`${API_URL}/tickets/${ticketId}`, {
        headers: {
          'Authorization': token ? `Bearer ${token}` : '',
        }
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch ticket');
      }

      setLoading(false);
      return data.ticket;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      setError(errorMessage);
      setLoading(false);
      return null;
    }
  };

  const getBooking = async (bookingId: string) => {
    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem('waterpark-token');
      const response = await fetch(`${API_URL}/bookings/${bookingId}`, {
        headers: {
          'Authorization': token ? `Bearer ${token}` : '',
        }
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch booking');
      }

      setLoading(false);
      return data.booking;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      setError(errorMessage);
      setLoading(false);
      return null;
    }
  };

  const searchBookings = async (email: string) => {
    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem('waterpark-token');
      const response = await fetch(`${API_URL}/bookings/search/${email}`, {
        headers: {
          'Authorization': token ? `Bearer ${token}` : '',
        }
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to search bookings');
      }

      setLoading(false);
      return data.bookings;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      setError(errorMessage);
      setLoading(false);
      return null;
    }
  };

  const cancelBooking = async (bookingId: string) => {
    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem('waterpark-token');
      const response = await fetch(`${API_URL}/bookings/${bookingId}/cancel`, {
        method: 'POST',
        headers: {
          'Authorization': token ? `Bearer ${token}` : '',
        }
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to cancel booking');
      }

      setLoading(false);
      return data;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      setError(errorMessage);
      setLoading(false);
      return null;
    }
  };

  return {
    loading,
    error,
    submitBooking,
    getTicket,
    getBooking,
    searchBookings,
    cancelBooking,
  };
};
