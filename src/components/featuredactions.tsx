import { useState, type FormEvent } from "react";

function FeaturedActions() {
  const [email, setEmail] = useState("");
  const [emailSubmitted, setEmailSubmitted] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const address = email.trim();
    if (!address) return;

    setEmailSubmitted(true);
    setEmail("");
  };

  return (
    <aside className="featured-actions" aria-labelledby="featured-actions-title">
      <span className="featured-actions-kicker">Stories, trips &amp; little joys</span>
      <h2 id="featured-actions-title">Be first to hear what&apos;s next.</h2>
      <p>
        Get Phoebe&apos;s latest stories and updates about Stash, Travel with
        Phoebee and the Companion Book Club all in one place.
      </p>

      {emailSubmitted ? (
        <p className="featured-actions-thanks" role="status">
          Thank you for subscribing!
        </p>
      ) : (
        <form className="featured-actions-form" onSubmit={handleSubmit}>
          <label className="visually-hidden" htmlFor="featured-email">
            Your email address
          </label>
          <input
            id="featured-email"
            type="email"
            placeholder="Your email address"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
          <button type="submit">Sign me up</button>
        </form>
      )}

    </aside>
  );
}

export default FeaturedActions;
