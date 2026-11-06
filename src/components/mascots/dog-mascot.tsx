import type { MascotGaze } from "./hooks/use-mascot-gaze";

interface DogMascotProps {
  className?: string;
  gaze: MascotGaze;
}

export function DogMascot({ className = "", gaze }: DogMascotProps) {
  const pupils = `translate(${gaze.x * 6} ${gaze.y * 5})`;
  const head = `rotate(${gaze.x * 1.7} 120 115)`;

  return (
    <svg
      className={className}
      viewBox="0 0 240 220"
      role="img"
      aria-label="Friendly illustrated dog mascot"
    >
      <ellipse cx="120" cy="204" rx="67" ry="8" fill="#8c7662" opacity=".10" />

      <path
        className="dog-tail"
        d="M177 164 C210 181 231 159 231 137 C231 122 223 114 212 116"
        fill="none"
        stroke="#956044"
        strokeWidth="13"
        strokeLinecap="round"
      />

      <g className="dog-ear dog-ear-left">
        <path d="M65 66 C22 34 19 94 43 145 Q57 165 83 126Z" fill="#956044" />
        <path d="M62 80 Q37 74 49 126 Q59 142 70 124Z" fill="#bd8061" />
      </g>
      <g className="dog-ear dog-ear-right">
        <path d="M175 66 C218 34 221 94 197 145 Q183 165 157 126Z" fill="#956044" />
        <path d="M178 80 Q203 74 191 126 Q181 142 170 124Z" fill="#bd8061" />
      </g>

      <g style={{ transform: head, transformOrigin: "center", transition: "transform 180ms ease-out" }}>
        <path
          d="M120 35 C65 35 36 67 39 123 C42 179 76 195 120 195 C164 195 198 179 201 123 C204 67 175 35 120 35Z"
          fill="#d9a77e"
        />
        <path d="M65 83 Q84 68 102 80" fill="none" stroke="#bd8c68" strokeWidth="4" strokeLinecap="round" opacity=".65" />
        <path d="M138 80 Q156 68 175 83" fill="none" stroke="#bd8c68" strokeWidth="4" strokeLinecap="round" opacity=".65" />

        <path
          d="M53 122 Q52 169 120 176 Q188 169 187 122 Q168 151 120 149 Q72 151 53 122Z"
          fill="#eccdb0"
        />

        <g className="mascot-eye mascot-eye-left">
          <ellipse cx="86" cy="105" rx="13" ry="16" fill="#fff7ec" />
          <g transform={pupils}>
            <ellipse cx="89" cy="106" rx="6" ry="9" fill="#49382d" />
            <circle cx="91" cy="102" r="2.4" fill="white" />
          </g>
        </g>
        <g className="mascot-eye mascot-eye-right">
          <ellipse cx="154" cy="105" rx="13" ry="16" fill="#fff7ec" />
          <g transform={pupils}>
            <ellipse cx="151" cy="106" rx="6" ry="9" fill="#49382d" />
            <circle cx="153" cy="102" r="2.4" fill="white" />
          </g>
        </g>

        <ellipse cx="120" cy="143" rx="29" ry="22" fill="#f4dfca" />
        <path d="M108 132 Q120 121 132 132 Q132 145 120 145 Q108 145 108 132Z" fill="#49382d" />
        <path
          d="M120 144 Q115 157 102 153 M120 144 Q125 157 138 153"
          fill="none"
          stroke="#654535"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <g className="dog-tongue">
          <path d="M109 155 Q120 151 131 155 L129 170 Q120 181 111 170Z" fill="#e77c8b" />
          <path d="M120 158 L120 170" stroke="#c85f70" strokeWidth="1.5" />
        </g>
      </g>
    </svg>
  );
}
