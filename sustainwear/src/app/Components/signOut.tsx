import { signOut } from "next-auth/react";
    export async function SignOutBtn(){
        return (
            <div>
                <button onClick={() => signOut( {callbackUrl: '/'})}>sign out</button>
            </div>
        )
    }