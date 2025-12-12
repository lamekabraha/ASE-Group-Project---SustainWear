import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route'; 
import prisma from '../../../lib/prisma'; 

export async function PATCH(req: NextRequest) {
    
    const session = await getServerSession(authOptions); 
    
    if (!session?.user?.email) {
        return NextResponse.json({ message: 'Not authenticated. Please log in.' }, { status: 401 });
    }

    const { firstName, lastName, } = await req.json();
    const userEmail = session.user.email;

    console.log("API Received Name:", firstName, lastName);
    console.log("Updating User Email:", userEmail);

    if (!firstName || !lastName) {
        return NextResponse.json({ 
            message: 'First name and last name are required.' 
        }, { status: 400 });
    }

    try {
        const updatedUser = await prisma.user.update({
            where: { email: userEmail },
            data: {
                firstName: firstName,
                lastName: lastName,
            },
            select: {
                firstName: true,
                lastName: true,
                email: true,
            }
        });

        return NextResponse.json({ 
            message: 'Profile updated successfully', 
            user: updatedUser 
        });

    } catch (error) {
        console.error('Prisma update error:', error);

        if (error instanceof Error && 'code' in error && error.code === 'P2002') { 
             return NextResponse.json({ 
                message: 'A user with that email already exists.' 
            }, { status: 409 });
        }
        
        return NextResponse.json({ 
            message: 'Failed to update user profile due to a server error.' 
        }, { status: 500 });
    }
}