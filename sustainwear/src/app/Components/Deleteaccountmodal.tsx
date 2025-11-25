"use client";
import React, { useState } from 'react';
import { signOut } from 'next-auth/react'; 

interface DeleteAccountModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const DeleteAccountModal: React.FC<DeleteAccountModalProps> = ({ isOpen, onClose }) => {
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleDeleteAccount = async () => {
        setIsLoading(true);
        setMessage('');

        try {
            const res = await fetch('/api/delete-account', {
                method: 'DELETE',
            });

            const data = await res.json();
            
            if (res.ok) {
                setMessage('Account deletion confirmed. Redirecting...');
                
                setTimeout(() => signOut({ callbackUrl: '/' }), 1500); 
            } else {
                setMessage(`Error: ${data.message || 'Failed to delete account.'}`);
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
            <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-sm text-black">
                <h2 className="text-xl font-bold mb-4 text-red-600">Permanently Delete Account</h2>
                
                {message ? (
                    <div className={`p-3 mb-4 rounded text-sm ${message.startsWith('Error') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                        {message}
                    </div>
                ) : (
                    <p className="mb-6">
                        ⚠️ **Warning:** Are you absolutely sure you want to delete your account? This action is **irreversible** and all associated data will be lost.
                    </p>
                )}

                <div className="flex justify-end space-x-3">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
                        disabled={isLoading}
                    >
                        Cancel
                    </button>
                    <button
                        type="button"
                        onClick={handleDeleteAccount}
                        className="px-4 py-2 bg-red-600 text-white font-semibold rounded hover:bg-red-700 disabled:opacity-50"
                        disabled={isLoading}
                    >
                        {isLoading ? 'Deleting...' : 'Delete Account'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeleteAccountModal;