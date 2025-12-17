'use client';

import { X, Calendar, Truck, Package, ChevronDown} from 'lucide-react';
import { format } from 'date-fns';
import Form from 'next/form';
import { useState } from 'react';
import DistributionItemList from './DistReqItemList';
import { DonationItem } from './DistReqTable';
import { updateDistributionItems } from '@/app/api/distribution/Submit/route';

export interface DistributionData {
	distributionId: number;
	date: Date | string;
	status: string;
	notes: string | null;
	charityId: number | null;
	charity: {
		charityName: string;
		charityEmail: string;
		charityTeleNumber: string;
		charityRegNumber: string;
	} | null;
}

interface ModalProp{
	isOpen: boolean;
	onClose: () => void;
	data: DistributionData | null;
	filters: FilterOptions;
	items: DonationItem[];
}

type category = {categoryId: number; category: string}
type size = {sizeId: number; size: string};
type gender = {genderId: number; gender: string};
type condition = {conditionId: number; condition: string}

export interface FilterOptions{
	category: category[];
	size: size[];
	gender: gender[];
	condition: condition[];
}

export default function Modal({isOpen, onClose, data, filters, items}: ModalProp) {
	if (!isOpen || !data || !filters) return null;

	const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
	const [selectedSizes, setSelectedSizes] = useState<number[]>([]);
	const [selectedGenders, setSelectedGenders] = useState<number[]>([]);
	const [selectedConditions, setSelectedConditions] = useState<number[]>([]);
	const [selectedItems, setSelectedItems] = useState<number[]>([])
	const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

	const toggleFilter = (current: number[], setFn: (val: number[]) => void, id: number) => {
		if (current.includes(id)) {
			setFn(current.filter(x => x !== id));
		} else {
			setFn([...current, id]);
		}
	};

	const filteredItems = items.filter(item => {
		return (
			(selectedCategories.length === 0 || selectedCategories.includes(item.categoryId)) &&
			(selectedSizes.length === 0 || (item.sizeId !== null && selectedSizes.includes(item.sizeId))) &&
			(selectedGenders.length === 0 || (item.genderId !== null && selectedGenders.includes(item.genderId))) &&
			(selectedConditions.length === 0 || (item.conditionId !== null && selectedConditions.includes(item.conditionId)))
		)
	})

	const renderChecklist = (title: string, options: any[], selected: number[], setSelected: (ids: number[]) => void, idKey: string, labelKey: string) => {
		const isOpen = activeDropdown === title;
		return (
			<div className="relative space-y-1">
				<label className="text-xs font-bold text-navy uppercase tracking-wide">{title}</label>
				<button
					type="button"
					onClick={() => setActiveDropdown(isOpen ? null : title)}
					className="w-full flex items-center justify-between border border-gray rounded-lg p-2 bg-white text-sm text-navy"
				>
					<span className="truncate">{selected.length > 0 ? `${selected.length} selected` : 'Select...'}</span>
					<ChevronDown size={16} className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
				</button>
				
				{isOpen && (
					<div className="absolute top-full left-0 right-0 z-20 mt-1 max-h-48 overflow-y-auto border border-gray rounded-lg p-2 bg-white shadow-lg">
						{options.map(opt => (
							<div key={opt[idKey]} className="flex items-center gap-2 mb-1 p-1 hover:bg-slate-100 rounded">
								<input 
									type="checkbox" 
									id={`${title}-${opt[idKey]}`}
									checked={selected.includes(opt[idKey])}
									onChange={() => toggleFilter(selected, setSelected, opt[idKey])}
									className="rounded border-gray text-navy focus:ring-navy"
								/>
								<label htmlFor={`${title}-${opt[idKey]}`} className="text-sm text-navy cursor-pointer select-none flex-1">{opt[labelKey]}</label>
							</div>
						))}
					</div>
				)}
			</div>
		);
	};

	const handleProcessShipment = async () => {
		if (data && selectedItems.length > 0) {
			await updateDistributionItems(data.distributionId, selectedItems);
			setSelectedItems([]);
			onClose();
		}
	};

	return(
		<div className="fixed inset-0 z-100 flex items-center justify-center bg-navy/30 backdrop-blur p-4">
			<div className="bg-white rounded-2xl shadow-xl w-3xl max-h-5/6 overflow-auto animate border-3 border-green">
				<div className="bg-white py-4 px-6 border-b border-white flex justify-between items-center">
					<div>
						<h2 className="text-xl font-bold text-navy">Distribution Details</h2>
						<p className="text-sm text-navy">Batch #{data.distributionId}</p>
					</div>
					<button onClick={onClose} className=" rounded-full transition-colors text-navy">
						<X size={20}/>
					</button>
				</div>

				<div className="p-6 space-y-6">
					<div className="flex justify-between items-start">
						<div>
							<label className="text-xs font-bold text-navy uppercase tracking-wide">Date</label>
							<div className="flex items-center gap-2 text font-medium mt-1">
								<Calendar size={16} className="className text-orange" />
								{format(new Date(data.date), 'PPP')}
							</div>
						</div>
						<span className="bg-green text-white px-3 py-1 rounded-full text-xs font-bold border border-green uppercase">
							{data.status}
						</span>
					</div>

					<div className="bg-white p-4 rounded-xl border border-gray">
						<h3 className="font-semibold text-navy mb-3 flex items-center gap-2">
							<Truck size={18} className='text-orange' />
							Charity
						</h3>
						<div className="grid gap-2 text-sm">
							{data.charity && (
								<div className='grid grid-cols-2 gap-4'>
									<div className="flex justify-between">
										<p className="text-navy">Name:</p>
										<p className="font-medium text-navy">{data.charity.charityName}</p>
									</div>
									<div className="flex justify-between">
										<p className="text-navy">Email:</p>
										<p className="font-medium text-navy">{data.charity.charityEmail}</p>
									</div>
									<div className="flex justify-between">
										<p className="text-navy">Telephone:</p>
										<p className="font-medium text-navy">{data.charity.charityTeleNumber}</p>
									</div>
									<div className="flex justify-between">
										<p className="text-navy">Registration Number:</p>
										<p className="font-medium text-navy">{data.charity.charityRegNumber}</p>
									</div>
								</div>
							)}
						</div>
					</div>

					<div>
						<label className="text-xs font-bold text-navy uppercase tracking-wide">Distribution Note</label>
						<p className="mt-1 text-sm text-navy p-3 rounded-lg border border-gray">{data.notes}</p>
					</div>
					
					<div>
						<label className="text-xs font-bold text-navy uppercase tracking-wide">Complete Distribution</label>
						<Form action="">
							<label className="p-2 text-xs font-bold text-navy uppercase tracking-wide">Filters</label>
							<div className="p-2 grid grid-cols-4 gap-4 w-full">
								{renderChecklist('Category', filters.category, selectedCategories, setSelectedCategories, 'categoryId', 'category')}
								{renderChecklist('Size', filters.size, selectedSizes, setSelectedSizes, 'sizeId', 'size')}
								{renderChecklist('Gender', filters.gender, selectedGenders, setSelectedGenders, 'genderId', 'gender')}
								{renderChecklist('Condition', filters.condition, selectedConditions, setSelectedConditions, 'conditionId', 'condition')}
							</div>
						</Form>
						<DistributionItemList 
							items={filteredItems}
							selectedItems={selectedItems}
							onToggle={(id) => setSelectedItems(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id])}
							filters={filters}
						/>
					</div>

				</div>
				
				<div className="bg-slate-50 px-6 py-4 border-t border-slate-100 flex justify-end gap-3">
					<button 
						onClick={onClose}
						className="px-4 py-2 text-sm font-medium text-white bg-orange rounded-lg transition-colors"
					>
						Close
					</button>
					<button 
						onClick={handleProcessShipment}
						className="px-4 py-2 text-sm font-medium text-white bg-green rounded-lg shadow-sm transition-colors flex items-center gap-2"
					>
						<Package size={16} />
						Process Shipment
					</button>
				</div>
			</div>
		</div>
	)
}