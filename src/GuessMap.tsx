import { useEffect, useRef } from "react";
import L from "leaflet";

interface Props {
  onGuess: (lat: number, lng: number) => void;
  guessLat: number | null;
  guessLng: number | null;
  revealLat?: number;
  revealLng?: number;
  locked: boolean;
}

export function GuessMap({
  onGuess,
  guessLat,
  guessLng,
  revealLat,
  revealLng,
  locked,
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const guessMarkerRef = useRef<L.CircleMarker | null>(null);
  const correctMarkerRef = useRef<L.CircleMarker | null>(null);
  const lineRef = useRef<L.Polyline | null>(null);

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    const map = L.map(containerRef.current, {
      zoomControl: true,
      attributionControl: false,
      maxBounds: [
        [-85.051129, -180],
        [85.051129, 180],
      ],
    });
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 18,
      noWrap: true,
    }).addTo(map);
    map.setView([20, 0], 2);
    mapRef.current = map;

    map.on("click", (e: L.LeafletMouseEvent) => {
      if (locked) return;
      onGuess(e.latlng.lat, e.latlng.lng);
    });

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, []);

  // Update locked state on cursor
  useEffect(() => {
    if (!mapRef.current) return;
    mapRef.current.getContainer().style.cursor = locked
      ? "default"
      : "crosshair";
  }, [locked]);

  // Draw / update guess marker
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;
    if (guessMarkerRef.current) map.removeLayer(guessMarkerRef.current);
    if (guessLat !== null && guessLng !== null) {
      guessMarkerRef.current = L.circleMarker([guessLat, guessLng], {
        radius: 8,
        color: "#e24b4a",
        fillColor: "#e24b4a",
        fillOpacity: 0.9,
        weight: 2,
      }).addTo(map);
    }
  }, [guessLat, guessLng]);

  // Show result lines when locked
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !locked || revealLat === undefined || revealLng === undefined)
      return;
    if (guessLat === null || guessLng === null) return;

    if (correctMarkerRef.current) map.removeLayer(correctMarkerRef.current);
    if (lineRef.current) map.removeLayer(lineRef.current);

    correctMarkerRef.current = L.circleMarker([revealLat, revealLng], {
      radius: 10,
      color: "#1D9E75",
      fillColor: "#1D9E75",
      fillOpacity: 0.9,
      weight: 2,
    }).addTo(map);

    lineRef.current = L.polyline(
      [
        [guessLat, guessLng],
        [revealLat, revealLng],
      ],
      {
        color: "#666",
        weight: 1.5,
        dashArray: "5,5",
      },
    ).addTo(map);

    map.fitBounds(
      [
        [guessLat, guessLng],
        [revealLat, revealLng],
      ],
      { padding: [40, 40] },
    );
  }, [locked, revealLat, revealLng]);

  // Reset markers between rounds
  useEffect(() => {
    const map = mapRef.current;
    if (!map || locked) return;
    if (guessMarkerRef.current) {
      map.removeLayer(guessMarkerRef.current);
      guessMarkerRef.current = null;
    }
    if (correctMarkerRef.current) {
      map.removeLayer(correctMarkerRef.current);
      correctMarkerRef.current = null;
    }
    if (lineRef.current) {
      map.removeLayer(lineRef.current);
      lineRef.current = null;
    }
    map.setView([20, 0], 2);
  }, [locked]);

  return (
    <div
      ref={containerRef}
      style={{ width: "100%", height: "100%", minHeight: 320 }}
    />
  );
}
