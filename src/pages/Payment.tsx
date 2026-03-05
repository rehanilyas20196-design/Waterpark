import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useBookingStore } from '../store/bookingStore';
import { useBookingAPI } from '../hooks/useBookingAPI';
import { TICKET_TYPES, ADD_ONS } from '../data/tickets';
import { formatPrice } from '../utils/accessibility';
import { Check, ChevronLeft, Droplets } from 'lucide-react';

const Payment = () => {
    const navigate = useNavigate();
    const booking = useBookingStore();
    const { submitBooking, loading, error: apiError } = useBookingAPI();
    const [paymentMethod, setPaymentMethod] = useState<string>('');
    const [showInstructions, setShowInstructions] = useState<boolean>(false);

    const selectedTicketType = TICKET_TYPES.find(t => t.id === booking.ticketType);
    const selectedAddOns = ADD_ONS.filter(a => booking.addOns.includes(a.id));

    // If there's no booking data, redirect to booking
    useEffect(() => {
        if (!booking.date || !booking.ticketType) {
            navigate('/booking');
        }
    }, [booking.date, booking.ticketType, navigate]);

    if (!booking.date || !booking.ticketType) {
        return null;
    }

    const handlePayment = async () => {
        if (!paymentMethod) {
            alert("Please select a payment method.");
            return;
        }

        if (!showInstructions) {
            setShowInstructions(true);
            return;
        }

        const bookingData = {
            date: booking.date,
            partySize: booking.partySize,
            ticketType: booking.ticketType,
            addOns: booking.addOns,
            total: booking.total,
            firstName: booking.firstName,
            lastName: booking.lastName,
            email: booking.email,
            phone: booking.phone,
            paymentToken: `mock-token-${paymentMethod}`, // Mock payment processing
        };

        const result = await submitBooking(bookingData);

        if (result && result.success) {
            booking.setGuestInfo({
                bookingId: result.booking.id,
                ticketId: result.ticket.id,
            });
            alert('Congratulations! Your payment was successful and your booking is confirmed. Enjoy your day at the Waterpark!');
            navigate('/');
        } else {
            alert('Payment failed: ' + (apiError || 'Unknown error. Please try again.'));
        }
    };

    const handleCancel = () => {
        // Optionally clear some state
        navigate('/booking');
    };

    return (
        <div className="min-h-screen bg-gray-50 pt-24 pb-12 font-sans">
            <div className="max-w-6xl mx-auto px-4">

                {/* Header matching the image style */}
                <div className="flex justify-between items-center bg-white p-6 rounded-t-2xl shadow-sm mb-6">
                    <h1 className="text-3xl font-light text-gray-800">WaterPark Ltd.</h1>
                    <div className="flex items-center text-blue-600 font-bold text-2xl tracking-tighter">
                        <Droplets className="mr-1" />
                        <span className="text-blue-500">water</span>
                        <span className="text-red-500">park</span>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 text-gray-800">

                    {/* Left Column - Payment Details */}
                    <div className="lg:col-span-2 space-y-8">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <Link to="/booking" className="flex items-center text-sm text-gray-600 hover:text-blue-600 font-medium">
                                <ChevronLeft size={16} className="mr-1" /> Back to merchant's site
                            </Link>

                            {/* Stepper */}
                            <div className="flex items-center space-x-2 text-xs font-medium text-gray-500">
                                <div className="flex flex-col items-center text-green-600">
                                    <span>Booking details</span>
                                    <div className="w-16 h-1 mt-1 bg-green-500 rounded flex items-center justify-center">
                                        <Check size={12} className="text-white bg-green-500 rounded-full p-0.5" />
                                    </div>
                                </div>
                                <div className="flex flex-col items-center text-gray-800">
                                    <span>Payment details</span>
                                    <div className="w-16 h-1 mt-1 bg-gray-300 rounded relative">
                                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-gray-600 rounded-full"></div>
                                    </div>
                                </div>
                                <div className="flex flex-col items-center">
                                    <span>Payment complete</span>
                                    <div className="w-16 h-1 mt-1 bg-gray-200 rounded"></div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
                            {showInstructions ? (
                                <div className="space-y-6">
                                    <h2 className="text-2xl font-normal text-gray-900">Payment Instructions</h2>
                                    <div className="bg-blue-50 border-l-4 border-blue-600 p-6 rounded-r-xl">
                                        <p className="text-gray-800 mb-4">
                                            To complete your payment via <strong>{paymentMethod}</strong>, please send the total amount to the following number:
                                        </p>
                                        <div className="flex items-center justify-center bg-white p-6 rounded-lg border-2 border-dashed border-blue-300 mb-4">
                                            <span className="text-4xl font-mono font-bold tracking-widest text-blue-700">03455900229</span>
                                        </div>
                                        <ul className="text-sm text-gray-700 space-y-2 list-disc ml-5">
                                            <li>Open your {paymentMethod} app</li>
                                            <li>Select Send Money / Money Transfer</li>
                                            <li>Enter the number above</li>
                                            <li>Enter the exact amount shown in the summary</li>
                                        </ul>
                                    </div>
                                    <div className="pt-4">
                                        <p className="text-sm text-gray-500 italic">
                                            Once you have sent the payment, please click the "Confirm Payment" button below to finalize your booking.
                                        </p>
                                    </div>
                                    <button
                                        onClick={() => setShowInstructions(false)}
                                        className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                                    >
                                        Change payment method
                                    </button>
                                </div>
                            ) : (
                                <>
                                    <h2 className="text-2xl font-normal mb-8 text-gray-900">How would you like to pay?</h2>

                                    <div className="space-y-4 max-w-md">
                                        {/* HBL Option */}
                                        <label onClick={() => setPaymentMethod('HBL')} className={`flex items-center justify-between p-4 border rounded-xl cursor-pointer transition ${paymentMethod === 'HBL' ? 'border-blue-600 bg-blue-50 ring-1 ring-blue-600' : 'border-gray-200 hover:border-gray-300'}`}>
                                            <div className="flex items-center">
                                                <input type="radio" name="payment" value="HBL" checked={paymentMethod === 'HBL'} onChange={() => setPaymentMethod('HBL')} className="mr-4 w-5 h-5 accent-blue-600" />
                                                <span className="font-semibold text-lg">HBL</span>
                                            </div>
                                            <div className="bg-[#008266] text-white text-xs font-bold px-3 py-1 rounded">
                                                HBL
                                            </div>
                                        </label>

                                        {/* Easypaisa Option */}
                                        <label onClick={() => setPaymentMethod('Easypaisa')} className={`flex items-center justify-between p-4 border rounded-xl cursor-pointer transition ${paymentMethod === 'Easypaisa' ? 'border-blue-600 bg-blue-50 ring-1 ring-blue-600' : 'border-gray-200 hover:border-gray-300'}`}>
                                            <div className="flex items-center">
                                                <input type="radio" name="payment" value="Easypaisa" checked={paymentMethod === 'Easypaisa'} onChange={() => setPaymentMethod('Easypaisa')} className="mr-4 w-5 h-5 accent-blue-600" />
                                                <span className="font-semibold text-lg">Easypaisa</span>
                                            </div>
                                            <div className="bg-[#00A950] text-white text-xs font-bold px-2 py-1 flex items-center rounded">
                                                easypaisa
                                            </div>
                                        </label>

                                        {/* JazzCash Option */}
                                        <label onClick={() => setPaymentMethod('JazzCash')} className={`flex items-center justify-between p-4 border rounded-xl cursor-pointer transition ${paymentMethod === 'JazzCash' ? 'border-blue-600 bg-blue-50 ring-1 ring-blue-600' : 'border-gray-200 hover:border-gray-300'}`}>
                                            <div className="flex items-center">
                                                <input type="radio" name="payment" value="JazzCash" checked={paymentMethod === 'JazzCash'} onChange={() => setPaymentMethod('JazzCash')} className="mr-4 w-5 h-5 accent-blue-600" />
                                                <span className="font-semibold text-lg">JazzCash</span>
                                            </div>
                                            <div className="bg-[#ED1C24] text-white text-xs font-bold px-2 py-1 rounded">
                                                JazzCash
                                            </div>
                                        </label>
                                    </div>
                                </>
                            )}

                        </div>
                    </div>

                    {/* Right Column - Order Summary */}
                    <div className="lg:col-span-1">
                        <div className="bg-white p-6 rounded-xl shadow-lg border-t-4 border-[#00966B]">
                            <h2 className="text-xl font-bold mb-4 text-gray-800">Order Summary</h2>
                            <p className="text-xs text-gray-500 mb-6 font-mono">
                                Order reference: {booking.firstName ? booking.firstName.substring(0, 3).toUpperCase() : 'WPK'}-{new Date().getTime().toString().substring(7)}
                            </p>

                            <div className="space-y-4 mb-6">
                                {selectedTicketType && (
                                    <div className="flex justify-between items-start">
                                        <div className="flex items-start">
                                            <div className="w-10 h-10 bg-blue-100 rounded flex items-center justify-center mr-3 flex-shrink-0 text-blue-600">
                                                🎫
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium text-gray-800">{selectedTicketType.name}</p>
                                                <p className="text-xs text-gray-500">x {booking.partySize}</p>
                                            </div>
                                        </div>
                                        <p className="text-sm text-gray-800">{formatPrice(selectedTicketType.price * booking.partySize)}</p>
                                    </div>
                                )}

                                {selectedAddOns.map(addon => (
                                    <div key={addon.id} className="flex justify-between items-start">
                                        <div className="flex items-start">
                                            <div className="w-10 h-10 bg-gray-100 rounded flex items-center justify-center mr-3 flex-shrink-0">
                                                {addon.icon}
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium text-gray-800">{addon.name}</p>
                                                <p className="text-xs text-gray-500">x 1</p>
                                            </div>
                                        </div>
                                        <p className="text-sm text-gray-800">{formatPrice(addon.price)}</p>
                                    </div>
                                ))}
                            </div>

                            <div className="border-t border-gray-200 pt-4 mb-4 space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-600">Subtotal</span>
                                    <span className="text-gray-800">{formatPrice(booking.total - (booking.total * 0.05))}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-600">Taxes (5%)</span>
                                    <span className="text-gray-800">{formatPrice(booking.total * 0.05)}</span>
                                </div>
                            </div>

                            <div className="border-t border-gray-200 pt-4 mb-8">
                                <div className="flex justify-between items-end">
                                    <span className="text-xl font-bold text-gray-900">Total</span>
                                    <span className="text-2xl font-bold text-gray-900">{formatPrice(booking.total)}</span>
                                </div>
                            </div>

                            <button
                                onClick={handlePayment}
                                disabled={loading || !paymentMethod}
                                className="w-full py-3 px-4 bg-[#00966B] hover:bg-[#007d58] text-white font-bold rounded shadow transition disabled:opacity-50 disabled:cursor-not-allowed mb-4 flex justify-center items-center"
                            >
                                {loading ? 'Processing...' : showInstructions ? 'Confirm Payment' : 'Continue to secure payment'}
                            </button>

                            <button
                                onClick={handleCancel}
                                className="w-full text-center text-sm font-medium text-gray-600 hover:text-gray-900 underline underline-offset-2"
                            >
                                Cancel payment
                            </button>
                        </div>

                        <div className="mt-8 text-center text-xs text-gray-400">
                            <p className="mb-2">Payment processed securely by</p>
                            <div className="flex justify-center flex-col items-center">
                                <div className="font-bold text-lg text-gray-500">WATERPARK PAYMENTS</div>
                            </div>
                            <div className="mt-4 flex justify-center space-x-2">
                                <span className="hover:underline cursor-pointer">About Us</span>
                                <span>|</span>
                                <span className="hover:underline cursor-pointer">Privacy policy</span>
                                <span>|</span>
                                <span className="hover:underline cursor-pointer">Security</span>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Payment;
