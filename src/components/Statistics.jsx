import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Globe, Hotel, Users } from 'lucide-react';
import { useTranslation } from 'react-i18next';

// ── Animated counter hook ──────────────────────────────────────────────
function useCountUp(target, duration = 2000, started = false) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!started) return;
    let startTime = null;
    const startValue = 0;

    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(startValue + (target - startValue) * eased));
      if (progress < 1) requestAnimationFrame(step);
    };

    requestAnimationFrame(step);
  }, [started, target, duration]);

  return count;
}

// ── Single stat card with animated counter ────────────────────────────
function StatCard({ icon, target, suffix, label, desc, delay, started }) {
  const count = useCountUp(target, 2000, started);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay }}
      className="relative p-6 group text-center"
    >
      {/* Icon */}
      <div className="transform group-hover:scale-110 transition-transform duration-300">
        {icon}
      </div>

      {/* Animated number */}
      <h3 className="text-5xl sm:text-6xl font-extrabold text-brand-emerald-950 dark:text-white tracking-tight mb-2 font-sans group-hover:text-brand-emerald-600 dark:group-hover:text-brand-gold-500 transition-colors tabular-nums">
        {count.toLocaleString()}
        <span>{suffix}</span>
      </h3>

      {/* Label */}
      <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200 mb-2 uppercase tracking-widest">
        {label}
      </h4>

      {/* Description */}
      <p className="text-sm text-slate-500 dark:text-slate-400 max-w-xs mx-auto leading-relaxed">
        {desc}
      </p>
    </motion.div>
  );
}

export default function Statistics() {
  const { t } = useTranslation();
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' });

  const stats = [
    {
      icon: <Hotel className="w-8 h-8 text-brand-gold-500 mb-4 mx-auto" />,
      target: 500,
      suffix: 'K+',
      label: t('stats.hotelsLabel'),
      desc: t('stats.hotelsDesc'),
    },
    {
      icon: <Globe className="w-8 h-8 text-brand-gold-500 mb-4 mx-auto" />,
      target: 100,
      suffix: '+',
      label: t('stats.countriesLabel'),
      desc: t('stats.countriesDesc'),
    },
    {
      icon: <Users className="w-8 h-8 text-brand-gold-500 mb-4 mx-auto" />,
      target: 1,
      suffix: 'M+',
      label: t('stats.travelersLabel'),
      desc: t('stats.travelersDesc'),
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="py-20 bg-white dark:bg-brand-emerald-950/20 relative overflow-hidden border-t border-b border-slate-100 dark:border-brand-emerald-900/40"
    >
      {/* Subtle radial glow behind the numbers */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-brand-gold-100/20 via-transparent to-transparent dark:from-brand-gold-800/5 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-center">
          {stats.map((stat, idx) => (
            <div key={idx} className="relative">
              <StatCard
                {...stat}
                delay={idx * 0.15}
                started={isInView}
              />
              {/* Gold vertical divider */}
              {idx < 2 && (
                <div className="hidden md:block absolute top-1/4 right-0 w-[1px] h-1/2 bg-gradient-to-b from-transparent via-brand-gold-500/40 to-transparent" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
