import { API_URL, BUILD_TAG } from "./env";

export async function pingBackend() {
  const u = `${API_URL.replace(/\/$/,"")}/health?cb=${BUILD_TAG || Date.now()}`;
  const r = await fetch(u, { credentials: "include" });
  if (!r.ok) throw new Error(`Health failed: ${r.status}`);
  return r.json();
}

export async function getVersion() {
  const u = `${API_URL.replace(/\/$/,"")}/version?cb=${BUILD_TAG || Date.now()}`;
  const r = await fetch(u, { credentials: "include" });
  if (!r.ok) throw new Error(`Version failed: ${r.status}`);
  return r.json();
}
