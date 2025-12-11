import Image from 'next/image';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';
import prisma from '../../../../lib/prisma';
 
export default async function SupportedCharities() {
    const session = await getServerSession(authOptions);
    const userId = session?.user?.id;

    const uniqueCharities = await prisma.distribution.findMany({
        where: {
            items: {
                some: {
                    donation: {
                        donorId: userId
                    }
                }
            }
        },
        select: {charityId: true},
        distinct: ['charityId']
    });

    const data = uniqueCharities.length;

    return(
        <div className="border-2 border-green rounded-2xl p-5 flex gap-4 col-span-6">
            <Image
                src="/icons/charity-icon.png"
                alt="wight icon"
                width={80}
                height={80}
                className="flex-none"
            />
            <div className="flex-1 relative">
                <h1 className="text-2xl font-semibold">Total Charities Supported:</h1>
                <h1 className="text-3xl font-bold absolute right-0 bottom-0">{data}</h1>
            </div>
        </div>
    )
}