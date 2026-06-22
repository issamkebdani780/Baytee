const BASE_URL = 'http://109.123.250.140:3001/api';

/**
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
