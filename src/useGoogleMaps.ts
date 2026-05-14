import { useEffect, useState } from "react";

const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string;

type Status = "idle" | "loading" | "ready" | "error";

// Module-level singleton — survives StrictMode double-invocation
let status: Status = "idle";
let scriptInjected = false;
const listeners = new Set<(s: Status) => void>();

function notify(s: Status) {
  status = s;
  listeners.forEach((fn) => fn(s));
}

function loadScript() {
  // Check if script already exists in DOM
  const existingScript = document.querySelector(
    'script[src*="maps.googleapis.com"]',
  );
  if (existingScript) {
    console.log("Google Maps script already exists in DOM");
    return;
  }

  if (scriptInjected) return;
  scriptInjected = true;

  if (!API_KEY) {
    console.log("No API key found");
    notify("error");
    return;
  }

  console.log(
    "Loading Google Maps script with key:",
    API_KEY.substring(0, 10) + "...",
  );

  // Use the recommended async bootstrap pattern
  (window as any).__googleMapsCallback = () => {
    console.log("Google Maps script loaded successfully");
    notify("ready");
  };

  const script = document.createElement("script");
  script.src =
    `https://maps.googleapis.com/maps/api/js` +
    `?key=${API_KEY}` +
    `&callback=__googleMapsCallback` +
    `&loading=async`;
  // Do NOT set script.async — the loading=async param handles it
  // and avoids the "loaded directly without loading=async" warning
  script.defer = true;
  script.onerror = (e) => {
    console.log("Google Maps script failed to load", e);
    notify("error");
  };
  document.head.appendChild(script);
}

export function useGoogleMaps(): Status {
  const [currentStatus, setCurrentStatus] = useState(status);

  useEffect(() => {
    // Already ready by the time this effect runs (e.g. StrictMode re-mount)
    if (status !== "idle") {
      setCurrentStatus(status);
      return;
    }

    const handler = (s: Status) => {
      setCurrentStatus(s);
    };
    listeners.add(handler);

    // Start loading if not already started
    if (status === "idle") {
      notify("loading");
      loadScript();
    }

    return () => {
      listeners.delete(handler);
    };
  }, []);

  return currentStatus;
}
