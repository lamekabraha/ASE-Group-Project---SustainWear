"use client";
import React from "react";
import Link from "next/link";
import { SignOutBtn } from "./signOut";
import { FaHome, FaUser, FaClipboardList, FaBox, FaTruck } from 'react-icons/fa'; 

export default function CharityStaffSidebar() {

  
  return (
    <div className="w-64 bg-orange flex flex-col h-screen justify-center rounded-tr-2xl rounded-br-2xl relative">
      <ul className="flex flex-col space-y-9 p-4">

        <li className="rounded-full font-semibold border border-navy text-navy hover:bg-navy hover:text-white transition-colors">
          <Link href="/staff" className="flex items-center justify-center w-full p-3">
            <FaHome size={20} className="mr-3" /> Home
          </Link>
        </li>

        <li className="rounded-full font-semibold border border-navy text-navy hover:bg-navy hover:text-white transition-colors">
          <Link href="/staff/pending-donations" className="flex items-center justify-center w-full p-3">
            <FaClipboardList size={20} className="mr-3" /> Pending Donations
          </Link>
        </li>

        <li className="rounded-full font-semibold border border-navy text-navy hover:bg-navy hover:text-white transition-colors">
          <Link href="/staff/inventory" className="flex items-center justify-center w-full p-3">
            <FaBox size={20} className="mr-3" /> Inventory
          </Link>
        </li>

        <li className="rounded-full font-semibold border border-navy text-navy hover:bg-navy hover:text-white transition-colors">
          <Link href="/staff/distribution" className="flex items-center justify-center w-full p-3">
            <FaTruck size={20} className="mr-3" /> Distribution
          </Link>
        </li>

        <li className="rounded-full font-semibold border border-navy text-navy hover:bg-navy hover:text-white transition-colors">
          <Link href="/staff/profile" className="flex items-center justify-center w-full p-3">
            <FaUser size={20} className="mr-3" /> My Profile
          </Link>
        </li>

         <li className="rounded-full font-semibold border border-navy text-navy hover:bg-navy hover:text-white transition-colors cursor-pointer flex items-center justify-center">
                   <SignOutBtn />
                </li>

      </ul>
    </div>
  );
}