import { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, ChevronDown, Check } from 'lucide-react';

const LANGUAGES = [
  { code: 'en', label: 'English', nativeLabel: 'English', flag: '🇬🇧' },
  { code: 'fr', label: 'French',  nativeLabel: 'Français', flag: '🇫🇷' },
  { code: 'ar', label: 'Arabic',  nativeLabel: 'العربية',  flag: '🇸🇦' },
];

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);

  const currentLang = LANGUAGES.find((l) => l.code === i18n.language) || LANGUAGES[0];

  const handleSelect = (code) => {
    i18n.changeLanguage(code);
    // Set/remove RTL direction on html element
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

  // Sync RTL on mount
  useEffect(() => {
    document.documentElement.dir = i18n.language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = i18n.language;
  }, [i18n.language]);

  return (
    <div ref={ref} className="relative">
      <button
        id="lang-switcher-btn"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 px-3 py-2 rounded-full border border-slate-200 dark:border-brand-emerald-800/60 bg-white/70 dark:bg-brand-emerald-950/30 backdrop-blur-sm text-slate-600 dark:text-slate-300 hover:border-brand-gold-500 dark:hover:border-brand-gold-500 hover:text-brand-emerald-700 dark:hover:text-brand-gold-400 transition-all duration-200 text-sm font-semibold shadow-sm"
        aria-label="Switch language"
        aria-expanded={isOpen}
      >
        <Globe className="w-4 h-4 text-brand-gold-500" />
        <span className="hidden sm:inline">{currentLang.flag}</span>
        <span className="hidden sm:inline text-xs">{currentLang.nativeLabel}</span>
        <ChevronDown
          className={`w-3.5 h-3.5 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -6 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -6 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full mt-2 right-0 w-44 rounded-2xl border border-slate-200/80 dark:border-brand-emerald-800/40 bg-white dark:bg-brand-emerald-950 backdrop-blur-xl shadow-xl overflow-hidden z-50"
          >
            <div className="p-1.5">
              {LANGUAGES.map((lang) => (
                <button
                  key={lang.code}
                  id={`lang-${lang.code}`}
                  onClick={() => handleSelect(lang.code)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all duration-150 text-left ${
                    lang.code === i18n.language
                      ? 'bg-brand-gold-50 dark:bg-brand-gold-500/10 text-brand-emerald-800 dark:text-brand-gold-400 font-semibold'
                      : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-brand-emerald-900/30'
                  }`}
                >
                  <span className="text-base leading-none">{lang.flag}</span>
                  <span className="flex-grow font-medium">{lang.nativeLabel}</span>
                  {lang.code === i18n.language && (
                    <Check className="w-3.5 h-3.5 text-brand-gold-500 flex-shrink-0" />
                  )}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
