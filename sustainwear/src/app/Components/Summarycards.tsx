import React from 'react';

interface SummaryCardsProps {
  metrics: {
    totalUsers: number;
    activeDonorCount: number;
    totalItemsDonated: number;
  };
}

export default function SummaryCards({ metrics }: SummaryCardsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <StatCard
        label="Total Users"
        value={metrics.totalUsers}
        borderColor="border-sky-500"
      />
      <StatCard
        label="Active Donors"
        value={metrics.activeDonorCount}
        borderColor="border-green-500"
      />
      <StatCard
        label="Total Items Donated"
        value={metrics.totalItemsDonated}
        borderColor="border-indigo-500"
      />
    </div>
  );
}

function StatCard({ label, value, borderColor }: { label: string; value: number; borderColor: string }) {
  return (
    <div className={`bg-white p-6 rounded-lg shadow-md border-l-4 ${borderColor}`}>
      <p className="text-sm font-medium text-gray-500">{label}</p>
      <p className="text-3xl font-semibold text-gray-900 mt-1">
        {value.toLocaleString()}
      </p>
    </div>
  );
}