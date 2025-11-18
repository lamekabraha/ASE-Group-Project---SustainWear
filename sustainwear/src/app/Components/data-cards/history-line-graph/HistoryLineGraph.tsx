import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import prisma from "../../../../../lib/prisma";
import { format, parseISO } from 'date-fns';
import HistoryLineGraphClient from "@/app/Components/data-cards/history-line-graph/HistoryLineGraphClient";

export default async function HistoryLineGraph(){
    const session = await getServerSession(authOptions);

    if (!session || !session.user){
        redirect('/auth/login');
    }

    const userId = session?.user?.id;

    const data: {count: number, date: string}[] = await prisma.$queryRaw`
        SELECT 
            COUNT(*) as count, 
            DATE_FORMAT(donationDate, '%Y-%m-%d') as date
        FROM 
            donations 
        WHERE 
            donorId = ${userId} AND donationDate IS NOT NULL
        GROUP BY 
            date 
        ORDER BY 
            date
    `;

    const formatData = data.map(item => ({
        count: Number(item.count),
        date: item.date,
    }));
    
    return(
        <HistoryLineGraphClient data={formatData}/>
    )
}