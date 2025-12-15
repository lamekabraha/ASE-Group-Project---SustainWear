import Link from 'next/link';

export default function Navbar() {
  return (
    <header className="bg-[#F8F7F3] text-[#0B3B24] border-b border-[#E7E7E2]">
      <div className="mx-auto max-w-6xl h-14 flex items-center justify-between px-4">
        <div>
          <span className="text-2xl font-extrabold leading-none">Sustain</span>
          <span className="text-2xl font-semibold leading-none">Wear</span>
        </div>
        <nav className="ites-center gap-8 text-base font-medium">
          <Link href="auth/register" className="hover:text-[#14532D] px-2">Sign Up</Link>
          <Link href="/auth/login" className="hover:text-[#14532D] px-2">Sign In</Link>
        </nav>
      </div>
    </header>
  );
}
