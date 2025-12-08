"use client";

import { SessionProvider } from "next-auth/react";

export default function StaffLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProvider>
      <div className="flex min-h-screen bg-[#1F2933] text-black">
        {/* SIDEBAR */}
        <aside className="w-64 bg-[#FF6B35] text-white flex flex-col">
          <div className="px-6 py-6 text-2xl font-bold">SustainWear</div>

          <nav className="mt-4 flex-1 space-y-3 px-4">
            <button className="w-full rounded-full py-3 bg-white text-black font-semibold">
              Home
            </button>
            <button className="w-full rounded-full py-3 hover:bg-white/10">
              Pending Donations
            </button>
            <button className="w-full rounded-full py-3 hover:bg-white/10">
              Inventory
            </button>
            <button className="w-full rounded-full py-3 hover:bg-white/10">
              Distribution
            </button>
            <button className="w-full rounded-full py-3 hover:bg-white/10">
              My Profile
            </button>
          </nav>
        </aside>

        {/* PAGE CONTENT */}
        <div className="flex-1 bg-[#F9FFF3] rounded-l-[40px] p-6 overflow-auto">
          {children}
        </div>
      </div>
    </SessionProvider>
  );
}
