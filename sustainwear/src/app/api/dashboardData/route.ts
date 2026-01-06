import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

export const dynamic = "force-dynamic";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const pendingCount = await prisma.donation.count({
      where: { status: { in: ["PENDING", "pending"] } },
    });

    const inventoryItems = await prisma.donationItem.findMany({
      where: {
        distributionId: null,
        donation: { status: { in: ["COLLECTED", "collected"] } },
      },
      include: { category: true },
    });

    const totalInventory = inventoryItems.reduce((sum, item) => {
      return sum + Number(item.category.avgWeight || 0);
    }, 0);

    const distributedItems = await prisma.donationItem.findMany({
      where: { distributionId: { not: null } },
      include: { category: true },
    });

    const distributedKg = distributedItems.reduce((sum, item) => {
      return sum + Number(item.category.avgWeight || 0);
    }, 0);

    const monthlyData = await getMonthlyActivity();

    return NextResponse.json({
      totalInventory: Math.round(totalInventory),
      pendingCount,
      distributedKg: Math.round(distributedKg),
      monthlyData,
    });
  } catch (error) {
    console.error("Dashboard API Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch dashboard data" },
      { status: 500 }
    );
  }
}

async function getMonthlyActivity() {
  const allDonations = await prisma.donation.findMany({
    where: { status: { in: ["COLLECTED", "collected"] } },
    include: { items: { include: { category: true } } },
  });

  const allDistributions = await prisma.distribution.findMany({
    include: { items: { include: { category: true } } },
  });

  const currentYear = new Date().getFullYear();
  const startDate = new Date(currentYear, 0, 1);
  const endDate = new Date(currentYear, 11, 31);

  const chartData = [];
  const iterator = new Date(startDate);

  while (iterator <= endDate) {
    const monthName = iterator.toLocaleString("default", { month: "short" });
    const iterMonth = iterator.getMonth();
    const iterYear = iterator.getFullYear();

    const monthlyDonations = allDonations
      .filter((d) => {
        const date = new Date(d.donationDate);
        return date.getMonth() === iterMonth && date.getFullYear() === iterYear;
      })
      .reduce((acc, d) => {
         return acc + d.items.reduce((sum, item) => sum + (Number(item.category.avgWeight) || 0), 0);
      }, 0);

    const monthlyDistributions = allDistributions
      .filter((d) => {
        const date = new Date(d.date);
        return date.getMonth() === iterMonth && date.getFullYear() === iterYear;
      })
      .reduce((acc, d) => {
         return acc + d.items.reduce((sum, item) => sum + (Number(item.category.avgWeight) || 0), 0);
      }, 0);

    chartData.push({
      month: monthName,
      donations: Math.round(monthlyDonations),
      distributed: Math.round(monthlyDistributions),
    });

    iterator.setMonth(iterator.getMonth() + 1);
  }

  return chartData;
}