import { NextResponse } from 'next/server';
import { getServerSession } from "next-auth";
import prisma from '../../../../lib/prisma';
import { authOptions } from "@/app/api/auth/[...nextauth]/route"; 

export async function DELETE(request: Request) {
    try {
        const session = await getServerSession(authOptions);

        if (!session?.user?.email) {
            return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
        }

        const currentUser = await prisma.user.findUnique({
            where: { email: session.user.email },
            select: { role: true }
        });

        if (currentUser?.role !== 'Admin') {
            return NextResponse.json({ message: 'Forbidden' }, { status: 403 });
        }

        const { userId } = await request.json();

        if (!userId || typeof userId !== 'number') {
            return NextResponse.json({ message: 'Invalid ID' }, { status: 400 });
        }

        const targetUser = await prisma.user.findUnique({ 
            where: { userId },
            select: { email: true } 
        });

        if (targetUser?.email === session.user.email) {
             return NextResponse.json({ message: 'Cannot delete own account' }, { status: 400 });
        }

        await prisma.user.delete({
            where: { userId },
        });

        return NextResponse.json({ success: true }, { status: 200 });
        
    } catch (error: any) {
        if (error.code === 'P2025') {
             return NextResponse.json({ message: 'User not found' }, { status: 404 });
        }

        console.error('Delete user error:', error);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}