
import Link from "next/link";
import AdminSidebar from "../Components/AdminSidebar";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
export default async function Layout({ children }: { children: React.ReactNode }) {
    const session = await getServerSession(authOptions)

    if (session?.user?.role !== "Admin"){
        redirect("/")
    }
    
    return(
        <main className="flex h-screen overflow-hidden">
            <AdminSidebar />
            <div className="flex-1 overflow-y-auto">
                {children}
            </div>
        </main>
    )
}
