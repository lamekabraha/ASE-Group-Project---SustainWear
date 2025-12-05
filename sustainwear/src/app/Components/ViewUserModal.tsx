"use client";

import React from 'react';

type UserDetails = {
  userId: number;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  totalDonations: number;
  totalItemsDonated: number;
  donationHistory: Array<{
    date: Date;
    itemCount: number;
  }>;
};

interface ViewUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: UserDetails | null | undefined;
}

export default function ViewUserModal({ isOpen, onClose, user }: ViewUserModalProps) {
  if (!isOpen || !user) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75 z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md mx-4 overflow-hidden">
        <div className="px-6 py-4 border-b flex justify-between items-center bg-gray-50">
          <h3 className="text-lg font-semibold text-gray-900">User Details</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500 text-2xl leading-none"
          >
            &times;
          </button>
        </div>

        <div className="p-6 space-y-5">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase">Name</label>
              <p className="text-gray-900 font-medium">{user.firstName} {user.lastName}</p>
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase">Role</label>
              <span className={`inline-block px-2 py-0.5 rounded text-xs font-bold mt-1
                ${user.role === 'Admin' ? 'bg-blue-100 text-blue-800' :
                  user.role === 'Staff' ? 'bg-green-100 text-green-800' :
                  'bg-gray-100 text-gray-800'}`}>
                {user.role}
              </span>
            </div>
            <div className="col-span-2">
              <label className="block text-xs font-bold text-gray-500 uppercase">Email</label>
              <p className="text-gray-900">{user.email}</p>
            </div>
          </div>

          <div className="flex bg-gray-50 p-3 rounded-lg border border-gray-200">
            <div className="flex-1 text-center border-r border-gray-200">
              <span className="block text-xl font-bold text-blue-600">{user.totalDonations}</span>
              <span className="text-xs text-gray-500 uppercase font-semibold">Donations</span>
            </div>
            <div className="flex-1 text-center">
              <span className="block text-xl font-bold text-blue-600">{user.totalItemsDonated}</span>
              <span className="text-xs text-gray-500 uppercase font-semibold">Items</span>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-bold text-gray-900 mb-2">Recent History</h4>
            <div className="border border-gray-200 rounded-lg overflow-hidden max-h-40 overflow-y-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50 sticky top-0">
                  <tr>
                    <th className="px-4 py-2 text-left text-xs font-semibold text-gray-500">Date</th>
                    <th className="px-4 py-2 text-right text-xs font-semibold text-gray-500">Items</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-100">
                  {user.donationHistory && user.donationHistory.length > 0 ? (
                    user.donationHistory.map((d, i) => (
                      <tr key={i}>
                        <td className="px-4 py-2 text-sm text-gray-700">
                          {new Date(d.date).toLocaleDateString()}
                        </td>
                        <td className="px-4 py-2 text-sm text-gray-700 text-right">
                          {d.itemCount}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={2} className="px-4 py-4 text-center text-sm text-gray-400 italic">
                        No donation history found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 px-6 py-3 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-white border border-gray-300 rounded text-sm font-medium text-gray-700 hover:bg-gray-100 focus:outline-none"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}