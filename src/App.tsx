import { useState, useCallback, useEffect } from "react";
import { StreetView } from "./StreetView";
import { GuessMap } from "./GuessMap";
import { CreatePin } from "./CreatePin";
import {
  LOCATIONS,
  obfuscate,
  haversine,
  scoreFromDist,
  shuffled,
  parsePinFromURL,
  type Location,
} from "./locations";
import "./App.css";

const ROUNDS = 5;

type Phase = "guessing" | "result" | "final";
type AppMode = "home" | "play" | "play-custom" | "create";

function pickRounds(): Location[] {
  return shuffled(LOCATIONS).slice(0, ROUNDS);
}

function countryCodeToFlag(countryCode: string): string | null {
  const normalized = countryCode.trim().toUpperCase();
  if (/^[A-Z]{2}$/.test(normalized)) {
    return String.fromCodePoint(
      ...[...normalized].map((char) => 0x1f1e6 + char.charCodeAt(0) - 65),
    );
  }

  const fallback: Record<string, string> = {
    "UNITED STATES": "US",
    "UNIT STATES": "US",
    USA: "US",
    "NEW ZEALAND": "NZ",
    "UNITED KINGDOM": "GB",
    "SOUTH KOREA": "KR",
    "NORTH KOREA": "KP",
    RUSSIA: "RU",
    CHINA: "CN",
    croatia: "HR",
  };

  const mapped = fallback[normalized];
  return mapped ? countryCodeToFlag(mapped) : null;
}

// ─── Home screen ──────────────────────────────────────────────────────────────
function HomeScreen({
  onPlay,
  onCreate,
  onPlayCustom,
}: {
  onPlay: () => void;
  onCreate: () => void;
  onPlayCustom: (loc: Location & { isCustom: true }) => void;
}) {
  const customPin = parsePinFromURL();

  return (
    <div className="home-screen">
      <div className="home-card">
        <div className="home-logo mono">📍 GilbPin</div>
        <p className="home-tagline">Guess where in the world it is.</p>

        {customPin && (
          <div className="custom-pin-banner">
            <span style={{ fontSize: 24 }}>🎯</span>
            <div>
              <div
                className="mono"
                style={{ fontSize: 18, color: "var(--text)" }}
              >
                Someone challenged you!
              </div>
              {customPin.hint !== "No hint given" && (
                <div
                  style={{
                    fontSize: 13,
                    color: "var(--text-muted)",
                    marginTop: 2,
                  }}
                >
                  Hint: <em>{customPin.hint}</em>
                </div>
              )}
            </div>
            <button
              className="btn-accent mono"
              onClick={() => onPlayCustom(customPin)}
            >
              Accept →
            </button>
          </div>
        )}

        <div className="home-actions">
          <button className="btn-primary mono home-btn" onClick={onPlay}>
            Play random game
          </button>
          <button className="btn-secondary home-btn" onClick={onCreate}>
            📍 Create a pin
          </button>
        </div>

        <div className="home-howto">
          <div className="howto-row">
            <span className="howto-num mono">01</span>
            <span>Look around in Street View</span>
          </div>
          <div className="howto-row">
            <span className="howto-num mono">02</span>
            <span>Drop a pin on the world map</span>
          </div>
          <div className="howto-row">
            <span className="howto-num mono">03</span>
            <span>Score up to 5,000 per round</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Play screen ──────────────────────────────────────────────────────────────
function PlayScreen({
  locations,
  isCustom,
  onHome,
}: {
  locations: Location[];
  isCustom: boolean;
  onHome: () => void;
}) {
  const totalRounds = locations.length;
  const [round, setRound] = useState(0);
  const [totalScore, setTotalScore] = useState(0);
  const [phase, setPhase] = useState<Phase>("guessing");
  const [guessLat, setGuessLat] = useState<number | null>(null);
  const [guessLng, setGuessLng] = useState<number | null>(null);
  const [roundScore, setRoundScore] = useState(0);
  const [roundDist, setRoundDist] = useState(0);
  const [hintVisible, setHintVisible] = useState(false);

  const loc = locations[round];
  const encodedLoc = obfuscate(loc.lat, loc.lng);

  const handleGuess = useCallback(
    (lat: number, lng: number) => {
      if (phase !== "guessing") return;
      setGuessLat(lat);
      setGuessLng(lng);
    },
    [phase],
  );

  const handleSubmit = () => {
    if (guessLat === null || guessLng === null) return;
    const dist = haversine(guessLat, guessLng, loc.lat, loc.lng);
    const pts = scoreFromDist(dist);
    setRoundDist(dist);
    setRoundScore(pts);
    setTotalScore((s) => s + pts);
    setPhase(round + 1 >= totalRounds ? "final" : "result");
  };

  const handleNext = () => {
    setRound((r) => r + 1);
    setPhase("guessing");
    setGuessLat(null);
    setGuessLng(null);
    setHintVisible(false);
  };

  const distLabel =
    roundDist < 1.60934
      ? `${roundDist.toFixed(2)} km (${Math.round(roundDist * 1093.61).toLocaleString()} yd)`
      : `${Math.round(roundDist).toLocaleString()} km (${Math.round(roundDist * 0.621371).toLocaleString()} mi)`;

  const emoji =
    roundScore >= 4000
      ? "🎉"
      : roundScore >= 2000
        ? "🎯"
        : roundScore >= 500
          ? "😅"
          : "😬";

  return (
    <div className="app">
      {/* Header */}
      <header className="header">
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <button className="btn-back" onClick={onHome}>
            ← Home
          </button>
          <span className="mono logo">
            {isCustom ? "🎯 Challenge" : "▶ GilbPin"}
          </span>
        </div>
        <div className="stats">
          {!isCustom && (
            <div className="stat">
              <span className="stat-label">Round</span>
              <span className="stat-val mono">
                {round + 1} / {totalRounds}
              </span>
            </div>
          )}
          <div className="stat">
            <span className="stat-label">Score</span>
            <span className="stat-val mono">{totalScore.toLocaleString()}</span>
          </div>
        </div>
      </header>

      {hintVisible && <div className="hint-bar">💡 {loc.hint}</div>}

      <main className="main">
        {/* Street View */}
        <div className="sv-panel">
          <StreetView key={`sv-${round}`} location={loc} />

          {(phase === "result" || phase === "final") && (
            <div className="result-overlay">
              <div className="result-emoji">{emoji}</div>
              <div className="result-title mono">
                {roundScore >= 4000
                  ? "Incredible!"
                  : roundScore >= 2000
                    ? "Not bad!"
                    : roundScore >= 500
                      ? "Close-ish"
                      : "Miles off!"}
              </div>
              <div className="result-dist">{distLabel} away</div>
              <div className="result-pts mono">
                +{roundScore.toLocaleString()}
              </div>
              <div className="result-place">
                {countryCodeToFlag(loc.name)
                  ? `${countryCodeToFlag(loc.name)} ${loc.name}`
                  : loc.name}
              </div>
              {phase === "result" ? (
                <button className="btn-primary mono" onClick={handleNext}>
                  Next round →
                </button>
              ) : (
                <div className="final-block">
                  <div className="final-label">Final Score</div>
                  <div className="final-score mono">
                    {totalScore.toLocaleString()}
                  </div>
                  <div className="final-sub">
                    out of {(totalRounds * 5000).toLocaleString()} possible
                  </div>
                  <button className="btn-primary mono" onClick={onHome}>
                    Back to home
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Map */}
        <div className="map-panel">
          <div className="map-container">
            <GuessMap
              key={`map-${round}`}
              onGuess={handleGuess}
              guessLat={guessLat}
              guessLng={guessLng}
              revealLat={phase !== "guessing" ? loc.lat : undefined}
              revealLng={phase !== "guessing" ? loc.lng : undefined}
              locked={phase !== "guessing"}
            />
          </div>
          <div className="controls">
            {phase === "guessing" && (
              <>
                <button
                  className="btn-secondary"
                  onClick={() => setHintVisible(true)}
                  disabled={hintVisible}
                >
                  Hint ?
                </button>
                <button
                  className="btn-primary mono"
                  onClick={handleSubmit}
                  disabled={guessLat === null}
                >
                  Place Guess
                </button>
              </>
            )}
          </div>
        </div>
      </main>

      <footer className="url-bar">
        <span className="mono url-text">
          gilbpin.vercel.app/?loc={encodedLoc}
        </span>
      </footer>
    </div>
  );
}

// ─── Root ─────────────────────────────────────────────────────────────────────
export default function App() {
  const [mode, setMode] = useState<AppMode>("home");
  const [playLocations, setPlayLocations] = useState<Location[]>(() =>
    pickRounds(),
  );
  const [isCustomPlay, setIsCustomPlay] = useState(false);

  // Auto-launch custom pin if URL has ?loc=
  useEffect(() => {
    const pin = parsePinFromURL();
    if (pin) setMode("home"); // show home with the challenge banner
  }, []);

  const handlePlay = () => {
    setPlayLocations(pickRounds());
    setIsCustomPlay(false);
    setMode("play");
  };

  const handlePlayCustom = (loc: Location & { isCustom: true }) => {
    setPlayLocations([loc]);
    setIsCustomPlay(true);
    setMode("play-custom");
  };

  if (mode === "create") {
    return <CreatePin onBack={() => setMode("home")} />;
  }

  if (mode === "play" || mode === "play-custom") {
    return (
      <PlayScreen
        locations={playLocations}
        isCustom={isCustomPlay}
        onHome={() => setMode("home")}
      />
    );
  }

  return (
    <HomeScreen
      onPlay={handlePlay}
      onCreate={() => setMode("create")}
      onPlayCustom={handlePlayCustom}
    />
  );
}
