"use client";

import { useState, useEffect } from "react";
import { Search, Edit, Trash2, Delete } from "lucide-react";

export default function InventoryPage() {
  const [category, setCategory] = useState("");
  const [condition, setCondition] = useState("");
  const [status, setStatus] = useState("");
  const [search, setSearch] = useState("");
  const [inventory, setInventory] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [categories, setCategories] = useState<any[]>([]);
  const [conditions, setConditions] = useState<any[]>([]);
  const [sizes, setSizes] = useState<any[]>([]); 
  const [genders, setGenders] = useState<any[]>([]);


  const [totalItems, setTotalItems] = useState(0);
  const [availableItems, setAvailableItems] = useState(0);
  const [distributedItems, setDistributedItems] = useState(0);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editForm, setEditForm] = useState({
    categoryId: 0,
    conditionId: 0,
    sizeId: null as number | null,
    genderId: 0,
  });

  
  const CATEGORY_OPTIONS = [
    { id: 1, label: "Clothing" },
    { id: 2, label: "Footwear" },
    { id: 3, label: "Accessories" },
  ];

  const CONDITION_OPTIONS = [
    { id: 1, label: "New" },
    { id: 2, label: "Good" },
    { id: 3, label: "Used" },
    { id: 4, label: "Damaged" },
  ];

  const GENDER_OPTIONS = [
    { id: 1, label: "Male" },
    { id: 2, label: "Female" },
    { id: 3, label: "Unisex" },
  ];

  const SIZE_OPTIONS = [
    { id: 1, label: "XS" },
    { id: 2, label: "S" },
    { id: 3, label: "M" },
    { id: 4, label: "L" },
    { id: 5, label: "XL" },
    { id: 6, label: "No Size" },
  ];



  const fetchInventory = async () => {
  try {
    const res = await fetch("/api/inventory");
    const data = await res.json();

    setInventory(data);

    setTotalItems(data.length);
    setAvailableItems(data.filter((i: any) => i.totalStock > 0).length);
    setDistributedItems(data.filter((i: any) => i.totalStock === 0).length);
  } catch (err) {
    console.error("Failed to load inventory", err);
  } finally {
    setLoading(false);
  }
};

  useEffect(() => {
    fetchInventory();
  }, []);

  const handleEdit = (item: any) => {
    setEditingId(item.inventoryId);
    setEditForm({
      categoryId: item.category.categoryId,
      conditionId: item.condition.conditionId,
      sizeId: item.size?.sizeId ?? null,
      genderId: item.gender.genderId,
    });
  };



  const handleSave = async (inventoryId: number) => {
    try {
      await fetch("/api/inventory/edit", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: inventoryId,
          ...editForm,
        }),
      });

      setEditingId(null);
      fetchInventory(); 
    } catch (err) {
      console.error("Failed to update inventory", err);
    }
  };

  
  const handleDelete = async (id: number) => {
  const confirmed = confirm("Are you sure you want to delete this item?");
  if (!confirmed) return;

  try {
    const res = await fetch("/api/inventory/delete", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });

    if (!res.ok) {
      alert("Failed to delete item");
      return;
    }

    setInventory((prev) => prev.filter((item) => item.inventoryId !== id));

    alert("Item deleted successfully!");
  } catch (error) {
    console.error("Delete error:", error);
    alert("Error deleting item.");
  }
  };



  const filteredInventory = inventory.filter((item) => {
    const matchCategory =
      category === "" || item.category?.category === category;

    const matchCondition =
      condition === "" || item.condition?.condition === condition;

    const matchStatus =
      status === "" || item.status === status;

    const matchSearch =
      search === "" ||
      item.category?.category.toLowerCase().includes(search.toLowerCase()) ||
      item.size?.size.toLowerCase().includes(search.toLowerCase()) ||
      item.gender?.gender.toLowerCase().includes(search.toLowerCase());

    return matchCategory && matchCondition && matchStatus && matchSearch;
  });

  return (
    <div className="w-full px-10 py-8">
      <h1 className="text-3xl font-semibold mb-7">Inventory</h1>

      <div className="grid grid-cols-3 gap-6 mb-8">
        <StatCard label="Total Items" value={totalItems}/>
        <StatCard label="Available" value={availableItems}/>
        <StatCard label="Distributed" value={distributedItems}/>
      </div>

      
      <div className="flex items-center gap-3 mb-6">
        <div className="flex items-center bg-white rounded-xl px-4 py-2 flex-1 shadow-sm border">
          <Search className="w-4 h-4 text-gray-400 mr-2" />
          <input
            type="text"
            placeholder="Search by Item, Size or Gender"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full outline-none"/>
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
            <option value="">All</option>
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
            <option value="">All</option>
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
            <option value="">All</option>
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
                  <th key={h} className="p-4 text-sm font-semibold">{h}</th>
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
            ) : filteredInventory.length === 0 ? (
              <tr>
                <td colSpan={7} className="p-6 text-center text-gray-500">
                  No matching items found.
                </td>
              </tr>
            ) : 
              filteredInventory.map((item: any) => ((
                <tr key={item.inventoryId} className="border-t">
                  
                  <td className="p-4">
                    {editingId === item.inventoryId ? (
                      <select
                        className="border rounded p-1 w-full"
                        value={editForm.categoryId}
                        onChange={(e) =>
                          setEditForm({ ...editForm, categoryId: Number(e.target.value) })
                        }
                      >
                        {CATEGORY_OPTIONS.map((c) => (
                          <option key={c.id} value={c.id}>
                            {c.label}
                          </option>
                        ))}
                      </select>
                    ) : (
                      item.category.category
                    )}
                  </td>


                  <td className="p-4">
                    {editingId === item.inventoryId ? (
                      <select
                        className="border rounded p-1 w-full"
                        value={editForm.sizeId ?? ""}
                        onChange={(e) =>
                          setEditForm({
                            ...editForm,
                            sizeId: e.target.value ? Number(e.target.value) : null,
                          })
                        }
                      >
                        {SIZE_OPTIONS.map((s) => (
                          <option key={s.id} value={s.id}>
                            {s.label}
                          </option>
                        ))}
                      </select>
                    ) : (
                      item.size?.size ?? "No Size"
                    )}
                  </td>


                  <td className="p-4">
                    {editingId === item.inventoryId ? (
                      <select
                        className="border rounded p-1 w-full"
                        value={editForm.genderId}
                        onChange={(e) =>
                          setEditForm({ ...editForm, genderId: Number(e.target.value) })
                        }
                      >
                        {GENDER_OPTIONS.map((g) => (
                          <option key={g.id} value={g.id}>
                            {g.label}
                          </option>
                        ))}
                      </select>
                    ) : (
                      item.gender.gender
                    )}
                  </td>

                  <td className="p-4">
                    {editingId === item.inventoryId ? (
                      <select
                        className="border rounded p-1 w-full"
                        value={editForm.conditionId}
                        onChange={(e) =>
                          setEditForm({ ...editForm, conditionId: Number(e.target.value) })
                        }
                      >
                        {CONDITION_OPTIONS.map((c) => (
                          <option key={c.id} value={c.id}>
                            {c.label}
                          </option>
                        ))}
                      </select>
                    ) : (
                      item.condition.condition
                    )}
                  </td>

                  <td className="p-4">
                    {item.totalStock > 0 ? "Available" : "Distributed"}
                  </td>

                  <td className="p-4">
                    {item.updatedAt
                      ? new Date(item.updatedAt).toLocaleDateString()
                      : "N/A"}
                  </td>

                  <td className="p-4 flex gap-4">
                    {editingId === item.inventoryId ? (
                      <>
                        <button
                          className="px-3 py-1 text-sm bg-green-500 text-white rounded"
                          onClick={() => handleSave(item.inventoryId)}
                        >
                          Save
                        </button>

                        <button
                          className="px-3 py-1 text-sm bg-gray-300 rounded"
                          onClick={() => setEditingId(null)}
                        >
                          Cancel
                        </button>
                      </>
                    ) : (
                      <>
                        <Edit
                          className="w-4 h-4 cursor-pointer text-green-600"
                          onClick={() => handleEdit(item)}
                        />
                        <Delete
                          className="w-4 h-4 cursor-pointer text-red-600"
                          onClick={() => handleDelete(item.inventoryId)}
                        />
                      </>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
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