import Image from "next/image";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import prisma from "../../../../lib/prisma";


export default async function Co2Saved() {
    const session = await getServerSession(authOptions)

    if (!session){
        redirect('/auth/login')
    }

    const userId = session?.user?.userId

    const co2Query = await prisma.donationItem.findMany({
        where: {donation: {donorId: userId}},
        include: {category: true}
    })

    const totalCo2Saved = co2Query.reduce((sum, co2Query) => {
        const co2Saved = Number(co2Query.category.avgCo2Saved) || 0;
        return sum + co2Saved;
    }, 0);  

    return (
        <div className="border-2 border-green rounded-2xl p-5 flex gap-4 col-span-6">
        <Image
                src="/icons/co2-icon.png"
                alt="co2 icon"
                width={75}
                height={75}
                className="flex-none"
            />
        <div className="flex-1 relative">
            <h1 className="text-2xl font-semibold">CO₂ Equivalent:</h1>
            <h1 className="text-3xl font-bold absolute right-0 bottom-0">{totalCo2Saved} kgCO₂</h1>
        </div>
    </div>   
    )
}