export const API_URL =
  (typeof import.meta !== "undefined" && import.meta.env?.VITE_API_URL) ||
  (typeof process !== "undefined" && (process.env.NEXT_PUBLIC_API_URL || process.env.REACT_APP_API_URL)) ||
  "";

export const BUILD_TAG =
  (typeof import.meta !== "undefined" && import.meta.env?.APP_BUILD_TAG) ||
  (typeof process !== "undefined" && process.env.APP_BUILD_TAG) ||
  "";

if (!API_URL) console.warn("[SmartFarm Web] API_URL is empty. Set VITE_API_URL / NEXT_PUBLIC_API_URL / REACT_APP_API_URL.");

export default API_URL;