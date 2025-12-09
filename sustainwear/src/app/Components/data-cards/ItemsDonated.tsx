import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import Image from "next/image";
import { redirect } from "next/navigation";
import prisma from "../../../../lib/prisma";

export default async function ItemsDonated() {
  const session = await getServerSession(authOptions);

  // ✅ HARD AUTH BLOCK
  if (!session || !session.user) {
    redirect("/api/auth/signin");
  }

  // ✅ FORCE TO NUMBER FOR PRISMA SAFETY
  const userId = Number(session.user.id);

  // ✅ USER-LOCKED COUNT (NO DATA LEAK POSSIBLE)
  const data = await prisma.donationItem.count({
    where: {
      donation: {
        donorId: userId,
      },
    },
  });

  return (
    <div className="border-2 border-green rounded-2xl p-5 flex gap-4 col-span-5">
      <Image
        src="/icons/tshirt-icon.png"
        alt="tshirt icon"
        width={75}
        height={75}
        className="flex-none"
      />
      <div className="flex-1 relative">
        <h1 className="text-2xl font-semibold">Total Items Donated:</h1>
        <h1 className="text-3xl font-bold absolute right-0 bottom-0">
          {data}
        </h1>
      </div>
    </div>
  );
}
