export function Chandelier() {
  return (
    <svg
      className="chandelier"
      viewBox="0 0 180 190"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.1"
      aria-hidden="true"
    >
      {/* ceiling rod */}
      <line x1="90" y1="0" x2="90" y2="20" />
      <path d="M84 22 L96 22 L93 30 L87 30 Z" fill="currentColor" stroke="none" opacity=".85" />

      {/* crown scrolls */}
      <path d="M90 30 C 90 42, 78 42, 74 52 C 71 60, 76 64, 82 62" />
      <path d="M90 30 C 90 42, 102 42, 106 52 C 109 60, 104 64, 98 62" />
      <path d="M90 34 C 82 44, 82 56, 90 64 C 98 56, 98 44, 90 34" />

      {/* main body scrolls */}
      <path d="M90 64 C 90 78, 64 78, 50 92 C 40 102, 44 112, 36 118" />
      <path d="M90 64 C 90 78, 116 78, 130 92 C 140 102, 136 112, 144 118" />
      <path d="M90 66 C 72 84, 70 100, 90 112 C 110 100, 108 84, 90 66" />
      <path d="M62 84 C 56 92, 58 100, 66 102" opacity=".8" />
      <path d="M118 84 C 124 92, 122 100, 114 102" opacity=".8" />

      {/* candles */}
      <g>
        {([
          [36, 118],
          [62, 96],
          [118, 96],
          [144, 118],
        ] as [number, number][]).map(([x, y], i) => (
          <g key={i}>
            <path d={`M${x - 5} ${y} L${x + 5} ${y} L${x + 3.5} ${y - 6} L${x - 3.5} ${y - 6} Z`} fill="currentColor" stroke="none" opacity=".8" />
            <rect x={x - 2.2} y={y - 28} width="4.4" height="22" fill="#F6ECD8" stroke="currentColor" strokeWidth=".7" />
            <ellipse className="flame" cx={x} cy={y - 33} rx="2.1" ry="4.6" fill="#F2C77A" stroke="none" />
          </g>
        ))}
      </g>

      {/* hanging crystals */}
      <g strokeWidth=".8">
        {([
          [36, 126, 26],
          [62, 116, 20],
          [90, 116, 34],
          [118, 116, 20],
          [144, 126, 26],
        ] as [number, number, number][]).map(([x, y, len], i) => (
          <g key={i}>
            <line x1={x} y1={y} x2={x} y2={y + len} />
            <path
              d={`M${x} ${y + len} L${x - 4} ${y + len + 6} L${x} ${y + len + 15} L${x + 4} ${y + len + 6} Z`}
              fill="currentColor"
              stroke="none"
              opacity=".55"
            />
          </g>
        ))}
      </g>

      {/* small sparkles */}
      <g fill="currentColor" stroke="none" opacity=".5">
        <circle cx="52" cy="72" r="1.2" />
        <circle cx="128" cy="72" r="1.2" />
        <circle cx="74" cy="108" r="1" />
        <circle cx="106" cy="108" r="1" />
      </g>
    </svg>
  );
}
