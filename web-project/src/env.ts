export const API_URL =
  (typeof import.meta !== "undefined" && import.meta.env?.VITE_API_URL) ||
  process.env.NEXT_PUBLIC_API_URL ||
  process.env.REACT_APP_API_URL ||
  "";

if (!API_URL) {
  // We log but do NOT crash the app
  // eslint-disable-next-line no-console
  console.warn("[SmartFarm Web] API_URL is empty. Set VITE_API_URL or NEXT_PUBLIC_API_URL or REACT_APP_API_URL.");
}

export default API_URL;
