import { NextResponse, NextRequest } from "next/server";
import prisma from '../../../../lib/prisma';
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

export async function POST(req: NextRequest) {
    try{
        const session = await getServerSession(authOptions);
        if (!session){
            return NextResponse.json("Unauthorized", {status: 401});
        }

        const password
    }
}