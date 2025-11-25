import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { getDonorDashboardData } from "./data";

export default async function Page() {
  const session = await getServerSession(authOptions);
  const donorId = session?.user?.id;

  const data = await getDonorDashboardData(Number(donorId));
  const last = data.lastDonation;

  return (
    <section className="mx-auto max-w-7xl">

      <h1 className="text-[34px] font-semibold text-[#2B2B2B]">Home</h1>

      <div className="mt-6 space-y-10">

    return(
        <div>
            <h1>welcome {session?.user?.firstName}</h1>
            <h1 className="bg-blue-500">Hello World</h1>
            <ItemsDonated/>
            <button><Link href="/donor/my-impact">My Impact</Link></button>
        </div>

        {/* Last Donation */}
        <div className="flex items-center justify-between">
          <h3 className="text-[28px] font-semibold">Last Donation</h3>
        </div>

        <div className="rounded-[18px] border-2 border-[#BFE085] bg-white p-4 overflow-x-auto">
          <table className="min-w-full text-[14px]">

            {/* Table Headers */}
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
                  <Td>{last.donationDate.toLocaleDateString()}</Td>
                  <Td>{last.items.length}</Td>
                  <Td>{last.charity.charityName}</Td>
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

        {/* Impact */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ImpactBox title="Total Weight Donated:" value={`${data.totalWeight} Kg`} />
          <ImpactBox title="Charities Supported:" value={String(data.charitiesSupported)} />
        </div>

      </div>
    </section>
  );
}

/* ---------- Reusable Components ---------- */

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
