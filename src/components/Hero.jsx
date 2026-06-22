import { useState, useEffect, useRef } from 'react';
import { Search, Calendar, Users, SlidersHorizontal, Check, Star, MapPin, Sparkles, Play, ArrowRight, X, Hotel } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { MOCK_HOTELS } from '../data/mockHotels';
import { searchDestinations } from '../api';


const FLOATING_IMAGES = [
  { src: '/hotel-istanbul.png', city: 'Istanbul', country: 'Turkey', rating: '4.9' },
  { src: '/hotel-morocco.png', city: 'Marrakech', country: 'Morocco', rating: '4.8' },
  { src: '/hotel-maldives.png', city: 'Maldives', country: 'Indian Ocean', rating: '4.9' },
  { src: '/hotel-dubai.png', city: 'Dubai', country: 'UAE', rating: '4.9' },
  { src: '/hotel-malaysia.png', city: 'Kuala Lumpur', country: 'Malaysia', rating: '4.8' }
];

export default function Hero() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [destination, setDestination] = useState('');
  const [selectedDestination, setSelectedDestination] = useState(null);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [apiSuggestions, setApiSuggestions] = useState([]);
  const [defaultSuggestions, setDefaultSuggestions] = useState([]);
  const [isLoadingSuggestions, setIsLoadingSuggestions] = useState(false);
  const [currentImgIndex, setCurrentImgIndex] = useState(0);
  const searchContainerRef = useRef(null);

  // Fetch popular/default suggestions on mount
  useEffect(() => {
    searchDestinations('a')
      .then((res) => {
        if (res.success && Array.isArray(res.data)) {
          setDefaultSuggestions(res.data.slice(0, 5));
        }
      })
      .catch((err) => {
        console.error("Error fetching default suggestions:", err);
      });
  }, []);

  // Close suggestions dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(e.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Fetch search suggestions from backend API with debouncing
  useEffect(() => {
    if (!destination.trim()) {
      setApiSuggestions([]);
      setIsLoadingSuggestions(false);
      return;
    }

    setIsLoadingSuggestions(true);
    const delayDebounceFn = setTimeout(() => {
      searchDestinations(destination)
        .then((res) => {
          if (res.success && Array.isArray(res.data)) {
            setApiSuggestions(res.data);
          } else {
            setApiSuggestions([]);
          }
        })
        .catch((err) => {
          console.error("Error fetching suggestions:", err);
          setApiSuggestions([]);
        })
        .finally(() => {
          setIsLoadingSuggestions(false);
        });
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [destination]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImgIndex((prev) => (prev + 1) % FLOATING_IMAGES.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const card1Data = FLOATING_IMAGES[currentImgIndex % FLOATING_IMAGES.length];
  const card2Data = FLOATING_IMAGES[(currentImgIndex + 1) % FLOATING_IMAGES.length];
  const card3Data = FLOATING_IMAGES[(currentImgIndex + 2) % FLOATING_IMAGES.length];
  // Default check-in = tomorrow, check-out = today+4
  const tomorrow = new Date(Date.now() + 86400000).toISOString().split('T')[0];
  const dayAfter3 = new Date(Date.now() + 4 * 86400000).toISOString().split('T')[0];
  const [checkIn, setCheckIn] = useState(tomorrow);
  const [checkOut, setCheckOut] = useState(dayAfter3);
  const [rooms, setRooms] = useState([{ adults: 1, children: 0, childrenAges: [] }]);
  const [showGuestDropdown, setShowGuestDropdown] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [showDemo, setShowDemo] = useState(false);

  // Filters State — all off by default so no hotels are silently discarded
  const [filters, setFilters] = useState({
    halalFood: false,
    womenOnlyPool: false,
    privateVilla: false,
    alcoholFree: false,
    prayerFacilities: false,
  });

  const [isSearching, setIsSearching] = useState(false);

  const toggleFilter = (key) => {
    setFilters((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    setIsSearching(true);

    // Determine destination ID and type (city or hotel)
    let destId = '24212';
    let destType = 'city';
    let destName = destination || 'Hotels';

    if (selectedDestination) {
      destId = selectedDestination.id.toString();
      destType = selectedDestination.type;
      destName = selectedDestination.name;
    } else if (apiSuggestions.length > 0) {
      destId = apiSuggestions[0].id.toString();
      destType = apiSuggestions[0].type;
      destName = apiSuggestions[0].name;
    } else if (defaultSuggestions.length > 0) {
      destId = defaultSuggestions[0].id.toString();
      destType = defaultSuggestions[0].type;
      destName = defaultSuggestions[0].name;
    }

    const params = new URLSearchParams({
      destId,
      destType,
      destName,
      checkIn: checkIn || new Date(Date.now() + 86400000).toISOString().split('T')[0],
      checkOut: checkOut || new Date(Date.now() + 4 * 86400000).toISOString().split('T')[0],
      paxRooms: JSON.stringify(rooms),
    });

    navigate(`/search?${params.toString()}`);
  };

  const filtersList = [
    { key: 'halalFood', label: t('hero.halalFoodVerified'), desc: t('hero.halalFoodDesc') },
    { key: 'womenOnlyPool', label: t('hero.womenOnlyPool'), desc: t('hero.womenOnlyPoolDesc') },
    { key: 'privateVilla', label: t('hero.privateVilla'), desc: t('hero.privateVillaDesc') },
    { key: 'alcoholFree', label: t('hero.alcoholFree'), desc: t('hero.alcoholFreeDesc') },
    { key: 'prayerFacilities', label: t('hero.prayerFacilities'), desc: t('hero.prayerFacilitiesDesc') },
  ];

  return (
    <section className="relative islamic-pattern">
      {/* Background Image with Elegant Theme-Aware Gradient Overlay */}
      <div className="absolute inset-0 z-0 select-none pointer-events-none w-full h-full">
        <img
          src="/hero-bg.png"
          alt="Luxury Resort Background"
          className="w-full h-full object-cover"
        />
        {/* Soft elegant overlays to blend with light and dark modes, maintaining readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent via-85% to-[#FCFBF9] dark:from-transparent dark:via-transparent dark:via-85% dark:to-[#060b14] transition-colors duration-300" />
      </div>

      <div className="relative pt-28 pb-12 flex flex-col items-center justify-center z-10">
        {/* Decorative Blur Backgrounds */}
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-brand-emerald-200/20 dark:bg-brand-emerald-800/10 rounded-full ambient-glow pointer-events-none" />
        <div className="absolute bottom-20 right-1/4 w-[400px] h-[400px] bg-brand-gold-100/30 dark:bg-brand-gold-800/5 rounded-full ambient-glow pointer-events-none" />

        {/* ═══ LEFT IMAGE CLUSTER (rotates every 3s) ═══ */}
        <div className="absolute left-0 bottom-0 hidden xl:flex flex-col gap-3 z-0 pl-4 2xl:pl-8">
          {/* Top-left image — tall portrait */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.85, delay: 0.15, ease: 'easeOut' }}
          >
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
              className="relative w-52 2xl:w-72 h-64 2xl:h-80 rounded-2xl overflow-hidden shadow-2xl border border-white/15 dark:border-brand-emerald-800/30 group cursor-pointer"
              style={{ filter: 'drop-shadow(0 24px 48px rgba(11,59,36,0.22))' }}
            >
              <AnimatePresence>
                <motion.div
                  key={card1Data.src}
                  initial={{ opacity: 0, scale: 1.08 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
                  className="absolute inset-0 w-full h-full"
                >
                  <img src={card1Data.src} alt={card1Data.city} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3">
                    <p className="text-white font-bold text-sm leading-tight drop-shadow">{card1Data.city}</p>
                    <p className="text-brand-gold-300 text-[11px] flex items-center gap-1 mt-0.5"><MapPin className="w-3 h-3" />{card1Data.country}</p>
                  </div>
                  <div className="absolute top-2.5 right-2.5 flex items-center gap-1 px-2 py-0.5 rounded-full bg-white/90 dark:bg-brand-emerald-950/90 backdrop-blur-sm shadow-sm">
                    <Star className="w-3 h-3 fill-yellow-500 text-yellow-500" />
                    <span className="text-[10px] font-bold text-slate-800 dark:text-brand-gold-400">{card1Data.rating}</span>
                  </div>
                </motion.div>
              </AnimatePresence>
            </motion.div>
          </motion.div>

          {/* Bottom-left image — landscape, offset right */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.85, delay: 0.3, ease: 'easeOut' }}
            className="ml-6 2xl:ml-10"
          >
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 5.2, repeat: Infinity, ease: 'easeInOut' }}
              className="relative w-48 2xl:w-64 h-40 2xl:h-52 rounded-2xl overflow-hidden shadow-2xl border border-white/15 dark:border-brand-emerald-800/30 group cursor-pointer"
              style={{ filter: 'drop-shadow(0 24px 48px rgba(11,59,36,0.22))' }}
            >
              <AnimatePresence>
                <motion.div
                  key={card2Data.src}
                  initial={{ opacity: 0, scale: 1.08 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
                  className="absolute inset-0 w-full h-full"
                >
                  <img src={card2Data.src} alt={card2Data.city} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3">
                    <p className="text-white font-bold text-sm leading-tight drop-shadow">{card2Data.city}</p>
                    <p className="text-brand-gold-300 text-[11px] flex items-center gap-1 mt-0.5"><MapPin className="w-3 h-3" />{card2Data.country}</p>
                  </div>
                  <div className="absolute top-2.5 right-2.5 flex items-center gap-1 px-2 py-0.5 rounded-full bg-white/90 dark:bg-brand-emerald-955/90 backdrop-blur-sm shadow-sm">
                    <Star className="w-3 h-3 fill-yellow-500 text-yellow-500" />
                    <span className="text-[10px] font-bold text-slate-800 dark:text-brand-gold-400">{card2Data.rating}</span>
                  </div>
                </motion.div>
              </AnimatePresence>
            </motion.div>
          </motion.div>
        </div>

        {/* ═══ RIGHT IMAGE (tall single, rotates every 3s) ═══ */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 hidden xl:block z-0 pr-4 2xl:pr-8">
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.85, delay: 0.2, ease: 'easeOut' }}
          >
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              className="relative w-56 2xl:w-72 h-80 2xl:h-96 rounded-2xl overflow-hidden shadow-2xl border border-white/15 dark:border-brand-emerald-800/30 group cursor-pointer"
              style={{ filter: 'drop-shadow(0 24px 48px rgba(11,59,36,0.22))' }}
            >
              <AnimatePresence>
                <motion.div
                  key={card3Data.src}
                  initial={{ opacity: 0, scale: 1.08 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
                  className="absolute inset-0 w-full h-full"
                >
                  <img src={card3Data.src} alt={card3Data.city} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3">
                    <p className="text-white font-bold text-sm leading-tight drop-shadow">{card3Data.city}</p>
                    <p className="text-brand-gold-300 text-[11px] flex items-center gap-1 mt-0.5"><MapPin className="w-3 h-3" />{card3Data.country}</p>
                  </div>
                  <div className="absolute top-2.5 right-2.5 flex items-center gap-1 px-2 py-0.5 rounded-full bg-white/90 dark:bg-brand-emerald-955/90 backdrop-blur-sm shadow-sm">
                    <Star className="w-3 h-3 fill-yellow-500 text-yellow-500" />
                    <span className="text-[10px] font-bold text-slate-800 dark:text-brand-gold-400">{card3Data.rating}</span>
                  </div>
                </motion.div>
              </AnimatePresence>
            </motion.div>
          </motion.div>
        </div>

        {/* ═══ CENTER: badge + heading + subtext + search + CTAs ═══ */}
        <div className="relative max-w-7xl mx-auto px-7 md:px-12 w-full text-center z-20 flex flex-col items-center">
          {/* Luxury Top Badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-brand-gold-500/30 bg-brand-gold-50/50 dark:bg-brand-emerald-950/40 backdrop-blur-sm mb-6 cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-brand-gold-600 dark:text-brand-gold-500" />
            <span className="text-xs font-semibold uppercase tracking-widest text-brand-emerald-800 dark:text-brand-gold-200 font-sans">
              {t('hero.badge')}
            </span>
          </motion.div>

          {/* Main Headings */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.3] mb-10"
          >
            <span className="inline-block bg-black/25 dark:bg-brand-emerald-950/30 backdrop-blur-md px-5 py-2 rounded-2xl border border-white/10 dark:border-brand-emerald-800/10 shadow-sm mb-3">
              {t('hero.heading1')}
            </span>
            <br />
            <span className="inline-block bg-black/25 dark:bg-brand-emerald-950/30 backdrop-blur-md px-5 py-2 rounded-2xl border border-white/10 dark:border-brand-emerald-800/10 shadow-sm">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-gold-200 via-brand-gold-500 to-brand-gold-200 font-serif italic font-normal">
                {t('hero.heading2')}
              </span>{' '}
              {t('hero.heading3')}
            </span>
          </motion.h1>

          {/* <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-2xl mx-auto text-lg md:text-xl text-slate-600 dark:text-slate-300 mb-10 leading-relaxed font-sans"
          >
            {t('hero.subtext')}
          </motion.p> */}

          {/* Large Interactive Hotel Search Widget */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            id="explore"
            className="relative z-30 w-full max-w-md md:max-w-2xl lg:max-w-3xl xl:max-w-4xl 2xl:max-w-5xl mx-auto p-4 sm:p-6 rounded-3xl border border-slate-200/80 dark:border-brand-emerald-800/30 bg-white/80 dark:bg-brand-emerald-950/40 backdrop-blur-xl shadow-xl dark:shadow-2xl/40 text-left mt-2 mb-10"
          >
            <form onSubmit={handleSearch} className="relative z-40 grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
              {/* Destination Input */}
              <div ref={searchContainerRef} className="relative md:col-span-4 p-3 rounded-2xl hover:bg-slate-100/50 dark:hover:bg-brand-emerald-900/30 transition duration-200 cursor-pointer">
                <label className="block text-xs font-semibold text-brand-gold-600 dark:text-brand-gold-500 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5" /> {t('hero.destinationLabel')}
                </label>
                <input
                  type="text"
                  placeholder={t('hero.destinationPlaceholder')}
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
                      className="absolute left-0 right-0 mt-3 bg-white dark:bg-brand-emerald-900 border border-slate-200 dark:border-brand-emerald-800 rounded-2xl shadow-xl overflow-hidden z-20 w-full max-w-sm sm:max-w-md md:max-w-lg"
                    >
                      {!destination.trim() ? (
                        <div className="p-2">
                          <p className="text-[10px] uppercase font-bold text-slate-400 dark:text-slate-500 px-3 py-1">{t('hero.popularDestinations')}</p>
                          {defaultSuggestions.length > 0 ? (
                            <div className="max-h-64 overflow-y-auto space-y-0.5 scrollbar-thin">
                              {defaultSuggestions.map((item) => {
                                const currentLang = i18n.language || 'en';
                                const countryName = item.countryNameTranslations?.[currentLang] || item.countryNameTranslations?.en || '';
                                
                                let displayLabel = item.name;
                                let subLabel = '';
                                
                                if (item.type === 'city') {
                                  subLabel = countryName ? `${countryName}` : '';
                                } else if (item.type === 'hotel') {
                                  const cityName = item.cityNameTranslations?.[currentLang] || item.cityNameTranslations?.en || '';
                                  subLabel = [cityName, countryName].filter(Boolean).join(', ');
                                }

                                const typeLabel = item.type === 'hotel'
                                  ? (i18n.language === 'ar' ? 'فندق' : i18n.language === 'fr' ? 'Hôtel' : 'Hotel')
                                  : (i18n.language === 'ar' ? 'مدينة' : i18n.language === 'fr' ? 'Ville' : 'City');

                                const propertiesLabel = i18n.language === 'ar' ? 'عقار' : i18n.language === 'fr' ? 'propriétés' : 'properties';
                                
                                return (
                                  <button
                                    key={`${item.type}-${item.id}`}
                                    type="button"
                                    onClick={() => {
                                      setDestination(item.name);
                                      setSelectedDestination(item);
                                      setShowSuggestions(false);
                                    }}
                                    className="w-full text-left px-3 py-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-brand-emerald-850/80 text-slate-800 dark:text-slate-200 flex items-center justify-between transition-colors duration-150 group cursor-pointer"
                                  >
                                    <div className="flex items-center gap-3">
                                      <div className="p-2 rounded-lg bg-slate-100 dark:bg-brand-emerald-900 text-brand-gold-600 dark:text-brand-gold-500 group-hover:bg-white dark:group-hover:bg-brand-emerald-800 transition-colors">
                                        {item.type === 'hotel' ? (
                                          <Hotel className="w-4 h-4" />
                                        ) : (
                                          <MapPin className="w-4 h-4" />
                                        )}
                                      </div>
                                      <div>
                                        <span className="text-sm font-bold text-slate-900 dark:text-white block group-hover:text-brand-emerald-600 dark:group-hover:text-brand-gold-400 transition-colors">
                                          {displayLabel}
                                        </span>
                                        {subLabel && (
                                          <span className="text-[11px] text-slate-450 dark:text-slate-400 block mt-0.5">
                                            {subLabel}
                                          </span>
                                        )}
                                      </div>
                                    </div>
                                    
                                    <div className="flex items-center gap-2">
                                      {item.type === 'city' && typeof item.hotelsCount === 'number' && (
                                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-brand-emerald-50 dark:bg-brand-emerald-900/60 text-brand-emerald-800 dark:text-brand-gold-200 border border-brand-emerald-100/10 dark:border-brand-emerald-800/20">
                                          {item.hotelsCount} {propertiesLabel}
                                        </span>
                                      )}
                                      {item.type === 'hotel' && typeof item.rating === 'number' && (
                                        <div className="flex items-center gap-0.5 text-[10px] font-bold text-slate-800 dark:text-brand-gold-500 bg-slate-100 dark:bg-brand-emerald-900/60 px-1.5 py-0.5 rounded">
                                          <Star className="w-3 h-3 fill-yellow-500 text-yellow-500" />
                                          {item.rating}
                                        </div>
                                      )}
                                      <span className="text-[9px] uppercase tracking-widest text-slate-455 dark:text-slate-500 font-extrabold hidden sm:inline-block">
                                        {typeLabel}
                                      </span>
                                    </div>
                                  </button>
                                );
                              })}
                            </div>
                          ) : (
                            <div className="flex items-center justify-center py-4">
                              <div className="w-4 h-4 border-2 border-brand-gold-500 border-t-transparent rounded-full animate-spin" />
                            </div>
                          )}
                        </div>
                      ) : isLoadingSuggestions ? (
                        <div className="flex items-center justify-center gap-2 py-6 text-slate-500 dark:text-slate-400">
                          <div className="w-4 h-4 border-2 border-brand-gold-500 border-t-transparent rounded-full animate-spin" />
                          <span className="text-xs font-semibold">
                            {i18n.language === 'ar' ? 'جاري البحث...' : i18n.language === 'fr' ? 'Recherche...' : 'Searching...'}
                          </span>
                        </div>
                      ) : apiSuggestions.length === 0 ? (
                        <div className="py-6 text-center text-slate-500 dark:text-slate-400 text-xs font-medium">
                          {t('hero.noMatches')}
                        </div>
                      ) : (
                        <div className="max-h-64 overflow-y-auto p-1.5 space-y-0.5 scrollbar-thin">
                          {apiSuggestions.map((item) => {
                            const currentLang = i18n.language || 'en';
                            const countryName = item.countryNameTranslations?.[currentLang] || item.countryNameTranslations?.en || '';
                            
                            let displayLabel = item.name;
                            let subLabel = '';
                            
                            if (item.type === 'city') {
                              subLabel = countryName ? `${countryName}` : '';
                            } else if (item.type === 'hotel') {
                              const cityName = item.cityNameTranslations?.[currentLang] || item.cityNameTranslations?.en || '';
                              subLabel = [cityName, countryName].filter(Boolean).join(', ');
                            }

                            const typeLabel = item.type === 'hotel'
                              ? (i18n.language === 'ar' ? 'فندق' : i18n.language === 'fr' ? 'Hôtel' : 'Hotel')
                              : (i18n.language === 'ar' ? 'مدينة' : i18n.language === 'fr' ? 'Ville' : 'City');

                            const propertiesLabel = i18n.language === 'ar' ? 'عقار' : i18n.language === 'fr' ? 'propriétés' : 'properties';
                            
                            return (
                              <button
                                key={`${item.type}-${item.id}`}
                                type="button"
                                onClick={() => {
                                  setDestination(item.name);
                                  setSelectedDestination(item);
                                  setShowSuggestions(false);
                                }}
                                className="w-full text-left px-3 py-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-brand-emerald-850/80 text-slate-800 dark:text-slate-200 flex items-center justify-between transition-colors duration-150 group cursor-pointer"
                              >
                                <div className="flex items-center gap-3">
                                  <div className="p-2 rounded-lg bg-slate-100 dark:bg-brand-emerald-900 text-brand-gold-600 dark:text-brand-gold-500 group-hover:bg-white dark:group-hover:bg-brand-emerald-800 transition-colors">
                                    {item.type === 'hotel' ? (
                                      <Hotel className="w-4 h-4" />
                                    ) : (
                                      <MapPin className="w-4 h-4" />
                                    )}
                                  </div>
                                  <div>
                                    <span className="text-sm font-bold text-slate-900 dark:text-white block group-hover:text-brand-emerald-600 dark:group-hover:text-brand-gold-400 transition-colors">
                                      {displayLabel}
                                    </span>
                                    {subLabel && (
                                      <span className="text-[11px] text-slate-450 dark:text-slate-400 block mt-0.5">
                                        {subLabel}
                                      </span>
                                    )}
                                  </div>
                                </div>
                                
                                <div className="flex items-center gap-2">
                                  {item.type === 'city' && typeof item.hotelsCount === 'number' && (
                                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-brand-emerald-50 dark:bg-brand-emerald-900/60 text-brand-emerald-800 dark:text-brand-gold-200 border border-brand-emerald-100/10 dark:border-brand-emerald-800/20">
                                      {item.hotelsCount} {propertiesLabel}
                                    </span>
                                  )}
                                  {item.type === 'hotel' && typeof item.rating === 'number' && (
                                    <div className="flex items-center gap-0.5 text-[10px] font-bold text-slate-800 dark:text-brand-gold-500 bg-slate-100 dark:bg-brand-emerald-900/60 px-1.5 py-0.5 rounded">
                                      <Star className="w-3 h-3 fill-yellow-500 text-yellow-500" />
                                      {item.rating}
                                    </div>
                                  )}
                                  <span className="text-[9px] uppercase tracking-widest text-slate-455 dark:text-slate-500 font-extrabold hidden sm:inline-block">
                                    {typeLabel}
                                  </span>
                                </div>
                              </button>
                            );
                          })}
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
                {destination && (
                  <button
                    type="button"
                    onClick={() => {
                      setDestination('');
                      setSelectedDestination(null);
                    }}
                    className="absolute right-3 top-7 p-1 rounded-full text-slate-400 hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-350"
                  >
                    <X className="w-3 h-3" />
                  </button>
                )}
              </div>

              {/* Check-In Date */}
              <div className="md:col-span-2 p-3 rounded-2xl hover:bg-slate-100/50 dark:hover:bg-brand-emerald-900/30 transition duration-200 cursor-pointer">
                <label className="block text-xs font-semibold text-brand-gold-600 dark:text-brand-gold-500 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" /> {t('hero.checkIn')}
                </label>
                <input
                  type="date"
                  value={checkIn}
                  min={new Date().toISOString().split('T')[0]}
                  onChange={(e) => {
                    setCheckIn(e.target.value);
                    // Auto-bump checkout if it falls before or on new checkin
                    if (checkOut && e.target.value >= checkOut) {
                      const next = new Date(new Date(e.target.value).getTime() + 86400000);
                      setCheckOut(next.toISOString().split('T')[0]);
                    }
                  }}
                  className="w-full bg-transparent border-none text-slate-900 dark:text-white font-medium focus:outline-none text-sm cursor-pointer"
                />
              </div>

              {/* Check-Out Date */}
              <div className="md:col-span-2 p-3 rounded-2xl hover:bg-slate-100/50 dark:hover:bg-brand-emerald-900/30 transition duration-200 cursor-pointer">
                <label className="block text-xs font-semibold text-brand-gold-600 dark:text-brand-gold-500 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" /> {t('hero.checkOut')}
                </label>
                <input
                  type="date"
                  value={checkOut}
                  min={checkIn ? new Date(new Date(checkIn).getTime() + 86400000).toISOString().split('T')[0] : new Date(Date.now() + 86400000).toISOString().split('T')[0]}
                  onChange={(e) => setCheckOut(e.target.value)}
                  className="w-full bg-transparent border-none text-slate-900 dark:text-white font-medium focus:outline-none text-sm cursor-pointer"
                />
              </div>

              {/* Guests/Rooms Selector */}
              <div className="relative md:col-span-2 p-3 rounded-2xl hover:bg-slate-100/50 dark:hover:bg-brand-emerald-900/30 transition duration-200 cursor-pointer">
                <div onClick={() => setShowGuestDropdown(!showGuestDropdown)}>
                  <label className="block text-xs font-semibold text-brand-gold-600 dark:text-brand-gold-500 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5" /> Rooms & Guests
                  </label>
                  <div className="text-slate-900 dark:text-white font-medium text-sm truncate">
                    {rooms.length} Room{rooms.length > 1 ? 's' : ''}, {rooms.reduce((acc, r) => acc + r.adults + r.children, 0)} Guest{rooms.reduce((acc, r) => acc + r.adults + r.children, 0) > 1 ? 's' : ''}
                  </div>
                </div>

                {/* Guest/Room counter popover */}
                <AnimatePresence>
                  {showGuestDropdown && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute right-0 top-full mt-3 p-4 bg-white dark:bg-brand-emerald-900 border border-slate-200 dark:border-brand-emerald-800 rounded-2xl shadow-xl w-72 sm:w-80 z-20 max-h-[70vh] overflow-y-auto scrollbar-thin"
                    >
                      <div className="space-y-5">
                        {rooms.map((room, rIndex) => (
                          <div key={rIndex} className="pb-4 border-b border-slate-100 dark:border-brand-emerald-800/50 last:border-0 last:pb-0">
                            <div className="flex items-center justify-between mb-3">
                              <span className="text-sm font-bold text-slate-800 dark:text-white">Room {rIndex + 1}</span>
                              {rooms.length > 1 && (
                                <button
                                  type="button"
                                  onClick={() => setRooms(prev => prev.filter((_, i) => i !== rIndex))}
                                  className="text-xs text-red-500 hover:text-red-600 font-semibold cursor-pointer"
                                >
                                  Remove
                                </button>
                              )}
                            </div>
                            
                            {/* Adults */}
                            <div className="flex items-center justify-between mb-3">
                              <div>
                                <span className="block text-sm font-medium text-slate-700 dark:text-slate-200">Adults</span>
                                <span className="block text-[10px] text-slate-500 dark:text-slate-400">Ages 18 or above</span>
                              </div>
                              <div className="flex items-center gap-3">
                                <button
                                  type="button"
                                  disabled={room.adults <= 1}
                                  onClick={() => setRooms(prev => {
                                    const next = [...prev];
                                    next[rIndex] = { ...next[rIndex] };
                                    next[rIndex].adults = Math.max(1, next[rIndex].adults - 1);
                                    return next;
                                  })}
                                  className="w-8 h-8 rounded-full border border-slate-250 dark:border-brand-emerald-700 flex items-center justify-center font-bold disabled:opacity-40 text-slate-750 dark:text-slate-200 cursor-pointer"
                                >-</button>
                                <span className="font-semibold text-slate-900 dark:text-white w-3 text-center">{room.adults}</span>
                                <button
                                  type="button"
                                  disabled={room.adults >= 10}
                                  onClick={() => setRooms(prev => {
                                    const next = [...prev];
                                    next[rIndex] = { ...next[rIndex] };
                                    next[rIndex].adults = Math.min(10, next[rIndex].adults + 1);
                                    return next;
                                  })}
                                  className="w-8 h-8 rounded-full border border-slate-250 dark:border-brand-emerald-700 flex items-center justify-center font-bold text-slate-750 dark:text-slate-200 cursor-pointer"
                                >+</button>
                              </div>
                            </div>

                            {/* Children */}
                            <div className="flex items-center justify-between mb-2">
                              <div>
                                <span className="block text-sm font-medium text-slate-700 dark:text-slate-200">Children</span>
                                <span className="block text-[10px] text-slate-500 dark:text-slate-400">Ages 0-17</span>
                              </div>
                              <div className="flex items-center gap-3">
                                <button
                                  type="button"
                                  disabled={room.children <= 0}
                                  onClick={() => setRooms(prev => {
                                    const next = [...prev];
                                    next[rIndex] = { ...next[rIndex] };
                                    next[rIndex].children = Math.max(0, next[rIndex].children - 1);
                                    next[rIndex].childrenAges = next[rIndex].childrenAges.slice(0, next[rIndex].children);
                                    return next;
                                  })}
                                  className="w-8 h-8 rounded-full border border-slate-250 dark:border-brand-emerald-700 flex items-center justify-center font-bold disabled:opacity-40 text-slate-750 dark:text-slate-200 cursor-pointer"
                                >-</button>
                                <span className="font-semibold text-slate-900 dark:text-white w-3 text-center">{room.children}</span>
                                <button
                                  type="button"
                                  disabled={room.children >= 6}
                                  onClick={() => setRooms(prev => {
                                    const next = [...prev];
                                    next[rIndex] = { ...next[rIndex] };
                                    next[rIndex].children = Math.min(6, next[rIndex].children + 1);
                                    next[rIndex].childrenAges = [...next[rIndex].childrenAges, 1];
                                    return next;
                                  })}
                                  className="w-8 h-8 rounded-full border border-slate-250 dark:border-brand-emerald-700 flex items-center justify-center font-bold text-slate-750 dark:text-slate-200 cursor-pointer"
                                >+</button>
                              </div>
                            </div>

                            {/* Children Ages */}
                            {room.children > 0 && (
                              <div className="mt-2 grid grid-cols-2 gap-2 bg-slate-50 dark:bg-brand-emerald-950 p-2.5 rounded-xl border border-slate-100 dark:border-brand-emerald-800/40">
                                {Array.from({ length: room.children }).map((_, cIndex) => (
                                  <div key={cIndex} className="flex flex-col gap-1">
                                    <label className="text-[10px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Age (Child {cIndex + 1})</label>
                                    <select
                                      value={room.childrenAges[cIndex] || 1}
                                      onChange={(e) => setRooms(prev => {
                                        const next = [...prev];
                                        next[rIndex] = { ...next[rIndex], childrenAges: [...next[rIndex].childrenAges] };
                                        next[rIndex].childrenAges[cIndex] = parseInt(e.target.value, 10);
                                        return next;
                                      })}
                                      className="w-full bg-white dark:bg-[#060b14] border border-slate-200 dark:border-brand-emerald-800 text-slate-800 dark:text-slate-200 text-xs rounded-lg px-2 py-1.5 focus:outline-none focus:border-brand-gold-500"
                                    >
                                      {Array.from({ length: 18 }).map((_, age) => (
                                        <option key={age} value={age}>{age} {age === 1 ? 'year' : 'years'} old</option>
                                      ))}
                                    </select>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                      
                      <button
                        type="button"
                        onClick={() => setRooms(prev => [...prev, { adults: 1, children: 0, childrenAges: [] }])}
                        className="mt-4 w-full py-2.5 text-center text-xs font-semibold border border-brand-emerald-300 dark:border-brand-gold-500/40 text-brand-emerald-700 dark:text-brand-gold-400 rounded-xl hover:bg-brand-emerald-50 dark:hover:bg-brand-emerald-900/20 cursor-pointer"
                      >
                        Add another room
                      </button>

                      <button
                        type="button"
                        onClick={() => setShowGuestDropdown(false)}
                        className="mt-2 w-full py-2.5 text-center text-xs font-semibold bg-brand-emerald-500 text-white rounded-xl hover:bg-brand-emerald-600 dark:bg-brand-gold-500 dark:text-brand-emerald-950 shadow-sm cursor-pointer"
                      >
                        {t('hero.done')}
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
                      <span>{t('hero.search')}</span>
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
                {showFilters ? t('hero.hideHalalFilters') : t('hero.showHalalFilters')}
                {Object.values(filters).filter(Boolean).length > 0 && (
                  <span className="ml-1 bg-brand-emerald-100 dark:bg-brand-emerald-800 text-brand-emerald-800 dark:text-brand-gold-100 text-[10px] px-1.5 py-0.5 rounded-full">
                    {Object.values(filters).filter(Boolean).length} {t('hero.active')}
                  </span>
                )}
              </button>
              <div className="flex items-center gap-1.5 text-xs text-slate-450 dark:text-slate-400">
                <Check className="w-3.5 h-3.5 text-brand-gold-500" />
                {t('hero.shariah')}
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
                    {filtersList.map((filter) => (
                      <button
                        key={filter.key}
                        type="button"
                        onClick={() => toggleFilter(filter.key)}
                        className={`p-3 rounded-2xl border text-left transition-all duration-200 cursor-pointer flex flex-col justify-between h-20 ${filters[filter.key]
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

          {/* Call to Actions (under search widget) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8"
          >
            <a
              href="#destinations"
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-brand-emerald-500 hover:bg-brand-emerald-600 dark:bg-brand-gold-500 dark:hover:bg-brand-gold-600 text-white dark:text-brand-emerald-950 font-bold shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 group cursor-pointer"
            >
              {t('hero.startExploring')}
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            <button
              onClick={() => setShowDemo(true)}
              className="w-full sm:w-auto px-8 py-4 rounded-full border border-slate-200 dark:border-brand-emerald-800/80 bg-white/70 dark:bg-brand-emerald-950/40 backdrop-blur-md text-slate-700 dark:text-brand-gold-200 hover:text-brand-emerald-600 dark:hover:text-brand-gold-500 font-semibold transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-sm hover:shadow-md"
            >
              <Play className="w-4 h-4 fill-current text-brand-gold-500" />
              {t('hero.watchDemo')}
            </button>
          </motion.div>
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
                    {t('hero.videoDemoDesc')}
                  </p>
                  <span className="text-xs font-semibold px-3 py-1 rounded-full border border-brand-gold-500/30 text-brand-gold-200 uppercase tracking-widest bg-brand-gold-500/10">
                    {t('hero.videoDemo')}
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
