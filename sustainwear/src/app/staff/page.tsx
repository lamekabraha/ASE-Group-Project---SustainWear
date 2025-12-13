"use client";

import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
} from "recharts";

// ---------------- TYPES ----------------
type DashboardData = {
  totalInventory: number;
  pendingCount: number;
  distributedKg: number;
  monthlyData: {
    month: string;
    donations: number;
    distributed: number;
  }[];
};


// ---------------- COMPONENT ----------------
export default function StaffHomePage() {
  const [data, setData] = useState<DashboardData | null>(null);


  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/staff/api/dashboard");
        const json = await res.json();
        setData(json);
      } catch (err) {
  console.error("Dashboard API failed:", err);
  setData({
    totalInventory: 0,
    pendingCount: 0,
    distributedKg: 0,
    monthlyData: [], 
  });
}

    }

    load();
  }, []);

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Loading dashboard...
      </div>
    );
  }

  // ✅ PIE DATA FROM LIVE API
  const pieData = [
    { name: "Available", value: data.totalInventory },
    { name: "Pending", value: data.pendingCount },
    { name: "Distributed", value: data.distributedKg },
  ];

  const COLORS = ["#7FBF45", "#FF6B35", "#3BA9FF"];

  return (
    <section className="mx-auto max-w-7xl px-6 py-8">
      <h1 className="text-3xl font-semibold mb-6">Home</h1>

      {/* KPI CARDS */}
      <div className="grid gap-6 md:grid-cols-3 mb-8">
        <KpiCard label="Total Inventory" value={data.totalInventory + " kg"} />
        <KpiCard label="Pending Approval" value={data.pendingCount.toString()} />
        <KpiCard label="Items Distributed" value={data.distributedKg + " kg"} />
      </div>

      {/* CHARTS */}
      <div className="grid gap-6 md:grid-cols-2">

        {/* ✅ MONTHLY ACTIVITY — SAFE */}
        <Panel title="Monthly Activity">
          <LineChart width={420} height={260} data={data.monthlyData}>

            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="donations" stroke="#FF6B35" />
            <Line type="monotone" dataKey="distributed" stroke="#3BA9FF" />
          </LineChart>
        </Panel>

        
        <Panel title="Inventory Status">
          <PieChart width={340} height={260}>
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              outerRadius={90}
              label
              dataKey="value"
            >
              {pieData.map((_, i) => (
                <Cell key={i} fill={COLORS[i]} />
              ))}
            </Pie>
            <Legend />
            <Tooltip />
          </PieChart>
        </Panel>

      </div>
    </section>
  );
}

// ---------------- UI COMPONENTS ----------------

function KpiCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center gap-4 rounded-2xl border-2 border-[#BFE085] bg-white px-6 py-5">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#E3F4C5] text-[#7FBF45] text-xl font-bold">
        kg
      </div>
      <div>
        <p className="text-sm font-medium">{label}</p>
        <p className="text-3xl font-extrabold">{value}</p>
      </div>
    </div>
  );
}

function Panel({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border-2 border-[#BFE085] bg-white p-6">
      <h3 className="text-lg font-semibold mb-4">{title}</h3>
      {children}
    </div>
  );
}
