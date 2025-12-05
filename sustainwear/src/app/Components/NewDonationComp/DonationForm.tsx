'use client';
import Form from 'next/form';
import {useState, useEffect} from 'react';
import prisma from '../../../../lib/prisma';
import Image from 'next/image'

export default async function DonationForm(){

    const [category, setCategory] = useState('');
    const [size, setSize] = useState("");
    const [gender, setGender] = useState("");
    const [condition, setCondition] = useState("");
    const [description, setDescription] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [dragActive, setDragActive] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!category || !size || !gender || !condition || !description || !imageUrl){
            setError("Please fill out all fields");
            return;
        }
        
        const formData = new FormData();
        formData.append("category", category);
        formData.append("size", size);
        formData.append("gender", gender);
        formData.append("condition", condition);
        formData.append("description", description);
        formData.append("imageUrl", imageUrl);

        // try {
        //     const response = await 
        // }

        
    }
    
    const handleDrag = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(e.type === "dragenter" || e.type === "dragover");

        const imageFiles = e.dataTransfer.files;
    };
    

    const categoryOptions = await prisma.category.findMany({
        select: {categoryId: true, category: true}
    })

    const sizeOptions = await prisma.size.findMany({
        select: {sizeId: true, size: true}
    })

    const genderOptions = await prisma.gender.findMany({
        select: {genderId: true, gender: true}
    })

    const conditionOptions = await prisma.condition.findMany({
        select: {conditionId: true, condition: true}
    })

    return(
        <div className="border-2 border-green rounded-2xl p-5">
            <Form action="submit" className='grid grid-cols-2 gap-4'>
                <div>
                    <label htmlFor="category" className='block'>Category</label>
                    <select name="category" id="category" className='rounded-full border-2 border-navy w-full'>
                        <option value="default" key="default"></option>
                        {categoryOptions.map((category) => (
                            <option key={category.categoryId} value={category.categoryId}>{category.category}</option>
                        ))}
                    </select>
                </div>
                <div className="">
                    <label htmlFor="size">Size</label>
                    <select name="size" id="size" className='rounded-full border-2 border-navy w-full'>
                        <option value="default" key="default"></option>
                        {sizeOptions.map((size) => (
                            <option key={size.sizeId} value={size.sizeId}>{size.size}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label htmlFor="gender">Gender</label>
                    <select name="gender" id="gender" className='rounded-full border-2 border-navy w-full'>
                        <option value="default" key="default"></option>
                        {genderOptions.map((gender) => (
                            <option key={gender.genderId} value={gender.genderId}>{gender.gender}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label htmlFor="condition">Condition</label>
                    <select name='condition' id='condition' className="rounded-full border-2 border-navy w-full">
                        <option value="default" key="default"></option>
                        {conditionOptions.map((condition) => (
                            <option key={condition.conditionId} value={condition.conditionId}>{condition.condition}</option>
                        ))}
                    </select>
                </div>
                <div className='col-span-2'>
                    <label htmlFor="description">Description</label>
                    <textarea name="description" id="description" rows={4} className='rounded-2xl border-2 border-navy w-full'/>
                </div>
                <div className="col-span-2">
                    <label htmlFor="image">Image</label>
                    <div className='rounded-2xl border-2 border-navy w-full h-'>
                        <input type="file" name="image" id="image" />
                        <Image
                            src={setImageUrl}
                            width={80}
                            height={80}
                            alt="Item Image"
                        />
                    </div>
                </div>
            </Form>
        </div>
    )   
}