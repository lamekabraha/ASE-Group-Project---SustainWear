'use client';

import prisma from '@/../lib/prisma';
import { X, Calendar, Truck, Package} from 'lucide-react';
import { format } from 'date-fns';

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
}

export default function Modal({isOpen, onClose, data}: ModalProp) {
	if (!isOpen || !data) return null;

	return(
		<div className="fixed inset-0 z-100 flex items-center justify-center bg-navy/30 backdrop-blur p-4">
			<div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden animate">
				<div className="bg-white -skew-x-6 py-4 border-b border-white flex justify-between items-center">
					<div>
						<h2 className="text-xl font-bold text-navy">Distribution Details</h2>
						<p className="text-sm text-navy">Batch #{data.distributionId}</p>
					</div>
					<button onClick={onClose} className="b-2 hover:bg-white rounded-full transition-colors text-navy">
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
						<span className="bg-white text-green px-3 py-1 rounded-full text-xs font-bold border border-green uppercase">
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
								<>
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
								</>
							)}
						</div>
					</div>

					<div>
						<label className="text-xs font-bold text-navy uppercase tracking-wide">Distribution Note</label>
						<p className="mt-1 text-sm text-navy p-3 rounded-lg border border-gray">{data.notes}</p>
					</div>
				</div>
				
				<div className="bg-slate-50 px-6 py-4 border-t border-slate-100 flex justify-end gap-3">
					<button 
						onClick={onClose}
						className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-800 hover:bg-slate-200 rounded-lg transition-colors"
					>
						Close
					</button>
					<button 
						className="px-4 py-2 text-sm font-medium text-white bg-orange-500 hover:bg-orange-600 rounded-lg shadow-sm transition-colors flex items-center gap-2"
					>
						<Package size={16} />
						Process Shipment
					</button>
				</div>
			</div>
		</div>
	)
}