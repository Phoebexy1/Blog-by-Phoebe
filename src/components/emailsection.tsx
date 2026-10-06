import { useState } from "react";
import "./emailsection.css";

function EmailSection() {
  // Remembers what the person is typing in the email box.
  const [emailAddress, setEmailAddress] = useState("");

  // Remembers whether they already subscribed (true or false).
  const [emailSubmitted, setEmailSubmitted] = useState(false);

  // Runs when the person clicks Subscribe.
  const handleEmailSubmission = (e: React.FormEvent) => {
    e.preventDefault(); // stops the page from reloading
    if (!emailAddress.trim()) return; // do nothing if the box is empty

    // Later, the backend call will go here.
    setEmailSubmitted(true);
    setEmailAddress("");
  };

  return (
    <section className="email-section">
      <div className="email-container">
        <img className="email-image" src="/images/newsletter.jpg" alt="Newsletter envelope" />

        <h2>Never Miss a Story</h2>
        <p>Get new stories and juicy gossip in your inbox.</p>

        {emailSubmitted ? (
          <p className="email-thanks">Thank you for subscribing! 💌</p>
        ) : (
          <form onSubmit={handleEmailSubmission} className="email-form">
            <input
              type="email"
              placeholder="Enter your email address"
              value={emailAddress}
              onChange={(e) => setEmailAddress(e.target.value)}
              required
            />
            <button type="submit">Subscribe</button>
          </form>
        )}
      </div>
    </section>
  );
}

export default EmailSection;