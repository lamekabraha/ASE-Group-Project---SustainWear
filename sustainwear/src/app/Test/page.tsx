"use client";

export default function Page() {
  return (
    <section className="mx-auto max-w-7xl">

      <h1 className="text-[34px] font-semibold text-[#2B2B2B]">Home</h1>

      <div className="mt-6 space-y-10">

        {/* Welcome Card */}
        <div className="rounded-[18px] border-2 border-[#BFE085] bg-white p-6">
          <h2 className="text-[24px] font-extrabold text-[#2B2B2B]">
            Welcome Back! See Your Impact in Real-Time
          </h2>
          <p className="mt-2 text-[15px] text-[#424A52] leading-relaxed">
            You’re the reason we can tackle textile waste. Your dashboard is the control center for your
            good deeds—quick links to log your next donation and view the real-time environmental savings
            your generosity creates. Every item matters.
          </p>
        </div>

        {/* Last Donation */}
        <div className="flex items-center justify-between">
          <h3 className="text-[28px] font-semibold text-[#2B2B2B]">Last Donation</h3>
          <button className="rounded-[12px] bg-[#98CD56] text-white px-4 py-2 text-[14px] font-semibold shadow hover:opacity-90">
            View All Donations
          </button>
        </div>

        <div className="rounded-[18px] border-2 border-[#BFE085] bg-white p-4 overflow-x-auto">
          <table className="min-w-full text-[14px]">
            <thead className="bg-[#F7F7F7] text-[#5B6470]">
              <tr className="text-left">
                <Th>Date</Th>
                <Th>Items</Th>
                <Th>Quantity</Th>
                <Th>Status</Th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t">
                <Td>14/10/2025</Td>
                <Td>4</Td>
                <Td>St Gemma’s Hospice</Td>
                <Td>
                  <span className="bg-[#FCEFC3] text-[#9C7A09] border border-[#E7D190] px-3 py-1 rounded-full text-xs font-semibold">
                    Pending
                  </span>
                </Td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Impact Tiles */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ImpactBox title="Total Weight Donated:" value="23 Kg" Icon={KgIcon} />
          <ImpactBox title="Charities Supported:" value="4" Icon={HandsIcon} />
        </div>

      </div>
    </section>
  );
}

/* Table Helpers */
function Th({ children }: { children: React.ReactNode }) {
  return <th className="px-5 py-3 font-semibold">{children}</th>;
}

function Td({ children }: { children: React.ReactNode }) {
  return <td className="px-5 py-3 text-[#2B2B2B]">{children}</td>;
}

/* Impact Tile */
function ImpactBox({
  title,
  value,
  Icon
}: {
  title: string;
  value: string;
  Icon: React.ComponentType<{ className?: string }>;
}) {
  return (
    <div className="rounded-[18px] border-2 border-[#BFE085] bg-white flex items-center gap-5 p-6">
      <Icon className="w-[64px] h-[64px] text-[#7FBF45]" />
      <div>
        <p className="text-[#333C46] font-medium">{title}</p>
        <p className="text-4xl font-extrabold text-[#222]">{value}</p>
      </div>
    </div>
  );
}

/* Icons */
function KgIcon() {
  return (
    <svg viewBox="0 0 64 64" fill="currentColor" className="w-[64px] h-[64px]">
      <path d="M24 14a8 8 0 0 1 16 0h6a6 6 0 0 1 6 6v26a6 6 0 0 1-6 6H18a6 6 0 0 1-6-6V20a6 6 0 0 1 6-6h6Zm4 0h8a4 4 0 0 0-8 0Z" />
      <rect x="14" y="20" width="36" height="26" rx="4" />
      <text x="32" y="40" fontSize="16" textAnchor="middle" fill="#fff">kg</text>
    </svg>
  );
}

function HandsIcon() {
  return (
    <svg viewBox="0 0 64 64" fill="currentColor" className="w-[64px] h-[64px]">
      <path d="M20 38c3 0 5 3 7 5l3 3 3-3c2-2 4-5 7-5 4 0 6 3 6 7 0 6-9 13-16 17-7-4-16-11-16-17 0-4 2-7 6-7Z" />
      <path d="M18 22a6 6 0 0 1 6 6v6h-4v-6a2 2 0 1 0-4 0v10h-4V28a6 6 0 0 1 6-6Zm28 0a6 6 0 0 1 6 6v10h-4V28a2 2 0 1 0-4 0v6h-4v-6a6 6 0 0 1 6-6Z" />
    </svg>
  );
}
