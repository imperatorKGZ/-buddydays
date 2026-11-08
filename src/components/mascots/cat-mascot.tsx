import type { MascotGaze } from "./hooks/use-mascot-gaze";

interface CatMascotProps {
  className?: string;
  gaze: MascotGaze;
}

export function CatMascot({ className = "", gaze }: CatMascotProps) {
  const pupils = `translate(${gaze.x * 6} ${gaze.y * 5})`;
  const head = `rotate(${gaze.x * 1.1} 120 115)`;

  return (
    <svg className={className} viewBox="0 0 240 220" role="img" aria-label="Calm illustrated cat mascot">
      <ellipse cx="120" cy="204" rx="67" ry="8" fill="#647d8b" opacity=".10" />

      <path
        className="cat-tail"
        d="M177 183 Q220 193 211 145 Q207 128 221 124"
        fill="none"
        stroke="#71889b"
        strokeWidth="12"
        strokeLinecap="round"
      />

      <g className="cat-ear cat-ear-left">
        <path d="M48 105 L35 22 Q33 8 48 19 L103 67Z" fill="#879aaa" stroke="#657b8d" strokeWidth="3" />
        <path d="M51 69 L44 36 L78 66Z" fill="#db9fa6" />
      </g>
      <g className="cat-ear cat-ear-right">
        <path d="M192 105 L205 22 Q207 8 192 19 L137 67Z" fill="#879aaa" stroke="#657b8d" strokeWidth="3" />
        <path d="M189 69 L196 36 L162 66Z" fill="#db9fa6" />
      </g>

      <g style={{ transform: head, transformOrigin: "center", transition: "transform 180ms ease-out" }}>
        <path
          d="M120 39 C65 37 36 71 39 126 C42 177 76 195 120 195 C164 195 198 177 201 126 C204 71 175 37 120 39Z"
          fill="#adbdc9"
        />
        <path
          d="M53 139 Q67 171 94 168 Q120 178 146 168 Q174 171 187 139 Q180 184 120 189 Q60 184 53 139Z"
          fill="#dbe1e7"
        />
        <path
          d="M66 84 Q84 73 101 84 M139 84 Q156 73 174 84"
          fill="none"
          stroke="#91a6b4"
          strokeWidth="4"
          strokeLinecap="round"
          opacity=".7"
        />

        <g className="mascot-eye mascot-eye-left cat-eye">
          <ellipse cx="85" cy="108" rx="14" ry="18" fill="#f5f1db" />
          <g transform={pupils}>
            <ellipse cx="86" cy="108" rx="5" ry="12" fill="#405a52" />
            <circle cx="89" cy="102" r="2.5" fill="white" />
          </g>
        </g>
        <g className="mascot-eye mascot-eye-right cat-eye">
          <ellipse cx="155" cy="108" rx="14" ry="18" fill="#f5f1db" />
          <g transform={pupils}>
            <ellipse cx="154" cy="108" rx="5" ry="12" fill="#405a52" />
            <circle cx="157" cy="102" r="2.5" fill="white" />
          </g>
        </g>

        <ellipse cx="120" cy="147" rx="29" ry="21" fill="#e8dfe0" />
        <path d="M111 140 L129 140 L120 150Z" fill="#c78091" />
        <path
          d="M120 150 Q114 160 105 155 M120 150 Q126 160 135 155"
          fill="none"
          stroke="#586c7b"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <g fill="none" stroke="#647887" strokeWidth="2" strokeLinecap="round">
          <path d="M92 144 L35 136 M93 152 L39 158 M148 144 L205 136 M147 152 L201 158" />
        </g>
      </g>
    </svg>
  );
}
