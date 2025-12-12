import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route'; 
import prisma from '../../../lib/prisma'; 

export async function DELETE(req: NextRequest) {
    
    const session = await getServerSession(authOptions); 
    
    if (!session?.user?.email) {
        return NextResponse.json({ message: 'Not authenticated. Please log in.' }, { status: 401 });
    }

    const userEmail = session.user.email;

    try {

        await prisma.user.delete({
            where: { email: userEmail },
        });

        return NextResponse.json({ 
            message: 'Account deleted successfully. Goodbye!' 
        }, { status: 200 });

    } catch (error) {
        console.error('Account deletion error:', error);
        
        return NextResponse.json({ 
            message: 'Failed to delete account due to a server error or dependency issues.' 
        }, { status: 500 });
    }
}