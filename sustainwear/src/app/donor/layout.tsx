"use client";

import Link from "next/link";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#F5F5F5] flex">

      {/* LEFT ORANGE SIDEBAR */}
     <aside className="bg-[#FF6A3D] min-h-screen w-[260px] px-6 py-10 rounded-bl-[160px] flex flex-col gap-6">

  <NavButton href="/donor" active={true}>Home</NavButton>

  <NavButton href="/donor/new-donation">
    New Donation
  </NavButton>

  <NavButton href="/donor/donation-history">
    Donation History
  </NavButton>

  <NavButton href="/donor/my-impact">
    My Impact
  </NavButton>

  <NavButton href="/donor/profile">
    My Profile
  </NavButton>

</aside>

      {/* MAIN PAGE CONTENT */}
      <main className="flex-1 px-12 py-10">
        {children}
      </main>

    </div>
  );
}

/* Sidebar Button Component */
function NavButton({
  href,
  children,
  active = false,
}: {
  href: string;
  children: React.ReactNode;
  active?: boolean;
}) {
  return (
    <Link
      href={href}
      className={[
        "w-full text-center py-3 rounded-full text-[15px] font-medium border transition",
        active
          ? "bg-[#4B6378] text-white border-transparent shadow"
          : "bg-[#FFA47F] border-[#D97745] text-black hover:bg-[#ff946b]"
      ].join(" ")}
    >
      {children}
    </Link>
  );
}
