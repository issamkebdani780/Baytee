import { useState } from 'react';
import { Utensils, Waves, Home, Shield, Compass, BookOpen } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';

export default function Features() {
  const { t } = useTranslation();
  const [active, setActive] = useState(5); // last item expanded by default

  const featuresList = [
    {
      icon: <Utensils className="w-4 h-4" />,
      title: t('features.halalFoodTitle'),
      description: t('features.halalFoodDesc'),
      image: '/hotel-istanbul.png',
    },
    {
      icon: <Waves className="w-4 h-4" />,
      title: t('features.womenPoolTitle'),
      description: t('features.womenPoolDesc'),
      image: '/hotel-maldives.png',
    },
    {
      icon: <Home className="w-4 h-4" />,
      title: t('features.villaTitle'),
      description: t('features.villaDesc'),
      image: '/hotel-morocco.png',
    },
    {
      icon: <Shield className="w-4 h-4" />,
      title: t('features.alcoholTitle'),
      description: t('features.alcoholDesc'),
      image: '/hotel-dubai.png',
    },
    {
      icon: <Compass className="w-4 h-4" />,
      title: t('features.prayerTitle'),
      description: t('features.prayerDesc'),
      image: '/hotel-malaysia.png',
    },
    {
      icon: <BookOpen className="w-4 h-4" />,
      title: t('features.umrahTitle'),
      description: t('features.umrahDesc'),
      image: '/hotel-istanbul.png',
    },
  ];

  const activeFeature = featuresList[active];

  return (
    <section id="features" className="py-20 md:py-28 bg-[#FCFBF9] dark:bg-[#07140e] relative overflow-hidden">

      {/* ── Section heading ── */}
      <div className="max-w-4xl mx-auto px-6 text-center mb-12">
        <motion.span
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-xs font-bold uppercase tracking-widest text-brand-gold-600 dark:text-brand-gold-500 block mb-3"
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

      {/* ── Main interactive panel ── */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.15 }}
        className="max-w-6xl mx-auto px-4 md:px-8"
      >
        <div className="relative rounded-3xl overflow-hidden border border-slate-200/60 dark:border-brand-emerald-800/30 shadow-2xl flex flex-col lg:flex-row min-h-[480px] lg:min-h-[520px]">

          {/* ── Left: Feature list ── */}
          <div className="relative z-10 lg:w-[340px] xl:w-[380px] shrink-0 flex flex-col justify-center gap-2 p-6 md:p-8 bg-white/90 dark:bg-brand-emerald-950/90 backdrop-blur-md">
            {featuresList.map((feat, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className="text-left w-full group transition-all duration-200"
              >
                {/* Pill row */}
                <div
                  className={`flex items-center gap-2.5 px-4 py-2.5 rounded-2xl font-semibold text-sm transition-all duration-200 ${
                    active === i
                      ? 'bg-brand-emerald-800/90 dark:bg-brand-emerald-700/80 text-white shadow-lg'
                      : 'bg-slate-100/70 dark:bg-brand-emerald-900/40 text-slate-700 dark:text-slate-300 hover:bg-slate-200/60 dark:hover:bg-brand-emerald-800/40'
                  }`}
                >
                  <span className={active === i ? 'text-brand-gold-400' : 'text-brand-gold-500'}>
                    {feat.icon}
                  </span>
                  {feat.title}
                </div>

                {/* Expanded description — only for active */}
                <AnimatePresence initial={false}>
                  {active === i && (
                    <motion.div
                      key="desc"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.28, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <div className="mt-2 mx-1 px-4 py-3 rounded-2xl bg-brand-emerald-900/10 dark:bg-brand-emerald-800/20 border border-brand-emerald-200/40 dark:border-brand-emerald-700/30">
                        <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                          {feat.description}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            ))}
          </div>

          {/* ── Right: Hotel image ── */}
          <div className="relative flex-1 min-h-[280px] lg:min-h-0">
            <AnimatePresence mode="wait">
              <motion.img
                key={activeFeature.image + active}
                src={activeFeature.image}
                alt={activeFeature.title}
                initial={{ opacity: 0, scale: 1.04 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.45, ease: 'easeInOut' }}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </AnimatePresence>
            {/* Gradient bleed into left panel on large screens */}
            <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-white/60 dark:from-brand-emerald-950/60 to-transparent hidden lg:block pointer-events-none" />
            {/* Bottom text overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/70 via-black/30 to-transparent">
              <p className="text-white font-bold text-base drop-shadow">{activeFeature.title}</p>
              <p className="text-white/75 text-xs mt-1 max-w-xs leading-relaxed line-clamp-2">{activeFeature.description}</p>
            </div>
          </div>

        </div>
      </motion.div>
    </section>
  );
}
