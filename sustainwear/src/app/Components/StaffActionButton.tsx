"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function StaffActionButtons({ donationId }: { donationId: number }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const updateStatus = async (status: string) => {

    setLoading(true);

    try {

        await fetch("/api/update-donation", {
        method: "POST",
        body: JSON.stringify({ donationId, status }),
      });

      router.refresh();
    } catch (error) {
      console.error("Failed to update");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-end gap-2">
      <button
        onClick={() => updateStatus("COLLECTED")}
        disabled={loading}
        className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-xs font-semibold shadow-sm disabled:opacity-50 transition-colors"
      >
        {loading ? "..." : "Approve"}
      </button>
      
      <button
        onClick={() => updateStatus("REJECTED")}
        disabled={loading}
        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-xs font-semibold shadow-sm disabled:opacity-50 transition-colors"
      >
        {loading ? "..." : "Decline"}
      </button>
    </div>
  );
}