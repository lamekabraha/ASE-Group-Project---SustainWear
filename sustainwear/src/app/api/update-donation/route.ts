import { NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { donationId, status } = body;

    if (!donationId || !status) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
    }

    const updatedDonation = await prisma.donation.update({
      where: { donationId: Number(donationId) },
      data: { 
        status: status,
      },
    });

    return NextResponse.json(updatedDonation, { status: 200 });
  } catch (error) {
    console.error("Error updating donation:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}