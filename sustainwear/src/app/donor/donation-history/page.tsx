import prisma from "../../../../lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route"; 
import { redirect } from "next/navigation";
import DonorDonationHistoryTable from "@/app/Components/DonorDonationHistoryTable";

export default async function DonationHistory() {

  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    redirect("/api/auth/signin");
  }

  return (
    <div className="p-10 space-y-6">
      <h1 className="text-4xl font-bold text-gray-900">Donation History</h1>

      <DonorDonationHistoryTable/>
    </div>
  );
}