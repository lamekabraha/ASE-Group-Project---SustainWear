"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { X, Check, Ban, Eye } from "lucide-react";

type DonationProps = {
  donation: {
    donationId: number; 
    donor: {
      firstName: string;
      lastName: string;
      email: string;
    };
    items: any[];
    donationDate: Date;
  };
};

export default function ReviewDonationButton({ donation }: DonationProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleDecision = async (status: "APPROVED" | "REJECTED") => {
    setLoading(true);
    try {
const res = await fetch(`/api/donations/create/${donation.donationId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });

      if (res.ok) {
        setIsOpen(false);
        router.refresh(); // Refresh page to remove item from list
      } else {
        alert("Failed to update status.");
      }
    } catch (error) {
      console.error(error);
      alert("Error updating donation.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* 1. The Trigger Button */}
      <button 
        onClick={() => setIsOpen(true)}
        className="text-blue-600 hover:text-blue-900 text-sm font-semibold flex items-center justify-end gap-1 ml-auto"
      >
        <Eye className="w-4 h-4" /> Review Details
      </button>

      {/* 2. The Modal (Popup) */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg overflow-hidden">
            
            {/* Header */}
            <div className="p-5 border-b border-gray-100 flex justify-between items-center bg-gray-50">
              <h3 className="text-lg font-bold text-gray-800">Review Donation</h3>
              <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-4">
              <div className="flex justify-between items-center bg-blue-50 p-3 rounded-lg border border-blue-100">
                <div>
                  <p className="text-xs text-blue-600 font-bold uppercase tracking-wider">Donor</p>
                  <p className="font-semibold text-blue-900">{donation.donor.firstName} {donation.donor.lastName}</p>
                  <p className="text-xs text-blue-700">{donation.donor.email}</p>
                </div>
                <div className="text-right">
                   <p className="text-xs text-blue-600 font-bold uppercase tracking-wider">Date</p>
                   <p className="text-sm text-blue-900">{new Date(donation.donationDate).toLocaleDateString()}</p>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-gray-700 mb-2 text-sm">Items Pledged:</h4>
                <div className="max-h-40 overflow-y-auto bg-gray-50 rounded border border-gray-200 p-2">
                  {donation.items.length > 0 ? (
                    <ul className="space-y-2">
                      {donation.items.map((item: any, idx: number) => (
                        <li key={idx} className="text-sm text-gray-600 flex justify-between border-b border-gray-100 pb-1 last:border-0">
                          <span>• {item.category?.name || "Item"}</span>
                          <span className="text-gray-400 text-xs">{item.quantity || 1}x</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm text-gray-400 italic">No specific items listed.</p>
                  )}
                </div>
              </div>
            </div>

            {}
            <div className="p-5 bg-gray-50 border-t border-gray-100 flex gap-3">
              <button
                onClick={() => handleDecision("REJECTED")}
                disabled={loading}
                className="flex-1 py-2.5 border border-red-200 text-red-700 font-semibold rounded-lg hover:bg-red-50 flex items-center justify-center gap-2"
              >
                <Ban className="w-4 h-4" /> Reject
              </button>
              
              <button
                onClick={() => handleDecision("APPROVED")}
                disabled={loading}
                className="flex-1 py-2.5 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 shadow-sm flex items-center justify-center gap-2"
              >
                <Check className="w-4 h-4" /> Approve
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}