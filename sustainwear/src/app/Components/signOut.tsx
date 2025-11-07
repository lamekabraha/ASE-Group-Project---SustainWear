    'use client';

    import { signOut } from "next-auth/react";

    export async function SignOutBtn(){
        return (
            <div>
                <button onClick={() => signOut()}>sign out</button>
            </div>
        )
    }