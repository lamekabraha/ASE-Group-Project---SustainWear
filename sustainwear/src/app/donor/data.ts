import prisma from "../../lib/prisma";

export async function getDonorDashboardData(donorId: number) {
  const lastDonation = await prisma.donationItem.findMany({
    where: {
      donation: { donorId },
      distributionId: { not: null },
    },
  });

  const allItems = await prisma.donationItem.findMany({
    where: { donation: { donorId } },
    include: { category: true },
  });

  const totalWeight = allItems.reduce((sum, item) => {
    return sum + Number(item.category.avgWeight);
  }, 0);

  const charitiesSupported = await prisma.donation.findMany({
    where: { donorId },
    select: { charityId: true },
  });

  const uniqueCharities = new Set(
    charitiesSupported.map((c: { charityId: number | null }) => c.charityId)
  ).size;

  return {
    lastDonation,
    totalWeight,
    charitiesSupported: uniqueCharities,
  };
}
