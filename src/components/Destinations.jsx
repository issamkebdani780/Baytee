import { motion } from 'framer-motion';
import { ArrowUpRight, MapPin } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function Destinations() {
  const { t } = useTranslation();

  const destinationList = [
    {
      name: 'Makkah',
      country: 'Saudi Arabia',
      properties: '420+ Hotels',
      image: 'https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?auto=format&fit=crop&w=600&q=80',
      tag: 'Spiritual Center',
    },
    {
      name: 'Madinah',
      country: 'Saudi Arabia',
      properties: '280+ Hotels',
      image: 'https://images.unsplash.com/photo-1597843797221-72218451897e?auto=format&fit=crop&w=600&q=80',
      tag: 'Holy Sanctuary',
    },
    {
      name: 'Istanbul',
      country: 'Turkey',
      properties: '1,450+ Hotels',
      image: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&w=600&q=80',
      tag: 'Ottoman Heritage',
    },
    {
      name: 'Antalya',
      country: 'Turkey',
      properties: '320+ Resorts',
      image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=600&q=80',
      tag: 'Halal Beachfronts',
    },
    {
      name: 'Dubai',
      country: 'United Arab Emirates',
      properties: '980+ Hotels',
      image: 'https://images.unsplash.com/photo-1582672093685-704155248536?auto=format&fit=crop&w=600&q=80',
      tag: 'Modern Luxury',
    },
    {
      name: 'Kuala Lumpur',
      country: 'Malaysia',
      properties: '640+ Hotels',
      image: 'https://images.unsplash.com/photo-1595497743400-13f224327363?auto=format&fit=crop&w=600&q=80',
      tag: 'Islamic Culture',
    },
  ];

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 18,
      },
    },
  };

  return (
    <section id="destinations" className="py-24 bg-white dark:bg-brand-emerald-950/20 relative overflow-hidden">
      {/* Subtle decorations */}
      <div className="absolute top-10 left-10 w-80 h-80 bg-brand-emerald-500/5 rounded-full ambient-glow" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-brand-gold-500/5 rounded-full ambient-glow" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6 text-left">
          <div className="max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-widest text-brand-gold-600 dark:text-brand-gold-500 font-sans block mb-3">
              {t('destinations.sectionLabel')}
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-brand-emerald-950 dark:text-white leading-tight font-sans">
              {t('destinations.heading')}
            </h2>
            <p className="mt-4 text-base text-slate-500 dark:text-slate-400">
              {t('destinations.subtext')}
            </p>
          </div>
          <div>
            <a
              href="#explore"
              className="inline-flex items-center gap-2 text-sm font-bold text-brand-emerald-700 dark:text-brand-gold-500 hover:opacity-80 border-b-2 border-brand-gold-500 pb-1 cursor-pointer transition-all"
            >
              {t('destinations.viewAll')}
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Destinations Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {destinationList.map((dest) => (
            <motion.div
              variants={itemVariants}
              key={dest.name}
              whileHover={{ y: -8 }}
              className="group relative rounded-3xl overflow-hidden aspect-[4/5] sm:aspect-[3/4] border border-slate-200/50 dark:border-brand-emerald-800/30 bg-slate-100 shadow-md hover:shadow-2xl transition-all duration-500 cursor-pointer"
            >
              {/* Destination Image */}
              <img
                src={dest.image}
                alt={dest.name}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                loading="lazy"
              />

              {/* Luxury dark gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-brand-emerald-950 via-brand-emerald-950/40 to-transparent opacity-85 group-hover:opacity-90 transition-opacity duration-300" />

              {/* Content Box */}
              <div className="absolute inset-0 p-6 sm:p-8 flex flex-col justify-between text-left">
                {/* Top Row: Tag badge */}
                <div>
                  <span className="inline-block text-[10px] font-extrabold uppercase tracking-widest px-3 py-1 rounded-full border border-brand-gold-500/40 bg-brand-gold-500/10 text-brand-gold-300 backdrop-blur-sm">
                    {dest.tag}
                  </span>
                </div>

                {/* Bottom Row: Text description & hover effect */}
                <div>
                  <div className="text-[11px] font-bold text-brand-gold-500 uppercase tracking-widest mb-1.5 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5" />
                    {dest.country}
                  </div>
                  <h3 className="font-accent text-2xl sm:text-3xl font-extrabold text-white tracking-wide flex items-center gap-2 group-hover:text-glow-gold transition-all duration-300">
                    {dest.name}
                  </h3>
                  
                  {/* Collapsible info block */}
                  <div className="h-0 opacity-0 group-hover:h-8 group-hover:opacity-100 group-hover:mt-4 transition-all duration-300 flex items-center justify-between border-t border-white/20 pt-4">
                    <span className="text-xs text-slate-300 font-semibold">{dest.properties}</span>
                    <span className="text-xs font-bold text-brand-gold-400 flex items-center gap-1">
                      {t('destinations.discoverStays')} &rarr;
                    </span>
                  </div>
                </div>
              </div>

              {/* Subtle Gold Outer Border Overlay */}
              <div className="absolute inset-0 border border-brand-gold-500/0 group-hover:border-brand-gold-500/50 rounded-3xl pointer-events-none transition-colors duration-300" />
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
