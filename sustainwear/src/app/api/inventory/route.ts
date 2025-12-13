import { NextResponse } from "next/server";
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const inventories = await prisma.inventory.findMany({
      include: {
        category: true,
        condition: true,
        size: true,
        gender: true,
      },
      orderBy: {
        updatedAt: "desc",
      },
    });

    return NextResponse.json(inventories);
  } catch (error) {
    console.error("Inventory fetch error:", error);
    return NextResponse.json(
      { error: "Failed to fetch inventory" },
      { status: 500 }
    );
  }
}