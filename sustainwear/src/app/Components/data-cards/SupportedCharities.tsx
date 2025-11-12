import Image from 'next/image';

export default function SupportedCharities() {
    return(
        <div className="border-2 border-green rounded-2xl p-5 flex gap-4 col-span-6">
            <Image
                src="/icons/charity-icon.png"
                alt="wight icon"
                width={80}
                height={80}
                className="flex-none"
            />
            <div className="flex-1 relative">
                <h1 className="text-2xl font-semibold">Total Charities Supported:</h1>
                <h1 className="text-3xl font-bold absolute right-0 bottom-0">4kg</h1>
            </div>
        </div>
    )
}