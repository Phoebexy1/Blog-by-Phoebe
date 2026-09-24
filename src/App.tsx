import { useState, useEffect, useRef } from "react";
import "./App.css";
import StoryCard from "./components/storycard";

const localStories = [
  {
    id: 1,
    genre: "Horror",
    heading: "Spooky Midnight",
    date: "September 21, 2026",
    readTime: "6 min read",
    title: "Midnight Express 2: Haunted Bookstores",
    preview: "When the clock struck 3 a.m., the dead abound.",
    content: "When the clock struck 3 a.m., the dead abound. The old wooden floorboards of the bookstore groaned under unseen weight. Shelves stretched endlessly into the shadows, and dust motes danced in a chilling, unnatural draft. As I reached for the spine of a leather-bound volume, a cold whisper brushed against my ear: 'We have been waiting for you.'",
  },
  {
    id: 2,
    genre: "Comedy",
    heading: "Just My Luck",
    date: "September 20, 2026",
    readTime: "4 min read",
    title: "The Day Everything Went Wrong",
    preview: "It started with a missed bus and somehow got much worse.",
    content: "It started with a missed bus and somehow got much worse. I spilled my entire morning coffee down my white shirt, locked my keys inside the apartment, and ended up stepping directly into a fresh, bottomless puddle of mystery mud. At that point, I just had to laugh and accept that the universe was running a simulation entirely at my expense.",
  },
  {
    id: 3,
    genre: "Real Life",
    heading: "Bus Chronicles",
    date: "September 19, 2026",
    readTime: "5 min read",
    title: "That One Bus Ride",
    preview: "There are some journeys you never forget.",
    content: "There are some journeys you never forget. The 8:15 evening bus was packed with tired commuters, city hums, and the soft glow of smartphone screens. Across the aisle, an elderly man softly hummed a tune from decades past, instantly reminding everyone on board of the quiet beauty hiding in everyday routines.",
  },
  {
    id: 4,
    genre: "Romance",
    heading: "Late Night Musings",
    date: "September 18, 2026",
    readTime: "7 min read",
    title: "Maybe It Was Never That Deep",
    preview: "Sometimes one conversation leaves you thinking for days.",
    content: "Sometimes one conversation leaves you thinking for days. Under the amber streetlights, we talked about everything and nothing—our favorite childhood memories, unfulfilled dreams, and why we always look at the stars when we're nervous. It wasn't a grand confession, but it changed the way the world looked.",
  },
  {
    id: 5,
    genre: "Folklore",
    heading: "Old Stories",
    date: "September 17, 2026",
    readTime: "6 min read",
    title: "The Story Grandpa Always Told",
    preview: "Some stories survive because nobody ever stops telling them.",
    content: "Some stories survive because nobody ever stops telling them. Grandpa used to gather us by the fireplace and speak of the ancient guardian tree at the edge of the village—a tree that supposedly whispered secrets to those who listened with a pure heart. Years later, standing beneath its boughs, I swear I heard it call my name.",
  },
  {
    id: 6,
    genre: "Funny",
    heading: "Giggles",
    date: "September 16, 2026",
    readTime: "3 min read",
    title: "Things That Should Not Be This Funny",
    preview: "You probably shouldn't laugh, but here we are.",
    content: "You probably shouldn't laugh, but here we are. Witnessing a fully grown adult attempt to catch a runaway toaster pastry in mid-air with the grace of a dramatic ballet dancer is something that stays etched in your memory forever. Zero regrets.",
  },
  {
    id: 7,
    genre: "Community",
    heading: "The Companion",
    date: "September 15, 2026",
    readTime: "5 min read",
    title: "Stories From People Like Us",
    preview: "Different people, different lives, surprisingly similar experiences.",
    content: "Different people, different lives, surprisingly similar experiences. When we opened up the community circle last night, it was amazing to see how many of us share the exact same late-night fears, hopes, and coffee addictions. We are truly never as alone as we think.",
  },
  {
    id: 8,
    genre: "Mystery",
    heading: "After Midnight",
    date: "September 14, 2026",
    readTime: "8 min read",
    title: "The Message Nobody Sent",
    preview: "The phone rang once. The message appeared twice.",
    content: "The phone rang once. The message appeared twice. It was a string of coordinates leading to an abandoned pier across town. I hadn't given my number to anyone new, yet there it sat on my screen glowing in the dark, daring me to go find out who was on the other end.",
  },
  {
    id: 9,
    genre: "Random",
    heading: "One Story",
    date: "September 13, 2026",
    readTime: "4 min read",
    title: "A little bit of everything",
    preview: "Because apparently one story was never enough.",
    content: "Because apparently one story was never enough. This is the wildcard entry where logic takes a backseat and pure spontaneity drives the narrative. Expect twists, turns, and absolute cozy chaos.",
  },
];

const featuredItems = [
  {
    label: "Coming Soon",
    title: "Stash by Phoebeee is coming soon!",
    text: "Essentials every 9–5er needs, available at the snap of their fingers.",
  },
  {
    label: "Travel Bee",
    title: "Travel with Phoebee — First Edition",
    text: "Pack your bags and come see the world with me! Our exclusive curated group getaways are launching next month.",
  },
  {
    label: "Community",
    title: "Join The Companion Book Club",
    text: "Monthly cozy reads, juicy discussions and slumber parties with Phoebe and friends.",
  },
];

function App() {
  const [exploreOpen, setExploreOpen] = useState(false);
  const [currentAdIndex, setCurrentAdIndex] = useState(0);

  // Stories State
  const [stories, setStories] = useState(localStories);
  const [currentCategory, setCurrentCategory] = useState("Latest Stories");
  const [storiesLoading, setStoriesLoading] = useState(false);
  const [selectedStory, setSelectedStory] = useState<any>(null);
  const [isWidescreenModal, setIsWidescreenModal] = useState(false);
  const storiesSectionRef = useRef<HTMLElement>(null);

  // Chuck Norris API Joke State
  const [joke, setJoke] = useState("Loading a legendary Chuck Norris fact...");
  const [jokeLoading, setJokeLoading] = useState(false);
  const jokesCardRef = useRef<HTMLDivElement>(null);

  // Reader Feedback / Gossip Board State
  const [readerName, setReaderName] = useState("");
  const [readerCategory, setReaderCategory] = useState("Story Feedback");
  const [readerMessage, setReaderMessage] = useState("");
  const [submissions, setSubmissions] = useState([
    { name: "Anonymous Reader", category: "Juicy Gossip", text: "I heard a certain influencer has been dumped by her boyfriend..." },
    { name: "Mimi", category: "Story Feedback", text: "Very pretty interface! Please post more pieces." }
  ]);

  // Fetch Stories by Category from API, mapping them securely to their correct genre identity
  const fetchStoriesFromApi = async (endpoint: string, categoryTitle: string) => {
    try {
      setStoriesLoading(true);
      setCurrentCategory(categoryTitle);
      
      const res = await fetch(`https://blog-qah4.onrender.com/api/stories/${endpoint}`);
      if (!res.ok) throw new Error("Failed to fetch stories");
      
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) {
        // Map API stories so each retains or adopts the exact genre tag matching its category type
        const mappedData = data.map((story, idx) => {
          // If the API story already has a genre, respect it; otherwise map it to the requested category
          const assignedGenre = story.genre || categoryTitle;
          return {
            ...story,
            id: story.id || idx + 1,
            genre: assignedGenre,
            heading: story.heading || story.title || categoryTitle,
            preview: story.preview || story.snippet || story.content?.slice(0, 80) + "..." || "Click to read full story..."
          };
        });
        setStories(mappedData);
      } else {
        // Fallback to local items matching that specific genre so design styling is preserved
        const filtered = localStories.filter(s => s.genre.toLowerCase() === categoryTitle.toLowerCase());
        setStories(filtered.length > 0 ? filtered : localStories.filter(s => s.genre.toLowerCase() === "horror"));
      }
    } catch (error) {
      const filtered = localStories.filter(s => s.genre.toLowerCase() === categoryTitle.toLowerCase());
      setStories(filtered.length > 0 ? filtered : localStories);
    } finally {
      setStoriesLoading(false);
      if (storiesSectionRef.current) {
        storiesSectionRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

  // Reset to original home mood cards
  const handleResetToHome = () => {
    setStories(localStories);
    setCurrentCategory("Latest Stories");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Fetch Chuck Norris Joke from API
  const fetchChuckJoke = async () => {
    try {
      setJokeLoading(true);
      const res = await fetch("https://api.chucknorris.io/jokes/random");
      const data = await res.json();
      setJoke(data.value);
    } catch (error) {
      setJoke("Chuck Norris broke the API. Try again in a second!");
    } finally {
      setJokeLoading(false);
    }
  };

  // Initial fetch on mount
  useEffect(() => {
    fetchChuckJoke();
  }, []);

  // Auto-slide effect for promotional ad banner
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentAdIndex((prevIndex) => (prevIndex + 1) % featuredItems.length);
    }, 4500);

    return () => clearInterval(timer);
  }, []);

  // Handle Jump to Jokes Section accurately
  const handleJokesNavClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setExploreOpen(false);
    if (jokesCardRef.current) {
      jokesCardRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Handle new feedback submission
  const handleSubmission = (e: React.FormEvent) => {
    e.preventDefault();
    if (!readerMessage.trim()) return;

    const newEntry = {
      name: readerName.trim() || "Anonymous Reader",
      category: readerCategory,
      text: readerMessage.trim()
    };

    setSubmissions([newEntry, ...submissions]);
    setReaderMessage("");
    setReaderName("");
  };     

 /* const handleSubmission = async (e: React.FormEvent) => {
   e.preventDefault();

   if (!readerMessage.trim()) return;

   const newEntry = {
    name: readerName.trim() || "Anonymous Reader",
    category: readerCategory,
    content: readerMessage.trim()
   };

   try {
     const res = await fetch("https://blog-qah4.onrender.com/api/feedbacks/", {
       method: "POST",
       headers: {
        "Content-Type": "application/json"
       },
       body: JSON.stringify(newEntry)
     });

     if (!res.ok) {
       throw new Error("Failed to submit feedback");
     }

     const savedEntry = await res.json();

     setSubmissions([savedEntry, ...submissions]);

     setReaderMessage("");
     setReaderName("");
   } catch (error) {
     console.error("Error submitting feedback:", error);
   }
 };   */

  return (
    <div>
      {/* Sticky Header */}
      <header>
        <div className="brand">
          <h1>The Companion</h1>
          <span>by Phoebe</span>
        </div>

        <nav>
          <a href="#" onClick={(e) => { e.preventDefault(); handleResetToHome(); }}>Home</a>

          <div className="stories">
            <a href="#">Stories ▾</a>
            <div className="dropdown">
              <a href="#stories" onClick={(e) => { e.preventDefault(); fetchStoriesFromApi("folklore", "Folklore"); }}>Folklore</a>
              <a href="#stories" onClick={(e) => { e.preventDefault(); fetchStoriesFromApi("horror", "Horror"); }}>Horror</a>
              <a href="#stories" onClick={(e) => { e.preventDefault(); fetchStoriesFromApi("romance", "Romance"); }}>Romance</a>
              <a href="#stories" onClick={(e) => { e.preventDefault(); fetchStoriesFromApi("comedy", "Comedy"); }}>Comedy</a>
              <a href="#stories" onClick={(e) => { e.preventDefault(); fetchStoriesFromApi("real-life", "Real Life"); }}>Real Life</a>
              <a href="#jokes" onClick={handleJokesNavClick}>Jokes</a>
            </div>
          </div>

          <details 
            className="explore" 
            open={exploreOpen} 
            onToggle={(e) => setExploreOpen(e.currentTarget.open)}
          >
            <summary onClick={(e) => {
              e.preventDefault();
              setExploreOpen(!exploreOpen);
            }}>
              ☰ Explore
            </summary>
            <div className="button-dropdown">
              <a href="#">Fashion & Beauty</a>
              <a href="#">Travel & Lifestyle</a>
              <a href="#jokes" onClick={handleJokesNavClick}>Jokes</a>
              <a href="#">Gossip</a>
            </div>
          </details>
        </nav>
      </header>

      <main>
        <section>
          <h2><b>Welcome to Your Cozy Corner of the Internet.</b></h2>
          <h3>Stories, Gossip, Laughter and Late Night Musings.</h3>
          <p>Grab a seat, it's about to be a fun ride.</p>
          <p>Curated with love by Phoebe.</p>
        </section>

        {/* Auto-sliding Ad Carousel Wrapper */}
        <div className="carousel-banner-wrapper">
          <div 
            className="Carousel" 
            style={{ transform: `translateX(-${currentAdIndex * 100}%)` }}
          >
            {featuredItems.map((item, index) => (
              <div className="item" key={index}>
                <h4>{item.label}</h4>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>
            ))}
          </div>

          <div className="carousel-dots">
            {featuredItems.map((_, index) => (
              <button
                key={index}
                className={`dot ${index === currentAdIndex ? "active" : ""}`}
                onClick={() => setCurrentAdIndex(index)}
              />
            ))}
          </div>
        </div>

        {/* Stories Grid Section */}
        <section className="stories-section" ref={storiesSectionRef} id="stories" style={{ scrollMarginTop: "90px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
            <h2>{currentCategory}</h2>
            {currentCategory !== "Latest Stories" && (
              <button 
                onClick={handleResetToHome}
                style={{ background: "none", border: "none", color: "#b45309", cursor: "pointer", fontWeight: "600", fontSize: "0.9rem" }}
              >
                ← Back to Featured Mood Cards
              </button>
            )}
          </div>

          {storiesLoading ? (
            <div style={{ textAlign: "center", padding: "3rem", color: "#666" }}>
              <p>Loading cozy {currentCategory.toLowerCase()} stories from server...</p>
            </div>
          ) : stories.length === 0 ? (
            <div style={{ textAlign: "center", padding: "3rem", color: "#666" }}>
              <p>No stories found in this category yet. Check back soon!</p>
            </div>
          ) : (
            <div className="stories-grid">
              {stories.map((story: any, idx: number) => (
                <div 
                  key={story.id || idx} 
                  onClick={() => { setSelectedStory(story); setIsWidescreenModal(false); }}
                  style={{ cursor: "pointer" }}
                  title="Click to read full story"
                >
                  <StoryCard
                    id={story.id || idx}
                    genre={story.genre}
                    heading={story.heading || story.title}
                    date={story.date || "Recent"}
                    readTime={story.readTime || "5 min read"}
                    title={story.title}
                    preview={story.preview || story.snippet || "Click to read full story..."}
                  />
                </div>
              ))}
            </div>
          )}
        </section>

        {/* --- CHUCK NORRIS JOKES API WIDGET --- */}
        <section className="jokes-api-section" id="jokes" style={{ marginTop: "4rem", marginBottom: "3rem", padding: "0 1.5rem" }}>
          <div 
            className="jokes-card" 
            ref={jokesCardRef} 
            style={{ scrollMarginTop: "100px" }}
          >
            <div className="jokes-header">
              <span className="jokes-badge">⚡ Quick Laughs</span>
              <h2>Chuck Norris Comedy Bar</h2>
              <p>Need an instant mood booster? Tap below for another legendary fact.</p>
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

        {/* --- READER VOICES & GOSSIP DROP-IN BOARD --- */}
        <section className="feedback-section">
          <div className="feedback-container">
            <div className="feedback-header">
              <h2>🗣️ The Companion Voice Box</h2>
              <p>Drop your thoughts, review a story, or spill some juicy gossip. Let's hear from you!</p>
            </div>

            <form onSubmit={handleSubmission} className="feedback-form">
              <div className="form-row">
                <input 
                  type="text" 
                  placeholder="Your Name / Nickname (Optional)" 
                  value={readerName}
                  onChange={(e) => setReaderName(e.target.value)}
                />
                <select 
                  value={readerCategory}
                  onChange={(e) => setReaderCategory(e.target.value)}
                >
                  <option value="Story Feedback">📖 Story Feedback</option>
                  <option value="Juicy Gossip">🤫 Juicy Gossip / Confession</option>
                  <option value="General Thought">💭 Random Thought</option>
                </select>
              </div>

              <textarea 
                rows={4}
                placeholder="What's on your mind? Share your thoughts or secrets here..."
                value={readerMessage}
                onChange={(e) => setReaderMessage(e.target.value)}
                required
              />

              <button type="submit" className="submit-btn">Post to Community Board</button>
            </form>

            {/* Live Reader Wall */}
            <div className="reader-wall">
              <h3>Recent Reader Voices</h3>
              <div className="wall-grid">
                {submissions.map((sub, index) => (
                  <div className="wall-card" key={index}>
                    <div className="wall-card-header">
                      <span className="wall-author">{sub.name}</span>
                      <span className="wall-badge">{sub.category}</span>
                    </div>
                    <p>"{sub.text}"</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* --- STORY READER MODAL OVERLAY WITH WIDESCREEN ENLARGE OPTION --- */}
      {selectedStory && (
        <div style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.65)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 1000,
          padding: "1rem"
        }}>
          <div style={{
            backgroundColor: "#fff",
            padding: "2.5rem",
            borderRadius: "16px",
            maxWidth: isWidescreenModal ? "95vw" : "650px",
            width: "100%",
            maxHeight: "90vh",
            overflowY: "auto",
            position: "relative",
            boxShadow: "0 25px 35px -5px rgba(0, 0, 0, 0.15)",
            transition: "max-width 0.3s ease-in-out"
          }}>
            {/* Action Header Buttons: Enlarge & Close */}
            <div style={{ position: "absolute", top: "1.2rem", right: "1.2rem", display: "flex", gap: "0.5rem", alignItems: "center" }}>
              <button 
                onClick={() => setIsWidescreenModal(!isWidescreenModal)}
                title={isWidescreenModal ? "Shrink to standard view" : "Enlarge to widescreen"}
                style={{
                  background: "#f3f4f6",
                  border: "none",
                  borderRadius: "50%",
                  width: "36px",
                  height: "36px",
                  fontSize: "0.95rem",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: "bold",
                  color: "#374151"
                }}
              >
                {isWidescreenModal ? "🗕" : "🗖"}
              </button>

              <button 
                onClick={() => setSelectedStory(null)}
                title="Close modal"
                style={{
                  background: "#f3f4f6",
                  border: "none",
                  borderRadius: "50%",
                  width: "36px",
                  height: "36px",
                  fontSize: "1.1rem",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: "bold",
                  color: "#374151"
                }}
              >
                ✕
              </button>
            </div>
            
            <span style={{ fontSize: "0.85rem", fontWeight: "600", color: "#b45309", textTransform: "uppercase", letterSpacing: "1px" }}>
              {selectedStory.genre || "Story"}
            </span>
            <h2 style={{ fontSize: "2rem", marginTop: "0.5rem", marginBottom: "0.5rem", color: "#1f2937" }}>
              {selectedStory.title}
            </h2>
            <p style={{ fontSize: "0.85rem", color: "#6b7280", marginBottom: "1.5rem" }}>
              {selectedStory.date || "Recent"} • {selectedStory.readTime || "5 min read"}
            </p>
            
            <hr style={{ border: "0", borderTop: "1px solid #e5e7eb", marginBottom: "1.5rem" }} />
            
            <p style={{ fontSize: isWidescreenModal ? "1.15rem" : "1.05rem", lineHeight: "1.9", color: "#374151" }}>
              {selectedStory.content || selectedStory.preview || selectedStory.snippet || "Full story content coming soon!"}
            </p>

            <div style={{ marginTop: "2.5rem", display: "flex", gap: "1rem" }}>
              <button 
                onClick={() => setIsWidescreenModal(!isWidescreenModal)}
                style={{
                  flex: 1,
                  padding: "0.75rem",
                  backgroundColor: "#f3f4f6",
                  color: "#374151",
                  border: "none",
                  borderRadius: "8px",
                  fontWeight: "600",
                  cursor: "pointer"
                }}
              >
                {isWidescreenModal ? "Switch to Standard View" : "Enlarge / Widescreen Mode 🗖"}
              </button>

              <button 
                onClick={() => setSelectedStory(null)}
                style={{
                  flex: 1,
                  padding: "0.75rem",
                  backgroundColor: "#1f2937",
                  color: "#fff",
                  border: "none",
                  borderRadius: "8px",
                  fontWeight: "600",
                  cursor: "pointer"
                }}
              >
                Close Story
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Creator Pitch Banner */}
      <section className="before-footer">
        <h2>Want to be a creator or contributor?</h2>
        <p>
          Send an email to beverlymichaels977@gmail.com and pitch your stories!
        </p>
      </section>

      {/* --- REVISED 3-COLUMN FOOTER --- */}
      <footer>
        <div className="footer-content">
          <div className="footer-left">
            <p>© 2026 The Companion by Phoebe.</p>
            <p>All cozy rights reserved.</p>
          </div>

          <div className="footer-center">
            <p>Curated with ☕ & late-night inspiration.</p>
            <p>Reach out: <a href="mailto:beverlymichaels977@gmail.com">beverlymichaels977@gmail.com</a></p>
          </div>

          <div className="footer-right">
            <span>Connect with us:</span>
            <div className="social-links">
              <a href="#" target="_blank" rel="noreferrer">Instagram</a>
              <a href="#" target="_blank" rel="noreferrer">Twitter</a>
              <a href="#" target="_blank" rel="noreferrer">Substack</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;