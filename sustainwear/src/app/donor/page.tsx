import Link from "next/link";
import ItemsDonated from "../Components/data-cards/ItemsDonated";

export default function page(){
    return(
        <div>
            <h1 className="bg-blue-500">Hello World</h1>
            <ItemsDonated/>
            <button><Link href="/donor/my-impact">My Impact</Link></button>
        </div>
    )
}