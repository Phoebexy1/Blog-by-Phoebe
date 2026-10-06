import { useState, useEffect } from "react";
import "./jokes.css";

function Jokes() {
  // The joke on screen, and whether a new one is loading
  const [joke, setJoke] = useState("Loading a joke...");
  const [jokeLoading, setJokeLoading] = useState(false);

  // Fetch a joke from the API
  const fetchChuckJoke = async () => {
    try {
      setJokeLoading(true);
      const res = await fetch("https://blog-qah4.onrender.com/api/jokes");
      const data = await res.json();
      setJoke(data.value);
    } catch (error) {
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

export default Jokes;