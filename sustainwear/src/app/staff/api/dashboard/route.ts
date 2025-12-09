import prisma from "../../../../../lib/prisma";

const toNumber = (v: number | string | null | undefined): number =>
  v ? Number(v) : 0;

export async function GET() {
  try {
    // ✅ DEBUG: SHOW WHICH DATABASE WE ARE USING
    const dbName = await prisma.$queryRaw<{ db: string }[]>`
      SELECT DATABASE() as db
    `;
    console.log("✅ CONNECTED DATABASE:", dbName);

    // ✅ 1) TOTAL INVENTORY
    let inventoryRows: {
      totalStock: number;
      category: { avgWeight: number | string | null } | null;
    }[] = [];

    try {
      inventoryRows = await prisma.inventory.findMany({
        select: {
          totalStock: true,
          category: { select: { avgWeight: true } },
        },
      });
    } catch {
      inventoryRows = [];
    }

    const totalInventory = inventoryRows.reduce(
      (sum: number, row) =>
        sum + row.totalStock * toNumber(row.category?.avgWeight),
      0
    );

    // ✅ 2) PENDING DONATIONS (matches your DB = lowercase "pending")
    const pendingCount = await prisma.donation.count({
      where: {
        status: "pending",
      },
    });

    // ✅ 3) DISTRIBUTED KG (uses collected only)
    const distributedItems = await prisma.donationItem.findMany({
      where: {
        donation: {
          status: "collected",
        },
      },
      select: {
        category: { select: { avgWeight: true } },
      },
    });

    const distributedKg = distributedItems.reduce(
      (
        sum: number,
        item: { category: { avgWeight: number | string | null } | null }
      ) => sum + toNumber(item.category?.avgWeight),
      0
    );

    // ✅ 4) MONTHLY DONATION DATA (REAL DB → REAL CHART)
    const donations = await prisma.donation.findMany({
      select: { donationDate: true },
    });

    const donationItems = await prisma.donationItem.findMany({
      select: {
        donation: {
          select: { donationDate: true },
        },
      },
    });

    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];

    const monthlyData = months.map((month: string, index: number) => {
  const donationsCount = donations.filter(
    (d: { donationDate: Date }) =>
      new Date(d.donationDate).getMonth() === index
  ).length;

  const distributedCount = donationItems.filter(
    (i: { donation: { donationDate: Date } | null }) =>
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
