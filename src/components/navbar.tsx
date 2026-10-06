import type { MouseEvent } from "react";

type NavbarProps = {
  handleResetToHome: () => void;
  fetchStoriesFromApi: (endpoint: string, categoryTitle: string) => void;
  handleJokesNavClick: (e: MouseEvent<HTMLAnchorElement>) => void;
};

function Navbar({ handleResetToHome, fetchStoriesFromApi, handleJokesNavClick }: NavbarProps) {
  return (
    <header>
      <div className="brand">
        <h1>The Companion</h1>
        <span>by Phoebe</span>
      </div>

      <nav>
        <a href="#" onClick={(e) => { e.preventDefault(); handleResetToHome(); }}>Home</a>
        <a href="#stories" onClick={(e) => { e.preventDefault(); fetchStoriesFromApi("folklore", "Folklore"); }}>Folklore</a>
        <a href="#stories" onClick={(e) => { e.preventDefault(); fetchStoriesFromApi("horror", "Horror"); }}>Horror</a>
        <a href="#stories" onClick={(e) => { e.preventDefault(); fetchStoriesFromApi("romance", "Romance"); }}>Romance</a>
        <a href="#stories" onClick={(e) => { e.preventDefault(); fetchStoriesFromApi("real-life", "Real Life"); }}>Real Life</a>
        <a href="#stories" onClick={(e) => { e.preventDefault(); fetchStoriesFromApi("fashion-beauty", "Fashion & Beauty"); }}>Fashion & Beauty</a>
        <a href="#stories" onClick={(e) => { e.preventDefault(); fetchStoriesFromApi("travel-lifestyle", "Travel & Lifestyle"); }}>Travel & Lifestyle</a>
        <a href="#jokes" onClick={handleJokesNavClick}>Jokes</a>
        <a href="#stories" onClick={(e) => { e.preventDefault(); fetchStoriesFromApi("gossip", "Gossip"); }}>Gossip</a>
      </nav>
    </header>
  );
}

export default Navbar;