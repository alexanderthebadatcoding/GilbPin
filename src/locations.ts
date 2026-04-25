export interface Location {
  lat: number
  lng: number
  name: string
  hint: string
}

export const LOCATIONS: Location[] = [
  { lat: 48.8584,  lng: 2.2945,    name: 'Eiffel Tower, Paris',         hint: 'Iron lady of the Seine' },
  { lat: 40.6892,  lng: -74.0445,  name: 'Statue of Liberty, New York', hint: 'Lady Liberty stands tall' },
  { lat: 35.6762,  lng: 139.6503,  name: 'Shinjuku, Tokyo',             hint: "Asia's busiest rail hub" },
  { lat: 51.5007,  lng: -0.1246,   name: 'Westminster, London',         hint: 'Where Big Ben ticks' },
  { lat: -33.8568, lng: 151.2153,  name: 'Sydney Opera House',          hint: 'Sails on the harbour' },
  { lat: 41.9028,  lng: 12.4964,   name: 'Rome, Italy',                 hint: 'Eternal City' },
  { lat: 27.1751,  lng: 78.0421,   name: 'Taj Mahal, Agra',            hint: 'A monument to eternal love' },
  { lat: -13.1631, lng: -72.5450,  name: 'Machu Picchu, Peru',         hint: 'Lost city in the clouds' },
  { lat: 29.9792,  lng: 31.1342,   name: 'Great Pyramid, Giza',        hint: 'Wonder of the ancient world' },
  { lat: 37.9715,  lng: 23.7267,   name: 'Acropolis, Athens',          hint: 'Birthplace of democracy' },
]

const SEED = 0xdeadbeef

export function obfuscate(lat: number, lng: number): string {
  const enc = (v: number) => {
    const n = Math.round((v + 90) * 1e5)
    return ((n ^ SEED) >>> 0).toString(16).padStart(8, '0')
  }
  return enc(lat) + enc(lng + 90)
}

export function deobfuscate(str: string): { lat: number; lng: number } | null {
  try {
    if (str.length < 16) return null
    const dec = (h: string) => {
      const n = parseInt(h, 16)
      return ((n ^ SEED) >>> 0) / 1e5 - 90
    }
    const lat = dec(str.slice(0, 8))
    const lng = dec(str.slice(8, 16)) - 90
    if (isNaN(lat) || isNaN(lng) || lat < -90 || lat > 90 || lng < -180 || lng > 180) return null
    return { lat, lng }
  } catch {
    return null
  }
}

/** Parse ?loc=...&hint=... from the current URL. Returns null if absent or invalid. */
export function parsePinFromURL(): (Location & { isCustom: true }) | null {
  const params = new URLSearchParams(window.location.search)
  const loc = params.get('loc')
  if (!loc) return null
  const coords = deobfuscate(loc)
  if (!coords) return null
  const hint = params.get('hint') ?? 'No hint given'
  return { ...coords, name: 'Custom Pin', hint, isCustom: true }
}

export function haversine(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 6371
  const dLat = ((lat2 - lat1) * Math.PI) / 180
  const dLng = ((lng2 - lng1) * Math.PI) / 180
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLng / 2) ** 2
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
}

export function scoreFromDist(km: number): number {
  if (km < 0.5) return 5000
  if (km > 5000) return 0
  return Math.round(5000 * Math.exp(-km / 1000))
}

export function shuffled<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5)
}
