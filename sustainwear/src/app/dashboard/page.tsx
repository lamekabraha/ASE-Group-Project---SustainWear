'use client'
import { getServerSession } from 'next-auth';
import { useSession } from 'next-auth/react';
import { signOut } from "next-auth/react";
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';

export default async function dashboard(){
    const{data: session} = useSession();
    const sessionInfo = await getServerSession(authOptions)

    if (sessionInfo==null) {
        return redirect('/auth/login')
    }

    return(
        <div>

            <div>
                name: <span className="font-bold">{session?.user?.firstName} {session?.user?.lastName}</span>
            </div>
            <div>
                email: <span className="font-bold">{session?.user?.email}</span>
            </div>
            
            <button onClick={() => signOut({callbackUrl: '/auth/login'})}>sign out</button>
        </div>
    );
}