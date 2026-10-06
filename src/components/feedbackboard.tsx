import { useState } from "react";

function FeedbackBoard() {
  // Reader Feedback / Gossip Board State
  const [readerName, setReaderName] = useState("");
  const [readerCategory, setReaderCategory] = useState("Story Feedback");
  const [readerMessage, setReaderMessage] = useState("");
  const [submissions, setSubmissions] = useState([
    { name: "Anonymous Reader", category: "Juicy Gossip", text: "I heard a certain influencer has been dumped by her boyfriend..." },
    { name: "Mimi", category: "Story Feedback", text: "Very pretty interface! Please post more pieces." }
  ]);

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

  /* Backend version, for when the endpoint is ready:
  const handleSubmission = async (e: React.FormEvent) => {
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
  };
  */

  return (
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
  );
}

export default FeedbackBoard;