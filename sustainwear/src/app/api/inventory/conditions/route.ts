import { NextResponse } from "next/server";
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const inventories = await prisma.condition.findMany({
      select:{
          conditionId: true,
          condition:true,
      },
      orderBy:{
        conditionId:'asc'
      }
    });

    return NextResponse.json(inventories);
  } catch (error) {
    console.error("Failed to fetch conditions", error);
    return NextResponse.json(
      { error: "Failed to fetch conditions" },
      { status: 500 }
    );
  }
}