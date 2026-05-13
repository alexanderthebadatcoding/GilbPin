import { useEffect, useRef } from "react";
import { useGoogleMaps } from "./useGoogleMaps";
import type { Location } from "./locations";

interface Props {
  location: Location;
  noMove?: boolean;
}

export function StreetView({ location, noMove }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const mapsReady = useGoogleMaps();

  useEffect(() => {
    if (!mapsReady || !ref.current) return;

    const sv = new google.maps.StreetViewService();
    sv.getPanorama(
      { location: { lat: location.lat, lng: location.lng }, radius: 150 },
      (data, status) => {
        if (status === google.maps.StreetViewStatus.OK && ref.current) {
          new google.maps.StreetViewPanorama(ref.current, {
            position: { lat: location.lat, lng: location.lng },
            pov: { heading: Math.random() * 360, pitch: 0 },
            zoom: 1,
            addressControl: false,
            fullscreenControl: false,
            motionTrackingControl: false,
            showRoadLabels: false,
            linksControl: false,
            panControl: false,
            zoomControl: false,
            clickToGo: !noMove, // ← add this
          });
          // ← add this block
          if (noMove) {
            pano.addListener("position_changed", () => {
              pano.setPosition({ lat: location.lat, lng: location.lng });
            });
          }
        }
      },
    );
  }, [mapsReady, location]);

  if (!mapsReady) {
    return (
      <div style={fallbackStyle}>
        <span style={{ fontSize: 32 }}>🌍</span>
        <p className="mono" style={{ fontSize: 12, color: "#888" }}>
          Loading Street View…
        </p>
      </div>
    );
  }

  return <div ref={ref} style={{ width: "100%", height: "100%" }} />;
}

const fallbackStyle: React.CSSProperties = {
  width: "100%",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: 12,
  background: "#1a1a1a",
};
