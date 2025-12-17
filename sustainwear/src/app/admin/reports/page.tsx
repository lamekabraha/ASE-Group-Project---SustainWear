"use client";

import React, { useState } from 'react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, PieChart, Pie, Cell, Legend
} from 'recharts';
import { Cloud, Download, Filter, Calendar, ChevronRight } from 'lucide-react';

// --- MOCK DATA (Matches your wireframe visuals) ---
const lineData = [
  { name: 'Jan', data1: 10, data2: 20 },
  { name: 'Feb', data1: 20, data2: 30 },
  { name: 'Mar', data1: 30, data2: 50 },
  { name: 'Apr', data1: 40, data2: 45 },
  { name: 'May', data1: 30, data2: 50 },
  { name: 'Jun', data1: 60, data2: 100 },
];

const barData = [
  { name: 'Jan', val: 20 },
  { name: 'Feb', val: 35 },
  { name: 'Mar', val: 50 },
  { name: 'Apr', val: 40 },
  { name: 'May', val: 35 },
  { name: 'Jun', val: 60 },
];

const pieData = [
  { name: 'Category 1', value: 400 },
  { name: 'Category 2', value: 300 },
  { name: 'Category 3', value: 300 },
  { name: 'Category 4', value: 200 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

export default function ReportsPage() {
  return (
    <div className="p-8 max-w-7xl mx-auto bg-white min-h-screen">
      
      {/* HEADER */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* LEFT COLUMN: FILTERS */}
        <div className="lg:col-span-3 space-y-6">
          <button className="flex items-center justify-center w-full py-2 border-3 border-gray-300 rounded-lg text-gray-600 font-semibold hover:bg-gray-50">
            <Filter className="w-4 h-4 mr-2" /> Filter
          </button>

          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 border-b border-gray-200 cursor-pointer hover:bg-gray-50">
              <span className="font-semibold text-gray-700">Date range</span>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </div>
            <div className="flex justify-between items-center p-3 border-b border-gray-200 cursor-pointer hover:bg-gray-50">
              <span className="font-semibold text-gray-700">Category</span>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </div>
          </div>

          <div className="pt-4 space-y-3">
            <button className="flex items-center justify-center w-full py-2 border border-gray-400 rounded text-gray-600 hover:bg-gray-100 text-sm">
              <Download className="w-4 h-4 mr-2" /> Download PDF
            </button>
            <button className="flex items-center justify-center w-full py-2 border border-gray-400 rounded text-gray-600 hover:bg-gray-100 text-sm">
              <Download className="w-4 h-4 mr-2" /> Download CSV
            </button>
          </div>
        </div>

        {/* RIGHT COLUMN: CHARTS */}
        <div className="lg:col-span-9 space-y-8">
          
          {/* 1. LINE CHART: Category Breakdown */}
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col md:flex-row items-center">
            <div className="flex-1 w-full h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={lineData}>
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

          {/* 2. BAR CHART: CO2 Saving */}
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col md:flex-row items-center">
            <div className="flex-1 w-full h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart layout="vertical" data={barData}>
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                  <XAxis type="number" hide />
                  <YAxis dataKey="name" type="category" width={40} axisLine={false} tickLine={false} />
                  <Tooltip />
                  <Bar dataKey="val" fill="#0ea5e9" radius={[0, 4, 4, 0]} barSize={20} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            
            {/* The CO2 Badge from your design */}
            <div className="mt-4 md:mt-0 md:ml-6 flex flex-col items-center justify-center p-6 border-3 border-green-400 rounded-xl bg-green-50">
              <div className="flex items-center text-green-600 mb-2">
                <Cloud className="w-8 h-8 mr-2 fill-current" />
                <span className="font-bold text-lg">CO2 Saving:</span>
              </div>
              <span className="text-4xl font-extrabold text-gray-800">4 kgCO2</span>
            </div>
          </div>

          {/* 3. PIE CHART: Donations Over Time */}
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col md:flex-row items-center">
            <div className="flex-1 w-full h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
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