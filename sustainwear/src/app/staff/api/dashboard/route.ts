import prisma from "../../../../../lib/prisma"; // ✅ FIXED PATH
import { Prisma, DonationStatus } from "@prisma/client";

const toNumber = (v: Prisma.Decimal | number | null | undefined): number =>
  v ? Number(v.toString()) : 0;

export async function GET() {
  try {
    // ✅ DEBUG: SHOW WHICH DATABASE WE ARE USING
   const dbName = await prisma.$queryRaw<{ db: string }[]>`
  SELECT DATABASE() as db
`;

    console.log("✅ CONNECTED DATABASE:", dbName);

    // 1) TOTAL INVENTORY
    let inventoryRows: {
  totalStock: number;
  category: { avgWeight: Prisma.Decimal | null } | null;
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
      (
        sum: number,
        row: {
          totalStock: number;
          category: { avgWeight: Prisma.Decimal | null } | null;
        }
      ) => sum + row.totalStock * toNumber(row.category?.avgWeight),
      0
    );

    // 2) PENDING DONATIONS
    const pendingCount = await prisma.donation.count({
      where: {
        status: {
          in: [DonationStatus.PENDING, DonationStatus.pending],
        },
      },
    });

    // 3) DISTRIBUTED KG
    const distributedItems = await prisma.donationItem.findMany({
      where: {
        donation: {
          status: {
            in: [DonationStatus.COLLECTED, DonationStatus.collected],
          },
        },
      },
      select: {
        category: { select: { avgWeight: true } },
      },
    });

    const distributedKg = distributedItems.reduce(
      (
        sum: number,
        item: { category: { avgWeight: Prisma.Decimal | null } | null }
      ) => sum + toNumber(item.category?.avgWeight),
      0
    );
// ✅ MONTHLY DONATION DATA (FROM REAL DB)
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

const monthlyData = months.map((month, index) => {
  const donationsCount = donations.filter(
    (d) => new Date(d.donationDate).getMonth() === index
  ).length;

  const distributedCount = donationItems.filter(
    (i) =>
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
  monthlyData, // ✅ now included
});

  } catch (err) {
    console.error("Dashboard API Error:", err);
    return Response.json(
      { totalInventory: 0, pendingCount: 0, distributedKg: 0 },
      { status: 500 }
    );
  }
}
