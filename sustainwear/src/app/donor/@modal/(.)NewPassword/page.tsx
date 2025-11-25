import { useRouter } from "next/router"
import { useState } from "react"
import NewPasswordForm from "@/app/Components/NewPasswordForm"


export default async function NewPasswordModal(){
    const router = useRouter()
    return(
        <div>
            <NewPasswordForm/>
            <button onClick={() => router.back()}>Cancel</button>
        </div>
    )
}