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
  ResponsiveContainer,
} from "recharts";
import { Weight, Check, Truck } from "lucide-react";

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

interface KpiCardProps {
  label: string;
  value: string;
  icon: React.ReactNode;
  color: string;
}

const KpiCard: React.FC<KpiCardProps> = ({ label, value, icon, color }) => (
  <div className="col-span-1 md:col-span-4 border-2 border-[#BFE085] rounded-2xl p-5 flex items-center gap-4 bg-white">
    <div className={`p-3 rounded-full ${color}`}>{icon}</div>
    <div>
      <p className="text-sm text-gray-500 font-medium uppercase">{label}</p>
      <p className="text-3xl font-bold text-gray-900">{value}</p>
    </div>
  </div>
);

export default function AdminHomePage() {
  const [data, setData] = useState<DashboardData>({
    totalInventory: 0,
    pendingCount: 0,
    distributedKg: 0,
    monthlyData: [],
  });

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(`/api/dashboardData?t=${Date.now()}`, {
          cache: "no-store",
          headers: {
            "Pragma": "no-cache",
            "Cache-Control": "no-cache",
          },
        });

        if (!res.ok) throw new Error("Failed to fetch");
        const json = await res.json();
        setData(json);
      } catch (err) {
        console.error("Dashboard API failed:", err);
      }
    }
    load();
  }, []);

  const pieData = [
    { name: "Available", value: data.totalInventory },
    { name: "Pending", value: data.pendingCount },
    { name: "Distributed", value: data.distributedKg },
  ];

  const COLORS = ["#7FBF45", "#FF6B35", "#3BA9FF"];

  return (
    <div className="p-10">
      <div>
        <h1 className="text-4xl font-bold">Dashboard</h1>
      </div>
      <div className="mr-5 mt-5">
        <h3 className="text-[28px] font-semibold mb-2.5">Overview</h3>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          <KpiCard
            label="Total Inventory"
            value={`${data.totalInventory} kg`}
            icon={<Weight className="h-6 w-6" />}
            color="bg-[#E3F4C5] text-[#7FBF45]"
          />
          <KpiCard
            label="Pending Approval"
            value={data.pendingCount.toString()}
            icon={<Check className="h-6 w-6" />}
            color="bg-[#FFE5D9] text-[#FF6B35]"
          />
          <KpiCard
            label="Items Distributed"
            value={`${data.distributedKg} kg`}
            icon={<Truck className="h-6 w-6" />}
            color="bg-[#D6EBFF] text-[#3BA9FF]"
          />
        </div>
      </div>
      <div className="mr-5 mt-5">
        <h3 className="text-[28px] font-semibold mb-2.5">Analytics</h3>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="col-span-1 lg:col-span-7 border-2 border-[#BFE085] rounded-2xl p-5 bg-white">
            <h4 className="text-xl font-bold mb-4">Monthly Activity (kg)</h4>
            <div className="h-[300px] w-full">
              <ResponsiveContainer minHeight={0} minWidth={0}>
                <LineChart
                  data={data.monthlyData}
                  margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
                  className="min-w-0 min-h-0"
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis
                    dataKey="month"
                    tickLine={false}
                    axisLine={false}
                    interval={0}
                    tick={{ fill: "#6B7280", fontSize: 12 }}
                    dy={10}
                  />
                  <YAxis
                    tickLine={false}
                    axisLine={false}
                    tick={{ fill: "#6B7280", fontSize: 12 }}
                    width={30}
                  />
                  <Tooltip
                    contentStyle={{
                      borderRadius: "8px",
                      border: "none",
                      boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                    }}
                  />
                  <Legend verticalAlign="top" height={36} />
                  <Line
                    name="Received"
                    type="monotone"
                    dataKey="donations"
                    stroke="#FF6B35"
                    strokeWidth={3}
                    dot={{ r: 4, fill: "#FF6B35" }}
                    activeDot={{ r: 8 }}
                  />
                  <Line
                    name="Distributed"
                    type="monotone"
                    dataKey="distributed"
                    stroke="#3BA9FF"
                    strokeWidth={3}
                    dot={{ r: 4, fill: "#3BA9FF" }}
                    activeDot={{ r: 8 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="col-span-1 lg:col-span-5 border-2 border-[#BFE085] rounded-2xl p-5 bg-white">
            <h4 className="text-xl font-bold mb-4">Inventory Distribution</h4>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value, name) => [`${value} kg`, name]}
                    contentStyle={{
                      borderRadius: "8px",
                      border: "none",
                      boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                    }}
                  />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}