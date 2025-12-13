
import CharityStaffSidebar from "../Components/CharityStaffSidebar";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import {redirect} from 'next/navigation'

export default async function Layout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);
  const role = session?.user?.role;

  if (role !== "Staff") {
    redirect("/")
  }



    return(
        <main className="flex h-screen overflow-hidden">
            <CharityStaffSidebar/>
            <div className="flex-1 overflow-y-auto">
                {children}
            </div>
        </main>
    )
}
