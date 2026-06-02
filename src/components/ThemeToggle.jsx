import { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== 'undefined') {
      // Check local storage or document class
      return (
        localStorage.getItem('theme') === 'dark' ||
        (!('theme' in localStorage) &&
          window.matchMedia('(prefers-color-scheme: dark)').matches)
      );
    }
    return false;
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (isDark) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => setIsDark(!isDark)}
      className="p-2.5 rounded-full border border-slate-200 dark:border-brand-emerald-800 bg-white/70 dark:bg-brand-emerald-900/60 backdrop-blur-md text-brand-emerald-700 dark:text-brand-gold-500 shadow-sm hover:shadow-md cursor-pointer transition-all duration-300"
      aria-label="Toggle dark mode"
    >
      {isDark ? (
        <Sun className="w-5 h-5 text-brand-gold-500" />
      ) : (
        <Moon className="w-5 h-5 text-brand-emerald-700" />
      )}
    </motion.button>
  );
}
