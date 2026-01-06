import prisma from '@/lib/prisma';
import { format } from 'date-fns';

export default async function DistributionHistoryTable() {

    const distributionData = await prisma.distribution.findMany({
        select: {
            distributionId: true,
            date: true,
            staffId: true,
            status: true,
            staff: {
                select: {
                    firstName: true,
                    lastName: true,
                },
            },
            charity: {
                select: {
                    charityName: true,
                },
            },
            items: {
                select: {
                    itemId: true,
                    categoryId: true,
                    category: {
                        select: {
                            avgWeight: true,
                        },
                    },
                },
            },
        },
        orderBy: {
            date: 'desc'
        }
    });

    const formattedData = distributionData.map((dist) => {
        const numItems = dist.items.length;

        const totalWeight = dist.items.reduce((sum, item) => {
            return sum + (item.category?.avgWeight ? Number(item.category.avgWeight) : 0);
        }, 0);

        const uniqueCategories = new Set(dist.items.map((item) => item.categoryId)).size;

        return {
            distributionId: dist.distributionId,
            charityName: dist.charity?.charityName || 'Unknown',
            date: dist.date, 
            staffId: dist.staffId,
            staffName: dist.staff ? `${dist.staff.firstName.charAt(0).toUpperCase() + dist.staff.firstName.slice(1)} ${dist.staff.lastName.charAt(0).toUpperCase() + dist.staff.lastName.slice(1)}` : 'Unknown',
            numItems,
            totalWeight: totalWeight.toFixed(2),
            categoryCount: uniqueCategories,
            status: dist.status 
        };
    });

    return (
        <div className="border-3 border-green rounded-2xl p-5 flex gap-4 col-span-7">
            <div className="w-full">
                <table className="min-w-full table-fixed">
                    <tbody>
                        {formattedData.length === 0 ? (
                            <tr>
                                <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                                    No Processed Distributions
                                </td>
                            </tr>
                        ) : (
                            formattedData.map((row) => (
                                <tr key={row.distributionId} className="grid grid-cols-2 h-fit hover:bg-gray-100">
                                    <td className="grid grid-rows-4 gap-0.5 justify-start items-center">
                                        <p className="px-6 py-1 font-semibold text-gray-800 text-xl">
                                            {row.charityName}
                                        </p>
                                        <p className="px-6 py-1 text-gray-600">
                                            {new Date(row.date).toLocaleDateString()} • {row.staffName} 
                                        </p>
                                        <p className="px-6 py-1 text-gray-600">
                                            {row.numItems} Items • {row.totalWeight} Kg • {row.categoryCount} Types
                                        </p>
                                    </td>
                                    <td className="px-6 flex justify-end items-center">
                                        <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-bold uppercase border border-green-200">
                                            {row.status}
                                        </span>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}