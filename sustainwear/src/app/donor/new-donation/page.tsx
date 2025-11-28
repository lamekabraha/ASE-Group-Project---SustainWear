"use client";

import { useState } from "react";
import Image from "next/image";

export default function NewDonationPage() {

  const [items, setItems] = useState([
    { id: 1, description: "", category: "", gender: "", size: "", condition: "", image: null as string | null }
  ]);

  // Add another empty item
  function addItem() {
    setItems([
      ...items,
      {
        id: items.length + 1,
        description: "",
        category: "",
        gender: "",
        size: "",
        condition: "",
        image: null,
      }
    ]);
  }

  // Upload image per item
  function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>, index: number) {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);

      const updated = [...items];
      updated[index].image = url;
      setItems(updated);
    }
  }

  return (
    <section className="mx-auto max-w-6xl px-6 py-8">

      <h1 className="text-[34px] font-semibold text-[#2B2B2B]">New Donation</h1>

      <div className="mt-6">
        <div className="border-2 border-[#BFE085] rounded-[22px] p-8 bg-white space-y-6">

          {/* ------------------ TOP FORM ROW ------------------ */}
          <div className="grid grid-cols-2 gap-6">
            {/* Category */}
            <SelectBox label="Category" options={["Tops", "Bottoms", "Jackets", "Shoes", "Accessories"]} />

            {/* Size */}
            <SelectBox label="Size" options={["XS","S","M","L","XL","XXL"]} />
          </div>

          {/* ------------------ SECOND ROW ------------------ */}
          <div className="grid grid-cols-2 gap-6">
            {/* Gender */}
            <SelectBox label="Gender" options={["Male", "Female", "Unisex"]} />

            {/* Condition */}
            <SelectBox label="Condition" options={["New","Like New","Good","Fair"]} />
          </div>

          {/* ------------------ DESCRIPTION ------------------ */}
          <div>
            <label className="block mb-2 font-medium text-[#333C46]">Description</label>
            <textarea
              placeholder="Use this space for any details that could help the charity process your donation faster."
              className="w-full min-h-[80px] border border-[#BFE085] rounded-lg p-3 text-[15px] focus:outline-[#7FBF45]"
            />
          </div>

          {/* ------------------ IMAGE UPLOAD ------------------ */}
          <div>
            <label className="block mb-2 font-medium text-[#333C46]">Upload Image*</label>

            <label className="border border-[#BFE085] w-full min-h-[150px] rounded-xl flex flex-col items-center justify-center p-6 cursor-pointer hover:bg-[#f7ffe8] transition text-center border-dashed">
              <input type="file" className="hidden" />

              <Image
                src="/icon-image-upload.png"
                width={80}
                height={80}
                alt="Upload icon"
                className="opacity-60"
              />

              <p className="text-[#7FBF45] font-medium mt-2">Add Image</p>
            </label>
          </div>

          {/* Add new item */}
          <button
            onClick={addItem}
            className="border border-[#BFE085] px-4 py-2 rounded-lg text-[14px] hover:bg-[#e9f7d0] transition"
          >
            Add a new Item
          </button>
        </div>
      </div>

      {/* ------------------ ITEM PREVIEW LIST ------------------ */}
      <div className="mt-6 space-y-4">
        {items.map((item) => (
          <div key={item.id} className="border-2 border-[#BFE085] rounded-[22px] bg-white p-6 flex gap-6 items-center">
            <div className="w-[80px] h-[80px] bg-gray-200 rounded-xl flex items-center justify-center overflow-hidden">
              {item.image ? (
                <img src={item.image} className="w-full h-full object-cover" />
              ) : (
                <Image
                  src="/placeholder-image.png"
                  width={60}
                  height={60}
                  alt="placeholder"
                />
              )}
            </div>

            <div>
              <h3 className="font-semibold">Item #{item.id}</h3>
              <p className="text-sm text-gray-500">Description</p>

              <div className="flex gap-6 text-sm mt-2">
                <span>Category</span>
                <span>Gender</span>
                <span>Size</span>
                <span>Condition</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ------------------ SUBMIT BUTTON ------------------ */}
      <div className="text-right mt-6">
        <button className="px-8 py-3 rounded-lg bg-[#98CD56] text-white font-semibold hover:opacity-90 transition shadow">
          Submit
        </button>
      </div>
    </section>
  );
}

/* ------------------ REUSABLE SELECT BOX ------------------ */
function SelectBox({ label, options }: { label: string; options: string[] }) {
  return (
    <div>
      <label className="block mb-1 font-medium text-[#333C46]">{label}</label>
      <select
        className="w-full border border-[#BFE085] rounded-lg px-3 py-2 text-[15px] bg-white focus:outline-[#7FBF45]"
      >
        <option value="">Select {label}</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </select>
    </div>
  );
}