import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import prisma from '../../../../lib/prisma';

export async function POST(req: { json: () => PromiseLike<{ firstName: any; lastName: any; email: any; password: any; confirmPassword: any; }> | { firstName: any; lastName: any; email: any; password: any; confirmPassword: any; }; }) {
    try{ 
        const {firstName, lastName, email, password,} = await req.json();
        const hashedPassword = await bcrypt.hash(password, 10);
        await prisma.user.create({
            data: {
                firstName,
                lastName,
                email,
                hashedPassword: hashedPassword
            }
        })
        

        return NextResponse.json({message: 'User registered successfully.'}, {status: 201})
    }catch (error){
        return NextResponse.json({message: 'An error occured while registering the user'}, {status: 500})
    }
}