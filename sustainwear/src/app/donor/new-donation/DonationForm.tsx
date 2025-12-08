'use client';

import {ChangeEvent, DragEvent, useState} from 'react';
import Image from 'next/image';
import Form from 'next/form';
import { useRouter } from 'next/navigation';
import { useAlert } from '@/app/utils/useAlert';
import prisma from '../../../../lib/prisma';
import { FaTrash, FaEdit, FaImage, FaPlus } from "react-icons/fa";


interface DonationFormProps {
    categories: { categoryId: number; category: string }[];
    sizes: { sizeId: number; size: string }[];
    genders: { genderId: number; gender: string }[];
    conditions: { conditionId: number; condition: string }[];
    description: { description: string }
    imageUrl: {imageUrl: string}
}

export default function DonationForm({
    categories,
    sizes,
    genders,
    conditions,
}: DonationFormProps) {
    const router = useRouter();

    const [items, setItems] = useState<any[]>([]);
    const [tempId, setTempId] = useState(0);
    const [categoryId, setCategoryId] = useState(0);
    const [sizeId, setSizeId] = useState(0);
    const [genderId, setGenderId] = useState(0);
    const [conditionId, setConditionId] = useState(0);
    const [description, setDescription] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [error, setError] = useState("");
    const {showAlert} = useAlert("", "");
    const [dragActive, setDragActive] = useState(false);
    const [isEditting, setIsEditting] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        console.log(file)
        if (file){
            processFile(file);
        };
    };
    
    const processFile = (file: File) => {
        if (!file.type.startsWith("image/")){
            showAlert("Error", "Invalid file type. Please upload an image.");
            return;
        }
        const url = URL.createObjectURL(file);
        setImageUrl(url);
    };

    const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(true);
    };
    
    const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
    };
    
    const handleDrop = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        
        const file = e.dataTransfer.files?.[0];
        if (file){
          processFile(file);
        };
    };

    async function handleSaveItem(){
        if (!categoryId || !sizeId || !genderId || !conditionId || !description || !imageUrl){
          showAlert("Error", "Please fill out all fields")
          return;
        }

        const imgUrl = imageUrl.slice(0, 5);

        const categoryName = categories.find(category => category.categoryId === categoryId)?.category;
        const sizeName = sizes.find(size => size.sizeId === sizeId)?.size
        const genderName = genders.find(gender => gender.genderId === genderId)?.gender
        const conditionName = conditions.find(condition => condition.conditionId === conditionId)?.condition

        

        if (isEditting === false ){
            setTempId(tempId + 1);

            const newItem = {
            tempId: tempId,
            categoryId: categoryId,
            categoryName: categoryName,
            sizeId: sizeId,
            sizeName: sizeName,
            genderId: genderId,
            genderName: genderName,
            conditionId: conditionId,
            conditionName: conditionName,
            description: description,
            imageUrl: imageUrl,
            };

            console.log(imageUrl)

            setItems([...items, newItem]);

            console.log(items);
    
            clearForm();
        } else {
            const updatedItem = {
                tempId: tempId,
                categoryId: categoryId,
                categoryName: categoryName,
                sizeId: sizeId,
                sizeName: sizeName,
                genderId: genderId,
                genderName: genderName,
                conditionId: conditionId,
                conditionName: conditionName,
                description: description,
                imageUrl: imageUrl,
            }

            setIsEditting(false);
        }
        
    };

    function handleEdit(item: any) {
        setIsEditting(true);
        setTempId(item.tempId);
        setCategoryId(item.categoryId);
        setSizeId(item.sizeId);
        setGenderId(item.genderId);
        setConditionId(item.conditionId);
        setDescription(item.description);
        setImageUrl(item.imageUrl);

        // setItems(items.filter((item) => item.tempId !== item.tempId));
    }
    
    function handleDelete(itemId: number){
        if (confirm("Are you sure you want to delete this item?")){
            setItems(items.filter((item) => item !== item.tempId));
        }
    }

    function clearForm(){
        setCategoryId(0);
        setSizeId(0);
        setGenderId(0);
        setConditionId(0);
        setDescription("");
        setImageUrl("");
    }

    async function handleSubmitDonation() {
        if (items.length === 0){
            showAlert("Error", "Please add at least one item to your donation.");
            return;
        }

        setIsSubmitting(true);


        try {
            const res = await fetch("/api/donations/create", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({items}),
            });

            if (res.ok) {
                showAlert("Success","Donation application submitted successfully!");
                setItems([]);
                router.push("/donor/new-donation");
            }else {
                showAlert("Error", "Failed to submit donation application.");
            }
        } catch (error){
            console.error(error);
            showAlert("Error", "Failed to submit donation application.");
        } finally {
            setIsSubmitting(false);
        }
    }
    return (
        <div className="p-10 p-b-5 space-y-5 h-screen">
            <div className="border-2 border-green rounded-2xl p-6 bg-white h-fit">
                <h2 className="font-bold text-lg mb-4 text-[#333C46]">
                    {items.length === 0 ? "Add New Item" : "Edit Item"}
                </h2>
    
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Category</label>
                        <select value={categoryId} onChange={(e) => setCategoryId(Number(e.target.value))} className="w-full p-2 border rounded-lg">
                            <option value={0}>Select...</option>
                            {categories.map(category => <option key={category.categoryId} value={category.categoryId}>{category.category}</option>)}
                        </select>
                    </div>
    
                    <div className="grid grid-cols-2 gap-2">
                        <div>
                            <label className="block text-sm font-medium mb-1">Size</label>
                            <select value={sizeId} onChange={(e) => setSizeId(Number(e.target.value))} className="w-full p-2 border rounded-lg">
                                <option value={0}>Select...</option>
                                {sizes.map(size => <option key={size.sizeId} value={size.sizeId}>{size.size}</option>)}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Gender</label>
                            <select value={genderId} onChange={(e) => setGenderId(Number(e.target.value))} className="w-full p-2 border rounded-lg">
                                <option value={0}>Select...</option>
                                {genders.map(gender => <option key={gender.genderId} value={gender.genderId}>{gender.gender}</option>)}
                            </select>
                        </div>
                    </div>
    
                    <div>
                        <label className="block text-sm font-medium mb-1">Condition</label>
                        <select value={conditionId} onChange={(e) => setConditionId(Number(e.target.value))} className="w-full p-2 border rounded-lg">
                            <option value={0}>Select...</option>
                            {conditions.map(condition => <option key={condition.conditionId} value={condition.conditionId}>{condition.condition}</option>)}
                        </select>
                    </div>
    
                    <div>
                        <label className="block text-sm font-medium mb-1">Description</label>
                        <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="w-full p-2 border rounded-lg min-h-[80px]" />
                    </div>    
                    <div 
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                        className={`border-2 border-dashed rounded-xl h-32 flex flex-col items-center justify-center relative transition-colors ${dragActive ? 'border-green-500 bg-green-50' : 'border-[#BFE085] hover:bg-gray-50'}`}
                    >
                        <input type="file" accept="image/*" className="absolute inset-0 opacity-0 cursor-pointer z-10" onChange={handleImageUpload} />
                        {imageUrl ? (
                            <img src={imageUrl} alt="Preview" className="h-full object-contain p-1" />
                        ) : (
                            <div className="text-center pointer-events-none">
                                <FaImage className="mx-auto text-[#7FBF45]" />
                                <span className="text-xs text-gray-500">Drag & Drop or Click</span>
                            </div>
                        )}
                    </div>
    
                    <div className="flex gap-2">
                        <button onClick={handleSaveItem} className="flex-1 bg-[#98CD56] text-white py-2 rounded-lg font-semibold hover:opacity-90 flex justify-center items-center gap-2">
                             {items.length === 0 ? <><FaPlus size={18}/> Add Item</> : "Update Item"}
                        </button>
                        {items.length !== 0 && (
                            <button onClick={clearForm} className="px-4 py-2 border rounded-lg text-gray-500">Cancel</button>
                        )}
                    </div>
                </div>
            </div>
    
            <div className="space-y-4">
                {items.length === 0 ? (
                    <div className="text-center p-10 border-2 border-dashed rounded-xl text-gray-400">No items added yet.</div>
                ) : (
                    items.map((item) => (
                        <div key={item.tempId} className="border-2 border-[#BFE085] rounded-[22px] bg-white p-4 flex gap-4 items-center shadow-sm">
                            <div className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0 flex items-center justify-center">
                               {item.imageUrl ? <img src={item.imageUrl} className="w-full h-full object-cover" /> : <span className="text-xs">No Img</span>}
                            </div>
                            <div className="flex-1">
                                <h3 className="font-bold">{item.description}</h3>
                                <p className="text-sm text-gray-600 line-clamp-1">{item.categoryName} • {item.sizeName} • {item.genderName} • {item.conditionName}</p>
                            </div>
                            <div className="flex gap-2">
                                <button onClick={() => handleEdit(item)} className="p-2 text-blue-500 bg-blue-50 rounded-full"><FaEdit size={16}/></button>
                                <button onClick={() => handleDelete(item.tempId)} className="p-2 text-red-500 bg-red-50 rounded-full"><FaTrash size={16}/></button>
                            </div>
                        </div>
                    ))
                )}
    
                <div className="text-right">
                    <button 
                        onClick={handleSubmitDonation} 
                        disabled={isSubmitting}
                        className="px-8 py-3 bg-green text-navy rounded-lg font-bold hover:opacity-90 disabled:opacity-50"
                    >
                        {isSubmitting ? "Submitting..." : "Submit Donation"}
                    </button>
                </div>            
            </div>
        </div>
    );
};