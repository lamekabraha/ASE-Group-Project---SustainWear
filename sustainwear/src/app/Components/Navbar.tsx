import Link from 'next/link';

export default function Navbar() {
  return (
    <header className="bg-[#F8F7F3] text-[#0B3B24] border-b border-[#E7E7E2]">
      <div className="mx-auto max-w-6xl h-14 flex items-center justify-between px-4">
        {/* Brand */}
        <Link href="#home" className="inline-flex items-baseline gap-1" aria-label="SustainWear home">
          <span className="text-2xl font-extrabold leading-none">Sustain</span>
          <span className="text-2xl font-semibold leading-none">Wear</span>
        </Link>

        {/* Links*/}
        <nav className="hidden sm:flex items-center gap-8 text-base font-medium">
          <Link href="#donate" className="hover:text-[#14532D]">Donate</Link>
          <Link href="#how" className="hover:text-[#14532D]">How it Works</Link>
          <Link href="/auth/login" className="hover:text-[#14532D]">Sign In</Link>
        </nav>
      </div>
    </header>
  );
}
