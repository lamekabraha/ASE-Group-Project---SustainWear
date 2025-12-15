"use client";

import { useEffect, useState } from "react";
import { Home, PlusCircle, History, Leaf, User } from 'lucide-react';
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";

type DashboardData = {
  totalInventory: number;
  pendingCount: number;
  distributedKg: number;
};

export default function StaffHomePage() {
  const [data, setData] = useState<DashboardData | null>(null);
  const session =  getServerSession(authOptions)

  const firstName = session?.user?.firstName;list

  useEffect(() => {
    async function load() {
      const res = await fetch("/api/staff/dashboard");
      const json = await res.json();
      setData(json);
    }
    load();
  }, []);

  if (!data) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-20 text-center text-xl">
        Loading dashboard...
      </div>
    );
  }

  const formatKg = (v: number) =>
    Number.isNaN(v) ? "0" : v % 1 === 0 ? v.toString() : v.toFixed(1);

  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 py-8">
      <h1 className="text-[34px] font-semibold text-[#2B2B2B]">Home</h1>

      <div className="border-2 border-green rounded-2xl p-5 mr-5 mt-5 mb-2.5 ">
        <h2 className="text-2xl font-bold">
          Welcome Back, {firstName.charAt(0).toUpperCase() + firstName.slice(1)}!
        </h2>
        <p>
          You’re the reason we can tackle textile waste! Your contributions are
          helping us build a circular economy, one garment at a time.
        </p>
      </div>

      <div className="mt-6 space-y-8">

        <div className="rounded-[18px] border-2 border-[#BFE085] bg-white p-6">
          <h2 className="text-[24px] font-extrabold">Welcome back!</h2>
          <p className="mt-2 text-[15px] text-[#424A52]">
            Here’s your summary for today.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <KpiCard icon={Home} label="Total Inventory" value={formatKg(data.totalInventory) + " Kg"} />
          <KpiCard label="Pending Donations" value={data.pendingCount.toString()} />
          <KpiCard label="Items Distributed" value={formatKg(data.distributedKg) + " Kg"} />
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Panel title="Monthly Activity">Chart placeholder…</Panel>
          <Panel title="Inventory Status">Pie chart placeholder…</Panel>
        </div>
      </div>
    </section>
  );
}

function KpiCard({icon, label, value }: {icon: string, label: string; value: string }) {
  return (
    <div className="flex items-center gap-4 rounded-[18px] border-2 border-[#BFE085] bg-white px-6 py-5">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#E3F4C5] text-[#7FBF45] text-xl font-bold">
        {icon}
      </div>
      <div>
        <p className="text-sm font-medium">{label}</p>
        <p className="text-3xl font-extrabold">{value}</p>
      </div>
    </div>
  );
}

function Panel({title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-[18px] border-2 border-[#BFE085] bg-white p-6 h-full">
      <h3 className="text-[20px] font-semibold mb-4">{title}</h3>
      {children}
    </div>
  );
}