import prisma from "../../../lib/prisma";

export async function getDonorDashboardData(donorId: number) {

  const lastDonation = await prisma.donation.findFirst({
    where: { donorId },
    orderBy: { donationDate: "desc" },
    include: {
      charity: true,
      items: { 
        include: { 
          category: true 
        } 
      }
    }
  });

  const allItems = await prisma.donationItem.findMany({
    where: { donation: { donorId } }, 
    include: { category: true }
  });

  const totalWeight = allItems.reduce((sum: number, item: any) => {
    return sum + Number(item.category.avgWeight);
  }, 0);

  const charitiesSupported = await prisma.donation.findMany({
    where: { donorId },
    select: { charityId: true } 
  });

  const uniqueCharities = new Set(charitiesSupported.map((c: any) => c.charityId)).size;

  return {
    lastDonation,
    totalWeight,
    charitiesSupported: uniqueCharities,
  };
}