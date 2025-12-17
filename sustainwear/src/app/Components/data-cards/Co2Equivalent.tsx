import Image from 'next/image';

export default function Co2Equivalent() {
    return(
        <div className="border-3 border-green rounded-2xl p-5 flex gap-4 col-span-4">
        <Image
                src="/icons/co2-icon.png"
                alt="CO2 icon"
                width={75}
                height={75}
                className="flex-none"
            />
        <div className="flex-1 relative">
            <h1 className="text-2xl font-semibold">CO₂ Saved:</h1>
            <h1 className="text-3xl font-bold absolute right-0 bottom-0">4 kgCO₂</h1>
        </div>
    </div>
    )
}