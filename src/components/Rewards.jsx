import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Award, Star, PlaneTakeoff } from 'lucide-react';

const PARTNERS = [
  {
    key: 'air_algerie',
    logo: '/air/Air-Alger.png',
  },
  {
    key: 'saudia',
    logo: '/air/Saudia_Logo.png',
  },
  {
    key: 'flynas',
    logo: '/air/images.png',
  }
];

// Repeat list to make it long enough for marquee scrolling (total 12 cards)
const SEAMLESS_PARTNERS = [
  ...PARTNERS,
  ...PARTNERS,
  ...PARTNERS,
  ...PARTNERS
];

export default function Rewards() {
  const { t } = useTranslation();

  return (
    <section id="rewards" className="py-16 md:py-20 bg-white dark:bg-brand-emerald-950/20 relative overflow-hidden border-t border-b border-slate-100 dark:border-brand-emerald-900/40">
      {/* Dynamic Keyframes injected locally to ensure LTR/RTL translation compatibility */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes marquee-scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marquee-scroll-rtl {
          0% { transform: translateX(0); }
          100% { transform: translateX(50%); }
        }
        .animate-marquee-scroll {
          display: flex;
          width: max-content;
          animation: marquee-scroll 25s linear infinite;
        }
        [dir="rtl"] .animate-marquee-scroll {
          animation: marquee-scroll-rtl 25s linear infinite;
        }
        .animate-marquee-scroll:hover {
          animation-play-state: paused;
        }
      `}} />

      {/* Decorative Radial Lights */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-brand-gold-50/30 via-transparent to-transparent dark:from-brand-gold-800/5 pointer-events-none" />
      <div className="absolute top-0 left-1/3 w-72 h-72 bg-brand-gold-100/10 dark:bg-brand-emerald-900/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-brand-gold-500/20 bg-brand-gold-500/5 dark:bg-brand-gold-500/10 mb-4"
          >
            <Award className="w-3.5 h-3.5 text-brand-gold-600 dark:text-brand-gold-400" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-brand-gold-700 dark:text-brand-gold-400">
              {t('rewards.sectionLabel')}
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="text-3xl sm:text-4xl font-extrabold text-brand-emerald-950 dark:text-white leading-tight tracking-tight"
          >
            {t('rewards.heading')}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.12 }}
            className="mt-3 text-sm md:text-base text-slate-500 dark:text-slate-400 max-w-2xl mx-auto"
          >
            {t('rewards.subtext')}
          </motion.p>
        </div>

        {/* Scrolling Logo Container */}
        <div className="relative w-full overflow-hidden py-4 mask-gradient-horizontal">
          {/* Edge Faders for Premium Look */}
          <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-white dark:from-[#060b14] to-transparent z-10 pointer-events-none transition-colors duration-300" />
          <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-white dark:from-[#060b14] to-transparent z-10 pointer-events-none transition-colors duration-300" />

          {/* Marquee Wrapper */}
          <div className="animate-marquee-scroll flex gap-6 items-center">
            {/* List copy 1 */}
            <div className="flex gap-6 items-center">
              {SEAMLESS_PARTNERS.map((partner, idx) => (
                <div
                  key={`copy1-${idx}`}
                  className="w-56 sm:w-64 h-32 flex flex-col justify-between p-4 rounded-2xl bg-white/70 dark:bg-brand-emerald-950/40 border border-slate-200/60 dark:border-brand-emerald-900/30 backdrop-blur-md shadow-sm hover:shadow-lg dark:hover:shadow-black/20 hover:border-brand-gold-500/50 dark:hover:border-brand-gold-500/40 hover:scale-105 transition-all duration-300 group cursor-pointer"
                >
                  {/* Top line: Tag & Icon */}
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] font-bold text-slate-400 dark:text-slate-500 flex items-center gap-1 group-hover:text-brand-gold-500 transition-colors">
                      <PlaneTakeoff className="w-3 h-3" />
                      {t(`rewards.partners.${partner.key}.desc`)}
                    </span>
                    <span className="text-[9px] font-extrabold uppercase tracking-wide px-2 py-0.5 rounded-full bg-brand-gold-500/10 text-brand-gold-700 dark:text-brand-gold-450 border border-brand-gold-500/20">
                      {t(`rewards.partners.${partner.key}.rewardTag`)}
                    </span>
                  </div>

                  {/* Middle Logo */}
                  <div className="flex-grow flex items-center justify-center py-2">
                    <img
                      src={partner.logo}
                      alt={t(`rewards.partners.${partner.key}.name`)}
                      className="max-h-11 max-w-[85%] object-contain dark:brightness-110 dark:contrast-105 group-hover:scale-102 transition-transform duration-300"
                    />
                  </div>

                  {/* Bottom: star check */}
                  <div className="flex items-center justify-between border-t border-slate-100 dark:border-brand-emerald-900/20 pt-2 text-[9px] text-slate-400 dark:text-slate-500">
                    <span className="font-semibold group-hover:text-brand-emerald-700 dark:group-hover:text-brand-gold-400 transition-colors">
                      {t(`rewards.partners.${partner.key}.name`)}
                    </span>
                    <span className="flex items-center gap-0.5">
                      <Star className="w-2.5 h-2.5 text-brand-gold-500 fill-brand-gold-500" />
                      Partner Program
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* List copy 2 for seamless loop */}
            <div className="flex gap-6 items-center">
              {SEAMLESS_PARTNERS.map((partner, idx) => (
                <div
                  key={`copy2-${idx}`}
                  className="w-56 sm:w-64 h-32 flex flex-col justify-between p-4 rounded-2xl bg-white/70 dark:bg-brand-emerald-950/40 border border-slate-200/60 dark:border-brand-emerald-900/30 backdrop-blur-md shadow-sm hover:shadow-lg dark:hover:shadow-black/20 hover:border-brand-gold-500/50 dark:hover:border-brand-gold-500/40 hover:scale-105 transition-all duration-300 group cursor-pointer"
                >
                  {/* Top line: Tag & Icon */}
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] font-bold text-slate-400 dark:text-slate-500 flex items-center gap-1 group-hover:text-brand-gold-500 transition-colors">
                      <PlaneTakeoff className="w-3 h-3" />
                      {t(`rewards.partners.${partner.key}.desc`)}
                    </span>
                    <span className="text-[9px] font-extrabold uppercase tracking-wide px-2 py-0.5 rounded-full bg-brand-gold-500/10 text-brand-gold-700 dark:text-brand-gold-450 border border-brand-gold-500/20">
                      {t(`rewards.partners.${partner.key}.rewardTag`)}
                    </span>
                  </div>

                  {/* Middle Logo */}
                  <div className="flex-grow flex-items-center justify-center py-2">
                    <img
                      src={partner.logo}
                      alt={t(`rewards.partners.${partner.key}.name`)}
                      className="max-h-11 max-w-[85%] object-contain dark:brightness-110 dark:contrast-105 group-hover:scale-102 transition-transform duration-300"
                    />
                  </div>

                  {/* Bottom: star check */}
                  <div className="flex items-center justify-between border-t border-slate-100 dark:border-brand-emerald-900/20 pt-2 text-[9px] text-slate-400 dark:text-slate-500">
                    <span className="font-semibold group-hover:text-brand-emerald-700 dark:group-hover:text-brand-gold-400 transition-colors">
                      {t(`rewards.partners.${partner.key}.name`)}
                    </span>
                    <span className="flex items-center gap-0.5">
                      <Star className="w-2.5 h-2.5 text-brand-gold-500 fill-brand-gold-500" />
                      Partner Program
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
