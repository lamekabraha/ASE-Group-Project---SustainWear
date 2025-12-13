'use client';

import {DonationItem} from'./DistReqTable';
import {FilterOptions} from './DistReqModal';
import Image from 'next/image';
import Link from 'next/link';

interface Props{
    items: DonationItem[];
    selectedItems: number[];
    onToggle: (id: number) => void;
    filters: FilterOptions;
}

export default function DistributionItemList({items, selectedItems, onToggle, filters}: Props) {
    const getName = (selectFilter: any[], itemFilter: number | null, filterId: string, filterName: string) => {
        if (itemFilter === null) return '-';
        return selectFilter.find(x => x[filterId] === itemFilter)?.[filterName] || '-';
    };

    return (
        <div className="mt-4 border border-gray rounded-lg overflow-hidden">
            <div className="max-h-60 overflow-y-auto">
                <table className="min-w-full text-sm overflow-y-auto">
                    <thead className="bg-white text-navy font-semibold sticky top-0">
                        <tr>
                            <th className="px-4 py-2 w-10">
                                <p className="sr-only">Select</p>
                            </th>
                            <th className="px-4 py-2">Image</th>
                            <th className="px-4 py-2">Description</th>
                            <th className="px-4 py-2">Category</th>
                            <th className="px-4 py-2">Size</th>
                            <th className="px-4 py-2">Gender</th>
                            <th className="px-4 py-2">Condition</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray">
                        {items.length === 0 ? (
                            <tr><td colSpan={7} className='px-4 py-4 text-center text-gray'>Can't find any items that match your filters.</td></tr>
                        ) : items.map((item) => (
                            <tr key={item.itemId} className='hover:bg-gray cursor-pointer' onClick={() => onToggle(Number(item.itemId))}>
                                <td className="px-4 py-2">
                                    <input type="checkbox" className="rounded border-gray text-navy focus:ring-navy" checked={selectedItems.includes(Number(item.itemId))} onChange={() => onToggle(Number(item.itemId))} />
                                </td>
                                <td className='px-4 py-2'>
                                    <Link href={item.photoUrl} target='_blank'>
                                        <Image 
                                            src={item.photoUrl}
                                            alt="Item Image"
                                            width={100}
                                            height={100}
                                        />
                                    </Link>
                                </td>
                                <td className="px-4 py-2">{item.description}</td>
                                <td className="px-4 py-2">{getName(filters.category, item.categoryId, 'categoryId', 'category')}</td>
                                <td className="px-4 py-2">{getName(filters.size, item.sizeId, 'sizeId', 'size')}</td>
                                <td className="px-4 py-2">{getName(filters.gender, item.genderId, 'genderId', 'gender')}</td>
                                <td className="px-4 py-2">{getName(filters.condition, item.conditionId, 'conditionId', 'condition')}</td>
                            </tr> 
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="bg-gray px-4 py-2 text-xs text-white border-t border-gray flex justify-between">
                <p>{items.length} items found</p>
                <p>{selectedItems.length} selected</p> 
            </div>
        </div>
    )

}