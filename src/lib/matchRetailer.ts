const normalize = (s: string) => s.toLowerCase().replace(/[^a-z0-9]/g, "");

/**
 * Forgiving substring match: case, spaces and punctuation are ignored, so "dicks"
 * matches "Dick's Sporting Goods" and "heb" matches "H-E-B".
 * Returns the [start, end) range of the match in the original name, or null.
 */
export function matchRetailer(name: string, query: string): [number, number] | null {
  const q = normalize(query);
  if (!q) return null;
  // Original index of each character that survives normalization
  const kept: number[] = [];
  for (let i = 0; i < name.length; i++) if (normalize(name[i])) kept.push(i);
  const at = normalize(name).indexOf(q);
  return at === -1 ? null : [kept[at], kept[at + q.length - 1] + 1];
}
