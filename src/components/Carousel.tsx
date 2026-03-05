import { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';
import { ATTRACTIONS } from '../data/attractions';

const Carousel = () => {
  const featured = ATTRACTIONS.slice(0, 3);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  const [progress, setProgress] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const duration = 5000; // ms

  // Autoplay progress timer
  useEffect(() => {
    if (!autoplay) return;
    setProgress(0);
    const tick = 100; // ms
    const steps = duration / tick;
    const inc = 100 / steps;

    const timer = setInterval(() => {
      setProgress((p) => {
        const next = p + inc;
        if (next >= 100) {
          // move to next slide
          setCurrentIndex((prev) => (prev + 1) % featured.length);
          return 0;
        }
        return next;
      });
    }, tick);

    return () => clearInterval(timer);
  }, [autoplay, featured.length]);

  // Pause autoplay on user interaction via keyboard
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        prevSlide();
        setAutoplay(false);
      } else if (e.key === 'ArrowRight') {
        nextSlide();
        setAutoplay(false);
      } else if (e.key === ' ' || e.key === 'Spacebar') {
        setAutoplay((a) => !a);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setProgress(0);
    setAutoplay(false);
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % featured.length);
    setProgress(0);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + featured.length) % featured.length);
    setProgress(0);
  };

  // Touch handlers for swipe
  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    setAutoplay(false);
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current == null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(dx) > 40) {
      if (dx > 0) prevSlide();
      else nextSlide();
    }
    touchStartX.current = null;
  };

  return (
    <div
      className="relative w-full"
      role="region"
      aria-label="Featured attractions carousel"
      onMouseEnter={() => setAutoplay(false)}
      onMouseLeave={() => setAutoplay(true)}
    >
      {/* Top progress bar */}
      <div className="absolute left-0 right-0 top-0 h-1 bg-white/10 rounded-b-full overflow-hidden z-20">
        <div
          className="h-full bg-secondary transition-all duration-100"
          style={{ width: `${progress}%` }}
          aria-hidden="true"
        />
      </div>

      {/* Slides */}
      <div
        className="relative h-96 overflow-hidden rounded-xl shadow-lg bg-gray-900"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        {featured.map((attraction, index) => {
          const isActive = index === currentIndex;
          return (
            <div
              key={attraction.id}
              className={`absolute inset-0 transition-transform duration-700 ease-in-out transform ${
                isActive ? 'scale-100 z-10 opacity-100' : 'scale-95 z-0 opacity-0 pointer-events-none'
              }`}
              role="tabpanel"
              aria-hidden={!isActive}
            >
              <img
                src={attraction.image}
                alt={attraction.name}
                className="absolute w-full h-full object-cover"
                loading="lazy"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

              <div className="relative z-20 h-full flex flex-col items-center justify-center text-center text-white px-6">
                <h2 className="text-3xl md:text-5xl font-extrabold mb-3 drop-shadow-lg animate-fadeInDown">{attraction.name}</h2>
                <p className="max-w-2xl text-sm md:text-lg mb-6 text-blue-100 animate-fadeInUp">{attraction.description}</p>
                <div className="flex gap-4">
                  <a
                    href="/booking"
                    className="bg-secondary text-park-dark px-6 py-3 rounded-full font-semibold hover:scale-105 transition shadow-lg"
                  >
                    Book Now
                  </a>
                  <a
                    href={`/attraction/${attraction.id}`}
                    className="border-2 border-white/30 text-white px-6 py-3 rounded-full font-semibold hover:bg-white/10 transition"
                  >
                    Learn More
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={() => {
          prevSlide();
          setAutoplay(false);
        }}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 rounded-full transition z-30 shadow-md"
        aria-label="Previous slide"
      >
        <ChevronLeft size={22} className="text-park-dark" />
      </button>

      <button
        onClick={() => {
          nextSlide();
          setAutoplay(false);
        }}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 rounded-full transition z-30 shadow-md"
        aria-label="Next slide"
      >
        <ChevronRight size={22} className="text-park-dark" />
      </button>

      {/* Play/Pause */}
      <button
        onClick={() => setAutoplay((a) => !a)}
        className="absolute right-4 top-4 bg-white/90 p-2 rounded-full z-30 shadow-sm hover:scale-105 transition"
        aria-label={autoplay ? 'Pause autoplay' : 'Play autoplay'}
      >
        {autoplay ? <Pause size={18} /> : <Play size={18} />}
      </button>

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-3 z-30">
        {featured.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentIndex ? 'bg-secondary scale-125' : 'bg-white/50 hover:bg-white'
            }`}
            aria-label={`Go to slide ${index + 1}`}
            aria-current={index === currentIndex}
            role="tab"
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
