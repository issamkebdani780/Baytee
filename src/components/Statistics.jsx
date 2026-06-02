import { motion } from 'framer-motion';
import { Globe, Hotel, Users } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function Statistics() {
  const { t } = useTranslation();

  const stats = [
    {
      id: 1,
      icon: <Hotel className="w-8 h-8 text-brand-gold-500 mb-4 mx-auto" />,
      number: t('stats.hotelsNumber'),
      label: t('stats.hotelsLabel'),
      desc: t('stats.hotelsDesc'),
    },
    {
      id: 2,
      icon: <Globe className="w-8 h-8 text-brand-gold-500 mb-4 mx-auto" />,
      number: t('stats.countriesNumber'),
      label: t('stats.countriesLabel'),
      desc: t('stats.countriesDesc'),
    },
    {
      id: 3,
      icon: <Users className="w-8 h-8 text-brand-gold-500 mb-4 mx-auto" />,
      number: t('stats.travelersNumber'),
      label: t('stats.travelersLabel'),
      desc: t('stats.travelersDesc'),
    },
  ];

  return (
    <section className="py-20 bg-white dark:bg-brand-emerald-950/20 relative overflow-hidden border-t border-b border-slate-100 dark:border-brand-emerald-900/40">
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center items-center">
          {stats.map((stat, idx) => (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              className="relative p-6 group"
            >
              {/* Icon Container */}
              <div className="transform group-hover:scale-110 transition-transform duration-300">
                {stat.icon}
              </div>

              {/* Number */}
              <h3 className="text-4xl sm:text-5xl font-extrabold text-brand-emerald-950 dark:text-white tracking-tight mb-2 font-sans group-hover:text-brand-emerald-600 dark:group-hover:text-brand-gold-500 transition-colors">
                {stat.number}
              </h3>

              {/* Label */}
              <h4 className="text-base font-bold text-slate-800 dark:text-slate-205 mb-2 uppercase tracking-wide">
                {stat.label}
              </h4>

              {/* Description */}
              <p className="text-sm text-slate-500 dark:text-slate-400 max-w-xs mx-auto">
                {stat.desc}
              </p>

              {/* Gold vertical divider lines for desktop */}
              {idx < 2 && (
                <div className="hidden md:block absolute top-1/4 right-0 w-[1px] h-1/2 bg-gradient-to-b from-transparent via-brand-gold-500/40 to-transparent" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
