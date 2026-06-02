import { useState } from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Compass, Sparkles, Send } from 'lucide-react';

export default function FinalCTA() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubscribed(true);
    setEmail('');
  };

  return (
    <section className="py-24 relative overflow-hidden islamic-pattern">
      {/* Background Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-emerald-500/10 rounded-full ambient-glow" />

      <div className="max-w-6xl mx-auto px-6 md:px-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
          className="relative rounded-[40px] overflow-hidden border border-brand-gold-500/30 bg-gradient-to-br from-brand-emerald-800 to-brand-emerald-950 dark:from-brand-emerald-900/60 dark:to-brand-emerald-950/80 p-8 sm:p-12 md:p-20 text-center shadow-2xl"
        >
          {/* Subtle Islamic Arch background decoration inside card */}
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--color-brand-gold-500)_1px,_transparent_1px)] bg-[size:16px_16px]" />

          {/* Floating Gold Icons */}
          <div className="flex justify-center gap-4 mb-8">
            <div className="p-3 rounded-2xl bg-brand-gold-500/10 text-brand-gold-500 border border-brand-gold-500/20">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div className="p-3 rounded-2xl bg-brand-gold-500/10 text-brand-gold-500 border border-brand-gold-500/20">
              <Compass className="w-6 h-6" />
            </div>
            <div className="p-3 rounded-2xl bg-brand-gold-500/10 text-brand-gold-500 border border-brand-gold-500/20">
              <Sparkles className="w-6 h-6" />
            </div>
          </div>

          {/* Headlines */}
          <h2 className="font-accent text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-6">
            Travel With Confidence
          </h2>
          <p className="max-w-2xl mx-auto text-base sm:text-lg text-brand-emerald-100/80 mb-10 leading-relaxed">
            Discover hotels, villas, and resorts that match your Islamic lifestyle. Try our AI-powered travel assistant today and unlock a worry-free vacation.
          </p>

          {/* Subscription or Start Exploring CTA */}
          <div className="max-w-md mx-auto">
            {subscribed ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-4 rounded-2xl border border-brand-gold-500/30 bg-brand-gold-500/10 text-brand-gold-300 font-semibold text-sm"
              >
                Jazakallahu Khayran! You have been subscribed for exclusive early access and travel discounts.
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  required
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-grow px-5 py-4 rounded-full border border-brand-emerald-700/50 bg-brand-emerald-900/40 text-white placeholder-brand-emerald-200/50 focus:outline-none focus:border-brand-gold-500 text-sm"
                />
                <button
                  type="submit"
                  className="px-6 py-4 rounded-full bg-brand-gold-500 hover:bg-brand-gold-600 text-brand-emerald-950 font-bold text-sm shadow-md hover:shadow-lg transition duration-300 flex items-center justify-center gap-2 cursor-pointer"
                >
                  Join Exclusive Beta
                  <Send className="w-4 h-4" />
                </button>
              </form>
            )}
            <p className="text-[10px] text-brand-emerald-200/40 mt-4">
              No spam. Unsubscribe anytime. By signing up, you agree to our Terms and Shariah Compliance policies.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
