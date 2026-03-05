import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBookingStore } from '../store/bookingStore';
import { useBookingAPI } from '../hooks/useBookingAPI';
import { formatPrice } from '../utils/accessibility';
import { CheckCircle, Download, Copy, Loader } from 'lucide-react';

const BookingConfirmation = () => {
  const navigate = useNavigate();
  const booking = useBookingStore();
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleCopyTicketId = () => {
    if (booking.ticketId) {
      navigator.clipboard.writeText(booking.ticketId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (!booking.date) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-24 text-center">
        <p className="text-2xl text-gray-700 mb-8">We couldn't find any recent booking.</p>
        <button
          onClick={() => navigate('/booking')}
          className="bg-blue-600 text-white px-8 py-4 rounded-lg font-bold hover:bg-blue-700 transition shadow-lg"
        >
          Start a New Booking
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-12 border-4 border-blue-600 text-center mb-12 shadow-2xl">
        <CheckCircle size={72} className="text-blue-600 mx-auto mb-6" />
        <h1 className="text-5xl font-extrabold text-blue-900 mb-4">You're All Set!</h1>
        <p className="text-xl text-blue-700 mb-6">
          Thank you for booking with AquaPark. We've sent the confirmation to your email.
        </p>
        <div className="space-y-3">
          <div className="text-sm text-blue-500 uppercase tracking-wider">Booking Confirmation ID</div>
          <div className="text-4xl font-bold text-blue-800">{booking.bookingId || 'PROCESSING'}</div>
        </div>
      </div>

      {/* Ticket Information */}
      {booking.ticketId && (
        <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg p-6 border-2 border-purple-200 mb-8">
          <div className="flex items-start justify-between">
            <div>
              <div className="text-sm font-semibold text-purple-700 mb-1">Your Ticket ID</div>
              <div className="text-xl font-bold text-park-dark font-mono">{booking.ticketId}</div>
              <p className="text-xs text-muted mt-2">Keep this ID safe. You'll need it for check-in.</p>
            </div>
            <button
              onClick={handleCopyTicketId}
              className="p-2 bg-white rounded-lg hover:bg-purple-50 transition"
              title="Copy ticket ID"
            >
              <Copy size={20} className={copied ? 'text-success' : 'text-purple-700'} />
            </button>
          </div>
        </div>
      )}

      {/* Booking & Guest Details */}
      <div className="bg-white rounded-2xl shadow-2xl p-10 mb-12 border-t-8 border-blue-600">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-blue-700 mb-4">Visit Info</h3>
            <ul className="space-y-3 text-blue-900">
              <li><strong>Date:</strong> {booking.date}</li>
              <li><strong>Guests:</strong> {booking.partySize} {booking.partySize === 1 ? 'Person' : 'People'}</li>
              <li><strong>Ticket:</strong> {booking.ticketType}</li>
              {booking.addOns.length > 0 && <li><strong>Add-ons:</strong> {booking.addOns.length} selected</li>}
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-green-700 mb-4">Guest Info</h3>
            <ul className="space-y-3 text-green-900">
              <li><strong>Name:</strong> {booking.firstName} {booking.lastName}</li>
              <li><strong>Email:</strong> {booking.email}</li>
              <li><strong>Phone:</strong> {booking.phone}</li>
            </ul>
          </div>
        </div>

        {/* Total */}
        <div className="mt-8 bg-yellow-100 p-6 rounded-lg text-center">
          <div className="text-xl text-blue-900 font-bold">Total Amount</div>
          <div className="text-4xl text-blue-900 font-extrabold">{formatPrice(booking.total)}</div>
        </div>
      </div>

      {/* Next Steps */}
      <div className="bg-gradient-to-r from-blue-100 to-blue-50 rounded-lg p-10 mb-12">
        <h2 className="text-2xl font-bold text-park-dark mb-4">What's Next?</h2>
        <ol className="space-y-3 list-decimal list-inside text-muted">
          <li>Check your email for confirmation and booking details</li>
          <li>Arrive 15 minutes early for check-in</li>
          <li>Bring your ID and booking confirmation</li>
          <li>Enjoy your day at WaterPark!</li>
        </ol>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col md:flex-row gap-4 justify-center">
        <button
          onClick={() => window.print()}
          className="flex items-center justify-center space-x-2 bg-blue-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-blue-700 transition shadow-lg"
        >
          <Download size={20} />
          <span>Download Receipt</span>
        </button>
        <button
          onClick={() => navigate('/')}
          className="px-8 py-3 border-2 border-blue-600 text-blue-600 rounded-lg font-bold hover:bg-blue-50 transition"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default BookingConfirmation;
