// Flat wooden pallet sized for a row of three boxes (Box coordinates, row running up-right)
export function Pallet() {
  return (
    <>
      <polygon points="16,260 200,352 704,100 520,8" fill="#C9A77A" />
      <polygon points="16,260 200,352 200,380 16,288" fill="#A8865B" />
      <polygon points="200,352 704,100 704,128 200,380" fill="#8E6F48" />
      <path d="M78 291l0 28M139 322l0 28M330 287l0 28M500 202l0 28" stroke="#6F5536" strokeWidth="6" />
    </>
  );
}
