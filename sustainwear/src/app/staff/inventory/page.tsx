"use client";

import { useState, useEffect } from "react";
import { Search, Edit, Trash2 } from "lucide-react";

export default function InventoryPage() {
  const [category, setCategory] = useState("");
  const [condition, setCondition] = useState("");
  const [status, setStatus] = useState("");
  const [search, setSearch] = useState("");
  const [inventory, setInventory] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  async function fetchInventory() {
    try {
      const res = await fetch("/api/inventory");
      const data = await res.json();
      setInventory(data);
    } catch (err) {
      console.error("Failed to load inventory", err);
    } finally {
      setLoading(false);
    }
  }

  fetchInventory();
  }, []);

  

  return (
    <div className="w-full px-10 py-8">

      
      <h1 className="text-3xl font-semibold mb-7">Inventory</h1>

      
      <div className="grid grid-cols-3 gap-6 mb-8">
        <StatCard label="Total Items" value={25} />
        <StatCard label="Available" value={25} />
        <StatCard label="Distributed" value={25} />
      </div>

      
      <div className="flex items-center gap-3 mb-6">
        <div className="flex items-center bg-white rounded-xl px-4 py-2 flex-1 shadow-sm border">
          <Search className="w-4 h-4 text-gray-400 mr-2" />
          <input
            type="text"
            placeholder="Search by Item, Size or Gender"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full outline-none"
          />
        </div>

        <button className="bg-[#9EE37D] text-black px-5 py-2 rounded-lg shadow-sm">
          Filter
        </button>
      </div>

      
<div className="grid grid-cols-3 gap-6 mb-6">

  
  <div className="flex flex-col">
    <label className="text-gray-600 text-sm mb-1">Category</label>
    <select
      className="border rounded-lg p-2 bg-white shadow-sm outline-none"
      value={category}
      onChange={(e) => setCategory(e.target.value)}
    >
      <option value="">All </option>
      <option value="Clothing">Clothing</option>
      <option value="Footwear">Footwear</option>
    </select>
  </div>

  
  <div className="flex flex-col">
    <label className="text-gray-600 text-sm mb-1">Condition</label>
    <select
      className="border rounded-lg p-2 bg-white shadow-sm outline-none"
      value={condition}
      onChange={(e) => setCondition(e.target.value)}
    >
      <option value="">All </option>
      <option value="New">New</option>
      <option value="Good">Good</option>
      <option value="Used">Used</option>
      <option value="Damaged">Damaged</option>
    </select>
  </div>

  
  <div className="flex flex-col">
    <label className="text-gray-600 text-sm mb-1">Status</label>
    <select
      className="border rounded-lg p-2 bg-white shadow-sm outline-none"
      value={status}
      onChange={(e) => setStatus(e.target.value)}
    >
      <option value="">All </option>
      <option value="Available">Available</option>
      <option value="Distributed">Distributed</option>
    </select>
  </div>

</div>


      
      <div className="bg-white border border-[#B5E48C] rounded-xl overflow-hidden shadow-sm">
        <table className="w-full text-left">
          <thead className="bg-[#ECFCE5] text-gray-600">
            <tr>
              {["Category", "Size", "Gender", "Condition", "Status", "Last Updated", "Action"].map(
                (h) => (
                  <th key={h} className="p-4 text-sm font-semibold">
                    {h}
                  </th>
                )
              )}
            </tr>
          </thead>
          
          <tbody>
            {loading ? (
            <tr>
            <td colSpan={7} className="p-6 text-center text-gray-500">
            Loading inventory...
            </td>
            </tr>
            ) : inventory.length === 0 ? (
            <tr>
            <td colSpan={7} className="p-6 text-center text-gray-500">
            No inventory found.
            </td>
            </tr>
            ) : (
            inventory.map((item: any) => (
            <tr key={item.inventoryId} className="border-t">
            <td className="p-4">{item.category.category}</td>
            <td className="p-4">{item.size.size}</td>
            <td className="p-4">{item.gender.gender}</td>
            <td className="p-4">{item.condition.condition}</td>
            <td className="p-4">—</td>
            <td className="p-4">
            {item.updatedAt
            ? new Date(item.updatedAt).toLocaleDateString()
            : "N/A"}
            </td>
            <td className="p-4 flex gap-4">
            <Edit className="w-4 h-4 cursor-pointer text-green-600" />
            <Trash2 className="w-4 h-4 cursor-pointer text-red-600" />
            </td>
            </tr>
            ))
          )}
        </tbody>
        </table>
      </div>

      
      <div className="flex justify-center items-center gap-3 mt-6">
        <button className="px-3 py-1 border rounded">Prev</button>
        <button className="px-3 py-1 bg-[#9EE37D] rounded">1</button>
        <button className="px-3 py-1 border rounded">2</button>
        <button className="px-3 py-1 border rounded">3</button>
        <button className="px-3 py-1 border rounded">Next</button>
      </div>
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="border border-[#B5E48C] bg-white rounded-xl p-6 text-center shadow-sm">
      <p className="text-gray-500 text-sm">{label}</p>
      <p className="text-3xl font-bold mt-2">{value}</p>
    </div>
  );
}

