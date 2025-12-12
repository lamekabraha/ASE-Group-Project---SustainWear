import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "../../../lib/prisma";
import Link from "next/link";
import DistributionReqTable from "@/app/Components/distribution/DistributionReqTable";

export default async function Distribution(){
    const session = await getServerSession(authOptions);
    const userId = session?.user?.userId;

    const requests = await prisma.distribution.findMany({
        where: {
            status: "Request",
        },
        select: { 
            distributionId: true,
            date: true,
            notes: true,
            status: true,
            charityId: true,
            charity: {
                select: {
                    charityName: true,
                    charityEmail: true,
                    charityTeleNumber: true,
                    charityRegNumber: true,
                }
            },
        },
    })

    const [category, size, gender, condition] = await Promise.all([
        prisma.category.findMany({select: {categoryId: true, category: true}}),
        prisma.size.findMany({select: {sizeId: true, size: true}}),
        prisma.gender.findMany({select: {genderId: true, gender: true}}),
        prisma.condition.findMany({select: {conditionId: true, condition: true}}),
    ])
    const filterOptions = {category, size, gender, condition}

    const distributionItem = await prisma.donationItem.findMany({
        where: {
            distributionId: null,
            status: "Approved"
        },
        select: {
            itemId: true,
            photoUrl: true,
            description: true,
            status: true,
            categoryId: true,
            sizeId: true,
            genderId: true,
            conditionId: true
        }
    })


    const history = await prisma.distribution.findMany({
        where: {
            status: {
                not: "Request"
            },
        },
        select: {
            distributionId: true,
            date: true,
            charity: {
                select: {
                    charityName: true
                }
            },
            status: true,
        }
    })
    return(
        <div className="p-10 flex flex-col gap-y-20 h-screen">
            <h1 className="text-4xl font-bold">Distribution</h1>
            <div>
                <h2 className="text-2xl font-bold mb-3.5">Distribution Requests</h2>
                <DistributionReqTable request={requests} filters={filterOptions} items={distributionItem}/>
            </div>
            <div>
                <h2 className="text-2xl font-bold mb-3.5">Distribution History</h2>
                <div className="border-2 border-green rounded-2xl p-5 flex gap-4 col-span-7">
                    <table className="min-w-full table-fixed">
                        <thead className="bg-gray-50">
                            <tr className="text-left text-sm font-semibold text-gray-700">
                                <th className="px-6 py-3 w-1/5">Distribution Id</th>
                                <th className="px-6 py-3 w-1/5">Date</th>
                                <th className="px-6 py-3 w-1/5">Charity</th>
                                <th className="px-6 py-3 w-1/5">Status</th>
                                <th className="px-6 py-3 w-1/5">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {history.length === 0 ? (
                                <tr className="border-t border-gray-100 hover:bg-gray-50">
                                    <td className="px-6 py-3">No Requests</td>
                                </tr>) : (
                                    history.map((row) => (
                                        <tr key={row.distributionId} className="border-t border-gray-100 hover:bg-gray-50">
                                            <td className="px-6 py-3">{row.distributionId}</td>
                                            <td className="px-6 py-3">{new Date(row.date).toLocaleDateString()}</td>
                                            <td className="px-6 py-3">{row.charity?.charityName}</td>
                                            <td className="px-6 py-3">{row.status}</td>
                                            <td className="px-6 py-3"><button className="border-2 border-navy bg-navy text-white rounded px-2 py-0.5"><Link href={"/"}>View</Link></button></td>

                                        </tr>
                                    )
                                ))}
                        </tbody>
                    </table>
                </div>
            </div>
            

        </div>
    )
}
