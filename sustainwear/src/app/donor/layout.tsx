
import React from "react"
import DonorSidebar from "../Components/DonorSidebar";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";


export default async function Layout({ 
  children, 
  modal 
}: { 
  children: React.ReactNode;
  modal: React.ReactNode; 
}) {
  const session = await getServerSession(authOptions);
  const donorRole = session?.user?.role;

  if (donorRole !== "Donor"){
    redirect("/auth/login");
  }



    return (
        <main className="flex h-screen overflow-hidden">
            <DonorSidebar />
            <div className="flex-1 overflow-y-auto">
                {children}
            </div>
            {}
            {modal}
        </main>
    );
}