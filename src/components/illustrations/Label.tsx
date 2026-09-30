// Shipping label drawn onto the box's left face, in Box coordinates

const BARS = [[88, 2], [94, 3], [102, 2], [108, 3], [113, 2], [119, 2], [123, 3], [130, 2], [137, 3], [145, 2], [151, 3], [156, 2]];
const LEFT_FACE = "matrix(1 0.5 0 1 0 0)";

export function Label() {
  return (
    <g transform={LEFT_FACE}>
      <rect x="80" y="130" width="90" height="60" rx="3" fill="#FFFFFF" stroke="#141414" strokeWidth="1.5" />
      <rect x="88" y="138" width="38" height="4" rx="2" fill="#141414" />
      <rect x="88" y="146" width="24" height="4" rx="2" fill="#141414" fillOpacity="0.35" />
      {BARS.map(([x, w]) => (
        <rect key={x} x={x} y="156" width={w} height="26" fill="#141414" />
      ))}
    </g>
  );
}

/** Dashed outline showing where the label goes */
export function LabelGuide() {
  return (
    <g transform={LEFT_FACE}>
      <rect x="80" y="130" width="90" height="60" rx="3" stroke="#6B5234" strokeWidth="2" strokeDasharray="6 5" />
    </g>
  );
}
