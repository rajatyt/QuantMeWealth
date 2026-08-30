// Base API configuration
// Replace with your backend URL when going dynamic
const API_BASE = import.meta.env.VITE_API_URL || '/api';

export async function fetchJSON(endpoint) {
  const res = await fetch(`${API_BASE}${endpoint}`);
  if (!res.ok) throw new Error(`API error: ${res.status}`);
  return res.json();
}
