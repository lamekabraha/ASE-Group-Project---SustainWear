"use client";
import React from "react";
import { FaHome, FaPlus, FaHistory, FaLeaf, FaUser } from 'react-icons/fa';

export default function DonorSidebar() {
  return (

    <div className="w-64 bg-[#FF6B35] flex flex-col h-full justify-center rounded-tr-2xl rounded-br-2xl">
      
      <ul className="flex flex-col space-y-9 p-4">

        <li className="rounded-full font-semibold border border-[#4B6378] text-[#4B6378] hover:bg-[#4B6378] hover:text-white transition-colors">
          <a href="/" className="flex items-center justify-center w-full p-3">
            <FaHome size={20} className="mr-3" /> Home
          </a>
        </li>

        <li className="rounded-full font-semibold border border-[#4B6378] text-[#4B6378] hover:bg-[#4B6378] hover:text-white transition-colors">
          <a href="/new-donation" className="flex items-center justify-center w-full p-3">
            <FaPlus size={20} className="mr-3" /> New Donation
          </a>
        </li>

        <li className="rounded-full font-semibold border border-[#4B6378] text-[#4B6378] hover:bg-[#4B6378] hover:text-white transition-colors">
          <a href="/history" className="flex items-center justify-center w-full p-3">
            <FaHistory size={20} className="mr-3" /> Donation History
          </a>
        </li>

        <li className="rounded-full font-semibold border border-[#4B6378] text-[#4B6378] hover:bg-[#4B6378] hover:text-white transition-colors">
          <a href="/impact" className="flex items-center justify-center w-full p-3">
            <FaLeaf size={20} className="mr-3" /> My Impact
          </a>
        </li>

        <li className="rounded-full font-semibold border border-[#4B6378] text-[#4B6378] hover:bg-[#4B6378] hover:text-white transition-colors">
          <a href="/profile" className="flex items-center justify-center w-full p-3">
            <FaUser size={20} className="mr-3" /> My Profile
          </a>
        </li>
      </ul>

    </div>
  );
}