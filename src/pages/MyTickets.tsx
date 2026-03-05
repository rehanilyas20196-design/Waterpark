import { useState, useEffect } from 'react';
import { useBookingAPI } from '../hooks/useBookingAPI';
import { formatPrice } from '../utils/accessibility';
import { Search, Loader, AlertCircle, Download, XCircle, Lock, Ticket } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import { Link } from 'react-router-dom';

const MyTickets = () => {
  const { isAuthenticated, user } = useAuthStore();
  const [email, setEmail] = useState('');
  const [hasSearched, setHasSearched] = useState(false);
  const { searchBookings, cancelBooking, loading, error } = useBookingAPI();
  const [bookings, setBookings] = useState<any[]>([]);

  useEffect(() => {
    window.scrollTo(0, 0);
    // If authenticated, automatically load tickets for the user
    if (isAuthenticated && user?.email) {
      setEmail(user.email);
      handleInitialFetch(user.email);
    }
  }, [isAuthenticated, user]);

  const handleInitialFetch = async (userEmail: string) => {
    const results = await searchBookings(userEmail);
    setBookings(results || []);
    setHasSearched(true);
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      alert('Please enter an email address');
      return;
    }

    const results = await searchBookings(email);
    setBookings(results || []);
    setHasSearched(true);
  };

  const downloadTicket = (booking: any) => {
    const ticketContent = `
╔════════════════════════════════════════════════════════════╗
║                    WATERPARK TICKET                        ║
╚════════════════════════════════════════════════════════════╝

BOOKING CONFIRMATION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Booking ID: ${booking.id}
Ticket ID:  ${booking.ticketId}
Email:      ${booking.email}

GUEST INFORMATION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Name:       ${booking.firstName} ${booking.lastName}
Phone:      ${booking.phone}

VISIT DETAILS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Date:       ${new Date(booking.visitDate).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })}
Party Size: ${booking.partySize} ${booking.partySize === 1 ? 'person' : 'people'}
Ticket Type: ${booking.ticketType}
${booking.addOns.length > 0 ? `Add-ons:    ${booking.addOns.length} items included` : ''}

TOTAL AMOUNT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
${formatPrice(booking.total)}

IMPORTANT NOTES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• Keep your Ticket ID safe for check-in
• Arrive 15 minutes early
• Bring valid ID with you
• Refunds available up to 24 hours before visit
• Status: ${booking.status.toUpperCase()}

Generated: ${new Date().toLocaleString()}
════════════════════════════════════════════════════════════
    `;

    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(ticketContent));
    element.setAttribute('download', `WaterPark-Ticket-${booking.ticketId}.txt`);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handleCancel = async (bookingId: string) => {
    if (window.confirm('Are you sure you want to cancel this booking? This action cannot be undone.')) {
      const result = await cancelBooking(bookingId);
      if (result && result.success) {
        alert('Booking cancelled successfully.');
        // Refresh the bookings list
        const results = await searchBookings(email);
        setBookings(results || []);
      } else {
        alert('Failed to cancel booking: ' + error);
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-park-dark text-center mb-4">My Tickets</h1>
      <p className="text-lg text-muted text-center max-w-2xl mx-auto mb-12">
        Search for your bookings and tickets using the email address associated with your reservation.
      </p>

      {/* Guest/Unauthorized view */}
      {!isAuthenticated && (
        <div className="bg-white rounded-2xl shadow-xl p-10 text-center animate-scaleIn border-2 border-primary/10">
          <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6 text-primary">
            <Lock size={40} />
          </div>
          <h2 className="text-2xl font-bold text-park-dark mb-4">Login Required</h2>
          <p className="text-muted mb-8 max-w-md mx-auto">
            To view your tickets and manage your bookings, please log in to your account.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/login"
              className="px-8 py-3 bg-primary text-white rounded-lg font-bold hover:bg-blue-700 transition"
            >
              Login Now
            </Link>
            <Link
              to="/signup"
              className="px-8 py-3 border-2 border-primary text-primary rounded-lg font-bold hover:bg-blue-50 transition"
            >
              Create Account
            </Link>
          </div>
        </div>
      )}

      {/* Authenticated View */}
      {isAuthenticated && (
        <>
          {/* Search Form (Only if for some reason email isn't set or they want to re-search) */}
          <form onSubmit={handleSearch} className="bg-white rounded-lg shadow-lg p-8 mb-12 border-l-4 border-primary">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <label className="block text-xs font-bold text-muted uppercase mb-2 tracking-wider">Search Email</label>
                <input
                  type="email"
                  value={email}
                  disabled={true} // Lock it to their own email
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg bg-gray-50 text-muted cursor-not-allowed"
                />
              </div>
              <div className="flex items-end">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full md:w-auto px-8 py-3 bg-primary text-white rounded-lg font-bold hover:bg-blue-700 transition disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {loading ? <Loader size={20} className="animate-spin" /> : <Search size={20} />}
                  Refresh Tickets
                </button>
              </div>
            </div>
            <p className="mt-4 text-xs text-muted flex items-center gap-2 italic">
              <Lock size={12} />
              Searching is restricted to your account email: <strong>{user?.email}</strong>
            </p>
          </form>

          {/* Error Message */}
          {error && hasSearched && (
            <div className="bg-red-50 border-2 border-error rounded-lg p-6 mb-8 flex items-start gap-4">
              <AlertCircle size={24} className="text-error flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-bold text-error mb-1">No Bookings Found</h3>
                <p className="text-error text-sm">{error}</p>
              </div>
            </div>
          )}

          {/* Bookings List */}
          {hasSearched && !error && bookings.length > 0 && (
            <div className="space-y-6">
              <div className="text-sm text-muted font-semibold">
                Found {bookings.length} {bookings.length === 1 ? 'booking' : 'bookings'}
              </div>

              {bookings.map((booking) => (
                <div key={booking.id} className="bg-white rounded-lg shadow-lg p-8">
                  {/* Header */}
                  <div className="flex justify-between items-start mb-6 pb-6 border-b">
                    <div>
                      <div className="text-sm text-muted font-semibold mb-1">Booking ID</div>
                      <div className="text-2xl font-bold text-park-dark">{booking.id}</div>
                    </div>
                    <div className="flex gap-3">
                      <span className={`px-4 py-2 rounded-lg font-bold text-sm ${booking.status === 'confirmed'
                        ? 'bg-green-100 text-success'
                        : 'bg-yellow-100 text-yellow-700'
                        }`}>
                        {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                      </span>
                    </div>
                  </div>

                  {/* Ticket ID */}
                  <div className="bg-purple-50 p-4 rounded-lg mb-6">
                    <div className="text-sm text-muted font-semibold mb-1">Ticket ID</div>
                    <div className="font-mono font-bold text-lg text-park-dark">{booking.ticketId}</div>
                  </div>

                  {/* Details Grid */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
                    <div>
                      <div className="text-xs text-muted font-semibold uppercase mb-1">Visit Date</div>
                      <div className="font-bold text-park-dark">
                        {new Date(booking.visitDate).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-muted font-semibold uppercase mb-1">Party Size</div>
                      <div className="font-bold text-park-dark">{booking.partySize} {booking.partySize === 1 ? 'Person' : 'People'}</div>
                    </div>
                    <div>
                      <div className="text-xs text-muted font-semibold uppercase mb-1">Ticket Type</div>
                      <div className="font-bold text-park-dark capitalize">{booking.ticketType}</div>
                    </div>
                    <div>
                      <div className="text-xs text-muted font-semibold uppercase mb-1">Total Amount</div>
                      <div className="font-bold text-secondary text-lg">{formatPrice(booking.total)}</div>
                    </div>
                  </div>

                  {/* Add-ons */}
                  {booking.addOns.length > 0 && (
                    <div className="mb-6">
                      <div className="text-sm font-semibold text-muted mb-2">Add-ons ({booking.addOns.length} items)</div>
                      <div className="flex flex-wrap gap-2">
                        {booking.addOns.map((addon: string) => (
                          <span key={addon} className="bg-blue-100 text-primary px-3 py-1 rounded text-sm font-medium">
                            {addon}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Guest Info */}
                  <div className="border-t pt-6 mb-6">
                    <div className="text-sm font-semibold text-muted mb-3">Guest Information</div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="text-xs text-muted">Name</div>
                        <div className="font-bold text-park-dark">{booking.firstName} {booking.lastName}</div>
                      </div>
                      <div>
                        <div className="text-xs text-muted">Email</div>
                        <div className="font-bold text-park-dark">{booking.email}</div>
                      </div>
                      <div>
                        <div className="text-xs text-muted">Phone</div>
                        <div className="font-bold text-park-dark">{booking.phone}</div>
                      </div>
                      <div>
                        <div className="text-xs text-muted">Booking Date</div>
                        <div className="font-bold text-park-dark">
                          {new Date(booking.date).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric'
                          })}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-4">
                    <button
                      onClick={() => downloadTicket(booking)}
                      className="flex-1 flex items-center justify-center gap-2 bg-primary text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-700 transition"
                      disabled={booking.status === 'cancelled'}
                    >
                      <Download size={20} />
                      Download Ticket
                    </button>
                    <button
                      onClick={() => window.print()}
                      className="flex-1 px-6 py-3 border-2 border-primary text-primary rounded-lg font-bold hover:bg-blue-50 transition"
                    >
                      Print
                    </button>
                    {booking.status === 'confirmed' && (
                      <button
                        onClick={() => handleCancel(booking.id)}
                        className="flex-1 flex items-center justify-center gap-2 border-2 border-red-500 text-red-500 px-6 py-3 rounded-lg font-bold hover:bg-red-50 transition"
                      >
                        <XCircle size={20} />
                        Cancel Booking
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Empty State */}
          {isAuthenticated && hasSearched && !error && bookings.length === 0 && !loading && (
            <div className="bg-blue-50 rounded-lg p-12 text-center border-2 border-dashed border-blue-200">
              <div className="text-blue-400 mb-4 flex justify-center">
                <Ticket size={48} className="opacity-50" />
              </div>
              <p className="text-xl font-bold text-park-dark">No bookings found</p>
              <p className="text-muted mt-2 max-w-sm mx-auto">
                You haven't made any bookings yet. Ready to dive into some fun?
              </p>
              <Link
                to="/booking"
                className="inline-block mt-6 px-8 py-3 bg-primary text-white rounded-lg font-bold hover:bg-blue-700 transition"
              >
                Book Your First Trip
              </Link>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default MyTickets;
