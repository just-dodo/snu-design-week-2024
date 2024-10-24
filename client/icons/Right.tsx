export function Right({ color }: { color: string }) {
  return (
    <svg
      width="101"
      height="101"
      viewBox="0 0 101 101"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M36.8457 25.2056L63.0957 50.2056L36.8457 75.2056"
        stroke={color ?? "#E22613"}
        stroke-width="2"
      />
    </svg>
  );
}
