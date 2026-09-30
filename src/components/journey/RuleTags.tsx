export const RULES = ["Label placement", "Carton weight", "SKU rules"];

// Scene-space position and width of each tag around the box
const PLACES = [
  { x: 18, y: 118, w: 142 },
  { x: 322, y: 92, w: 130 },
  { x: 338, y: 262, w: 104 },
];

/** Small white rule tags that pop in around the box. Animated by Stage via the class names. */
export function RuleTags() {
  return (
    <g className="max-lg:hidden">
      {RULES.map((rule, i) => {
        const { x, y, w } = PLACES[i];
        return (
          <g key={rule} transform={`translate(${x} ${y})`}>
            <g className="st-tag" opacity="0">
              <rect width={w} height="30" rx="8" fill="#FFFFFF" stroke="#E6E2DC" />
              <text x="12" y="19.5" fontSize="12" fill="#141414" style={{ fontFamily: "var(--font-body)" }}>
                {rule}
              </text>
              <g className="st-tag-check" opacity="0">
                <circle cx={w - 16} cy="15" r="8" fill="#1F8A4C" />
                <path d={`M${w - 19.5} 15.2l2.4 2.4 4.6-5`} stroke="#FFFFFF" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round" />
              </g>
            </g>
          </g>
        );
      })}
    </g>
  );
}
