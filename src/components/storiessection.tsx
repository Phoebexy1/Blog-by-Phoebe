import { useState, useEffect } from "react";
import StoryCard from "./storycard";

type StoriesSectionProps = {
  currentCategory: string;
  stories: any[];
  storiesLoading: boolean;
  handleResetToHome: () => void;
  setSelectedStory: (story: any) => void;
  setIsWidescreenModal: (value: boolean) => void;
};

function StoriesSection({
  currentCategory,
  stories,
  storiesLoading,
  handleResetToHome,
  setSelectedStory,
  setIsWidescreenModal,
}: StoriesSectionProps) {
  // Remembers what the person has typed in the search box
  const [searchTerm, setSearchTerm] = useState("");

  // Clears the search box whenever a new category is opened
  useEffect(() => {
    setSearchTerm("");
  }, [currentCategory]);

  // The shorter list: only stories that match the typed text
  const filteredStories = stories.filter((story: any) => {
    const text = `${story.title} ${story.genre} ${story.preview || story.snippet || ""}`.toLowerCase();
    return text.includes(searchTerm.toLowerCase().trim());
  });

  return (
    <section className="stories-section" id="stories">
      <div className="stories-heading-row">
        <h2>{currentCategory}</h2>
        {currentCategory !== "Latest Stories" && (
          <button className="back-to-home-btn" onClick={handleResetToHome}>
            ← Back to Featured Mood Cards
          </button>
        )}
      </div>

      <div className="stories-search">
        <input
          type="text"
          placeholder="Search stories..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {storiesLoading ? (
        <div className="stories-message">
          <p>Loading cozy {currentCategory.toLowerCase()} stories from server...</p>
        </div>
      ) : stories.length === 0 ? (
        <div className="stories-message">
          <p>No stories found in this category yet. Check back soon!</p>
        </div>
      ) : filteredStories.length === 0 ? (
        <div className="stories-message">
          <p>No stories match your search. Try a different word.</p>
        </div>
      ) : (
        <div className="stories-grid">
          {filteredStories.map((story: any, idx: number) => (
            <div
              key={story.id || idx}
              className="story-card-wrapper"
              onClick={() => { setSelectedStory(story); setIsWidescreenModal(false); }}
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
                image={story.image}
              />
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default StoriesSection;