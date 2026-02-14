import { Heart } from 'lucide-react';

export function ClosingScreen() {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-10">
      <div className="text-center px-6 max-w-4xl mx-auto slide-fade-in">
        {/* Decorative Top */}
        <div className="flex items-center justify-center mb-12 gap-4">
          <div className="h-px w-16 md:w-24 bg-gradient-to-r from-transparent via-red-900/60 to-red-900/60" />
          <div className="relative pulse-glow heart-float">
            <Heart className="w-14 h-14 md:w-20 md:h-20 text-red-800 fill-red-900/80" strokeWidth={1.5} />
            <div className="absolute inset-0 flex items-center justify-center">
              <Heart className="w-10 h-10 md:w-14 md:h-14 text-red-600 fill-red-700/60" strokeWidth={1} />
            </div>
          </div>
          <div className="h-px w-16 md:w-24 bg-gradient-to-l from-transparent via-red-900/60 to-red-900/60" />
        </div>

        {/* Main Message */}
        <div className="mb-16 space-y-6" style={{ fontFamily: "'Playfair Display', serif" }}>
          <p className="text-2xl md:text-3xl lg:text-4xl text-white font-light leading-relaxed">
            No matter what we've faced, we're still here.
          </p>
          <p className="text-2xl md:text-3xl lg:text-4xl text-white font-light leading-relaxed">
            Still choosing each other.
          </p>
          <p className="text-2xl md:text-3xl lg:text-4xl text-white font-light leading-relaxed">
            Still fighting for us.
          </p>
          <p className="text-2xl md:text-3xl lg:text-4xl text-red-200 font-medium leading-relaxed text-shadow-glow">
            And I would choose you every time.
          </p>
        </div>

        {/* Valentine's Message */}
        <h2 className="text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-12 text-shadow-glow tracking-wide" style={{ fontFamily: "'Cinzel', serif" }}>
          Happy Valentine's Day ❤️
        </h2>

        {/* Decorative Line */}
        <div className="flex items-center justify-center mb-8">
          <div className="h-px w-24 bg-gradient-to-r from-transparent to-purple-900/60" />
          <div className="w-2 h-2 mx-4 rounded-full bg-red-900 shadow-lg shadow-red-900/50" />
          <div className="h-px w-24 bg-gradient-to-l from-transparent to-purple-900/60" />
        </div>

        {/* Subtext */}
        <p className="text-2xl md:text-3xl text-red-200/90 font-light italic tracking-wide" style={{ fontFamily: "'Playfair Display', serif" }}>
          Forever yours.
        </p>
      </div>
    </div>
  );
}
