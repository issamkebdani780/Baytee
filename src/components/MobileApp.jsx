import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Smartphone, Download, CheckCircle2, Home, Search, Heart, User, MapPin, Star, ChevronLeft } from 'lucide-react';

const mockHotels = [
  { id: 1, name: 'Royal Mansour', location: 'Marrakech, Morocco', price: 450, rating: 4.9, image: '/hero-bg.png', features: ['Private Pool', 'Halal Food', 'Women-Only Spa'] },
  { id: 2, name: 'Conrad Makkah', location: 'Makkah, Saudi Arabia', price: 320, rating: 4.8, image: '/hero-bg.png', features: ['Haram View', 'Halal Food', 'Steps to Haram'] },
  { id: 3, name: 'Banyan Tree', location: 'Kuala Lumpur, Malaysia', price: 210, rating: 4.9, image: '/hero-bg.png', features: ['Alcohol-Free', 'Halal Food', 'Prayer Mat'] },
];

const HomeTab = ({ onSelectHotel }) => (
  <div>
    {/* Edge to Edge Hero */}
    <div className="relative h-[320px] w-full shrink-0">
      <img src="/hero-bg.png" alt="Hero" className="w-full h-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/10 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-50 dark:from-slate-900 via-slate-50/20 dark:via-slate-900/20 to-transparent" />
      
      {/* Header Info */}
      <div className="absolute top-12 left-0 w-full px-5 flex justify-between items-start z-10">
        <div>
          <p className="text-white/80 text-[10px] font-bold tracking-widest uppercase mb-1">Welcome back</p>
          <h2 className="text-white text-2xl font-bold leading-tight">Discover<br/>Halal Stays</h2>
        </div>
        <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30 shadow-lg">
          <img src="/logo.png" alt="Logo" className="h-5 brightness-0 invert" />
        </div>
      </div>

      {/* Floating Search */}
      <div className="absolute -bottom-6 left-5 right-5 bg-white dark:bg-slate-800 rounded-2xl shadow-xl shadow-slate-200/50 dark:shadow-none p-4 flex items-center gap-4 border border-slate-100 dark:border-slate-700 z-20 cursor-text">
        <div className="w-10 h-10 rounded-full bg-brand-emerald-50 dark:bg-slate-700 flex items-center justify-center shrink-0">
          <Search className="w-5 h-5 text-brand-emerald-600 dark:text-brand-gold-400" />
        </div>
        <div className="flex-1">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Destination</p>
          <p className="text-sm font-semibold text-slate-900 dark:text-white leading-none mt-1">Where to next?</p>
        </div>
      </div>
    </div>

    {/* Featured Carousel */}
    <div className="mt-14 px-5 pb-8">
      <div className="flex justify-between items-end mb-4">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white">Featured Luxury</h3>
        <button className="text-[11px] font-bold text-brand-emerald-600 dark:text-brand-gold-400 tracking-wide uppercase">See All</button>
      </div>

      <div className="flex gap-4 overflow-x-auto snap-x scrollbar-hide pb-4 -mx-5 px-5">
        {mockHotels.map(hotel => (
          <div key={hotel.id} onClick={() => onSelectHotel(hotel)} className="snap-start shrink-0 w-[240px] bg-white dark:bg-slate-800 rounded-[1.25rem] shadow-sm border border-slate-100 dark:border-slate-700 overflow-hidden cursor-pointer transform active:scale-95 transition-all hover:shadow-md">
            <div className="h-36 w-full relative">
              <img src={hotel.image} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-60" />
              <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-md px-2 py-1 rounded-lg flex items-center gap-1 shadow-sm">
                <Star className="w-3 h-3 text-brand-gold-500 fill-current" />
                <span className="text-[10px] font-bold text-slate-900">{hotel.rating}</span>
              </div>
            </div>
            <div className="p-4">
              <h4 className="font-bold text-sm text-slate-900 dark:text-white truncate">{hotel.name}</h4>
              <div className="flex items-center gap-1 text-slate-500 mt-1 mb-3">
                <MapPin className="w-3 h-3 shrink-0" />
                <p className="text-[11px] truncate">{hotel.location}</p>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="font-bold text-brand-emerald-600 dark:text-brand-gold-400">${hotel.price}</span>
                <span className="text-[10px] text-slate-400 font-medium">/night</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const SearchTab = ({ onSelectHotel }) => (
  <div className="p-5 pt-16 pb-24">
    <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Explore</h2>
    
    <div className="bg-white dark:bg-slate-800 rounded-2xl p-3.5 flex items-center gap-3 mb-6 shadow-sm border border-slate-200 dark:border-slate-700">
      <Search className="w-5 h-5 text-slate-400" />
      <input type="text" placeholder="Search destinations..." className="bg-transparent border-none outline-none text-sm font-medium text-slate-900 dark:text-white w-full placeholder:text-slate-400" />
    </div>

    <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-2 mb-6 -mx-5 px-5">
      {['All', 'Private Pool', 'Alcohol-Free', 'Women-Only Spa'].map((filter, i) => (
        <button key={filter} className={`whitespace-nowrap px-4 py-2 rounded-full text-xs font-bold transition-colors ${i === 0 ? 'bg-slate-900 text-white dark:bg-brand-gold-500 dark:text-slate-900 shadow-md shadow-slate-900/20' : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700'}`}>
          {filter}
        </button>
      ))}
    </div>

    <div className="flex flex-col gap-4">
      {mockHotels.map(hotel => (
        <div key={hotel.id} onClick={() => onSelectHotel(hotel)} className="flex gap-4 bg-white dark:bg-slate-800 rounded-[1.25rem] p-2.5 shadow-sm border border-slate-100 dark:border-slate-700 cursor-pointer active:scale-95 transition-all hover:shadow-md">
          <div className="w-24 h-24 rounded-xl overflow-hidden shrink-0 relative">
             <img src={hotel.image} className="w-full h-full object-cover" />
          </div>
          <div className="flex-1 py-1 pr-2 flex flex-col justify-center">
            <div className="flex justify-between items-start mb-1">
              <h4 className="font-bold text-sm text-slate-900 dark:text-white leading-tight">{hotel.name}</h4>
              <div className="flex items-center gap-0.5 text-brand-gold-500">
                <Star className="w-3 h-3 fill-current" />
                <span className="text-[10px] font-bold text-slate-800 dark:text-white">{hotel.rating}</span>
              </div>
            </div>
            <p className="text-[11px] text-slate-500 flex items-center gap-1"><MapPin className="w-3 h-3"/> {hotel.location}</p>
            <div className="mt-auto pt-2 flex items-baseline gap-1">
              <span className="text-sm font-bold text-brand-emerald-600 dark:text-brand-gold-400">${hotel.price}</span>
              <span className="text-[10px] text-slate-400 font-medium">/night</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const HotelDetail = ({ hotel, onBack }) => (
  <div className="flex flex-col h-full bg-white dark:bg-slate-900">
    {/* Full bleed image */}
    <div className="relative h-[340px] w-full shrink-0">
      <img src={hotel.image} className="w-full h-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
      
      <button onClick={onBack} className="absolute top-12 left-5 w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30 text-white z-20 transition-transform active:scale-90">
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button className="absolute top-12 right-5 w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30 text-white z-20 transition-transform active:scale-90">
        <Heart className="w-5 h-5" />
      </button>

      <div className="absolute bottom-6 left-5 right-5 text-white">
        <h2 className="text-3xl font-bold leading-tight mb-2">{hotel.name}</h2>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1 text-white/90">
            <MapPin className="w-4 h-4" />
            <p className="text-sm font-medium">{hotel.location}</p>
          </div>
          <div className="flex items-center gap-1 bg-white/20 backdrop-blur-md px-2 py-1 rounded-lg text-white border border-white/20">
            <Star className="w-4 h-4 text-brand-gold-400 fill-current" />
            <span className="text-xs font-bold">{hotel.rating}</span>
          </div>
        </div>
      </div>
    </div>

    {/* Content */}
    <div className="flex-1 px-5 pt-6 pb-28 overflow-y-auto scrollbar-hide">
      <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3">Halal Features</h3>
      <div className="flex flex-wrap gap-2 mb-8">
        {hotel.features.map(f => (
          <span key={f} className="px-3 py-1.5 bg-brand-emerald-50 dark:bg-brand-emerald-900/30 text-brand-emerald-700 dark:text-brand-emerald-300 border border-brand-emerald-100 dark:border-brand-emerald-800/50 rounded-xl text-xs font-bold flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5" /> {f}
          </span>
        ))}
      </div>

      <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Description</h3>
      <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
        Experience ultimate luxury and unparalleled privacy. This stunning property offers breathtaking views, dedicated service, and is fully verified by our AI to meet all your Islamic requirements including private ladies-only facilities and verified halal dining options.
      </p>
    </div>

    {/* Sticky Bottom Book Bar */}
    <div className="absolute bottom-0 w-full bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border-t border-slate-100 dark:border-slate-800 p-5 pb-8 flex justify-between items-center z-50 shadow-[0_-10px_30px_-10px_rgba(0,0,0,0.1)]">
      <div>
        <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold mb-1">Total Price</p>
        <div className="flex items-baseline gap-1">
          <span className="font-extrabold text-2xl text-slate-900 dark:text-white">${hotel.price}</span>
          <span className="text-xs text-slate-500 font-medium">/night</span>
        </div>
      </div>
      <button className="bg-brand-emerald-600 hover:bg-brand-emerald-700 text-white px-8 py-3.5 rounded-2xl font-bold shadow-lg shadow-brand-emerald-600/30 transition-transform active:scale-95 flex items-center gap-2">
        Book Now
      </button>
    </div>
  </div>
);

const MockAppScreen = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [selectedHotel, setSelectedHotel] = useState(null);

  return (
    <div className="relative z-10 mx-auto w-[320px] h-[650px] bg-slate-50 dark:bg-slate-900 rounded-[3.5rem] border-[10px] border-slate-900 dark:border-slate-800 overflow-hidden shadow-2xl flex flex-col font-sans select-none ring-1 ring-white/10">
      {/* Dynamic Island */}
      <div className="absolute top-3 left-1/2 -translate-x-1/2 w-28 h-7 bg-slate-900 dark:bg-black rounded-full z-50 shadow-inner" />

      {/* Screen Content Wrapper */}
      <div className="flex-1 relative overflow-hidden bg-slate-50 dark:bg-slate-900">
        <AnimatePresence mode="wait">
          {!selectedHotel ? (
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0 overflow-y-auto overflow-x-hidden scrollbar-hide pb-24"
            >
              {activeTab === 'home' && <HomeTab onSelectHotel={setSelectedHotel} />}
              {activeTab === 'search' && <SearchTab onSelectHotel={setSelectedHotel} />}
              {activeTab === 'saved' && <div className="p-6 pt-16 h-full flex items-center justify-center text-slate-400"><p className="font-medium">No saved stays yet.</p></div>}
              {activeTab === 'profile' && <div className="p-6 pt-16 h-full flex items-center justify-center text-slate-400"><p className="font-medium">Please sign in.</p></div>}
            </motion.div>
          ) : (
            <motion.div
              key="detail"
              initial={{ opacity: 0, y: '100%' }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: '100%' }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="absolute inset-0 bg-white dark:bg-slate-900 z-40 overflow-hidden"
            >
              <HotelDetail hotel={selectedHotel} onBack={() => setSelectedHotel(null)} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom Navigation */}
      <div className="absolute bottom-0 w-full bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border-t border-slate-100 dark:border-slate-800 pt-4 pb-6 flex justify-around items-center px-2 z-40">
        {[
          { id: 'home', icon: Home, label: 'Home' },
          { id: 'search', icon: Search, label: 'Explore' },
          { id: 'saved', icon: Heart, label: 'Saved' },
          { id: 'profile', icon: User, label: 'Profile' },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id && !selectedHotel;
          return (
            <button
              key={tab.id}
              onClick={() => { setActiveTab(tab.id); setSelectedHotel(null); }}
              className={`flex flex-col items-center gap-1 transition-colors relative w-16 ${isActive ? 'text-brand-emerald-600 dark:text-brand-gold-400' : 'text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300'}`}
            >
              <Icon className={`w-6 h-6 transition-all ${isActive ? 'fill-current scale-110' : 'scale-100'}`} strokeWidth={isActive ? 2 : 1.5} />
              <span className={`text-[9px] font-bold mt-0.5 ${isActive ? 'opacity-100' : 'opacity-0'} transition-opacity`}>{tab.label}</span>
              {isActive && <motion.div layoutId="nav-indicator" className="w-1 h-1 rounded-full bg-current absolute bottom-0" />}
            </button>
          );
        })}
      </div>
    </div>
  );
};


const MobileApp = () => {
  const { t } = useTranslation();

  return (
    <section className="py-32 bg-white dark:bg-brand-emerald-950 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand-emerald-500/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-brand-gold-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          {/* Left Column: Text and Buttons */}
          <div className="order-2 lg:order-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-emerald-50 dark:bg-brand-emerald-900/40 border border-brand-emerald-100 dark:border-brand-emerald-800/50 mb-8"
            >
              <Smartphone className="w-4 h-4 text-brand-emerald-600 dark:text-brand-emerald-400" />
              <span className="text-sm font-bold tracking-wide text-brand-emerald-800 dark:text-brand-emerald-300 uppercase">
                {t('appDownload.sectionLabel')}
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-white mb-6 leading-[1.1] tracking-tight"
            >
              {t('appDownload.heading')}
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg md:text-xl text-slate-600 dark:text-slate-400 mb-10 leading-relaxed max-w-xl font-medium"
            >
              {t('appDownload.subtext')}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 mb-12"
            >
              {/* App Store Button */}
              <button className="flex items-center justify-center gap-4 bg-slate-900 dark:bg-black text-white px-8 py-4 rounded-2xl hover:bg-slate-800 dark:hover:bg-slate-900 transition-all duration-300 border border-slate-700 shadow-xl shadow-slate-900/20 hover:shadow-2xl hover:shadow-slate-900/30 hover:-translate-y-1">
                <svg className="w-8 h-8" viewBox="0 0 384 512" fill="currentColor">
                  <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"></path>
                </svg>
                <div className="text-left">
                  <div className="text-[11px] uppercase tracking-widest text-slate-400 font-bold mb-0.5">Download on the</div>
                  <div className="text-xl font-bold leading-none">App Store</div>
                </div>
              </button>

              {/* Google Play Button */}
              <button className="flex items-center justify-center gap-4 bg-white dark:bg-slate-800 text-slate-900 dark:text-white px-8 py-4 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-700 transition-all duration-300 border border-slate-200 dark:border-slate-700 shadow-xl shadow-slate-200/50 dark:shadow-none hover:shadow-2xl hover:-translate-y-1">
                <svg className="w-8 h-8" viewBox="0 0 512 512" fill="currentColor">
                  <path d="M325.3 234.3L104.6 13l280.8 161.2-60.1 60.1zM47 0C34 6.8 25.3 19.2 25.3 35.3v441.3c0 16.1 8.7 28.5 21.7 35.3l256.6-256L47 0zm425.2 225.6l-58.9-34.1-65.7 64.5 65.7 64.5 60.1-34.1c18-14.3 18-46.5-1.2-60.8zM104.6 499l280.8-161.2-60.1-60.1L104.6 499z"></path>
                </svg>
                <div className="text-left">
                  <div className="text-[11px] uppercase tracking-widest text-slate-500 dark:text-slate-400 font-bold mb-0.5">Get it on</div>
                  <div className="text-xl font-bold leading-none">Google Play</div>
                </div>
              </button>
            </motion.div>

            {/* Feature List */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-wrap gap-4"
            >
              {['Real-time AI Chat', 'Instant Halal Bookings', 'Digital Concierge'].map((feature, i) => (
                <div key={i} className="flex items-center gap-2.5 text-slate-700 dark:text-slate-300 font-bold bg-slate-50 dark:bg-slate-900/50 px-4 py-2 rounded-xl border border-slate-100 dark:border-slate-800/50">
                  <CheckCircle2 className="w-5 h-5 text-brand-gold-500" />
                  {feature}
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right Column: Interactive App Mockup */}
          <div className="order-1 lg:order-2 flex justify-center lg:justify-end relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 40 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="relative w-full max-w-[450px] flex justify-center perspective-[1000px]"
            >
              {/* Floating animation for the interactive mobile mockup */}
              <motion.div
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                className="relative z-10"
              >
                <MockAppScreen />
              </motion.div>
              
              {/* Glow effect behind the phone */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-brand-emerald-500/20 dark:bg-brand-emerald-500/10 blur-[80px] rounded-full z-0 pointer-events-none" />
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default MobileApp;
