"use client";

import DonorSidebar from "../Components/DonorSidebar";

export default async function Layout({ 
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
            {}
            {modal}
        </main>
    );
}