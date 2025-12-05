"use client";
import React from "react";
import Link from "next/link";
import { SignOutBtn } from "./signOut";
import { FaHome, FaUser, FaUsers, FaHandsHelping, FaChartLine } from 'react-icons/fa'; 

export default function AdminSidebar() {
  
  return (
    <div className="w-64 bg-orange flex flex-col h-screen justify-center rounded-tr-2xl rounded-br-2xl relative">
      <ul className="flex flex-col space-y-9 p-4">

        <li className="rounded-full font-semibold border border-navy text-navy hover:bg-navy hover:text-white transition-colors">
          <Link href="/admin" className="flex items-center justify-center w-full p-3">
            <FaHome size={20} className="mr-3" /> Home
          </Link>
        </li>

        <li className="rounded-full font-semibold border border-navy text-navy hover:bg-navy hover:text-white transition-colors">
          <Link href="/admin/manage-users" className="flex items-center justify-center w-full p-3">
            <FaUsers size={20} className="mr-3" /> Manage Users
          </Link>
        </li>

        <li className="rounded-full font-semibold border border-navy text-navy hover:bg-navy hover:text-white transition-colors">
          <Link href="/admin/manage-donations" className="flex items-center justify-center w-full p-3">
            <FaHandsHelping size={20} className="mr-3" /> Manage Donations
          </Link>
        </li>

        <li className="rounded-full font-semibold border border-navy text-navy hover:bg-navy hover:text-white transition-colors">
          <Link href="/admin/reports" className="flex items-center justify-center w-full p-3">
            <FaChartLine size={20} className="mr-3" /> Reports
          </Link>
        </li>

        <li className="rounded-full font-semibold border border-navy text-navy hover:bg-navy hover:text-white transition-colors">
          <Link href="/admin/profile" className="flex items-center justify-center w-full p-3">
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