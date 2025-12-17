'use client';

import {useState } from "react";
import DistributionModal, {DistributionData, FilterOptions} from "./DistReqModal";

export interface DonationItem{
    itemId: number;
    photoUrl: string;
    description: string | null;
    status: string;
    categoryId: number;
    sizeId: number | null;
    genderId: number;
    conditionId: number;
}

export default function DistributionReqTable({request, filters, items}: {request: DistributionData[], filters: FilterOptions, items: DonationItem[]}) {
    const [requestModal, setRequestModal] = useState<DistributionData | null>(null);
    return(
        <div>
            <div className="border-3 border-green rounded-2xl p-5 flex gap-4 col-span-7">
                <table className="min-w-full table-fixed">
                    <thead className="bg-gray-50">
                        <tr className="text-left text-sm font-semibold text-gray-700">
                            <th className="px-6 py-3 w-1/5">Distribution ID</th>
                            <th className="px-6 py-3 w-1/5">Date</th>
                            <th className="px-6 py-3 w-1/5">Charity</th>
                            <th className="px-6 py-3 w-1/5">Request</th>
                            <th className="px-6 py-3 w-1/5">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {request.length === 0 ? (
                            <tr className="border-t border-gray-100 hover:bg-gray-50">
                                <td className="px-6 py-3">No Requests</td>
                            </tr>) : (
                                request.map((row) => (
                                    <tr key={row.distributionId} className="border-t border-gray-100 hover:bg-gray-50">
                                        <td className="px-6 py-3">{row.distributionId}</td>
                                        <td className="px-6 py-3">{new Date(row.date).toLocaleDateString()}</td>
                                        <td className="px-6 py-3">{row.charity?.charityName}</td>
                                        <td className="px-6 py-3">{row.notes}</td>
                                        <td className="px-6 py-3"><button type="button" onClick={() => setRequestModal(row)} className="border-3 border-navy bg-navy text-white rounded px-2 py-0.5">Action</button></td> 

                                    </tr>
                                )
                            ))}
                    </tbody>
                </table>
            </div>
            <DistributionModal
                onClose={() => setRequestModal(null)}
                isOpen={!!requestModal}
                data={requestModal}
                filters={filters}
                items={items}
            />
        </div>

    )
}