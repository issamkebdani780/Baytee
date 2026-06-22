// In development: Vite proxy forwards /api → http://109.123.250.140:3001/api
// In production:  set VITE_API_URL=https://your-backend-domain.com/api in your hosting env vars
//                 OR configure a reverse proxy / rewrite on the same domain
const BASE_URL = import.meta.env.VITE_API_URL || '/api';

/**
 * 1. GET /api/search?query=<query>
 * Fetch destination and hotel suggestions from the search dropdown API.
 * @param {string} query The query string entered by the user.
 * @returns {Promise<object>} API response containing suggestions.
 */
export async function searchDestinations(query) {
  if (!query || !query.trim()) {
    return { success: true, data: [] };
  }
  const url = `${BASE_URL}/search?query=${encodeURIComponent(query)}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch destinations: ${response.statusText}`);
  }
  return response.json();
}

/**
 * 2. POST /api/search/init
 * Initialize search stream on the backend.
 * @param {object} payload - The search query payload.
 *   Shape: { city?: string, hotel?: string, country?: number, roomsFilters: { guestNationality, checkIn, checkOut, paxRooms, filters } }
 * @returns {Promise<object>} Response containing the sessionId.
 */
export async function initSearch(payload) {
  const url = `${BASE_URL}/search/init`;
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!response.ok) {
    throw new Error(`Failed to initialize search: ${response.statusText}`);
  }
  return response.json();
}

/**
 * 3. GET /api/search/stream/<sessionId>
 * Open an SSE connection to receive hotel chunks for a given session.
 * Returns a native EventSource instance — caller is responsible for closing it.
 * NOTE: Backend uses path param, not query param (confirmed by Express "Cannot GET" error on ?sessionId= format).
 * @param {string} sessionId - The session ID returned by initSearch.
 * @returns {EventSource}
 */
export function openSearchStream(sessionId) {
  const url = `${BASE_URL}/search/stream/${encodeURIComponent(sessionId)}`;
  console.log('[API] Opening SSE stream:', url);
  return new EventSource(url);
}

/**
 * 4. POST /api/search/filter/<sessionId>
 * Apply filters to a running search session.
 * @param {string} sessionId - The active session ID.
 * @param {object} filters - Filter criteria (all optional / commented out by default).
 *   Example: { pool: ["available"], wellnessSpa: ["available"], mealPlan: ["breakfastIncluded"],
 *              propertyType: ["hotel"], starRating: [5] }
 * @returns {Promise<object>} Filtered hotel results.
 */
export async function filterHotels(sessionId, filters = {}) {
  const url = `${BASE_URL}/search/filter/${encodeURIComponent(sessionId)}`;
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(filters),
  });
  if (!response.ok) {
    throw new Error(`Failed to filter hotels: ${response.statusText}`);
  }
  return response.json();
}

/**
 * 5. POST /api/search/hotels/<hotelId>
 * Get detailed availability for a specific hotel by ID.
 * @param {number|string} hotelId - The hotel's numeric ID.
 * @param {object} payload - Search parameters for this specific hotel.
 *   Shape: { guestNationality, checkIn, checkOut, paxRooms, filters: { refundable, noOfRooms, mealType } }
 * @returns {Promise<object>} Hotel detail and room availability.
 */
export async function getHotelById(hotelId, payload) {
  const url = `${BASE_URL}/search/hotels/${encodeURIComponent(hotelId)}`;
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!response.ok) {
    throw new Error(`Failed to fetch hotel by id: ${response.statusText}`);
  }
  return response.json();
}
