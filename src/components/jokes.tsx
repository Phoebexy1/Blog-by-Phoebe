/*import { useState, useEffect } from "react";
import "./jokes.css";

function Jokes() {
  // The joke on screen, and whether a new one is loading
  const [joke, setJoke] = useState("Loading a joke...");
  const [jokeLoading, setJokeLoading] = useState(false);

  // Pulls the joke text out of the server's reply, whatever the field is called
  const getJokeText = (item: any): string => {
    if (typeof item === "string") return item;
    if (!item || typeof item !== "object") return "";
    if (item.setup && item.punchline) return `${item.setup} ${item.punchline}`;

    const known = item.joke || item.text || item.content || item.value || item.body;
    if (known) return known;

    // A reply wrapped inside another field, like { data: { joke: "..." } }
    if (item.data) return getJokeText(item.data);

    // Fallback: use the longest text field in the reply
    const texts = Object.values(item).filter((v) => typeof v === "string") as string[];
    return texts.sort((a, b) => b.length - a.length)[0] || "";
  };

  const fetchChuckJoke = async () => {
    try {
      setJokeLoading(true);
      const res = await fetch("https://blog-qah4.onrender.com/api/stories/joke");
      if (!res.ok) throw new Error(`Server answered with status ${res.status}`);

      const data = await res.json();
      console.log("Joke from server:", data);

      // If the server sends a list by mistake, take one item from it
      const item = Array.isArray(data) ? data[Math.floor(Math.random() * data.length)] : data;

      const text = getJokeText(item);
      if (!text.trim()) throw new Error("The reply had no joke text I could read");

      setJoke(text);
    } catch (error) {
      console.error("Jokes error:", error);
      setJoke("Couldn't load a joke. Try again in a second!");
    } finally {
      setJokeLoading(false);
    }
  };

  // Initial fetch on mount
  useEffect(() => {
    fetchChuckJoke();
  }, []);

  return (
    <section className="jokes-api-section" id="jokes">
      <div className="jokes-card">
        <div className="jokes-header">
          <span className="jokes-badge">⚡ Quick Laughs</span>
          <h2>The Laugh Corner</h2>
          <p>Need an instant mood booster? Tap below for another joke.</p>
        </div>

        <div className="joke-display-box">
          <p className={jokeLoading ? "fade-loading" : ""}>"{joke}"</p>
        </div>

        <button
          onClick={fetchChuckJoke}
          className="submit-btn joke-btn"
          disabled={jokeLoading}
        >
          {jokeLoading ? "Summoning Joke..." : "Get Another Joke 🔄"}
        </button>
      </div>
    </section>
  );
}

export default Jokes;*/

import { useState, useEffect } from "react";
import "./jokes.css";

const INK = "#1d1330";

// The joker is drawn in code, so there is no image file to load.
// The bottom edge of this drawing is where his elbows rest on the joke box.
function Joker() {
  return (
    <svg viewBox="0 0 200 232" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="">
      <defs>
        <pattern id="joker-harlequin" width="24" height="24" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <rect width="12" height="12" fill="#d62f3a" />
          <rect x="12" width="12" height="12" fill="#2b1a4a" />
          <rect y="12" width="12" height="12" fill="#2b1a4a" />
          <rect x="12" y="12" width="12" height="12" fill="#d62f3a" />
        </pattern>
      </defs>
      <g stroke={INK} strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round">
        {/* hat */}
        <path d="M68 84 C50 40 26 28 10 60 C30 50 54 66 102 74 Z" fill="#d62f3a" />
        <path d="M132 84 C150 40 174 28 190 60 C170 50 146 66 98 74 Z" fill="#2d4fb8" />
        <path d="M84 78 C86 50 96 34 100 18 C104 34 114 50 116 78 Z" fill="#f2b84b" />
        <circle cx="10" cy="64" r="6" fill="#f2b84b" />
        <circle cx="190" cy="64" r="6" fill="#f2b84b" />
        <circle cx="100" cy="14" r="6" fill="#f2b84b" />

        {/* harlequin body */}
        <path d="M54 232 L62 158 Q100 174 138 158 L146 232 Z" fill="url(#joker-harlequin)" />
        <circle cx="100" cy="192" r="4.5" fill="#f2b84b" />
        <circle cx="100" cy="211" r="4.5" fill="#f2b84b" />

        {/* ruff collar */}
        <path d="M54 154 L67 154 L61 174Z" fill="#d62f3a" />
        <path d="M67 154 L80 154 L73 177Z" fill="#2d4fb8" />
        <path d="M80 154 L93 154 L86 180Z" fill="#d62f3a" />
        <path d="M93 154 L107 154 L100 183Z" fill="#2d4fb8" />
        <path d="M107 154 L120 154 L114 180Z" fill="#d62f3a" />
        <path d="M120 154 L133 154 L127 177Z" fill="#2d4fb8" />
        <path d="M133 154 L146 154 L139 174Z" fill="#d62f3a" />
        <g fill="#f2b84b" strokeWidth="1.6">
          <circle cx="61" cy="175" r="3.4" />
          <circle cx="73" cy="178" r="3.4" />
          <circle cx="86" cy="181" r="3.4" />
          <circle cx="100" cy="184" r="3.4" />
          <circle cx="114" cy="181" r="3.4" />
          <circle cx="127" cy="178" r="3.4" />
          <circle cx="139" cy="175" r="3.4" />
        </g>

        {/* arms: elbows rest on the box */}
        <path d="M62 174 L42 224 L70 150" fill="none" strokeWidth="17" />
        <path d="M62 174 L42 224 L70 150" fill="none" stroke="#2d4fb8" strokeWidth="12.5" />
        <path d="M138 174 L158 224 L130 150" fill="none" strokeWidth="17" />
        <path d="M138 174 L158 224 L130 150" fill="none" stroke="#d62f3a" strokeWidth="12.5" />

        {/* head and face paint */}
        <ellipse cx="100" cy="110" rx="35" ry="40" fill="#fff8ee" />
        <path d="M64 88 Q100 72 136 88 L136 100 Q100 84 64 100 Z" fill="#f2b84b" />
        <path d="M84 90 l5 5 -5 5 -5 -5z M100 87 l5 5 -5 5 -5 -5z M116 90 l5 5 -5 5 -5 -5z" fill="#d62f3a" strokeWidth="1.5" />
        <path d="M85 100 L99 115 L85 130 L71 115 Z" fill={INK} />
        <path d="M115 100 L129 115 L115 130 L101 115 Z" fill="#d62f3a" />
        <ellipse cx="85" cy="115" rx="4.2" ry="5" fill="#fff" strokeWidth="0" />
        <circle cx="86" cy="116" r="2.2" fill={INK} strokeWidth="0" />
        <ellipse cx="115" cy="115" rx="4.2" ry="5" fill="#fff" strokeWidth="0" />
        <circle cx="114" cy="116" r="2.2" fill={INK} strokeWidth="0" />
        <path d="M70 101 Q80 92 92 98" fill="none" strokeWidth="3" />
        <path d="M130 101 Q120 92 108 98" fill="none" strokeWidth="3" />
        <circle cx="100" cy="126" r="5.5" fill="#d62f3a" />
        <path d="M66 122 Q60 132 69 136" fill="none" stroke="#d62f3a" strokeWidth="3.5" />
        <path d="M134 122 Q140 132 131 136" fill="none" stroke="#d62f3a" strokeWidth="3.5" />
        <path d="M70 134 Q100 160 130 134 Q100 142 70 134 Z" fill="#fff" strokeWidth="2.2" />
        <path d="M88 137.4 V145 M100 138 V148 M112 137.4 V145" strokeWidth="1.5" fill="none" />

        {/* gloves cupping the chin */}
        <circle cx="71" cy="148" r="8" fill="#fff" />
        <circle cx="129" cy="148" r="8" fill="#fff" />
      </g>
    </svg>
  );
}

// A small playing card that stands on the edge of the joke box
function PlayCard({ rank, suit, red, className }: { rank: string; suit: string; red?: boolean; className: string }) {
  return (
    <div className={`play-card ${red ? "is-red" : ""} ${className}`} aria-hidden="true">
      <span className="pc-rank">
        {rank}
        <br />
        {suit}
      </span>
      <span className="pc-pip">{suit}</span>
    </div>
  );
}

// Wacky doodles scattered around the edges of the joke box
function Doodles() {
  const confetti = [
    { left: "27%", top: "30%", bg: "#f9a8b8", rot: 25, round: false },
    { left: "36%", top: "9px", bg: "#fbbf77", rot: 0, round: true },
    { left: "58%", top: "10px", bg: "#c4b5fd", rot: 40, round: false },
    { left: "71%", top: "22%", bg: "#86d6c0", rot: 0, round: true },
    { left: "80%", bottom: "30px", bg: "#f9a8b8", rot: 15, round: true },
    { left: "14%", bottom: "26px", bg: "#fbbf77", rot: 30, round: false },
  ];

  return (
    <div className="doodles" aria-hidden="true">
      {/* sparkles */}
      <svg className="dd dd-star1" viewBox="0 0 24 24">
        <path d="M12 0 C13 8 16 11 24 12 C16 13 13 16 12 24 C11 16 8 13 0 12 C8 11 11 8 12 0 Z" fill="#fbbf77" stroke="none" />
      </svg>
      <svg className="dd dd-star2" viewBox="0 0 24 24">
        <path d="M12 0 C13 8 16 11 24 12 C16 13 13 16 12 24 C11 16 8 13 0 12 C8 11 11 8 12 0 Z" fill="#f9a8b8" stroke="none" />
      </svg>

      {/* squiggle */}
      <svg className="dd dd-squig" viewBox="0 0 80 20">
        <path d="M2 12 Q12 0 22 10 T42 10 T62 10 T78 8" fill="none" stroke="#f9a8b8" strokeWidth="4" strokeLinecap="round" />
      </svg>

      {/* spiral */}
      <svg className="dd dd-spiral" viewBox="0 0 50 50">
        <path d="M25 25 C25 22 29 22 29 26 C29 32 20 32 20 25 C20 17 33 16 34 27 C35 38 18 40 15 27 C12 14 30 8 38 20" fill="none" stroke="#86d6c0" strokeWidth="3.5" strokeLinecap="round" />
      </svg>

      {/* lightning bolt */}
      <svg className="dd dd-bolt" viewBox="0 0 24 32">
        <path d="M14 1 L2 18 H11 L8 31 L22 12 H13 Z" fill="#c4b5fd" stroke="none" />
      </svg>

      {/* zigzag */}
      <svg className="dd dd-zig" viewBox="0 0 80 16">
        <path d="M2 12 L12 4 L22 12 L32 4 L42 12 L52 4 L62 12 L72 4 L78 8" fill="none" stroke="#e5e7eb" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>

      <span className="dd dd-ha">HA HA!</span>
      <span className="dd dd-what">?!</span>

      {/* confetti bits */}
      {confetti.map((c, i) => (
        <span
          key={i}
          className="dd dd-conf"
          style={{
            left: c.left,
            top: c.top,
            bottom: (c as any).bottom,
            width: 11,
            height: 11,
            background: c.bg,
            borderRadius: c.round ? "50%" : 2,
            transform: `rotate(${c.rot}deg)`,
          }}
        />
      ))}
    </div>
  );
}

function Jokes() {
  // The joke on screen, and whether a new one is loading
  const [joke, setJoke] = useState("Loading a joke...");
  const [jokeLoading, setJokeLoading] = useState(false);
  // Counts successful jokes so the joker can laugh each time a new one arrives
  const [laughs, setLaughs] = useState(0);

  // Pulls the joke text out of the server's reply, whatever the field is called
  const getJokeText = (item: any): string => {
    if (typeof item === "string") return item;
    if (!item || typeof item !== "object") return "";
    if (item.setup && item.punchline) return `${item.setup} ${item.punchline}`;

    const known = item.joke || item.text || item.content || item.value || item.body;
    if (known) return known;

    // A reply wrapped inside another field, like { data: { joke: "..." } }
    if (item.data) return getJokeText(item.data);

    // Fallback: use the longest text field in the reply
    const texts = Object.values(item).filter((v) => typeof v === "string") as string[];
    return texts.sort((a, b) => b.length - a.length)[0] || "";
  };

  const fetchChuckJoke = async () => {
    try {
      setJokeLoading(true);
      const res = await fetch("https://blog-qah4.onrender.com/api/stories/joke");
      if (!res.ok) throw new Error(`Server answered with status ${res.status}`);

      const data = await res.json();
      console.log("Joke from server:", data);

      // If the server sends a list by mistake, take one item from it
      const item = Array.isArray(data) ? data[Math.floor(Math.random() * data.length)] : data;

      const text = getJokeText(item);
      if (!text.trim()) throw new Error("The reply had no joke text I could read");

      setJoke(text);
      setLaughs((n) => n + 1);
    } catch (error) {
      console.error("Jokes error:", error);
      setJoke("Couldn't load a joke. Try again in a second!");
    } finally {
      setJokeLoading(false);
    }
  };

  // Initial fetch on mount
  useEffect(() => {
    fetchChuckJoke();
  }, []);

  return (
    <section className="jokes-api-section" id="jokes">
      <div className="jokes-card">
        {/* Big faded suits in the corners fill the empty sides */}
        <span className="suit suit-tl red" aria-hidden="true">♦</span>
        <span className="suit suit-tr" aria-hidden="true">♣</span>
        <span className="suit suit-bl" aria-hidden="true">♠</span>
        <span className="suit suit-br red" aria-hidden="true">♥</span>

        <div className="jokes-header">
          <span className="jokes-badge">⚡ Quick Laughs</span>
          <h2>The Laugh Corner</h2>
          <p>Need an instant mood booster? Tap below for another joke.</p>
        </div>

        {/* The stage holds the joke box, the joker leaning on it, and the cards */}
        <div className="joke-stage">
          <PlayCard rank="A" suit="♠" className="pc-l1" />
          <PlayCard rank="K" suit="♦" red className="pc-l2" />

          <div
            key={laughs}
            className={`joker${laughs > 0 ? " joker-laugh" : ""}`}
            aria-hidden="true"
          >
            <Joker />
          </div>

          <PlayCard rank="Q" suit="♥" red className="pc-r1" />
          <PlayCard rank="J" suit="♣" className="pc-r2" />

          <div className="joke-display-box">
            <Doodles />
            <p className={jokeLoading ? "fade-loading" : ""}>{joke}</p>
          </div>
        </div>

        <button
          onClick={fetchChuckJoke}
          className="submit-btn joke-btn"
          disabled={jokeLoading}
        >
          {jokeLoading ? "Summoning Joke..." : "Get Another Joke 🔄"}
        </button>
      </div>
    </section>
  );
}

export default Jokes;