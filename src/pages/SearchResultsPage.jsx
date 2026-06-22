import { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Star, MapPin, ChevronDown, ChevronUp, ShieldAlert, Loader2,
  X, Check, SlidersHorizontal, ArrowLeft, Heart
} from 'lucide-react';
import Header from '../components/Header';
import { initSearch, openSearchStream } from '../api';

// ─── Placeholder images ───────────────────────────────────────────────────────
const PLACEHOLDERS = [
  'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1597843797221-72218451897e?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1582672093685-704155248536?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1615460549969-36fa19521a4f?auto=format&fit=crop&w=800&q=80',
];

// ─── Map raw SSE hotel → UI model ────────────────────────────────────────────
function mapHotel(h, destName) {
  const f = h.hotelFilters || {};

  // Build rich halal feature list (for bullet points on card)
  const features = [];
  if (f.halalFood?.all)       features.push({ key: 'halal_all',     label: 'All halal food' });
  if (f.halalFood?.some)      features.push({ key: 'halal_some',    label: 'Halal food available' });
  if (f.alcoholFree?.property)features.push({ key: 'alcohol_prop',  label: 'Alcohol-free property' });
  if (f.alcoholFree?.restaurant) features.push({ key: 'alcohol_rest', label: 'Alcohol-free restaurant' });
  if (f.pool?.ladiesOnly)     features.push({ key: 'pool_ladies',   label: 'Outdoor pool • Ladies-only' });
  if (f.pool?.available)      features.push({ key: 'pool_avail',    label: 'Outdoor pool • Available' });
  if (f.pool?.mixedModest)    features.push({ key: 'pool_modest',   label: 'Outdoor pool • Modest swimwear' });
  if (f.pool?.privateHire)    features.push({ key: 'pool_private',  label: 'Outdoor pool • Private hire' });
  if (f.wellnessSpa?.ladiesOnly) features.push({ key: 'spa_ladies', label: 'Wellness spa • Ladies-only' });
  if (f.beach?.ladiesOnly)    features.push({ key: 'beach_ladies',  label: 'Beach • Ladies-only • Secluded' });
  if (f.bidetAmenities?.available) features.push({ key: 'bidet',   label: 'Handheld bidet spray' });
  if (f.mealPlan?.allInclusive)   features.push({ key: 'all_incl', label: 'All inclusive' });
  if (f.mealPlan?.breakfastIncluded) features.push({ key: 'bfast', label: 'Breakfast included' });
  if (f.freeCancellation?.freeCancellation) features.push({ key: 'free_cancel', label: 'Free cancellation' });
  if (features.length === 0)  features.push({ key: 'halal_friendly', label: 'Halal friendly' });

  return {
    id: h.id,
    name: h.name,
    location: destName || 'Unknown',
    rating: h.rating || 0,
    reviewScore: h.reviewScore || h.rating || 0,
    reviewLabel: h.reviewLabel || (h.reviewScore >= 9 ? 'Exceptional' : h.reviewScore >= 8 ? 'Very good' : h.reviewScore >= 7 ? 'Good' : ''),
    reviewCount: h.reviewCount || 0,
    starRating: h.starRating || h.stars || 0,
    price: h.cheapestRoom?.lowestPrice || 0,
    originalPrice: h.cheapestRoom?.originalPrice || 0,
    image: h.image || PLACEHOLDERS[Math.abs(h.id || 0) % PLACEHOLDERS.length],
    features,
    roomName: h.cheapestRoom?.name || 'Standard Room',
    mealPlan: h.cheapestRoom?.mealType || null,
    freeCancellation: !!(f.freeCancellation?.freeCancellation || h.cheapestRoom?.freeCancellation),
    rawFilters: f,
    nights: null, // filled from search params
  };
}

// ─── Build dynamic filter sections from backend `filters` object ──────────────
function buildFilterSections(backendFilters) {
  if (!backendFilters) return [];
  const f = backendFilters;
  const sections = [];

  // --- Halal Food ---
  const halalOptions = [
    { key: 'halalFood.all',       label: 'All halal food',          count: f.halalFood?.all },
    { key: 'halalFood.some',      label: 'Some halal food',         count: f.halalFood?.some },
    { key: 'halalFood.onRequest', label: 'Halal food on request',   count: f.halalFood?.onRequest },
    { key: 'halalFood.nearby',    label: 'Halal food nearby',       count: f.halalFood?.nearby },
  ].filter(o => o.count > 0);
  if (halalOptions.length > 0) sections.push({ id: 'halalFood', title: 'Halal food', options: halalOptions });

  // --- Alcohol-free ---
  const alcoholOptions = [
    { key: 'alcoholFree.property',   label: 'Alcohol-free property',   count: f.alcoholFree?.property },
    { key: 'alcoholFree.restaurant', label: 'Alcohol-free restaurant', count: f.alcoholFree?.restaurant },
  ].filter(o => o.count > 0);
  if (alcoholOptions.length > 0) sections.push({ id: 'alcoholFree', title: 'Alcohol-free areas', options: alcoholOptions });

  // --- Leisure for ladies ---
  const leisureOptions = [
    { key: 'pool.ladiesOnly',       label: 'Ladies-only pool',       count: f.pool?.ladiesOnly },
    { key: 'pool.privateHire',      label: 'Private pool hire',      count: f.pool?.privateHire },
    { key: 'pool.mixedModest',      label: 'Pool • Modest swimwear', count: f.pool?.mixedModest },
    { key: 'wellnessSpa.ladiesOnly',label: 'Ladies-only spa',        count: f.wellnessSpa?.ladiesOnly },
    { key: 'beach.ladiesOnly',      label: 'Ladies-only beach',      count: f.beach?.ladiesOnly },
  ].filter(o => o.count > 0);
  if (leisureOptions.length > 0) sections.push({ id: 'leisure', title: 'Leisure for ladies and family', options: leisureOptions });

  // --- Bidet amenities ---
  const bidetOptions = [
    { key: 'bidetAmenities.available', label: 'Bidet amenities', count: f.bidetAmenities?.available },
  ].filter(o => o.count > 0);
  if (bidetOptions.length > 0) sections.push({ id: 'bidet', title: 'Bidet amenities', options: bidetOptions });

  // --- Stars ---
  const starOptions = [5, 4, 3, 2, 1]
    .map(n => ({ key: `starRating.${n}`, label: `${n} Star${n > 1 ? 's' : ''}`, count: f.starRating?.[n] || f.starRating?.[String(n)] }))
    .filter(o => o.count > 0);
  if (starOptions.length > 0) sections.push({ id: 'stars', title: 'Stars', options: starOptions });

  // --- Meal plan ---
  const mealOptions = [
    { key: 'mealPlan.allInclusive',      label: 'All inclusive',       count: f.mealPlan?.allInclusive },
    { key: 'mealPlan.breakfastIncluded', label: 'Breakfast included',  count: f.mealPlan?.breakfastIncluded },
    { key: 'mealPlan.halfBoard',         label: 'Half board',          count: f.mealPlan?.halfBoard },
    { key: 'mealPlan.fullBoard',         label: 'Full board',          count: f.mealPlan?.fullBoard },
    { key: 'mealPlan.selfCatering',      label: 'Self catering',       count: f.mealPlan?.selfCatering },
    { key: 'mealPlan.roomOnly',          label: 'Room only',           count: f.mealPlan?.roomOnly },
  ].filter(o => o.count > 0);
  if (mealOptions.length > 0) sections.push({ id: 'mealPlan', title: 'Meal plan', options: mealOptions });

  // --- Property type ---
  const propOptions = [
    { key: 'propertyType.hotel',    label: 'Hotel',    count: f.propertyType?.hotel },
    { key: 'propertyType.resort',   label: 'Resort',   count: f.propertyType?.resort },
    { key: 'propertyType.villa',    label: 'Villa',    count: f.propertyType?.villa },
    { key: 'propertyType.apartment',label: 'Apartment',count: f.propertyType?.apartment },
    { key: 'propertyType.guestHouse',label: 'Guest house', count: f.propertyType?.guestHouse },
    { key: 'propertyType.hostel',   label: 'Hostel',   count: f.propertyType?.hostel },
  ].filter(o => o.count > 0);
  if (propOptions.length > 0) sections.push({ id: 'propertyType', title: 'Property type', options: propOptions });

  // --- Free cancellation ---
  const cancelCount = f.freeCancellation?.freeCancellation;
  if (cancelCount > 0) {
    sections.push({ id: 'freeCancellation', title: 'Free cancellation', options: [
      { key: 'freeCancellation.freeCancellation', label: 'Free cancellation', count: cancelCount },
    ]});
  }

  return sections;
}

// ─── Check if a hotel passes a set of active filter keys ─────────────────────
function hotelPassesFilters(hotel, activeKeys) {
  if (activeKeys.size === 0) return true;
  const f = hotel.rawFilters;

  for (const key of activeKeys) {
    const [section, sub] = key.split('.');
    let passes = false;

    if (section === 'halalFood')       passes = !!(f.halalFood?.[sub]);
    else if (section === 'alcoholFree') passes = !!(f.alcoholFree?.[sub]);
    else if (section === 'pool')        passes = !!(f.pool?.[sub]);
    else if (section === 'wellnessSpa') passes = !!(f.wellnessSpa?.[sub]);
    else if (section === 'beach')       passes = !!(f.beach?.[sub]);
    else if (section === 'bidetAmenities') passes = !!(f.bidetAmenities?.[sub]);
    else if (section === 'mealPlan')    passes = !!(f.mealPlan?.[sub]);
    else if (section === 'propertyType') passes = !!(f.propertyType?.[sub]);
    else if (section === 'freeCancellation') passes = !!(f.freeCancellation?.[sub]);
    else if (section === 'starRating') {
      const n = parseInt(sub, 10);
      passes = hotel.starRating === n;
    }

    if (!passes) return false;
  }
  return true;
}

// ═══ Collapsible sidebar filter section ══════════════════════════════════════
function SidebarSection({ title, options, activeKeys, onToggle, defaultOpen = true }) {
  const [open, setOpen] = useState(defaultOpen);
  const hasActive = options.some(o => activeKeys.has(o.key));

  return (
    <div className="border-b border-slate-200 dark:border-brand-emerald-900/40">
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between py-3.5 px-1 text-sm font-semibold text-slate-800 dark:text-slate-200 hover:text-brand-emerald-600 dark:hover:text-brand-gold-400 transition-colors cursor-pointer"
      >
        <span className="flex items-center gap-2">
          {title}
          {hasActive && <span className="w-1.5 h-1.5 rounded-full bg-brand-emerald-500 dark:bg-brand-gold-500" />}
        </span>
        {open
          ? <ChevronUp className="w-4 h-4 text-slate-400" />
          : <ChevronDown className="w-4 h-4 text-slate-400" />}
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="pb-3 space-y-0.5">
              {options.map(opt => {
                const checked = activeKeys.has(opt.key);
                return (
                  <label
                    key={opt.key}
                    className="flex items-center justify-between py-1.5 px-1 rounded-lg cursor-pointer group hover:bg-slate-50 dark:hover:bg-brand-emerald-900/20 transition-colors"
                    onClick={() => onToggle(opt.key)}
                  >
                    <span className="flex items-center gap-2.5">
                      <span className={`w-4 h-4 rounded flex items-center justify-center flex-shrink-0 border transition-all
                        ${checked
                          ? 'bg-brand-emerald-500 dark:bg-brand-gold-500 border-brand-emerald-500 dark:border-brand-gold-500'
                          : 'border-slate-300 dark:border-brand-emerald-700 group-hover:border-brand-emerald-400'}`}
                      >
                        {checked && <Check className="w-2.5 h-2.5 text-white dark:text-brand-emerald-950" />}
                      </span>
                      <span className="text-sm text-slate-700 dark:text-slate-300 select-none leading-snug">
                        {opt.label}
                      </span>
                    </span>
                    {opt.count !== undefined && (
                      <span className="text-xs text-slate-400 dark:text-slate-500 tabular-nums ml-2 flex-shrink-0">
                        {opt.count.toLocaleString()}
                      </span>
                    )}
                  </label>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ═══ Hotel card — halalbooking.com horizontal style ══════════════════════════
function HotelCard({ hotel, searchParams }) {
  const navigate = useNavigate();
  const [saved, setSaved] = useState(false);

  const SHOWN_FEATURES = 3;
  const shownFeatures = hotel.features.slice(0, SHOWN_FEATURES);
  const extraCount = hotel.features.length - SHOWN_FEATURES;

  const discount = hotel.originalPrice > hotel.price
    ? Math.round((1 - hotel.price / hotel.originalPrice) * 100)
    : 0;

  const handleView = () => {
    const params = new URLSearchParams({
      checkIn: searchParams.get('checkIn') || '',
      checkOut: searchParams.get('checkOut') || '',
      guests: searchParams.get('guests') || '1',
      destName: hotel.location,
    });
    navigate(`/hotel/${hotel.id}?${params.toString()}`);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="flex bg-white dark:bg-[#0a1628] border border-slate-200/80 dark:border-brand-emerald-900/40 rounded-2xl overflow-hidden hover:shadow-lg dark:hover:shadow-brand-emerald-950/50 transition-all duration-300 group"
    >
      {/* ── Left: Image ── */}
      <div className="relative flex-shrink-0 w-56 sm:w-64 lg:w-72">
        <img
          src={hotel.image}
          alt={hotel.name}
          className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
          style={{ minHeight: 200 }}
        />
        {/* Heart save */}
        <button
          onClick={() => setSaved(s => !s)}
          className="absolute top-3 left-3 w-8 h-8 rounded-full bg-white/80 dark:bg-black/50 backdrop-blur-sm flex items-center justify-center hover:scale-110 transition-transform cursor-pointer shadow"
        >
          <Heart className={`w-4 h-4 transition-colors ${saved ? 'fill-red-500 text-red-500' : 'text-slate-500'}`} />
        </button>

        {/* Review score badge */}
        {hotel.reviewScore > 0 && (
          <div className="absolute top-3 right-3 flex flex-col items-center bg-brand-emerald-500 dark:bg-brand-gold-500 text-white dark:text-brand-emerald-950 px-2 py-1.5 rounded-xl text-center shadow-md min-w-[48px]">
            {hotel.reviewLabel && <span className="text-[9px] font-bold uppercase leading-none mb-0.5">{hotel.reviewLabel}</span>}
            <span className="text-base font-extrabold leading-none">{hotel.reviewScore.toFixed(1)}</span>
            {hotel.reviewCount > 0 && (
              <span className="text-[8px] opacity-75 leading-none mt-0.5">{hotel.reviewCount} reviews</span>
            )}
          </div>
        )}
      </div>

      {/* ── Right: Details ── */}
      <div className="flex flex-1 min-w-0">
        {/* Main info */}
        <div className="flex-1 p-4 lg:p-5 flex flex-col justify-between min-w-0">
          <div>
            {/* Name + stars */}
            <div className="flex items-start gap-2 mb-1">
              <h3
                onClick={handleView}
                className="text-base lg:text-lg font-bold text-slate-900 dark:text-white leading-snug cursor-pointer hover:text-brand-emerald-600 dark:hover:text-brand-gold-400 transition-colors"
              >
                {hotel.name}
                {hotel.starRating > 0 && (
                  <span className="inline-flex items-center gap-0.5 ml-2 align-middle">
                    {Array.from({ length: Math.min(5, hotel.starRating) }).map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                    ))}
                  </span>
                )}
              </h3>
            </div>

            {/* Location */}
            <p className="flex items-center gap-1 text-[11px] text-slate-500 dark:text-slate-400 mb-3">
              <MapPin className="w-3 h-3 text-brand-gold-500 flex-shrink-0" />
              {hotel.location}
            </p>

            {/* Halal features list */}
            <div className="space-y-1.5 mb-3">
              {shownFeatures.map(feat => (
                <div key={feat.key} className="flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300">
                  <span className="w-4 h-4 rounded bg-brand-emerald-50 dark:bg-brand-emerald-900/40 flex items-center justify-center flex-shrink-0">
                    <Check className="w-2.5 h-2.5 text-brand-emerald-600 dark:text-brand-gold-400" />
                  </span>
                  {feat.label}
                </div>
              ))}
              {extraCount > 0 && (
                <p className="text-xs text-brand-emerald-600 dark:text-brand-gold-400 font-semibold cursor-pointer hover:underline" onClick={handleView}>
                  +{extraCount} more halal-friendly feature{extraCount > 1 ? 's' : ''} at this property
                </p>
              )}
            </div>

            {/* Room + meal */}
            <p className="text-xs text-slate-500 dark:text-slate-400 truncate">{hotel.roomName}</p>
            {hotel.mealPlan && <p className="text-xs text-slate-500 dark:text-slate-400">{hotel.mealPlan}</p>}
          </div>

          {/* Free cancellation */}
          {hotel.freeCancellation && (
            <p className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold mt-2 flex items-center gap-1">
              <Check className="w-3 h-3" />
              Free cancellation
            </p>
          )}
        </div>

        {/* Price column */}
        <div className="flex flex-col items-end justify-between p-4 lg:p-5 border-l border-slate-100 dark:border-brand-emerald-900/30 flex-shrink-0 w-36 lg:w-44">
          <div className="text-right">
            {discount > 0 && (
              <div className="flex items-center justify-end gap-1.5 mb-1">
                <span className="text-[10px] font-bold bg-red-500 text-white px-1.5 py-0.5 rounded">-{discount}%</span>
                <span className="text-xs text-slate-400 dark:text-slate-500 line-through">
                  ${hotel.originalPrice.toLocaleString()}
                </span>
              </div>
            )}
            <p className="text-2xl font-extrabold text-slate-900 dark:text-white leading-none">
              {hotel.price > 0 ? `$${hotel.price.toLocaleString()}` : '—'}
            </p>
            <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-1 leading-snug">
              per night<br />taxes & fees incl.
            </p>
          </div>

          <button
            onClick={handleView}
            className="mt-3 w-full py-2.5 rounded-xl bg-brand-emerald-500 hover:bg-brand-emerald-600 dark:bg-brand-gold-500 dark:hover:bg-brand-gold-600 text-white dark:text-brand-emerald-950 text-xs font-bold shadow transition-all duration-200 cursor-pointer"
          >
            View rooms
          </button>
        </div>
      </div>
    </motion.div>
  );
}

// ═══ Skeleton card ════════════════════════════════════════════════════════════
function SkeletonCard() {
  return (
    <div className="flex bg-white dark:bg-[#0a1628] border border-slate-200/60 dark:border-brand-emerald-900/30 rounded-2xl overflow-hidden animate-pulse" style={{ height: 200 }}>
      <div className="w-64 bg-slate-200 dark:bg-brand-emerald-900/30 flex-shrink-0" />
      <div className="flex-1 p-5 space-y-3">
        <div className="h-5 w-2/3 bg-slate-200 dark:bg-brand-emerald-900/30 rounded" />
        <div className="h-3 w-1/3 bg-slate-200 dark:bg-brand-emerald-900/30 rounded" />
        <div className="space-y-2 mt-2">
          <div className="h-3 w-1/2 bg-slate-200 dark:bg-brand-emerald-900/30 rounded" />
          <div className="h-3 w-2/5 bg-slate-200 dark:bg-brand-emerald-900/30 rounded" />
          <div className="h-3 w-1/3 bg-slate-200 dark:bg-brand-emerald-900/30 rounded" />
        </div>
      </div>
      <div className="w-40 p-5 border-l border-slate-100 dark:border-brand-emerald-900/30 flex flex-col justify-between">
        <div className="h-7 w-24 bg-slate-200 dark:bg-brand-emerald-900/30 rounded ml-auto" />
        <div className="h-9 w-full bg-slate-200 dark:bg-brand-emerald-900/30 rounded-xl" />
      </div>
    </div>
  );
}

// ═══ Main Page ════════════════════════════════════════════════════════════════
export default function SearchResultsPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const destId   = searchParams.get('destId')   || '24212';
  const destType = searchParams.get('destType') || 'city';
  const destName = searchParams.get('destName') || 'Hotels';
  const checkIn  = searchParams.get('checkIn')  || '';
  const checkOut = searchParams.get('checkOut') || '';
  const guests   = parseInt(searchParams.get('guests') || '1', 10);

  // ── Stream state ──────────────────────────────────────────────────────────
  const [hotels, setHotels]           = useState([]);
  const [isStreaming, setIsStreaming]  = useState(true);
  const [streamError, setStreamError] = useState(null);
  const [backendFilters, setBackendFilters] = useState(null); // raw from SSE done event
  const eventSourceRef = useRef(null);

  // ── Active filter keys (Set of "section.subKey") ──────────────────────────
  const [activeKeys, setActiveKeys] = useState(new Set());

  // ── Sort ──────────────────────────────────────────────────────────────────
  const [sortBy, setSortBy] = useState('price');

  // ── Mobile sidebar ────────────────────────────────────────────────────────
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // ── Stream ────────────────────────────────────────────────────────────────
  useEffect(() => {
    setHotels([]);
    setIsStreaming(true);
    setStreamError(null);
    setBackendFilters(null);
    setActiveKeys(new Set());

    const payload = {
      [destType]: destId,
      roomsFilters: {
        guestNationality: 'DZ',
        checkIn,
        checkOut,
        paxRooms: [{ adults: guests, children: 0, childrenAges: [] }],
        filters: { refundable: false, mealType: 'All' },
      },
    };

    let es = null;

    initSearch(payload)
      .then(res => {
        if (!res.success || !res.data?.sessionId) throw new Error('Init failed');
        es = openSearchStream(res.data.sessionId);
        eventSourceRef.current = es;

        es.onmessage = (event) => {
          try {
            const raw = JSON.parse(event.data);
            let data = raw;
            if (typeof raw.data === 'string') {
              try { data = JSON.parse(raw.data); } catch {}
            } else if (raw.data && typeof raw.data === 'object') {
              data = raw.data;
            }

            if (data.hotels && Array.isArray(data.hotels)) {
              const mapped = data.hotels.map(h => mapHotel(h, destName));
              setHotels(prev => {
                const seen = new Set(prev.map(h => h.id));
                return [...prev, ...mapped.filter(h => !seen.has(h.id))];
              });
            }

            if (data.done) {
              // Capture backend filter counts from the done event
              if (data.filters) setBackendFilters(data.filters);
              es.close();
              setIsStreaming(false);
            }
          } catch (e) {
            console.error('[SSE] parse error:', e);
          }
        };

        es.onerror = () => { es.close(); setIsStreaming(false); };
      })
      .catch(err => { setStreamError(err.message); setIsStreaming(false); });

    return () => { if (es) es.close(); if (eventSourceRef.current) eventSourceRef.current.close(); };
  }, [destId, destType, destName, checkIn, checkOut, guests]);

  // ── Dynamic sidebar sections (from backend after stream ends) ─────────────
  const filterSections = useMemo(() => buildFilterSections(backendFilters), [backendFilters]);

  // ── Toggle a filter key ───────────────────────────────────────────────────
  const toggleKey = useCallback((key) => {
    setActiveKeys(prev => {
      const next = new Set(prev);
      next.has(key) ? next.delete(key) : next.add(key);
      return next;
    });
  }, []);

  // ── Displayed hotels (filtered + sorted) ──────────────────────────────────
  const displayedHotels = useMemo(() => {
    let list = hotels.filter(h => hotelPassesFilters(h, activeKeys));
    list.sort((a, b) => {
      if (sortBy === 'price') return (a.price || 0) - (b.price || 0);
      if (sortBy === 'stars') return (b.starRating || 0) - (a.starRating || 0);
      if (sortBy === 'score') return (b.reviewScore || 0) - (a.reviewScore || 0);
      return 0;
    });
    return list;
  }, [hotels, activeKeys, sortBy]);

  // ── Active chip labels (for top bar) ─────────────────────────────────────
  const activeChips = useMemo(() => {
    const labels = {};
    filterSections.forEach(sec => sec.options.forEach(o => { labels[o.key] = o.label; }));
    return [...activeKeys].map(k => ({ key: k, label: labels[k] || k }));
  }, [activeKeys, filterSections]);

// ═══ Sidebar content (defined outside render to avoid re-creation) ═══════════
function SidebarContent({ isStreaming, displayedHotels, backendFilters, filterSections, activeKeys, toggleKey, setActiveKeys }) {
  return (
    <div>
      {/* Count + spinner */}
      <div className="flex items-center justify-between mb-5">
        <span className="text-sm font-bold text-slate-800 dark:text-slate-200">
          {displayedHotels.length.toLocaleString()} properties
        </span>
        {isStreaming && <Loader2 className="w-3.5 h-3.5 animate-spin text-brand-gold-500" />}
      </div>

      {/* Filter shimmer while streaming */}
      {!backendFilters && isStreaming && (
        <div className="space-y-5 animate-pulse">
          {[1,2,3,4].map(i => (
            <div key={i} className="border-b border-slate-100 dark:border-brand-emerald-900/30 pb-4">
              <div className="h-4 w-28 bg-slate-200 dark:bg-brand-emerald-900/30 rounded mb-3" />
              {[1,2,3].map(j => (
                <div key={j} className="flex items-center justify-between py-1.5 gap-2">
                  <div className="w-4 h-4 bg-slate-200 dark:bg-brand-emerald-900/30 rounded flex-shrink-0" />
                  <div className="h-3 flex-1 bg-slate-200 dark:bg-brand-emerald-900/30 rounded" />
                  <div className="h-3 w-7 bg-slate-200 dark:bg-brand-emerald-900/30 rounded" />
                </div>
              ))}
            </div>
          ))}
        </div>
      )}

      {/* No filter data (stream done but no filters) */}
      {!backendFilters && !isStreaming && (
        <p className="text-xs text-slate-400 dark:text-slate-500">No filter data available</p>
      )}

      {/* Dynamic filter sections from backend */}
      {filterSections.map(sec => (
        <SidebarSection
          key={sec.id}
          title={sec.title}
          options={sec.options}
          activeKeys={activeKeys}
          onToggle={toggleKey}
        />
      ))}

      {/* Clear all */}
      {activeKeys.size > 0 && (
        <button
          onClick={() => setActiveKeys(new Set())}
          className="mt-4 w-full py-2 rounded-xl border border-brand-emerald-300 dark:border-brand-gold-600/40 text-brand-emerald-600 dark:text-brand-gold-400 text-sm font-semibold hover:bg-brand-emerald-50 dark:hover:bg-brand-emerald-900/20 transition cursor-pointer"
        >
          Clear all filters
        </button>
      )}
    </div>
  );
}

  // ─── RENDER ───────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen flex flex-col font-sans bg-slate-50 dark:bg-[#060b14] text-slate-900 dark:text-slate-100 pt-30">
      <Header />

      {/* ── Search context bar (destination / dates / guests + back) ── */}
      <div className="bg-white dark:bg-[#0a1628] border-b border-slate-200 dark:border-brand-emerald-900/40 shadow-sm">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-3 flex flex-wrap items-center gap-3">
          {/* Back */}
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-1.5 text-sm font-semibold text-brand-emerald-600 dark:text-brand-gold-400 hover:opacity-80 transition cursor-pointer flex-shrink-0 mr-1"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Back</span>
          </button>

          {/* Destination pill */}
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-slate-100 dark:bg-brand-emerald-900/30 border border-slate-200 dark:border-brand-emerald-800/40">
            <MapPin className="w-3.5 h-3.5 text-brand-gold-500 flex-shrink-0" />
            <span className="text-sm font-semibold text-slate-800 dark:text-slate-200 truncate max-w-[140px]">{destName}</span>
          </div>

          {/* Dates pill */}
          {checkIn && (
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-slate-100 dark:bg-brand-emerald-900/30 border border-slate-200 dark:border-brand-emerald-800/40">
              <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{checkIn}</span>
              <span className="text-slate-400 dark:text-slate-500 text-xs">→</span>
              <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{checkOut}</span>
            </div>
          )}

          {/* Guests pill */}
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-slate-100 dark:bg-brand-emerald-900/30 border border-slate-200 dark:border-brand-emerald-800/40">
            <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{guests} guest{guests !== 1 ? 's' : ''}</span>
          </div>
        </div>
      </div>

      {/* ── Filter chips + sort bar (sticky just below the ~80px fixed header) ── */}
      <div className="sticky top-20 z-30 bg-white dark:bg-[#0a1628] border-b border-slate-200 dark:border-brand-emerald-900/40 shadow-sm">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-2 py-2.5 overflow-x-auto">

            {/* Mobile filter toggle */}
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-slate-300 dark:border-brand-emerald-700 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-brand-emerald-900/20 transition cursor-pointer flex-shrink-0"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              Filters
            </button>

            {/* Active filter chips */}
            {activeChips.map(({ key, label }) => (
              <button
                key={key}
                onClick={() => toggleKey(key)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-800 dark:bg-brand-gold-500 text-white dark:text-brand-emerald-950 text-xs font-bold flex-shrink-0 hover:opacity-90 transition cursor-pointer"
              >
                {label}
                <X className="w-3 h-3" />
              </button>
            ))}

            {/* Spacer */}
            <div className="flex-1 min-w-4" />

            {/* Sort */}
            <div className="flex items-center gap-0.5 flex-shrink-0">
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 mr-2 whitespace-nowrap">Sort by:</span>
              {[
                { key: 'price', label: 'Price' },
                { key: 'stars', label: 'Stars' },
                { key: 'score', label: 'Review score' },
              ].map(s => (
                <button
                  key={s.key}
                  onClick={() => setSortBy(s.key)}
                  className={`px-3 py-1.5 text-sm transition cursor-pointer whitespace-nowrap
                    ${sortBy === s.key
                      ? 'font-bold text-brand-emerald-600 dark:text-brand-gold-400 border-b-2 border-brand-emerald-500 dark:border-brand-gold-500'
                      : 'font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'}`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Body: sidebar + results ── */}
      <div className="max-w-screen-xl mx-auto w-full px-4 sm:px-6 py-5 flex gap-6 items-start">

        {/* ── Left sidebar (desktop, sticky below header+sort bar) ── */}
        <aside className="hidden lg:flex flex-col w-60 xl:w-64 flex-shrink-0 sticky top-[128px] max-h-[calc(100vh-136px)] overflow-y-auto">
          {/* Map stub — like halalbooking "Switch to map" */}
          <div className="mb-3 rounded-xl overflow-hidden border border-slate-200 dark:border-brand-emerald-900/40 shadow-sm">
            <div className="h-24 bg-gradient-to-br from-slate-200 to-slate-300 dark:from-brand-emerald-900/40 dark:to-brand-emerald-800/20 flex items-center justify-center relative">
              <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle, #c5a880 1px, transparent 1px)', backgroundSize: '12px 12px' }} />
              <div className="flex items-center gap-2 px-3 py-2 bg-white dark:bg-[#0a1628] rounded-full shadow-md text-xs font-bold text-slate-700 dark:text-slate-200 z-10">
                <MapPin className="w-3.5 h-3.5 text-brand-gold-500" />
                Switch to map
              </div>
            </div>
          </div>

          {/* Filter sections */}
          <div className="bg-white dark:bg-[#0a1628] border border-slate-200 dark:border-brand-emerald-900/40 rounded-xl p-4 shadow-sm flex-1">
            <SidebarContent
              isStreaming={isStreaming}
              displayedHotels={displayedHotels}
              backendFilters={backendFilters}
              filterSections={filterSections}
              activeKeys={activeKeys}
              toggleKey={toggleKey}
              setActiveKeys={setActiveKeys}
            />
          </div>
        </aside>

        {/* ── Mobile sidebar overlay ── */}
        <AnimatePresence>
          {sidebarOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                onClick={() => setSidebarOpen(false)}
              />
              <motion.div
                initial={{ x: '-100%' }}
                animate={{ x: 0 }}
                exit={{ x: '-100%' }}
                transition={{ type: 'spring', damping: 28, stiffness: 260 }}
                className="fixed left-0 top-0 bottom-0 z-50 w-72 bg-white dark:bg-[#0a1628] shadow-2xl overflow-y-auto p-5 lg:hidden"
              >
                <div className="flex items-center justify-between mb-5">
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">Filters</h3>
                  <button onClick={() => setSidebarOpen(false)} className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-brand-emerald-900/40 cursor-pointer transition">
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <SidebarContent
                  isStreaming={isStreaming}
                  displayedHotels={displayedHotels}
                  backendFilters={backendFilters}
                  filterSections={filterSections}
                  activeKeys={activeKeys}
                  toggleKey={toggleKey}
                  setActiveKeys={setActiveKeys}
                />
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="mt-5 w-full py-3 rounded-xl bg-brand-emerald-500 dark:bg-brand-gold-500 text-white dark:text-brand-emerald-950 font-bold cursor-pointer"
                >
                  Show {displayedHotels.length} properties
                </button>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* ── Right: results ── */}
        <main className="flex-1 min-w-0">
          {/* Count header */}
          {!streamError && (
            <div className="flex items-center gap-2 mb-4">
              {isStreaming
                ? <span className="text-sm text-slate-500 dark:text-slate-400 flex items-center gap-1.5"><Loader2 className="w-3.5 h-3.5 animate-spin text-brand-gold-500" /> Searching for properties…</span>
                : <h2 className="text-base font-bold text-slate-700 dark:text-slate-300">
                    <span className="text-slate-900 dark:text-white">{displayedHotels.length.toLocaleString()}</span> properties found
                    {destName && <span className="font-normal text-slate-500 dark:text-slate-400"> in {destName}</span>}
                  </h2>
              }
            </div>
          )}

          {/* Skeletons */}
          {isStreaming && hotels.length === 0 && (
            <div className="space-y-3">
              {[1,2,3].map(i => <SkeletonCard key={i} />)}
            </div>
          )}

          {/* Error */}
          {streamError && (
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <ShieldAlert className="w-14 h-14 text-brand-gold-500 mb-4" />
              <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200 mb-2">Search failed</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 mb-5 max-w-sm">{streamError}</p>
              <button onClick={() => navigate(-1)} className="px-5 py-2.5 rounded-xl bg-brand-emerald-500 text-white font-semibold text-sm cursor-pointer">Go back</button>
            </div>
          )}

          {/* No results from API */}
          {!isStreaming && !streamError && displayedHotels.length === 0 && hotels.length === 0 && (
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <ShieldAlert className="w-14 h-14 text-brand-gold-500 mb-4" />
              <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200 mb-2">No hotels found</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 mb-5 max-w-sm">Try different dates, destination, or remove some filters.</p>
              <button onClick={() => navigate(-1)} className="px-5 py-2.5 rounded-xl bg-brand-emerald-500 text-white font-semibold text-sm cursor-pointer">New search</button>
            </div>
          )}

          {/* Hotels filtered out by sidebar */}
          {!isStreaming && !streamError && displayedHotels.length === 0 && hotels.length > 0 && (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <ShieldAlert className="w-12 h-12 text-brand-gold-500 mb-3" />
              <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200 mb-2">No hotels match your filters</h3>
              <button onClick={() => setActiveKeys(new Set())} className="px-5 py-2 rounded-xl bg-brand-emerald-500 text-white font-semibold text-sm cursor-pointer">Clear filters</button>
            </div>
          )}

          {/* Hotel cards */}
          <div className="space-y-3">
            <AnimatePresence mode="popLayout">
              {displayedHotels.map(hotel => (
                <HotelCard key={hotel.id} hotel={hotel} searchParams={searchParams} />
              ))}
            </AnimatePresence>

            {/* Streaming more */}
            {isStreaming && hotels.length > 0 && (
              <div className="flex items-center justify-center gap-2 py-5 text-sm text-slate-400 dark:text-slate-500">
                <Loader2 className="w-4 h-4 animate-spin text-brand-gold-500" />
                Loading more properties…
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
