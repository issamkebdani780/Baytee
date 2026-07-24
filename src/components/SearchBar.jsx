import { useState, useEffect, useRef } from 'react';
import { Search, Calendar, Users, MapPin, Hotel, X, Loader2, ChevronDown } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { searchDestinations } from '../api';

/**
 * Baytee-branded search bar — same visual language as the Hero widget.
 *
 * Props:
 *   initialDestination / initialDestId / initialDestType
 *   initialCheckIn / initialCheckOut
 *   initialRooms   – paxRooms array
 */
export default function SearchBar({
  initialDestination = '',
  initialDestId = '24212',
  initialDestType = 'city',
  initialCheckIn = '',
  initialCheckOut = '',
  initialRooms = [{ adults: 2, children: 0, childrenAges: [] }],
}) {
  const navigate = useNavigate();

  const tomorrow = new Date(Date.now() + 86400000).toISOString().split('T')[0];
  const dayAfter3 = new Date(Date.now() + 4 * 86400000).toISOString().split('T')[0];

  const [destination, setDestination] = useState(initialDestination);
  const [selectedDest, setSelectedDest] = useState(null);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [apiSuggestions, setApiSuggestions] = useState([]);
  const [defaultSuggs, setDefaultSuggs] = useState([]);
  const [isLoadingSuggs, setIsLoadingSuggs] = useState(false);
  const [checkIn, setCheckIn] = useState(initialCheckIn || tomorrow);
  const [checkOut, setCheckOut] = useState(initialCheckOut || dayAfter3);
  const [rooms, setRooms] = useState(initialRooms);
  const [showGuests, setShowGuests] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const containerRef = useRef(null);

  // Popular suggestions on mount
  useEffect(() => {
    searchDestinations('a')
      .then(res => { if (res.success && Array.isArray(res.data)) setDefaultSuggs(res.data.slice(0, 6)); })
      .catch(() => { });
  }, []);

  // Debounced API suggestions
  useEffect(() => {
    if (!destination.trim()) { setApiSuggestions([]); setIsLoadingSuggs(false); return; }
    setIsLoadingSuggs(true);
    const id = setTimeout(() => {
      searchDestinations(destination)
        .then(res => setApiSuggestions(res.success && Array.isArray(res.data) ? res.data : []))
        .catch(() => setApiSuggestions([]))
        .finally(() => setIsLoadingSuggs(false));
    }, 300);
    return () => clearTimeout(id);
  }, [destination]);

  // Close dropdowns on outside click
  useEffect(() => {
    const h = e => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setShowSuggestions(false);
        setShowGuests(false);
      }
    };
    document.addEventListener('mousedown', h);
    return () => document.removeEventListener('mousedown', h);
  }, []);

  const totalGuests = rooms.reduce((a, r) => a + r.adults + r.children, 0);
  const totalChildren = rooms.reduce((a, r) => a + r.children, 0);
  const totalRooms = rooms.length;

  const suggestions = destination.trim() ? apiSuggestions : defaultSuggs;

  const handleSearch = e => {
    e.preventDefault();
    setIsSearching(true);
    let destId = initialDestId;
    let destType = initialDestType;
    let destName = destination || 'Hotels';

    if (selectedDest) {
      destId = selectedDest.id.toString();
      destType = selectedDest.type;
      destName = selectedDest.name;
    } else if (apiSuggestions.length > 0) {
      destId = apiSuggestions[0].id.toString();
      destType = apiSuggestions[0].type;
      destName = apiSuggestions[0].name;
    } else if (defaultSuggs.length > 0 && !destination.trim()) {
      destId = defaultSuggs[0].id.toString();
      destType = defaultSuggs[0].type;
      destName = defaultSuggs[0].name;
    }

    const params = new URLSearchParams({
      destId, destType, destName,
      checkIn: checkIn || tomorrow,
      checkOut: checkOut || dayAfter3,
      paxRooms: JSON.stringify(rooms),
    });
    setIsSearching(false);
    navigate(`/search?${params.toString()}`);
  };

  // ── Divider between sections ──────────────────────────────────────────────
  const Divider = () => (
    <div className="w-px h-8 bg-slate-200 dark:bg-brand-emerald-800/60 flex-shrink-0 self-center" />
  );

  return (
    <form ref={containerRef} onSubmit={handleSearch} className="w-full">
      {/* ── Main pill container ── */}
      <div className="flex items-stretch bg-white dark:bg-brand-emerald-950/80 backdrop-blur-xl rounded-2xl border border-slate-200/80 dark:border-brand-emerald-800/50 shadow-xl dark:shadow-brand-emerald-950/60 overflow-visible min-h-[56px]">

        {/* ── Destination ─────────────────────────────────────── */}
        <div className="relative flex-1 min-w-0 group">
          <div className="flex items-center gap-2.5 px-4 py-3 h-full rounded-l-2xl hover:bg-slate-50 dark:hover:bg-brand-emerald-900/30 transition-colors duration-200 cursor-text"
            onClick={() => { setShowSuggestions(true); containerRef.current?.querySelector('input[type=text]')?.focus(); }}>
            <MapPin className="w-4 h-4 text-brand-gold-500 flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-[9px] font-bold uppercase tracking-widest text-brand-gold-600 dark:text-brand-gold-500 leading-none mb-1">Destination</p>
              <input
                type="text"
                placeholder="Where are you going?"
                value={destination}
                onChange={e => { setDestination(e.target.value); setShowSuggestions(true); setSelectedDest(null); }}
                onFocus={() => setShowSuggestions(true)}
                className="w-full bg-transparent border-none text-sm font-semibold text-slate-800 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none truncate"
              />
            </div>
            {destination && (
              <button type="button" onClick={e => { e.stopPropagation(); setDestination(''); setSelectedDest(null); }}
                className="flex-shrink-0 p-0.5 rounded-full text-slate-300 hover:text-slate-500 dark:hover:text-slate-300 cursor-pointer transition-colors">
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Autocomplete dropdown */}
          <AnimatePresence>
            {showSuggestions && (
              <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.97 }}
                transition={{ duration: 0.18, ease: 'easeOut' }}
                className="absolute left-0 top-full mt-2 w-80 bg-white dark:bg-brand-emerald-950 border border-slate-200 dark:border-brand-emerald-800/60 rounded-2xl shadow-2xl dark:shadow-brand-emerald-950/80 overflow-hidden z-[100]"
              >
                {!destination.trim() && (
                  <p className="text-[9px] uppercase font-bold text-slate-400 dark:text-slate-500 px-4 pt-3 pb-1.5 tracking-widest">Popular destinations</p>
                )}
                {isLoadingSuggs ? (
                  <div className="flex items-center justify-center gap-2 py-6 text-slate-500 dark:text-slate-400">
                    <div className="w-4 h-4 border-2 border-brand-gold-500 border-t-transparent rounded-full animate-spin" />
                    <span className="text-xs font-medium">Searching…</span>
                  </div>
                ) : suggestions.length > 0 ? (
                  <div className="max-h-64 overflow-y-auto py-1.5">
                    {suggestions.map(item => (
                      <button
                        key={`${item.type}-${item.id}`}
                        type="button"
                        onClick={() => { setDestination(item.name); setSelectedDest(item); setShowSuggestions(false); }}
                        className="w-full text-left px-3 py-2.5 hover:bg-slate-50 dark:hover:bg-brand-emerald-900/40 flex items-center gap-3 transition cursor-pointer group/item"
                      >
                        <div className="w-8 h-8 rounded-xl bg-brand-emerald-50 dark:bg-brand-emerald-900/60 flex items-center justify-center flex-shrink-0 text-brand-gold-600 dark:text-brand-gold-400 group-hover/item:bg-brand-emerald-100 dark:group-hover/item:bg-brand-emerald-900 transition-colors">
                          {item.type === 'hotel' ? <Hotel className="w-4 h-4" /> : <MapPin className="w-4 h-4" />}
                        </div>
                        <div className="min-w-0 flex-1">
                          <span className="text-sm font-semibold text-slate-900 dark:text-white block truncate group-hover/item:text-brand-emerald-600 dark:group-hover/item:text-brand-gold-400 transition-colors">{item.name}</span>
                          {item.type === 'city' && item.hotelsCount > 0 && (
                            <span className="text-[10px] text-slate-400 dark:text-slate-500">{item.hotelsCount} properties</span>
                          )}
                        </div>
                        <span className="text-[9px] uppercase tracking-widest text-slate-400 dark:text-slate-600 font-bold flex-shrink-0 hidden sm:block">
                          {item.type}
                        </span>
                      </button>
                    ))}
                  </div>
                ) : destination.trim() ? (
                  <p className="py-6 text-center text-xs text-slate-400 dark:text-slate-500">No destinations found</p>
                ) : null}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <Divider />

        {/* ── Check-in ─────────────────────────────────────────── */}
        <div className="flex items-center gap-2.5 px-4 py-3 hover:bg-slate-50 dark:hover:bg-brand-emerald-900/30 transition-colors duration-200 flex-shrink-0 cursor-pointer min-w-[140px]">
          <Calendar className="w-4 h-4 text-brand-gold-500 flex-shrink-0" />
          <div className="min-w-0">
            <p className="text-[9px] font-bold uppercase tracking-widest text-brand-gold-600 dark:text-brand-gold-500 leading-none mb-1">Check-in</p>
            <input
              type="date"
              value={checkIn}
              min={new Date().toISOString().split('T')[0]}
              onChange={e => {
                setCheckIn(e.target.value);
                if (checkOut && e.target.value >= checkOut)
                  setCheckOut(new Date(new Date(e.target.value).getTime() + 86400000).toISOString().split('T')[0]);
              }}
              className="bg-transparent border-none text-sm font-semibold text-slate-800 dark:text-white focus:outline-none cursor-pointer w-full"
            />
          </div>
        </div>

        <Divider />

        {/* ── Check-out ────────────────────────────────────────── */}
        <div className="flex items-center gap-2.5 px-4 py-3 hover:bg-slate-50 dark:hover:bg-brand-emerald-900/30 transition-colors duration-200 flex-shrink-0 cursor-pointer min-w-[140px]">
          <Calendar className="w-4 h-4 text-brand-gold-500 flex-shrink-0" />
          <div className="min-w-0">
            <p className="text-[9px] font-bold uppercase tracking-widest text-brand-gold-600 dark:text-brand-gold-500 leading-none mb-1">Check-out</p>
            <input
              type="date"
              value={checkOut}
              min={checkIn ? new Date(new Date(checkIn).getTime() + 86400000).toISOString().split('T')[0] : new Date(Date.now() + 86400000).toISOString().split('T')[0]}
              onChange={e => setCheckOut(e.target.value)}
              className="bg-transparent border-none text-sm font-semibold text-slate-800 dark:text-white focus:outline-none cursor-pointer w-full"
            />
          </div>
        </div>

        <Divider />

        {/* ── Guests & Rooms ───────────────────────────────────── */}
        <div className="relative flex-shrink-0">
          <button
            type="button"
            onClick={() => { setShowGuests(v => !v); setShowSuggestions(false); }}
            className="flex items-center gap-2.5 px-4 py-3 h-full hover:bg-slate-50 dark:hover:bg-brand-emerald-900/30 transition-colors duration-200 cursor-pointer min-w-[160px]"
          >
            <Users className="w-4 h-4 text-brand-gold-500 flex-shrink-0" />
            <div className="text-left min-w-0 flex-1">
              <p className="text-[9px] font-bold uppercase tracking-widest text-brand-gold-600 dark:text-brand-gold-500 leading-none mb-1">Guests</p>
              <span className="text-sm font-semibold text-slate-800 dark:text-white whitespace-nowrap block">
                {totalGuests} adult{totalGuests !== 1 ? 's' : ''}
                {totalChildren > 0 ? `, ${totalChildren} child${totalChildren !== 1 ? 'ren' : ''}` : ''}
                , {totalRooms} room{totalRooms !== 1 ? 's' : ''}
              </span>
            </div>
            <ChevronDown className={`w-3.5 h-3.5 text-slate-400 dark:text-slate-500 flex-shrink-0 transition-transform duration-200 ${showGuests ? 'rotate-180' : ''}`} />
          </button>

          {/* Guest/Rooms dropdown */}
          <AnimatePresence>
            {showGuests && (
              <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.97 }}
                transition={{ duration: 0.18, ease: 'easeOut' }}
                className="absolute right-0 top-full mt-2 w-80 bg-white dark:bg-brand-emerald-950 border border-slate-200 dark:border-brand-emerald-800/60 rounded-2xl shadow-2xl dark:shadow-brand-emerald-950/80 p-4 z-[100] max-h-[65vh] overflow-y-auto"
              >
                <div className="space-y-5">
                  {rooms.map((room, rIdx) => (
                    <div key={rIdx} className="border-b border-slate-100 dark:border-brand-emerald-800/40 pb-5 last:border-0 last:pb-0">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-sm font-bold text-slate-800 dark:text-white">Room {rIdx + 1}</span>
                        {rooms.length > 1 && (
                          <button type="button"
                            onClick={() => setRooms(p => p.filter((_, i) => i !== rIdx))}
                            className="text-xs text-red-500 hover:text-red-600 font-semibold cursor-pointer transition-colors">
                            Remove
                          </button>
                        )}
                      </div>

                      {/* Adults */}
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <p className="text-sm font-medium text-slate-700 dark:text-slate-200">Adults</p>
                          <p className="text-[10px] text-slate-400 dark:text-slate-500">Ages 18+</p>
                        </div>
                        <div className="flex items-center gap-3">
                          <button type="button" disabled={room.adults <= 1}
                            onClick={() => setRooms(p => { const n = [...p]; n[rIdx] = { ...n[rIdx], adults: Math.max(1, n[rIdx].adults - 1) }; return n; })}
                            className="w-8 h-8 rounded-full border border-slate-200 dark:border-brand-emerald-700 flex items-center justify-center font-bold text-lg disabled:opacity-30 cursor-pointer text-slate-600 dark:text-slate-300 hover:border-brand-emerald-400 hover:text-brand-emerald-600 dark:hover:border-brand-gold-500 dark:hover:text-brand-gold-400 transition">
                            −
                          </button>
                          <span className="w-4 text-center text-sm font-bold text-slate-900 dark:text-white">{room.adults}</span>
                          <button type="button" disabled={room.adults >= 10}
                            onClick={() => setRooms(p => { const n = [...p]; n[rIdx] = { ...n[rIdx], adults: Math.min(10, n[rIdx].adults + 1) }; return n; })}
                            className="w-8 h-8 rounded-full border border-slate-200 dark:border-brand-emerald-700 flex items-center justify-center font-bold text-lg cursor-pointer text-slate-600 dark:text-slate-300 hover:border-brand-emerald-400 hover:text-brand-emerald-600 dark:hover:border-brand-gold-500 dark:hover:text-brand-gold-400 transition">
                            +
                          </button>
                        </div>
                      </div>

                      {/* Children */}
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-slate-700 dark:text-slate-200">Children</p>
                          <p className="text-[10px] text-slate-400 dark:text-slate-500">Ages 0–17</p>
                        </div>
                        <div className="flex items-center gap-3">
                          <button type="button" disabled={room.children <= 0}
                            onClick={() => setRooms(p => { const n = [...p]; n[rIdx] = { ...n[rIdx], children: Math.max(0, n[rIdx].children - 1), childrenAges: n[rIdx].childrenAges.slice(0, -1) }; return n; })}
                            className="w-8 h-8 rounded-full border border-slate-200 dark:border-brand-emerald-700 flex items-center justify-center font-bold text-lg disabled:opacity-30 cursor-pointer text-slate-600 dark:text-slate-300 hover:border-brand-emerald-400 hover:text-brand-emerald-600 dark:hover:border-brand-gold-500 dark:hover:text-brand-gold-400 transition">
                            −
                          </button>
                          <span className="w-4 text-center text-sm font-bold text-slate-900 dark:text-white">{room.children}</span>
                          <button type="button" disabled={room.children >= 6}
                            onClick={() => setRooms(p => { const n = [...p]; n[rIdx] = { ...n[rIdx], children: Math.min(6, n[rIdx].children + 1), childrenAges: [...n[rIdx].childrenAges, 5] }; return n; })}
                            className="w-8 h-8 rounded-full border border-slate-200 dark:border-brand-emerald-700 flex items-center justify-center font-bold text-lg cursor-pointer text-slate-600 dark:text-slate-300 hover:border-brand-emerald-400 hover:text-brand-emerald-600 dark:hover:border-brand-gold-500 dark:hover:text-brand-gold-400 transition">
                            +
                          </button>
                        </div>
                      </div>

                      {/* Children ages */}
                      {room.children > 0 && (
                        <div className="mt-3 grid grid-cols-2 gap-2">
                          {Array.from({ length: room.children }).map((_, cIdx) => (
                            <div key={cIdx} className="flex flex-col gap-1">
                              <label className="text-[10px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Child {cIdx + 1} age</label>
                              <select
                                value={room.childrenAges[cIdx] ?? 5}
                                onChange={e => setRooms(p => { const n = [...p]; n[rIdx] = { ...n[rIdx], childrenAges: [...n[rIdx].childrenAges] }; n[rIdx].childrenAges[cIdx] = parseInt(e.target.value, 10); return n; })}
                                className="w-full text-xs bg-slate-50 dark:bg-brand-emerald-950 border border-slate-200 dark:border-brand-emerald-800 rounded-lg px-2 py-1.5 focus:outline-none focus:border-brand-emerald-400 dark:focus:border-brand-gold-500 text-slate-800 dark:text-white"
                              >
                                {Array.from({ length: 18 }, (_, i) => (
                                  <option key={i} value={i}>{i === 0 ? 'Under 1' : `${i} year${i > 1 ? 's' : ''}`}</option>
                                ))}
                              </select>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                <button type="button"
                  onClick={() => setRooms(p => [...p, { adults: 2, children: 0, childrenAges: [] }])}
                  className="mt-4 w-full py-2.5 text-xs font-bold border border-brand-emerald-300 dark:border-brand-gold-500/40 text-brand-emerald-700 dark:text-brand-gold-400 rounded-xl hover:bg-brand-emerald-50 dark:hover:bg-brand-emerald-900/20 transition cursor-pointer">
                  + Add another room
                </button>
                <button type="button"
                  onClick={() => setShowGuests(false)}
                  className="mt-2 w-full py-2.5 text-xs font-bold bg-brand-emerald-500 hover:bg-brand-emerald-600 dark:bg-brand-gold-500 dark:hover:bg-brand-gold-600 text-white dark:text-brand-emerald-950 rounded-xl transition cursor-pointer">
                  Done
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ── Search button ────────────────────────────────────── */}
        <button
          type="submit"
          disabled={isSearching}
          className="flex items-center justify-center gap-2 px-6 my-2 mr-2 bg-brand-emerald-500 hover:bg-brand-emerald-600 dark:bg-brand-gold-500 dark:hover:bg-brand-gold-600 text-white dark:text-brand-emerald-950 font-bold text-sm tracking-wide rounded-xl transition-all duration-200 cursor-pointer flex-shrink-0 disabled:opacity-70 shadow-md hover:shadow-lg"
        >
          {isSearching
            ? <Loader2 className="w-4 h-4 animate-spin" />
            : <Search className="w-4 h-4" />
          }
          <span className="hidden sm:inline">Search</span>
        </button>
      </div>
    </form>
  );
}
