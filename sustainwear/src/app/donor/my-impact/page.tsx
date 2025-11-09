import DonatedWeight from "@/app/Components/data-cards/donatedWeight";

export default function myImpact(){
    return(
        <div className="p-10">
            <h1 className="text-4xl font-bold">My Impact</h1>
            <div className="pt-5 gap-2">
                <DonatedWeight/>
            </div>
        </div>
    )
}