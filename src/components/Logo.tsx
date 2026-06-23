export function Logo({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 50"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Tooth Icon */}
      <path
        d="M25 8C25 8 20 12 18 18C16 24 14 32 14 36C14 40 16 44 20 44C24 44 26 40 26 36C26 32 28 28 30 28C32 28 34 32 34 36C34 40 36 44 40 44C44 44 46 40 46 36C46 32 44 24 42 18C40 12 35 8 35 8"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
      />
      {/* Sparkle */}
      <circle cx="30" cy="20" r="2" fill="currentColor" opacity="0.6" />
      
      {/* Text: KANSU */}
      <text
        x="55"
        y="32"
        fontFamily="system-ui, -apple-system, sans-serif"
        fontSize="22"
        fontWeight="700"
        fill="currentColor"
        letterSpacing="-0.5"
      >
        KANSU
      </text>
      
      {/* Text: DİŞ KLİNİĞİ */}
      <text
        x="55"
        y="44"
        fontFamily="system-ui, -apple-system, sans-serif"
        fontSize="9"
        fontWeight="500"
        fill="currentColor"
        opacity="0.6"
        letterSpacing="2"
      >
        DİŞ KLİNİĞİ
      </text>
    </svg>
  );
}

export function ToothIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M12 2C12 2 9 5 8 8C7 11 6 16 6 18C6 20 7 22 9 22C11 22 12 20 12 18C12 16 13 14 14 14C15 14 16 16 16 18C16 20 17 22 19 22C21 22 22 20 22 18C22 16 21 11 20 8C19 5 16 2 16 2"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}
