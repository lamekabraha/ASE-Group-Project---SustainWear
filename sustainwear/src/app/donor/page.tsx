import Link from "next/link";
import ItemsDonated from "../Components/data-cards/ItemsDonated";
import { getServerSession } from "next-auth";
import {authOptions} from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";


export default async function page(){
    const session = await getServerSession(authOptions);

    if (!session || !session.user){
        redirect('/auth/login');
    }

    const userId = session.user;


    return(
        <div>
<<<<<<< HEAD
=======
            <h1>welcome {session?.user?.id}</h1>
            <h1 className="bg-blue-500">Hello World</h1>
>>>>>>> donation-history
            <ItemsDonated/>
            <button><Link href="/donor/my-impact">My Impact</Link></button>
        </div>
    )
}