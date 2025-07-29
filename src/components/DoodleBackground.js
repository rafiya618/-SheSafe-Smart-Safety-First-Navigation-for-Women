import React from 'react';

const DoodleBackground = () => {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none select-none overflow-hidden">
      {/* Pink circle top left */}
      <svg className="absolute left-[-120px] top-[-120px] opacity-60" width="420" height="420" viewBox="0 0 420 420" fill="none">
        <circle cx="210" cy="210" r="180" fill="#a072e8" />
      </svg>
      {/* Blue circle bottom right */}
      <svg className="absolute right-[-100px] bottom-[-100px] opacity-60" width="340" height="340" viewBox="0 0 340 340" fill="none">
        <circle cx="170" cy="170" r="140" fill="#0ea5e9" />
      </svg>
      {/* Purple ellipse center */}
      <svg className="absolute left-1/2 top-1/3 -translate-x-1/2 opacity-40" width="220" height="220" viewBox="0 0 220 220" fill="none">
        <ellipse cx="110" cy="110" rx="100" ry="60" fill="#6d28d9" />
      </svg>
      {/* Fun squiggle top right */}
      <svg className="absolute right-10 top-10 opacity-40" width="120" height="60" viewBox="0 0 120 60" fill="none">
        <path d="M10 50 Q 40 10, 70 40 T 110 30" stroke="#be185d" strokeWidth="6" fill="none" strokeLinecap="round"/>
      </svg>
      {/* Fun dots bottom left */}
      <svg className="absolute left-10 bottom-10 opacity-40" width="80" height="40" viewBox="0 0 80 40" fill="none">
        <circle cx="10" cy="30" r="6" fill="#0ea5e9" />
        <circle cx="40" cy="20" r="4" fill="#be185d" />
        <circle cx="70" cy="30" r="5" fill="#6d28d9" />
      </svg>
      {/* Car doodle bottom center */}
      <svg className="absolute left-1/2 bottom-8 -translate-x-1/2 opacity-60" width="120" height="60" viewBox="0 0 120 60" fill="none">
        <rect x="20" y="30" width="80" height="20" rx="8" fill="#be185d" />
        <rect x="35" y="20" width="50" height="15" rx="6" fill="#0ea5e9" />
        <circle cx="35" cy="52" r="8" fill="#6d28d9" />
        <circle cx="85" cy="52" r="8" fill="#6d28d9" />
        <rect x="60" y="37" width="15" height="6" rx="2" fill="#fff" opacity="0.7"/>
      </svg>
      {/* Tree doodle left center */}
      <svg className="absolute left-10 top-1/2 -translate-y-1/2 opacity-40" width="60" height="120" viewBox="0 0 60 120" fill="none">
        <ellipse cx="30" cy="40" rx="28" ry="30" fill="#22d3ee" />
        <ellipse cx="30" cy="70" rx="20" ry="18" fill="#0ea5e9" />
        <rect x="25" y="80" width="10" height="30" rx="5" fill="#6d28d9" />
      </svg>
      
      {/* Cloud doodle right center */}
      <svg className="absolute right-10 top-1/2 -translate-y-1/2 opacity-40" width="100" height="60" viewBox="0 0 100 60" fill="none">
        <ellipse cx="40" cy="40" rx="30" ry="18" fill="#fff" />
        <ellipse cx="65" cy="35" rx="20" ry="14" fill="#a5b4fc" />
        <ellipse cx="80" cy="45" rx="12" ry="10" fill="#be185d" />
      </svg>
      {/* Bicycle doodle mid left */}
      <svg className="absolute left-24 top-1/3 opacity-40" width="80" height="40" viewBox="0 0 80 40" fill="none">
        <circle cx="20" cy="30" r="10" stroke="#6d28d9" strokeWidth="3" fill="none"/>
        <circle cx="60" cy="30" r="10" stroke="#6d28d9" strokeWidth="3" fill="none"/>
        <rect x="38" y="18" width="4" height="12" rx="2" fill="#0ea5e9" />
        <rect x="30" y="28" width="20" height="4" rx="2" fill="#be185d" />
        <rect x="18" y="18" width="4" height="12" rx="2" fill="#0ea5e9" />
      </svg>
      {/* Flower doodle bottom right */}
      <svg className="absolute right-10 bottom-10 opacity-40" width="60" height="60" viewBox="0 0 60 60" fill="none">
        <circle cx="30" cy="30" r="8" fill="#be185d" />
        <ellipse cx="30" cy="15" rx="6" ry="12" fill="#0ea5e9" />
        <ellipse cx="30" cy="45" rx="6" ry="12" fill="#0ea5e9" />
        <ellipse cx="15" cy="30" rx="12" ry="6" fill="#0ea5e9" />
        <ellipse cx="45" cy="30" rx="12" ry="6" fill="#0ea5e9" />
      </svg>
      {/* Bus doodle top left */}
      <svg className="absolute left-24 top-24 opacity-40" width="90" height="40" viewBox="0 0 90 40" fill="none">
        <rect x="10" y="15" width="70" height="18" rx="6" fill="#fde68a" />
        <rect x="18" y="10" width="54" height="10" rx="4" fill="#0ea5e9" />
        <circle cx="22" cy="36" r="5" fill="#6d28d9" />
        <circle cx="68" cy="36" r="5" fill="#6d28d9" />
      </svg>
      {/* Sun doodle top right */}
      <svg className="absolute right-24 top-16 opacity-40" width="60" height="60" viewBox="0 0 60 60" fill="none">
        <circle cx="30" cy="30" r="14" fill="#fde68a" />
        {[...Array(8)].map((_, i) => (
          <rect key={i} x="28" y="2" width="4" height="12" rx="2"
            fill="#fbbf24"
            transform={`rotate(${i * 45} 30 30)`} />
        ))}
      </svg>
      {/* Road doodle bottom center */}
      <svg className="absolute left-1/2 bottom-0 -translate-x-1/2 opacity-40" width="220" height="40" viewBox="0 0 220 40" fill="none">
        <rect x="0" y="20" width="220" height="16" rx="8" fill="#a5b4fc" />
        <rect x="10" y="27" width="30" height="4" rx="2" fill="#fff" />
        <rect x="60" y="27" width="30" height="4" rx="2" fill="#fff" />
        <rect x="110" y="27" width="30" height="4" rx="2" fill="#fff" />
        <rect x="160" y="27" width="30" height="4" rx="2" fill="#fff" />
      </svg>
      {/* Tree doodle right bottom */}
      <svg className="absolute right-24 bottom-24 opacity-40" width="50" height="90" viewBox="0 0 50 90" fill="none">
        <ellipse cx="25" cy="35" rx="22" ry="25" fill="#22d3ee" />
        <rect x="20" y="60" width="10" height="25" rx="5" fill="#6d28d9" />
      </svg>
      {/* Person doodle left bottom */}
      <svg className="absolute left-32 bottom-24 opacity-40" width="40" height="80" viewBox="0 0 40 80" fill="none">
        <circle cx="20" cy="18" r="10" fill="#be185d" />
        <rect x="13" y="28" width="14" height="28" rx="7" fill="#0ea5e9" />
        <rect x="10" y="56" width="6" height="18" rx="3" fill="#22d3ee" />
        <rect x="24" y="56" width="6" height="18" rx="3" fill="#22d3ee" />
      </svg>
    </div>
  );
};

export default DoodleBackground;