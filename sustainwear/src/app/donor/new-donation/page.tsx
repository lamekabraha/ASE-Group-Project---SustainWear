import DonationForm from "@/app/Components/NewDonationComp/DonationForm";


export default function NewDonationPage(){
  return (
    <div className="p-10 flex flex-col gap-y-15 h-screen">
      <h1 className="text-4xl font-bold">New Donation</h1>
      {/* Donation Form */}
      <div>
        <DonationForm/>
      </div>
      {/* List of Items */}
      <div>

      </div>
    </div>
  )
};