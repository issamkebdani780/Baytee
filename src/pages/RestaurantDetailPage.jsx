import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Star, Utensils, ArrowLeft, Heart, Share2, Info, Clock, Phone } from 'lucide-react';
import Header from '../components/Header';
import { MOCK_RESTAURANTS } from '../data/mockRestaurants';

export default function RestaurantDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [liked, setLiked] = useState(false);

  const restaurant = MOCK_RESTAURANTS.find(r => r.id === parseInt(id, 10));

  if (!restaurant) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 dark:bg-[#060b14]">
        <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200">Restaurant not found</h2>
        <button onClick={() => navigate(-1)} className="mt-4 px-4 py-2 bg-brand-emerald-500 text-white rounded-xl">Go Back</button>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col font-sans bg-slate-50 dark:bg-[#060b14] text-slate-900 dark:text-slate-100 pt-[76px]">
      <Header />

      {/* Hero Image Section */}
      <div className="relative h-[40vh] sm:h-[50vh] w-full bg-slate-200 dark:bg-slate-800">
        <img 
          src={restaurant.image} 
          alt={restaurant.name} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#060b14]/80 via-transparent to-black/30" />
        
        {/* Top actions */}
        <div className="absolute top-6 left-4 sm:left-8 right-4 sm:right-8 flex justify-between items-center">
          <button
            onClick={() => navigate(-1)}
            className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/40 backdrop-blur-md flex items-center justify-center text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex gap-3">
            <button className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/40 backdrop-blur-md flex items-center justify-center text-white transition-colors">
              <Share2 className="w-4 h-4" />
            </button>
            <button 
              onClick={() => setLiked(!liked)}
              className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/40 backdrop-blur-md flex items-center justify-center text-white transition-colors"
            >
              <Heart className={`w-4 h-4 ${liked ? 'fill-red-500 text-red-500' : ''}`} />
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="flex-1 max-w-screen-xl w-full mx-auto px-4 sm:px-6 py-8 md:py-12 flex flex-col lg:flex-row gap-8 lg:gap-12 -mt-16 relative z-10">
        
        {/* Left Column: Details */}
        <div className="flex-1 bg-white dark:bg-[#0a1628] rounded-3xl p-6 sm:p-8 shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-brand-emerald-900/30">
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="px-3 py-1 text-xs font-bold uppercase tracking-wider bg-brand-emerald-500 dark:bg-brand-gold-500 text-white dark:text-brand-emerald-950 rounded-lg">
              {restaurant.cuisine}
            </span>
            <span className="px-3 py-1 text-xs font-bold bg-slate-100 dark:bg-brand-emerald-900/30 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-brand-emerald-800/50 rounded-lg">
              {restaurant.priceRange}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mb-4 leading-tight">
            {restaurant.name}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-sm font-medium text-slate-600 dark:text-slate-300 mb-8">
            <div className="flex items-center gap-1.5 text-brand-emerald-600 dark:text-brand-gold-500">
              <Star className="w-5 h-5 fill-current" />
              <span className="text-base font-bold">{restaurant.rating}</span>
              <span className="text-slate-500 dark:text-slate-400">({restaurant.reviews} reviews)</span>
            </div>
            <div className="w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-slate-700" />
            <div className="flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-slate-400" />
              {restaurant.location}
            </div>
          </div>

          <div className="h-px w-full bg-slate-100 dark:bg-brand-emerald-900/30 mb-8" />

          <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-4">About</h2>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-8">
            {restaurant.description}
          </p>

          <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-4">Highlights</h2>
          <div className="flex flex-wrap gap-2 mb-8">
            {restaurant.tags.map(tag => (
              <span key={tag} className="flex items-center gap-2 px-4 py-2 bg-slate-50 dark:bg-brand-emerald-900/20 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-brand-emerald-800/40 rounded-xl text-sm font-medium">
                <Utensils className="w-4 h-4 text-brand-emerald-500 dark:text-brand-gold-500" />
                {tag}
              </span>
            ))}
          </div>

        </div>

        {/* Right Column: Sticky Sidebar Info */}
        <div className="w-full lg:w-[380px] shrink-0">
          <div className="sticky top-[100px] flex flex-col gap-6">
            
            {/* Info Card */}
            <div className="bg-white dark:bg-[#0a1628] rounded-3xl p-6 border border-slate-200/60 dark:border-brand-emerald-900/40 shadow-lg shadow-slate-200/40 dark:shadow-none">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6">Practical Information</h3>
              
              <div className="space-y-5">
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-brand-emerald-50 dark:bg-brand-emerald-900/30 flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5 text-brand-emerald-600 dark:text-brand-gold-400" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-800 dark:text-slate-200 mb-1">Opening Hours</p>
                    <p className="text-sm text-slate-500 dark:text-slate-400">Mon - Sun: 11:00 AM - 11:00 PM</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-brand-emerald-50 dark:bg-brand-emerald-900/30 flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5 text-brand-emerald-600 dark:text-brand-gold-400" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-800 dark:text-slate-200 mb-1">Contact</p>
                    <p className="text-sm text-slate-500 dark:text-slate-400">+1 234 567 8900</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-brand-emerald-50 dark:bg-brand-emerald-900/30 flex items-center justify-center shrink-0">
                    <Info className="w-5 h-5 text-brand-emerald-600 dark:text-brand-gold-400" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-800 dark:text-slate-200 mb-1">Halal Status</p>
                    <p className="text-sm text-slate-500 dark:text-slate-400">Fully verified. Certificate available upon request.</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-100 dark:border-brand-emerald-900/30">
                <button className="w-full py-3.5 rounded-xl bg-brand-emerald-500 hover:bg-brand-emerald-600 dark:bg-brand-gold-500 dark:hover:bg-brand-gold-600 text-white dark:text-brand-emerald-950 font-bold shadow-md transition-all duration-200 text-sm">
                  Reserve a Table
                </button>
              </div>
            </div>
            
          </div>
        </div>

      </main>
    </div>
  );
}
