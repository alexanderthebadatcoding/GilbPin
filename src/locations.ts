export interface Location {
  lat: number;
  lng: number;
  name: string;
  hint: string;
}

export const LOCATIONS: Location[] = [
  {
    lat: 48.8584,
    lng: 2.2945,
    name: "Eiffel Tower, Paris",
    hint: "Iron lady of the Seine",
  },
  {
    lat: 40.6892,
    lng: -74.0445,
    name: "Statue of Liberty, New York",
    hint: "Lady Liberty stands tall",
  },
  {
    lat: 35.6762,
    lng: 139.6503,
    name: "Shinjuku, Tokyo",
    hint: "Asia's busiest rail hub",
  },
  {
    lat: 51.5007,
    lng: -0.1246,
    name: "Westminster, London",
    hint: "Where Big Ben ticks",
  },
  {
    lat: -33.8568,
    lng: 151.2153,
    name: "Sydney Opera House",
    hint: "Sails on the harbour",
  },
  { lat: 41.9028, lng: 12.4964, name: "Rome, Italy", hint: "Eternal City" },
  {
    lat: 27.1751,
    lng: 78.0421,
    name: "Taj Mahal, Agra",
    hint: "A monument to eternal love",
  },
  {
    lat: -13.1631,
    lng: -72.545,
    name: "Machu Picchu, Peru",
    hint: "Lost city in the clouds",
  },
  {
    lat: 29.9792,
    lng: 31.1342,
    name: "Great Pyramid, Giza",
    hint: "Wonder of the ancient world",
  },
  {
    lat: 37.9715,
    lng: 23.7267,
    name: "Acropolis, Athens",
    hint: "Birthplace of democracy",
  },
  {
    lat: 55.7558,
    lng: 37.6173,
    name: "Red Square, Moscow",
    hint: "Heart of the Russian capital",
  },
  {
    lat: 19.4326,
    lng: -99.1332,
    name: "Zócalo, Mexico City",
    hint: "One of the largest city squares in the world",
  },
  {
    lat: 43.7228,
    lng: 10.4017,
    name: "Pisa, Italy",
    hint: "City of the leaning tower",
  },
  {
    lat: -22.9519,
    lng: -43.2105,
    name: "Christ the Redeemer, Rio",
    hint: "Open arms over the city",
  },
  {
    lat: 52.5163,
    lng: 13.3777,
    name: "Brandenburg Gate, Berlin",
    hint: "Symbol of unity and peace",
  },
  {
    lat: 45.4325,
    lng: 12.3389,
    name: "Venice, Italy",
    hint: "City of canals and gondolas",
  },
  {
    lat: -17.9243,
    lng: 25.8572,
    name: "Victoria Falls, Zimbabwe",
    hint: "The smoke that thunders",
  },
  {
    lat: 30.3285,
    lng: 35.4444,
    name: "Petra, Jordan",
    hint: "Rose-red city carved in rock",
  },
  {
    lat: 25.1972,
    lng: 55.2744,
    name: "Burj Khalifa, Dubai",
    hint: "World's tallest skyscraper",
  },
  {
    lat: -25.9692,
    lng: 32.5732,
    name: "Maputo, Mozambique",
    hint: "Pearl of the Indian Ocean",
  },
  {
    lat: 31.7767,
    lng: 35.2345,
    name: "Old City, Jerusalem",
    hint: "Holy to three faiths",
  },

  // Asia & Oceania
  {
    lat: 22.3193,
    lng: 114.1694,
    name: "Victoria Harbour, Hong Kong",
    hint: "Skyline between two shores",
  },
  {
    lat: 13.4125,
    lng: 103.8667,
    name: "Angkor Wat, Cambodia",
    hint: "Largest religious monument on Earth",
  },
  {
    lat: 27.9881,
    lng: 86.925,
    name: "Everest Base Camp, Nepal",
    hint: "Gateway to the world's roof",
  },
  {
    lat: 1.2839,
    lng: 103.8607,
    name: "Marina Bay Sands, Singapore",
    hint: "The ship in the sky",
  },
  {
    lat: -36.8485,
    lng: 174.7633,
    name: "Auckland, New Zealand",
    hint: "City of Sails",
  },
  {
    lat: -8.5069,
    lng: 115.2625,
    name: "Ubud, Bali",
    hint: "Terraced rice fields and temples",
  },

  // Americas
  {
    lat: 36.1069,
    lng: -112.1129,
    name: "Grand Canyon South Rim",
    hint: "A mile deep, millions of years old",
  },
  {
    lat: -54.8552868,
    lng: -68.5732788,
    name: "Cape Horn, Chile",
    hint: "Where two oceans collide",
  },
  {
    lat: 25.7617,
    lng: -80.1918,
    name: "South Beach, Miami",
    hint: "Art Deco by the Atlantic",
  },
  {
    lat: 48.0090662,
    lng: -91.5335466,
    name: "Boundary Waters, Minnesota",
    hint: "A thousand lakes, zero roads",
  },
  {
    lat: -3.2960867,
    lng: -60.4375037,
    name: "Amazon River, Brazil",
    hint: "Lungs of the planet",
  },

  // Europe
  {
    lat: 64.1466,
    lng: -21.9426,
    name: "Reykjavik, Iceland",
    hint: "Northernmost capital city",
  },
  {
    lat: 43.7384,
    lng: 7.4246,
    name: "Monaco",
    hint: "Smallest country with a Grand Prix",
  },
  {
    lat: 50.0869,
    lng: 14.4208,
    name: "Prague Old Town Square",
    hint: "A medieval clock still ticking",
  },
  {
    lat: 40.4168,
    lng: -3.7038,
    name: "Madrid, Spain",
    hint: "Europe's highest capital",
  },
  {
    lat: 59.334,
    lng: 18.0686,
    name: "Gamla Stan, Stockholm",
    hint: "Old Town on a tiny island",
  },
  {
    lat: 47.5596,
    lng: 7.5886,
    name: "Basel, Switzerland",
    hint: "Where three countries meet",
  },
  // Urban Icons
  {
    lat: 47.6205,
    lng: -122.3493,
    name: "Space Needle, Seattle",
    hint: "Pacific Northwest's pointy landmark",
  },
  {
    lat: 40.758,
    lng: -73.9855,
    name: "Times Square, New York",
    hint: "The crossroads of the world",
  },
  {
    lat: 52.5351,
    lng: 13.3906,
    name: "Berlin Wall Memorial",
    hint: "Scars of a divided city",
  },
  {
    lat: 41.3851,
    lng: 2.1734,
    name: "La Sagrada Família, Barcelona",
    hint: "A church still under construction since 1882",
  },
  {
    lat: 48.8738,
    lng: 2.295,
    name: "Arc de Triomphe, Paris",
    hint: "Twelve avenues, one monument",
  },
  {
    lat: 34.0195,
    lng: -118.4912,
    name: "Santa Monica Pier, LA",
    hint: "Where Route 66 meets the Pacific",
  },
  {
    lat: 37.8199,
    lng: -122.4783,
    name: "Golden Gate Bridge, San Francisco",
    hint: "Fog rolls over burnt orange steel",
  },
  {
    lat: 25.0375,
    lng: 121.5637,
    name: "Taipei 101, Taiwan",
    hint: "Once the world's tallest tower",
  },
  {
    lat: 53.4083,
    lng: -2.9916,
    name: "Albert Dock, Liverpool",
    hint: "Birthplace of the Fab Four",
  },
  {
    lat: 43.6426,
    lng: -79.3871,
    name: "CN Tower, Toronto",
    hint: "Long held the title of world's tallest structure",
  },
  {
    lat: 37.5665,
    lng: 126.978,
    name: "Gyeongbokgung Palace, Seoul",
    hint: "Ancient palace in a modern metropolis",
  },
  {
    lat: -33.8688,
    lng: 151.2093,
    name: "Darling Harbour, Sydney",
    hint: "Where the city meets the water",
  },
  {
    lat: 51.1789,
    lng: -1.8262,
    name: "Stonehenge, England",
    hint: "Prehistoric puzzle on the plains",
  },
  {
    lat: 40.7484,
    lng: -73.9967,
    name: "Empire State Building, New York",
    hint: "King Kong's favourite perch",
  },
  // Movie Locations
  {
    lat: 48.8606,
    lng: 2.3376,
    name: "Louvre, Paris",
    hint: "Da Vinci Code's final revelation",
  },
  {
    lat: 51.5033,
    lng: -0.1195,
    name: "Millennium Bridge, London",
    hint: "Death Eaters destroyed this in Half-Blood Prince",
  },
  {
    lat: 40.6892,
    lng: -74.0445,
    name: "Liberty Island, New York",
    hint: "Climax of Escape from New York",
  },
  {
    lat: 55.9486,
    lng: -3.1999,
    name: "Edinburgh Castle, Scotland",
    hint: "Setting for parts of Outlaw King",
  },
  {
    lat: 37.9715,
    lng: 23.7267,
    name: "Acropolis, Athens",
    hint: "Where Lara Croft hunted artifacts",
  },
  {
    lat: -43.5955,
    lng: 172.5301,
    name: "Christchurch, New Zealand",
    hint: "Gateway to Middle Earth filming country",
  },
  {
    lat: 36.4565,
    lng: -116.8722,
    name: "Death Valley, California",
    hint: "Tatooine in A New Hope",
  },
  {
    lat: 27.1751,
    lng: 78.0421,
    name: "Taj Mahal, Agra",
    hint: "The backdrop of The Best Exotic Marigold Hotel",
  },
  {
    lat: 41.4036,
    lng: 2.1744,
    name: "Park Güell, Barcelona",
    hint: "Featured in Vicky Cristina Barcelona",
  },
  {
    lat: 50.0869,
    lng: 14.4208,
    name: "Prague Old Town",
    hint: "Doubled as Budapest in Mission: Impossible",
  },
  {
    lat: 25.1972,
    lng: 55.2744,
    name: "Burj Khalifa, Dubai",
    hint: "Ethan Hunt scaled this in Ghost Protocol",
  },
  {
    lat: 48.8566,
    lng: 2.3522,
    name: "Pont de Bir-Hakeim, Paris",
    hint: "Inception's folding city scene",
  },
  {
    lat: 38.8895,
    lng: -77.0353,
    name: "Lincoln Memorial, Washington D.C.",
    hint: "National Treasure's underground starting point",
  },
  {
    lat: 51.8418635,
    lng: -1.3614309,
    name: "Blenheim Palace, England",
    hint: "Doubles as Hogwarts exterior in early Potter films",
  },
  {
    lat: 57.3229,
    lng: -4.4244,
    name: "Glen Affric, Scotland",
    hint: "Endor's forest moon in Return of the Jedi",
  },
{
  lat: 46.8182,
  lng: 8.2275,
  name: "Swiss Alps, Switzerland",
  hint: "Where Skywalker trains among ancient snowbound peaks",
},
{
  lat: 35.3606,
  lng: 138.7274,
  name: "Mount Fuji, Japan",
  hint: "A lone sacred mountain watching over a hidden dojo",
},
{
  lat: 69.6492,
  lng: 18.9553,
  name: "Tromsø, Norway",
  hint: "A frozen world where starships might hide in the aurora",
},
{
  lat: -16.5004,
  lng: -68.1193,
  name: "La Paz, Bolivia",
  hint: "A city above the clouds, like a rebel outpost in the sky",
},
{
  lat: 30.3285,
  lng: 35.4444,
  name: "Petra, Jordan",
  hint: "An ancient red stone city carved like a forgotten Jedi archive",
},
{
  lat: -8.3405,
  lng: 115.0920,
  name: "Bali Rice Terraces, Indonesia",
  hint: "Endless green steps that feel like a hidden temple world",
},
{
  lat: 63.1324,
  lng: -19.6156,
  name: "Iceland Highlands",
  hint: "A volcanic wasteland that feels like Mustafar before the fall",
},
{
  lat: -24.6270,
  lng: 134.4970,
  name: "Uluru, Australia",
  hint: "A sacred monolith rising from a desert like an ancient relic",
},
{
  lat: 36.5769,
  lng: 136.6580,
  name: "Kenrokuen Area, Japan",
  hint: "A perfectly balanced garden world worthy of a royal senate",
},
{
  lat: 37.8651,
  lng: -119.5383,
  name: "Yosemite Valley, USA",
  hint: "A canyon of giants where echoes feel like the Force itself",
}
];

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
