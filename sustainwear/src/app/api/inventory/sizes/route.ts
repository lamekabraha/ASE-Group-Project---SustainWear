import { NextResponse } from "next/server";
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const inventories = await prisma.size.findMany({
      select:{
          sizeId: true,
          size:true,
      },
      orderBy:{
        sizeId:'asc'
      }
    });

    return NextResponse.json(inventories);
  } catch (error) {
    console.error("Failed to fetch sizes", error);
    return NextResponse.json(
      { error: "Failed to fetch sizes" },
      { status: 500 }
    );
  }
}