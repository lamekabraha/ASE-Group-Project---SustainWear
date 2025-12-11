import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "../../../../lib/prisma";
import UsersTable from "@/app/Components/Userstable";
import SummaryCards from "@/app/Components/Summarycards";

export const metadata = {
    title: 'Admin | Manage Users',
};

type UserSummaryRecord = {
    userId: number;
    email: string;
    firstName: string;
    lastName: string;
    role: string;
    totalDonations: number;
    totalItemsDonated: number;
    lastDonationDate: Date | null;
    donationHistory: Array<{
        date: Date;
        itemCount: number;
    }>;
};

type AdminDashboardData = {
    users: UserSummaryRecord[];
    summaryMetrics: {
        totalUsers: number;
        activeDonorCount: number;
        totalItemsDonated: number;
    };
};

async function getManageUsersData(): Promise<AdminDashboardData> {
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
        orderBy: { lastName: 'asc' },
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
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-6 text-gray-800">User Account Management</h1>
            <SummaryCards metrics={summaryMetrics} />
            <UsersTable initialUsers={users} />
        </div>
    );
}