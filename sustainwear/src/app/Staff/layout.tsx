import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/route";
import Link from "next/link";

export default async function StaffLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  // 🔥 AUTH DISABLED — leave this commented until finished
  //
  // const session = await getServerSession(authOptions);
  // if (!session || session.user.role !== "Staff") {
  //   redirect("/auth/login");
  // }

  return (
    <div className="min-h-screen flex bg-[#F5F5F5]">

      {/* LEFT SIDEBAR */}
      <aside className="bg-[#FF6A3D] min-h-screen w-[260px] px-6 py-10 rounded-bl-[160px] flex flex-col gap-6">

        <NavButton href="/staff" label="Home" />
        <NavButton href="/staff/pending-donations" label="Pending Donations" />
        <NavButton href="/staff/inventory" label="Inventory" />
        <NavButton href="/staff/distribution" label="Distribution" />
        <NavButton href="/staff/profile" label="My Profile" />

      </aside>

      {/* MAIN PAGE */}
      <main className="flex-1 px-12 py-10">{children}</main>
    </div>
  );
}

/* --------------- SERVER-RENDERED NAV BUTTON --------------- */

function NavButton({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="w-full text-center py-3 rounded-full text-[15px] font-medium 
                 bg-[#FFA47F] border border-[#D97745] text-black 
                 hover:bg-[#ff946b] transition"
    >
      {label}
    </Link>
  );
}
