import { useEffect, useState, type MouseEvent } from "react";
import "./App.css";
import { localStories } from "./data/stories";
import Footer from "./components/footer";
import Hero from "./components/hero";
import CreatorBanner from "./components/creatorbanner";
import Carousel from "./components/carousel";
import Navbar from "./components/navbar";
import EmailSection from "./components/emailsection";
import Jokes from "./components/jokes";
import FeedbackBoard from "./components/feedbackboard";
import StoriesSection from "./components/storiessection";
import FeaturedActions from "./components/featuredactions";

const featuredItems = [
  {
    label: "Coming Soon",
    title: "Stash by Phoebeee is coming soon!",
    text: "Essentials every 9–5er needs, available at the snap of their fingers.",
    image: "/images/stash.jpg",
    link: "#newsletter",
  },
  {
    label: "Travel Bee",
    title: "Travel with Phoebee - First Edition",
    text: "Pack your bags and come see the world with me! Our exclusive curated group getaways are launching next month.",
    image: "/images/travelwithphoebe.jpg",
  },
  {
    label: "Community",
    title: "Join The Companion Book Club",
    text: "Monthly cozy reads, juicy discussions and slumber parties with Phoebe and friends.",
    image: "/images/bookclub.jpg",
  },
];
 // Finds your own stories for a category
const getLocalStoriesFor = (categoryTitle: string) =>
  localStories.filter((s) => s.category === categoryTitle);
// Fallback pictures for stories that arrive from the server without an image
const categoryImages: Record<string, string[]> = {
  "Folklore": ["/images/tortoise.jpg", "/images/anansi.jpg", "/images/anansi.jpg", "/images/sky.jpg", "/images/leopard.jpg"],
  "Horror": ["/images/readreceipt.png", "/images/soundproof.jpg", "/images/deepsea.jpg", "/images/koikoi.png","/images/nightrunner.jpg"],
  "Romance": ["/images/romance.jpg", "/images/heartbreak.jpg"],
  "Real Life": ["/images/bus.jpg"],
  "Gossip": ["/images/gossip.jpg"],
  "Fashion & Beauty": ["/images/eyelashes.jpg", "/images/red.jpg", "/images/shoes.jpg", "/images/lipstick.jpg"],
  "Travel & Lifestyle": ["/images/vacationcollage.jpg", "/images/diet.jpg", "/images/corporate.jpg"], 
};

// Picks a picture for the story at position idx in its category
const getFallbackImage = (categoryTitle: string, idx: number) => {
  const pics = categoryImages[categoryTitle];
  return pics ? pics[idx % pics.length] : undefined;
};

function App() {
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    const savedTheme = localStorage.getItem("phoebe-theme");
    return savedTheme === "dark" ? "dark" : "light";
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("phoebe-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((currentTheme) => (currentTheme === "light" ? "dark" : "light"));
  };
 
  // Stories State
  const [stories, setStories] = useState(localStories);
  const [currentCategory, setCurrentCategory] = useState("Latest Stories");
  const [storiesLoading, setStoriesLoading] = useState(false);
  const [selectedStory, setSelectedStory] = useState<any>(null);
  const [isWidescreenModal, setIsWidescreenModal] = useState(false);
  

  // Fetch Stories by Category from API, mapping them securely to their correct genre identity
   const fetchStoriesFromApi = async (endpoint: string, categoryTitle: string) => {
    try {
      setStoriesLoading(true);
      setCurrentCategory(categoryTitle);
      document.getElementById("stories")?.scrollIntoView({ behavior: "smooth", block: "start" });

      const res = await fetch(`https://blog-qah4.onrender.com/api/stories/${endpoint}`);
      if (!res.ok) throw new Error("Failed to fetch stories");

      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) {
        // Map API stories so each retains or adopts the exact genre tag matching its category type
        const mappedData = data.map((story, idx) => {
          const assignedGenre = story.genre || categoryTitle;
          return {
            ...story,
            id: story.id || idx + 1,
            genre: assignedGenre,
            heading: story.heading || story.title || categoryTitle,
            preview: story.preview || story.snippet || story.content?.slice(0, 80) + "..." || "Click to read full story...",
            image: story.image || getFallbackImage(categoryTitle, idx),
          };
        });
        setStories(mappedData);
      } else {
        // The server has nothing for this category: show our own stories for it
        setStories(getLocalStoriesFor(categoryTitle));
      }
    } catch (error) {
      setStories(getLocalStoriesFor(categoryTitle));
    } finally {
      setStoriesLoading(false);
    }
  };

  // Reset to original home mood cards
  const handleResetToHome = () => {
    setStories(localStories);
    setCurrentCategory("Latest Stories");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Handle Jump to Jokes Section accurately
  function handleJokesNavClick(e: MouseEvent<HTMLAnchorElement>) {
    e.preventDefault();
    document.getElementById("jokes")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <div>
      <Navbar
        handleResetToHome={handleResetToHome}
        fetchStoriesFromApi={fetchStoriesFromApi}
        handleJokesNavClick={handleJokesNavClick}
        theme={theme}
        toggleTheme={toggleTheme}
      />

    <main>
        <div className="top-area">
          <Hero />

          <div className="featured-row">
            <Carousel featuredItems={featuredItems} />
            <FeaturedActions />
          </div>
        </div>

        {/* Stories Grid Section */}
        <StoriesSection
          currentCategory={currentCategory}
          stories={stories}
          storiesLoading={storiesLoading}
          handleResetToHome={handleResetToHome}
          setSelectedStory={setSelectedStory}
          setIsWidescreenModal={setIsWidescreenModal}
        />

        {/* --- CHUCK NORRIS JOKES API WIDGET --- */}
        <Jokes />

        {/* --- READER VOICES & GOSSIP DROP-IN BOARD --- */}
        <div className="duo-row">
          <FeedbackBoard />
          <CreatorBanner />
        </div>
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
      <EmailSection />

      <Footer/>
    </div>
  );
}

  export default App;