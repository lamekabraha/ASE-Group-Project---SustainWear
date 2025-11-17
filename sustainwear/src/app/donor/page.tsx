import Link from "next/link";
import ItemsDonated from "../Components/data-cards/ItemsDonated";

export default function page(){
    return(
        <div>
            <ItemsDonated/>
            <button><Link href="/donor/my-impact">My Impact</Link></button>
        </div>
    )
}