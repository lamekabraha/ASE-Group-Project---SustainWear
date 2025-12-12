import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "../../../../lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
        return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const donorId = session.user.id;

    try {
        const { items } = await req.json();

        if (!items || items.length === 0) {
            return NextResponse.json({ error: "No items in donation" }, { status: 400 });
        }

        const donation = await prisma.donation.create({
            data: {
                donorId: Number(donorId),
                status: "Pending",
            },
        });

        const donationItems = items.map((item: any) => ({
            donationId: donation.donationId,
            photoUrl: item.imageUrl,
            description: item.description,
            categoryId: item.categoryId,
            sizeId: item.sizeId,
            genderId: item.genderId,
            conditionId: item.conditionId,
            status: "Pending",
        }));

        await prisma.donationItem.createMany({
            data: donationItems,
        });

        return NextResponse.json({ success: true, donationId: donation.donationId });
    } catch (error) {
        console.error("Error creating donation:", error);
        return NextResponse.json({ error: "Failed to create donation" }, { status: 500 });
    }
}

