"use client";

import React from "react";
import { useSession } from "next-auth/react";
import { Users, Heart, Package, Truck } from 'lucide-react';

// --- Components ---

// 1. KPI Card (Green Border Style)
const KpiCard = ({ title, value, subtext, icon }: any) => (
  <div className="bg-white p-6 rounded-xl border-2 border-[#BFE085] shadow-sm flex items-start justify-between">
    <div>
      <p className="text-gray-500 text-sm font-medium uppercase tracking-wide">{title}</p>
      <h3 className="text-3xl font-bold text-gray-800 mt-2">{value}</h3>
      <p className="text-sm text-green-600 mt-2 font-medium">{subtext}</p>
    </div>
    <div className="p-3 bg-[#f0fdf4] text-green-600 rounded-lg">
      {icon}
    </div>
  </div>
);

// 2. Simple Line Chart (Visual Only - No libraries needed)
const ActivityChart = () => (
  <div className="bg-white p-6 rounded-xl border-2 border-[#BFE085] shadow-sm h-full">
    <h3 className="text-lg font-bold text-gray-800 mb-6">Monthly Activity</h3>
    <div className="relative h-48 w-full border-l border-b border-gray-200">
      {/* Grid Lines */}
      {[0, 1, 2, 3].map((i) => (
        <div key={i} className="absolute w-full border-t border-gray-100 border-dashed" style={{ bottom: `${i * 33}%` }}></div>
      ))}
      
      {/* Green Line (Activity) */}
      <svg className="absolute inset-0 h-full w-full" preserveAspectRatio="none">
        <polyline
          fill="none"
          stroke="#84cc16" // Lime-500
          strokeWidth="3"
          points="0,150 100,120 200,80 300,100 400,60 500,40 600,20"
        />
        {/* Gradient Fill under line */}
        <polygon 
           fill="#ecfccb" // Lime-100
           opacity="0.5"
           points="0,200 0,150 100,120 200,80 300,100 400,60 500,40 600,20 600,200"
        />
      </svg>
      
      {/* Labels */}
      <div className="absolute -bottom-6 left-0 right-0 flex justify-between text-xs text-gray-400">
        <span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span>
      </div>
    </div>
  </div>
);

// 3. Simple Donut Chart (CSS Only)
const InventoryChart = () => (
  <div className="bg-white p-6 rounded-xl border-2 border-[#BFE085] shadow-sm h-full">
    <h3 className="text-lg font-bold text-gray-800 mb-6">Inventory Status</h3>
    <div className="flex flex-col items-center justify-center">
      {/* Conic Gradient for Pie Chart */}
      <div className="relative w-40 h-40 rounded-full"
           style={{ background: 'conic-gradient(#84cc16 0% 40%, #facc15 40% 70%, #f87171 70% 100%)' }}>
        {/* White center to make it a donut */}
        <div className="absolute inset-0 m-auto w-24 h-24 bg-white rounded-full flex items-center justify-center">
          <span className="text-xl font-bold text-gray-700">Total<br/>100%</span>
        </div>
      </div>
      
      {/* Legend */}
      <div className="mt-6 w-full space-y-2">
        <div className="flex items-center justify-between text-sm">
          <span className="flex items-center text-gray-600"><span className="w-3 h-3 bg-lime-500 rounded-full mr-2"></span>Available</span>
          <span className="font-bold">40%</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="flex items-center text-gray-600"><span className="w-3 h-3 bg-yellow-400 rounded-full mr-2"></span>Pending</span>
          <span className="font-bold">30%</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="flex items-center text-gray-600"><span className="w-3 h-3 bg-red-400 rounded-full mr-2"></span>Distributed</span>
          <span className="font-bold">30%</span>
        </div>
      </div>
    </div>
  </div>
);

export default function AdminHomePage() {
  const { data: session } = useSession();
  
  // Safe name fallback
  const firstName = session?.user?.name || "Admin";

  return (
    <section className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Dashboard Overview</h1>

      {/* 1. Welcome Card - Matches 'My Impact' style */}
      <div className="bg-white p-6 rounded-xl border-2 border-[#BFE085] shadow-sm mb-8">
        <h2 className="text-2xl font-bold text-gray-800">
          Welcome Back, {firstName}!
        </h2>
        <p className="mt-2 text-gray-600 max-w-2xl">
          Hello Admin, here is your overview
        </p>
      </div>

      {}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <KpiCard title="Total Users" value="155" subtext="+12 this week" icon={<Users size={24} />} />
        <KpiCard title="Charities" value="30" subtext="Active Partners" icon={<Heart size={24} />} />
        <KpiCard title="Total Donations" value="546" subtext="Items processed" icon={<Package size={24} />} />
        <KpiCard title="Distributed" value="423" subtext="Items delivered" icon={<Truck size={24} />} />
      </div>

      {/* 3. Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Chart takes up 2 columns */}
        <div className="lg:col-span-2">
          <ActivityChart />
        </div>
        {/* Side Pie Chart takes up 1 column */}
        <div className="lg:col-span-1">
          <InventoryChart />
        </div>
      </div>
    </section>
  );
}