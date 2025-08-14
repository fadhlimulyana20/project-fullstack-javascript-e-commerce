// Helper for API calls
const API_URL = '/api/categories';

export async function fetchCategories() {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error('Failed to fetch categories');
  return res.json();
}
