import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import {redirect} from 'next/navigation'
import ItemsDonated from "@/app/Components/data-cards/ItemsDonated"
import Co2Saved from "@/app/Components/data-cards/Co2Saved";
import LandfillReduction from "@/app/Components/data-cards/LandfillReduction";
import SupportedCharities from "@/app/Components/data-cards/SupportedCharities";
import CategoryPieChart from "@/app/Components/data-cards/category-pie-chart/CategoryPieChart";
import HistoryLineGraph from "@/app/Components/data-cards/history-line-graph/HistoryLineGraph";



export default async function MyImpact(){
    const session = await getServerSession(authOptions);

    if (!session || !session.user){
        redirect('/auth/login');
    }

    return(
        <div className="p-10">
                <h1 className="text-4xl font-bold">My Impact</h1>
            <div className="pt-5 grid grid-cols-12 gap-6 mr-5">
                <ItemsDonated/>
                <LandfillReduction/>
                <SupportedCharities/>
                <Co2Saved/>
                <HistoryLineGraph/> 
                <CategoryPieChart/>
            </div>
        </div>
    )
}