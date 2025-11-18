import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route"; 
import { redirect } from "next/navigation";
import React from "react";
import DonorSidebar from "../Components/DonorSidebar"; 

export default async function DonorLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== "Donor") {
        redirect("/auth/login");
    }

    return(
        <main className="flex h-screen overflow-hidden">
            <DonorSidebar />
            <div className="flex-1 overflow-y-auto">
                {children}
            </div>
        </main>
    )
}