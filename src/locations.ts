import locationsData from "./locations.json";

export interface Location {
  lat: number;
  lng: number;
  name: string;
  hint?: string;
}

export const LOCATIONS: Location[] = locationsData;

const SEED = 0xdeadbeef;

export function obfuscate(lat: number, lng: number): string {
  const enc = (v: number) => {
    const n = Math.round((v + 90) * 1e5);
    return ((n ^ SEED) >>> 0).toString(16).padStart(8, "0");
  };
  return enc(lat) + enc(lng + 90);
}

export function deobfuscate(str: string): { lat: number; lng: number } | null {
  try {
    if (str.length < 16) return null;
    const dec = (h: string) => {
      const n = parseInt(h, 16);
      return ((n ^ SEED) >>> 0) / 1e5 - 90;
    };
    const lat = dec(str.slice(0, 8));
    const lng = dec(str.slice(8, 16)) - 90;
    if (
      isNaN(lat) ||
      isNaN(lng) ||
      lat < -90 ||
      lat > 90 ||
      lng < -180 ||
      lng > 180
    )
      return null;
    return { lat, lng };
  } catch {
    return null;
  }
}

/** Parse ?loc=...&hint=... from the current URL. Returns null if absent or invalid. */
export function parsePinFromURL(): (Location & { isCustom: true }) | null {
  const params = new URLSearchParams(window.location.search);
  const loc = params.get("loc");
  if (!loc) return null;
  const coords = deobfuscate(loc);
  if (!coords) return null;
  const hint = params.get("hint") ?? "No hint given";
  return { ...coords, name: "Custom Pin", hint, isCustom: true };
}

export function haversine(
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number,
): number {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

export function scoreFromDist(km: number): number {
  if (km < 0.5) return 5000;
  if (km > 5000) return 0;
  return Math.round(5000 * Math.exp(-km / 1000));
}

export function shuffled<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}
