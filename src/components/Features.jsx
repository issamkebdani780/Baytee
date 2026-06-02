import { Utensils, Waves, Home, Shield, Compass, BookOpen } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Features() {
  const featuresList = [
    {
      icon: <Utensils className="w-6 h-6 text-brand-gold-500" />,
      title: 'Halal Food Verified',
      description: '100% halal culinary options certified by international authorities, with zero cross-contamination risk.',
      badge: 'Certified',
    },
    {
      icon: <Waves className="w-6 h-6 text-brand-gold-500" />,
      title: 'Women-Only Pools',
      description: 'Fully secluded, high-walled pool and spa zones offering absolute privacy and peace of mind for women.',
      badge: 'Private',
    },
    {
      icon: <Home className="w-6 h-6 text-brand-gold-500" />,
      title: 'Private Villas',
      description: 'Luxury villas designed with privacy-first architecture, featuring completely unexposed outdoor pools.',
      badge: 'Luxury',
    },
    {
      icon: <Shield className="w-6 h-6 text-brand-gold-500" />,
      title: 'Alcohol-Free Hotels',
      description: 'A pure family-friendly atmosphere with zero alcohol served or allowed on the premises of selected properties.',
      badge: 'Family First',
    },
    {
      icon: <Compass className="w-6 h-6 text-brand-gold-500" />,
      title: 'Prayer Facilities',
      description: 'Rooms equipped with Qibla direction indicators, high-quality prayer rugs, and copies of the Holy Quran.',
      badge: 'Equipped',
    },
    {
      icon: <BookOpen className="w-6 h-6 text-brand-gold-500" />,
      title: 'Umrah Hotels',
      description: 'Curated premium stays in Makkah and Madinah with direct access, Haram views, and spiritual support guides.',
      badge: 'Spiritual',
    },
  ];

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 15,
      },
    },
  };

  return (
    <section id="features" className="py-24 bg-white dark:bg-brand-emerald-950/20 relative overflow-hidden">
      {/* Background Ornaments */}
      <div className="absolute top-1/2 left-0 w-72 h-72 bg-brand-emerald-100/10 dark:bg-brand-emerald-900/10 rounded-full ambient-glow" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-brand-gold-100/20 dark:bg-brand-gold-900/5 rounded-full ambient-glow" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Header Text */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-xs font-bold uppercase tracking-widest text-brand-gold-600 dark:text-brand-gold-500 font-sans block mb-3">
            Tailored Experiences
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-brand-emerald-950 dark:text-white leading-tight font-sans">
            Travel Without Compromise
          </h2>
          <p className="mt-4 text-base md:text-lg text-slate-500 dark:text-slate-400">
            Enjoy world-class luxury stays curated specifically for your Islamic values, verified by our rigorous compliance system.
          </p>
        </div>

        {/* Features Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {featuresList.map((feat) => (
            <motion.div
              variants={cardVariants}
              key={feat.title}
              whileHover={{ 
                y: -8,
                transition: { duration: 0.2, ease: 'easeInOut' }
              }}
              className="group relative p-8 rounded-3xl border border-slate-200/60 dark:border-brand-emerald-800/30 bg-slate-50/50 dark:bg-brand-emerald-950/30 backdrop-blur-md hover:shadow-xl dark:hover:shadow-brand-emerald-950/50 hover:bg-white dark:hover:bg-brand-emerald-950/50 transition-all duration-300 flex flex-col justify-between"
            >
              {/* Top Row: Icon + Badge */}
              <div className="flex items-center justify-between mb-6">
                <div className="p-3.5 rounded-2xl bg-brand-emerald-50 dark:bg-brand-emerald-900/50 border border-brand-emerald-100/40 dark:border-brand-emerald-800/40 group-hover:scale-105 transition-transform duration-300">
                  {feat.icon}
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-brand-gold-50 dark:bg-brand-emerald-900/40 text-brand-gold-700 dark:text-brand-gold-500 border border-brand-gold-100/30 dark:border-brand-emerald-800/30">
                  {feat.badge}
                </span>
              </div>

              {/* Title & Description */}
              <div>
                <h3 className="text-xl font-bold text-brand-emerald-950 dark:text-white mb-3 font-sans group-hover:text-brand-emerald-600 dark:group-hover:text-brand-gold-500 transition-colors duration-200">
                  {feat.title}
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                  {feat.description}
                </p>
              </div>

              {/* Luxury Accent Reveal border */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-1 bg-gradient-to-r from-brand-gold-600 to-brand-gold-500 group-hover:w-1/2 transition-all duration-300 rounded-t-full" />
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
