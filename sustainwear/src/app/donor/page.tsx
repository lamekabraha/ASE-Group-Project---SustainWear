import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route"; 
import { getDonorDashboardData } from "./data"; 
import ItemsDonated from "../Components/data-cards/ItemsDonated"; 
import Link from "next/link";


export default async function Page() {
  const session = await getServerSession(authOptions);
  
  if (!session?.user?.id) {
    return (
      <section className="mx-auto max-w-7xl p-10">
        <h1 className="text-xl text-red-600">Authentication Required.</h1>
      </section>
    );
  }

  const donorId = session.user.id;
  const data = await getDonorDashboardData(Number(donorId));
  const last = data.lastDonation;

  return (
    <section className="mx-auto max-w-7xl">

      <h1 className="text-[34px] font-semibold text-[#2B2B2B]">
        Welcome, {session?.user?.firstName || 'Donor'}
      </h1>

      <div className="mt-6 space-y-10">
        
        <div className="flex justify-between items-center bg-[#F7F7F7] p-5 rounded-lg">
             <h3 className="text-xl font-medium">Dashboard Overview</h3>
             <ItemsDonated/> 
        </div>

        <div className="flex items-center justify-between">
          <h3 className="text-[28px] font-semibold">Last Donation</h3>
          <button className="text-sm font-medium text-[#2B2B2B] hover:text-[#FF6A3D]">
            <Link href="/donor/donation-history">View All</Link>
          </button>
        </div>

        <div className="rounded-[18px] border-2 border-[#BFE085] bg-white p-4 overflow-x-auto">
          <table className="min-w-full text-[14px]">

            <thead className="bg-[#F7F7F7] text-[#5B6470]">
              <tr className="text-left">
                <Th>Date</Th>
                <Th>Items</Th>
                <Th>Charity</Th>
                <Th>Status</Th>
              </tr>
            </thead>

            <tbody>
              {last ? (
                <tr className="border-t">
                  <Td>{new Date(last.donationDate).toLocaleDateString()}</Td> 
                  <Td>{last.items.length}</Td>
                  <Td>{last.Charity?.charityName || 'N/A'}</Td> 
                  <Td>
                    <span className="bg-[#FCEFC3] text-[#9C7A09] border px-3 py-1 rounded-full text-xs font-semibold uppercase">
                      {last.status.toLowerCase()}
                    </span>
                  </Td>
                </tr>
              ) : (
                <tr>
                  <Td colSpan={4}>No donations yet.</Td>
                </tr>
              )}
            </tbody>

          </table>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ImpactBox title="Total Weight Donated:" value={`${data.totalWeight.toFixed(2)} Kg`} />
          <ImpactBox title="Charities Supported:" value={String(data.charitiesSupported)} />
        </div>

      </div>
    </section>
  );
}


function Th({ children }: { children: React.ReactNode }) {
  return <th className="px-5 py-3 font-semibold">{children}</th>;
}

function Td({ children, colSpan }: { children: React.ReactNode; colSpan?: number }) {
  return <td colSpan={colSpan} className="px-5 py-3">{children}</td>;
}

function ImpactBox({ title, value }: { title: string; value: string | number }) {
  return (
    <div className="rounded-[18px] border-2 border-[#BFE085] bg-white p-6">
      <p className="font-medium text-[#333C46]">{title}</p>
      <p className="text-4xl font-extrabold text-[#222]">{value}</p>
    </div>
  );
}