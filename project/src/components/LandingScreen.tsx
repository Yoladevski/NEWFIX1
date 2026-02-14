import { Heart } from 'lucide-react';

interface LandingScreenProps {
  onEnter: () => void;
}

export function LandingScreen({ onEnter }: LandingScreenProps) {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-10">
      <div className="text-center px-6 max-w-4xl mx-auto slide-fade-in">
        {/* Decorative Top Border */}
        <div className="flex items-center justify-center mb-8 gap-4">
          <div className="h-px w-16 md:w-24 bg-gradient-to-r from-transparent via-red-900/60 to-red-900/60" />
          <div className="relative pulse-glow heart-float">
            <Heart className="w-12 h-12 md:w-16 md:h-16 text-red-800 fill-red-900/80" strokeWidth={1.5} />
            <div className="absolute inset-0 flex items-center justify-center">
              <Heart className="w-8 h-8 md:w-10 md:h-10 text-red-600 fill-red-700/60" strokeWidth={1} />
            </div>
          </div>
          <div className="h-px w-16 md:w-24 bg-gradient-to-l from-transparent via-red-900/60 to-red-900/60" />
        </div>

        {/* Main Heading */}
        <h1 className="text-7xl md:text-9xl font-bold text-white mb-8 text-shadow-glow tracking-wider" style={{ fontFamily: "'Cinzel', serif" }}>
          For Kerri
        </h1>

        {/* Decorative Line */}
        <div className="flex items-center justify-center mb-8">
          <div className="h-px w-24 bg-gradient-to-r from-transparent to-purple-900/60" />
          <div className="w-2 h-2 mx-4 rounded-full bg-red-900 shadow-lg shadow-red-900/50" />
          <div className="h-px w-24 bg-gradient-to-l from-transparent to-purple-900/60" />
        </div>

        {/* Subheading */}
        <p className="text-2xl md:text-4xl text-red-200/90 font-light mb-16 leading-relaxed tracking-wide" style={{ fontFamily: "'Playfair Display', serif" }}>
          My person. My purple. My Tuesday.
        </p>

        {/* Enter Button */}
        <button
          onClick={onEnter}
          className="group relative px-16 py-5 text-2xl font-semibold text-white bg-gradient-to-r from-red-950/40 via-purple-950/40 to-red-950/40 border-2 border-red-900/60 hover:border-red-800 hover:shadow-lg hover:shadow-red-900/50 transition-all duration-500 overflow-hidden tracking-widest"
          style={{ fontFamily: "'Cinzel', serif" }}
        >
          <span className="relative z-10">ENTER</span>
          <div className="absolute inset-0 bg-gradient-to-r from-red-900/30 via-purple-900/30 to-red-900/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </button>

        {/* Decorative Bottom Border */}
        <div className="flex items-center justify-center mt-12 gap-4">
          <div className="h-px w-20 md:w-32 bg-gradient-to-r from-transparent via-red-900/40 to-red-900/40" />
          <div className="w-1 h-1 rounded-full bg-red-900/60" />
          <div className="h-px w-20 md:w-32 bg-gradient-to-l from-transparent via-red-900/40 to-red-900/40" />
        </div>
      </div>
    </div>
  );
}
