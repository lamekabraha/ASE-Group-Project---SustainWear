import { NextResponse } from "next/server";
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const inventories = await prisma.category.findMany({
      select:{
          categoryId: true,
          category:true,
      },
      orderBy:{
        categoryId:'asc'
      }
    });

    return NextResponse.json(inventories);
  } catch (error) {
    console.error("Failed to fetch categories", error);
    return NextResponse.json(
      { error: "Failed to fetch categories" },
      { status: 500 }
    );
  }
}