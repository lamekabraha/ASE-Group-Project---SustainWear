"use client";

import CharityStaffSidebar from "../Components/CharityStaffSidebar";

export default function StaffLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      
      {/* Staff Sidebar */}
      <CharityStaffSidebar />

      {/* Main Content */}
      <div className="flex-1 bg-white p-8 overflow-auto">
        {children}
      </div>

    </div>
  );
}
