interface WaveDividerProps {
  position?: 'top' | 'bottom';
  color?: string;
  className?: string;
}

export default function WaveDivider({ 
  position = 'bottom', 
  color,
  className = '' 
}: WaveDividerProps) {
  const rotation = position === 'top' ? 'rotate-180' : '';
  
  return (
    <div className={`absolute ${position === 'top' ? 'top-0' : 'bottom-0'} left-0 right-0 w-full ${rotation} ${className}`} style={{ height: '80px', overflow: 'hidden', lineHeight: 0 }}>
      <svg 
        viewBox="0 0 1200 120" 
        preserveAspectRatio="none" 
        className="relative block w-full h-full"
        style={{ 
          fill: color || 'hsl(var(--section-warm-ivory))'
        }}
      >
        <path d="M0,0 C150,80 350,0 600,60 C850,120 1050,40 1200,60 L1200,120 L0,120 Z"></path>
      </svg>
    </div>
  );
}
