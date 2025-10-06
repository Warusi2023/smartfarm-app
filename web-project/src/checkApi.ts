export const apiUrl =
  import.meta?.env?.VITE_API_URL ||
  process?.env?.NEXT_PUBLIC_API_URL ||
  process?.env?.REACT_APP_API_URL;

if (!apiUrl) {
  // eslint-disable-next-line no-console
  console.warn("[SmartFarm] API URL not set; set VITE_API_URL or NEXT_PUBLIC_API_URL or REACT_APP_API_URL");
}
export default apiUrl;
