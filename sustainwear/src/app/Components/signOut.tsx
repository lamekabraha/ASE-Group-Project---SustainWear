import { signOut } from "next-auth/react";
    export async function SignOutBtn(){
        return (
            <div>
                <button
                    onClick={() => signOut( {callbackUrl: '/'})}
                    className="py-2 px-4 bg-alert rounded-full font-semibold "
                >
                    Sign Out
                </button>
            </div>
        )
    }