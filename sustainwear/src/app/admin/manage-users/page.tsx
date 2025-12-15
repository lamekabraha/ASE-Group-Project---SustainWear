import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/lib/prisma";
import UsersTable from "@/app/Components/Userstable";
import SummaryCards from "@/app/Components/Summarycards";

async function getManageUsersData() {
    const usersQuery = prisma.user.findMany({
        select: {
            userId: true,
            email: true,
            firstName: true,
            lastName: true,
            role: true,
            _count: { select: { donationsAsDonor: true } },
            donationsAsDonor: {
                select: {
                    donationDate: true,
                    _count: { select: { items: true } }
                },
                orderBy: { donationDate: 'desc' },
            },
        },
        orderBy: { userId: 'asc' },
    });

    const activeDonorsQuery = prisma.donation.findMany({
        distinct: ['donorId'],
        select: { donorId: true }
    });

    const totalItemsQuery = prisma.donationItem.count();

    const [usersData, uniqueDonors, totalItems] = await Promise.all([
        usersQuery,
        activeDonorsQuery,
        totalItemsQuery
    ]);

    const processedUsers = usersData.map(user => {
        const donations = user.donationsAsDonor;
        const totalItemsDonated = donations.reduce((sum, d) => sum + d._count.items, 0);
        const lastDonationDate = donations[0]?.donationDate || null;

        return {
            userId: user.userId,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            role: user.role,
            totalDonations: user._count.donationsAsDonor,
            totalItemsDonated,
            lastDonationDate,
            donationHistory: donations.map(d => ({
                date: d.donationDate,
                itemCount: d._count.items
            })),
        };
    });

    return {
        users: processedUsers,
        summaryMetrics: {
            totalUsers: usersData.length,
            activeDonorCount: uniqueDonors.length,
            totalItemsDonated: totalItems,
        },
    };
}

export default async function ManageUsersPage() {
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user?.email) {
        redirect("/api/auth/signin");
    }

    const currentUser = await prisma.user.findUnique({
        where: { email: session.user.email },
        select: { role: true }
    });

    if (currentUser?.role !== 'Admin') {
        redirect("/");
    }
    
    const { users, summaryMetrics } = await getManageUsersData();

    return (
        <div className="p-10 flex flex-col gap-y-10 min-h-screen">
            <h1 className="text-4xl font-bold text-[#2B2B2B]">User Management</h1>
            <div className="">
                <SummaryCards metrics={summaryMetrics} />
            </div>
            <div>
                <h2 className="text-2xl font-bold mb-4 text-[#2B2B2B]">All Users</h2>
                <div className="border-2 border-[#BFE085] rounded-[22px] p-5 bg-white shadow-sm">
                    <UsersTable initialUsers={users} />
                </div>
            </div>
        </div>
    );
}