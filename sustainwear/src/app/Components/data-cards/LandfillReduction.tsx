import Image from "next/image";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import prisma from "../../../../lib/prisma";

export default async function LandfillReduction() {
  // ✅ MUST be awaited
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    redirect("/api/auth/signin");
  }

  // ✅ ALWAYS force to number for Prisma safety
  const userId = Number(session.user.id);

  // ✅ SAFE QUERY (no status column, no crashes)
  const weightQuery = await prisma.donationItem.findMany({
    where: {
      donation: {
        donorId: userId,
      },
    },
    select: {
      category: {
        select: {
          avgWeight: true,
        },
      },
    },
  });

  // ✅ SAFE REDUCE
  const totalWeight = weightQuery.reduce((sum, item) => {
    const weight = Number(item.category?.avgWeight ?? 0);
    return sum + weight;
  }, 0);

  return (
    <div className="border-2 border-green rounded-2xl p-5 flex gap-4 col-span-7">
      <Image
        src="/icons/landfill-icon.png"
        alt="weight icon"
        width={75}
        height={75}
        className="flex-none"
      />
      <div className="flex-1 relative">
        <h1 className="text-2xl font-semibold">
          Estimated Landfill Reduction:
        </h1>
        <h1 className="text-3xl font-bold absolute right-0 bottom-0">
          {totalWeight} Kg
        </h1>
      </div>
    </div>
  );
}
