"use client";

import Link from "next/link";
import DonorSidebar from "../Components/DonorSidebar";

// I added 'modal' to the props here so the {modal} inside the return works
export default function Layout({ 
  children, 
  modal 
}: { 
  children: React.ReactNode;
  modal: React.ReactNode; 
}) {
    return (
        <main className="flex h-screen overflow-hidden">
            <DonorSidebar />
            <div className="flex-1 overflow-y-auto">
                {children}
            </div>
            {modal}
        </main>
    );
}