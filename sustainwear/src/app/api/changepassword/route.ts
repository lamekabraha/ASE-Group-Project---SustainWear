import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route'; 
import prisma from '../../../../lib/prisma'; 

import bcrypt from "bcryptjs"; 

export async function PATCH(req: NextRequest) {
    
    const session = await getServerSession(authOptions); 
    
    if (!session?.user?.email) {
        return NextResponse.json({ message: 'Not authenticated. Please log in.' }, { status: 401 });
    }

    const { currentPassword, newPassword } = await req.json();
    const userEmail = session.user.email;

    if (!currentPassword || !newPassword || newPassword.length < 8) {
        return NextResponse.json({ 
            message: 'Invalid input. New password must be at least 8 characters.' 
        }, { status: 400 });
    }

    if (currentPassword === newPassword) {
        return NextResponse.json({
            message: 'The new password cannot be the same as the current password.'
        }, { status: 400 });
    }

    try {
        const user = await prisma.user.findUnique({
            where: { email: userEmail },
            select: { hashedPassword: true },
        });

        if (!user || !user.hashedPassword) {
            return NextResponse.json({ message: 'Password method not available for this account.' }, { status: 403 });
        }

        const passwordIsValid = await bcrypt.compare(currentPassword, user.hashedPassword);
        
        if (!passwordIsValid) {
            return NextResponse.json({ message: 'The current password you entered is incorrect.' }, { status: 403 });
        }

        const saltRounds = 10;
        const newHashedPassword = await bcrypt.hash(newPassword, saltRounds);

        await prisma.user.update({
            where: { email: userEmail },
            data: {
                hashedPassword: newHashedPassword,
            },
        });

        return NextResponse.json({ message: 'Password updated successfully! ✅' });

    } catch (error) {
        console.error('Password update error:', error);
        return NextResponse.json({ message: 'A server error occurred during the password change.' }, { status: 500 });
    }
}