import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import ItemsDonated from "../Components/data-cards/ItemsDonated";
import Link from "next/link";
import LandfillReduction from "../Components/data-cards/LandfillReduction";
import DonorDonationHistoryTable from "../Components/DonorDonationHistoryTable";

export default async function Page() {
  const session = await getServerSession(authOptions);
  const donorId = session?.user?.id;
  const firstName = session?.user?.firstName;``

  return(
      <div className="m-10">
        <div>
          <h1 className="text-4xl font-bold">Home</h1>
        </div>

        <div className="border-2 border-green rounded-2xl p-5 mr-5 mt-5 mb-2.5 ">
          <h2 className="text-2xl font-bold"> Welcome Back, {firstName.charAt(0).toUpperCase() + firstName.slice(1)}!</h2>
          <p>You're the reason we can tackle textile waste! Your contributions are helping us build a circular economy, one garment at a time. Check your Last Donation status below or click My Impact to see how much landfill waste you've diverted this year.</p>
        </div>

        {/* Last Donation */}
        <div className="mr-5 mt-5">
          <div className="flex items-center justify-between mb-2.5">
            <h3 className="text-[28px] font-semibold">Last Donation</h3>
            <button className="border-2 border-green rounded-2xl py-2 px-3 bg-green"><Link href="/donor/donation-history">View All Donations</Link></button>
          </div>
          <DonorDonationHistoryTable/>
        </div>

  
        {/* Impact */}
        <div className="mr-5 mt-5">
          <div className="flex items-center justify-between mb-2 5">
            <h3 className="text-[28px] font-semibold">Last Donation</h3>
            <button className="border-2 border-green rounded-2xl py-2 px-3 bg-green"><Link href="/donor/my-impact">View Your Impacts</Link></button>
          </div>
          <div className="grid grid-cols-12 gap-6">
            <LandfillReduction/>
            <ItemsDonated/>
          </div>
        </div>
      </div>
    ); 
}