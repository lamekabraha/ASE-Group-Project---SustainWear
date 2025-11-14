import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import prisma from "../../../../lib/prisma";
import PieChartClient from "@/app/Components/data-cards/PieChartClient";

export default async function CategoryPieChart() {
    const session = await getServerSession(authOptions);

    if (!session || !session.user){
        redirect('/auth/login');
    }

    const userId = session?.user?.userId;

    const countCateg = await prisma.donationItem.groupBy({
        by: ['categoryId'],
        where: {
            donation: {
                donorId: userId,

            },
        },
        _count: {
            categoryId: true,
        },
    });

    const categories = await prisma.category.findMany({
        where:{
            categoryId:{
                in: countCateg.map(item => item.categoryId)
            }
        }
    });

    const mergedData = countCateg.map(group => {
        const categoryData = categories.find(categories => categories.categoryId === group.categoryId);
        const categoryName = categoryData?.category || 'Unknown';
        const capitalCategory = categoryName.replace(/\b\w/g, (char) => char.toUpperCase());

        return {
            name: capitalCategory,
            value: group._count.categoryId,
        }
    })

    return (
        <PieChartClient data={mergedData}/>
    )
}