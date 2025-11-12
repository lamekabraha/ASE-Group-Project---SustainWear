import Image from "next/image";


export default function ItemsDonated() {
    return (
        <div className="border-2 border-green rounded-2xl p-5 flex gap-4 col-span-5">
            <Image
                src="/icons/tshirt-icon.png"
                alt="wight icon"
                width={75}
                height={75}
                className="flex-none"
            />
            <div className="flex-1 relative">
                <h1 className="text-2xl font-semibold">Total Items Donated:</h1>
                <h1 className="text-3xl font-bold absolute right-0 bottom-0">23</h1>
            </div>
        </div>
    )
}