import { Compass, Heart } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function Footer() {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  const columns = [
    {
      title: t('footer.colDestinations'),
      links: [
        { name: 'Makkah', href: '#destinations' },
        { name: 'Madinah', href: '#destinations' },
        { name: 'Istanbul', href: '#destinations' },
        { name: 'Antalya', href: '#destinations' },
        { name: 'Dubai', href: '#destinations' },
        { name: 'Kuala Lumpur', href: '#destinations' },
      ],
    },
    {
      title: t('footer.colHalalFilters'),
      links: [
        { name: t('footer.halalFood'), href: '#features' },
        { name: t('footer.womenPools'), href: '#features' },
        { name: t('footer.privateVillas'), href: '#features' },
        { name: t('footer.alcoholFreeHotels'), href: '#features' },
        { name: t('footer.prayerFacilities'), href: '#features' },
        { name: t('footer.umrahFriendly'), href: '#features' },
      ],
    },
    {
      title: t('footer.colCompany'),
      links: [
        { name: t('footer.aboutUs'), href: '#' },
        { name: t('footer.shariahCouncil'), href: '#' },
        { name: t('footer.aiTech'), href: '#ai-assistant' },
        { name: t('footer.partner'), href: '#' },
        { name: t('footer.careers'), href: '#' },
        { name: t('footer.press'), href: '#' },
      ],
    },
    {
      title: t('footer.colLegal'),
      links: [
        { name: t('footer.privacy'), href: '#' },
        { name: t('footer.terms'), href: '#' },
        { name: t('footer.compliance'), href: '#' },
        { name: t('footer.help'), href: '#' },
        { name: t('footer.contact'), href: '#' },
        { name: t('footer.sitemap'), href: '#' },
      ],
    },
  ];

  return (
    <footer className="bg-slate-50 dark:bg-brand-emerald-950/40 border-t border-slate-200/80 dark:border-brand-emerald-800/30 pt-20 pb-12 relative overflow-hidden">
      {/* Background Ornaments */}
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-brand-emerald-500/5 rounded-full ambient-glow" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">

        {/* Main Columns Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-10 mb-16 text-left">

          {/* Logo & Intro Column (occupies 2 columns on lg screens) */}
          <div className="col-span-2 lg:col-span-1 flex flex-col gap-5">
            <a href="#" className="flex items-center gap-2">
              <img src="/logo.png" alt="Baytee Logo" className="h-10 w-auto object-contain dark:hidden" />
              <img src="/darklogo.png" alt="Baytee Logo" className="h-10 w-auto object-contain hidden dark:block" />
            </a>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              {t('footer.tagline')}
            </p>
            {/* Social Icons */}
            <div className="flex items-center gap-3 mt-2">
              {[
                {
                  icon: (
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                    </svg>
                  ),
                  href: '#',
                },
                {
                  icon: (
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                    </svg>
                  ),
                  href: '#',
                },
                {
                  icon: (
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                      <rect x="2" y="9" width="4" height="12" />
                      <circle cx="4" cy="4" r="2" />
                    </svg>
                  ),
                  href: '#',
                },
                {
                  icon: (
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                    </svg>
                  ),
                  href: '#',
                },
              ].map((social, idx) => (
                <a
                  key={idx}
                  href={social.href}
                  className="p-2 rounded-full border border-slate-200 dark:border-brand-emerald-800 text-slate-500 dark:text-brand-gold-200 hover:border-brand-gold-500 hover:text-brand-gold-500 transition-all cursor-pointer"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Links Columns */}
          {columns.map((col) => (
            <div key={col.title} className="flex flex-col gap-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-brand-emerald-800 dark:text-brand-gold-500">
                {col.title}
              </h4>
              <ul className="flex flex-col gap-2.5">
                {col.links.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-xs text-slate-500 hover:text-brand-emerald-600 dark:text-slate-400 dark:hover:text-brand-gold-500 transition-colors"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

        </div>

        {/* Separator */}
        <hr className="border-slate-200/85 dark:border-brand-emerald-900/60 mb-8" />

        {/* Bottom copyright details */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-400 dark:text-slate-500">
            {t('footer.copyright', { year: currentYear })}
          </p>
          <p className="text-xs text-slate-450 dark:text-slate-500 flex items-center gap-1">
            {t('footer.madeWith')} <Heart className="w-3 h-3 text-red-500 fill-current" /> {t('footer.forUmmah')}
          </p>
        </div>

      </div>
    </footer>
  );
}
