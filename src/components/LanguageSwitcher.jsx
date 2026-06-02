import { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, ChevronDown, Check } from 'lucide-react';

const LANGUAGES = [
  { code: 'en', label: 'English', nativeLabel: 'English', abbr: 'EN' },
  { code: 'fr', label: 'French',  nativeLabel: 'Français', abbr: 'FR' },
  { code: 'ar', label: 'Arabic',  nativeLabel: 'العربية',  abbr: 'AR' },
];

// Color per language abbreviation badge
const ABBR_COLORS = {
  en: 'bg-blue-500/20 text-blue-400',
  fr: 'bg-indigo-500/20 text-indigo-400',
  ar: 'bg-emerald-500/20 text-emerald-400',
};

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);

  const currentLang = LANGUAGES.find((l) => l.code === i18n.language) || LANGUAGES[0];
  const isRTL = i18n.language === 'ar';

  const handleSelect = (code) => {
    i18n.changeLanguage(code);
    document.documentElement.dir = code === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = code;
    setIsOpen(false);
  };

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Sync RTL on mount / language change
  useEffect(() => {
    document.documentElement.dir = i18n.language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = i18n.language;
  }, [i18n.language]);

  return (
    <div ref={ref} className="relative" dir="ltr">
      {/* Trigger button — always LTR layout regardless of page direction */}
      <button
        id="lang-switcher-btn"
        onClick={() => setIsOpen(!isOpen)}
        className="flex flex-row items-center gap-1.5 px-3 py-2 rounded-full border border-slate-200 dark:border-brand-emerald-800/60 bg-white/80 dark:bg-brand-emerald-900/40 backdrop-blur-sm text-slate-700 dark:text-slate-200 hover:border-brand-gold-500 dark:hover:border-brand-gold-500 transition-all duration-200 text-sm font-semibold shadow-sm"
        aria-label="Switch language"
        aria-expanded={isOpen}
      >
        <Globe className="w-4 h-4 text-brand-gold-500 flex-shrink-0" />
        {/* Abbreviation badge — always visible, no emoji needed */}
        <span className={`text-[11px] font-extrabold px-1.5 py-0.5 rounded-md ${ABBR_COLORS[currentLang.code]} hidden sm:inline-block`}>
          {currentLang.abbr}
        </span>
        <span className="hidden sm:inline text-xs font-semibold">{currentLang.nativeLabel}</span>
        <ChevronDown
          className={`w-3.5 h-3.5 flex-shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -6 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -6 }}
            transition={{ duration: 0.15 }}
            // Always open to the right side in RTL, left side in LTR
            className={`absolute top-full mt-2 w-48 rounded-2xl border border-slate-200 dark:border-brand-emerald-800/60 bg-white dark:bg-[#071a0f] shadow-xl overflow-hidden z-[9999] ${isRTL ? 'left-0' : 'right-0'}`}
          >
            <div className="p-1.5">
              {LANGUAGES.map((lang) => {
                const isActive = lang.code === i18n.language;
                return (
                  <button
                    key={lang.code}
                    id={`lang-${lang.code}`}
                    onClick={() => handleSelect(lang.code)}
                    className={`w-full flex flex-row items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all duration-150 text-left ${
                      isActive
                        ? 'bg-brand-gold-500/15 dark:bg-brand-gold-500/15 text-brand-emerald-800 dark:text-brand-gold-400 font-semibold'
                        : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-brand-emerald-900/50'
                    }`}
                  >
                    {/* Abbreviation badge */}
                    <span className={`w-8 text-center text-[10px] font-extrabold px-1.5 py-0.5 rounded-md flex-shrink-0 ${ABBR_COLORS[lang.code]}`}>
                      {lang.abbr}
                    </span>
                    <span className="flex-grow font-medium">{lang.nativeLabel}</span>
                    {isActive && (
                      <Check className="w-3.5 h-3.5 text-brand-gold-500 flex-shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
