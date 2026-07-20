import { useState } from 'react';
import { User, Calendar, ShieldCheck, HeadphonesIcon, ArrowRight, ArrowLeft, CreditCard, Check } from 'lucide-react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { motion, AnimatePresence } from 'framer-motion';

export default function Booking() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { guides, addBooking, user } = useApp();
  const guide = guides.find(g => g.id === Number(id)) || guides[0];

  const [step, setStep] = useState(1); // 1: Details, 2: Payment, 3: Success
  const [fullName, setFullName] = useState(user?.name || 'John Doe');
  const [email, setEmail] = useState(user?.email || 'john@example.com');
  const [phone, setPhone] = useState('');
  const [notes, setNotes] = useState('');
  const [date, setDate] = useState('');
  const [duration, setDuration] = useState('4 Hours');
  const [guests, setGuests] = useState(2);
  
  const [paymentMethod, setPaymentMethod] = useState('card'); // 'card' | 'paypal'
  const [cardName, setCardName] = useState(user?.name || 'John Doe');
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');

  const durationHours = parseInt(duration) || 4;
  const baseRate = guide.price * durationHours;
  const serviceFee = 12.50;
  const tax = 4.00;
  const total = baseRate + serviceFee + tax;

  const handleConfirm = () => {
    addBooking({
      guide,
      tourName: 'Custom Guide Experience',
      date: date || new Date().toISOString().split('T')[0],
      time: '09:00 AM',
      duration,
      guests,
      totalPrice: total,
      image: guide.coverImage || guide.image,
      location: guide.location,
      status: 'confirmed'
    });
    navigate('/dashboard/bookings');
  };

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      
      {/* Progress Header */}
      <div className="bg-white py-6 border-b border-slate-100 sticky top-20 z-[100] shadow-sm">
        <div className="max-w-7xl mx-auto px-4 flex justify-center">
          <div className="flex items-center gap-3 sm:gap-4">
            
            {/* Step 1 */}
            <div className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 ${
                step >= 1 ? 'bg-teal-600 text-white shadow-md shadow-teal-500/25' : 'bg-slate-100 text-slate-500'
              }`}>
                {step > 1 ? <Check size={16} /> : '1'}
              </div>
              <span className={`text-xs sm:text-sm font-bold tracking-wide transition-colors duration-300 ${
                step >= 1 ? 'text-teal-650' : 'text-slate-400'
              }`}>Details</span>
            </div>
            
            <div className={`h-[2px] w-8 sm:w-16 md:w-24 transition-colors duration-300 ${
              step >= 2 ? 'bg-teal-600' : 'bg-slate-200'
            }`}></div>
            
            {/* Step 2 */}
            <div className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 ${
                step >= 2 ? 'bg-teal-600 text-white shadow-md shadow-teal-500/25' : 'bg-slate-100 text-slate-500'
              }`}>
                {step > 2 ? <Check size={16} /> : '2'}
              </div>
              <span className={`text-xs sm:text-sm font-bold tracking-wide transition-colors duration-300 ${
                step >= 2 ? 'text-teal-650' : 'text-slate-400'
              }`}>Payment</span>
            </div>
            
            <div className={`h-[2px] w-8 sm:w-16 md:w-24 transition-colors duration-300 ${
              step >= 3 ? 'bg-teal-600' : 'bg-slate-200'
            }`}></div>
            
            {/* Step 3 */}
            <div className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 ${
                step >= 3 ? 'bg-teal-600 text-white shadow-md shadow-teal-500/25' : 'bg-slate-100 text-slate-500'
              }`}>
                3
              </div>
              <span className={`text-xs sm:text-sm font-bold tracking-wide transition-colors duration-300 ${
                step >= 3 ? 'text-teal-650' : 'text-slate-400'
              }`}>Confirm</span>
            </div>

          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          
          {/* Left Column (Forms) */}
          <div className="flex-1 w-full">
            <div className="card p-6 sm:p-10">
              <AnimatePresence mode="wait">
                {step === 1 && (
                  <motion.div
                    key="step-1"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    transition={{ duration: 0.2 }}
                  >
                    <h1 className="h2 mb-2">Plan Your Adventure</h1>
                    <p className="text-muted mb-8">Enter your traveler details and select your preferred dates to begin your custom journey with {guide.name.split(' ')[0]}.</p>
                    
                    <h2 className="text-lg font-bold text-teal-700 flex items-center gap-2 mb-5">
                      <User size={20} className="text-teal-600" /> Traveler Information
                    </h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                      <div className="form-group">
                        <label className="form-label">Full Name</label>
                        <input 
                          type="text" 
                          className="form-input" 
                          placeholder="John Doe" 
                          value={fullName}
                          onChange={e => setFullName(e.target.value)}
                        />
                      </div>
                      <div className="form-group">
                        <label className="form-label">Email Address</label>
                        <input 
                          type="email" 
                          className="form-input" 
                          placeholder="john@example.com" 
                          value={email}
                          onChange={e => setEmail(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="form-group mb-8">
                      <label className="form-label">Phone Number</label>
                      <input 
                        type="tel" 
                        className="form-input" 
                        placeholder="+1 (555) 000-0000" 
                        value={phone}
                        onChange={e => setPhone(e.target.value)}
                      />
                    </div>

                    <div className="h-[1px] bg-slate-100 -mx-6 sm:-mx-10 my-8"></div>

                    <h2 className="text-lg font-bold text-teal-700 flex items-center gap-2 mb-5">
                      <Calendar size={20} className="text-teal-600" /> Trip Details
                    </h2>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-5">
                      <div className="form-group">
                        <label className="form-label">Start Date</label>
                        <input 
                          type="date" 
                          className="form-input" 
                          value={date} 
                          onChange={e => setDate(e.target.value)} 
                        />
                      </div>
                      <div className="form-group">
                        <label className="form-label">Duration</label>
                        <select 
                          className="form-input" 
                          value={duration} 
                          onChange={e => setDuration(e.target.value)}
                        >
                          <option value="2 Hours">2 Hours (Standard)</option>
                          <option value="4 Hours">4 Hours (Half Day)</option>
                          <option value="8 Hours">8 Hours (Full Day)</option>
                        </select>
                      </div>
                      <div className="form-group">
                        <label className="form-label">Guests</label>
                        <select 
                          className="form-input" 
                          value={guests} 
                          onChange={e => setGuests(parseInt(e.target.value))}
                        >
                          <option value={1}>1 Guest</option>
                          <option value={2}>2 Guests</option>
                          <option value={3}>3 Guests</option>
                          <option value={4}>4+ Guests</option>
                        </select>
                      </div>
                    </div>
                    
                    <div className="form-group mb-8">
                      <label className="form-label">Special Requirements or Notes</label>
                      <textarea 
                        className="form-input" 
                        placeholder={`Tell ${guide.name.split(' ')[0]} about your interests...`} 
                        rows={4}
                        value={notes}
                        onChange={e => setNotes(e.target.value)}
                      ></textarea>
                    </div>

                    <div className="flex justify-end pt-2">
                      <button 
                        onClick={() => setStep(2)} 
                        className="btn btn-primary px-8 py-3.5 gap-2"
                      >
                        Proceed to Payment <ArrowRight size={18} />
                      </button>
                    </div>
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div
                    key="step-2"
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    <button 
                      onClick={() => setStep(1)} 
                      className="btn btn-ghost p-0 gap-2 mb-6 text-slate-500 hover:text-slate-800"
                    >
                      <ArrowLeft size={18} /> Back to Details
                    </button>

                    <h1 className="h2 mb-2">Payment Method</h1>
                    <p className="text-muted mb-8">All transactions are secure and encrypted. Personal information is handled according to our Privacy Policy.</p>
                    
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div 
                        onClick={() => setPaymentMethod('card')}
                        className={`p-4 rounded-xl border-2 flex items-center justify-center gap-2 font-bold cursor-pointer transition-all duration-200 ${
                          paymentMethod === 'card' 
                            ? 'border-teal-650 bg-teal-50/50 text-teal-700' 
                            : 'border-slate-200 bg-white text-slate-650 hover:bg-slate-50'
                        }`}
                      >
                        <CreditCard size={20} /> Credit Card
                      </div>
                      <div 
                        onClick={() => setPaymentMethod('paypal')}
                        className={`p-4 rounded-xl border-2 flex items-center justify-center gap-2 font-bold cursor-pointer transition-all duration-200 ${
                          paymentMethod === 'paypal' 
                            ? 'border-teal-650 bg-teal-50/50 text-teal-700' 
                            : 'border-slate-200 bg-white text-slate-650 hover:bg-slate-50'
                        }`}
                      >
                        PayPal
                      </div>
                    </div>
                    
                    {paymentMethod === 'paypal' ? (
                      <div className="text-center py-10 px-4 bg-slate-50/50 rounded-2xl border border-slate-200/60 mb-8">
                        <img 
                          src="https://www.paypalobjects.com/webstatic/mktg/logo/AM_mc_vs_dc_ae.jpg" 
                          alt="PayPal Payment Methods" 
                          className="mx-auto mb-4 h-10 object-contain rounded"
                        />
                        <h3 className="font-bold text-slate-800 text-lg mb-2">Checkout with PayPal</h3>
                        <p className="text-sm text-slate-500 max-w-sm mx-auto mb-6">
                          You will be redirected to PayPal's secure portal to authorize your booking. You can complete the payment using your PayPal account balance or linked bank accounts.
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-5 mb-8">
                        <div className="form-group">
                          <label className="form-label">Cardholder Name</label>
                          <input 
                            type="text" 
                            className="form-input" 
                            placeholder="Alex Morgan" 
                            value={cardName}
                            onChange={e => setCardName(e.target.value)}
                          />
                        </div>
                        <div className="form-group">
                          <label className="form-label">Card Number</label>
                          <div className="relative">
                            <input 
                              type="text" 
                              className="form-input pr-12" 
                              placeholder="0000 0000 0000 0000" 
                              value={cardNumber}
                              onChange={e => setCardNumber(e.target.value)}
                            />
                            <CreditCard size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400" />
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="form-group">
                            <label className="form-label">Expiry Date</label>
                            <input 
                              type="text" 
                              className="form-input" 
                              placeholder="MM / YY" 
                              value={expiry}
                              onChange={e => setExpiry(e.target.value)}
                            />
                          </div>
                          <div className="form-group">
                            <label className="form-label">CVV</label>
                            <input 
                              type="text" 
                              className="form-input" 
                              placeholder="•••" 
                              value={cvv}
                              onChange={e => setCvv(e.target.value)}
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="flex items-start gap-2.5 mb-8">
                      <input type="checkbox" id="save-card" className="mt-1 accent-teal-650 rounded" />
                      <label htmlFor="save-card" className="text-xs text-slate-500 cursor-pointer leading-relaxed select-none">
                        Save this payment method for future bookings. You can remove it at any time in your profile settings.
                      </label>
                    </div>

                    <button 
                      onClick={() => setStep(3)} 
                      className="btn btn-primary w-full py-4 text-base"
                    >
                      Confirm Booking
                    </button>
                  </motion.div>
                )}

                {step === 3 && (
                  <motion.div
                    key="step-3"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 18 }}
                    className="text-center py-8"
                  >
                    <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-6 border border-emerald-100 shadow-sm shadow-emerald-500/10">
                      <ShieldCheck size={42} className="text-emerald-500" />
                    </div>
                    
                    <h1 className="text-3xl font-black text-slate-900 mb-2">Booking Confirmed!</h1>
                    <p className="text-slate-500 max-w-md mx-auto mb-8 text-sm sm:text-base leading-relaxed">
                      Your adventure with <span className="font-bold text-teal-600">{guide.name}</span> is booked. We've sent a verification email with full receipts and contact details.
                    </p>

                    <div className="max-w-md mx-auto bg-slate-50 rounded-2xl border border-slate-100 p-6 mb-8 text-left space-y-3.5">
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-450 font-bold">Guide:</span>
                        <span className="font-extrabold text-slate-800">{guide.name}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-450 font-bold">Location:</span>
                        <span className="font-extrabold text-slate-800">{guide.location}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-450 font-bold">Date:</span>
                        <span className="font-extrabold text-slate-800">{date || new Date().toISOString().split('T')[0]}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-450 font-bold">Duration:</span>
                        <span className="font-extrabold text-slate-800">{duration}</span>
                      </div>
                      <div className="flex justify-between text-sm pt-3 border-t border-slate-200">
                        <span className="text-slate-800 font-bold">Total Paid:</span>
                        <span className="font-black text-teal-650 text-lg">${total.toFixed(2)}</span>
                      </div>
                    </div>

                    <div className="flex justify-center max-w-xs mx-auto">
                      <button onClick={handleConfirm} className="btn btn-primary w-full py-3.5">
                        Go to Dashboard
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
            {step < 3 && (
              <div className="bg-teal-50/50 border border-teal-100/50 p-4 sm:p-5 rounded-2xl flex gap-3.5 mt-6 items-start">
                <ShieldCheck size={22} className="text-teal-600 flex-shrink-0 mt-0.5" />
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">Your booking is protected by <span className="text-teal-650 font-bold">GuideConnect Assurance</span>. Vetted experts, secure payments, and 24/7 support.</p>
              </div>
            )}
          </div>

          {/* Right Column (Order Summary) */}
          {step < 3 && (
            <aside className="w-full lg:w-[400px] lg:flex-shrink-0">
              <div className="card overflow-hidden">
                <div className="relative h-44 overflow-hidden rounded-t-2xl">
                  <img src={guide.coverImage || guide.image} alt="Tour" className="w-full h-full object-cover" />
                  {guide.verified && (
                    <div className="absolute top-4 left-4">
                      <span className="bg-teal-600/90 text-white font-extrabold text-[10px] tracking-wider uppercase px-2.5 py-1 rounded-full shadow-md">
                        PRO GUIDE VETTED
                      </span>
                    </div>
                  )}
                  <div className="absolute bottom-4 left-4 text-white text-lg font-black tracking-tight drop-shadow-md">
                    Custom Guide Experience
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 to-transparent z-[-1]"></div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="relative flex-shrink-0">
                      <img src={guide.image} alt={guide.name} className="w-14 h-14 rounded-full object-cover shadow-md border-2 border-white ring-1 ring-slate-100" />
                      {guide.online && <div className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-white"></div>}
                    </div>
                    <div>
                      <h3 className="font-extrabold text-slate-800 text-[1.05rem] leading-tight">{guide.name}</h3>
                      <div className="text-xs text-slate-450 font-bold mt-1">
                        Location: <span className="text-teal-600">{guide.location}</span>
                      </div>
                    </div>
                  </div>

                  <div className="border-y border-slate-100 py-4 my-5 space-y-2.5">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-slate-450 font-semibold">Date & Time</span>
                      <span className="font-bold text-slate-750">{date || 'Not selected'} • 09:00 AM</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-slate-450 font-semibold">Guests</span>
                      <span className="font-bold text-slate-750">{guests} Guests</span>
                    </div>
                  </div>

                  <div className="space-y-2 mb-6">
                    <div className="flex justify-between items-center text-sm text-slate-500">
                      <span>Tour Base Rate ({duration})</span>
                      <span className="font-semibold text-slate-700">${baseRate.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm text-slate-500">
                      <span>Service Fee</span>
                      <span className="font-semibold text-slate-700">${serviceFee.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm text-slate-500">
                      <span>Sustainability Tax</span>
                      <span className="font-semibold text-slate-700">${tax.toFixed(2)}</span>
                    </div>
                  </div>

                  <div className="flex justify-between items-end mb-1">
                    <span className="font-bold text-slate-400 uppercase tracking-widest text-[10px] pb-1">Total Amount</span>
                    <span className="text-3xl font-black text-teal-600 tracking-tight leading-none">${total.toFixed(2)}</span>
                  </div>
                  
                  <div className="text-right text-xs text-emerald-600 font-bold mb-6">
                    Free Cancellation <br />
                    <span className="text-slate-450 font-medium">Until 24h before trip</span>
                  </div>

                  {step === 1 && (
                    <button 
                      onClick={() => setStep(2)} 
                      className="btn btn-primary w-full py-3.5 gap-2 text-base"
                    >
                      Proceed to Payment <ArrowRight size={18} />
                    </button>
                  )}
                  {step === 2 && (
                    <button 
                      onClick={() => setStep(3)} 
                      className="btn btn-primary w-full py-3.5 text-base"
                    >
                      Confirm Booking
                    </button>
                  )}

                  <div className="text-center text-[10px] text-slate-400 mt-4 px-4 leading-normal">
                    You won't be charged yet. Your payment details are encrypted and secure.
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-6">
                <div className="bg-slate-50 border border-slate-100 p-4 rounded-2xl flex flex-col items-center text-center">
                  <ShieldCheck size={22} className="text-teal-600 mb-1.5" />
                  <div className="text-xs font-bold text-slate-800">Secure Checkout</div>
                  <div className="text-[10px] text-slate-400">256-bit SSL encryption</div>
                </div>
                <div className="bg-slate-50 border border-slate-100 p-4 rounded-2xl flex flex-col items-center text-center">
                  <HeadphonesIcon size={22} className="text-teal-600 mb-1.5" />
                  <div className="text-xs font-bold text-slate-800">24/7 Support</div>
                  <div className="text-[10px] text-slate-400">Live chat available</div>
                </div>
              </div>
            </aside>
          )}

        </div>
      </div>
    </div>
  );
}
