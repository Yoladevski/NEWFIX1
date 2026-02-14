import { useState, useEffect, useCallback, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { slides } from '../data/slides';

interface SlideshowProps {
  onComplete: () => void;
}

export function Slideshow({ onComplete }: SlideshowProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const timerRef = useRef<number | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const totalSlides = slides.length;
  const currentSlide = slides[currentIndex];

  const goToNext = useCallback(() => {
    if (isTransitioning) return;

    if (currentIndex === totalSlides - 1) {
      onComplete();
    } else {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentIndex(prev => prev + 1);
        setIsTransitioning(false);
      }, 1000);
    }
  }, [currentIndex, totalSlides, isTransitioning, onComplete]);

  const goToPrev = useCallback(() => {
    if (isTransitioning || currentIndex === 0) return;

    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex(prev => prev - 1);
      setIsTransitioning(false);
    }, 1000);
  }, [currentIndex, isTransitioning]);

  // Auto-advance timer
  useEffect(() => {
    if (currentSlide.type === 'video') {
      // For videos, wait for them to end
      return;
    }

    timerRef.current = window.setTimeout(() => {
      goToNext();
    }, 7000);

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [currentIndex, goToNext, currentSlide.type]);

  // Handle video end
  useEffect(() => {
    if (currentSlide.type === 'video' && videoRef.current) {
      const video = videoRef.current;

      const handleVideoEnd = () => {
        setTimeout(goToNext, 1000);
      };

      video.addEventListener('ended', handleVideoEnd);

      return () => {
        video.removeEventListener('ended', handleVideoEnd);
      };
    }
  }, [currentSlide.type, goToNext]);

  // Touch handlers for swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      goToNext();
    } else if (isRightSwipe) {
      goToPrev();
    }

    setTouchStart(0);
    setTouchEnd(0);
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Slide Content */}
      <div className={`absolute inset-0 transition-opacity duration-1000 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
        {/* Media */}
        <div className="absolute inset-0 flex items-center justify-center px-4 md:px-8">
          {currentSlide.type === 'image' ? (
            <img
              src={currentSlide.url}
              alt=""
              className="w-[70%] md:w-auto max-w-full max-h-[65%] md:max-h-[70%] object-contain"
            />
          ) : (
            <video
              ref={videoRef}
              src={currentSlide.url}
              autoPlay
              muted
              playsInline
              className="w-[70%] md:w-auto max-w-full max-h-[65%] md:max-h-[70%] object-contain"
            />
          )}
        </div>

        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/70" />

        {/* Message */}
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-lg md:text-2xl lg:text-3xl text-white font-light leading-relaxed drop-shadow-2xl slide-fade-in" style={{ fontFamily: "'Playfair Display', serif" }}>
              {currentSlide.message}
            </p>
          </div>
        </div>
      </div>

      {/* Navigation Controls */}
      <button
        onClick={goToPrev}
        disabled={currentIndex === 0}
        className={`absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 transition-all duration-300 ${
          currentIndex === 0 ? 'opacity-0 pointer-events-none' : 'hover:bg-white/20'
        }`}
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6 text-white" />
      </button>

      <button
        onClick={goToNext}
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-300"
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6 text-white" />
      </button>

      {/* Progress Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {slides.map((_, index) => (
          <div
            key={index}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? 'w-8 bg-white'
                : 'w-1.5 bg-white/40'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
