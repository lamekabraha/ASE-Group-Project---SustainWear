'use client';

import { useState } from 'react';
import { format } from 'date-fns';
import { MoreHorizontal, Search } from 'lucide-react';

type UserSummaryRecord = {
    userId: number;
    email: string;
    firstName: string;
    lastName: string;
    role: string;
    totalDonations: number;
    totalItemsDonated: number;
    lastDonationDate: Date | null;
};

export default function UsersTable({ initialUsers }: { initialUsers: UserSummaryRecord[] }) {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredUsers = initialUsers.filter(user => 
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) || 
        user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.lastName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div>
            <div className="mb-4 flex gap-2 items-center bg-gray-50 border border-gray rounded-lg px-3 py-2 w-full max-w-md">
                <Search size={18} className="text-gray-400" />
                <input 
                    type="text" 
                    placeholder="Search users..." 
                    className="bg-transparent outline-none w-full text-sm text-gray-700 placeholder:text-gray-400"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            <div className="overflow-x-auto rounded-lg border border-gray-200">
                <table className="min-w-full table-fixed text-sm text-left">
                    <thead className="bg-gray-50 text-gray-600 font-semibold border-b border-gray-200">
                        <tr>
                            <th className="px-6 py-3 w-[10%]">ID</th>
                            <th className="px-6 py-3 w-[25%]">Name</th>
                            <th className="px-6 py-3 w-[25%]">Email</th>
                            <th className="px-6 py-3 w-[15%]">Role</th>
                            <th className="px-6 py-3 w-[15%]">Stats</th>
                            <th className="px-6 py-3 w-[10%] text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {filteredUsers.length === 0 ? (
                            <tr>
                                <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                                    No users found.
                                </td>
                            </tr>
                        ) : (
                            filteredUsers.map((user) => (
                                <tr key={user.userId} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4 font-medium text-gray-900">#{user.userId}</td>
                                    <td className="px-6 py-4 font-medium text-gray-800">
                                      {user.firstName.charAt(0).toUpperCase() + user.firstName.slice(1)} {user.lastName.charAt(0).toUpperCase() + user.lastName.slice(1)}
                                    </td>
                                    <td className="px-6 py-4 text-gray-600 truncate">{user.email}</td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex px-2 py-1 rounded-full text-xs font-bold border uppercase
                                            ${user.role === 'Admin' ? 'bg-purple-100 text-purple-700 border-purple-200' : 
                                              user.role === 'Staff' ? 'bg-blue-100 text-blue-700 border-blue-200' : 
                                              'bg-green-100 text-green-700 border-green-200'}
                                        `}>
                                            {user.role}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-gray-600">
                                        <div className="flex flex-col text-xs">
                                            <span>{user.totalDonations} Donations</span>
                                            <span className="text-gray-400">{user.totalItemsDonated} Items</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button className="text-gray-400 hover:text-gray-600 p-1 rounded hover:bg-gray-200 transition-colors">
                                            <MoreHorizontal size={18} />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
            
            <div className="mt-4 text-xs text-gray-400 text-right">
                Showing {filteredUsers.length} users
            </div>
        </div>
    );
}