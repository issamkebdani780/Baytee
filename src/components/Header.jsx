import { useState, useEffect } from 'react';
import { Menu, X, Compass } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import ThemeToggle from './ThemeToggle';
import LanguageSwitcher from './LanguageSwitcher';

export default function Header() {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: t('nav.features'), href: '#features' },
    { name: t('nav.aiCompanion'), href: '#ai-assistant' },
    { name: t('nav.destinations'), href: '#destinations' },
    { name: t('nav.pricing'), href: '#pricing' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex flex-col items-center pt-4 px-4 md:px-8 pointer-events-none">
      {/* Floating Rounded Pill Nav */}
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className={`w-full max-w-6xl pointer-events-auto rounded-2xl transition-all duration-500 ${
          scrolled
            ? 'bg-white/95 dark:bg-brand-emerald-950/95 shadow-lg shadow-slate-200/60 dark:shadow-brand-emerald-900/40 border border-slate-200/80 dark:border-brand-emerald-800/40'
            : 'bg-white/85 dark:bg-brand-emerald-950/85 shadow-md shadow-slate-200/40 dark:shadow-brand-emerald-900/30 border border-slate-200/60 dark:border-brand-emerald-800/30'
        } backdrop-blur-xl`}
      >
        <div className="flex items-center justify-between px-5 py-3">
          {/* Brand Logo */}
          <a href="#" className="flex items-center gap-2.5 group shrink-0">
            <div className="relative flex items-center justify-center w-9 h-9 rounded-xl bg-brand-emerald-500 dark:bg-brand-emerald-800 shadow-inner group-hover:scale-105 transition-all duration-300">
              <Compass className="w-4.5 h-4.5 text-brand-gold-500 group-hover:rotate-45 transition-transform duration-500" />
              <div className="absolute inset-0 rounded-xl border border-brand-gold-500/30 group-hover:border-brand-gold-500/60 transition-colors" />
            </div>
            <span className="font-accent text-lg font-bold tracking-wider text-brand-emerald-800 dark:text-brand-gold-100">
              Baytee
            </span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-slate-600 hover:text-brand-emerald-600 dark:text-slate-300 dark:hover:text-brand-gold-400 transition-colors duration-200 relative group whitespace-nowrap"
              >
                {link.name}
                <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-brand-gold-500 rounded-full transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* Action Controls */}
          <div className="hidden md:flex items-center gap-2.5 shrink-0">
            <LanguageSwitcher />
            <ThemeToggle />
            <a
              href="#explore"
              className="px-5 py-2 rounded-full bg-brand-emerald-500 hover:bg-brand-emerald-600 dark:bg-brand-gold-500 dark:hover:bg-brand-gold-600 text-white dark:text-brand-emerald-950 font-semibold text-sm shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer whitespace-nowrap"
            >
              {t('nav.startExploring')}
            </a>
          </div>

          {/* Mobile Toggle */}
          <div className="flex md:hidden items-center gap-2">
            <LanguageSwitcher />
            <ThemeToggle />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-xl text-slate-600 hover:text-brand-emerald-500 dark:text-slate-300 dark:hover:text-brand-gold-500 hover:bg-slate-100 dark:hover:bg-brand-emerald-900/40 transition-all"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Panel — inside the pill */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
              className="md:hidden overflow-hidden border-t border-slate-100 dark:border-brand-emerald-900/50"
            >
              <div className="flex flex-col px-5 py-5 gap-4">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="text-base font-medium text-slate-700 hover:text-brand-emerald-600 dark:text-slate-200 dark:hover:text-brand-gold-400 transition-colors"
                  >
                    {link.name}
                  </a>
                ))}
                <hr className="border-slate-200 dark:border-brand-emerald-900" />
                <a
                  href="#explore"
                  onClick={() => setIsOpen(false)}
                  className="w-full py-2.5 rounded-full text-center bg-brand-emerald-500 dark:bg-brand-gold-500 text-white dark:text-brand-emerald-950 font-semibold text-sm shadow-sm"
                >
                  {t('nav.startExploring')}
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </header>
  );
}
