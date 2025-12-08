import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "../../../../../lib/prisma";

export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
        return NextResponse.json({message: "Unauthorized"}, {status: 401});
    }

    const userId = Number(session.user.id);
    const body = await request.json();
    const {items} = body;

    if (!items || items.lenth === 0){
        return NextResponse.json({message: "No items provided"}, {status: 400});
    }

    const newDonation = await prisma.donation.create({
        data: {
            donationDate: new Date(),
            status: "pending",
            donorId: userId,
            staffId: null,
            items: {
                create: items.map((item: any) => ({
                    photoUrl: item.photoUrl,
                    description: item.description,
                    status: item.status,
                    // donationId: newDonation.donationId,
                    categoryId: Number(item.categoryId),
                    conditionId: Number(item.conditionId),
                    sizeId: Number(item.sizeId),
                    genderId: Number(item.genderId)
                }))
            }
        },
    });

    return NextResponse.json({message: "Success", donationId: newDonation.donationId}, {status: 201});
  }catch (error){
    console.error(error);
    return NextResponse.json({message: "Internal Server Error"}, {status: 500})
  }
}