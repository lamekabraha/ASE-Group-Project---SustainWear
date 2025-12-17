import Navbar from "./Components/Navbar"
import Link from 'next/link'
import Image from 'next/image'
import {Shirt, Recycle, Heart} from 'lucide-react'
 
export default function App() {
  return (
    <div className="relative h-screen">
      <Navbar />
      <section id="home" className="bg-orange">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-14 md:py-20">
          <div className="md:grid md:grid-cols-2 md:gap-8 md:items-center">
            <div>
              <h1 className="text-4xl md:text-4 lg:text-5xl font-semibold leading-snug text-gray">
                Give Your Clothes a <br />
                Second Life.
                <br />
                <span className="font-extrabold">Seamlessly.</span>
              </h1>

              <div className="mt-4 flex gap-3">
                <Link
                  href="auth/login"
                  className="px-4 py-1.5 rounded-md bg-[#B7F18A] text-[#0B3B24] text-sm font-semibold shadow-sm hover:opacity-90 lg:text-lg"
                >
                  Join
                </Link>
              </div>

              <div className="md:hidden flex justify-center mt-4 gap-3">
                <Image
                  src="/landing-img.jpg"
                  alt="Volunteers donating clothes"
                  width={340}
                  height={340}
                  className="md:hidden flex justify-center aspect-auto rounded-md" 
                />
              </div>
            </div>

            <div className="hidden md:flex justify-end">
              <div className="">
                <div className="w-fit">
                <Image
                    src="/landing-img.jpg"
                    alt="Volunteers donating clothes"
                    width={520}
                    height={520}
                    className="w-fill rounded-md" 
                /> 
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="mission" className="bg-white">
        <div className="max-w-6xl mx-auto px-4 md:px-6 py-10 md:py-14">
          <div className="md:grid md:grid-cols-2 md:gap-10 md:items-start">
            <div className="order-1 md:order-2">
              <div className="bg-[#4B6378] text-white rounded-3xl p-6 sm:p-8 shadow-lg max-w-[560px] mx-auto">
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
            <div className="order-2 md:order-1 mt-6 md:mt-0 flex justify-center">
              <Image
                src="/landing-img1.jpg"
                alt="Staff managing donations"
                width={360}
                height={360}
                className="rounded-md"
              />
            </div>
          </div>
        </div>
      </section>
      <section className="bg-orange py-5">
        <h2 className="text-center text-2xl font-semibold text-white">How SustainWear Works</h2>
        <div className="md:flex md:justify-center md:items-center md:mx-2 ">
          <div className="bg-navy rounded-3xl p-5 m-2 w-fit items-center space-y-2 lg:w-100">
            <div className="bg-green-200 rounded-full flex w-fit p-3 mx-auto">
              <Shirt size={60} className="text-green" />
            </div>
            <h3 className="text-white text-center font-semibold text-xl">Donate Clothes</h3>
            <p className="text-white text-center">Log and track your clothing donations through our easy-to-use platform.</p>
          </div>
          <div className="bg-navy rounded-3xl p-5 m-2 w-fit items-center space-y-2 lg:w-100">
            <div className="bg-green-200 rounded-full flex w-fit p-3 mx-auto">
              <Recycle size={60} className="text-green" />
            </div>
            <h3 className="text-white text-center font-semibold text-xl">Track Impact</h3>
            <p className="text-white text-center">See your environmental impact through metrics like CO₂ saved and landfill reduction.</p>
          </div>
          <div className="bg-navy rounded-3xl p-5 m-2 w-fit items-center space-y-2 lg:w-100">
            <div className="bg-green-200 rounded-full flex w-fit p-3 mx-auto">
              <Heart size={60} className="text-green" />
            </div>
            <h3 className="text-white text-center font-semibold text-xl">Track Impact</h3>
            <p className="text-white">Your donations directly help those in need through our network of charity partners.</p>
          </div>
        </div>
      </section>

      <footer className="bg-emerald-600 text-white text-center py-6">
        <p className="text-sm font-medium">
          © {new Date().getFullYear()} SustainWear — Promoting Sustainable Fashion
        </p>
      </footer>
    </div>
  );
}
