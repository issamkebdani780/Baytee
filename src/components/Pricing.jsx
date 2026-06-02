import { useState } from 'react';
import { Check, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

export default function Pricing() {
  const { t } = useTranslation();
  const [billingCycle, setBillingCycle] = useState('annual'); // 'monthly' or 'annual'

  const plans = [
    {
      name: t('pricing.freeName'),
      tagline: t('pricing.freeTagline'),
      price: { monthly: 0, annual: 0 },
      features: [
        t('pricing.freeF1'),
        t('pricing.freeF2'),
        t('pricing.freeF3'),
        t('pricing.freeF4'),
      ],
      cta: t('pricing.freeCta'),
      popular: false,
    },
    {
      name: t('pricing.premiumName'),
      tagline: t('pricing.premiumTagline'),
      price: { monthly: 19, annual: 15 },
      features: [
        t('pricing.premiumF1'),
        t('pricing.premiumF2'),
        t('pricing.premiumF3'),
        t('pricing.premiumF4'),
        t('pricing.premiumF5'),
        t('pricing.premiumF6'),
      ],
      cta: t('pricing.premiumCta'),
      popular: true,
    },
    {
      name: t('pricing.familyName'),
      tagline: t('pricing.familyTagline'),
      price: { monthly: 39, annual: 31 },
      features: [
        t('pricing.familyF1'),
        t('pricing.familyF2'),
        t('pricing.familyF3'),
        t('pricing.familyF4'),
        t('pricing.familyF5'),
        t('pricing.familyF6'),
      ],
      cta: t('pricing.familyCta'),
      popular: false,
    },
  ];

  return (
    <section id="pricing" className="py-24 bg-white dark:bg-brand-emerald-950/20 relative overflow-hidden">
      {/* Background Ornaments */}
      <div className="absolute top-1/4 left-10 w-80 h-80 bg-brand-emerald-500/5 rounded-full ambient-glow" />
      <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-brand-gold-500/5 rounded-full ambient-glow" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 text-center">
        
        {/* Header */}
        <span className="text-xs font-bold uppercase tracking-widest text-brand-gold-600 dark:text-brand-gold-500 font-sans block mb-3">
          {t('pricing.sectionLabel')}
        </span>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-brand-emerald-950 dark:text-white leading-tight font-sans mb-6">
          {t('pricing.heading')}
        </h2>
        <p className="max-w-2xl mx-auto text-base text-slate-500 dark:text-slate-400 mb-12">
          {t('pricing.subtext')}
        </p>

        {/* Toggle Switch */}
        <div className="flex items-center justify-center gap-4 mb-16">
          <span className={`text-sm font-semibold transition ${billingCycle === 'monthly' ? 'text-brand-emerald-800 dark:text-white' : 'text-slate-400'}`}>
            {t('pricing.monthly')}
          </span>
          <button
            onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'annual' : 'monthly')}
            className="w-14 h-8 rounded-full bg-brand-emerald-100 dark:bg-brand-emerald-900/60 p-1 flex items-center justify-start cursor-pointer relative"
          >
            <motion.div
              layout
              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              className="w-6 h-6 rounded-full bg-brand-emerald-500 dark:bg-brand-gold-500"
              style={{
                x: billingCycle === 'annual' ? 24 : 0,
              }}
            />
          </button>
          <span className={`text-sm font-semibold transition flex items-center gap-1.5 ${billingCycle === 'annual' ? 'text-brand-emerald-800 dark:text-white' : 'text-slate-400'}`}>
            {t('pricing.annually')}
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-brand-gold-100 dark:bg-brand-gold-500/20 text-brand-gold-700 dark:text-brand-gold-500 border border-brand-gold-200/30">
              {t('pricing.save20')}
            </span>
          </span>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch max-w-6xl mx-auto text-left">
          {plans.map((plan) => (
            <motion.div
              key={plan.name}
              whileHover={{ y: -6 }}
              className={`rounded-3xl p-8 border flex flex-col justify-between relative transition-all duration-300 ${
                plan.popular
                  ? 'border-brand-gold-500 bg-brand-emerald-900/10 dark:bg-brand-emerald-950/40 shadow-xl shadow-brand-emerald-950/5'
                  : 'border-slate-200/60 dark:border-brand-emerald-800/30 bg-slate-50/50 dark:bg-brand-emerald-950/10'
              }`}
            >
              {/* Popular Badge Accent */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-brand-gold-500 dark:bg-brand-gold-600 text-white dark:text-brand-emerald-950 text-xs font-bold flex items-center gap-1 shadow-md shadow-brand-gold-500/20">
                  <Star className="w-3.5 h-3.5 fill-current" />
                  {t('pricing.mostPopular')}
                </div>
              )}

              {/* Top Details */}
              <div>
                <h3 className="text-xl font-bold text-brand-emerald-950 dark:text-white mb-2">
                  {plan.name}
                </h3>
                <p className="text-xs text-slate-400 dark:text-slate-500 mb-6 leading-relaxed">
                  {plan.tagline}
                </p>
                <div className="flex items-baseline gap-1 mb-8">
                  <span className="text-4xl sm:text-5xl font-extrabold text-brand-emerald-950 dark:text-white tracking-tight">
                    ${billingCycle === 'annual' ? plan.price.annual : plan.price.monthly}
                  </span>
                  <span className="text-sm font-semibold text-slate-405 dark:text-slate-500">
                    {t('pricing.perMonth')}
                  </span>
                </div>

                <hr className="border-slate-200/60 dark:border-brand-emerald-800/30 mb-8" />

                {/* Features List */}
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3 text-sm text-slate-600 dark:text-slate-300">
                      <span className="p-0.5 rounded-full bg-brand-gold-500/10 dark:bg-brand-gold-500/20 text-brand-gold-600 dark:text-brand-gold-500 mt-0.5">
                        <Check className="w-3.5 h-3.5" />
                      </span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA Button */}
              <button
                type="button"
                className={`w-full py-3.5 rounded-full text-sm font-bold shadow-sm transition-all duration-300 cursor-pointer ${
                  plan.popular
                    ? 'bg-brand-emerald-500 hover:bg-brand-emerald-600 dark:bg-brand-gold-500 dark:hover:bg-brand-gold-600 text-white dark:text-brand-emerald-950 hover:shadow-md'
                    : 'border border-slate-250 dark:border-brand-emerald-800 text-slate-700 dark:text-brand-gold-200 hover:border-brand-emerald-500 dark:hover:border-brand-gold-500'
                }`}
              >
                {plan.cta}
              </button>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
