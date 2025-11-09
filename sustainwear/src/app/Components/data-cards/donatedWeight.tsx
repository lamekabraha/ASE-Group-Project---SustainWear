import Image from "next/image";


export default function DonatedWeight() {
    return (
        <div className="border-2 border-green rounded-2xl p-5 flex gap-2">
            <Image
                    src="/icons/weight-kg.png"
                    alt="wight icon"
                    width={50}
                    height={50}
                    className="flex-none"
                />
            <div className="flex-1 relative">
                <h1 className="font-semibold">Total Weight Donated:</h1>
                <h1 className="text-2xl font-bold absolute right-0">23kg</h1>
            </div>
        </div>
    )
}