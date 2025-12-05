'use client';
import React from "react";
import { FaHome, FaPlus, FaHistory, FaLeaf, FaUser } from 'react-icons/fa';
import { SignOutBtn } from "./signOut";

export default function DonorSidebar() {
  
  return (
    <div className="w-64 bg-orange flex flex-col h-screen justify-center rounded-tr-2xl rounded-br-2xl relative">
      <ul className="flex flex-col space-y-9 p-4">

        <li className="rounded-full font-semibold border border-navy text-navy hover:bg-navy hover:text-white transition-colors">
          <a href="/donor" className="flex items-center justify-center w-full p-3">
            <FaHome size={20} className="mr-3" /> Home
          </a>
        </li>

        <li className="rounded-full font-semibold border border-navy text-navy hover:bg-navy hover:text-white transition-colors">
          <a href="/donor/new-donation" className="flex items-center justify-center w-full p-3">
            <FaPlus size={20} className="mr-3"/> New Donation
          </a>
        </li>

        <li className="rounded-full font-semibold border border-navy text-navy hover:bg-navy hover:text-white transition-colors">
          <a href="/donor/donation-history" className="flex items-center justify-center w-full p-3">
            <FaHistory size={20} className="mr-3" /> Donation History
          </a>
        </li>

        <li className="rounded-full font-semibold border border-navy text-navy hover:bg-navy hover:text-white transition-colors">
          <a href="/donor/my-impact" className="flex items-center justify-center w-full p-3">
            <FaLeaf size={20} className="mr-3" /> My Impact
          </a>
        </li>

        <li className="rounded-full font-semibold border border-navy text-navy hover:bg-navy hover:text-white transition-colors">
          <a href="/donor/profile" className="flex items-center justify-center w-full p-3">
            <FaUser size={20} className="mr-3" /> My Profile
          </a>
        </li>

        <li className="rounded-full font-semibold border border-navy text-navy hover:bg-navy hover:text-white transition-colors cursor-pointer flex items-center justify-center">
           <SignOutBtn />
        </li>

      </ul>
    </div>
  );
}