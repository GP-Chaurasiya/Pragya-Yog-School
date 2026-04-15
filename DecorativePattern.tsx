export function DecorativePattern() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden opacity-[0.03] z-0">
      {/* Top right bamboo */}
      <svg
        className="absolute -top-20 -right-20 w-96 h-96 text-[#4a7c59]"
        viewBox="0 0 200 200"
        fill="currentColor"
      >
        <path d="M100,10 L100,190 M95,30 L105,30 M93,50 L107,50 M95,70 L105,70 M93,90 L107,90 M95,110 L105,110 M93,130 L107,130 M95,150 L105,150 M93,170 L107,170" 
          stroke="currentColor" 
          strokeWidth="3" 
          fill="none"
          strokeLinecap="round"
        />
        <ellipse cx="100" cy="25" rx="25" ry="8" opacity="0.6"/>
        <ellipse cx="100" cy="60" rx="28" ry="10" opacity="0.6"/>
        <ellipse cx="100" cy="100" rx="30" ry="10" opacity="0.6"/>
        <ellipse cx="100" cy="140" rx="28" ry="10" opacity="0.6"/>
      </svg>

      {/* Bottom left lotus */}
      <svg
        className="absolute -bottom-20 -left-20 w-96 h-96 text-[#4a7c59]"
        viewBox="0 0 200 200"
        fill="currentColor"
      >
        <g transform="translate(100,100)">
          {/* Lotus petals */}
          <ellipse cx="0" cy="-30" rx="15" ry="35" opacity="0.7"/>
          <ellipse cx="26" cy="-15" rx="15" ry="35" opacity="0.7" transform="rotate(60 26 -15)"/>
          <ellipse cx="26" cy="15" rx="15" ry="35" opacity="0.7" transform="rotate(120 26 15)"/>
          <ellipse cx="0" cy="30" rx="15" ry="35" opacity="0.7" transform="rotate(180 0 30)"/>
          <ellipse cx="-26" cy="15" rx="15" ry="35" opacity="0.7" transform="rotate(240 -26 15)"/>
          <ellipse cx="-26" cy="-15" rx="15" ry="35" opacity="0.7" transform="rotate(300 -26 -15)"/>
          {/* Center */}
          <circle cx="0" cy="0" r="12" opacity="0.8"/>
        </g>
      </svg>

      {/* Top left small lotus */}
      <svg
        className="absolute top-40 left-10 w-32 h-32 text-[#6a8973]"
        viewBox="0 0 200 200"
        fill="currentColor"
      >
        <g transform="translate(100,100)">
          <ellipse cx="0" cy="-20" rx="12" ry="25" opacity="0.6"/>
          <ellipse cx="17" cy="-10" rx="12" ry="25" opacity="0.6" transform="rotate(60 17 -10)"/>
          <ellipse cx="17" cy="10" rx="12" ry="25" opacity="0.6" transform="rotate(120 17 10)"/>
          <ellipse cx="0" cy="20" rx="12" ry="25" opacity="0.6" transform="rotate(180 0 20)"/>
          <ellipse cx="-17" cy="10" rx="12" ry="25" opacity="0.6" transform="rotate(240 -17 10)"/>
          <ellipse cx="-17" cy="-10" rx="12" ry="25" opacity="0.6" transform="rotate(300 -17 -10)"/>
          <circle cx="0" cy="0" r="8" opacity="0.7"/>
        </g>
      </svg>

      {/* Bottom right bamboo leaves */}
      <svg
        className="absolute bottom-32 right-20 w-40 h-40 text-[#6a8973]"
        viewBox="0 0 200 200"
        fill="currentColor"
      >
        <ellipse cx="100" cy="80" rx="40" ry="15" opacity="0.5" transform="rotate(30 100 80)"/>
        <ellipse cx="120" cy="100" rx="35" ry="12" opacity="0.5" transform="rotate(-20 120 100)"/>
        <ellipse cx="100" cy="120" rx="38" ry="14" opacity="0.5" transform="rotate(40 100 120)"/>
      </svg>
    </div>
  );
}
