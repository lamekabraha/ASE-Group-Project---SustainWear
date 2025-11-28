"use client";

import Link from "next/link";
import DonorSidebar from "../Components/DonorSidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#F5F5F5] flex">
      <DonorSidebar/> 
      <main className="flex-1 px-12 py-10">
        {children}
      </main>
    </div>
  )
}
