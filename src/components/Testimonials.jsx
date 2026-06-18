import { useRef, useEffect } from 'react';
import { Star } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const TESTIMONIALS = [
  {
    id: 1,
    name: 'Zahra Ahmed',
    source: 'Trustpilot',
    initials: 'ZA',
    stars: 5,
    featured: true,
    text: "Finding hotels with truly private pools was always exhausting. Baytee made booking our Antalya resort completely stress-free. Absolute privacy, verified halal dining, and total peace of mind!",
  },
  {
    id: 2,
    name: 'Tariq Mansour',
    source: 'Trustpilot',
    initials: 'TM',
    stars: 5,
    featured: false,
    text: "The AI Travel Companion is a game-changer. I typed my complex preferences for my parents' Umrah trip and instantly got the perfect hotel recommendation with wheelchair access and Haram audio feed.",
  },
  {
    id: 3,
    name: 'Farhan Syahputra',
    source: 'Trustpilot',
    initials: 'FS',
    stars: 5,
    featured: false,
    text: "Our stay at Ajwa Hotel Sultanahmet was a dream. A completely alcohol-free environment with Ottoman architecture felt spiritually uplifting. Baytee is a must for halal travel.",
  },
  {
    id: 4,
    name: 'Aisha Bello',
    source: 'Google',
    initials: 'AB',
    stars: 5,
    featured: false,
    text: "Baytee verified every single halal claim for our Dubai trip. The women-only pool was actually private and the food was genuinely halal-certified. No more guessing games!",
  },
  {
    id: 5,
    name: 'Omar Al-Rashidi',
    source: 'Trustpilot',
    initials: 'OR',
    stars: 5,
    featured: false,
    text: "I've tried many Muslim travel apps but Baytee is the only one that truly understands what we need. The Maldives resort they found us had a private beach and in-room Quran — perfect honeymoon.",
  },
  {
    id: 6,
    name: 'Nadia Khalil',
    source: 'Google',
    initials: 'NK',
    stars: 5,
    featured: true,
    text: "Customer service is always prompt and the platform keeps adding new features. Booking halal-friendly hotels has never felt this seamless. Highly recommend to every Muslim traveler.",
  },
  {
    id: 7,
    name: 'Yusuf Ibrahim',
    source: 'Trustpilot',
    initials: 'YI',
    stars: 5,
    featured: false,
    text: "With so many travel platforms out there, Baytee stood out as a stellar choice. The halal filters work perfectly and the AI assistant saved hours of research for our Malaysia family trip.",
  },
  {
    id: 8,
    name: 'Maryam Hassan',
    source: 'Trustpilot',
    initials: 'MH',
    stars: 5,
    featured: false,
    text: "This platform includes everything you need for halal travel — prayer facilities, alcohol-free environments, and private spaces for sisters. A complete and trustworthy solution.",
  },
];

// Split into two rows for the marquee
const ROW_1 = TESTIMONIALS.slice(0, 4);
const ROW_2 = TESTIMONIALS.slice(4, 8);

function TestimonialCard({ testimonial }) {
  const { featured } = testimonial;

  return (
    <div
      className={`relative flex-shrink-0 w-72 rounded-2xl p-6 mr-4 transition-all duration-300 group cursor-default ${
        featured
          ? 'bg-brand-emerald-500 dark:bg-brand-emerald-600 border border-brand-emerald-400/50'
          : 'bg-white dark:bg-[#111c16] border border-slate-200/60 dark:border-brand-emerald-900/60'
      }`}
      style={{ boxShadow: featured ? '0 8px 32px rgba(11,59,36,0.25)' : '0 4px 20px rgba(0,0,0,0.06)' }}
    >
      {/* Big quotation mark */}
      <span
        className={`absolute top-4 left-5 font-serif text-6xl leading-none select-none ${
          featured ? 'text-brand-emerald-300/60' : 'text-slate-200 dark:text-brand-emerald-900'
        }`}
        aria-hidden="true"
      >
        "
      </span>

      {/* Stars */}
      <div className="flex items-center gap-0.5 mb-4 relative z-10">
        {[...Array(testimonial.stars)].map((_, i) => (
          <Star
            key={i}
            className={`w-4 h-4 fill-current ${featured ? 'text-brand-gold-200' : 'text-brand-gold-500'}`}
          />
        ))}
      </div>

      {/* Quote text */}
      <p
        className={`text-sm leading-relaxed mb-6 relative z-10 ${
          featured ? 'text-white/90' : 'text-slate-600 dark:text-slate-300'
        }`}
      >
        {testimonial.text}
      </p>

      {/* Author */}
      <div className="flex items-center gap-3 relative z-10">
        {/* Avatar initials */}
        <div
          className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
            featured
              ? 'bg-white/20 text-white'
              : 'bg-brand-emerald-100 dark:bg-brand-emerald-900/60 text-brand-emerald-700 dark:text-brand-gold-300'
          }`}
        >
          {testimonial.initials}
        </div>
        <div>
          <p className={`text-sm font-bold leading-tight ${featured ? 'text-white' : 'text-slate-800 dark:text-white'}`}>
            {testimonial.name}
          </p>
          <p className={`text-xs ${featured ? 'text-brand-emerald-200' : 'text-slate-400 dark:text-slate-500'}`}>
            {testimonial.source}
          </p>
        </div>
      </div>
    </div>
  );
}

function MarqueeRow({ items, reverse = false, speed = 35 }) {
  // Duplicate for seamless loop
  const doubled = [...items, ...items, ...items];

  return (
    <div className="overflow-hidden w-full">
      <motion.div
        className="flex"
        animate={{ x: reverse ? ['-33.33%', '0%'] : ['0%', '-33.33%'] }}
        transition={{
          duration: speed,
          repeat: Infinity,
          ease: 'linear',
        }}
        style={{ width: 'max-content' }}
      >
        {doubled.map((item, i) => (
          <TestimonialCard key={`${item.id}-${i}`} testimonial={item} />
        ))}
      </motion.div>
    </div>
  );
}

export default function Testimonials() {
  const { t } = useTranslation();

  return (
    <section id="testimonials" className="py-24 relative overflow-hidden bg-slate-50/80 dark:bg-[#080f0a]">
      {/* Subtle background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/0 via-brand-emerald-50/30 to-white/0 dark:from-transparent dark:via-brand-emerald-950/10 dark:to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="text-xs font-bold uppercase tracking-widest text-brand-gold-600 dark:text-brand-gold-500 block mb-3">
            {t('testimonials.sectionLabel')}
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-brand-emerald-950 dark:text-white leading-tight font-sans">
            {t('testimonials.heading')}
          </h2>
        </motion.div>
      </div>

      {/* Full-bleed marquee rows */}
      <div className="flex flex-col gap-4">
        {/* Row 1 — scrolls left */}
        <MarqueeRow items={ROW_1} reverse={false} speed={40} />
        {/* Row 2 — scrolls right */}
        <MarqueeRow items={ROW_2} reverse={true} speed={45} />
      </div>

      {/* Edge fade masks */}
      <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-slate-50/80 dark:from-[#080f0a] to-transparent pointer-events-none z-10" />
      <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-slate-50/80 dark:from-[#080f0a] to-transparent pointer-events-none z-10" />
    </section>
  );
}
