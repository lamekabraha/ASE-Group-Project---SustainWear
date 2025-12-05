"use client";

import { useState } from 'react';

interface AdminDeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  userId: number;
  userName: string;
  onSuccess: () => void;
}

export default function AdminDeleteModal({
  isOpen,
  onClose,
  userId,
  userName,
  onSuccess,
}: AdminDeleteModalProps) {
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleDeleteUser = async () => {
    setIsLoading(true);
    setMessage('');

    try {
      const res = await fetch('/api/admin-delete-user', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage('User deleted successfully.');
        setTimeout(() => {
          onSuccess();
          onClose();
          setMessage('');
        }, 1000);
      } else {
        setMessage(`Error: ${data.message || 'Failed to delete user.'}`);
      }
    } catch (error) {
      setMessage('An unexpected network error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-500 bg-opacity-75">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-sm mx-4 overflow-hidden">
        <div className="px-6 py-4 border-b">
          <h2 className="text-lg font-semibold text-red-600">Delete User Account</h2>
        </div>

        <div className="p-6">
          {message ? (
            <div
              className={`p-3 rounded text-sm ${
                message.startsWith('Error')
                  ? 'bg-red-50 text-red-700'
                  : 'bg-green-50 text-green-700'
              }`}
            >
              {message}
            </div>
          ) : (
            <div>
              <p className="text-gray-700 mb-2">
                Are you sure you want to delete the account for:
              </p>
              <p className="font-bold text-gray-900 mb-4">{userName}</p>
              <p className="text-xs text-red-500 font-medium">
                This action is irreversible. All donation history will be removed.
              </p>
            </div>
          )}
        </div>

        <div className="bg-gray-50 px-6 py-3 flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-white border border-gray-300 rounded text-sm text-gray-700 hover:bg-gray-50"
            disabled={isLoading}
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleDeleteUser}
            className="px-4 py-2 bg-red-600 text-white text-sm font-medium rounded hover:bg-red-700 disabled:opacity-50"
            disabled={isLoading}
          >
            {isLoading ? 'Deleting...' : 'Delete User'}
          </button>
        </div>
      </div>
    </div>
  );
}