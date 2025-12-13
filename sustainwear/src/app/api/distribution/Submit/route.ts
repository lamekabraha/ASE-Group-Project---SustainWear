
'use server'

import prisma from '@/lib/prisma' 

export async function updateDistributionItems(distributionId: number, items: number[]) {
    try{
        await prisma.donationItem.updateMany({
            where: {
                itemId: {
                    in: items
                }
            },
            data: {
                distributionId: distributionId,
                status: 'Distributed'
            }
        });

        await prisma.distribution.updateMany({
            where: {
                distributionId: distributionId,
            },
            data: {
                date: new Date(),
                status: "Distributed"
            }
        })
    }
    catch(error){
        console.log(error);
    }
};