"use client";

import { useEffect, useState } from "react";
import { Home, ClipboardList, Truck } from 'lucide-react'; 
import { useSession } from "next-auth/react"; 

type DashboardData = {
  totalInventory: number;
  pendingCount: number;
  distributedKg: number;
};

export default function StaffHomePage() {
  const [data, setData] = useState<DashboardData | null>(null);
  const { data: session } = useSession(); 

  const firstName = session?.user?.name || "Staff Member"; 

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/staff/dashboard");
        if (res.ok) {
          const json = await res.json();
          setData(json);
        }
      } catch (error) {
        console.error("Failed to load dashboard data", error);
      }
    }
    load();
  }, []);

  if (!data) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-20 text-center text-xl text-gray-500">
        Loading dashboard...
      </div>
    );
  }

  const formatKg = (v: number) =>
    Number.isNaN(v) ? "0" : v % 1 === 0 ? v.toString() : v.toFixed(1);

  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 py-8">
      <h1 className="text-[34px] font-semibold text-[#2B2B2B]">Home</h1>

      <div className="border-2 border-[#BFE085] bg-white rounded-2xl p-6 mt-5 mb-8">
        <h2 className="text-2xl font-bold text-gray-800">
          Welcome Back, {firstName}!
        </h2>
        <p className="mt-2 text-gray-600">
          You’re the reason we can tackle textile waste! Your contributions are
          helping us build a circular economy, one garment at a time.
        </p>
      </div>

      <div className="mt-6 space-y-8">
        {/* KPI Cards Grid */}
        <div className="grid gap-6 md:grid-cols-3">
          <KpiCard 
            icon={<Home size={28} />} 
            label="Total Inventory" 
            value={formatKg(data.totalInventory) + " Kg"} 
          />
          <KpiCard 
            icon={<ClipboardList size={28} />} 
            label="Pending Donations" 
            value={data.pendingCount.toString()} 
          />
          <KpiCard 
            icon={<Truck size={28} />} 
            label="Items Distributed" 
            value={formatKg(data.distributedKg) + " Kg"} 
          />
        </div>

        {/* Charts Grid */}
        <div className="grid gap-6 md:grid-cols-2">
          <Panel title="Monthly Activity">
             <div className="flex items-center justify-center h-40 text-gray-400 italic bg-gray-50 rounded-lg border border-dashed border-gray-200">
                Chart coming soon...
             </div>
          </Panel>
          <Panel title="Inventory Status">
             <div className="flex items-center justify-center h-40 text-gray-400 italic bg-gray-50 rounded-lg border border-dashed border-gray-200">
                Pie chart coming soon...
             </div>
          </Panel>
        </div>
      </div>
    </section>
  );
}

function KpiCard({ icon, label, value }: { icon: React.ReactNode, label: string; value: string }) {
  return (
    <div className="flex items-center gap-4 rounded-[18px] border-2 border-[#BFE085] bg-white px-6 py-5 shadow-sm">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#E3F4C5] text-[#7FBF45]">
        {icon}
      </div>
      <div>
        <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">{label}</p>
        <p className="text-3xl font-extrabold text-gray-800">{value}</p>
      </div>
    </div>
  );
}

function Panel({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-[18px] border-2 border-[#BFE085] bg-white p-6 h-full shadow-sm">
      <h3 className="text-[20px] font-semibold mb-4 text-gray-800">{title}</h3>
      {children}
    </div>
  );
}