"use client";

import Link from "next/link";
import CharityStaffSidebar from "../Components/CharityStaffSidebar";

export default function Layout({ children }: { children: React.ReactNode }) {

    return(
        <main className="flex h-screen overflow-hidden">
            <CharityStaffSidebar />
            <div className="flex-1 overflow-y-auto">
                {children}
            </div>
        </main>
    )
}
