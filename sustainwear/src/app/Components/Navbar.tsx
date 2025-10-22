export default function Navbar() {
  return (
    <header className="bg-[#F8F7F3] text-[#0B3B24] border-b border-[#E7E7E2]">
      <div className="mx-auto max-w-6xl h-14 flex items-center justify-between px-4">
        {/* Brand */}
        <a href="#home" className="inline-flex items-baseline gap-1" aria-label="SustainWear home">
          <span className="text-2xl font-extrabold leading-none">Sustain</span>
          <span className="text-2xl font-semibold leading-none">Wear</span>
        </a>

        {/* Links*/}
        <nav className="hidden sm:flex items-center gap-8 text-base font-medium">
          <a href="#donate" className="hover:text-[#14532D]">Donate</a>
          <a href="#how" className="hover:text-[#14532D]">How it Works</a>
          <a href="#signin" className="hover:text-[#14532D]">Sign In</a>
        </nav>
      </div>
    </header>
  );
}
