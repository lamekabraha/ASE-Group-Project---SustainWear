import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route"; 
import { redirect } from "next/navigation";
import React from "react";

export default async function DonorLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    // const session = await getServerSession(authOptions);

    // if (!session) {
    //     redirect("/auth/login");
    // }

    return(
        <main className="flex ">
            <div className="bg-orange w-1/5 h-screen">
                <h1>Sidebar</h1>
            </div>
            <div className="w-4/5">
                {children}
            </div>
        </main>
    )
}