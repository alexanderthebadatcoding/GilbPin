import { useEffect, useRef, useState } from "react";
import L from "leaflet";
import { obfuscate } from "./locations";
import { useGoogleMaps } from "./useGoogleMaps";

interface Props {
  onBack: () => void;
}

type Step = "pick" | "preview" | "share";

export function CreatePin({ onBack }: Props) {
  const mapRef = useRef<HTMLDivElement>(null);
  const leafletRef = useRef<L.Map | null>(null);
  const markerRef = useRef<L.CircleMarker | null>(null);
  const svRef = useRef<HTMLDivElement>(null);
  const svPanoRef = useRef<google.maps.StreetViewPanorama | null>(null);

  const [step, setStep] = useState<Step>("pick");
  const [pinLat, setPinLat] = useState<number | null>(null);
  const [pinLng, setPinLng] = useState<number | null>(null);
  const [hint, setHint] = useState("");
  const [copied, setCopied] = useState(false);
  const [prevMapView, setPrevMapView] = useState<{
    center: L.LatLngExpression;
    zoom: number;
  } | null>(null);

  const mapsReady = useGoogleMaps();

  // Init Leaflet
  useEffect(() => {
    if (!mapRef.current || leafletRef.current) return;
    const map = L.map(mapRef.current, {
      zoomControl: true,
      attributionControl: false,
      maxBounds: [
        [-85.051129, -180],
        [85.051129, 180],
      ],
      maxBoundsViscosity: 1,
    });
    L.tileLayer(
      "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png",
      {
        attribution:
          '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors © <a href="https://carto.com/">CARTO</a>',
        subdomains: "abcd",
        maxZoom: 18,
        noWrap: true,
      },
    ).addTo(map);
    map.setView([20, 0], 2);
    leafletRef.current = map;

    map.on("click", (e: L.LeafletMouseEvent) => {
      if (markerRef.current) map.removeLayer(markerRef.current);
      markerRef.current = L.circleMarker([e.latlng.lat, e.latlng.lng], {
        radius: 10,
        color: "#e24b4a",
        fillColor: "#e24b4a",
        fillOpacity: 0.9,
        weight: 2,
      }).addTo(map);
      setPinLat(e.latlng.lat);
      setPinLng(e.latlng.lng);
    });

    return () => {
      map.remove();
      leafletRef.current = null;
    };
  }, []);

  // Keep Leaflet map size correct after returning from preview
  useEffect(() => {
    if (step === "pick" && leafletRef.current) {
      leafletRef.current.invalidateSize();
    }
  }, [step]);

  // Load Street View preview - disabled for now, keeping map context instead
  useEffect(() => {
    // Map stays in memory but hidden during preview
    // Repin restores the map context
  }, [step, mapsReady, pinLat, pinLng]);

  const shareUrl =
    pinLat !== null && pinLng !== null
      ? `${window.location.origin}${window.location.pathname}?loc=${obfuscate(pinLat, pinLng)}${hint.trim() ? `&hint=${encodeURIComponent(hint.trim())}` : ""}`
      : "";

  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="create-pin-page">
      {/* Header */}
      <header className="header">
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <button className="btn-back" onClick={onBack}>
            ← Back
          </button>
          <span className="mono logo">📍 Create Pin</span>
        </div>
        <div className="step-dots">
          {(["pick", "preview", "share"] as Step[]).map((s, i) => (
            <div
              key={s}
              className={`step-dot ${step === s ? "active" : ""} ${
                (["pick", "preview", "share"] as Step[]).indexOf(step) > i
                  ? "done"
                  : ""
              }`}
            />
          ))}
        </div>
      </header>

      {/* Step: Pick location */}
      {(step === "pick" || step === "preview") && (
        <div className="create-body">
          <div
            className="create-map-wrap"
            style={{ display: step === "pick" ? "block" : "none" }}
          >
            <div ref={mapRef} style={{ width: "100%", height: "100%" }} />
            {step === "pick" && pinLat === null && (
              <div className="map-prompt mono">
                Click anywhere on the map to drop your pin
              </div>
            )}
          </div>
          {step === "preview" && (
            <div
              style={{
                flex: 1,
                background: "#1a1a1a",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div style={{ textAlign: "center" }}>
                {!mapsReady && (
                  <div>
                    <span style={{ fontSize: 28 }}>🌍</span>
                    <div
                      className="mono"
                      style={{ fontSize: 12, color: "#888" }}
                    >
                      Loading Street View…
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
          {step === "pick" && (
            <div className="create-sidebar">
              <div className="sidebar-inner">
                <div className="sidebar-title mono">Drop a pin</div>
                <p className="sidebar-body">
                  Click anywhere on the map to place your mystery location.
                  Friends will see Street View and have to guess where it is.
                </p>

                {pinLat !== null && (
                  <div className="coord-display mono">
                    <div className="coord-row">
                      <span className="coord-label">lat</span>
                      <span className="coord-val">{"█".repeat(8)}</span>
                    </div>
                    <div className="coord-row">
                      <span className="coord-label">lng</span>
                      <span className="coord-val">{"█".repeat(8)}</span>
                    </div>
                    <div className="coord-note">coordinates hidden</div>
                  </div>
                )}

                <div className="sidebar-actions">
                  <button
                    className="btn-primary mono"
                    disabled={pinLat === null}
                    onClick={() => {
                      if (leafletRef.current) {
                        setPrevMapView({
                          center: leafletRef.current.getCenter(),
                          zoom: leafletRef.current.getZoom(),
                        });
                      }
                      setStep("preview");
                    }}
                  >
                    Preview Street View →
                  </button>
                </div>
              </div>
            </div>
          )}
          {step === "preview" && pinLat !== null && pinLng !== null && (
            <div className="create-sidebar">
              <div className="sidebar-inner">
                <div className="sidebar-title mono">Preview</div>
                <p className="sidebar-body">
                  This is what your friends will see. Look good? Add an optional
                  hint, then generate the link.
                </p>

                <label className="hint-label">
                  <span className="hint-label-text">Hint (optional)</span>
                  <input
                    className="hint-input mono"
                    type="text"
                    placeholder="e.g. Famous for its wine..."
                    maxLength={80}
                    value={hint}
                    onChange={(e) => setHint(e.target.value)}
                  />
                </label>

                <div className="sidebar-actions">
                  <button
                    className="btn-secondary"
                    onClick={() => {
                      // Destroy the panorama
                      if (svPanoRef.current) {
                        svPanoRef.current = null;
                      }
                      setStep("pick");
                      setTimeout(() => {
                        if (leafletRef.current) {
                          leafletRef.current.invalidateSize();
                          if (prevMapView) {
                            leafletRef.current.setView(
                              prevMapView.center,
                              prevMapView.zoom,
                              {
                                animate: false,
                              },
                            );
                          }
                        }
                      }, 50);
                    }}
                  >
                    ← Repin
                  </button>
                  <button
                    className="btn-primary mono"
                    onClick={() => setStep("share")}
                  >
                    Get link →
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Step: Share */}
      {step === "share" && (
        <div className="share-screen">
          <div className="share-card">
            <div style={{ fontSize: 48 }}>🔗</div>
            <div className="share-title mono">Your pin is ready</div>
            <p className="share-body">
              Send this link to anyone. They'll see Street View and have to
              guess your exact location. The coordinates are hidden in the URL.
            </p>

            {hint && (
              <div className="share-hint-preview">
                💡 <em>{hint}</em>
              </div>
            )}

            <div
              className="share-url-box mono"
              onClick={handleCopy}
              title="Click to copy"
            >
              <span className="share-url-text">{shareUrl}</span>
              <span className="copy-badge">{copied ? "✓ Copied" : "Copy"}</span>
            </div>

            <div className="share-actions">
              <button
                className="btn-secondary"
                onClick={() => setStep("preview")}
              >
                ← Edit
              </button>
              <button
                className="btn-primary mono"
                onClick={() => {
                  window.open(shareUrl, "_blank");
                }}
              >
                Test it →
              </button>
            </div>

            <button className="btn-text" onClick={onBack}>
              Back to game
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
