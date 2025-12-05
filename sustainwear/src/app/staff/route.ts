// import prisma from "../../../lib/prisma";
// import { Prisma } from "@prisma/client";

// const toNumber = (v: Prisma.Decimal | number | null): number =>
//   v ? Number(v.toString()) : 0;

// export async function GET() {
//   try {
//     const staffId = 1; // TEMP

//     // 🔍 1. Get staff charity
//     const staff = await prisma.user.findUnique({
//       where: { userId: staffId },
//       select: { charityId: true }
//     });

//     const charityId = staff?.charityId;

//     if (!charityId) {
//       console.warn("⚠ No charityId found for staff:", staffId);
//       return Response.json({
//         totalInventory: 0,
//         pendingCount: 0,
//         distributedKg: 0,
//       });
//     }

//     // 🔍 2. Inventory calculation
//     const inventory = await prisma.inventory.findMany({
//       where: { charityId },
//       select: {
//         totalStock: true,
//         category: { select: { avgWeight: true } }
//       }
//     });

//     const totalInventory = inventory.reduce((sum, item) => {
//       const w = toNumber(item.category?.avgWeight);
//       return sum + item.totalStock * w;
//     }, 0);

//     // 🔍 3. Pending donations
//     const pendingCount = await prisma.donation.count({
//       where: {
//         charityId,
//         // FIXED CASE — frontend uses "Pending"
//         status: "Pending"
//       }
//     });

//     // 🔍 4. Distributed items
//     const distributedItems = await prisma.donationItem.findMany({
//       where: {
//         donation: {
//           charityId,
//           // FIXED — your frontend uses "Success"
//           status: "Success"
//         }
//       },
//       select: {
//         category: { select: { avgWeight: true } }
//       }
//     });

//     const distributedKg = distributedItems.reduce((sum, item) => {
//       return sum + toNumber(item.category?.avgWeight);
//     }, 0);

//     return Response.json({
//       totalInventory,
//       pendingCount,
//       distributedKg,
//     });

//   } catch (err) {
//     console.error("Dashboard error:", err);
//     return Response.json({
//       totalInventory: 0,
//       pendingCount: 0,
//       distributedKg: 0,
//       error: "Failed to load dashboard"
//     });
//   }
// }
