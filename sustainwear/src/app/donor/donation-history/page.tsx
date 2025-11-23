import prisma from "../../../../lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route"; 
import { redirect } from "next/navigation";

export default async function DonationHistory() {

  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    redirect("/api/auth/signin");
  }

  
  const realDonations = await prisma.donation.findMany({
    where: {
      donor: {
        email: session.user.email as string,
      },
    },
    include: {
      charity: true, 
      items: true,   
    },
    orderBy: {
      donationDate: "desc", 
    },
  });

  return (
    <div className="p-10 space-y-6">
      <h1 className="text-4xl font-bold text-gray-900">Donation History</h1>

      <div className="rounded-3xl border-2 border-lime-300 bg-white shadow-sm">
        <div className="m-4 rounded-3xl border border-sky-300 overflow-hidden">
          <table className="min-w-full table-fixed">
            <thead className="bg-gray-50">
              <tr className="text-left text-sm font-semibold text-gray-700">
                <th className="px-6 py-3 w-1/5">Date</th>
                <th className="px-6 py-3 w-1/5">Items</th>
                <th className="px-6 py-3 w-1/5">Charity</th>
                <th className="px-6 py-3 w-1/5">Status</th>
              </tr>
            </thead>

            <tbody className="bg-white text-sm">
              {realDonations.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-8 text-center text-gray-500">
                    You haven't made any donations yet.
                  </td>
                </tr>
              ) : (
                realDonations.map((row) => {

                  let statusColor = "bg-gray-100 text-gray-800"; 

                  if (row.status === "PENDING") statusColor = "bg-yellow-100 text-yellow-800";
                  if (row.status === "COLLECTED") statusColor = "bg-green-100 text-green-800";
                  if (row.status === "SCHEDULED") statusColor = "bg-blue-100 text-blue-800";
                  if (row.status === "REJECTED") statusColor = "bg-red-100 text-red-800";

                  return (
                    <tr
                      key={row.donationId}
                      className="border-t border-gray-100 hover:bg-gray-50"
                    >
                      {}
                      <td className="px-6 py-3">
                        {row.donationDate.toLocaleDateString()}
                      </td>

                      {}
                      <td className="px-6 py-3">
                        {row.items.length} items
                      </td>

                      {}
                      <td className="px-6 py-3">
                        {row.charity.charityName}
                      </td>

                      {}
                      <td className="px-6 py-3">
                        <span
                          className={`inline-flex items-center rounded-full px-4 py-1 text-xs font-semibold ${statusColor}`}
                        >
                          {}
                          {row.status.charAt(0) + row.status.slice(1).toLowerCase()}
                        </span>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {}
        <div className="flex items-center justify-center gap-2 px-6 pb-4">
          <button className="rounded-md border border-gray-300 px-3 py-1 text-sm text-gray-700 hover:bg-gray-100 disabled:opacity-50">
            Prev
          </button>
          <button className="rounded-md bg-lime-400 px-3 py-1 text-sm font-semibold text-white">
            1
          </button>
          <button className="rounded-md border border-gray-300 px-3 py-1 text-sm text-gray-700 hover:bg-gray-100 disabled:opacity-50">
            Next
          </button>
        </div>
      </div>
    </div>
  );
}