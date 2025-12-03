    'use client';

import { getServerSession } from "next-auth";
    import { signOut } from "next-auth/react";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

    export async function SignOutBtn(){
        const session = getServerSession(authOptions)

        if (!session || session?.user?.role !== 'Donor'){
            redirect("/");
        }
        return (
            <div>
                <button onClick={() => signOut()}>sign out</button>
            </div>
        )
    }