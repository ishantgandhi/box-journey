const KRAFT = { top: "#E4C8A2", left: "#CFAB80", right: "#B8915F", tape: "#EFDCC0", guide: "#6B5234" };

// [x, width] of each barcode bar
const HOVER_BARS = [[88,2],[92,1],[94,3],[99,1],[102,2],[106,1],[108,3],[113,2],[117,1],[119,2],[123,3],[128,1],[130,2],[134,1],[137,3],[142,1],[145,2],[149,1],[151,3],[156,2],[160,1]];
const PLACED_BARS = [[88,2],[94,3],[102,2],[108,3],[113,2],[119,2],[123,3],[130,2],[137,3],[145,2],[151,3],[156,2]];

type Props = {
  width: number;
  height: number;
  /** false: label hovers above the box with a dashed guide where it will land */
  placed?: boolean;
  label: string;
};

export function BoxIllustration({ width, height, placed = false, label }: Props) {
  const bars = placed ? PLACED_BARS : HOVER_BARS;
  return (
    <svg width={width} height={height} viewBox="0 0 400 360" fill="none" role="img" aria-label={label} style={{ position: "relative" }}>
      <ellipse cx="200" cy="344" rx="150" ry="12" fill="#141414" fillOpacity="0.07" />
      <polygon points="200,40 360,120 200,200 40,120" fill={KRAFT.top} />
      <polygon points="40,120 200,200 200,340 40,260" fill={KRAFT.left} />
      <polygon points="200,200 360,120 360,260 200,340" fill={KRAFT.right} />
      <polygon points="107.5,73.7 132.5,86.3 292.5,166.3 267.5,153.7" fill={KRAFT.tape} />
      {!placed && (
        <g transform="matrix(1 0.5 0 1 0 0)">
          <rect x="80" y="130" width="90" height="60" rx="3" stroke={KRAFT.guide} strokeWidth="1.5" strokeDasharray="5 4" />
        </g>
      )}
      <g transform={placed ? undefined : "translate(-60 -70)"}>
        <g transform="matrix(1 0.5 0 1 0 0)">
          <rect x="80" y="130" width="90" height="60" rx="3" fill="#FFFFFF" stroke="#141414" strokeWidth="1.5" />
          <rect x="88" y="138" width="38" height="4" rx="2" fill="#141414" />
          <rect x="88" y="146" width="24" height="4" rx="2" fill="#141414" fillOpacity="0.35" />
          {bars.map(([x, w]) => (
            <rect key={x} x={x} y="156" width={w} height="26" fill="#141414" />
          ))}
        </g>
      </g>
    </svg>
  );
}
