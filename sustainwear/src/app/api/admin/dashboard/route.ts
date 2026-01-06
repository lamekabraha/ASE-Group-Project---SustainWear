import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import prisma from "@/lib/prisma";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) return new NextResponse("Unauthorized", { status: 401 });

  const sixMonthsAgo = new Date();
  sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

  try {
    const donations = await prisma.donation.findMany({
      where: {
        donationDate: { gte: sixMonthsAgo },
        status: { not: "REJECTED" }
      },
      include: {
        items: {
          include: { category: true }
        }
      }
    });

    const distributions = await prisma.distribution.findMany({
      where: {
        date: { gte: sixMonthsAgo },
        status: "Completed" 
      },
      include: {
        items: {
          include: { category: true }
        }
      }
    });

    const monthlyData = new Map();
    for (let i = 5; i >= 0; i--) {
      const d = new Date();
      d.setMonth(d.getMonth() - i);
      const monthName = d.toLocaleString('default', { month: 'short' });
      monthlyData.set(monthName, { name: monthName, incoming: 0, outgoing: 0 });
    }

    donations.forEach(donation => {
      const month = donation.donationDate.toLocaleString('default', { month: 'short' });
      if (monthlyData.has(month)) {
        const entry = monthlyData.get(month);
        const weight = donation.items.reduce((sum, item) => sum + Number(item.category.avgWeight), 0);
        entry.incoming += weight;
      }
    });

    distributions.forEach(dist => {
      const month = dist.date.toLocaleString('default', { month: 'short' });
      if (monthlyData.has(month)) {
        const entry = monthlyData.get(month);
        const weight = dist.items.reduce((sum, item) => sum + Number(item.category.avgWeight), 0);
        entry.outgoing += weight;
      }
    });

    const totalInventory = await prisma.inventory.aggregate({ _sum: { totalStock: true }}); 
    
    return NextResponse.json({
      totalInventory: 1200,
      pendingCount: await prisma.donation.count({ where: { status: "PENDING" }}),
      distributedKg: 500, 
      chartData: Array.from(monthlyData.values()) 
    });

  } catch (error) {
    console.error(error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}