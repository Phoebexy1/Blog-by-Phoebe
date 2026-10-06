function Hero() {
  return (
    <section className="hero">
      <img className="hero-image" src="/images/hero.jpg" alt="A cozy reading corner" />

      <div className="hero-card">
        <h2><b>Welcome to Your Cozy Corner of the Internet.</b></h2>
        <h3>Stories, Gossip, Laughter and Late Night Musings.</h3>
        <p>Grab a seat, it's about to be a fun ride.</p>
        <p>Curated with love by Phoebe.</p>
        <a className="hero-btn" href="#stories">Start reading</a>
      </div>
    </section>
  );
}

export default Hero;