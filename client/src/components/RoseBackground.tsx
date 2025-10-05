export function RoseBackground() {
  const roses = [
    { x: '2%', y: '10%', scale: 0.7, rotation: 45, blur: 0.4 },
    { x: '5%', y: '40%', scale: 0.8, rotation: -20, blur: 0.3 },
    { x: '3%', y: '70%', scale: 0.65, rotation: 30, blur: 0.5 },
    { x: '93%', y: '15%', scale: 0.75, rotation: -45, blur: 0.35 },
    { x: '95%', y: '50%', scale: 0.7, rotation: 60, blur: 0.4 },
    { x: '92%', y: '80%', scale: 0.8, rotation: -15, blur: 0.3 },
  ];

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 opacity-[0.15]">
      {roses.map((rose, index) => (
        <div
          key={index}
          className="absolute"
          style={{
            left: rose.x,
            top: rose.y,
            transform: `rotate(${rose.rotation}deg) scale(${rose.scale})`,
            filter: `blur(${rose.blur}px)`,
          }}
        >
          <GoldRose />
        </div>
      ))}
    </div>
  );
}

function GoldRose() {
  return (
    <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="gold-gradient-1" cx="0.3" cy="0.3" r="0.8">
          <stop offset="0%" stopColor="#f4e4a6" />
          <stop offset="40%" stopColor="#d4af37" />
          <stop offset="100%" stopColor="#b8941f" />
        </radialGradient>
        <radialGradient id="gold-gradient-2" cx="0.4" cy="0.3" r="0.7">
          <stop offset="0%" stopColor="#f9eed0" />
          <stop offset="50%" stopColor="#d4af37" />
          <stop offset="100%" stopColor="#a07c1a" />
        </radialGradient>
        <radialGradient id="gold-gradient-3" cx="0.35" cy="0.35" r="0.75">
          <stop offset="0%" stopColor="#ffe8a8" />
          <stop offset="45%" stopColor="#d4af37" />
          <stop offset="100%" stopColor="#8b7020" />
        </radialGradient>
      </defs>
      
      {/* Center petals - innermost layer */}
      <ellipse cx="60" cy="60" rx="8" ry="10" fill="url(#gold-gradient-3)" opacity="0.9" />
      
      {/* Inner petals - 5 petals */}
      <ellipse cx="60" cy="48" rx="12" ry="18" fill="url(#gold-gradient-1)" transform="rotate(0 60 60)" />
      <ellipse cx="60" cy="48" rx="12" ry="18" fill="url(#gold-gradient-2)" transform="rotate(72 60 60)" />
      <ellipse cx="60" cy="48" rx="12" ry="18" fill="url(#gold-gradient-1)" transform="rotate(144 60 60)" />
      <ellipse cx="60" cy="48" rx="12" ry="18" fill="url(#gold-gradient-2)" transform="rotate(216 60 60)" />
      <ellipse cx="60" cy="48" rx="12" ry="18" fill="url(#gold-gradient-1)" transform="rotate(288 60 60)" />
      
      {/* Outer petals - 5 petals */}
      <ellipse cx="60" cy="36" rx="16" ry="24" fill="url(#gold-gradient-2)" transform="rotate(36 60 60)" opacity="0.95" />
      <ellipse cx="60" cy="36" rx="16" ry="24" fill="url(#gold-gradient-1)" transform="rotate(108 60 60)" opacity="0.95" />
      <ellipse cx="60" cy="36" rx="16" ry="24" fill="url(#gold-gradient-2)" transform="rotate(180 60 60)" opacity="0.95" />
      <ellipse cx="60" cy="36" rx="16" ry="24" fill="url(#gold-gradient-1)" transform="rotate(252 60 60)" opacity="0.95" />
      <ellipse cx="60" cy="36" rx="16" ry="24" fill="url(#gold-gradient-2)" transform="rotate(324 60 60)" opacity="0.95" />
    </svg>
  );
}
