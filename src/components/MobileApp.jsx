import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { 
  Smartphone, 
  CheckCircle2, 
  Home, 
  Search, 
  Heart, 
  User, 
  MapPin, 
  Star, 
  ChevronLeft, 
  ShieldCheck, 
  ChevronRight, 
  Compass, 
  Award,
  BellRing
} from 'lucide-react';

const mockHotels = [
  { 
    id: 1, 
    name: 'Royal Mansour', 
    location: 'Marrakech, Morocco', 
    price: 450, 
    rating: 4.9, 
    image: '/hotel-morocco.png', 
    features: ['Private Pool', 'Halal Food', 'Women-Only Spa'] 
  },
  { 
    id: 2, 
    name: 'Conrad Makkah', 
    location: 'Makkah, Saudi Arabia', 
    price: 320, 
    rating: 4.8, 
    image: '/hotel-umrah.png', 
    features: ['Haram View', 'Halal Food', 'Steps to Haram'] 
  },
  { 
    id: 3, 
    name: 'Banyan Tree', 
    location: 'Kuala Lumpur, Malaysia', 
    price: 210, 
    rating: 4.9, 
    image: '/hotel-malaysia.png', 
    features: ['Alcohol-Free', 'Halal Food', 'Prayer Mat'] 
  },
];

// ── HOME TAB ──────────────────────────────────────────────────────────
const HomeTab = ({ onSelectHotel, savedHotels, onSearchClick }) => (
  <div>
    {/* Edge to Edge Hero */}
    <div className="relative h-[220px] w-full shrink-0">
      <img src="/hotel-istanbul.png" alt="Hero" className="w-full h-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/20 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-50 dark:from-slate-900 via-slate-50/20 dark:via-slate-900/20 to-transparent" />
      
      {/* Header Info */}
      <div className="absolute top-12 left-0 w-full px-5 flex justify-between items-start z-10">
        <div>
          <p className="text-white/80 text-[9px] font-bold tracking-widest uppercase mb-0.5">Welcome back</p>
          <h2 className="text-white text-lg font-bold leading-tight">Discover<br/>Halal Stays</h2>
        </div>
        <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30 shadow-lg overflow-hidden">
          <img src="/logo.png" alt="Logo" className="h-4 brightness-0 invert object-contain" />
        </div>
      </div>

      {/* Floating Search Widget */}
      <div 
        onClick={onSearchClick}
        className="absolute -bottom-6 left-5 right-5 bg-white dark:bg-slate-800 rounded-xl shadow-md p-3 flex items-center gap-3 border border-slate-100 dark:border-slate-700 z-20 cursor-pointer active:scale-98 hover:border-brand-gold-500/30 transition-all"
      >
        <div className="w-8 h-8 rounded-full bg-brand-emerald-50 dark:bg-slate-700 flex items-center justify-center shrink-0">
          <Search className="w-4 h-4 text-brand-emerald-600 dark:text-brand-gold-450" />
        </div>
        <div className="flex-1 text-left">
          <p className="text-[8px] font-bold text-slate-400 uppercase tracking-wider">Destination</p>
          <p className="text-xs font-semibold text-slate-800 dark:text-white leading-none mt-0.5">Where to next?</p>
        </div>
      </div>
    </div>

    {/* Featured Carousel */}
    <div className="mt-10 px-5 pb-6">
      <div className="flex justify-between items-end mb-3">
        <h3 className="text-sm font-extrabold text-slate-900 dark:text-white uppercase tracking-wider text-[11px]">Featured Luxury</h3>
        <button onClick={onSearchClick} className="text-[10px] font-bold text-brand-emerald-600 dark:text-brand-gold-450 uppercase">See All</button>
      </div>

      <div className="flex gap-4 overflow-x-auto snap-x scrollbar-hide pb-2 -mx-5 px-5">
        {mockHotels.map(hotel => {
          const isSaved = savedHotels.includes(hotel.id);
          return (
            <div 
              key={hotel.id} 
              onClick={() => onSelectHotel(hotel)} 
              className="snap-start shrink-0 w-[200px] bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700/60 overflow-hidden cursor-pointer transform active:scale-95 transition-all hover:shadow-md relative"
            >
              <div className="h-28 w-full relative">
                <img src={hotel.image} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-60" />
                <div className="absolute top-2 right-2 bg-white/95 backdrop-blur-md px-1.5 py-0.5 rounded-md flex items-center gap-0.5 shadow-sm">
                  <Star className="w-2.5 h-2.5 text-brand-gold-500 fill-current" />
                  <span className="text-[9px] font-bold text-slate-900">{hotel.rating}</span>
                </div>
                {isSaved && (
                  <div className="absolute top-2 left-2 bg-red-500/90 backdrop-blur-md p-1 rounded-full text-white shadow-sm">
                    <Heart className="w-2.5 h-2.5 fill-current" />
                  </div>
                )}
              </div>
              <div className="p-3">
                <h4 className="font-bold text-xs text-slate-900 dark:text-white truncate">{hotel.name}</h4>
                <div className="flex items-center gap-0.5 text-slate-400 dark:text-slate-500 mt-0.5 mb-2">
                  <MapPin className="w-2.5 h-2.5 shrink-0" />
                  <p className="text-[9px] truncate">{hotel.location}</p>
                </div>
                <div className="flex items-baseline gap-0.5">
                  <span className="font-bold text-xs text-brand-emerald-600 dark:text-brand-gold-450">${hotel.price}</span>
                  <span className="text-[8px] text-slate-455 dark:text-slate-500 font-medium">/night</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  </div>
);

// ── SEARCH TAB ────────────────────────────────────────────────────────
const SearchTab = ({ onSelectHotel, savedHotels, searchQuery, setSearchQuery, activeFilter, setActiveFilter }) => {
  const filteredHotels = mockHotels.filter(hotel => {
    const matchesSearch = 
      hotel.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      hotel.location.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesFilter = 
      activeFilter === 'All' || 
      hotel.features.some(f => f.toLowerCase() === activeFilter.toLowerCase());
    
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="p-5 pt-12 pb-24">
      <h2 className="text-xl font-extrabold text-slate-900 dark:text-white mb-4">Explore Stays</h2>
      
      {/* Dynamic Search Bar */}
      <div className="bg-white dark:bg-slate-800 rounded-xl p-2.5 flex items-center gap-2 mb-4 shadow-sm border border-slate-200 dark:border-slate-700/60 focus-within:border-brand-gold-500/65 transition-all">
        <Search className="w-4 h-4 text-slate-400 shrink-0" />
        <input 
          type="text" 
          placeholder="Search destinations..." 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="bg-transparent border-none outline-none text-xs font-semibold text-slate-900 dark:text-white w-full placeholder:text-slate-400 focus:ring-0" 
        />
        {searchQuery && (
          <button 
            onClick={() => setSearchQuery('')}
            className="text-[9px] font-extrabold uppercase text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition px-1"
          >
            Clear
          </button>
        )}
      </div>

      {/* Filter Badges */}
      <div className="flex gap-1.5 overflow-x-auto scrollbar-hide pb-2 mb-4 -mx-5 px-5">
        {['All', 'Private Pool', 'Alcohol-Free', 'Women-Only Spa'].map((filter) => {
          const isSelected = activeFilter === filter;
          return (
            <button 
              key={filter} 
              onClick={() => setActiveFilter(filter)}
              className={`whitespace-nowrap px-3 py-1.5 rounded-full text-[10px] font-bold transition-all cursor-pointer ${
                isSelected 
                  ? 'bg-slate-900 text-white dark:bg-brand-gold-500 dark:text-slate-900 shadow-sm' 
                  : 'bg-white dark:bg-slate-800 text-slate-550 dark:text-slate-350 border border-slate-200 dark:border-slate-700'
              }`}
            >
              {filter}
            </button>
          );
        })}
      </div>

      {/* Hotel Cards List */}
      <div className="flex flex-col gap-3">
        {filteredHotels.length === 0 ? (
          <div className="text-center py-12 text-slate-400 dark:text-slate-500 flex flex-col items-center">
            <div className="w-9 h-9 rounded-full border border-dashed border-slate-300 dark:border-slate-700 flex items-center justify-center mb-2">
              <Search className="w-4 h-4 text-slate-300 dark:text-slate-700" />
            </div>
            <p className="text-xs font-bold mb-0.5">No stays matched</p>
            <p className="text-[9px] text-slate-405 dark:text-slate-505 leading-relaxed max-w-[180px]">
              Try searching a different keyword or relaxing the selected category filter.
            </p>
          </div>
        ) : (
          filteredHotels.map(hotel => {
            const isSaved = savedHotels.includes(hotel.id);
            return (
              <div 
                key={hotel.id} 
                onClick={() => onSelectHotel(hotel)} 
                className="flex gap-3 bg-white dark:bg-slate-800 rounded-xl p-2 shadow-sm border border-slate-100 dark:border-slate-700/60 cursor-pointer active:scale-95 transition-all hover:shadow-md relative"
              >
                <div className="w-16 h-16 rounded-lg overflow-hidden shrink-0 relative">
                   <img src={hotel.image} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 py-0.5 flex flex-col justify-center">
                  <div className="flex justify-between items-start mb-0.5">
                    <h4 className="font-bold text-xs text-slate-900 dark:text-white leading-tight">{hotel.name}</h4>
                    <div className="flex items-center gap-0.5 text-brand-gold-500">
                      <Star className="w-2.5 h-2.5 fill-current" />
                      <span className="text-[9px] font-bold text-slate-700 dark:text-white">{hotel.rating}</span>
                    </div>
                  </div>
                  <p className="text-[9px] text-slate-405 dark:text-slate-505 flex items-center gap-0.5"><MapPin className="w-2.5 h-2.5"/> {hotel.location}</p>
                  <div className="mt-1 flex items-baseline gap-0.5">
                    <span className="text-xs font-bold text-brand-emerald-600 dark:text-brand-gold-450">${hotel.price}</span>
                    <span className="text-[8px] text-slate-400 dark:text-slate-500 font-medium">/night</span>
                  </div>
                </div>
                {isSaved && (
                  <div className="absolute bottom-2 right-2 bg-red-500/10 p-1 rounded-full text-red-500">
                    <Heart className="w-3 h-3 fill-current animate-pulse" />
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

// ── SAVED TAB ────────────────────────────────────────────────────────
const SavedTab = ({ onSelectHotel, savedHotels }) => {
  const savedList = mockHotels.filter(h => savedHotels.includes(h.id));

  return (
    <div className="p-5 pt-12 pb-24">
      <h2 className="text-xl font-extrabold text-slate-900 dark:text-white mb-4">Saved Stays</h2>
      
      {savedList.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center text-slate-400 dark:text-slate-500">
          <div className="w-12 h-12 rounded-full border-2 border-dashed border-slate-350 dark:border-slate-700 flex items-center justify-center mb-3">
            <Heart className="w-5 h-5 text-slate-350 dark:text-slate-700" />
          </div>
          <p className="text-xs font-bold mb-1">Your wishlist is empty</p>
          <p className="text-[10px] text-slate-405 leading-relaxed max-w-[180px]">Tap the heart icon on any luxury stay to save it here.</p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {savedList.map(hotel => (
            <div 
              key={hotel.id} 
              onClick={() => onSelectHotel(hotel)} 
              className="flex gap-3 bg-white dark:bg-slate-800 rounded-xl p-2 shadow-sm border border-slate-100 dark:border-slate-700/60 cursor-pointer active:scale-95 transition-all hover:shadow-md"
            >
              <div className="w-16 h-16 rounded-lg overflow-hidden shrink-0 relative">
                 <img src={hotel.image} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 py-0.5 flex flex-col justify-center">
                <div className="flex justify-between items-start mb-0.5">
                  <h4 className="font-bold text-xs text-slate-900 dark:text-white leading-tight">{hotel.name}</h4>
                  <div className="flex items-center gap-0.5 text-red-500">
                    <Heart className="w-3 h-3 fill-current" />
                  </div>
                </div>
                <p className="text-[9px] text-slate-405 dark:text-slate-500 flex items-center gap-0.5"><MapPin className="w-2.5 h-2.5"/> {hotel.location}</p>
                <div className="mt-1 flex items-baseline gap-0.5">
                  <span className="text-xs font-bold text-brand-emerald-600 dark:text-brand-gold-450">${hotel.price}</span>
                  <span className="text-[8px] text-slate-400 dark:text-slate-500 font-medium">/night</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// ── PROFILE TAB ───────────────────────────────────────────────────────
const ProfileTab = () => (
  <div className="p-5 pt-12 pb-24">
    {/* Profile Card Header */}
    <div className="flex items-center gap-3.5 mb-6 bg-gradient-to-br from-brand-emerald-800 to-brand-emerald-950 dark:from-brand-gold-500/10 dark:to-brand-gold-500/5 p-4 rounded-2xl border border-brand-emerald-500/20 dark:border-brand-gold-500/15 relative overflow-hidden shadow-inner">
      <div className="absolute -top-10 -right-10 w-24 h-24 bg-brand-gold-500/10 rounded-full blur-xl pointer-events-none" />
      <div className="w-10 h-10 rounded-full bg-brand-gold-500/20 dark:bg-brand-gold-500/35 border border-brand-gold-500/50 flex items-center justify-center font-bold text-brand-gold-300 dark:text-brand-gold-200">
        IK
      </div>
      <div>
        <h3 className="text-xs font-bold text-white tracking-wide">Issam Kebdani</h3>
        <p className="text-[9px] text-brand-gold-400 font-semibold flex items-center gap-0.5 mt-0.5">
          <Award className="w-3 h-3" /> Elite Gold Member
        </p>
      </div>
    </div>

    {/* Loyalty Program Progress */}
    <div className="bg-white dark:bg-slate-800 rounded-xl p-4 border border-slate-100 dark:border-slate-700/60 mb-5 shadow-2xs">
      <div className="flex justify-between items-center mb-2">
        <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">HalalMiles Balance</span>
        <span className="text-xs font-extrabold text-brand-emerald-600 dark:text-brand-gold-450">14,500 Miles</span>
      </div>
      
      {/* Progress Bar */}
      <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden mb-1.5">
        <div className="h-full bg-gradient-to-r from-brand-gold-600 to-brand-gold-400 dark:from-brand-gold-500 dark:to-brand-gold-300 rounded-full w-[72.5%]" />
      </div>
      
      <div className="flex justify-between items-center text-[8px] text-slate-405 dark:text-slate-500 font-medium">
        <span>Silver Tier</span>
        <span>Next Reward: Platinum (20k Miles)</span>
      </div>
    </div>

    {/* Verified Travel Badges */}
    <h4 className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mb-2 px-1">Compliance Preferences</h4>
    <div className="grid grid-cols-2 gap-2 mb-5">
      <div className="bg-slate-100/50 dark:bg-slate-800 p-2.5 rounded-xl border border-slate-200/20 dark:border-slate-700/40 flex items-center gap-2">
        <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
        <span className="text-[9px] font-bold text-slate-700 dark:text-slate-350">Shariah Compliant</span>
      </div>
      <div className="bg-slate-100/50 dark:bg-slate-800 p-2.5 rounded-xl border border-slate-200/20 dark:border-slate-700/40 flex items-center gap-2">
        <Compass className="w-4 h-4 text-brand-gold-550 dark:text-brand-gold-450 shrink-0" />
        <span className="text-[9px] font-bold text-slate-700 dark:text-slate-350">Qibla & Rug Provided</span>
      </div>
    </div>

    {/* Menu Items */}
    <div className="flex flex-col bg-white dark:bg-slate-800 rounded-xl overflow-hidden border border-slate-100 dark:border-slate-700/60 divide-y divide-slate-100 dark:divide-slate-700/40">
      {[
        { label: 'My Bookings (3 Active)', badge: 'New' },
        { label: 'Earn Rewards & Flight Partners' },
        { label: 'Privacy & Seclusion Setup' },
        { label: 'Contact Halal Concierge' }
      ].map((item, i) => (
        <div key={i} className="flex justify-between items-center p-3 text-xs font-semibold text-slate-750 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-750/30 cursor-pointer transition">
          <span className="flex items-center gap-1.5">
            {item.label}
            {item.badge && (
              <span className="bg-brand-emerald-500 text-white text-[8px] font-bold px-1.5 py-0.5 rounded-full uppercase scale-90">
                {item.badge}
              </span>
            )}
          </span>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        </div>
      ))}
    </div>
  </div>
);

// ── HOTEL DETAIL ──────────────────────────────────────────────────────
const HotelDetail = ({ hotel, onBack, onToggleSave, isSaved }) => {
  const [isBooking, setIsBooking] = useState(false);

  const handleBook = () => {
    setIsBooking(true);
    setTimeout(() => {
      setIsBooking(false);
      onBack(true); // Trigger successful booking and exit
    }, 1500);
  };

  return (
    <div className="flex flex-col h-full bg-white dark:bg-slate-900 select-none">
      {/* Full bleed image */}
      <div className="relative h-[240px] w-full shrink-0">
        <img src={hotel.image} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
        
        <button onClick={() => onBack(false)} className="absolute top-12 left-5 w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30 text-white z-20 transition-all active:scale-90 animate-pulse">
          <ChevronLeft className="w-5 h-5" />
        </button>

        <button onClick={() => onToggleSave(hotel.id)} className="absolute top-12 right-5 w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30 text-white z-20 transition-all active:scale-90">
          <Heart className={`w-4 h-4 ${isSaved ? 'fill-red-500 text-red-500' : 'text-white'}`} />
        </button>

        <div className="absolute bottom-4 left-5 right-5 text-white">
          <h2 className="text-lg font-extrabold leading-tight mb-0.5">{hotel.name}</h2>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-0.5 text-white/95">
              <MapPin className="w-3.5 h-3.5" />
              <p className="text-[10px] font-medium">{hotel.location}</p>
            </div>
            <div className="flex items-center gap-0.5 bg-white/20 backdrop-blur-md px-1.5 py-0.5 rounded-md text-white border border-white/20">
              <Star className="w-3 h-3 text-brand-gold-400 fill-current" />
              <span className="text-[9px] font-bold">{hotel.rating}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 px-5 pt-4 pb-28 overflow-y-auto scrollbar-hide">
        <h3 className="text-[11px] font-extrabold text-slate-400 uppercase tracking-widest mb-2">Halal Amenities</h3>
        <div className="flex flex-wrap gap-1.5 mb-5">
          {hotel.features.map(f => (
            <span key={f} className="px-2 py-1 bg-brand-emerald-50 dark:bg-brand-emerald-900/20 text-brand-emerald-700 dark:text-brand-emerald-300 border border-brand-emerald-100/40 dark:border-brand-emerald-800/40 rounded-lg text-[9px] font-bold flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3 text-emerald-500" /> {f}
            </span>
          ))}
        </div>

        <h3 className="text-[11px] font-extrabold text-slate-405 uppercase tracking-widest mb-1.5">Description</h3>
        <p className="text-[11.5px] text-slate-655 dark:text-slate-400 leading-relaxed font-medium">
          Experience world-class hospitality tailored specifically to your values. Verified ladies-only zones, halal certified dining, and complete family-friendly environments mapped by our compliance team.
        </p>
      </div>

      {/* Sticky Bottom Book Bar */}
      <div className="absolute bottom-0 w-full bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border-t border-slate-100 dark:border-slate-800/60 p-4 pb-7 flex justify-between items-center z-30 shadow-md">
        <div>
          <p className="text-[8px] text-slate-405 uppercase tracking-widest font-bold mb-0.5">Total Price</p>
          <div className="flex items-baseline gap-0.5">
            <span className="font-extrabold text-lg text-slate-900 dark:text-white">${hotel.price}</span>
            <span className="text-[9px] text-slate-405 font-medium">/night</span>
          </div>
        </div>
        <button 
          onClick={handleBook}
          disabled={isBooking}
          className="bg-brand-emerald-600 hover:bg-brand-emerald-700 dark:bg-brand-gold-500 dark:text-brand-emerald-950 px-6 py-2.5 rounded-xl font-bold shadow-md text-white text-xs transition-transform active:scale-95 flex items-center gap-1.5 cursor-pointer"
        >
          {isBooking ? (
            <div className="w-4 h-4 border-2 border-white dark:border-brand-emerald-950 border-t-transparent rounded-full animate-spin" />
          ) : (
            'Book Stay'
          )}
        </button>
      </div>
    </div>
  );
};

// ── MOCK SCREEN CONTAINER WITH DYNAMIC ISLAND ─────────────────────────
const MockAppScreen = ({ savedHotels, onToggleSave, triggerIsland, islandState, islandText }) => {
  const [activeTab, setActiveTab] = useState('home');
  const [selectedHotel, setSelectedHotel] = useState(null);

  // Search and category states inside the app preview
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');

  const handleBackFromDetail = (wasBooked) => {
    setSelectedHotel(null);
    if (wasBooked) {
      triggerIsland('booked', 'Booking Confirmed! 🎉');
    }
  };

  const handleHomeSearchClick = () => {
    setActiveTab('search');
    setActiveFilter('All');
    setSearchQuery('');
  };

  return (
    <div className="relative z-10 mx-auto w-[280px] h-[570px] bg-slate-50 dark:bg-slate-900 rounded-[3rem] border-[9px] border-slate-950 dark:border-slate-850 overflow-hidden shadow-2xl flex flex-col font-sans select-none ring-4 ring-slate-950/20 dark:ring-white/5">
      
      {/* 1. Status Bar Panel */}
      <div className="absolute top-0 left-0 w-full h-11 px-5 pt-3.5 flex justify-between items-center text-[9px] font-bold text-slate-800 dark:text-slate-200 z-40 select-none pointer-events-none">
        <span>9:41</span>
        <div className="flex items-center gap-1">
          {/* Signal */}
          <svg className="w-2.5 h-2.5 fill-current" viewBox="0 0 120 120">
            <rect x="10" y="80" width="15" height="30" rx="3" />
            <rect x="35" y="60" width="15" height="50" rx="3" />
            <rect x="60" y="40" width="15" height="70" rx="3" />
            <rect x="85" y="15" width="15" height="95" rx="3" />
          </svg>
          {/* WiFi */}
          <svg className="w-2.5 h-2.5 fill-current" viewBox="0 0 120 120">
            <path d="M60 90a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm-28.3-28.3a40 40 0 0 1 56.6 0l-7.1 7.1a30 30 0 0 0-42.4 0l-7.1-7.1zm-14.1-14.1a60 60 0 0 1 84.8 0l-7.1 7.1a50 50 0 0 0-70.6 0l-7.1-7.1z" />
          </svg>
          {/* Battery */}
          <div className="w-4.5 h-2.5 border border-current rounded-[3px] p-[1px] flex items-center">
            <div className="bg-current h-full w-[80%] rounded-[1.5px]" />
          </div>
        </div>
      </div>

      {/* 2. Interactive Dynamic Island Notification System */}
      <motion.div
        animate={{
          width: islandState === 'idle' ? 76 : 190,
          height: islandState === 'idle' ? 18 : 28,
          borderRadius: 14,
        }}
        transition={{ type: "spring", stiffness: 220, damping: 22 }}
        className="absolute top-2 left-1/2 -translate-x-1/2 bg-black text-white flex items-center justify-center z-50 shadow-lg overflow-hidden select-none px-2.5"
      >
        <AnimatePresence mode="wait">
          {islandState === 'idle' ? (
            <motion.div
              key="camera"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="w-2 h-2 bg-[#121212] border border-[#222] rounded-full ml-auto mr-0.5"
            />
          ) : (
            <motion.div
              key="alert"
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.85 }}
              className="flex items-center gap-1.5 w-full text-[9px] font-extrabold justify-center whitespace-nowrap text-brand-gold-300 dark:text-brand-gold-200"
            >
              {islandState === 'booked' && (
                <span className="text-emerald-450 flex items-center gap-1 leading-none font-bold">
                  <CheckCircle2 className="w-3 h-3 shrink-0" /> {islandText}
                </span>
              )}
              {islandState === 'saved' && (
                <span className="text-red-400 flex items-center gap-1 leading-none font-bold animate-pulse">
                  <Heart className="w-3 h-3 fill-current shrink-0" /> {islandText}
                </span>
              )}
              {islandState === 'unsaved' && (
                <span className="text-slate-400 flex items-center gap-1 leading-none font-bold">
                  <Heart className="w-3 h-3 shrink-0" /> {islandText}
                </span>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Screen Content Wrapper */}
      <div className="flex-1 relative overflow-hidden bg-slate-50 dark:bg-slate-900">
        <AnimatePresence mode="wait">
          {!selectedHotel ? (
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0 overflow-y-auto overflow-x-hidden scrollbar-hide pb-24"
            >
              {activeTab === 'home' && (
                <HomeTab 
                  onSelectHotel={setSelectedHotel} 
                  savedHotels={savedHotels} 
                  onSearchClick={handleHomeSearchClick}
                />
              )}
              {activeTab === 'search' && (
                <SearchTab 
                  onSelectHotel={setSelectedHotel} 
                  savedHotels={savedHotels} 
                  searchQuery={searchQuery}
                  setSearchQuery={setSearchQuery}
                  activeFilter={activeFilter}
                  setActiveFilter={setActiveFilter}
                />
              )}
              {activeTab === 'saved' && (
                <SavedTab 
                  onSelectHotel={setSelectedHotel} 
                  savedHotels={savedHotels} 
                />
              )}
              {activeTab === 'profile' && (
                <ProfileTab />
              )}
            </motion.div>
          ) : (
            <motion.div
              key="detail"
              initial={{ opacity: 0, y: '100%' }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: '100%' }}
              transition={{ type: "spring", damping: 25, stiffness: 220 }}
              className="absolute inset-0 bg-white dark:bg-slate-900 z-40 overflow-hidden"
            >
              <HotelDetail 
                hotel={selectedHotel} 
                onBack={handleBackFromDetail} 
                onToggleSave={onToggleSave}
                isSaved={savedHotels.includes(selectedHotel.id)}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom Navigation */}
      <div className="absolute bottom-0 w-full bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border-t border-slate-100 dark:border-slate-800/80 pt-3 pb-5 flex justify-around items-center px-1.5 z-40 shadow-[0_-5px_15px_rgba(0,0,0,0.02)]">
        {[
          { id: 'home', icon: Home, label: 'Home' },
          { id: 'search', icon: Search, label: 'Explore' },
          { id: 'saved', icon: Heart, label: 'Wishlist' },
          { id: 'profile', icon: User, label: 'Profile' },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id && !selectedHotel;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => { setActiveTab(tab.id); setSelectedHotel(null); }}
              className={`flex flex-col items-center gap-0.5 transition-colors relative w-12 cursor-pointer ${isActive ? 'text-brand-emerald-600 dark:text-brand-gold-450' : 'text-slate-400 dark:text-slate-500 hover:text-slate-655 dark:hover:text-slate-300'}`}
            >
              <Icon className={`w-5 h-5 transition-all ${isActive ? 'fill-current scale-110' : 'scale-100'}`} strokeWidth={isActive ? 2 : 1.5} />
              <span className={`text-[8px] font-extrabold mt-0.5 tracking-wide ${isActive ? 'opacity-100' : 'opacity-70'} transition-opacity`}>{tab.label}</span>
              {isActive && <motion.div layoutId="nav-indicator" className="w-1 h-1 rounded-full bg-current absolute -bottom-1" />}
            </button>
          );
        })}
      </div>
    </div>
  );
};

// ── MAIN EXPORT COMPONENT ──────────────────────────────────────────────
export default function MobileApp() {
  const { t } = useTranslation();
  
  // Interactive App States
  const [savedHotels, setSavedHotels] = useState([1]); // Pre-save Royal Mansour
  const [islandState, setIslandState] = useState('idle'); // 'idle' | 'booked' | 'saved' | 'unsaved'
  const [islandText, setIslandText] = useState('');
  
  // 3D Parallax Tilt States
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [sheen, setSheen] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);

  // Trigger custom island bubbles
  const triggerIsland = (state, text) => {
    setIslandState(state);
    setIslandText(text);
    setTimeout(() => {
      setIslandState('idle');
      setIslandText('');
    }, 3200);
  };

  const handleToggleSave = (id) => {
    if (savedHotels.includes(id)) {
      setSavedHotels(prev => prev.filter(hid => hid !== id));
      triggerIsland('unsaved', 'Removed Wishlist 💔');
    } else {
      setSavedHotels(prev => [...prev, id]);
      triggerIsland('saved', 'Saved Stay ❤️');
    }
  };

  // Parallax Event Handlers
  const handleMouseMove = (e) => {
    const container = e.currentTarget;
    const rect = container.getBoundingClientRect();
    
    // Position of cursor relative to center of element
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    
    // Maximum tilt angle of 10 degrees
    const tiltX = -(y / (rect.height / 2)) * 10;
    const tiltY = (x / (rect.width / 2)) * 10;
    
    setTilt({ x: tiltX, y: tiltY });
    setIsHovered(true);

    // Sheen calculation
    const sheenX = ((e.clientX - rect.left) / rect.width) * 100;
    const sheenY = ((e.clientY - rect.top) / rect.height) * 100;
    setSheen({ x: sheenX, y: sheenY });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setSheen({ x: 50, y: 50 });
    setIsHovered(false);
  };

  return (
    <section id="mobile-app" className="py-24 md:py-32 bg-white dark:bg-brand-emerald-950 relative overflow-hidden border-b border-slate-100 dark:border-brand-emerald-900/40">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand-emerald-500/5 rounded-full blur-[100px] pointer-events-none animate-pulse duration-[8s]" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-brand-gold-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          {/* Left Column: Text and Download Action */}
          <div className="order-2 lg:order-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-brand-emerald-50 dark:bg-brand-emerald-900/45 border border-brand-emerald-100 dark:border-brand-emerald-800/40 mb-6"
            >
              <Smartphone className="w-4 h-4 text-brand-emerald-600 dark:text-brand-gold-450" />
              <span className="text-xs font-bold tracking-widest text-brand-emerald-800 dark:text-brand-gold-200 uppercase">
                {t('appDownload.sectionLabel')}
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-white mb-5 leading-[1.1] tracking-tight"
            >
              {t('appDownload.heading')}
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-base md:text-lg text-slate-500 dark:text-slate-400 mb-8 leading-relaxed max-w-xl"
            >
              {t('appDownload.subtext')}
            </motion.p>

            {/* Platform Badges */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 mb-10"
            >
              {/* App Store Button */}
              <button className="flex items-center justify-center gap-3.5 bg-slate-900 dark:bg-black text-white px-7 py-3.5 rounded-2xl hover:bg-slate-800 dark:hover:bg-slate-900 transition-all duration-300 border border-slate-700 dark:border-slate-800 shadow-md hover:-translate-y-1 group cursor-pointer">
                <svg className="w-7 h-7 group-hover:scale-105 transition-transform" viewBox="0 0 384 512" fill="currentColor">
                  <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"></path>
                </svg>
                <div className="text-left leading-tight">
                  <div className="text-[9px] uppercase tracking-widest text-slate-400 font-bold mb-0.5">Download on the</div>
                  <div className="text-base font-bold">App Store</div>
                </div>
              </button>

              {/* Google Play Button */}
              <button className="flex items-center justify-center gap-3.5 bg-white dark:bg-slate-800 text-slate-900 dark:text-white px-7 py-3.5 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-700 transition-all duration-300 border border-slate-200 dark:border-slate-700 shadow-md hover:-translate-y-1 group cursor-pointer">
                <svg className="w-7 h-7 text-brand-gold-600 dark:text-brand-gold-455 group-hover:scale-105 transition-transform" viewBox="0 0 512 512" fill="currentColor">
                  <path d="M325.3 234.3L104.6 13l280.8 161.2-60.1 60.1zM47 0C34 6.8 25.3 19.2 25.3 35.3v441.3c0 16.1 8.7 28.5 21.7 35.3l256.6-256L47 0zm425.2 225.6l-58.9-34.1-65.7 64.5 65.7 64.5 60.1-34.1c18-14.3 18-46.5-1.2-60.8zM104.6 499l280.8-161.2-60.1-60.1L104.6 499z"></path>
                </svg>
                <div className="text-left leading-tight">
                  <div className="text-[9px] uppercase tracking-widest text-slate-500 dark:text-slate-400 font-bold mb-0.5">Get it on</div>
                  <div className="text-base font-bold">Google Play</div>
                </div>
              </button>
            </motion.div>

            {/* Features checkmarks */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-wrap gap-3"
            >
              {[
                { text: 'Real-time AI Chat', desc: 'Instant Shariah guidance' },
                { text: 'Digital Concierge', desc: 'Ladies pool reservations' }
              ].map((feature, i) => (
                <div key={i} className="flex items-start gap-2 bg-slate-50 dark:bg-slate-900/40 p-3 rounded-xl border border-slate-100 dark:border-slate-800/60 max-w-[240px]">
                  <CheckCircle2 className="w-4 h-4 text-brand-gold-555 dark:text-brand-gold-455 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-bold text-slate-850 dark:text-slate-200">{feature.text}</p>
                    <p className="text-[9.5px] text-slate-400 dark:text-slate-500 font-medium leading-none mt-0.5">{feature.desc}</p>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right Column: 3D Tilting Phone Mockup */}
          <div className="order-1 lg:order-2 flex justify-center lg:justify-end relative">
            <div 
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              className="relative py-12 px-14 cursor-grab active:cursor-grabbing select-none"
              style={{ perspective: 1200 }}
            >
              {/* Outer Phone Ring & Shadow Wrap */}
              <motion.div
                animate={{
                  rotateX: tilt.x,
                  rotateY: tilt.y,
                  scale: isHovered ? 1.03 : 1,
                  y: isHovered ? -5 : [0, -10, 0]
                }}
                transition={
                  isHovered
                    ? { type: 'spring', stiffness: 260, damping: 26 }
                    : { duration: 5.5, repeat: Infinity, ease: 'easeInOut' }
                }
                style={{ 
                  transformStyle: 'preserve-3d',
                }}
                className="relative"
              >
                {/* Hardware Volume Buttons */}
                <div className="absolute top-28 -left-[11px] w-[3px] h-[40px] bg-slate-950 dark:bg-slate-800 rounded-l-[4px] z-0 shadow-sm border-r border-slate-900" />
                <div className="absolute top-[160px] -left-[11px] w-[3px] h-[40px] bg-slate-950 dark:bg-slate-800 rounded-l-[4px] z-0 shadow-sm border-r border-slate-900" />
                
                {/* Hardware Power Key */}
                <div className="absolute top-36 -right-[11px] w-[3px] h-[55px] bg-slate-950 dark:bg-slate-800 rounded-r-[4px] z-0 shadow-sm border-l border-slate-900" />

                {/* Main Phone Component Screen */}
                <MockAppScreen 
                  savedHotels={savedHotels}
                  onToggleSave={handleToggleSave}
                  triggerIsland={triggerIsland}
                  islandState={islandState}
                  islandText={islandText}
                />

                {/* Glass Sheen overlay catches light as the user tilts the phone */}
                <div 
                  className="absolute inset-[9px] rounded-[2.5rem] pointer-events-none z-50 mix-blend-overlay opacity-0 group-hover:opacity-40 transition-opacity duration-300"
                  style={{
                    background: `radial-gradient(circle at ${sheen.x}% ${sheen.y}%, rgba(255, 255, 255, 0.75) 0%, rgba(255,255,255,0.05) 50%, transparent 100%)`
                  }}
                />
              </motion.div>

              {/* Dynamic Blurred Glow reflection behind the phone */}
              <div 
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70%] h-[75%] bg-gradient-to-tr from-brand-emerald-500/10 to-brand-gold-500/10 dark:from-brand-emerald-500/5 dark:to-brand-gold-500/5 blur-[70px] rounded-[3rem] z-0 pointer-events-none transition-transform duration-500"
                style={{
                  transform: `translate3d(-50%, -50%, -30px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`
                }}
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
