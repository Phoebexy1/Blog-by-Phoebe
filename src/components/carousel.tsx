import { useState, useEffect } from "react";

type Item = {
  label: string;
  title: string;
  text: string;
  image?: string;
  buttonText?: string;
  link?: string;
};

type CarouselProps = {
  featuredItems: Item[];
};

function Carousel({ featuredItems }: CarouselProps) {
  const [currentAdIndex, setCurrentAdIndex] = useState(0);

  // Auto-slide effect for promotional ad banner
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentAdIndex((prevIndex) => (prevIndex + 1) % featuredItems.length);
    }, 4500);

    return () => clearInterval(timer);
  }, [featuredItems.length]);

  return (
    <div className="carousel-banner-wrapper">
      <div
        className="Carousel"
        style={{ transform: `translateX(-${currentAdIndex * 100}%)` }}
      >
        {featuredItems.map((item, index) => (
          <div className="item" key={index}>
            {item.image && (
              <img className="carousel-image" src={item.image} alt={item.title} />
            )}

            <div className="carousel-text">
              <h4>{item.label}</h4>
              <h3>{item.title}</h3>
              <p>{item.text}</p>

              {item.buttonText && item.link && (
                <a
                  className="carousel-btn"
                  href={item.link}
                  target={item.link.startsWith("http") ? "_blank" : undefined}
                  rel="noreferrer"
                >
                  {item.buttonText}
                </a>
              )}
            </div>
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
  );
}

export default Carousel;