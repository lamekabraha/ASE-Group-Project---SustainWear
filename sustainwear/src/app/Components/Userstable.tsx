"use client";

import { useState } from 'react';
import AdminActionButtons from './AdminActionButtons';

type UserSummaryRecord = {
  userId: number;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  totalDonations: number;
  totalItemsDonated: number;
  lastDonationDate: Date | null;
  donationHistory: Array<{
    date: Date;
    itemCount: number;
  }>;
};

const roleStyles: { [key: string]: string } = {
  Admin: "bg-blue-100 text-blue-800",
  Staff: "bg-green-100 text-green-800",
  Donor: "bg-gray-100 text-gray-700",
};

export default function UsersTable({ initialUsers }: { initialUsers: UserSummaryRecord[] }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('All');

  const filteredUsers = initialUsers.filter(user => {
    const matchesRole = filterRole === 'All' || user.role === filterRole;
    if (!matchesRole) return false;

    if (searchTerm.trim() === '') return true;

    const searchLower = searchTerm.toLowerCase();
    const searchFields = [
      `${user.firstName} ${user.lastName}`.toLowerCase(),
      user.email.toLowerCase(),
    ];

    return searchFields.some(field => field.includes(searchLower));
  });

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden border border-gray-200">
      <div className="p-4 bg-gray-50 border-b border-gray-200 flex flex-col sm:flex-row gap-4 justify-between items-center">
        <div className="relative w-full sm:max-w-xs">
          <input
            type="search"
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="p-2 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        <select
          value={filterRole}
          onChange={(e) => setFilterRole(e.target.value)}
          className="p-2 border border-gray-300 rounded-md bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none cursor-pointer"
        >
          <option value="All">All Roles</option>
          <option value="Admin">Admin</option>
          <option value="Staff">Staff</option>
          <option value="Donor">Donor</option>
        </select>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">ID</th>
              <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">User</th>
              <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Role</th>
              <th className="px-6 py-3 text-center text-xs font-bold text-gray-600 uppercase tracking-wider">Donations</th>
              <th className="px-6 py-3 text-center text-xs font-bold text-gray-600 uppercase tracking-wider">Items</th>
              <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Last Active</th>
              <th className="px-6 py-3 text-right text-xs font-bold text-gray-600 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredUsers.map((user) => (
              <tr key={user.userId} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">#{user.userId}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold text-gray-900">{user.firstName} {user.lastName}</span>
                    <span className="text-xs text-gray-500">{user.email}</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${roleStyles[user.role] || "bg-gray-100 text-gray-800"}`}>
                    {user.role}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-center font-medium text-gray-700">
                  {user.totalDonations}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-center font-medium text-gray-700">
                  {user.totalItemsDonated}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {user.lastDonationDate
                    ? new Date(user.lastDonationDate).toLocaleDateString()
                    : <span className="text-gray-400 italic">Never</span>}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <AdminActionButtons user={user} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredUsers.length === 0 && (
        <div className="p-10 text-center text-gray-500 bg-gray-50">
          No users found matching your search.
        </div>
      )}
    </div>
  );
}