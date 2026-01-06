"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { X, Check, Ban, Eye, Package } from "lucide-react";
import Image from "next/image";

type DonationItem = {
  itemId: number;
  description: string | null;
  photoUrl: string | null;
  category: { category: string } | null;
  size: { size: string } | null;
  gender: { gender: string } | null;
  condition: { condition: string } | null;
};

type DonationProps = {
  donation: {
    donationId: number;
    donor: {
      firstName: string;
      lastName: string;
      email: string;
    };
    items: DonationItem[]; 
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
        router.refresh(); 
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
      <button
        onClick={() => setIsOpen(true)}
        className="text-blue-600 hover:text-blue-900 text-sm font-semibold flex items-center justify-end gap-1 ml-auto"
      >
        <Eye className="w-4 h-4" /> Review Details
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 animate-in fade-in duration-200 overflow-y-auto">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl overflow-hidden my-8">
            <div className="p-5 border-b border-gray-100 flex justify-between items-center bg-gray-50">
              <h3 className="text-lg font-bold text-gray-800">Review Donation #{donation.donationId}</h3>
              <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 space-y-6">
              <div className="flex justify-between items-start bg-blue-50 p-4 rounded-lg border border-blue-100">
                <div>
                  <p className="text-xs text-blue-600 font-bold uppercase tracking-wider mb-1">Donor Details</p>
                  <p className="font-semibold text-blue-900 text-lg">{donation.donor.firstName} {donation.donor.lastName}</p>
                  <p className="text-sm text-blue-700">{donation.donor.email}</p>
                </div>
                <div className="text-right">
                    <p className="text-xs text-blue-600 font-bold uppercase tracking-wider mb-1">Submitted On</p>
                    <p className="text-sm text-blue-900 font-medium">{new Date(donation.donationDate).toLocaleDateString()}</p>
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-gray-700 mb-3 flex items-center gap-2">
                  <Package className="w-5 h-5 text-gray-500" />
                  Items in this Donation ({donation.items.length})
                </h4>
                
                <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
                  {donation.items.length > 0 ? (
                    donation.items.map((item) => (
                      <div key={item.itemId} className="flex gap-4 bg-white border border-gray-200 rounded-lg p-3 shadow-sm">
                        <div className="relative w-24 h-24 flex-shrink-0 bg-gray-100 rounded-md overflow-hidden border border-gray-200">
                          {item.photoUrl ? (
                            <Image
                              src={item.photoUrl}
                              alt={item.description || "Donated item"}
                              fill
                              className="object-cover"
                            />
                          ) : (
                            <div className="flex items-center justify-center h-full text-gray-400">
                              <Package className="w-8 h-8" />
                            </div>
                          )}
                        </div>
                        <div className="flex-1 flex flex-col">
                          <div className="mb-2">
                            <h5 className="font-semibold text-gray-800">{item.description}</h5>
                            <p className="text-sm text-gray-500">{item.category?.category}</p>
                          </div>
                          
                          <div className="grid grid-cols-3 gap-2 mt-auto text-xs">
                            <div className="bg-gray-50 p-2 rounded border border-gray-100 text-center">
                              <span className="block text-gray-400 font-medium uppercase text-[10px]">Sizes</span>
                              <span className="text-gray-700 font-semibold">{item.size?.size}</span>
                            </div>
                            <div className="bg-gray-50 p-2 rounded border border-gray-100 text-center">
                              <span className="block text-gray-400 font-medium uppercase text-[10px]">Gender</span>
                              <span className="text-gray-700 font-semibold">{item.gender?.gender}</span>
                            </div>
                            <div className="bg-gray-50 p-2 rounded border border-gray-100 text-center">
                              <span className="block text-gray-400 font-medium uppercase text-[10px]">Condition</span>
                              <span className="text-gray-700 font-semibold">{item.condition?.condition}</span>

                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-gray-400 italic p-4 text-center bg-gray-50 rounded-lg border border-dashed border-gray-200">
                      No items listed in this donation.
                    </p>
                  )}
                </div>
              </div>
            </div>
            <div className="p-5 bg-gray-50 border-t border-gray-100 flex gap-3">
              <button
                onClick={() => handleDecision("REJECTED")}
                disabled={loading}
                className="flex-1 py-3 border border-red-200 text-red-700 font-semibold rounded-xl hover:bg-red-50 flex items-center justify-center gap-2 transition-colors disabled:opacity-50"
              >
                {loading ? "Processing..." : <><Ban className="w-5 h-5" /> Reject Donation</>}
              </button>
              
              <button
                onClick={() => handleDecision("APPROVED")}
                disabled={loading}
                className="flex-1 py-3 bg-green-600 text-white font-semibold rounded-xl hover:bg-green-700 shadow-sm flex items-center justify-center gap-2 transition-colors disabled:opacity-50"
              >
                {loading ? "Processing..." : <><Check className="w-5 h-5" /> Approve Donation</>}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}