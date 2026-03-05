import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useBookingStore } from '../store/bookingStore';
import { useBookingAPI } from '../hooks/useBookingAPI';
import { TICKET_TYPES, ADD_ONS } from '../data/tickets';
import { formatPrice } from '../utils/accessibility';
import { Calendar, Users, AlertCircle } from 'lucide-react';

const BookingForm = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const booking = useBookingStore();
  const { error: apiError, loading } = useBookingAPI();
  const { register, formState: { errors } } = useForm();

  const selectedTicketType = TICKET_TYPES.find(t => t.id === booking.ticketType);
  const selectedAddOns = ADD_ONS.filter(a => booking.addOns.includes(a.id));

  useEffect(() => {
    if (selectedTicketType) {
      booking.calculateTotal(selectedTicketType.price, selectedAddOns.map(a => a.price));
    }
  }, [booking.ticketType, booking.addOns, booking.partySize]);

  const handleNext = () => {
    if (step < 5) setStep(step + 1);
  };

  const handlePrev = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = async () => {
    // Simply navigate to the payment page.
    // The actual submission will happen on Payment.tsx.
    navigate('/payment');
  };

  return (
    <form className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 max-w-3xl mx-auto border-t-4 border-blue-600">
      {/* Header */}
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-blue-900 mb-2">Secure Your Day</h1>
        <p className="text-gray-600 text-lg">Complete your booking in {5} easy steps</p>
      </div>

      {/* Progress Bar */}
      <div className="mb-12">
        <div className="flex items-center justify-between mb-6">
          {[1, 2, 3, 4, 5].map((s) => (
            <div key={s} className="flex flex-col items-center flex-1">
              <button
                type="button"
                onClick={() => s < step && setStep(s)}
                className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg transition mb-2 ${s <= step
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-gray-200 text-gray-600'
                  }`}
                disabled={s > step}
              >
                {s}
              </button>
              <div className={`text-xs font-semibold text-center ${s <= step ? 'text-blue-600' : 'text-gray-400'}`}>
                {['Date', 'Ticket', 'Add-ons', 'Info', 'Review'][s - 1]}
              </div>
              {s < 5 && (
                <div
                  className={`absolute left-[calc(50%+24px)] top-5 w-[calc(100%-48px)] h-1 ${s < step ? 'bg-blue-600' : 'bg-gray-200'
                    } -z-10`}
                  style={{ width: 'calc(100% - 48px)' }}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Step 1: Date & Party Size */}
      {step === 1 && (
        <div className="space-y-8">
          <div>
            <label htmlFor="date" className="block text-sm font-bold text-blue-900 mb-3 flex items-center gap-2">
              <Calendar className="text-blue-600" size={20} />
              When do you want to visit?
            </label>
            <input
              id="date"
              type="date"
              {...register('date', { required: 'Date is required' })}
              value={booking.date}
              onChange={(e) => booking.setDate(e.target.value)}
              className="w-full px-5 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-200 transition"
              aria-invalid={errors.date ? 'true' : 'false'}
            />
            {errors.date && (
              <p className="text-red-600 text-sm mt-2">{errors.date.message as string}</p>
            )}
          </div>

          <div>
            <label htmlFor="partySize" className="block text-sm font-bold text-blue-900 mb-3 flex items-center gap-2">
              <Users className="text-blue-600" size={20} />
              How many people are visiting?
            </label>
            <select
              id="partySize"
              {...register('partySize')}
              value={booking.partySize}
              onChange={(e) => booking.setPartySize(parseInt(e.target.value))}
              className="w-full px-5 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-200 transition text-lg"
            >
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((size) => (
                <option key={size} value={size}>
                  {size} {size === 1 ? 'Person' : 'People'}
                </option>
              ))}
            </select>
          </div>

          <div className="bg-blue-50 border-l-4 border-blue-600 p-4 rounded">
            <p className="text-sm text-blue-900">💡 <strong>Pro Tip:</strong> Weekdays are less crowded. Book Wednesday-Thursday for the best experience!</p>
          </div>
        </div>
      )}

      {/* Step 2: Ticket Types */}
      {step === 2 && (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-blue-900 mb-6">Choose Your Ticket Type</h2>
          {TICKET_TYPES.map((ticket) => (
            <label
              key={ticket.id}
              className="flex items-start p-6 border-2 rounded-xl cursor-pointer transition transform hover:scale-105"
              style={{
                borderColor: booking.ticketType === ticket.id ? '#1e40af' : '#e5e7eb',
                backgroundColor: booking.ticketType === ticket.id ? '#eff6ff' : 'white',
              }}
            >
              <input
                type="radio"
                name="ticketType"
                value={ticket.id}
                checked={booking.ticketType === ticket.id}
                onChange={(e) => booking.setTicketType(e.target.value)}
                className="mt-2 w-5 h-5 accent-blue-600"
              />
              <div className="ml-5 flex-1">
                <div className="flex justify-between items-start mb-2">
                  <div className="font-bold text-blue-900 text-lg">{ticket.name}</div>
                  <div className="text-2xl font-bold text-blue-600">{formatPrice(ticket.price)}</div>
                </div>
                <div className="text-sm text-gray-600 mb-2">{ticket.duration}</div>
                <div className="text-sm text-gray-700">{ticket.description}</div>
              </div>
            </label>
          ))}
        </div>
      )}

      {/* Step 3: Add-ons */}
      {step === 3 && (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-blue-900 mb-6">Enhance Your Experience</h2>
          <p className="text-gray-600">Add optional items to make your day even better</p>
          {ADD_ONS.map((addon) => (
            <label
              key={addon.id}
              className="flex items-start p-5 border-2 border-gray-300 rounded-xl cursor-pointer hover:border-blue-600 hover:bg-blue-50 transition"
            >
              <input
                type="checkbox"
                checked={booking.addOns.includes(addon.id)}
                onChange={() => booking.toggleAddOn(addon.id)}
                className="mt-1.5 w-5 h-5 accent-blue-600"
              />
              <div className="ml-5 flex-1">
                <div className="flex justify-between items-start">
                  <div className="font-bold text-blue-900 text-lg">
                    {addon.icon} {addon.name}
                  </div>
                  <div className="text-lg font-bold text-blue-600">+{formatPrice(addon.price)}</div>
                </div>
                <div className="text-sm text-gray-600 mt-1">{addon.description}</div>
              </div>
            </label>
          ))}
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
            <p className="text-sm text-yellow-900">💡 <strong>Bundle Savings:</strong> Book 3+ add-ons and get 10% off!</p>
          </div>
        </div>
      )}

      {/* Step 4: Guest Information */}
      {step === 4 && (
        <div className="space-y-8">
          <div>
            <h2 className="text-2xl font-bold text-blue-900 mb-2">Your Details</h2>
            <p className="text-gray-600 text-sm mb-6">We need this information for your confirmation and entry</p>
          </div>

          {apiError && (
            <div className="bg-red-50 border-2 border-red-500 rounded-lg p-5 flex items-start gap-3">
              <AlertCircle size={20} className="text-red-600 mt-0.5 flex-shrink-0" />
              <p className="text-red-700 font-medium">{apiError}</p>
            </div>
          )}

          <div className="grid grid-cols-2 gap-6">
            <div>
              <label htmlFor="firstName" className="block text-sm font-bold text-blue-900 mb-2">
                First Name
              </label>
              <input
                id="firstName"
                type="text"
                {...register('firstName', { required: 'First name is required' })}
                value={booking.firstName}
                onChange={(e) => booking.setGuestInfo({ firstName: e.target.value })}
                placeholder="John"
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-200 transition"
                aria-invalid={errors.firstName ? 'true' : 'false'}
              />
              {errors.firstName && (
                <p className="text-red-600 text-sm mt-1">{errors.firstName.message as string}</p>
              )}
            </div>
            <div>
              <label htmlFor="lastName" className="block text-sm font-bold text-blue-900 mb-2">
                Last Name
              </label>
              <input
                id="lastName"
                type="text"
                {...register('lastName', { required: 'Last name is required' })}
                value={booking.lastName}
                onChange={(e) => booking.setGuestInfo({ lastName: e.target.value })}
                placeholder="Doe"
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-200 transition"
                aria-invalid={errors.lastName ? 'true' : 'false'}
              />
              {errors.lastName && (
                <p className="text-red-600 text-sm mt-1">{errors.lastName.message as string}</p>
              )}
            </div>
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-bold text-blue-900 mb-2">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Invalid email address',
                },
              })}
              value={booking.email}
              onChange={(e) => booking.setGuestInfo({ email: e.target.value })}
              placeholder="john@example.com"
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-200 transition"
              aria-invalid={errors.email ? 'true' : 'false'}
            />
            {errors.email && (
              <p className="text-red-600 text-sm mt-1">{errors.email.message as string}</p>
            )}
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-bold text-blue-900 mb-2">
              Phone Number
            </label>
            <input
              id="phone"
              type="tel"
              {...register('phone', {
                required: 'Phone number is required',
                pattern: {
                  value: /^[\d\s\-\+\(\)]{10,}$/,
                  message: 'Invalid phone number',
                },
              })}
              value={booking.phone}
              onChange={(e) => booking.setGuestInfo({ phone: e.target.value })}
              placeholder="+1 (555) 123-4567"
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-200 transition"
              aria-invalid={errors.phone ? 'true' : 'false'}
            />
            {errors.phone && (
              <p className="text-red-600 text-sm mt-1">{errors.phone.message as string}</p>
            )}
          </div>

          <div className="bg-green-50 border-l-4 border-green-600 p-4 rounded">
            <p className="text-sm text-green-900">🔒 <strong>Your information is secure.</strong> We use industry-standard encryption and will never share your data.</p>
          </div>
        </div>
      )}

      {/* Step 5: Summary */}
      {step === 5 && (
        <div className="space-y-8">
          <div>
            <h2 className="text-2xl font-bold text-blue-900 mb-2">Review Your Booking</h2>
            <p className="text-gray-600 text-sm">Please confirm all details before completing your purchase</p>
          </div>

          {apiError && (
            <div className="bg-red-50 border-2 border-red-500 rounded-lg p-5 flex items-start gap-3">
              <AlertCircle size={20} className="text-red-600 mt-0.5 flex-shrink-0" />
              <p className="text-red-700 font-medium">{apiError}</p>
            </div>
          )}

          {/* Booking Details */}
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-xl border-2 border-blue-200">
            <h3 className="font-bold text-blue-900 mb-6 text-lg">Visit Details</h3>
            <div className="grid grid-cols-2 gap-8">
              <div>
                <p className="text-sm text-blue-700 font-semibold mb-1">DATE</p>
                <p className="text-xl font-bold text-blue-900">{booking.date ? new Date(booking.date).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' }) : 'Not selected'}</p>
              </div>
              <div>
                <p className="text-sm text-blue-700 font-semibold mb-1">GUESTS</p>
                <p className="text-xl font-bold text-blue-900">{booking.partySize} {booking.partySize === 1 ? 'Person' : 'People'}</p>
              </div>
              <div>
                <p className="text-sm text-blue-700 font-semibold mb-1">TICKET TYPE</p>
                <p className="text-xl font-bold text-blue-900">{selectedTicketType?.name || 'Not selected'}</p>
              </div>
              {booking.addOns.length > 0 && (
                <div>
                  <p className="text-sm text-blue-700 font-semibold mb-1">ADD-ONS</p>
                  <p className="text-xl font-bold text-blue-900">{booking.addOns.length} Selected</p>
                </div>
              )}
            </div>
          </div>

          {/* Guest Info */}
          <div className="bg-gradient-to-br from-green-50 to-green-100 p-8 rounded-xl border-2 border-green-200">
            <h3 className="font-bold text-green-900 mb-6 text-lg">Guest Information</h3>
            <div className="grid grid-cols-2 gap-8">
              <div>
                <p className="text-sm text-green-700 font-semibold mb-1">NAME</p>
                <p className="text-lg font-bold text-green-900">{booking.firstName} {booking.lastName}</p>
              </div>
              <div>
                <p className="text-sm text-green-700 font-semibold mb-1">EMAIL</p>
                <p className="text-lg font-bold text-green-900">{booking.email}</p>
              </div>
              <div>
                <p className="text-sm text-green-700 font-semibold mb-1">PHONE</p>
                <p className="text-lg font-bold text-green-900">{booking.phone}</p>
              </div>
            </div>
          </div>

          {/* Total */}
          <div className="bg-gradient-to-r from-yellow-400 to-yellow-300 p-8 rounded-xl">
            <div className="flex justify-between items-baseline">
              <span className="text-2xl font-bold text-blue-900">Total Amount:</span>
              <span className="text-5xl font-extrabold text-blue-900">{formatPrice(booking.total)}</span>
            </div>
            <p className="text-sm text-blue-800 mt-3">💳 Secure payment processing • 🔒 SSL encrypted • ✅ Money-back guarantee</p>
          </div>

          <div className="bg-blue-50 border-l-4 border-blue-600 p-4 rounded">
            <p className="text-sm text-blue-900">✓ By proceeding, you agree to our <a href="#" className="font-bold text-blue-700 hover:underline">terms and conditions</a> and <a href="#" className="font-bold text-blue-700 hover:underline">privacy policy</a>.</p>
          </div>
        </div>
      )}

      {/* Navigation Buttons */}
      <div className="flex gap-4 mt-12 pt-8 border-t-2 border-gray-200">
        <button
          type="button"
          onClick={handlePrev}
          disabled={step === 1}
          className="flex-1 px-6 py-3 border-2 border-blue-600 text-blue-600 font-bold rounded-lg hover:bg-blue-50 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          ← Previous
        </button>
        {step < 5 ? (
          <button
            type="button"
            onClick={handleNext}
            className="flex-1 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next →
          </button>
        ) : (
          <button
            type="button"
            onClick={handleSubmit}
            disabled={loading}
            className="flex-1 px-6 py-3 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-bold text-lg rounded-lg transition transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 shadow-lg"
          >
            {loading ? (
              <>
                <span className="inline-block animate-spin">⏳</span>
                <span>Processing...</span>
              </>
            ) : (
              <>
                <span>✓</span>
                <span>Complete Booking</span>
              </>
            )}
          </button>
        )}
      </div>
    </form>
  );
};

export default BookingForm;
