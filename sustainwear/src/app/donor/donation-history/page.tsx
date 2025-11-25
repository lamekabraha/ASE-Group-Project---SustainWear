
type DonationRow = {
  id: number;
  date: string;
  items: number;
  charity: number;
  status: "Pending" | "Success";
};

const mockDonations: DonationRow[] = [
  { id: 1, date: "14/10/2025", items: 4, charity: 4, status: "Pending" },
  { id: 2, date: "14/10/2025", items: 3, charity: 3, status: "Success" },
  { id: 3, date: "14/10/2025", items: 1, charity: 1, status: "Success" },
  { id: 4, date: "14/10/2025", items: 3, charity: 3, status: "Success" },
  { id: 5, date: "14/10/2025", items: 4, charity: 4, status: "Success" },
  { id: 6, date: "14/10/2025", items: 3, charity: 3, status: "Success" },
  { id: 7, date: "14/10/2025", items: 1, charity: 1, status: "Success" },
];

export default async function DonationHistory() {
  return (
    <div className="p-10 space-y-6">
      {}
      <h1 className="text-4xl font-bold text-gray-900">
        Donation History
      </h1>

      {}
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
              {mockDonations.map((row) => {
                const statusClasses =
                  row.status === "Pending"
                    ? "bg-yellow-100 text-yellow-800"
                    : "bg-green-100 text-green-800";

                return (
                  <tr
                    key={row.id}
                    className="border-t border-gray-100 hover:bg-gray-50"
                  >
                    <td className="px-6 py-3">{row.date}</td>
                    <td className="px-6 py-3">{row.items}</td>
                    <td className="px-6 py-3">{row.charity}</td>
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

        {}
        <div className="flex items-center justify-center gap-2 px-6 pb-4">
          <button className="rounded-md border border-gray-300 px-3 py-1 text-sm text-gray-700 hover:bg-gray-100">
            Prev
          </button>
          <button className="rounded-md bg-lime-400 px-3 py-1 text-sm font-semibold text-white">
            1
          </button>
          <button className="rounded-md border border-gray-300 px-3 py-1 text-sm text-gray-700 hover:bg-gray-100">
            2
          </button>
          <button className="rounded-md border border-gray-300 px-3 py-1 text-sm text-gray-700 hover:bg-gray-100">
            3
          </button>
          <button className="rounded-md border border-gray-300 px-3 py-1 text-sm text-gray-700 hover:bg-gray-100">
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
