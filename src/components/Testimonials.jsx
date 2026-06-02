import { useState } from 'react';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const TESTIMONIALS = [
  {
    id: 1,
    name: 'Zahra Ahmed',
    location: 'London, UK',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&h=150&q=80',
    stars: 5,
    text: "Finding hotels with private pools that are truly not overlooked was always an exhausting challenge. MuslimStay made booking our Antalya resort completely stress-free. Absolute privacy, verified halal dining, and peace of mind!",
    trip: 'Family Trip to Antalya',
  },
  {
    id: 2,
    name: 'Tariq Mansour',
    location: 'Chicago, USA',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150&q=80',
    stars: 5,
    text: "The AI Travel Companion is an absolute game-changer. I typed in my complex preferences for my elderly parents' Umrah trip and instantly received the perfect hotel recommendation with wheelchair access and Haram audio feed.",
    trip: 'Umrah in Makkah',
  },
  {
    id: 3,
    name: 'Farhan Syahputra',
    location: 'Jakarta, Indonesia',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&h=150&q=80',
    stars: 5,
    text: "Our stay at Ajwa Hotel Sultanahmet in Istanbul was a dream. Having a completely alcohol-free environment with traditional Ottoman architecture felt spiritually uplifting. MuslimStay is a must-use for halal travel.",
    trip: 'Historic Istanbul Tour',
  }
];

const slideVariants = {
  enter: (direction) => ({
    x: direction > 0 ? 100 : -100,
    opacity: 0,
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction) => ({
    zIndex: 0,
    x: direction < 0 ? 100 : -100,
    opacity: 0,
  }),
};

export default function Testimonials() {
  const { t } = useTranslation();
  const [[page, direction], setPage] = useState([0, 0]);

  // Wrap index
  const currentIndex = Math.abs(page % TESTIMONIALS.length);

  const paginate = (newDirection) => {
    setPage([page + newDirection, newDirection]);
  };

  return (
    <section id="testimonials" className="py-24 bg-brand-emerald-50/50 dark:bg-brand-emerald-950/10 relative overflow-hidden">
      {/* Background patterns */}
      <div className="absolute top-1/2 left-0 w-64 h-64 bg-brand-emerald-500/5 rounded-full ambient-glow" />
      <div className="absolute top-1/2 right-0 w-64 h-64 bg-brand-gold-500/5 rounded-full ambient-glow" />

      <div className="max-w-4xl mx-auto px-6 md:px-12 relative z-10 text-center">
        
        {/* Header */}
        <span className="text-xs font-bold uppercase tracking-widest text-brand-gold-600 dark:text-brand-gold-500 font-sans block mb-3">
          {t('testimonials.sectionLabel')}
        </span>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-brand-emerald-950 dark:text-white leading-tight font-sans mb-16">
          {t('testimonials.heading')}
        </h2>

        {/* Carousel Container */}
        <div className="relative min-h-[340px] flex items-center justify-center">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={page}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: 'spring', stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 },
              }}
              className="w-full p-8 sm:p-12 rounded-3xl border border-slate-200/80 dark:border-brand-emerald-800/40 bg-white dark:bg-brand-emerald-950/30 backdrop-blur-xl shadow-xl dark:shadow-2xl/20 flex flex-col items-center text-center"
            >
              {/* Quote Mark Icon */}
              <div className="w-12 h-12 rounded-full bg-brand-gold-500/10 text-brand-gold-600 dark:text-brand-gold-500 flex items-center justify-center mb-6">
                <Quote className="w-6 h-6 fill-current" />
              </div>

              {/* Text */}
              <p className="text-base sm:text-lg md:text-xl text-slate-700 dark:text-slate-250 italic leading-relaxed mb-8 max-w-2xl font-sans font-medium">
                "{TESTIMONIALS[currentIndex].text}"
              </p>

              {/* Stars */}
              <div className="flex items-center gap-1 mb-6">
                {[...Array(TESTIMONIALS[currentIndex].stars)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-current text-yellow-500" />
                ))}
              </div>

              {/* User Bio */}
              <div className="flex items-center gap-3">
                <img
                  src={TESTIMONIALS[currentIndex].image}
                  alt={TESTIMONIALS[currentIndex].name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-brand-gold-500"
                />
                <div className="text-left">
                  <h4 className="text-sm font-bold text-slate-800 dark:text-white">
                    {TESTIMONIALS[currentIndex].name}
                  </h4>
                  <p className="text-xs text-slate-400 dark:text-slate-500">
                    {TESTIMONIALS[currentIndex].location} •{' '}
                    <span className="text-brand-gold-600 dark:text-brand-gold-500 font-semibold">
                      {TESTIMONIALS[currentIndex].trip}
                    </span>
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Left Arrow */}
          <button
            onClick={() => paginate(-1)}
            className="absolute left-0 sm:-left-6 top-1/2 -translate-y-1/2 p-3 rounded-full border border-slate-200 dark:border-brand-emerald-800 bg-white/80 dark:bg-brand-emerald-950/80 text-slate-700 dark:text-brand-gold-500 hover:bg-brand-emerald-50 dark:hover:bg-brand-emerald-900 transition-all shadow-md z-10 cursor-pointer"
            aria-label={t('testimonials.prevSlide')}
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Right Arrow */}
          <button
            onClick={() => paginate(1)}
            className="absolute right-0 sm:-right-6 top-1/2 -translate-y-1/2 p-3 rounded-full border border-slate-200 dark:border-brand-emerald-800 bg-white/80 dark:bg-brand-emerald-950/80 text-slate-700 dark:text-brand-gold-500 hover:bg-brand-emerald-50 dark:hover:bg-brand-emerald-900 transition-all shadow-md z-10 cursor-pointer"
            aria-label={t('testimonials.nextSlide')}
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Bullet Indicators */}
        <div className="flex justify-center items-center gap-2 mt-8">
          {TESTIMONIALS.map((testimonial, idx) => (
            <button
              key={testimonial.id}
              onClick={() => {
                const diff = idx - currentIndex;
                if (diff !== 0) {
                  paginate(diff);
                }
              }}
              className={`h-2 rounded-full transition-all duration-300 ${
                idx === currentIndex
                  ? 'w-6 bg-brand-gold-500'
                  : 'w-2 bg-slate-300 dark:bg-brand-emerald-900'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
