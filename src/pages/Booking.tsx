import { useEffect } from 'react';
import BookingForm from '../components/BookingForm';

const Booking = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-park-dark text-center mb-4">Book Your Visit</h1>
      <p className="text-lg text-muted text-center max-w-2xl mx-auto mb-12">
        Plan your perfect water park experience. Select your date, party size, and tickets 
        to get started with your booking.
      </p>
      <BookingForm />
    </div>
  );
};

export default Booking;
