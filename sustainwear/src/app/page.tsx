import Navbar from "./Components/Navbar"

export default function App() {
  return (
    <>
      {/* Header*/}
      <Navbar />

      {/* */}
      <section id="home" className="bg-[#FF6A3D]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-14 md:py-20">
          {/* Desktop */}
          <div className="md:grid md:grid-cols-2 md:gap-12 md:items-center">
            {/* Left: headline buttons */}
            <div>
              <h1 className="text-[26px] sm:text-[32px] md:text-[40px] font-semibold leading-snug text-[#2B2B2B]">
                Give Your Clothes a <br />
                Second Life.
                <br />
                <span className="font-extrabold">Seamlessly.</span>
              </h1>

              {/* Buttons mobile */}
              <div className="mt-4 flex gap-3">
                <a
                  id="join"
                  href="#mission"
                  className="px-4 py-1.5 rounded-md bg-[#B7F18A] text-[#0B3B24] text-sm font-semibold shadow-sm hover:opacity-90"
                >
                  Join
                </a>
                <a
                  href="#mission"
                  className="px-4 py-1.5 rounded-md border border-[#FFD1B9] text-[#2B2B2B] text-sm font-semibold hover:bg-[#FFD1B9]/20"
                >
                  Learn More
                </a>
              </div>

              {/* image under text  */}
              <div className="mt-6 md:hidden flex justify-center">
                <div className="w-[260px] rounded-md border-[6px] border-[#D3E6F2] bg-white shadow p-2">
                  <div className="aspect-[4/3] w-full">
                    {/* Replacelater   /> */}
                    <svg viewBox="0 0 400 300" className="w-full h-full" aria-hidden="true">
                      <rect width="400" height="300" fill="#e5e7eb" />
                      <circle cx="345" cy="60" r="12" fill="#d1d5db" />
                      <polygon points="60,220 170,140 240,200 300,160 360,230 40,230" fill="#cfd4da" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* web right image ( */}
            <div className="hidden md:flex justify-end">
              <div className="w-[420px] max-w-full rounded-md border-[6px] border-[#D3E6F2] bg-white shadow p-2">
                <div className="aspect-[4/3] w-full">
                  <svg viewBox="0 0 400 300" className="w-full h-full" aria-hidden="true">
                    <rect width="400" height="300" fill="#e5e7eb" />
                    <circle cx="345" cy="60" r="12" fill="#d1d5db" />
                    <polygon points="60,220 170,140 240,200 300,160 360,230 40,230" fill="#cfd4da" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: IMAGE + MISSION */}
      <section id="mission" className="bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
          {/* image left, mission right). Mobile*/}
          <div className="md:grid md:grid-cols-2 md:gap-10 md:items-start">
            {/*mobile */}
            <div className="order-1 md:order-2">
              <div className="bg-[#4B6378] text-white rounded-[22px] p-6 sm:p-8 shadow-lg max-w-[560px] mx-auto">
                <h2 className="text-center text-base sm:text-lg md:text-2xl font-semibold">
                  The SustainWear Mission
                </h2>
                <p className="mt-2 text-gray-100 text-sm sm:text-base leading-relaxed text-center">
                  At SustainWear, we believe fashion can be both stylish and sustainable.
                  We reduce clothing waste by promoting donations, recycling, and
                  conscious choices. Together, we give every garment a second life.
                </p>
              </div>
            </div>

            {/* one mob one web */}
            <div className="order-2 md:order-1 mt-6 md:mt-0">
              <div className="max-w-[360px] md:max-w-[440px] mx-auto rounded-md border-[6px] border-gray-300 bg-white shadow p-2">
                <div className="aspect-[4/3] w-full">
                  {/* need replacing */}
                  <svg viewBox="0 0 400 300" className="w-full h-full" aria-hidden="true">
                    <rect width="400" height="300" fill="#e5e7eb" />
                    <circle cx="345" cy="60" r="12" fill="#d1d5db" />
                    <polygon points="60,220 170,140 240,200 300,160 360,230 40,230" fill="#cfd4da" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/*footer*/}
      <footer className="bg-emerald-600 text-white text-center py-6">
        <p className="text-sm font-medium">
          © {new Date().getFullYear()} SustainWear — Promoting Sustainable Fashion
        </p>
      </footer>
    </>
  );
}
