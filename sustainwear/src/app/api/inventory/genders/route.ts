import { NextResponse } from "next/server";
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const inventories = await prisma.gender.findMany({
      select:{
          genderId: true,
          gender:true,
      },
      orderBy:{
        genderId:'asc'
      }
    });

    return NextResponse.json(inventories);
  } catch (error) {
    console.error("Failed to fetch genders", error);
    return NextResponse.json(
      { error: "Failed to fetch genders" },
      { status: 500 }
    );
  }
}