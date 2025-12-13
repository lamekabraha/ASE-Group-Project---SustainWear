import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "../../../lib/prisma";
import Link from "next/link";
import DistributionReqTable from "@/app/Components/distribution/request/DistReqTable";
import DistributionHistoryTable from "@/app/Components/distribution/history/DistHistorytable";

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

    const InventoryItem = await prisma.donationItem.findMany({
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

    return(
        <div className="p-10 flex flex-col gap-y-20 h-screen">
            <h1 className="text-4xl font-bold">Distribution</h1>
            <div>
                <h2 className="text-2xl font-bold mb-3.5">Distribution Requests</h2>
                <DistributionReqTable request={requests} filters={filterOptions} items={InventoryItem}/>
            </div>
            <div>
                <h2 className="text-2xl font-bold mb-3.5">Distribution History</h2>
                <DistributionHistoryTable/>
            </div>
            

        </div>
    )
}