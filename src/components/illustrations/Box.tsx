/**
 * Isometric kraft box drawn in a 400x360 space (the same geometry as the hero box).
 * Faces meet at (200,200); one box step along the right-hand edge is (160, -80),
 * along the left-hand edge (160, 80), and one box up is (0, -140).
 */
export type BoxTone = { top: string; left: string; right: string; tape: string };

export const KRAFT_TONES: BoxTone[] = [
  { top: "#E4C8A2", left: "#CFAB80", right: "#B8915F", tape: "#EFDCC0" },
  { top: "#EDD6B4", left: "#D9B78D", right: "#C29C6C", tape: "#F5E6CF" },
  { top: "#D8B78C", left: "#C29A6B", right: "#A98050", tape: "#E6CCA8" },
];

export function Box({ tone = KRAFT_TONES[0] }: { tone?: BoxTone }) {
  return (
    <>
      <polygon points="200,40 360,120 200,200 40,120" fill={tone.top} />
      <polygon points="40,120 200,200 200,340 40,260" fill={tone.left} />
      <polygon points="200,200 360,120 360,260 200,340" fill={tone.right} />
      <polygon points="107.5,73.7 132.5,86.3 292.5,166.3 267.5,153.7" fill={tone.tape} />
    </>
  );
}
