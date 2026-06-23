import { Utensils, Waves, Home, Shield, Compass, BookOpen } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

export default function Features() {
  const { t } = useTranslation();

  const featuresList = [
    {
      icon: <Utensils className="w-5 h-5" />,
      title: t('features.halalFoodTitle'),
      description: t('features.halalFoodDesc'),
      badge: t('features.halalFoodBadge'),
      image: '/hotel-istanbul.png',
      gridClass: 'col-span-12 md:col-span-6 lg:col-span-4',
      isImageCard: false,
    },
    {
      icon: <Waves className="w-5 h-5" />,
      title: t('features.womenPoolTitle'),
      description: t('features.womenPoolDesc'),
      badge: t('features.womenPoolBadge'),
      image: '/hotel-maldives.png',
      gridClass: 'col-span-12 lg:col-span-8',
      isImageCard: true,
    },
    {
      icon: <BookOpen className="w-5 h-5" />,
      title: t('features.umrahTitle'),
      description: t('features.umrahDesc'),
      badge: t('features.umrahBadge'),
      image: '/hotel-umrah.png',
      gridClass: 'col-span-12 lg:col-span-8',
      isImageCard: true,
    },
    {
      icon: <Home className="w-5 h-5" />,
      title: t('features.villaTitle'),
      description: t('features.villaDesc'),
      badge: t('features.villaBadge'),
      image: '/hotel-morocco.png',
      gridClass: 'col-span-12 md:col-span-6 lg:col-span-4',
      isImageCard: false,
    },
    {
      icon: <Shield className="w-5 h-5" />,
      title: t('features.alcoholTitle'),
      description: t('features.alcoholDesc'),
      badge: t('features.alcoholBadge'),
      image: '/hotel-dubai.png',
      gridClass: 'col-span-12 md:col-span-6 lg:col-span-6',
      isImageCard: false,
    },
    {
      icon: <Compass className="w-5 h-5" />,
      title: t('features.prayerTitle'),
      description: t('features.prayerDesc'),
      badge: t('features.prayerBadge'),
      image: '/hotel-malaysia.png',
      gridClass: 'col-span-12 md:col-span-6 lg:col-span-6',
      isImageCard: false,
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

  const cardVariants = {
    hidden: { opacity: 0, y: 35 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.65, ease: [0.215, 0.61, 0.355, 1] },
    },
  };

  return (
    <section id="features" className="py-20 md:py-28 bg-[#FCFBF9] dark:bg-[#0a1628] relative overflow-hidden">
      {/* Decorative background vectors */}
      <div className="absolute top-1/3 left-1/10 w-72 h-72 bg-brand-gold-100/10 dark:bg-brand-emerald-800/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/10 w-96 h-96 bg-brand-emerald-250/10 dark:bg-brand-emerald-900/5 rounded-full blur-3xl pointer-events-none" />

      {/* ── Section heading ── */}
      <div className="max-w-4xl mx-auto px-6 text-center mb-16">
        <motion.span
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-xs font-bold uppercase tracking-widest text-brand-gold-650 dark:text-brand-gold-500 block mb-3"
        >
          {t('features.sectionLabel')}
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.05 }}
          className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-brand-emerald-950 dark:text-white leading-tight tracking-tight"
        >
          {t('features.heading')}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.12 }}
          className="mt-4 text-base md:text-lg text-slate-500 dark:text-slate-400 max-w-2xl mx-auto"
        >
          {t('features.subtext')}
        </motion.p>
      </div>

      {/* ── Bento Grid container ── */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
        className="max-w-6xl mx-auto px-6 md:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 relative z-10"
      >
        {featuresList.map((feat, i) => {
          if (feat.isImageCard) {
            // Wide Image Background Card
            return (
              <motion.div
                key={i}
                variants={cardVariants}
                whileHover={{ y: -6 }}
                className={`${feat.gridClass} relative p-6 sm:p-8 rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-brand-emerald-900/10 transition-shadow duration-300 flex flex-col justify-end min-h-[320px] group cursor-pointer border border-slate-100/10 dark:border-brand-emerald-900/20`}
              >
                {/* Image Wrap */}
                <div className="absolute inset-0 z-0 overflow-hidden">
                  <img
                    src={feat.image}
                    alt={feat.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  {/* Overlay vignette */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-black/15 transition-opacity duration-300 group-hover:opacity-95" />
                </div>

                {/* Content */}
                <div className="relative z-10 w-full flex flex-col justify-end">
                  <div className="flex items-center justify-between gap-4 mb-4">
                    {/* Glowing Accent Icon wrap */}
                    <div className="w-11 h-11 rounded-2xl bg-white/10 backdrop-blur-md text-brand-gold-300 flex items-center justify-center border border-white/25 shadow-md shadow-black/15">
                      {feat.icon}
                    </div>
                    {/* Compliance Badge */}
                    <span className="text-[10px] font-extrabold uppercase tracking-widest px-3 py-1 rounded-full bg-brand-gold-500 text-brand-emerald-950 shadow-md border border-brand-gold-400">
                      {feat.badge}
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 tracking-tight">
                    {feat.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-200/90 max-w-xl leading-relaxed">
                    {feat.description}
                  </p>
                </div>
              </motion.div>
            );
          } else {
            // Standard Glassmorphic Card
            return (
              <motion.div
                key={i}
                variants={cardVariants}
                whileHover={{ y: -6 }}
                className={`${feat.gridClass} group relative p-6 sm:p-8 rounded-3xl overflow-hidden bg-white/80 dark:bg-brand-emerald-950/40 border border-slate-200/60 dark:border-brand-emerald-900/30 backdrop-blur-md shadow-md hover:shadow-2xl hover:shadow-brand-emerald-900/5 dark:hover:shadow-black/20 transition-all duration-300 flex flex-col justify-between min-h-[240px]`}
              >
                <div>
                  <div className="flex items-center justify-between gap-4 mb-6">
                    {/* Glowing Icon Wrap */}
                    <div className="w-11 h-11 rounded-2xl bg-brand-emerald-500/10 dark:bg-brand-gold-500/10 text-brand-emerald-700 dark:text-brand-gold-500 flex items-center justify-center border border-brand-emerald-500/20 dark:border-brand-gold-500/25 shadow-sm group-hover:scale-105 transition-transform duration-300">
                      {feat.icon}
                    </div>
                    {/* Compliance Badge */}
                    <span className="text-[10px] font-extrabold uppercase tracking-widest px-3 py-1 rounded-full bg-brand-gold-500/10 text-brand-gold-700 dark:text-brand-gold-400 border border-brand-gold-500/25">
                      {feat.badge}
                    </span>
                  </div>

                  <h3 className="text-lg sm:text-xl font-bold text-brand-emerald-950 dark:text-white mb-2 tracking-tight group-hover:text-brand-emerald-700 dark:group-hover:text-brand-gold-300 transition-colors">
                    {feat.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                    {feat.description}
                  </p>
                </div>
              </motion.div>
            );
          }
        })}
      </motion.div>
    </section>
  );
}
