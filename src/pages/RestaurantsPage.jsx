import { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Star, Utensils, Search, ArrowLeft, Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import { MOCK_RESTAURANTS } from '../data/mockRestaurants';

function RestaurantCard({ restaurant }) {
  const [liked, setLiked] = useState(false);
  const navigate = useNavigate();

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4 }}
      className="group bg-white dark:bg-[#0a1628] rounded-2xl overflow-hidden border border-slate-200/60 dark:border-brand-emerald-900/40 hover:shadow-xl hover:shadow-brand-emerald-900/5 dark:hover:shadow-brand-emerald-900/20 transition-all duration-300 flex flex-col"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={restaurant.image}
          alt={restaurant.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        
        {/* Top actions */}
        <div className="absolute top-3 left-3 right-3 flex justify-between items-start">
          <div className="flex gap-1.5">
            <span className="px-2.5 py-1 text-xs font-bold bg-white/95 dark:bg-[#0a1628]/95 text-brand-emerald-600 dark:text-brand-gold-400 rounded-lg shadow-sm backdrop-blur-md flex items-center gap-1">
              <Star className="w-3.5 h-3.5 fill-current" />
              {restaurant.rating}
            </span>
          </div>
          <button
            onClick={(e) => { e.stopPropagation(); setLiked(!liked); }}
            className="p-2 rounded-full bg-white/95 dark:bg-[#0a1628]/95 text-slate-400 dark:text-slate-500 hover:text-red-500 dark:hover:text-red-400 shadow-sm backdrop-blur-md transition-colors z-10"
          >
            <Heart className={`w-4 h-4 ${liked ? 'fill-red-500 text-red-500 dark:text-red-400' : ''}`} />
          </button>
        </div>
      </div>

      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-start justify-between gap-3 mb-2">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white leading-tight">
            {restaurant.name}
          </h3>
          <span className="text-sm font-semibold text-brand-emerald-600 dark:text-brand-gold-500 shrink-0">
            {restaurant.priceRange}
          </span>
        </div>

        <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 mb-3">
          <MapPin className="w-3.5 h-3.5" />
          <span>{restaurant.location}</span>
          <span className="mx-1">•</span>
          <Utensils className="w-3.5 h-3.5" />
          <span>{restaurant.cuisine}</span>
        </div>

        <p className="text-sm text-slate-600 dark:text-slate-300 line-clamp-2 mb-4 flex-1">
          {restaurant.description}
        </p>

        <div className="flex flex-wrap gap-1.5 mb-5 mt-auto">
          {restaurant.tags.map(tag => (
            <span key={tag} className="px-2 py-1 text-[11px] font-semibold bg-brand-emerald-50 dark:bg-brand-emerald-900/30 text-brand-emerald-600 dark:text-brand-gold-400 rounded-md">
              {tag}
            </span>
          ))}
        </div>

        <button 
          onClick={() => navigate(`/restaurant/${restaurant.id}`)}
          className="w-full py-2.5 rounded-xl bg-brand-emerald-500 hover:bg-brand-emerald-600 dark:bg-brand-gold-500 dark:hover:bg-brand-gold-600 text-white dark:text-brand-emerald-950 text-sm font-bold shadow transition-all duration-200 cursor-pointer"
        >
          View Restaurant
        </button>
      </div>
    </motion.div>
  );
}

export default function RestaurantsPage() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredRestaurants = MOCK_RESTAURANTS.filter(r => 
    r.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    r.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.cuisine.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col font-sans bg-slate-50 dark:bg-[#060b14] text-slate-900 dark:text-slate-100 pt-[130px]">
      <Header />

      {/* Top Bar */}
      <div className="sticky top-[76px] z-40 bg-white/90 dark:bg-[#060b14]/95 backdrop-blur-lg border-b border-slate-200 dark:border-brand-emerald-900/40 shadow-sm">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-3 flex items-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-1.5 text-sm font-semibold text-brand-emerald-600 dark:text-brand-gold-400 hover:opacity-80 transition cursor-pointer flex-shrink-0"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Back</span>
          </button>
          
          <div className="w-px h-6 bg-slate-200 dark:bg-brand-emerald-800/50 flex-shrink-0" />
          
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 dark:text-slate-500" />
            <input
              type="text"
              placeholder="Search halal restaurants by name, city, or cuisine..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-slate-100 dark:bg-[#0a1628] border-none rounded-xl text-sm focus:ring-2 focus:ring-brand-emerald-500 dark:focus:ring-brand-gold-500 outline-none placeholder:text-slate-500 dark:text-white transition-all"
            />
          </div>
        </div>
      </div>

      <main className="flex-1 max-w-screen-xl w-full mx-auto px-4 sm:px-6 py-8 md:py-12">
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-2">
            Halal Restaurants & Dining
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            Discover verified halal culinary experiences, from fine dining to authentic local street food around the world.
          </p>
        </div>

        <div className="flex items-center justify-between mb-6">
          <span className="text-sm font-bold text-slate-700 dark:text-slate-300">
            {filteredRestaurants.length} restaurants found
          </span>
        </div>

        {filteredRestaurants.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRestaurants.map(restaurant => (
              <RestaurantCard key={restaurant.id} restaurant={restaurant} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <Utensils className="w-12 h-12 text-slate-300 dark:text-slate-600 mb-4" />
            <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200 mb-2">No restaurants found</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">Try adjusting your search criteria.</p>
          </div>
        )}
      </main>
    </div>
  );
}
