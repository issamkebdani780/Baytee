import { useState, useEffect } from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Star, MapPin, Check, Loader2, ShieldAlert, Calendar, Users, Utensils, X, Maximize, BedDouble, Bath, Droplets, Tag, Info } from 'lucide-react';
import Header from '../components/Header';
import { getHotelById } from '../api';

// ─── Placeholder images ───────────────────────────────────────────────────────
const PLACEHOLDER_IMAGES = [
  'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80',
];

// ─── Room card ────────────────────────────────────────────────────────────────
function RoomCard({ room, onBook, hotelImage }) {
  // Real data parsing
  const roomImage = room.image || room.images?.[0]?.url || room.images?.[0] || hotelImage;
  
  const size = room.size || room.roomSize;
  const bedrooms = room.bedrooms;
  const bathrooms = room.bathrooms;
  const adults = room.maxAdults || room.pax || room.occupancy?.adults;
  const beds = room.beds || room.bedType || room.bedding;
  const bidet = room.hasBidet || room.roomFilters?.bidetAmenities?.available;
  
  const currentPrice = room.price || room.lowestPrice;
  const oldPrice = room.originalPrice || room.strikethroughPrice;
  const discountPercent = oldPrice && currentPrice && oldPrice > currentPrice
    ? Math.round(((oldPrice - currentPrice) / oldPrice) * 100)
    : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="border border-slate-200/70 dark:border-brand-emerald-800/30 rounded-2xl bg-white dark:bg-[#0b1320] overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col"
    >
      {/* Room Image */}
      {roomImage ? (
        <div className="relative h-48 sm:h-56 overflow-hidden bg-slate-100 dark:bg-brand-emerald-950/50 flex-shrink-0">
          <img src={roomImage} alt={room.name || 'Room'} className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
          {/* Simple dots for carousel if multiple images exist */}
          {room.images && room.images.length > 1 && (
            <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5 z-10">
              {room.images.slice(0, 4).map((_, idx) => (
                <div key={idx} className={`w-2 h-2 rounded-full bg-white ${idx === 0 ? 'opacity-100' : 'opacity-50'}`}></div>
              ))}
            </div>
          )}
        </div>
      ) : (
        <div className="h-48 sm:h-56 bg-slate-100 dark:bg-brand-emerald-900/20 flex flex-col items-center justify-center text-slate-400 dark:text-slate-600 flex-shrink-0">
          <span className="text-sm font-medium">No Image Provided</span>
        </div>
      )}

      <div className="p-5 flex flex-col flex-1">
        <h4 className="font-bold text-slate-900 dark:text-white text-[19px] mb-3 leading-tight">{room.name || room.roomName || 'Standard Room'}</h4>
        
        {/* Room specs */}
        {(size || bedrooms || bathrooms) && (
          <div className="flex flex-wrap gap-2 mb-3 text-[13px] font-medium text-amber-800 dark:text-amber-200/80">
            {size && (
              <span className="flex items-center gap-1 bg-amber-50 dark:bg-amber-900/20 px-2 py-0.5 rounded">
                <Maximize className="w-3.5 h-3.5" /> {size} {typeof size === 'number' ? 'm²' : ''}
              </span>
            )}
            {bedrooms && (
              <span className="flex items-center gap-1 bg-amber-50 dark:bg-amber-900/20 px-2 py-0.5 rounded">
                <BedDouble className="w-3.5 h-3.5" /> {bedrooms} bedroom{bedrooms > 1 ? 's' : ''}
              </span>
            )}
            {bathrooms && (
              <span className="flex items-center gap-1 bg-amber-50 dark:bg-amber-900/20 px-2 py-0.5 rounded">
                <Bath className="w-3.5 h-3.5" /> {bathrooms} bathroom{bathrooms > 1 ? 's' : ''}
              </span>
            )}
          </div>
        )}

        {/* Suitability */}
        {adults && (
          <div className="flex items-center gap-1.5 text-red-600 dark:text-red-400 text-[13.5px] font-medium mb-2.5">
            <Users className="w-4 h-4 fill-current" />
            <span>Default suitability: {adults} adults</span>
            <Info className="w-3.5 h-3.5 text-slate-400" />
          </div>
        )}

        {/* Bed setup */}
        {beds && (
          <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300 text-[13.5px] mb-4">
            <BedDouble className="w-4 h-4 text-brand-gold-500" />
            <span>{beds}</span>
          </div>
        )}

        {/* Amenities tag (like Bidet) */}
        {bidet && (
          <div className="border border-slate-200 dark:border-brand-emerald-800/50 rounded-lg p-2.5 flex items-center gap-2 mb-5 shadow-sm">
            <Droplets className="w-4 h-4 text-orange-500" />
            <span className="text-sm font-medium text-slate-800 dark:text-slate-200 border-b border-dashed border-slate-400">Handheld bidet spray</span>
          </div>
        )}

        <div className="mt-auto pt-2">
          {/* Pricing area */}
          {discountPercent > 0 && (
            <div className="flex items-center gap-2 mb-1">
              <span className="flex items-center gap-1 bg-red-600 text-white text-[11px] font-bold px-1.5 py-0.5 rounded">
                <Tag className="w-3 h-3 fill-current" /> -{discountPercent}%
              </span>
              <span className="text-sm text-slate-400 line-through decoration-slate-400">${oldPrice?.toLocaleString()}</span>
            </div>
          )}
          
          <div className="flex items-baseline gap-2 mb-4">
            <span className="text-[26px] font-extrabold text-slate-900 dark:text-white tracking-tight">${currentPrice?.toLocaleString() || '—'}</span>
            <span className="text-xs text-slate-500 font-medium flex items-center gap-1">
              standard price <Info className="w-3.5 h-3.5" />
            </span>
          </div>

          <button
            onClick={() => onBook(room)}
            className="w-full py-2.5 rounded-xl bg-brand-emerald-500 hover:bg-brand-emerald-600 dark:bg-brand-gold-500 dark:hover:bg-brand-gold-600 text-white dark:text-brand-emerald-950 text-sm font-bold shadow-md transition cursor-pointer"
          >
            Select Room
          </button>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function HotelDetailPage() {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const checkIn  = searchParams.get('checkIn')  || '';
  const checkOut = searchParams.get('checkOut') || '';
  
  const rawPax = searchParams.get('paxRooms');
  const rawGuests = searchParams.get('guests');
  let paxRooms = [{ adults: 1, children: 0, childrenAges: [] }];
  try {
    if (rawPax) {
      paxRooms = JSON.parse(rawPax);
    } else if (rawGuests) {
      paxRooms = [{ adults: parseInt(rawGuests || '1', 10), children: 0, childrenAges: [] }];
    }
  } catch (e) {
    console.error('Failed to parse paxRooms', e);
  }

  const totalGuests = paxRooms.reduce((acc, r) => acc + r.adults + r.children, 0);
  const totalRooms = paxRooms.length;
  const destName = searchParams.get('destName') || '';

  const [hotel, setHotel] = useState(null);
  const [rooms, setRooms] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeImgIdx, setActiveImgIdx] = useState(0);
  const [showBookModal, setShowBookModal] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    setError(null);

    const payload = {
      guestNationality: 'DZ',
      checkIn,
      checkOut,
      paxRooms: paxRooms.map(r => ({ Adults: r.adults ?? r.Adults, Children: r.children ?? r.Children, ChildrenAges: r.childrenAges ?? r.ChildrenAges ?? [] })),
      filters: { refundable: false, mealType: 'All' },
    };

    getHotelById(id, payload)
      .then(res => {
        if (!res.success) throw new Error(res.message || 'Hotel details not available');
        const data = res.data;
        // API can return hotel info at several shapes
        const hotelData = data?.hotel || data?.hotelDetails || data || {};
        setHotel(hotelData);
        // Rooms can be at several paths
        const roomList =
          data?.rooms ||
          data?.hotel?.rooms ||
          data?.cheapestRooms ||
          hotelData?.rooms ||
          [];
        setRooms(Array.isArray(roomList) ? roomList : []);
      })
      .catch(err => {
        setError(err.message);
      })
      .finally(() => setIsLoading(false));
  }, [id, checkIn, checkOut, rawPax, rawGuests]);

  const hotelImages = hotel?.images?.length
    ? hotel.images
    : PLACEHOLDER_IMAGES.slice(0, 4);

  const tags = [];
  if (hotel?.hotelFilters?.halalFood?.all || hotel?.hotelFilters?.halalFood?.some) tags.push('All Halal Food');
  if (hotel?.hotelFilters?.alcoholFree?.property) tags.push('Alcohol-Free Property');
  if (hotel?.hotelFilters?.pool?.ladiesOnly) tags.push("Women's Pool");
  if (hotel?.hotelFilters?.bidetAmenities?.available) tags.push('Bidet Amenities');
  if (hotel?.hotelFilters?.wellnessSpa?.ladiesOnly) tags.push("Women's Spa");

  const handleBookRoom = (room) => {
    setSelectedRoom(room);
    setShowBookModal(true);
  };

  return (
    <div className="min-h-screen flex flex-col font-sans bg-[#FCFBF9] text-slate-900 dark:bg-[#060b14] dark:text-slate-100 pt-20">
      <Header />

      <div className="max-w-screen-xl mx-auto w-full px-4 sm:px-6 py-6">
        {/* Back button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-1.5 text-sm font-semibold text-brand-emerald-500 dark:text-brand-gold-400 hover:opacity-80 transition mb-6 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to results
        </button>

        {/* Loading */}
        {isLoading && (
          <div className="flex flex-col items-center justify-center py-32">
            <Loader2 className="w-12 h-12 text-brand-gold-500 animate-spin mb-4" />
            <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">Loading hotel details…</p>
          </div>
        )}

        {/* Error */}
        {error && !isLoading && (
          <div className="flex flex-col items-center justify-center py-32 text-center">
            <ShieldAlert className="w-14 h-14 text-brand-gold-500 mb-4" />
            <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200 mb-2">Could not load hotel</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-5 max-w-sm">{error}</p>
            <button onClick={() => navigate(-1)} className="px-5 py-2.5 rounded-xl bg-brand-emerald-500 text-white font-semibold text-sm cursor-pointer">
              Go back
            </button>
          </div>
        )}

        {/* Content */}
        {!isLoading && !error && (
          <div>
            {/* Image gallery */}
            <div className="grid grid-cols-4 grid-rows-2 gap-2 rounded-2xl overflow-hidden h-72 sm:h-96 mb-6">
              {hotelImages.slice(0, 5).map((img, i) => (
                <div
                  key={i}
                  className={`relative overflow-hidden cursor-pointer group ${i === 0 ? 'col-span-2 row-span-2' : ''}`}
                  onClick={() => setActiveImgIdx(i)}
                >
                  <img
                    src={typeof img === 'string' ? img : img?.url || PLACEHOLDER_IMAGES[i % PLACEHOLDER_IMAGES.length]}
                    alt={`Hotel view ${i + 1}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition" />
                </div>
              ))}
            </div>

            {/* Hotel header */}
            <div className="flex flex-col lg:flex-row gap-6 mb-8">
              <div className="flex-1">
                <div className="flex items-center gap-1.5 text-[11px] font-semibold text-brand-gold-600 dark:text-brand-gold-500 uppercase tracking-wider mb-2">
                  <MapPin className="w-3 h-3" />
                  {destName || hotel?.city || 'Unknown location'}
                </div>
                <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white font-serif mb-3 leading-tight">
                  {hotel?.name || `Hotel #${id}`}
                </h1>

                {/* Stars */}
                {(hotel?.starRating || hotel?.stars) > 0 && (
                  <div className="flex items-center gap-1 mb-4">
                    {Array.from({ length: Math.min(5, hotel?.starRating || hotel?.stars || 0) }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                    <span className="text-sm text-slate-500 dark:text-slate-400 ml-1">{hotel?.starRating || hotel?.stars} stars</span>
                  </div>
                )}

                {/* Halal tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {tags.map(tag => (
                    <span key={tag} className="flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full bg-brand-emerald-50 dark:bg-brand-emerald-900/40 text-brand-emerald-700 dark:text-brand-gold-200 border border-brand-emerald-100/40 dark:border-brand-emerald-800/40">
                      <Check className="w-3 h-3" />
                      {tag}
                    </span>
                  ))}
                  {tags.length === 0 && (
                    <span className="flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full bg-brand-emerald-50 dark:bg-brand-emerald-900/40 text-brand-emerald-700 dark:text-brand-gold-200 border border-brand-emerald-100/40">
                      <Check className="w-3 h-3" />
                      Halal Friendly
                    </span>
                  )}
                </div>

                {/* Search summary */}
                <div className="flex flex-wrap gap-4 text-sm text-slate-600 dark:text-slate-400">
                  {checkIn && (
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-4 h-4 text-brand-gold-500" />
                      {checkIn} → {checkOut}
                    </span>
                  )}
                  <span className="flex items-center gap-1.5">
                    <Users className="w-4 h-4 text-brand-gold-500" />
                    {totalRooms} Room{totalRooms > 1 ? 's' : ''}, {totalGuests} Guest{totalGuests !== 1 ? 's' : ''}
                  </span>
                </div>
              </div>

              {/* Review score */}
              {(hotel?.reviewScore || hotel?.rating) > 0 && (
                <div className="flex-shrink-0 flex flex-col items-center justify-center w-28 h-28 rounded-2xl bg-brand-emerald-500 dark:bg-brand-gold-500 text-white dark:text-brand-emerald-950 shadow-lg">
                  <p className="text-3xl font-extrabold">{(hotel?.reviewScore || hotel?.rating || 0).toFixed(1)}</p>
                  <p className="text-xs font-bold uppercase tracking-wider opacity-80">Score</p>
                </div>
              )}
            </div>

            {/* Rooms section */}
            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4 font-serif">Available Rooms</h2>

              {rooms.length === 0 ? (
                <div className="border border-dashed border-slate-200 dark:border-brand-emerald-800/40 rounded-2xl p-10 text-center">
                  <p className="text-slate-500 dark:text-slate-400 text-sm">No room details available for the selected dates.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {rooms.map((room, i) => (
                    <RoomCard 
                      key={room.id || i} 
                      hotelImage={typeof hotelImages[0] === 'string' ? hotelImages[0] : hotelImages[0]?.url}
                      room={{
                        ...room,
                        price: room.lowestPrice || room.price || 0,
                        name: room.name || room.roomName || 'Room',
                      }} 
                      onBook={handleBookRoom} 
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* ── Book confirmation modal ── */}
      <AnimatePresence>
        {showBookModal && selectedRoom && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.95, y: 10 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 10 }}
              className="bg-white dark:bg-[#060b14] rounded-3xl border border-slate-200 dark:border-brand-emerald-800/40 shadow-2xl p-8 max-w-md w-full"
            >
              <div className="flex items-start justify-between mb-5">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white font-serif">Confirm Booking</h3>
                <button onClick={() => setShowBookModal(false)} className="p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-brand-emerald-900/40 cursor-pointer transition">
                  <X className="w-5 h-5 text-slate-500" />
                </button>
              </div>

              <div className="space-y-3 mb-6 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-500 dark:text-slate-400">Hotel</span>
                  <span className="font-semibold text-slate-900 dark:text-white truncate max-w-[180px]">{hotel?.name || `Hotel #${id}`}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500 dark:text-slate-400">Room</span>
                  <span className="font-semibold text-slate-900 dark:text-white">{selectedRoom.name}</span>
                </div>
                {checkIn && (
                  <div className="flex justify-between">
                    <span className="text-slate-500 dark:text-slate-400">Dates</span>
                    <span className="font-semibold text-slate-900 dark:text-white">{checkIn} → {checkOut}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-slate-500 dark:text-slate-400">Guests</span>
                  <span className="font-semibold text-slate-900 dark:text-white">{totalRooms} Room{totalRooms > 1 ? 's' : ''}, {totalGuests} Guest{totalGuests !== 1 ? 's' : ''}</span>
                </div>
                <div className="border-t border-slate-100 dark:border-brand-emerald-900/30 pt-3 flex justify-between text-base font-bold">
                  <span className="text-slate-700 dark:text-slate-300">Total / night</span>
                  <span className="text-brand-emerald-600 dark:text-brand-gold-400">${selectedRoom.price?.toLocaleString() || '—'}</span>
                </div>
              </div>

              <button
                className="w-full py-3 rounded-2xl bg-brand-emerald-500 hover:bg-brand-emerald-600 dark:bg-brand-gold-500 dark:hover:bg-brand-gold-600 text-white dark:text-brand-emerald-950 font-bold text-sm shadow-lg transition cursor-pointer"
              >
                Confirm & Book
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
