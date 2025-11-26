"use client";

import Link from "next/link";
import AdminSidebar from "../Components/AdminSidebar";
export default function Layout({ children }: { children: React.ReactNode }) {

    return(
        <main className="flex h-screen overflow-hidden">
            <AdminSidebar />
            <div className="flex-1 overflow-y-auto">
                {children}
            </div>
        </main>
    )
}
