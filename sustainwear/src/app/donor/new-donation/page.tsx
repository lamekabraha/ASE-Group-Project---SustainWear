import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import prisma from "../../../../lib/prisma";
import DonationForm from "./DonationForm";

export default async function NewDonationPage() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user || session.user.role !== "Donor") {
    redirect("/api/auth/signin");
  }

  const [categories, sizes, genders, conditions] = await Promise.all([
    prisma.category.findMany({select: {categoryId: true, category: true}}),
    prisma.size.findMany({select: {sizeId: true, size: true}}),
    prisma.gender.findMany({select: {genderId: true, gender: true}}),
    prisma.condition.findMany({select: {conditionId: true, condition: true}}),
  ])

  return (
    <div className="p-10 h-screen">
      <h1 className="text-4xl font-bold">Distribution</h1>
      <DonationForm categories={categories} sizes={sizes} genders={genders} conditions={conditions} />
    </div>
  )
}