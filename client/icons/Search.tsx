export function SearchIcon({color}: {color: string}) {
  return (
    <svg width="48" height="49" viewBox="0 0 48 49" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="23" cy="23.1519" r="15" stroke={color} strokeWidth="3.5"/>
      <path d="M40 40.1519L34 34.1519" stroke={color} strokeWidth="3.5" strokeLinecap="round"/>
    </svg>
  );
}