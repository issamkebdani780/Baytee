import { useState } from 'react';
import { Heart, Star, Palmtree, Building2, Landmark, Tent, Waves, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import { MOCK_APARTMENTS } from '../data/mockApartments';

const CATEGORIES = [
  { name: 'Beachfront', icon: Palmtree },
  { name: 'City views', icon: Building2 },
  { name: 'Historical', icon: Landmark },
  { name: 'Cabins', icon: Tent },
  { name: 'Amazing pools', icon: Waves },
];

function ApartmentCard({ apartment }) {
  const [liked, setLiked] = useState(false);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4 }}
      className="group cursor-pointer flex flex-col gap-3"
    >
      <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-slate-200 dark:bg-slate-800">
        <img
          src={apartment.image}
          alt={apartment.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        
        {/* Heart Icon */}
        <button
          onClick={(e) => { e.stopPropagation(); setLiked(!liked); }}
          className="absolute top-3 right-3 p-2 rounded-full hover:scale-110 transition-transform z-10"
        >
          <Heart 
            className={`w-6 h-6 transition-colors drop-shadow-md ${liked ? 'fill-red-500 text-red-500' : 'fill-black/30 text-white'}`} 
            strokeWidth={1.5}
          />
        </button>

        {apartment.isSuperhost && (
          <div className="absolute top-4 left-4 bg-white/95 dark:bg-[#0a1628]/95 px-2 py-1 rounded-md text-[11px] font-bold shadow-sm text-slate-800 dark:text-slate-200 uppercase tracking-wider backdrop-blur-sm">
            Superhost
          </div>
        )}
      </div>

      <div className="flex flex-col gap-0.5 px-1">
        <div className="flex justify-between items-start gap-2">
          <h3 className="font-semibold text-slate-900 dark:text-white truncate">
            {apartment.location}
          </h3>
          <div className="flex items-center gap-1 text-slate-800 dark:text-slate-200 text-sm">
            <Star className="w-3.5 h-3.5 fill-current" />
            <span>{apartment.rating}</span>
          </div>
        </div>
        <p className="text-sm text-slate-500 dark:text-slate-400 truncate">{apartment.distance}</p>
        <p className="text-sm text-slate-500 dark:text-slate-400 truncate">{apartment.dates}</p>
        <div className="mt-1 flex items-center gap-1">
          <span className="font-semibold text-slate-900 dark:text-white">${apartment.price}</span>
          <span className="text-slate-900 dark:text-white">night</span>
        </div>
      </div>
    </motion.div>
  );
}

export default function ApartmentsPage() {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('Beachfront');

  const filteredApartments = activeCategory === 'All' 
    ? MOCK_APARTMENTS 
    : MOCK_APARTMENTS.filter(a => a.type === activeCategory);

  return (
    <div className="min-h-screen flex flex-col font-sans bg-white dark:bg-[#060b14] text-slate-900 dark:text-slate-100 pt-[76px]">
      <Header />

      {/* Sticky Categories Bar */}
      <div className="sticky top-[76px] z-40 bg-white dark:bg-[#060b14] border-b border-slate-200 dark:border-brand-emerald-900/40 shadow-sm">
        <div className="max-w-[2520px] mx-auto xl:px-20 md:px-10 sm:px-2 px-4 flex items-center gap-6 py-4 overflow-x-auto no-scrollbar">
          
          <button
            onClick={() => navigate(-1)}
            className="flex items-center justify-center w-8 h-8 rounded-full border border-slate-200 dark:border-slate-700 hover:shadow-md transition-shadow shrink-0 mr-2"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>

          {CATEGORIES.map(category => (
            <button
              key={category.name}
              onClick={() => setActiveCategory(category.name)}
              className={`flex flex-col items-center justify-center gap-2 min-w-[70px] pb-2 pt-15 border-b-2 transition-all shrink-0 ${
                activeCategory === category.name 
                  ? 'border-slate-900 dark:border-white text-slate-900 dark:text-white opacity-100' 
                  : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 opacity-70 hover:opacity-100 hover:border-slate-300 dark:hover:border-slate-600'
              }`}
            >
              <category.icon className="w-6 h-6" />
              <span className="text-xs font-semibold whitespace-nowrap">{category.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid */}
      <main className="flex-1 max-w-[2520px] mx-auto xl:px-20 md:px-10 sm:px-2 px-4 py-8">
        {filteredApartments.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6 gap-y-10">
            {filteredApartments.map(apartment => (
              <ApartmentCard key={apartment.id} apartment={apartment} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-32 text-center">
            <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-2">No exact matches</h3>
            <p className="text-slate-500 dark:text-slate-400">Try changing or removing some of your filters or exploring a different category.</p>
          </div>
        )}
      </main>
    </div>
  );
}
