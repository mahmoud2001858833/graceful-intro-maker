export function Curtains() {
  return (
    <svg
      className="curtain-svg"
      viewBox="0 0 500 340"
      preserveAspectRatio="none"
      fill="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="curtGrad" x1="0" y1="0" x2="1" y2="0.4">
          <stop offset="0%" stopColor="#F3EDE1" />
          <stop offset="35%" stopColor="#FFFFFF" />
          <stop offset="70%" stopColor="#F7F2E7" />
          <stop offset="100%" stopColor="#E7DCC4" />
        </linearGradient>
        <linearGradient id="curtGradR" x1="1" y1="0" x2="0" y2="0.4">
          <stop offset="0%" stopColor="#F3EDE1" />
          <stop offset="35%" stopColor="#FFFFFF" />
          <stop offset="70%" stopColor="#F7F2E7" />
          <stop offset="100%" stopColor="#E7DCC4" />
        </linearGradient>
        <linearGradient id="swagGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="100%" stopColor="#F0E7D4" />
        </linearGradient>
        <radialGradient id="beadGrad" cx="0.35" cy="0.3" r="0.75">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="60%" stopColor="#F6EEDB" />
          <stop offset="100%" stopColor="#D9BE86" />
        </radialGradient>
      </defs>

      {/* left panel */}
      <path
        d="M0 0 L152 0 L152 62 C 126 122, 104 176, 52 286 C 34 306, 16 320, 0 328 Z"
        fill="url(#curtGrad)"
      />
      {/* right panel */}
      <path
        d="M500 0 L348 0 L348 62 C 374 122, 396 176, 448 286 C 466 306, 484 320, 500 328 Z"
        fill="url(#curtGradR)"
      />

      {/* deep pleat shading */}
      <g opacity=".38">
        <path d="M18 0 C 44 80, 30 180, 8 274 L0 268 L0 0 Z" fill="#E4D6B8" />
        <path d="M52 0 C 74 80, 58 180, 36 282 L26 276 C 48 176, 62 78, 42 0 Z" fill="#E2D3B4" />
        <path d="M92 0 C 104 78, 88 172, 66 280 L56 274 C 80 172, 92 76, 82 0 Z" fill="#E9DCC2" />
        <path d="M126 0 C 132 74, 116 164, 96 268 L86 262 C 108 162, 120 72, 116 0 Z" fill="#EEE3CD" />
        <path d="M482 0 C 456 80, 470 180, 492 274 L500 268 L500 0 Z" fill="#E4D6B8" />
        <path d="M448 0 C 426 80, 442 180, 464 282 L474 276 C 452 176, 438 78, 458 0 Z" fill="#E2D3B4" />
        <path d="M408 0 C 396 78, 412 172, 434 280 L444 274 C 420 172, 408 76, 418 0 Z" fill="#E9DCC2" />
        <path d="M374 0 C 368 74, 384 164, 404 268 L414 262 C 392 162, 380 72, 384 0 Z" fill="#EEE3CD" />
      </g>

      {/* highlight sheen */}
      <g opacity=".55">
        <path d="M34 0 C 58 80, 44 180, 22 276 L28 278 C 52 182, 66 80, 42 0 Z" fill="#FFFFFF" />
        <path d="M110 0 C 118 76, 102 168, 80 272 L86 274 C 108 170, 126 76, 118 0 Z" fill="#FFFFFF" />
        <path d="M466 0 C 442 80, 456 180, 478 276 L472 278 C 448 182, 434 80, 458 0 Z" fill="#FFFFFF" />
        <path d="M390 0 C 382 76, 398 168, 420 272 L414 274 C 392 170, 374 76, 382 0 Z" fill="#FFFFFF" />
      </g>

      {/* crystal beading along the inner edge of each panel */}
      <g>
        {([
          [152, 62],
          [146, 82],
          [139, 102],
          [131, 124],
          [122, 148],
          [112, 172],
          [101, 196],
          [89, 220],
          [76, 244],
          [62, 268],
          [46, 292],
        ] as [number, number][]).map(([x, y], i) => (
          <g key={`bl-${i}`}>
            <circle cx={x} cy={y} r={4.6 - i * 0.12} fill="url(#beadGrad)" />
            <circle cx={x - 1.2} cy={y - 1.4} r="1.1" fill="#FFFFFF" opacity=".9" />
          </g>
        ))}
        {([
          [348, 62],
          [354, 82],
          [361, 102],
          [369, 124],
          [378, 148],
          [388, 172],
          [399, 196],
          [411, 220],
          [424, 244],
          [438, 268],
          [454, 292],
        ] as [number, number][]).map(([x, y], i) => (
          <g key={`br-${i}`}>
            <circle cx={x} cy={y} r={4.6 - i * 0.12} fill="url(#beadGrad)" />
            <circle cx={x - 1.2} cy={y - 1.4} r="1.1" fill="#FFFFFF" opacity=".9" />
          </g>
        ))}
      </g>

      {/* top swag valance */}
      <path
        d="M152 0 L152 34 C 186 76, 214 98, 240 104 C 248 106, 250 112, 250 120 C 250 112, 252 106, 260 104 C 286 98, 314 76, 348 34 L348 0 Z"
        fill="url(#swagGrad)"
      />
      <path
        d="M152 34 C 186 76, 214 98, 240 104"
        stroke="#C9A227"
        strokeWidth="1"
        opacity=".45"
      />
      <path
        d="M348 34 C 314 76, 286 98, 260 104"
        stroke="#C9A227"
        strokeWidth="1"
        opacity=".45"
      />

      {/* crystal fringe along the valance */}
      <g>
        {([
          [168, 20],
          [182, 38],
          [197, 55],
          [214, 71],
          [232, 85],
          [332, 20],
          [318, 38],
          [303, 55],
          [286, 71],
          [268, 85],
        ] as [number, number][]).map(([x, y], i) => (
          <g key={`v-${i}`}>
            <circle cx={x} cy={y} r="4.2" fill="url(#beadGrad)" />
            <circle cx={x - 1} cy={y - 1.2} r="1" fill="#FFFFFF" opacity=".9" />
          </g>
        ))}
      </g>

      {/* center tassel */}
      <line x1="250" y1="120" x2="250" y2="142" stroke="#C9A227" strokeWidth="1" opacity=".7" />
      <circle cx="250" cy="147" r="5" fill="url(#beadGrad)" />
      <path
        d="M244 152 L244 168 M250 153 L250 172 M256 152 L256 168"
        stroke="#C9A227"
        strokeWidth="1"
        strokeLinecap="round"
        opacity=".7"
      />
    </svg>
  );
}
