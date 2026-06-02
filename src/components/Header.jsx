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
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'py-4 bg-white/80 dark:bg-brand-emerald-950/80 backdrop-blur-md border-b border-slate-200/50 dark:border-brand-emerald-800/30 shadow-sm'
          : 'py-6 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Brand Logo */}
        <a href="#" className="flex items-center gap-2 group">
          <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-brand-emerald-500 dark:bg-brand-emerald-800 text-brand-gold-100 shadow-inner group-hover:scale-105 transition-all duration-300">
            {/* Islamic Arch/Crescent Accent Design */}
            <Compass className="w-5 h-5 text-brand-gold-500 group-hover:rotate-45 transition-transform duration-500" />
            <div className="absolute inset-0 rounded-xl border border-brand-gold-500/30 group-hover:border-brand-gold-500/60 transition-colors" />
          </div>
          <span className="font-accent text-xl font-bold tracking-wider text-brand-emerald-800 dark:text-brand-gold-100 flex items-center gap-1">
            Baytee
          </span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-slate-600 hover:text-brand-emerald-500 dark:text-slate-300 dark:hover:text-brand-gold-500 transition-colors duration-200 relative group"
            >
              {link.name}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-brand-gold-500 transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>

        {/* Action Controls & Theme Toggle */}
        <div className="hidden md:flex items-center gap-3">
          <LanguageSwitcher />
          <ThemeToggle />
          <a
            href="#explore"
            className="px-5 py-2.5 rounded-full bg-brand-emerald-500 hover:bg-brand-emerald-600 dark:bg-brand-gold-500 dark:hover:bg-brand-gold-600 text-white dark:text-brand-emerald-950 font-semibold text-sm shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer"
          >
            {t('nav.startExploring')}
          </a>
        </div>

        {/* Mobile Toggle Button */}
        <div className="flex md:hidden items-center gap-2">
          <LanguageSwitcher />
          <ThemeToggle />
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-lg text-slate-600 hover:text-brand-emerald-500 dark:text-slate-300 dark:hover:text-brand-gold-500"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden border-b border-slate-200/80 dark:border-brand-emerald-800/30 bg-white/95 dark:bg-brand-emerald-950/95 backdrop-blur-lg overflow-hidden"
          >
            <div className="flex flex-col px-6 py-8 gap-6">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="text-lg font-medium text-slate-700 hover:text-brand-emerald-500 dark:text-slate-200 dark:hover:text-brand-gold-500 transition-colors"
                >
                  {link.name}
                </a>
              ))}
              <hr className="border-slate-200 dark:border-brand-emerald-900" />
              <a
                href="#explore"
                onClick={() => setIsOpen(false)}
                className="w-full py-3 rounded-full text-center bg-brand-emerald-500 dark:bg-brand-gold-500 text-white dark:text-brand-emerald-950 font-semibold shadow-sm"
              >
                {t('nav.startExploring')}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
