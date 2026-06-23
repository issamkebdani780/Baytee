import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, ChevronLeft, ChevronRight, MapPin } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { searchDestinations } from '../api';

const CITIES = [
  {
    name: 'Makkah',
    country: 'Saudi Arabia',
    properties: '420+ Hotels',
    image: '/dest-makkah.png',
    tag: 'Spiritual Center',
    description: 'Spiritual, peaceful, and family-friendly stays close to the Haram.',
  },
  {
    name: 'Madinah',
    country: 'Saudi Arabia',
    properties: '280+ Hotels',
    image: '/dest-madinah.png',
    tag: 'Holy Sanctuary',
    description: 'Serene stays with direct access to Al-Masjid an-Nabawi.',
  },
  {
    name: 'Istanbul',
    country: 'Turkey',
    properties: '1,450+ Hotels',
    image: '/dest-istanbul.png',
    tag: 'Ottoman Heritage',
    description: 'Rich Islamic heritage, historic mosques, and stunning Bosphorus views.',
  },
  {
    name: 'Antalya',
    country: 'Turkey',
    properties: '320+ Resorts',
    image: '/dest-antalya.png',
    tag: 'Halal Beachfronts',
    description: 'Coastal resorts featuring fully secluded ladies-only private pools and beaches.',
  },
  {
    name: 'Dubai',
    country: 'United Arab Emirates',
    properties: '980+ Hotels',
    image: '/dest-dubai.png',
    tag: 'Modern Luxury',
    description: 'Sky-high family suites, luxury shopping, and premium halal dining.',
  },
  {
    name: 'Kuala Lumpur',
    country: 'Malaysia',
    properties: '640+ Hotels',
    image: '/dest-kualalumpur.png',
    tag: 'Islamic Culture',
    description: 'Tropical beauty combined with rich cultural heritage and child-friendly stays.',
  },
  {
    name: 'Marrakech',
    country: 'Morocco',
    properties: '210+ Riads',
    image: '/dest-marrakech.png',
    tag: 'Cultural Oasis',
    description: 'Exquisite traditional riads, vibrant spice souks, and beautiful heritage mosques.',
  }
];

const COUNTRIES = [
  {
    name: 'Saudi Arabia',
    country: 'Middle East',
    properties: '700+ Hotels',
    image: '/dest-makkah.png',
    tag: 'Holy Lands',
    description: 'Spiritual journeys in Makkah & Madinah and luxury beach resorts in Jeddah.',
  },
  {
    name: 'Turkey',
    country: 'Europe/Asia',
    properties: '1,770+ Stays',
    image: '/dest-istanbul.png',
    tag: 'East Meets West',
    description: 'Historical exploration in Istanbul and private beachfront villas in Antalya.',
  },
  {
    name: 'Malaysia',
    country: 'Southeast Asia',
    properties: '640+ Stays',
    image: '/dest-kualalumpur.png',
    tag: 'Tropical Culture',
    description: 'Stunning rainforest hideaways, halal food paradise, and skyscrapers in KL.',
  },
  {
    name: 'Morocco',
    country: 'North Africa',
    properties: '210+ Riads',
    image: '/dest-marrakech.png',
    tag: 'African Oasis',
    description: 'Exquisite riads with absolute privacy, bustling medinas, and rich history.',
  },
  {
    name: 'United Arab Emirates',
    country: 'Middle East',
    properties: '980+ Stays',
    image: '/dest-dubai.png',
    tag: 'Premium Luxury',
    description: 'Family-friendly desert resorts, modern skyscrapers, and waterparks.',
  },
  {
    name: 'Maldives',
    country: 'Indian Ocean',
    properties: '150+ Resorts',
    image: '/dest-maldives.png',
    tag: 'Island Serenity',
    description: 'Private overwater bungalows with fully secluded pools and absolute seclusion.',
  }
];

const PICKS = [
  {
    name: 'Makkah',
    country: 'Saudi Arabia',
    properties: '420+ Hotels',
    image: '/dest-makkah.png',
    tag: 'Spiritual Center',
    description: 'Spiritual, peaceful, and family-friendly stays close to the Haram.',
  },
  {
    name: 'Istanbul',
    country: 'Turkey',
    properties: '1,450+ Hotels',
    image: '/dest-istanbul.png',
    tag: 'Ottoman Heritage',
    description: 'Rich Islamic heritage, historic mosques, and stunning Bosphorus views.',
  },
  {
    name: 'Maldives',
    country: 'Maldives',
    properties: '150+ Resorts',
    image: '/dest-maldives.png',
    tag: 'Secluded Paradise',
    description: 'Luxurious overwater private villas featuring fully secluded pools and private beaches.',
  },
  {
    name: 'Marrakech',
    country: 'Morocco',
    properties: '210+ Riads',
    image: '/dest-marrakech.png',
    tag: 'Cultural Oasis',
    description: 'Exquisite traditional riads, vibrant spice souks, and beautiful heritage mosques.',
  }
];

export default function Destinations() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  // Click handler: resolve real city/hotel ID then navigate to search results
  const handleDestinationClick = async (dest) => {
    const tomorrow  = new Date(Date.now() + 86400000).toISOString().split('T')[0];
    const dayAfter3 = new Date(Date.now() + 4 * 86400000).toISOString().split('T')[0];
    const paxRooms  = JSON.stringify([{ adults: 2, children: 0, childrenAges: [] }]);

    let destId   = '';
    let destType = 'city';
    let destName = dest.name;

    try {
      const res = await searchDestinations(dest.name);
      if (res.success && Array.isArray(res.data) && res.data.length > 0) {
        const match = res.data.find(d => d.name.toLowerCase() === dest.name.toLowerCase()) || res.data[0];
        destId   = match.id.toString();
        destType = match.type;
        destName = match.name;
      }
    } catch (err) {
      console.error('Failed to resolve destination:', err);
    }

    if (!destId) {
      // Fallback: navigate anyway, the search page handles missing IDs gracefully
      destId = '0';
    }

    const params = new URLSearchParams({ destId, destType, destName, checkIn: tomorrow, checkOut: dayAfter3, paxRooms });
    navigate(`/search?${params.toString()}`);
  };
  
  // Interactive Tab State
  const [activeTab, setActiveTab] = useState('picks'); // 'picks' | 'countries' | 'cities'
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(3);
  const [isAutoplay, setIsAutoplay] = useState(true);

  // Map active tab to active dataset
  const activeDataset = {
    picks: PICKS,
    countries: COUNTRIES,
    cities: CITIES,
  }[activeTab];

  // Reset index on tab change to prevent out of bounds slider values
  useEffect(() => {
    setCurrentIndex(0);
  }, [activeTab]);

  // Dynamic visible card counter based on screen width
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setVisibleCount(1);
      } else if (window.innerWidth < 1024) {
        setVisibleCount(2);
      } else {
        setVisibleCount(3);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const maxIndex = Math.max(activeDataset.length - visibleCount, 0);

  // Autoplay slideshow effect
  useEffect(() => {
    if (!isAutoplay) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    }, 3500); // Transitions to next card every 3.5 seconds

    return () => clearInterval(interval);
  }, [isAutoplay, maxIndex, currentIndex]);

  const handlePrev = () => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => Math.min(prev + 1, maxIndex));
  };

  const handleDotClick = (index) => {
    setCurrentIndex(Math.min(index, maxIndex));
  };

  return (
    <section id="destinations" className="py-24 bg-white dark:bg-[#0a1628] relative overflow-hidden transition-colors duration-300">
      {/* Subtle decorations */}
      <div className="absolute top-10 left-10 w-80 h-80 bg-brand-emerald-500/5 rounded-full ambient-glow pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-brand-gold-500/5 rounded-full ambient-glow pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center justify-center text-center mb-10">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight uppercase leading-none font-sans">
            <span className="block text-slate-900 dark:text-white mb-2">{t('destinations.sectionLabel')}</span>
            <span className="block text-brand-gold-500 drop-shadow-[0_0_15px_rgba(197,168,128,0.15)]">
              {t('destinations.heading')}
            </span>
          </h2>
          <p className="mt-6 text-sm sm:text-base text-slate-500 dark:text-slate-400 max-w-2xl leading-relaxed">
            {t('destinations.subtext')}
          </p>
        </div>

        {/* Premium Category Filter Tabs */}
        <div className="flex justify-center items-center gap-3 mb-10 flex-wrap">
          {[
            { id: 'picks', label: t('destinations.tabPicks') },
            { id: 'countries', label: t('destinations.tabCountries') },
            { id: 'cities', label: t('destinations.tabCities') },
          ].map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                  isActive
                    ? 'bg-brand-emerald-500 text-white dark:bg-brand-gold-500 dark:text-brand-emerald-950 shadow-md shadow-brand-emerald-500/10 dark:shadow-brand-gold-500/10'
                    : 'bg-slate-50 text-slate-650 dark:bg-brand-emerald-950/40 dark:text-slate-400 border border-slate-200/50 dark:border-brand-emerald-800/30 hover:bg-slate-100 dark:hover:bg-brand-emerald-900/40'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Carousel Outer Wrapper */}
        <div 
          className="relative overflow-hidden -mx-4 py-4 px-4"
          onMouseEnter={() => setIsAutoplay(false)}
          onMouseLeave={() => setIsAutoplay(true)}
        >
          <motion.div
            className="flex"
            animate={{ x: `-${currentIndex * (100 / visibleCount)}%` }}
            transition={{ type: 'spring', stiffness: 120, damping: 18 }}
          >
            {activeDataset.map((dest, idx) => (
              <div
                key={`${dest.name}-${idx}`}
                className="flex-shrink-0 w-full sm:w-1/2 lg:w-1/3 px-4"
                onClick={() => handleDestinationClick(dest)}
              >
                <motion.div
                  whileHover={{ y: -8 }}
                  className="group relative rounded-3xl overflow-hidden aspect-[4/5] sm:aspect-[3/4] border border-slate-200/50 dark:border-brand-emerald-800/30 bg-slate-100 dark:bg-brand-emerald-950 shadow-md hover:shadow-2xl transition-all duration-500 cursor-pointer"
                >
                  {/* Destination Image */}
                  <img
                    src={dest.image}
                    alt={dest.name}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    loading="lazy"
                  />

                  {/* Luxury dark gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-emerald-950 via-brand-emerald-950/40 to-transparent opacity-85 group-hover:opacity-90 transition-opacity duration-300" />

                  {/* Top Row: Tag badge on left, ArrowUpRight on right */}
                  <div className="absolute top-6 left-6 right-6 flex items-center justify-between z-10">
                    <span className="inline-block text-[10px] font-extrabold uppercase tracking-widest px-3 py-1.5 rounded-full border border-brand-gold-500/40 bg-brand-gold-500/20 text-brand-gold-200 backdrop-blur-sm shadow-md">
                      {dest.tag}
                    </span>
                    
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      className="w-8 h-8 rounded-full bg-white/90 dark:bg-brand-emerald-900/90 flex items-center justify-center text-brand-emerald-950 dark:text-brand-gold-500 shadow-lg cursor-pointer backdrop-blur-sm"
                    >
                      <ArrowUpRight className="w-4 h-4 stroke-[3px]" />
                    </motion.div>
                  </div>

                  {/* Bottom Content Box */}
                  <div className="absolute inset-0 p-6 sm:p-8 flex flex-col justify-end text-left">
                    <div>
                      {/* Country */}
                      <div className="text-[11px] font-bold text-brand-gold-500 uppercase tracking-widest mb-1.5 flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5" />
                        {dest.country}
                      </div>
                      
                      {/* Name */}
                      <h3 className="font-accent text-2xl sm:text-3xl font-extrabold text-white tracking-wide flex items-center gap-2 group-hover:text-glow-gold transition-all duration-300">
                        {dest.name}
                      </h3>

                      {/* Description */}
                      <p className="text-xs sm:text-[13px] text-slate-300 font-normal mt-2 leading-relaxed opacity-90">
                        {dest.description}
                      </p>

                      {/* Collapsible info block */}
                      <div className="h-0 opacity-0 group-hover:h-8 group-hover:opacity-100 group-hover:mt-4 transition-all duration-300 flex items-center justify-between border-t border-white/20 pt-4">
                        <span className="text-xs text-slate-300 font-semibold">{dest.properties}</span>
                        <span className="text-xs font-bold text-brand-gold-500 flex items-center gap-1">
                          {t('destinations.discoverStays')} &rarr;
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Subtle Gold Outer Border Overlay */}
                  <div className="absolute inset-0 border border-brand-gold-500/0 group-hover:border-brand-gold-500/50 rounded-3xl pointer-events-none transition-colors duration-300" />
                </motion.div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Carousel Controls */}
        <div className="flex items-center justify-center mt-12">
          
          {/* Navigation Pill Container */}
          <div className="bg-white dark:bg-brand-emerald-900/40 border border-slate-200 dark:border-brand-emerald-800/50 rounded-full px-5 py-2.5 flex items-center gap-5 shadow-lg backdrop-blur-sm transition-colors duration-300">
            {/* Left Button */}
            <button
              onClick={handlePrev}
              disabled={currentIndex === 0}
              className={`text-slate-400 hover:text-slate-700 dark:text-brand-emerald-400 dark:hover:text-brand-gold-500 transition-colors cursor-pointer ${
                currentIndex === 0 ? 'opacity-30 cursor-not-allowed' : ''
              }`}
            >
              <ChevronLeft className="w-5 h-5 stroke-[2.5px]" />
            </button>

             {/* Dots */}
             <div className="flex items-center gap-2">
               {Array.from({ length: maxIndex + 1 }).map((_, i) => {
                 const isActive = i === currentIndex;
                 return (
                   <button
                     key={i}
                     onClick={() => handleDotClick(i)}
                     className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                       isActive 
                         ? 'w-7 bg-brand-gold-500' 
                         : 'w-2.5 bg-slate-300 dark:bg-brand-emerald-800 hover:bg-slate-400 dark:hover:bg-brand-emerald-700'
                     }`}
                   />
                 );
               })}
             </div>

            {/* Right Button */}
            <button
              onClick={handleNext}
              disabled={currentIndex === maxIndex}
              className={`text-slate-400 hover:text-slate-700 dark:text-brand-emerald-400 dark:hover:text-brand-gold-500 transition-colors cursor-pointer ${
                currentIndex === maxIndex ? 'opacity-30 cursor-not-allowed' : ''
              }`}
            >
              <ChevronRight className="w-5 h-5 stroke-[2.5px]" />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
}
