"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import AdminDeleteModal from "./AdminDeleteModal";
import ViewUserModal from "./ViewUserModal";

interface AdminActionButtonsProps {
  user: any;
}

export default function AdminActionButtons({ user }: AdminActionButtonsProps) {
  const router = useRouter();
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  return (
    <>
      <div className="flex justify-end gap-2">
        <button
          onClick={() => setIsViewOpen(true)}
          className="bg-sky-600 hover:bg-sky-700 text-white px-3 py-1 rounded text-xs font-semibold shadow-sm transition-colors"
        >
          View
        </button>
        
        <button
          onClick={() => setIsDeleteOpen(true)}
          className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-xs font-semibold shadow-sm transition-colors"
        >
          Delete
        </button>
      </div>

      <ViewUserModal 
        isOpen={isViewOpen} 
        onClose={() => setIsViewOpen(false)} 
        user={user} 
      />

      <AdminDeleteModal 
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        userId={user.userId}
        userName={`${user.firstName} ${user.lastName}`}
        onSuccess={() => router.refresh()}
      />
    </>
  );
}