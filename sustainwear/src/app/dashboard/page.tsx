import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import DashboardPage from "./ClientDashboard";

export default async function Dashboard() {
    const session = await getServerSession(authOptions);

    if (!session) {
        return redirect("/auth/login");
    }

    return <DashboardPage session={session} />;
}