import { useState, useEffect, useCallback, useRef } from 'react';
import { Heart, ChevronLeft, ChevronRight, Volume2, VolumeX } from 'lucide-react';
import { LandingScreen } from './components/LandingScreen';
import { Slideshow } from './components/Slideshow';
import { ClosingScreen } from './components/ClosingScreen';

function App() {
  const [stage, setStage] = useState<'landing' | 'slideshow' | 'closing'>('landing');
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Create audio element for background music (using video URL for audio)
    audioRef.current = new Audio('https://image2url.com/r2/default/videos/1771031973844-facec3be-684d-45e4-8201-9ab6e522d533.mov');
    audioRef.current.loop = true;
    audioRef.current.volume = 0.4;

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const toggleMusic = useCallback(() => {
    if (audioRef.current) {
      if (isMusicPlaying) {
        audioRef.current.pause();
        setIsMusicPlaying(false);
      } else {
        audioRef.current.play().catch(() => {
          // Autoplay might be blocked
        });
        setIsMusicPlaying(true);
      }
    }
  }, [isMusicPlaying]);

  const handleEnter = useCallback(() => {
    setStage('slideshow');
    // Start playing music when entering the slideshow
    if (audioRef.current) {
      audioRef.current.play().catch(() => {
        // Autoplay might be blocked, but user interaction (clicking Enter) should allow it
      });
      setIsMusicPlaying(true);
    }
  }, []);

  const handleSlideshowComplete = useCallback(() => {
    setStage('closing');
  }, []);

  return (
    <div className="fixed inset-0 w-full h-full animated-gradient overflow-hidden">
      {/* Music Toggle Button */}
      {stage !== 'landing' && (
        <button
          onClick={toggleMusic}
          className="fixed top-6 right-6 z-50 p-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-300"
          aria-label={isMusicPlaying ? 'Mute music' : 'Play music'}
        >
          {isMusicPlaying ? (
            <Volume2 className="w-5 h-5 text-white" />
          ) : (
            <VolumeX className="w-5 h-5 text-white" />
          )}
        </button>
      )}

      {/* Stages */}
      {stage === 'landing' && <LandingScreen onEnter={handleEnter} />}
      {stage === 'slideshow' && <Slideshow onComplete={handleSlideshowComplete} />}
      {stage === 'closing' && <ClosingScreen />}
    </div>
  );
}

export default App;
