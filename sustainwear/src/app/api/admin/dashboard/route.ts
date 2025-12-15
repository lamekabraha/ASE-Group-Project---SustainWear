import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import prisma from "@/lib/prisma"; // Adjust path to your prisma client
import { authOptions } from "../../auth/[...nextauth]/route";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) return new NextResponse("Unauthorized", { status: 401 });

  // 1. Calculate Date Range (Last 6 Months)
  const sixMonthsAgo = new Date();
  sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

  try {
    // 2. Fetch Donations in last 6 months (Include items & categories for weight)
    const donations = await prisma.donation.findMany({
      where: {
        donationDate: { gte: sixMonthsAgo },
        status: { not: "REJECTED" } // Filter out rejected
      },
      include: {
        items: {
          include: { category: true }
        }
      }
    });

    // 3. Fetch Distributions in last 6 months
    const distributions = await prisma.distribution.findMany({
      where: {
        date: { gte: sixMonthsAgo },
        status: "Completed" // Assuming you only want completed distributions
      },
      include: {
        items: { // Note: Capital 'I' based on your schema 'Items' relation
          include: { category: true }
        }
      }
    });

    // 4. Helper to initialize the last 6 months structure
    const monthlyData = new Map();
    for (let i = 5; i >= 0; i--) {
      const d = new Date();
      d.setMonth(d.getMonth() - i);
      const monthName = d.toLocaleString('default', { month: 'short' });
      monthlyData.set(monthName, { name: monthName, incoming: 0, outgoing: 0 });
    }

    // 5. Aggregate Donation Weights
    donations.forEach(donation => {
      const month = donation.donationDate.toLocaleString('default', { month: 'short' });
      if (monthlyData.has(month)) {
        const entry = monthlyData.get(month);
        const weight = donation.items.reduce((sum, item) => sum + Number(item.category.avgWeight), 0);
        entry.incoming += weight;
      }
    });

    // 6. Aggregate Distribution Weights
    distributions.forEach(dist => {
      const month = dist.date.toLocaleString('default', { month: 'short' });
      if (monthlyData.has(month)) {
        const entry = monthlyData.get(month);
        const weight = dist.items.reduce((sum, item) => sum + Number(item.category.avgWeight), 0);
        entry.outgoing += weight;
      }
    });

    // 7. Get KPI totals (from your previous code logic)
    const totalInventory = await prisma.inventory.aggregate({ _sum: { totalStock: true }}); 
    // Note: You might need a more complex query for total KG inventory, but strictly for the chart:
    
    return NextResponse.json({
      totalInventory: 1200, // Placeholder or calculated from Inventory table
      pendingCount: await prisma.donation.count({ where: { status: "PENDING" }}),
      distributedKg: 500, // Placeholder or calculated
      chartData: Array.from(monthlyData.values()) // <--- SENDING THIS TO FRONTEND
    });

  } catch (error) {
    console.error(error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}