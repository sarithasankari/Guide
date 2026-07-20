import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, 
  MapPin, 
  Calendar, 
  Compass, 
  Layers, 
  DollarSign, 
  Edit3, 
  Check, 
  Printer, 
  RotateCcw, 
  Languages, 
  Star, 
  ExternalLink,
  ChevronRight,
  Sun,
  Coffee,
  Moon,
  Clock,
  Tag,
  ArrowRight
} from 'lucide-react';
import { Link, useSearchParams } from 'react-router-dom';
import statesData from '../data/statesData';
import { GUIDES } from '../data/mockData';
import { generateItinerary } from '../utils/itineraryGenerator';

const TRAVEL_STYLES = [
  { id: 'History & Culture', label: 'History & Culture', icon: Sparkles, color: 'from-amber-500 to-orange-600', description: 'Explore ancient monuments, history-rich sites, and cultural narratives.' },
  { id: 'Food & Drink', label: 'Food & Culinary', icon: Coffee, color: 'from-emerald-500 to-teal-600', description: 'Taste traditional street eats, premium dining, and local cooking styles.' },
  { id: 'Alpine & Nature', label: 'Nature & Parks', icon: Sun, color: 'from-green-500 to-emerald-600', description: 'Discover natural valleys, hiking trails, lakes, and scenic vistas.' },
  { id: 'Photography & Art', label: 'Art & Photography', icon: Compass, color: 'from-blue-500 to-indigo-600', description: 'Capture iconic architecture, visit art galleries, and watch craftsmen.' },
  { id: 'Adventure & Sports', label: 'Adventure & Safari', icon: Layers, color: 'from-rose-500 to-red-600', description: 'Engage in outdoor activities, safari tracks, and high-energy spots.' }
];

const BUDGET_LEVELS = [
  { id: 'Budget', label: 'Budget', description: 'Affordable stays, local transport, street eats', icon: '$' },
  { id: 'Moderate', label: 'Moderate', description: 'Comfort hotels, private cabs, nice cafes', icon: '$$' },
  { id: 'Luxury', label: 'Luxury', description: '5-star resorts, private guide, gourmet dining', icon: '$$$' }
];

const LOADING_STEPS_TEXT = [
  "Analyzing historical landmarks and top attractions...",
  "Curating morning, afternoon, and evening routes for optimal pacing...",
  "Selecting regional dining options and local cuisines...",
  "Matching local expert guides from GuideConnect database...",
  "Assembling your custom personalized travel plan..."
];

export default function Planner() {
  const [searchParams] = useSearchParams();
  const initialStateParam = searchParams.get('state') || '';

  // Navigation views: 'form' | 'loading' | 'itinerary'
  const [view, setView] = useState('form');
  
  // Form State
  const [selectedState, setSelectedState] = useState(initialStateParam);
  const [duration, setDuration] = useState(3);
  const [style, setStyle] = useState('History & Culture');
  const [budget, setBudget] = useState('Moderate');
  const [customPrompt, setCustomPrompt] = useState('');
  const [stateSearch, setStateSearch] = useState(initialStateParam);
  const [showStateDropdown, setShowStateDropdown] = useState(false);

  // Generated Itinerary State
  const [itinerary, setItinerary] = useState(null);
  const [activeDay, setActiveDay] = useState(1);
  const [editingActivity, setEditingActivity] = useState(null); // { dayIndex, activityIndex, field }
  const [editText, setEditText] = useState('');

  // Loading Steps State
  const [loadingStep, setLoadingStep] = useState(0);

  // Filtering states from statesData
  const filteredStates = statesData.filter(s => 
    s.state.toLowerCase().includes(stateSearch.toLowerCase())
  );

  // Handle AI generation simulation
  const handleGenerate = (e) => {
    e.preventDefault();
    if (!selectedState) {
      alert("Please select a destination state to proceed.");
      return;
    }
    
    setView('loading');
    setLoadingStep(0);
  };

  // Simulated loading steps effect
  useEffect(() => {
    if (view !== 'loading') return;

    const interval = setInterval(() => {
      setLoadingStep(prev => {
        if (prev >= LOADING_STEPS_TEXT.length - 1) {
          clearInterval(interval);
          // Generate the itinerary
          const result = generateItinerary({
            state: selectedState,
            duration,
            style,
            budget
          });
          setItinerary(result);
          setActiveDay(1);
          setView('itinerary');
          return prev;
        }
        return prev + 1;
      });
    }, 1500);

    return () => clearInterval(interval);
  }, [view, selectedState, duration, style, budget]);

  // Guides recommendation logic
  const matchedGuides = GUIDES.filter(g => 
    g.location.toLowerCase().includes(selectedState.toLowerCase()) ||
    g.city.toLowerCase().includes(selectedState.toLowerCase())
  );
  
  // Fallback to top guides if no exact matches in the state
  const recommendedGuides = matchedGuides.length > 0 ? matchedGuides : GUIDES.slice(0, 3);

  // Editing activity
  const startEditing = (dayIndex, actIndex, currentVal) => {
    setEditingActivity({ dayIndex, actIndex });
    setEditText(currentVal);
  };

  const saveEditing = () => {
    if (!editingActivity) return;
    const { dayIndex, actIndex } = editingActivity;
    
    const updatedDays = [...itinerary.days];
    updatedDays[dayIndex].activities[actIndex].description = editText;
    
    setItinerary({
      ...itinerary,
      days: updatedDays
    });
    setEditingActivity(null);
  };

  // Helper for activity icon based on slot
  const getActivityIcon = (slot) => {
    switch (slot) {
      case 'Morning': return <Sun className="w-5 h-5 text-amber-500" />;
      case 'Afternoon': return <Coffee className="w-5 h-5 text-teal-500" />;
      case 'Evening': return <Moon className="w-5 h-5 text-indigo-500" />;
      default: return <Clock className="w-5 h-5 text-slate-500" />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/50 pt-28 pb-20 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        
        {/* VIEW 1: SELECTION FORM */}
        <AnimatePresence mode="wait">
          {view === 'form' && (
            <motion.div
              key="planner-form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="bg-white rounded-3xl border border-slate-200/60 shadow-xl overflow-hidden"
            >
              <div className="relative bg-gradient-to-r from-teal-500 via-emerald-600 to-cyan-600 p-8 md:p-12 text-white text-center">
                <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]"></div>
                <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider mb-4 border border-white/10">
                  <Sparkles className="w-4.5 h-4.5" /> AI Engine v1.2
                </div>
                <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4">
                  Design Your Perfect Indian Adventure
                </h1>
                <p className="text-white/80 max-w-xl mx-auto text-base md:text-lg">
                  Tell us where you want to go and how you like to travel. Our planner will curate a customized day-by-day itinerary instantly.
                </p>
              </div>

              <form onSubmit={handleGenerate} className="p-6 md:p-10 space-y-8">
                
                {/* Destination Dropdown */}
                <div className="relative">
                  <label className="block text-sm font-bold text-slate-700 mb-2.5 flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-teal-500" /> Choose Destination State *
                  </label>
                  <div className="relative">
                    <input 
                      type="text" 
                      placeholder="Type or select an Indian state (e.g. Kerala, Rajasthan, Goa)..."
                      value={selectedState ? selectedState : stateSearch}
                      onChange={(e) => {
                        setSelectedState('');
                        setStateSearch(e.target.value);
                        setShowStateDropdown(true);
                      }}
                      onFocus={() => setShowStateDropdown(true)}
                      className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all font-semibold"
                    />
                    {selectedState && (
                      <button 
                        type="button" 
                        onClick={() => { setSelectedState(''); setStateSearch(''); }}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400 hover:text-slate-600 transition-colors"
                      >
                        Clear
                      </button>
                    )}
                  </div>

                  {showStateDropdown && (
                    <div className="absolute z-50 left-0 right-0 mt-2 max-h-60 overflow-y-auto bg-white border border-slate-200 rounded-2xl shadow-xl divide-y divide-slate-100">
                      {filteredStates.length > 0 ? (
                        filteredStates.map((s) => (
                          <button
                            key={s.state}
                            type="button"
                            onClick={() => {
                              setSelectedState(s.state);
                              setStateSearch(s.state);
                              setShowStateDropdown(false);
                            }}
                            className="w-full text-left px-5 py-3 hover:bg-slate-50 font-medium text-slate-700 flex items-center justify-between"
                          >
                            <span>{s.state}</span>
                            <span className="text-xs text-slate-400 font-semibold">{s.places.length} major hubs</span>
                          </button>
                        ))
                      ) : (
                        <div className="p-4 text-center text-slate-400 text-sm font-semibold">
                          No states found matching "{stateSearch}"
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Duration Slider */}
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <label className="block text-sm font-bold text-slate-700 flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-teal-500" /> Trip Duration
                    </label>
                    <span className="bg-teal-50 text-teal-700 font-bold px-3.5 py-1 rounded-full text-sm">
                      {duration} {duration === 1 ? 'Day' : 'Days'}
                    </span>
                  </div>
                  <input 
                    type="range" 
                    min="1" 
                    max="7" 
                    value={duration}
                    onChange={(e) => setDuration(parseInt(e.target.value))}
                    className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-teal-500 focus:outline-none"
                  />
                  <div className="flex justify-between text-xs text-slate-400 font-bold px-1 mt-2">
                    <span>1 Day</span>
                    <span>3 Days</span>
                    <span>5 Days</span>
                    <span>7 Days</span>
                  </div>
                </div>

                {/* Travel Style Selection */}
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-3 flex items-center gap-2">
                    <Compass className="w-4 h-4 text-teal-500" /> Travel Style & Focus
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {TRAVEL_STYLES.map((styleObj) => {
                      const StyleIcon = styleObj.icon;
                      const isSelected = style === styleObj.id;
                      return (
                        <button
                          key={styleObj.id}
                          type="button"
                          onClick={() => setStyle(styleObj.id)}
                          className={`flex items-start gap-4 p-4 rounded-2xl border text-left cursor-pointer transition-all ${
                            isSelected 
                              ? 'border-teal-500 bg-teal-50/40 ring-1 ring-teal-500' 
                              : 'border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50/50'
                          }`}
                        >
                          <div className={`p-2.5 rounded-xl bg-gradient-to-br ${styleObj.color} text-white shadow-md`}>
                            <StyleIcon className="w-5 h-5" />
                          </div>
                          <div>
                            <div className="font-bold text-slate-800 text-sm">{styleObj.label}</div>
                            <div className="text-xs text-slate-500 mt-1 font-medium leading-relaxed">{styleObj.description}</div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Budget Selection */}
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-3.5 flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-teal-500" /> Budget Range
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {BUDGET_LEVELS.map((b) => {
                      const isSelected = budget === b.id;
                      return (
                        <button
                          key={b.id}
                          type="button"
                          onClick={() => setBudget(b.id)}
                          className={`flex flex-col items-center p-5 rounded-2xl border cursor-pointer text-center transition-all ${
                            isSelected 
                              ? 'border-teal-500 bg-teal-50/40 ring-1 ring-teal-500' 
                              : 'border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50/50'
                          }`}
                        >
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm mb-2 transition-all ${
                            isSelected ? 'bg-teal-500 text-white' : 'bg-slate-100 text-slate-500'
                          }`}>
                            {b.icon}
                          </div>
                          <div className="font-extrabold text-slate-800 text-sm">{b.label}</div>
                          <div className="text-xs text-slate-500 mt-1 font-medium">{b.description}</div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Custom Prompt Input */}
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-teal-500" /> Special Requests or Custom Requirements (Optional)
                  </label>
                  <textarea 
                    placeholder="e.g. Traveling with elder parents, vegetarian food options, focus on temple timings, wheelchair accessible places..."
                    value={customPrompt}
                    onChange={(e) => setCustomPrompt(e.target.value)}
                    rows="3"
                    className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all font-semibold placeholder:text-slate-400 text-slate-700"
                  ></textarea>
                </div>

                {/* Submit Action */}
                <div className="pt-4 border-t border-slate-100 flex justify-end">
                  <button
                    type="submit"
                    className="w-full md:w-auto bg-gradient-to-r from-teal-500 to-emerald-600 text-white hover:from-teal-600 hover:to-emerald-700 font-extrabold text-base px-10 py-4 rounded-2xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all flex items-center justify-center gap-3 cursor-pointer"
                  >
                    Generate Custom Itinerary <ArrowRight className="w-5 h-5" />
                  </button>
                </div>

              </form>
            </motion.div>
          )}

          {/* VIEW 2: LOADING SCREEN */}
          {view === 'loading' && (
            <motion.div
              key="planner-loading"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-3xl border border-slate-200/60 shadow-xl p-8 md:p-16 text-center max-w-2xl mx-auto my-12 flex flex-col items-center justify-center min-h-[450px]"
            >
              <div className="relative mb-8">
                <div className="w-24 h-24 rounded-full border-4 border-teal-500/20 border-t-teal-500 animate-spin"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <Compass className="w-8 h-8 text-teal-600 animate-pulse" />
                </div>
              </div>
              
              <h2 className="text-2xl font-bold text-slate-800 mb-2">
                Consulting GuideConnect AI...
              </h2>
              <div className="text-slate-400 font-bold text-xs uppercase tracking-wider mb-6">
                Creating trip plan for {selectedState}
              </div>

              {/* Progress Text Transitions */}
              <div className="min-h-[50px] flex items-center justify-center">
                <AnimatePresence mode="wait">
                  <motion.p
                    key={loadingStep}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="text-slate-600 font-semibold max-w-md"
                  >
                    {LOADING_STEPS_TEXT[loadingStep]}
                  </motion.p>
                </AnimatePresence>
              </div>

              {/* Step indicator bubbles */}
              <div className="flex gap-2.5 mt-8">
                {LOADING_STEPS_TEXT.map((_, index) => (
                  <div 
                    key={index} 
                    className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                      index <= loadingStep ? 'bg-teal-500 scale-110' : 'bg-slate-200'
                    }`}
                  />
                ))}
              </div>
            </motion.div>
          )}

          {/* VIEW 3: ITINERARY VIEW */}
          {view === 'itinerary' && itinerary && (
            <motion.div
              key="planner-itinerary"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="space-y-8"
            >
              
              {/* Itinerary Header Summary */}
              <div className="bg-white border border-slate-200/60 rounded-3xl p-6 md:p-8 shadow-md flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div>
                  <div className="flex items-center gap-2 text-slate-400 font-bold text-xs uppercase tracking-wider mb-1.5">
                    <MapPin className="w-3.5 h-3.5 text-teal-500" /> {itinerary.stateName}, India
                  </div>
                  <h2 className="text-2xl md:text-3xl font-extrabold text-slate-800">
                    {itinerary.duration}-Day {itinerary.style} Adventure
                  </h2>
                  
                  {/* Small Badges */}
                  <div className="flex flex-wrap gap-2 mt-3.5">
                    <span className="bg-slate-100 text-slate-700 font-bold px-3 py-1 rounded-full text-xs">
                      Budget: {itinerary.budget} ({itinerary.pricingRange}/day)
                    </span>
                    <span className="bg-teal-50 text-teal-700 font-bold px-3 py-1 rounded-full text-xs">
                      Style: {itinerary.style}
                    </span>
                  </div>
                </div>

                <div className="flex gap-3 w-full md:w-auto">
                  <button 
                    onClick={() => setView('form')}
                    className="flex-1 md:flex-none flex items-center justify-center gap-2 border border-slate-200 hover:bg-slate-50 font-bold text-slate-600 px-5 py-3 rounded-2xl transition-all cursor-pointer text-sm"
                  >
                    <RotateCcw className="w-4.5 h-4.5" /> Plan New
                  </button>
                  <button 
                    onClick={() => window.print()}
                    className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-slate-850 hover:bg-slate-900 text-white font-bold px-6 py-3 rounded-2xl transition-all cursor-pointer text-sm shadow-sm"
                  >
                    <Printer className="w-4.5 h-4.5" /> Print Itinerary
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                
                {/* Main Timeline (Left/Center 2 Cols) */}
                <div className="lg:col-span-2 space-y-6">
                  
                  {/* Day tabs bar */}
                  <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none sticky top-20 z-40 bg-slate-50/90 backdrop-blur-sm py-2">
                    {itinerary.days.map((d) => (
                      <button
                        key={d.dayNum}
                        onClick={() => {
                          setActiveDay(d.dayNum);
                          setEditingActivity(null);
                        }}
                        className={`flex-shrink-0 font-bold text-sm px-6 py-3.5 rounded-2xl cursor-pointer transition-all ${
                          activeDay === d.dayNum 
                            ? 'bg-teal-500 text-white shadow-md shadow-teal-500/20' 
                            : 'bg-white text-slate-600 border border-slate-200 hover:border-slate-350'
                        }`}
                      >
                        Day {d.dayNum}
                      </button>
                    ))}
                  </div>

                  {/* Selected Day Timeline */}
                  {itinerary.days.filter(d => d.dayNum === activeDay).map((day) => {
                    const actualDayIndex = itinerary.days.findIndex(d => d.dayNum === activeDay);
                    return (
                      <motion.div
                        key={day.dayNum}
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3 }}
                        className="space-y-6"
                      >
                        <div className="bg-teal-50/50 border border-teal-100/70 p-4 px-6 rounded-2xl flex items-center justify-between">
                          <div>
                            <span className="text-xs text-teal-600 font-extrabold uppercase tracking-wider">Plan of the day</span>
                            <h3 className="font-bold text-slate-800 text-base mt-0.5">{day.title}</h3>
                          </div>
                          <span className="text-xs text-slate-400 font-bold">Timeline view</span>
                        </div>

                        {/* Activities cards list */}
                        <div className="relative border-l-2 border-slate-200 ml-5 pl-8 space-y-8 py-2">
                          {day.activities.map((act, actIdx) => {
                            const isEditing = editingActivity?.dayIndex === actualDayIndex && editingActivity?.actIndex === actIdx;
                            return (
                              <div key={act.slot} className="relative group">
                                
                                {/* Slot Icon Anchor */}
                                <div className="absolute -left-[45px] top-1.5 w-8 h-8 rounded-full bg-white border border-slate-200 shadow-sm flex items-center justify-center z-10">
                                  {getActivityIcon(act.slot)}
                                </div>

                                <div className="bg-white border border-slate-200/60 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all">
                                  
                                  {/* Slot & Time Header */}
                                  <div className="flex justify-between items-start gap-4 mb-2">
                                    <div className="flex items-center gap-2">
                                      <span className="text-xs font-extrabold text-slate-800 uppercase bg-slate-100 px-2.5 py-1 rounded-md">
                                        {act.slot}
                                      </span>
                                      <span className="text-xs text-slate-450 font-bold flex items-center gap-1">
                                        <Clock className="w-3 h-3" /> {act.time}
                                      </span>
                                    </div>
                                    <span className="text-xs font-bold text-teal-600 bg-teal-50 px-2 py-0.5 rounded-full">
                                      Estimated Cost: {act.cost}
                                    </span>
                                  </div>

                                  {/* Title & Location */}
                                  <h4 className="font-extrabold text-slate-800 text-lg mb-1 leading-snug">
                                    {act.title}
                                  </h4>
                                  <div className="flex items-center gap-1 text-slate-400 text-xs font-bold mb-3">
                                    <MapPin className="w-3.5 h-3.5 text-slate-400" /> {act.location}
                                  </div>

                                  {/* Description & Editing field */}
                                  {isEditing ? (
                                    <div className="space-y-2 mt-2">
                                      <textarea 
                                        value={editText}
                                        onChange={(e) => setEditText(e.target.value)}
                                        rows="3"
                                        className="w-full p-3 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-teal-500 focus:border-teal-500 font-medium text-slate-700"
                                      />
                                      <div className="flex gap-2 justify-end">
                                        <button 
                                          onClick={() => setEditingActivity(null)}
                                          className="px-3 py-1.5 text-xs font-bold text-slate-500 hover:text-slate-800 transition-colors border border-slate-250 rounded-lg cursor-pointer"
                                        >
                                          Cancel
                                        </button>
                                        <button 
                                          onClick={saveEditing}
                                          className="px-3 py-1.5 text-xs font-bold bg-teal-500 hover:bg-teal-600 text-white rounded-lg cursor-pointer flex items-center gap-1 shadow-sm"
                                        >
                                          <Check className="w-3.5 h-3.5" /> Save Changes
                                        </button>
                                      </div>
                                    </div>
                                  ) : (
                                    <p className="text-slate-600 text-sm font-medium leading-relaxed">
                                      {act.description}
                                    </p>
                                  )}

                                  {/* Hover Actions */}
                                  {!isEditing && (
                                    <div className="mt-3.5 pt-3 border-t border-slate-100 flex justify-between items-center opacity-0 group-hover:opacity-100 transition-opacity">
                                      <span className="text-[10px] text-slate-400 font-bold uppercase">Dynamic Customization</span>
                                      <button 
                                        onClick={() => startEditing(actualDayIndex, actIdx, act.description)}
                                        className="text-xs text-slate-500 hover:text-teal-600 font-bold flex items-center gap-1.5 cursor-pointer bg-slate-50 px-2.5 py-1.5 rounded-lg border border-slate-200 transition-colors hover:bg-teal-50/30"
                                      >
                                        <Edit3 className="w-3.5 h-3.5" /> Edit Description
                                      </button>
                                    </div>
                                  )}

                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </motion.div>
                    );
                  })}
                </div>

                {/* Guide recommendations (Right 1 Col) */}
                <div className="space-y-6 lg:sticky lg:top-[160px]">
                  
                  <div className="bg-white border border-slate-200/60 rounded-3xl p-6 shadow-md">
                    <div className="flex items-center justify-between mb-4 border-b border-slate-100 pb-3">
                      <div>
                        <h3 className="font-extrabold text-slate-800 text-base flex items-center gap-2">
                          <Languages className="w-5 h-5 text-teal-600" /> Recommended Guides
                        </h3>
                        <p className="text-[10px] text-slate-400 font-semibold mt-0.5">Top picks for {itinerary.stateName}</p>
                      </div>
                      <Tag className="w-4 h-4 text-teal-500" />
                    </div>

                    <div className="space-y-4">
                      {recommendedGuides.map((guide) => (
                        <div 
                          key={guide.id}
                          className="flex gap-4 p-3 rounded-2xl border border-slate-100 hover:border-slate-200 transition-all bg-slate-50/50"
                        >
                          <img 
                            src={guide.image} 
                            alt={guide.name} 
                            className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm flex-shrink-0"
                          />
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center justify-between gap-1">
                              <h4 className="font-extrabold text-sm text-slate-850 truncate">{guide.name}</h4>
                              <div className="flex items-center gap-0.5 text-xs text-amber-500 font-bold">
                                <Star className="w-3 h-3 fill-amber-500" /> {guide.rating}
                              </div>
                            </div>
                            <p className="text-[11px] text-slate-400 font-bold truncate uppercase tracking-wider">{guide.role}</p>
                            <p className="text-[11px] text-slate-500 font-medium mt-1 truncate">
                              Languages: {guide.languages.join(', ')}
                            </p>
                            
                            <div className="mt-2.5 flex items-center justify-between border-t border-slate-100 pt-2.5">
                              <span className="text-xs font-bold text-slate-700">${guide.price}/hr</span>
                              <Link 
                                to={`/guide/${guide.id}`}
                                className="text-xs text-teal-600 font-bold flex items-center gap-1 hover:text-teal-700"
                              >
                                View Profile <ExternalLink className="w-3 h-3" />
                              </Link>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-5 pt-1">
                      <Link 
                        to={`/search?location=${encodeURIComponent(itinerary.stateName)}`}
                        className="w-full flex items-center justify-center gap-2 bg-teal-500/10 hover:bg-teal-500/20 text-teal-700 font-extrabold text-xs py-3 rounded-xl transition-all"
                      >
                        Search All Guides in {itinerary.stateName} <ChevronRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>

                  {/* Safety note / general tips card */}
                  <div className="bg-gradient-to-br from-slate-850 to-slate-950 text-white rounded-3xl p-6 shadow-md relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-teal-500/10 rounded-full blur-2xl -mr-8 -mt-8"></div>
                    <h3 className="font-extrabold text-sm uppercase tracking-wider text-teal-400 mb-2">Smart Travel Advice</h3>
                    <p className="text-xs text-slate-350 leading-relaxed font-medium">
                      Ensure temple access matches early hours. Book licensed guides from GuideConnect for verified entry privileges. Remember to download this offline before starting.
                    </p>
                  </div>

                </div>

              </div>
              
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
