import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { 
  MapPin, 
  Star, 
  Clock, 
  IndianRupee, 
  Navigation, 
  Info, 
  ShieldAlert, 
  Heart, 
  Share2, 
  Printer, 
  Sparkles, 
  ArrowRight, 
  Users, 
  MessageSquare, 
  Send, 
  X, 
  Calendar,
  CheckCircle2
} from 'lucide-react';
import Breadcrumbs from '../components/Breadcrumbs';
import PlaceCard from '../components/PlaceCard';
import STATES_DATA from '../data/states.json';
import { useFavorites } from '../context/FavoritesContext';
import { GUIDES } from '../data/mockData';
import SEO from '../components/SEO';

export default function PlaceDetails() {
  const { stateSlug, placeSlug } = useParams();
  const navigate = useNavigate();
  const { isFavorite, toggleFavorite } = useFavorites();

  const [place, setPlace] = useState(null);
  const [relatedPlaces, setRelatedPlaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // Dynamic reviews state
  const [reviews, setReviews] = useState([
    { id: 1, author: 'Siddharth Mehta', avatar: 'https://randomuser.me/api/portraits/men/32.jpg', rating: 5, date: 'June 15, 2026', content: 'Incredible beach vibe! Visited Baga for watersports and it did not disappoint. Highly recommend parasailing during sunset.' },
    { id: 2, author: 'Priya Sharma', avatar: 'https://randomuser.me/api/portraits/women/44.jpg', rating: 4, date: 'May 28, 2026', content: 'Loved the shacks and street markets around Baga. It gets quite crowded in the evening, so mornings are perfect for a peaceful walk.' }
  ]);
  const [newReview, setNewReview] = useState({ author: '', rating: 5, content: '' });
  const [currentRating, setCurrentRating] = useState(4.5);
  const [ratingHover, setRatingHover] = useState(null);

  // Inquiry modal state
  const [inquiryModalOpen, setInquiryModalOpen] = useState(false);
  const [selectedGuide, setSelectedGuide] = useState(null);
  const [inquirySubmitted, setInquirySubmitted] = useState(false);
  const [inquirySubmitting, setInquirySubmitting] = useState(false);
  const [inquiryForm, setInquiryForm] = useState({ name: '', date: '', guests: 1, message: '' });

  const stateData = STATES_DATA.find(s => s.slug === stateSlug);

  useEffect(() => {
    if (!stateData) {
      navigate('/404', { replace: true });
      return;
    }

    let isMounted = true;
    setLoading(true);
    
    import(`../data/places/${stateSlug}.json`)
      .then(module => {
        if (!isMounted) return;
        const places = module.default || module;
        const foundPlace = places.find(p => p.slug === placeSlug);
        
        if (!foundPlace) {
          navigate('/404', { replace: true });
        } else {
          setPlace(foundPlace);
          setCurrentRating(foundPlace.rating);
          const others = places.filter(p => p.slug !== placeSlug);
          // Pick 4 random or top ones
          setRelatedPlaces(others.slice(0, 4));
          setLoading(false);
        }
      })
      .catch(err => {
        console.error("Failed to load state places for details", err);
        if (isMounted) {
          setError(true);
          setLoading(false);
        }
      });

    return () => { isMounted = false; };
  }, [stateSlug, placeSlug, stateData, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen pt-24 bg-slate-50 px-4 max-w-7xl mx-auto flex flex-col animate-pulse">
        <div className="h-8 bg-slate-200 w-1/3 rounded mb-8"></div>
        <div className="h-64 md:h-[500px] bg-slate-200 rounded-2xl mb-8"></div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            <div className="h-4 bg-slate-200 w-full rounded"></div>
            <div className="h-4 bg-slate-200 w-full rounded"></div>
            <div className="h-4 bg-slate-200 w-5/6 rounded"></div>
          </div>
          <div className="h-96 bg-slate-200 rounded-2xl"></div>
        </div>
      </div>
    );
  }

  if (error || !place) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold text-slate-800">Something went wrong</h2>
        <button onClick={() => navigate(-1)} className="mt-4 text-teal-600 font-bold">Go Back</button>
      </div>
    );
  }

  const crumbs = [
    { label: 'States', path: '/#explore' },
    { label: stateData.name, path: `/states/${stateData.slug}` },
    { label: place.name, path: '#' }
  ];

  // Guides matching current state
  const stateGuides = GUIDES.filter(g => 
    g.location.toLowerCase().includes(stateData.name.toLowerCase()) || 
    g.city.toLowerCase().includes(stateData.name.toLowerCase())
  );
  const featuredGuides = stateGuides.length > 0 ? stateGuides : GUIDES.slice(0, 2);

  // Review handlers
  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (!newReview.author || !newReview.content) {
      alert("Please fill in your name and comment.");
      return;
    }

    const reviewObj = {
      id: Date.now(),
      author: newReview.author,
      avatar: `https://randomuser.me/api/portraits/lego/${Math.floor(Math.random() * 8) + 1}.jpg`,
      rating: newReview.rating,
      date: 'Today',
      content: newReview.content
    };

    const updatedReviews = [reviewObj, ...reviews];
    setReviews(updatedReviews);
    
    // Compute new dynamic average rating
    const totalRating = updatedReviews.reduce((sum, r) => sum + r.rating, 0);
    const avgRating = (totalRating / updatedReviews.length).toFixed(1);
    setCurrentRating(parseFloat(avgRating));

    // Reset form
    setNewReview({ author: '', rating: 5, content: '' });
  };

  // Inquiry modal handlers
  const handleOpenInquiry = (guide) => {
    setSelectedGuide(guide);
    setInquiryModalOpen(true);
    setInquirySubmitted(false);
    setInquirySubmitting(false);
    setInquiryForm({
      name: '',
      date: '',
      guests: 1,
      message: `Hi ${guide.name.split(' ')[0]}, I am planning a tour to ${place.name} and would love to hire you as my local guide.`
    });
  };

  const handleInquirySubmit = (e) => {
    e.preventDefault();
    if (!inquiryForm.name || !inquiryForm.date) {
      alert("Please fill in your name and target date.");
      return;
    }
    setInquirySubmitting(true);
    setTimeout(() => {
      setInquirySubmitting(false);
      setInquirySubmitted(true);
    }, 1200);
  };

  return (
    <div className="bg-slate-50 dark:bg-slate-900 transition-colors pb-20 min-h-screen relative">
      <SEO 
        title={place ? `${place.name} - Travel Guide` : 'Place Details'}
        description={place?.fullDescription || place?.shortDescription || `Why visit ${place?.name}`}
        url={`/states/${stateSlug}/${placeSlug}`}
        image={place?.image}
      />
      
      {/* Sticky Top Nav */}
      <div className="sticky top-16 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200 py-4 px-4 sm:px-6 lg:px-8 mb-6 shadow-sm">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <Breadcrumbs crumbs={crumbs} />
          <div className="flex flex-wrap items-center gap-2 mt-[-10px] md:mt-0">
            <button className="flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg font-bold text-sm transition-colors cursor-pointer" aria-label="Share">
              <Share2 size={16} /> Share
            </button>
            <button onClick={() => window.print()} className="flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg font-bold text-sm transition-colors cursor-pointer" aria-label="Print">
              <Printer size={16} /> Print
            </button>
            <button 
              onClick={() => toggleFavorite(place)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-bold text-sm transition-colors shadow-sm cursor-pointer ${isFavorite(place.id) ? 'bg-rose-100 text-rose-600 hover:bg-rose-200' : 'bg-teal-600 hover:bg-teal-700 text-white'}`}
              aria-label="Save"
            >
              <Heart size={16} className={isFavorite(place.id) ? "fill-current" : ""} /> 
              {isFavorite(place.id) ? "Saved" : "Save"}
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        {/* Title Section */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <span className="bg-teal-100 text-teal-800 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
              {place.category}
            </span>
            <div className="flex items-center gap-1 bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-xs font-bold">
              <Star size={14} className="fill-current text-amber-500" />
              {currentRating}
            </div>
            {place.isFree && (
              <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                Free Entry
              </span>
            )}
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 mb-4 tracking-tight leading-tight">{place.name}</h1>
          <div className="flex items-center gap-2 text-slate-500 font-semibold text-lg bg-slate-200/50 w-fit px-4 py-2 rounded-xl">
            <MapPin size={20} className="text-teal-600" />
            {place.district}, {stateData.name}
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column: Images & Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Main Image */}
            <div className="rounded-3xl overflow-hidden shadow-md h-[400px] md:h-[550px] border border-slate-200 bg-slate-200 relative group">
              <img src={place.image} alt={place.name} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
            </div>
            
            {/* Gallery */}
            <div className="grid grid-cols-3 gap-4">
              {place.gallery.map((img, i) => (
                <div key={i} className="rounded-2xl overflow-hidden h-28 md:h-40 shadow-sm cursor-pointer hover:opacity-90 hover:-translate-y-1 transition-all border border-slate-100">
                  <img src={img} alt={`${place.name} Gallery ${i+1}`} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>

            {/* AI Trip Planner Call to Action Card */}
            <div className="bg-gradient-to-r from-teal-500 via-emerald-600 to-cyan-600 p-6 md:p-8 rounded-3xl shadow-lg text-white flex flex-col md:flex-row justify-between items-start md:items-center gap-6 relative overflow-hidden">
              <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]"></div>
              <div className="min-w-0">
                <span className="inline-flex items-center gap-1.5 bg-white/20 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider mb-2.5 border border-white/10">
                  <Sparkles size={12} /> AI Travel Companion
                </span>
                <h3 className="text-xl md:text-2xl font-extrabold truncate">Plan Your Goa Adventure</h3>
                <p className="text-white/80 text-sm mt-1 max-w-lg font-medium leading-relaxed">
                  Love {place.name}? Let our AI build a custom day-by-day itinerary covering {stateData.name}'s top spots.
                </p>
              </div>
              <Link 
                to={`/planner?state=${encodeURIComponent(stateData.name)}`}
                className="bg-white hover:bg-slate-50 text-teal-700 font-extrabold px-6 py-3.5 rounded-2xl shadow-md transition-all flex items-center gap-2 whitespace-nowrap self-stretch md:self-auto text-center justify-center text-sm cursor-pointer border border-transparent"
              >
                Start Planner <ArrowRight size={16} />
              </Link>
            </div>

            {/* About */}
            <div className="bg-white p-6 md:p-10 rounded-3xl shadow-sm border border-slate-200">
              <h2 className="text-2xl md:text-3xl font-extrabold text-slate-800 mb-6">About {place.name}</h2>
              <p className="text-slate-600 text-lg leading-relaxed mb-8">{place.fullDescription}</p>
              
              <div className="bg-amber-50 border border-amber-200 p-6 rounded-2xl mb-8 flex gap-4 items-start">
                <Star size={32} className="text-amber-500 shrink-0" />
                <div>
                  <h3 className="text-xl font-bold text-amber-900 mb-2">Why it is famous</h3>
                  <p className="text-amber-800/80 leading-relaxed font-medium">{place.whyFamous}</p>
                </div>
              </div>

              <h3 className="text-xl font-extrabold text-slate-800 mb-4">Historical Significance</h3>
              <p className="text-slate-600 leading-relaxed text-lg mb-8">{place.history}</p>
              
              <h3 className="text-xl font-extrabold text-slate-800 mb-4">Activities & Experiences</h3>
              <div className="flex flex-wrap gap-2">
                {place.activities.map((act, i) => (
                  <span key={i} className="bg-slate-100 border border-slate-200 text-slate-700 px-4 py-2 rounded-xl text-sm font-bold">
                    {act}
                  </span>
                ))}
              </div>
            </div>

            {/* Interactive Reviews Section */}
            <div className="bg-white p-6 md:p-10 rounded-3xl shadow-sm border border-slate-200 space-y-8">
              <h2 className="text-2xl md:text-3xl font-extrabold text-slate-800 flex items-center gap-2">
                <MessageSquare className="text-teal-650" /> User Reviews & Experiences
              </h2>

              {/* Reviews List */}
              <div className="space-y-6 divide-y divide-slate-100">
                {reviews.map((rev) => (
                  <div key={rev.id} className="pt-6 first:pt-0 flex gap-4 items-start">
                    <img src={rev.avatar} alt={rev.author} className="w-11 h-11 rounded-full object-cover shadow-sm bg-slate-100 border border-slate-200" />
                    <div className="flex-1 space-y-1.5">
                      <div className="flex items-center justify-between">
                        <h4 className="font-bold text-sm text-slate-800">{rev.author}</h4>
                        <span className="text-xs text-slate-400 font-semibold">{rev.date}</span>
                      </div>
                      <div className="flex gap-0.5">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            size={14} 
                            className={`${i < rev.rating ? 'text-amber-500 fill-amber-500' : 'text-slate-200'}`} 
                          />
                        ))}
                      </div>
                      <p className="text-slate-650 text-sm font-medium leading-relaxed pt-1">{rev.content}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Write Review Form */}
              <div className="border-t border-slate-100 pt-8">
                <h3 className="text-xl font-bold text-slate-800 mb-4">Share Your Experience</h3>
                <form onSubmit={handleReviewSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Your Name</label>
                      <input 
                        type="text" 
                        placeholder="e.g. Sarit Roy"
                        value={newReview.author}
                        onChange={(e) => setNewReview({ ...newReview, author: e.target.value })}
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-550/20 focus:border-teal-500 font-semibold"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Star Rating</label>
                      <div className="flex items-center gap-1.5 h-[50px]">
                        {[...Array(5)].map((_, i) => {
                          const ratingVal = i + 1;
                          return (
                            <button
                              key={i}
                              type="button"
                              onClick={() => setNewReview({ ...newReview, rating: ratingVal })}
                              onMouseEnter={() => setRatingHover(ratingVal)}
                              onMouseLeave={() => setRatingHover(null)}
                              className="focus:outline-none cursor-pointer transition-transform hover:scale-110"
                            >
                              <Star 
                                size={26} 
                                className={`${
                                  ratingVal <= (ratingHover || newReview.rating) 
                                    ? 'text-amber-500 fill-amber-500' 
                                    : 'text-slate-200'
                                }`} 
                              />
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Review Comment</label>
                    <textarea 
                      placeholder="Write your review here. What did you like? Any helpful tips for others?..."
                      value={newReview.content}
                      onChange={(e) => setNewReview({ ...newReview, content: e.target.value })}
                      rows="4"
                      className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-555/20 focus:border-teal-500 font-medium text-slate-700"
                      required
                    ></textarea>
                  </div>

                  <div className="flex justify-end">
                    <button 
                      type="submit"
                      className="bg-teal-600 hover:bg-teal-700 text-white font-extrabold px-6 py-3 rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer text-sm"
                    >
                      <Send size={15} /> Submit Review
                    </button>
                  </div>
                </form>
              </div>

            </div>

          </div>

          {/* Right Column: Info Panel */}
          <div className="space-y-6">
            
            {/* Quick Info Card */}
            <div className="bg-white p-6 rounded-3xl shadow-lg shadow-slate-200/50 border border-slate-200">
              <h3 className="text-xl font-extrabold text-slate-900 mb-6 border-b border-slate-100 pb-4">Essential Information</h3>
              
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="bg-blue-50/80 p-3 rounded-2xl text-blue-600 shrink-0"><Clock size={24} /></div>
                  <div>
                    <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-1">Timings</p>
                    <p className="text-slate-800 font-bold">{place.openingTime} - {place.closingTime}</p>
                    <p className="text-sm text-slate-500 mt-0.5">Open all days</p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="bg-green-50/80 p-3 rounded-2xl text-green-600 shrink-0"><IndianRupee size={24} /></div>
                  <div>
                    <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-1">Entry Fee</p>
                    <p className="text-slate-800 font-bold">{place.entryFee}</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="bg-amber-50/80 p-3 rounded-2xl text-amber-600 shrink-0"><Navigation size={24} /></div>
                  <div>
                    <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-1">Best Time to Visit</p>
                    <p className="text-slate-800 font-bold">{place.bestTimeToVisit}</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 pt-6 border-t border-slate-100">
                <a 
                  href={place.googleMapsUrl} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="w-full py-3.5 px-4 bg-slate-900 hover:bg-slate-800 text-white font-bold text-center rounded-xl transition-colors flex items-center justify-center gap-2 shadow-lg shadow-slate-900/20"
                >
                  <MapPin size={18} />
                  Open in Google Maps
                </a>
              </div>
            </div>

            {/* Guide Matching Widget */}
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200">
              <h3 className="text-lg font-extrabold text-slate-800 mb-4 flex items-center gap-2">
                <Users size={20} className="text-teal-600" />
                Local Guides in {stateData.name}
              </h3>
              
              <div className="space-y-4">
                {featuredGuides.map((guide) => (
                  <div key={guide.id} className="p-4 rounded-2xl border border-slate-100 bg-slate-50/50 flex flex-col gap-3">
                    <div className="flex gap-3">
                      <img src={guide.image} alt={guide.name} className="w-10 h-10 rounded-full object-cover shadow-sm bg-slate-100 border border-slate-200" />
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-1">
                          <h4 className="font-bold text-sm text-slate-800 truncate">{guide.name}</h4>
                          <span className="text-xs font-bold text-amber-500 flex items-center gap-0.5"><Star size={12} className="fill-amber-500" /> {guide.rating}</span>
                        </div>
                        <p className="text-[10px] text-slate-400 font-bold uppercase truncate">{guide.role}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between text-xs border-t border-slate-100/60 pt-2">
                      <span className="font-bold text-slate-700">${guide.price}/hr</span>
                      <button 
                        onClick={() => handleOpenInquiry(guide)}
                        className="text-xs text-teal-600 font-extrabold hover:text-teal-700 bg-teal-50 hover:bg-teal-100/60 px-3 py-1.5 rounded-lg transition-colors cursor-pointer border border-transparent"
                      >
                        Inquire Now
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Travel Tips */}
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200">
              <h3 className="text-lg font-extrabold text-slate-800 mb-4 flex items-center gap-2">
                <Info size={20} className="text-blue-500" />
                Travel Tips
              </h3>
              <ul className="space-y-3">
                {place.travelTips.map((tip, i) => (
                  <li key={i} className="flex items-start gap-3 text-slate-600 font-medium text-sm bg-slate-50 p-3 rounded-xl border border-slate-100">
                    <span className="w-1.5 h-1.5 rounded-full bg-teal-500 mt-1.5 shrink-0"></span>
                    {tip}
                  </li>
                ))}
              </ul>
            </div>

            {/* Safety */}
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200">
              <h3 className="text-lg font-extrabold text-slate-800 mb-4 flex items-center gap-2">
                <ShieldAlert size={20} className="text-red-500" />
                Safety Guidelines
              </h3>
              <ul className="space-y-3">
                {place.safetyTips.map((tip, i) => (
                  <li key={i} className="flex items-start gap-3 text-slate-600 font-medium text-sm bg-red-50/50 p-3 rounded-xl border border-red-100">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-400 mt-1.5 shrink-0"></span>
                    {tip}
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Accessibility */}
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200">
              <h3 className="text-lg font-extrabold text-slate-800 mb-4 flex items-center gap-2">
                Accessibility
              </h3>
              <div className="flex flex-wrap gap-2">
                {place.accessibility.map((acc, i) => (
                  <span key={i} className="bg-teal-50 border border-teal-100 text-teal-800 px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider">
                    {acc}
                  </span>
                ))}
              </div>
            </div>

          </div>
        </div>
        
        {/* Related Places */}
        {relatedPlaces.length > 0 && (
          <div className="mt-16 border-t border-slate-200 pt-12">
            <h2 className="text-3xl font-extrabold text-slate-900 mb-8">More to explore in {stateData.name}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedPlaces.map(rp => (
                <PlaceCard key={rp.id} place={rp} stateData={stateData} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Guide Inquiry Glassmorphic Dialog Modal */}
      {inquiryModalOpen && selectedGuide && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center p-4">
          {/* Backdrop blur */}
          <div 
            onClick={() => { if (!inquirySubmitting && !inquirySubmitted) setInquiryModalOpen(false); }}
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-all"
          ></div>
          
          {/* Modal Container */}
          <div className="bg-white rounded-3xl border border-slate-200/80 shadow-2xl w-full max-w-lg p-6 md:p-8 relative z-10 overflow-hidden transform transition-all duration-300">
            {/* Header close button */}
            {!inquirySubmitting && !inquirySubmitted && (
              <button 
                onClick={() => setInquiryModalOpen(false)}
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 bg-slate-100 hover:bg-slate-200/60 p-2 rounded-full cursor-pointer transition-all"
              >
                <X size={16} />
              </button>
            )}

            {/* Modal Body */}
            {inquirySubmitted ? (
              <div className="text-center py-8 space-y-4">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-teal-50 text-teal-600 animate-bounce">
                  <CheckCircle2 size={36} />
                </div>
                <div>
                  <h3 className="text-2xl font-extrabold text-slate-800">Inquiry Sent!</h3>
                  <p className="text-slate-500 font-medium text-sm mt-2 max-w-sm mx-auto">
                    Your inquiry has been delivered to <strong>{selectedGuide.name}</strong>. They will contact you shortly through message inbox.
                  </p>
                </div>
                <div className="pt-4">
                  <button 
                    onClick={() => setInquiryModalOpen(false)}
                    className="bg-teal-600 hover:bg-teal-700 text-white font-extrabold text-xs px-6 py-2.5 rounded-xl cursor-pointer"
                  >
                    Done
                  </button>
                </div>
              </div>
            ) : inquirySubmitting ? (
              <div className="text-center py-12 space-y-4 flex flex-col items-center justify-center">
                <div className="w-12 h-12 rounded-full border-4 border-teal-500/20 border-t-teal-500 animate-spin"></div>
                <div>
                  <h3 className="text-lg font-bold text-slate-700">Submitting inquiry details...</h3>
                  <p className="text-slate-450 text-xs font-semibold mt-1">Connecting with {selectedGuide.name}</p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleInquirySubmit} className="space-y-5">
                <div className="flex gap-4 items-center border-b border-slate-100 pb-4">
                  <img src={selectedGuide.image} alt={selectedGuide.name} className="w-12 h-12 rounded-full object-cover border" />
                  <div>
                    <h3 className="font-extrabold text-lg text-slate-850">Book {selectedGuide.name}</h3>
                    <p className="text-xs text-slate-450 font-bold uppercase">{selectedGuide.role}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">Your Name</label>
                    <input 
                      type="text" 
                      placeholder="e.g. Sarit Roy"
                      value={inquiryForm.name}
                      onChange={(e) => setInquiryForm({ ...inquiryForm, name: e.target.value })}
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 font-semibold"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1"><Calendar size={12} className="text-teal-650" /> Tour Date</label>
                      <input 
                        type="date"
                        value={inquiryForm.date}
                        onChange={(e) => setInquiryForm({ ...inquiryForm, date: e.target.value })}
                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 font-semibold"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1"><Users size={12} className="text-teal-655" /> Guests</label>
                      <input 
                        type="number"
                        min="1"
                        max="20"
                        value={inquiryForm.guests}
                        onChange={(e) => setInquiryForm({ ...inquiryForm, guests: parseInt(e.target.value) || 1 })}
                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 font-semibold"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">Message to Guide</label>
                    <textarea 
                      rows="3"
                      value={inquiryForm.message}
                      onChange={(e) => setInquiryForm({ ...inquiryForm, message: e.target.value })}
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 font-semibold text-slate-700"
                      required
                    ></textarea>
                  </div>
                </div>

                <div className="pt-2 flex justify-end gap-3">
                  <button 
                    type="button" 
                    onClick={() => setInquiryModalOpen(false)}
                    className="px-4 py-2.5 text-sm font-bold text-slate-500 border border-slate-200 hover:bg-slate-50 rounded-xl cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    className="bg-teal-600 hover:bg-teal-700 text-white font-extrabold text-sm px-6 py-2.5 rounded-xl shadow-md transition-all cursor-pointer"
                  >
                    Send Request
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
