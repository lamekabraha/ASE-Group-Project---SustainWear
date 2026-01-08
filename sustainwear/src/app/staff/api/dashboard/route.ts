import prisma from "../../../../lib/prisma";


 
const toNumber = (v: any): number => {
  if (v === null || v === undefined) return 0;
  if (typeof v === 'object' && typeof v.toNumber === 'function') {
    return v.toNumber();
  }
  const n = Number(v);
  return isNaN(n) ? 0 : n;
};

export async function GET() {
  try {
    await prisma.$queryRaw`SELECT 1`;

    let inventoryRows: any[] = [];
    try {
      inventoryRows = await prisma.inventory.findMany({
        select: {
          totalStock: true,
          category: { select: { avgWeight: true } },
        },
      });
    } catch (err) {
      console.error("Inventory Fetch Error:", err);
      inventoryRows = [];
    }

    const totalInventory = inventoryRows.reduce(
      (sum: number, row) => sum + (row.totalStock * toNumber(row.category?.avgWeight)),
      0
    );

    const pendingCount = await prisma.donation.count({
      where: { status: "pending" },
    });

    const distributedItems = await prisma.donationItem.findMany({
      where: {
        donation: { status: "collected" },
      },
      select: {
        category: { select: { avgWeight: true } },
      },
    });

    const distributedKg = distributedItems.reduce(
      (sum: number, item: any) => sum + toNumber(item.category?.avgWeight),
      0
    );

    const donations = await prisma.donation.findMany({
      select: { donationDate: true },
    });

    const donationItems = await prisma.donationItem.findMany({
      select: {
        donation: { select: { donationDate: true } },
      },
    });

    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];

    const monthlyData = months.map((month: string, index: number) => {
      const donationsCount = donations.filter(
        (d: any) => new Date(d.donationDate).getMonth() === index
      ).length;

      const distributedCount = donationItems.filter(
        (i: any) =>
          i.donation?.donationDate &&
          new Date(i.donation.donationDate).getMonth() === index
      ).length;

      return {
        month,
        donations: donationsCount,
        distributed: distributedCount,
      };
    });

    return Response.json({
      totalInventory,
      pendingCount,
      distributedKg,
      monthlyData,
    });

  } catch (err) {
    console.error("Dashboard API Error:", err);
    return Response.json(
      {
        totalInventory: 0,
        pendingCount: 0,
        distributedKg: 0,
        monthlyData: [],
      },
      { status: 500 }
    );
  }
}