import { NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

export async function GET(){
    try{
        const session = await getServerSession(authOptions);

        if(!session){
            return NextResponse.json({message: 'Unauthorized'}, {status: 401})
        }

        const userId = session?.user?.userId;

        const query = await prisma.donationItem.findMany({
            where: {donation: {donorId: userId}},
            include: {category: true}
        })

        const totalCo2Saved = query.reduce((sum, query) => {
            const co2Saved = Number(query.category.avgCo2Saved) || 0;
            return sum + co2Saved;
        }, 0);

        return totalCo2Saved;
    }catch (error){
        console.error("Error calculating impact:", error);
        return NextResponse.json({ message: 'An error occurred while fetching impact data' }, { status: 500 });
    }
}