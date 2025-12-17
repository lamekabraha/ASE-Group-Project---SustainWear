"use client";

import React, { useState } from 'react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, PieChart, Pie, Cell, Legend
} from 'recharts';
import { Cloud, Download, Filter, ChevronRight, ChevronDown } from 'lucide-react';
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

// --- MOCK DATASETS (Different for each category) ---

// DATA FOR "ALL"
const DATA_ALL = {
  line: [
    { name: 'Jan', data1: 50, data2: 60 }, { name: 'Feb', data1: 60, data2: 70 },
    { name: 'Mar', data1: 75, data2: 90 }, { name: 'Apr', data1: 80, data2: 95 },
    { name: 'May', data1: 90, data2: 110 }, { name: 'Jun', data1: 100, data2: 130 },
  ],
  bar: [
    { name: 'Jan', val: 50 }, { name: 'Feb', val: 60 }, { name: 'Mar', val: 75 },
    { name: 'Apr', val: 80 }, { name: 'May', val: 90 }, { name: 'Jun', val: 100 },
  ],
  pie: [
    { name: 'Men', value: 40 }, { name: 'Women', value: 35 },
    { name: 'Kids', value: 15 }, { name: 'Other', value: 10 },
  ]
};

// DATA FOR "MEN"
const DATA_MEN = {
  line: [
    { name: 'Jan', data1: 20, data2: 25 }, { name: 'Feb', data1: 25, data2: 30 },
    { name: 'Mar', data1: 30, data2: 40 }, { name: 'Apr', data1: 35, data2: 45 },
    { name: 'May', data1: 40, data2: 50 }, { name: 'Jun', data1: 45, data2: 60 },
  ],
  bar: [
    { name: 'Jan', val: 20 }, { name: 'Feb', val: 25 }, { name: 'Mar', val: 30 },
    { name: 'Apr', val: 35 }, { name: 'May', val: 40 }, { name: 'Jun', val: 45 },
  ],
  pie: [
    { name: 'Shirts', value: 50 }, { name: 'Jeans', value: 30 },
    { name: 'Suits', value: 10 }, { name: 'Shoes', value: 10 },
  ]
};

// DATA FOR "WOMEN"
const DATA_WOMEN = {
  line: [
    { name: 'Jan', data1: 30, data2: 35 }, { name: 'Feb', data1: 40, data2: 50 },
    { name: 'Mar', data1: 45, data2: 60 }, { name: 'Apr', data1: 50, data2: 70 },
    { name: 'May', data1: 60, data2: 80 }, { name: 'Jun', data1: 70, data2: 90 },
  ],
  bar: [
    { name: 'Jan', val: 30 }, { name: 'Feb', val: 40 }, { name: 'Mar', val: 45 },
    { name: 'Apr', val: 50 }, { name: 'May', val: 60 }, { name: 'Jun', val: 70 },
  ],
  pie: [
    { name: 'Dresses', value: 40 }, { name: 'Blouses', value: 30 },
    { name: 'Skirts', value: 20 }, { name: 'Bags', value: 10 },
  ]
};

// DATA FOR "KIDS"
const DATA_KIDS = {
  line: [
    { name: 'Jan', data1: 10, data2: 12 }, { name: 'Feb', data1: 12, data2: 15 },
    { name: 'Mar', data1: 15, data2: 18 }, { name: 'Apr', data1: 18, data2: 20 },
    { name: 'May', data1: 20, data2: 25 }, { name: 'Jun', data1: 25, data2: 30 },
  ],
  bar: [
    { name: 'Jan', val: 10 }, { name: 'Feb', val: 12 }, { name: 'Mar', val: 15 },
    { name: 'Apr', val: 18 }, { name: 'May', val: 20 }, { name: 'Jun', val: 25 },
  ],
  pie: [
    { name: 'Toys', value: 50 }, { name: 'Clothes', value: 40 },
    { name: 'Books', value: 10 },
  ]
};

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

export default function ReportsPage() {
  
  // --- STATE ---
  const [showDateMenu, setShowDateMenu] = useState(false);
  const [showCatMenu, setShowCatMenu] = useState(false);
  
  // Active Filters
  const [dateFilter, setDateFilter] = useState("All");     
  const [catFilter, setCatFilter] = useState("All");       

  // --- FILTERING LOGIC ---
  const getCurrentData = () => {
    let selectedSet = DATA_ALL;
    if (catFilter === "Men") selectedSet = DATA_MEN;
    if (catFilter === "Women") selectedSet = DATA_WOMEN;
    if (catFilter === "Kids") selectedSet = DATA_KIDS;

    let line = [...selectedSet.line];
    let bar = [...selectedSet.bar];
    let pie = [...selectedSet.pie];

    if (dateFilter === "Last 3 Months") {
      line = line.slice(-3);
      bar = bar.slice(-3);
    }

    return { line, bar, pie };
  };

  const { line: currentLineData, bar: currentBarData, pie: currentPieData } = getCurrentData();

  // --- DOWNLOAD FUNCTIONS ---
  
  // 1. CSV Download
  const handleDownloadCSV = () => {
    const headers = ["Month", "Items In", "Items Out"];
    const rows = currentLineData.map(item => [item.name, item.data1, item.data2]);
    const csvContent = [headers.join(","), ...rows.map(e => e.join(","))].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `sustainwear_report_${catFilter}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // 2. PDF Download
  const handleDownloadPDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(20);
    doc.text(`SustainWear Report - ${catFilter}`, 14, 22);
    doc.setFontSize(11);
    doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 14, 30);
    doc.text(`Filter Applied: ${dateFilter}`, 14, 36);

    autoTable(doc, {
      startY: 45,
      head: [['Month', 'Items Collected', 'Items Distributed']],
      body: currentLineData.map(item => [item.name, item.data1, item.data2]),
      theme: 'grid',
      headStyles: { fillColor: [14, 165, 233] },
    });

    const finalY = (doc as any).lastAutoTable.finalY || 60;
    doc.text("Environmental Impact", 14, finalY + 15);
    
    autoTable(doc, {
      startY: finalY + 20,
      head: [['Month', 'CO2 Saved (kg)']],
      body: currentBarData.map(item => [item.name, item.val + " kg"]),
      theme: 'striped',
      headStyles: { fillColor: [34, 197, 94] },
    });

    doc.save(`sustainwear_report_${catFilter}.pdf`);
  };

  return (
    <div className="p-8 max-w-7xl mx-auto bg-white min-h-screen">
      
      {/* HEADER */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* LEFT COLUMN: FILTERS */}
        <div className="lg:col-span-3 space-y-6">
          
          <button className="flex items-center justify-center w-full py-2 border-3 border-gray-300 rounded-lg text-gray-600 font-semibold bg-gray-50">
            <Filter className="w-4 h-4 mr-2" /> 
            {catFilter === "All" ? "Filters Active: All" : `Filters Active: ${catFilter}`}
          </button>

          <div className="space-y-2 border-t border-b border-gray-100 py-4">
            
            {/* DATE RANGE FILTER */}
            <div 
              className="flex justify-between items-center p-3 cursor-pointer hover:bg-gray-50 rounded-lg transition-colors"
              onClick={() => setShowDateMenu(!showDateMenu)}
            >
              <span className="font-semibold text-gray-700">Date range</span>
              {showDateMenu ? <ChevronDown className="w-5 h-5 text-gray-400" /> : <ChevronRight className="w-5 h-5 text-gray-400" />}
            </div>

            {showDateMenu && (
              <div className="bg-gray-50 rounded-lg p-2 ml-4 space-y-2 text-sm border-l-2 border-blue-400">
                 <button 
                    onClick={() => setDateFilter("All")}
                    className={`w-full text-left px-3 py-2 rounded ${dateFilter === "All" ? 'bg-white font-bold shadow-sm' : 'hover:bg-gray-200'}`}
                 >
                   Full Year (Jan-Jun)
                 </button>
                 <button 
                    onClick={() => setDateFilter("Last 3 Months")}
                    className={`w-full text-left px-3 py-2 rounded ${dateFilter === "Last 3 Months" ? 'bg-white font-bold shadow-sm' : 'hover:bg-gray-200'}`}
                 >
                   Last 3 Months
                 </button>
              </div>
            )}

            {/* CATEGORY FILTER */}
            <div 
              className="flex justify-between items-center p-3 cursor-pointer hover:bg-gray-50 rounded-lg transition-colors"
              onClick={() => setShowCatMenu(!showCatMenu)}
            >
              <span className="font-semibold text-gray-700">Category</span>
              {showCatMenu ? <ChevronDown className="w-5 h-5 text-gray-400" /> : <ChevronRight className="w-5 h-5 text-gray-400" />}
            </div>
            
             {showCatMenu && (
              <div className="bg-gray-50 rounded-lg p-2 ml-4 space-y-2 text-sm border-l-2 border-green-400">
                 {["All", "Men", "Women", "Kids"].map((cat) => (
                   <button 
                     key={cat}
                     onClick={() => setCatFilter(cat)}
                     className={`w-full text-left px-3 py-2 rounded ${catFilter === cat ? 'bg-white font-bold shadow-sm text-green-700' : 'hover:bg-gray-200'}`}
                   >
                     {cat === "All" ? "All Categories" : cat}
                   </button>
                 ))}
              </div>
            )}

          </div>

          {/* DOWNLOAD BUTTONS */}
          <div className="pt-4 space-y-3">
            <button 
              onClick={handleDownloadPDF}
              className="flex items-center justify-center w-full py-2 border border-gray-400 rounded text-gray-600 hover:bg-gray-100 text-sm transition-colors"
            >
              <Download className="w-4 h-4 mr-2" /> Download PDF
            </button>
            <button 
              onClick={handleDownloadCSV}
              className="flex items-center justify-center w-full py-2 border border-gray-400 rounded text-gray-600 hover:bg-gray-100 text-sm transition-colors"
            >
              <Download className="w-4 h-4 mr-2" /> Download CSV
            </button>
          </div>
        </div>

        {/* RIGHT COLUMN: CHARTS */}
        <div className="lg:col-span-9 space-y-8">
          
          {/* 1. LINE CHART */}
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col md:flex-row items-center">
            <div className="flex-1 w-full h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={currentLineData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} />
                  <YAxis axisLine={false} tickLine={false} />
                  <Tooltip />
                  <Line type="monotone" dataKey="data1" stroke="#0ea5e9" strokeWidth={2} dot={{ r: 4 }} />
                  <Line type="monotone" dataKey="data2" stroke="#22d3ee" strokeWidth={2} dot={{ r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 md:mt-0 md:ml-6 text-xl font-bold text-gray-600 flex items-center">
               Category <br /> Breakdown
            </div>
          </div>

          {/* 2. BAR CHART */}
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col md:flex-row items-center">
            <div className="flex-1 w-full h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart layout="vertical" data={currentBarData}>
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                  <XAxis type="number" hide />
                  <YAxis dataKey="name" type="category" width={40} axisLine={false} tickLine={false} />
                  <Tooltip />
                  <Bar dataKey="val" fill="#0ea5e9" radius={[0, 4, 4, 0]} barSize={20} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            
            <div className="mt-4 md:mt-0 md:ml-6 flex flex-col items-center justify-center p-6 border-3 border-green-400 rounded-xl bg-green-50">
              <div className="flex items-center text-green-600 mb-2">
                <Cloud className="w-8 h-8 mr-2 fill-current" />
                <span className="font-bold text-lg">CO2 Saving:</span>
              </div>
              <span className="text-4xl font-extrabold text-gray-800">
                {catFilter === "All" && "4.0"}
                {catFilter === "Men" && "1.8"}
                {catFilter === "Women" && "2.5"}
                {catFilter === "Kids" && "0.9"} kg
              </span>
            </div>
          </div>

          {/* 3. PIE CHART */}
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col md:flex-row items-center">
            <div className="flex-1 w-full h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={currentPieData} innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                    {currentPieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Legend verticalAlign="bottom" height={36}/>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 md:mt-0 md:ml-6 text-xl font-bold text-gray-600">
              Donations Over <br /> Time
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}