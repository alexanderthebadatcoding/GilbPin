import { useEffect, useRef, useState } from "react";
import { useGoogleMaps } from "./useGoogleMaps";
import type { Location } from "./locations";

interface Props {
  location: Location;
  noMove?: boolean;
}

export function StreetView({ location, noMove }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const mapsStatus = useGoogleMaps();
  const [status, setStatus] = useState<google.maps.StreetViewStatus | null>(
    null,
  );

  console.log("StreetView render", { mapsStatus, status, location });

  useEffect(() => {
    console.log("StreetView useEffect running", {
      mapsStatus,
      location,
      refCurrent: !!ref.current,
    });
    if (mapsStatus !== "ready" || !ref.current) {
      console.log("StreetView useEffect early return", {
        mapsStatus,
        refCurrent: !!ref.current,
      });
      return;
    }

    console.log("Creating StreetViewService and calling getPanorama");
    const sv = new google.maps.StreetViewService();
    let callbackCalled = false;
    const timeout = setTimeout(() => {
      if (!callbackCalled) {
        console.log("StreetView timeout reached, no callback");
        setStatus(google.maps.StreetViewStatus.UNKNOWN_ERROR);
      }
    }, 5000); // 5 second timeout

    sv.getPanorama(
      { location: { lat: location.lat, lng: location.lng }, radius: 150 },
      (data, panoramaStatus) => {
        console.log(
          "StreetView getPanorama callback called",
          panoramaStatus,
          data,
        );
        callbackCalled = true;
        clearTimeout(timeout);
        setStatus(panoramaStatus);
        if (panoramaStatus === google.maps.StreetViewStatus.OK && ref.current) {
          const initialPov = noMove
            ? { heading: 0, pitch: 0 }
            : { heading: Math.random() * 360, pitch: 0 };
          const pano = new google.maps.StreetViewPanorama(ref.current, {
            position: { lat: location.lat, lng: location.lng },
            pov: initialPov,
            zoom: 1,
            addressControl: false,
            fullscreenControl: false,
            motionTrackingControl: false,
            showRoadLabels: false,
            linksControl: false,
            panControl: false,
            zoomControl: false,
            clickToGo: !noMove,
          });
          if (noMove) {
            let resetting = false;
            pano.addListener("position_changed", () => {
              if (!resetting) {
                resetting = true;
                pano.setPosition({ lat: location.lat, lng: location.lng });
                resetting = false;
              }
            });
            pano.addListener("pov_changed", () => {
              if (!resetting) {
                resetting = true;
                pano.setPov(initialPov);
                resetting = false;
              }
            });
          }
        }
      },
    );

    return () => {
      console.log("StreetView useEffect cleanup");
      clearTimeout(timeout);
    };
  }, [mapsStatus, location, noMove]);

  if (mapsStatus === "error") {
    return (
      <div style={fallbackStyle}>
        <span style={{ fontSize: 32 }}>⚠️</span>
        <p className="mono" style={{ fontSize: 12, color: "#888" }}>
          Google Maps API key not configured
        </p>
      </div>
    );
  }

  // Always render the container div so ref is available
  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      <div ref={ref} style={{ width: "100%", height: "100%" }} />
      {(mapsStatus !== "ready" || status === null) && (
        <div
          style={{
            ...fallbackStyle,
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
          }}
        >
          <span style={{ fontSize: 32 }}>🌍</span>
          <p className="mono" style={{ fontSize: 12, color: "#888" }}>
            Loading Street View…
          </p>
        </div>
      )}
      {status !== null && status !== google.maps.StreetViewStatus.OK && (
        <div
          style={{
            ...fallbackStyle,
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
          }}
        >
          <span style={{ fontSize: 32 }}>🚫</span>
          <p className="mono" style={{ fontSize: 12, color: "#888" }}>
            Street View not available
          </p>
        </div>
      )}
    </div>
  );
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
