import { NextResponse } from "next/server";
import prisma from "../../../../../lib/prisma";

export async function PUT(req: Request) {
  try {
    const body = await req.json();

    const {
      id,
      categoryId,
      conditionId,
      sizeId,
      genderId,
    } = body;

    if (!id) {
      return NextResponse.json(
        { error: "Missing inventory id" },
        { status: 400 }
      );
    }

    await prisma.inventory.update({
      where: {
        inventoryId: Number(id),
      },
      data: {
        categoryId: Number(categoryId),
        conditionId: Number(conditionId),
        sizeId: sizeId ? Number(sizeId) : null,
        genderId: Number(genderId),
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Inventory update failed:", error);
    return NextResponse.json(
      { error: "Failed to update inventory" },
      { status: 500 }
    );
  }
}
