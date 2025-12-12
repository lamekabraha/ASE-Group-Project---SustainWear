import { NextResponse, NextRequest } from "next/server";
import prisma from '../../../lib/prisma';

export async function POST(req: NextRequest) {
    try{
        const body = await req.json();
        const {email: requestEmail} = body;

        const user = await prisma.user.findFirst({
            where: {
                email: requestEmail
            }
        });

        return NextResponse.json({user});
    }catch (error){
        console.error("Database or parsing error: ", error);
        return NextResponse.json({
            success:false,
            message:'An Unexpected Error Occurred.'
        }, {status:500})
    }
}