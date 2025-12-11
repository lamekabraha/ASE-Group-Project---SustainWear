import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/../lib/prisma";
import { redirect } from "next/navigation";

export default async function DonorDonationHistoryTable() {
  const session = await getServerSession(authOptions);

  const donorId = session?.user?.id;

  const donations = await prisma.donation.findMany({
    where: {
      donorId: donorId,
    },
    select: {
      donationId: true,
      donationDate: true,
      notes: true,
      status: true,
      _count: {
        select: {
          items: true,
        },
      },
    },
    orderBy: {
      donationDate: "desc",
    },
  });

  return (
    <div className="border-2 border-green rounded-2xl p-5 flex gap-4 col-span-7">
      <table className="min-w-full table-fixed">
        <thead className="bg-gray-50">
          <tr className="text-left text-sm font-semibold text-gray-700">
            <th className="px-6 py-3 w-1/5">Date</th>
            <th className="px-6 py-3 w-1/5">Number of Items</th>
            <th className="px-6 py-3 w-1/5">Notes</th>
            <th className="px-6 py-3 w-1/5">Status</th>
          </tr>
        </thead>

                <tbody className="bg-white text-sm">
                {donations.map((row) => {
                    let statusClasses = row.status.charAt(0).toUpperCase() + row.status.slice(1);
                    statusClasses =
                    row.status === "Pending"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-green-100 text-green-800";

            return (
              <tr
                key={row.donationId}
                className="border-t border-gray-100 hover:bg-gray-50"
              >
                <td className="px-6 py-3">
                  {new Date(row.donationDate).toLocaleDateString()}
                </td>
                <td className="px-6 py-3">{row._count.items}</td>
                <td className="px-6 py-3">{row.notes ?? "-"}</td>
                <td className="px-6 py-3">
                  <span
                    className={`inline-flex items-center rounded-full px-4 py-1 text-xs font-semibold ${statusClasses}`}
                  >
                    {row.status}
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
