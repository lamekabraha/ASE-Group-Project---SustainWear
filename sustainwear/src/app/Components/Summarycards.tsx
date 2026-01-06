import { Users, UserCheck, Package } from 'lucide-react';

interface SummaryMetrics {
    totalUsers: number;
    activeDonorCount: number;
    totalItemsDonated: number;
}

export default function SummaryCards({ metrics }: { metrics: SummaryMetrics }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gray-50 rounded-xl p-5 border-3 border-green flex items-center gap-4">
            <div className="bg-blue-100 p-3 rounded-full text-blue-600">
                <Users size={24} />
            </div>
            <div>
                <p className="text-sm text-gray-500 font-medium uppercase">Total Users</p>
                <p className="text-3xl font-bold text-gray">{metrics.totalUsers}</p>
            </div>
        </div>
        <div className="bg-gray-50 rounded-xl p-5 border-3 border-green flex items-center gap-4">
             <div className="bg-green-100 p-3 rounded-full text-green-600">
                <UserCheck size={24} />
            </div>
            <div>
                <p className="text-sm text-gray-500 font-medium uppercase">Active Donors</p>
                <p className="text-3xl font-bold text-gray">{metrics.activeDonorCount}</p>
            </div>
        </div>
        <div className="bg-gray-50 rounded-xl p-5 border-3 border-green flex items-center gap-4">
            <div className="bg-orange-100 p-3 rounded-full text-orange-600">
                <Package size={24} />
            </div>
            <div>
                <p className="text-sm text-gray-500 font-medium uppercase">Total Items Donated</p>
                <p className="text-3xl font-bold text-gray">{metrics.totalItemsDonated}</p>
            </div>
        </div>
    </div>
  );
}