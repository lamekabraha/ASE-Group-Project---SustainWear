'use client'
import { signOut } from "next-auth/react"
import type { Session } from "next-auth"

interface DashboardPageProps {
    session: Session;
}

export default function DashboardPage({ session }: DashboardPageProps) {
    return(
        <div>
            <div>
                <h1>FirstName: {session.user.firstName}</h1>
                <h1>LastName: {session.user.lastName}</h1>
                <h1>Email: {session.user.email}</h1>
                <h1>Role: {session.user.role}</h1>
            </div>
            <div>
                <button onClick={() => signOut({callbackUrl: '/'})}>Sign Out</button>
            </div>
        </div>
    )
}