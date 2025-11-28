import prisma from "../../../lib/prisma";

export async function getDonorDashboardData(donorId: number) {
  // 1. Last Donation
  const lastDonation = await prisma.donation.findFirst({
    where: { donorId },
    orderBy: { donationDate: "desc" },
    include: {
      Charity: true,
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

  const totalWeight = allItems.reduce((sum, item) => {
    return sum + Number(item.category.avgWeight);
  }, 0);

  const charitiesSupported = await prisma.donation.findMany({
    where: { donorId },
    select: { charityCharityId: true } 
  });

  const uniqueCharities = new Set(charitiesSupported.map(c => c.charityCharityId)).size;

  return {
    lastDonation,
    totalWeight,
    charitiesSupported: uniqueCharities,
  };
}