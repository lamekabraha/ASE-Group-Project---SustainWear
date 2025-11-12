import Image from "next/image";


export default function LandfillReduction() {
    return (
        <div className="border-2 border-green rounded-2xl p-5 flex gap-4 col-span-7">
            <Image
                src="/icons/landfill-icon.png"
                alt="wight icon"
                width={75}
                height={75}
                className="flex-none"
            />
            <div className="flex-1 relative">
                <h1 className="text-2xl font-semibold">Estimated Landfill Reduction:</h1>
                <h1 className="text-3xl font-bold absolute right-0 bottom-0">4kg</h1>
            </div>
        </div>
    )
}