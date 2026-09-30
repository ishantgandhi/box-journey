export function Logo({ size, stroke }: { size: number; stroke: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M10 2l7 3.5L10 9 3 5.5z" fill="#E4C8A2" />
      <path d="M10 2l7 3.5v9L10 18l-7-3.5v-9z" stroke={stroke} strokeWidth="1.4" strokeLinejoin="round" />
      <path d="M3 5.5L10 9l7-3.5M10 9v9" stroke={stroke} strokeWidth="1.4" strokeLinejoin="round" />
    </svg>
  );
}
