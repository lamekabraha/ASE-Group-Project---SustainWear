import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { status } = await request.json(); 
    
    const donationId = Number(params.id); 

    const updatedDonation = await prisma.donation.update({
      where: { 
        donationId: donationId 
      }, 
      data: { status: status },
    });

    return NextResponse.json(updatedDonation);
  } catch (error) {
    console.error("Error updating donation:", error);
    return NextResponse.json(
      { error: "Failed to update donation status" },
      { status: 500 }
    );
  }
}