"use client";
import React, { useState } from 'react';
import { signOut } from 'next-auth/react'; 

interface ChangePasswordModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const ChangePasswordModal: React.FC<ChangePasswordModalProps> = ({ isOpen, onClose }) => {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handlePasswordChange = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage('');
        
        if (newPassword !== confirmNewPassword) {
            setMessage('Error: New password and confirmation do not match.');
            return;
        }

        setIsLoading(true);
        try {
            const res = await fetch('/api/changepassword', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ currentPassword, newPassword }),
            });

            const data = await res.json();
            
            if (res.ok) {
                setMessage('Success: Password updated! Please log in again.');
                setTimeout(() => signOut({ callbackUrl: '/' }), 2000); 
            } else {
                setMessage(`Error: ${data.message || 'Failed to change password.'}`);
            }
        } catch (error) {
            setMessage('An unexpected network error occurred.');
        } finally {
            setIsLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-sm">
                <h2 className="text-xl font-bold mb-4 text-black">Change Password</h2>
                
                {message && (
                    <div className={`p-3 mb-4 rounded text-sm ${message.startsWith('Error') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                        {message}
                    </div>
                )}

                <form onSubmit={handlePasswordChange} className="space-y-4">
                    <input
                        type="password"
                        placeholder="Current Password"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        required
                        className="w-full p-2 border border-gray-300 rounded text-black"
                    />
                    <input
                        type="password"
                        placeholder="New Password (min 8 chars)"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                        minLength={8}
                        className="w-full p-2 border border-gray-300 rounded text-black"
                    />
                    <input
                        type="password"
                        placeholder="Confirm New Password"
                        value={confirmNewPassword}
                        onChange={(e) => setConfirmNewPassword(e.target.value)}
                        required
                        className="w-full p-2 border border-gray-300 rounded text-black"
                    />
                    <div className="flex justify-end space-x-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
                            disabled={isLoading}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 disabled:opacity-50"
                            disabled={isLoading || newPassword !== confirmNewPassword}
                        >
                            {isLoading ? 'Processing...' : 'Change'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ChangePasswordModal;