import { useState } from 'react';
import { Search, Calendar, Users, SlidersHorizontal, Check, Star, MapPin, Sparkles, Play, ShieldAlert, ArrowRight, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Mock hotel database
const MOCK_HOTELS = [
  {
    id: 1,
    name: 'Ajwa Hotel Sultanahmet',
    location: 'Istanbul, Turkey',
    rating: 4.9,
    reviews: 142,
    price: 320,
    image: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=800&q=80',
    tags: ['Alcohol-Free', 'Halal Food', 'Prayer Facilities'],
    description: 'Experience 5-star Ottoman luxury with custom prayer rugs, Qibla indicators, and fully verified halal cuisine.',
  },
  {
    id: 2,
    name: 'Conrad Makkah Jabal Omar',
    location: 'Makkah, Saudi Arabia',
    rating: 4.8,
    reviews: 912,
    price: 450,
    image: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=800&q=80',
    tags: ['Prayer Facilities', 'Halal Food', 'Umrah Friendly'],
    description: 'Located in the heart of Makkah, offering breathtaking Haram views and dedicated Islamic hospitality services.',
  },
  {
    id: 3,
    name: 'Adenya Hotel & Resort',
    location: 'Antalya, Turkey',
    rating: 4.7,
    reviews: 324,
    price: 280,
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80',
    tags: ['Women-Only Pools', 'Alcohol-Free', 'Halal Food'],
    description: 'An elite beach resort featuring dedicated ladies-only private beaches, pools, and wellness sanctuaries.',
  },
  {
    id: 4,
    name: 'Dar Al Taqwa Hotel',
    location: 'Madinah, Saudi Arabia',
    rating: 4.9,
    reviews: 580,
    price: 380,
    image: 'https://images.unsplash.com/photo-1597843797221-72218451897e?auto=format&fit=crop&w=800&q=80',
    tags: ['Prayer Facilities', 'Halal Food', 'Steps to Nabawi'],
    description: 'Overlooking Al-Masjid an-Nabawi courtyard, offering premium spiritual convenience and refined service.',
  },
  {
    id: 5,
    name: 'Jumeirah Dar Al Masyaf',
    location: 'Dubai, UAE',
    rating: 4.9,
    reviews: 410,
    price: 650,
    image: 'https://images.unsplash.com/photo-1582672093685-704155248536?auto=format&fit=crop&w=800&q=80',
    tags: ['Private Villas', 'Halal Food', 'Prayer Facilities'],
    description: 'Exquisite Arabian-style summerhouses featuring private butler services, serene waterways, and bespoke privacy.',
  },
  {
    id: 6,
    name: 'Grand Hyatt Kuala Lumpur',
    location: 'Kuala Lumpur, Malaysia',
    rating: 4.8,
    reviews: 730,
    price: 210,
    image: 'https://images.unsplash.com/photo-1595497743400-13f224327363?auto=format&fit=crop&w=800&q=80',
    tags: ['Halal Food', 'Prayer Facilities'],
    description: 'Unmatched Petronas Twin Towers views, with proximity to Islamic cultural centers and verified halal culinary experiences.',
  }
];

const DESTINATION_SUGGESTIONS = ['Makkah', 'Madinah', 'Istanbul', 'Antalya', 'Dubai', 'Kuala Lumpur'];

export default function Hero() {
  const [destination, setDestination] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(1);
  const [showGuestDropdown, setShowGuestDropdown] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [showDemo, setShowDemo] = useState(false);

  // Filters State
  const [filters, setFilters] = useState({
    halalFood: true,
    womenOnlyPool: false,
    privateVilla: false,
    alcoholFree: true,
    prayerFacilities: false,
  });

  // Search results state
  const [searchResults, setSearchResults] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

  const toggleFilter = (key) => {
    setFilters((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setIsSearching(true);

    setTimeout(() => {
      // Filter logic
      const filtered = MOCK_HOTELS.filter((hotel) => {
        // Destination matching
        const matchesDest =
          !destination ||
          hotel.location.toLowerCase().includes(destination.toLowerCase()) ||
          hotel.name.toLowerCase().includes(destination.toLowerCase());

        // Tag checks
        const hotelTags = hotel.tags.map((t) => t.toLowerCase());
        const foodMatch = !filters.halalFood || hotelTags.includes('halal food');
        const poolMatch = !filters.womenOnlyPool || hotelTags.includes('women-only pools');
        const villaMatch = !filters.privateVilla || hotelTags.includes('private villas');
        const alcoholMatch = !filters.alcoholFree || hotelTags.includes('alcohol-free');
        const prayerMatch = !filters.prayerFacilities || hotelTags.includes('prayer facilities') || hotelTags.some(t => t.includes('haram') || t.includes('nabawi'));

        return matchesDest && foodMatch && poolMatch && villaMatch && alcoholMatch && prayerMatch;
      });

      setSearchResults(filtered);
      setIsSearching(false);
      setHasSearched(true);

      // Scroll to search results smoothly
      const resultsSection = document.getElementById('search-results-section');
      if (resultsSection) {
        resultsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 800);
  };

  return (
    <section className="relative min-h-screen pt-32 pb-24 overflow-hidden islamic-pattern flex flex-col items-center justify-center">
      {/* Decorative Blur Backgrounds */}
      <div className="absolute top-20 left-1/4 w-96 h-96 bg-brand-emerald-200/20 dark:bg-brand-emerald-800/10 rounded-full ambient-glow" />
      <div className="absolute bottom-20 right-1/4 w-[400px] h-[400px] bg-brand-gold-100/30 dark:bg-brand-gold-800/5 rounded-full ambient-glow" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full text-center z-10">
        {/* Luxury Top Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-brand-gold-500/30 bg-brand-gold-50/50 dark:bg-brand-emerald-950/40 backdrop-blur-sm mb-6 cursor-pointer"
        >
          <Sparkles className="w-4 h-4 text-brand-gold-600 dark:text-brand-gold-500" />
          <span className="text-xs font-semibold uppercase tracking-widest text-brand-emerald-800 dark:text-brand-gold-200 font-sans">
            AI-POWERED HALAL HOLIDAYS
          </span>
        </motion.div>

        {/* Main Headings */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-brand-emerald-950 dark:text-white leading-[1.1] mb-6"
        >
          Find Halal-Friendly Hotels <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-emerald-600 via-brand-gold-600 to-brand-emerald-800 dark:from-brand-gold-200 dark:via-brand-gold-500 dark:to-brand-gold-200 font-serif italic font-normal">
            Anywhere
          </span>{' '}
          in the World
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-2xl mx-auto text-lg md:text-xl text-slate-600 dark:text-slate-300 mb-10 leading-relaxed font-sans"
        >
          Discover hotels, villas, and resorts that match your Islamic lifestyle with AI-powered recommendations.
        </motion.p>

        {/* Call to Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
        >
          <a
            href="#explore"
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-brand-emerald-500 hover:bg-brand-emerald-600 dark:bg-brand-gold-500 dark:hover:bg-brand-gold-600 text-white dark:text-brand-emerald-950 font-bold shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 group cursor-pointer"
          >
            Start Exploring
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>
          <button
            onClick={() => setShowDemo(true)}
            className="w-full sm:w-auto px-8 py-4 rounded-full border border-slate-200 dark:border-brand-emerald-800/80 bg-white/70 dark:bg-brand-emerald-950/40 backdrop-blur-md text-slate-700 dark:text-brand-gold-200 hover:text-brand-emerald-600 dark:hover:text-brand-gold-500 font-semibold transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-sm hover:shadow-md"
          >
            <Play className="w-4 h-4 fill-current text-brand-gold-500" />
            Watch Demo
          </button>
        </motion.div>

        {/* Large Interactive Hotel Search Widget */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          id="explore"
          className="max-w-5xl mx-auto p-4 sm:p-6 rounded-3xl border border-slate-200/80 dark:border-brand-emerald-800/30 bg-white/80 dark:bg-brand-emerald-950/40 backdrop-blur-xl shadow-xl dark:shadow-2xl/40 text-left"
        >
          <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
            {/* Destination Input */}
            <div className="relative md:col-span-4 p-3 rounded-2xl hover:bg-slate-100/50 dark:hover:bg-brand-emerald-900/30 transition duration-200 cursor-pointer">
              <label className="block text-xs font-semibold text-brand-gold-600 dark:text-brand-gold-500 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5" /> Destination
              </label>
              <input
                type="text"
                placeholder="Where are you going?"
                value={destination}
                onChange={(e) => {
                  setDestination(e.target.value);
                  setShowSuggestions(true);
                }}
                onFocus={() => setShowSuggestions(true)}
                className="w-full bg-transparent border-none text-slate-900 dark:text-white font-medium placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none text-sm"
              />
              {/* Autocomplete Suggestions */}
              <AnimatePresence>
                {showSuggestions && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute left-0 right-0 mt-3 bg-white dark:bg-brand-emerald-900 border border-slate-200 dark:border-brand-emerald-800 rounded-2xl shadow-xl overflow-hidden z-20"
                  >
                    <div className="p-2">
                      <p className="text-[10px] uppercase font-bold text-slate-400 dark:text-slate-500 px-3 py-1">Popular Islamic Destinations</p>
                      {DESTINATION_SUGGESTIONS.map((city) => (
                        <button
                          key={city}
                          type="button"
                          onClick={() => {
                            setDestination(city);
                            setShowSuggestions(false);
                          }}
                          className="w-full text-left px-3 py-2 text-sm rounded-xl hover:bg-slate-100 dark:hover:bg-brand-emerald-800 text-slate-700 dark:text-slate-200 flex items-center gap-2"
                        >
                          <MapPin className="w-4 h-4 text-brand-gold-500" />
                          {city}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
              {destination && (
                <button
                  type="button"
                  onClick={() => setDestination('')}
                  className="absolute right-3 top-7 p-1 rounded-full text-slate-400 hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-300"
                >
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>

            {/* Check-In Date */}
            <div className="md:col-span-2 p-3 rounded-2xl hover:bg-slate-100/50 dark:hover:bg-brand-emerald-900/30 transition duration-200 cursor-pointer">
              <label className="block text-xs font-semibold text-brand-gold-600 dark:text-brand-gold-500 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" /> Check-in
              </label>
              <input
                type="date"
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
                className="w-full bg-transparent border-none text-slate-900 dark:text-white font-medium focus:outline-none text-sm cursor-pointer"
              />
            </div>

            {/* Check-Out Date */}
            <div className="md:col-span-2 p-3 rounded-2xl hover:bg-slate-100/50 dark:hover:bg-brand-emerald-900/30 transition duration-200 cursor-pointer">
              <label className="block text-xs font-semibold text-brand-gold-600 dark:text-brand-gold-500 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" /> Check-out
              </label>
              <input
                type="date"
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
                className="w-full bg-transparent border-none text-slate-900 dark:text-white font-medium focus:outline-none text-sm cursor-pointer"
              />
            </div>

            {/* Guests Counter */}
            <div className="relative md:col-span-2 p-3 rounded-2xl hover:bg-slate-100/50 dark:hover:bg-brand-emerald-900/30 transition duration-200 cursor-pointer">
              <div onClick={() => setShowGuestDropdown(!showGuestDropdown)}>
                <label className="block text-xs font-semibold text-brand-gold-600 dark:text-brand-gold-500 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5" /> Guests
                </label>
                <div className="text-slate-900 dark:text-white font-medium text-sm">
                  {guests} {guests === 1 ? 'Guest' : 'Guests'}
                </div>
              </div>

              {/* Guest counter popover */}
              <AnimatePresence>
                {showGuestDropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute right-0 mt-3 p-4 bg-white dark:bg-brand-emerald-900 border border-slate-200 dark:border-brand-emerald-800 rounded-2xl shadow-xl w-48 z-20"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-slate-700 dark:text-slate-200">Guests</span>
                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          disabled={guests <= 1}
                          onClick={() => setGuests(g => Math.max(1, g - 1))}
                          className="w-8 h-8 rounded-full border border-slate-250 dark:border-brand-emerald-700 flex items-center justify-center font-bold disabled:opacity-40 text-slate-750 dark:text-slate-200"
                        >
                          -
                        </button>
                        <span className="font-semibold text-slate-900 dark:text-white">{guests}</span>
                        <button
                          type="button"
                          onClick={() => setGuests(g => Math.min(10, g + 1))}
                          className="w-8 h-8 rounded-full border border-slate-250 dark:border-brand-emerald-700 flex items-center justify-center font-bold text-slate-750 dark:text-slate-200"
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setShowGuestDropdown(false)}
                      className="mt-3 w-full py-1.5 text-center text-xs font-semibold bg-brand-emerald-500 text-white rounded-lg hover:bg-brand-emerald-600 dark:bg-brand-gold-500 dark:text-brand-emerald-950"
                    >
                      Done
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Search Submit Button */}
            <div className="md:col-span-2 flex justify-center items-center">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isSearching}
                className="w-full h-12 rounded-2xl bg-brand-emerald-500 dark:bg-brand-gold-500 text-white dark:text-brand-emerald-950 flex items-center justify-center gap-2 font-bold shadow-lg cursor-pointer hover:shadow-brand-gold-500/20"
              >
                {isSearching ? (
                  <div className="w-5 h-5 border-2 border-white dark:border-brand-emerald-950 border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <Search className="w-4 h-4" />
                    <span>Search</span>
                  </>
                )}
              </motion.button>
            </div>
          </form>

          {/* Halal Filters Toggle Header */}
          <div className="mt-4 pt-4 border-t border-slate-100 dark:border-brand-emerald-900/60 flex flex-wrap items-center justify-between gap-4">
            <button
              type="button"
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 text-xs font-bold text-brand-emerald-700 dark:text-brand-gold-500 hover:opacity-85 transition cursor-pointer"
            >
              <SlidersHorizontal className="w-4 h-4" />
              {showFilters ? 'Hide Halal Filters' : 'Show Halal Filters'}
              {Object.values(filters).filter(Boolean).length > 0 && (
                <span className="ml-1 bg-brand-emerald-100 dark:bg-brand-emerald-800 text-brand-emerald-800 dark:text-brand-gold-100 text-[10px] px-1.5 py-0.5 rounded-full">
                  {Object.values(filters).filter(Boolean).length} Active
                </span>
              )}
            </button>
            <div className="flex items-center gap-1.5 text-xs text-slate-450 dark:text-slate-400">
              <Check className="w-3.5 h-3.5 text-brand-gold-500" />
              100% Shariah Compliant Bookings
            </div>
          </div>

          {/* Halal Filters Expandable Panel */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                <div className="pt-4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
                  {[
                    { key: 'halalFood', label: 'Halal Food Verified', desc: 'Strictly halal ingredients' },
                    { key: 'womenOnlyPool', label: 'Women-Only Pools', desc: '100% privacy guaranteed' },
                    { key: 'privateVilla', label: 'Private Villas', desc: 'No overlooking neighbors' },
                    { key: 'alcoholFree', label: 'Alcohol-Free Hotel', desc: 'Family-friendly environment' },
                    { key: 'prayerFacilities', label: 'Prayer Facilities', desc: 'Prayer rug & Qibla signs' },
                  ].map((filter) => (
                    <button
                      key={filter.key}
                      type="button"
                      onClick={() => toggleFilter(filter.key)}
                      className={`p-3 rounded-2xl border text-left transition-all duration-200 cursor-pointer flex flex-col justify-between h-20 ${
                        filters[filter.key]
                          ? 'border-brand-gold-500 bg-brand-gold-50/60 dark:bg-brand-gold-500/10'
                          : 'border-slate-200 dark:border-brand-emerald-900/60 hover:bg-slate-100/40 dark:hover:bg-brand-emerald-900/10'
                      }`}
                    >
                      <span className="flex items-center justify-between w-full">
                        <span className="text-xs font-bold text-slate-800 dark:text-slate-200">{filter.label}</span>
                        {filters[filter.key] && <Check className="w-3.5 h-3.5 text-brand-gold-600 dark:text-brand-gold-500" />}
                      </span>
                      <span className="text-[10px] text-slate-400 dark:text-slate-500 leading-tight block mt-1">{filter.desc}</span>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* dynamic interactive search results container */}
        <div id="search-results-section" className="scroll-mt-28">
          <AnimatePresence>
            {hasSearched && (
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 40 }}
                transition={{ type: 'spring', damping: 25, stiffness: 100 }}
                className="max-w-5xl mx-auto mt-16 text-left"
              >
                <div className="flex items-center justify-between mb-8 border-b border-slate-200/50 dark:border-brand-emerald-800/20 pb-4">
                  <div>
                    <h3 className="text-2xl font-bold font-serif text-brand-emerald-950 dark:text-white">
                      Available Halal Stays
                    </h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                      Showing {searchResults.length} properties matching your Islamic criteria
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setHasSearched(false);
                      setDestination('');
                    }}
                    className="text-xs font-semibold text-slate-400 hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-350 cursor-pointer"
                  >
                    Clear Search
                  </button>
                </div>

                {searchResults.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {searchResults.map((hotel, index) => (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        key={hotel.id}
                        className="rounded-3xl overflow-hidden border border-slate-200/70 dark:border-brand-emerald-800/30 bg-white dark:bg-brand-emerald-950/20 backdrop-blur-sm group hover:shadow-xl dark:hover:shadow-brand-emerald-900/10 transition-all duration-300 flex flex-col h-full"
                      >
                        <div className="relative aspect-video overflow-hidden">
                          <img
                            src={hotel.image}
                            alt={hotel.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          <div className="absolute top-3 right-3 px-2 py-1 rounded-full bg-white/90 dark:bg-brand-emerald-900/90 backdrop-blur-sm text-xs font-bold text-slate-900 dark:text-brand-gold-500 flex items-center gap-1">
                            <Star className="w-3.5 h-3.5 fill-current text-yellow-500" />
                            {hotel.rating}
                          </div>
                        </div>
                        <div className="p-5 flex flex-col justify-between flex-grow">
                          <div>
                            <div className="flex items-center gap-1 text-[11px] font-semibold text-brand-gold-600 dark:text-brand-gold-500 uppercase tracking-wider mb-2">
                              <MapPin className="w-3 h-3" />
                              {hotel.location}
                            </div>
                            <h4 className="text-lg font-bold text-brand-emerald-950 dark:text-white mb-2 leading-tight group-hover:text-brand-emerald-700 dark:group-hover:text-brand-gold-500 transition-colors">
                              {hotel.name}
                            </h4>
                            <p className="text-xs text-slate-500 dark:text-slate-400 mb-4 line-clamp-2">
                              {hotel.description}
                            </p>
                          </div>
                          <div>
                            <div className="flex flex-wrap gap-1.5 mb-4">
                              {hotel.tags.map((tag) => (
                                <span
                                  key={tag}
                                  className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-brand-emerald-50 dark:bg-brand-emerald-900/40 text-brand-emerald-800 dark:text-brand-gold-200 border border-brand-emerald-100/30 dark:border-brand-emerald-800/30"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                            <div className="flex items-center justify-between border-t border-slate-100 dark:border-brand-emerald-900/30 pt-3">
                              <div>
                                <span className="text-xs text-slate-400 dark:text-slate-500">from </span>
                                <span className="text-lg font-extrabold text-brand-emerald-950 dark:text-white">
                                  ${hotel.price}
                                </span>
                                <span className="text-xs text-slate-400 dark:text-slate-500">/night</span>
                              </div>
                              <button
                                type="button"
                                className="px-4 py-2 rounded-xl bg-brand-emerald-500 hover:bg-brand-emerald-600 dark:bg-brand-gold-500 dark:hover:bg-brand-gold-600 text-white dark:text-brand-emerald-950 text-xs font-bold shadow-sm transition cursor-pointer"
                              >
                                Book Now
                              </button>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <div className="p-12 text-center rounded-3xl border border-dashed border-slate-200 dark:border-brand-emerald-800/40 bg-white/40 dark:bg-brand-emerald-950/10 flex flex-col items-center">
                    <ShieldAlert className="w-12 h-12 text-brand-gold-500 mb-4" />
                    <h4 className="text-lg font-bold text-slate-800 dark:text-slate-200 mb-1">
                      No Exact Matches Found
                    </h4>
                    <p className="text-sm text-slate-500 dark:text-slate-400 max-w-sm mx-auto mb-6">
                      Try relaxing your halal filters or search for popular cities like "Istanbul" or "Makkah" to find properties.
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        setFilters({
                          halalFood: true,
                          womenOnlyPool: false,
                          privateVilla: false,
                          alcoholFree: false,
                          prayerFacilities: false,
                        });
                        setDestination('');
                      }}
                      className="px-5 py-2.5 rounded-xl bg-brand-emerald-500 text-white text-xs font-semibold hover:bg-brand-emerald-600 cursor-pointer"
                    >
                      Reset Filters & Search Again
                    </button>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Watch Demo Modal */}
      <AnimatePresence>
        {showDemo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="relative w-full max-w-4xl bg-brand-emerald-950 rounded-3xl border border-brand-gold-500/20 overflow-hidden shadow-2xl"
            >
              {/* Close Button */}
              <button
                onClick={() => setShowDemo(false)}
                className="absolute top-4 right-4 p-2 rounded-full bg-black/60 text-white hover:bg-black/80 transition z-10 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              {/* High Fidelity Mock Video Area */}
              <div className="aspect-video relative bg-slate-900 flex flex-col items-center justify-center p-8 text-center text-white">
                <div className="absolute inset-0 opacity-40 bg-[url('https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80')] bg-cover bg-center" />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-emerald-950 via-brand-emerald-950/80 to-transparent" />
                <div className="relative z-10">
                  <div className="w-16 h-16 rounded-full bg-brand-gold-500 text-brand-emerald-950 flex items-center justify-center mx-auto mb-6 shadow-lg shadow-brand-gold-500/20 animate-pulse">
                    <Play className="w-6 h-6 fill-current translate-x-0.5" />
                  </div>
                  <h4 className="font-accent text-2xl font-bold tracking-wider mb-2">
                    Discover Muslim<span className="text-brand-gold-500 font-serif italic">Stay</span>
                  </h4>
                  <p className="text-sm text-slate-300 max-w-md mx-auto mb-6">
                    A walkthrough of the AI Muslim Travel Companion and how we verify ladies-only pools, verified halal dining, and private villas.
                  </p>
                  <span className="text-xs font-semibold px-3 py-1 rounded-full border border-brand-gold-500/30 text-brand-gold-300 uppercase tracking-widest bg-brand-gold-500/10">
                    Video Demo Simulation
                  </span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
