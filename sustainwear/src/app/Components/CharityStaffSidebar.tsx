'use client';
import React from "react";
import Link from "next/link"; 
import { usePathname } from "next/navigation"; 

import { Home, ClipboardList, Package, Truck, User } from 'lucide-react';
import { SignOutBtn } from "./signOut";

interface SidebarLinkProps {
  href: string;
  icon: React.ElementType;
  label: string;
}

const SidebarLink: React.FC<SidebarLinkProps> = ({ href, icon: Icon, label }) => {
  const pathname = usePathname();
  const isActive = pathname === href || (href !== '/staff' && pathname.startsWith(href));

  return (
    <li className="list-none">
      <Link
        href={href}
        className={[
          "flex items-center justify-center w-full p-3 rounded-full font-semibold border transition-colors",
          isActive
            ? "bg-navy text-white border-transparent shadow-lg"
            : "text-navy border-navy hover:bg-navy hover:text-white"
        ].join(" ")}
      >
        <Icon size={20} className="mr-3" />
        {label}
      </Link>
    </li>
  );
};

export default function CharityStaffSidebar() {
  
  return (
    <div className="w-64 bg-orange flex flex-col h-screen rounded-tr-2xl rounded-br-2xl relative p-4"> 
      
      <ul className="flex flex-col space-y-9 p-4 mt-auto mb-auto"> 

        <SidebarLink href="/staff" icon={Home} label="Home" />
        <SidebarLink href="/staff/pending-donations" icon={ClipboardList} label="Pending Donations" />
        <SidebarLink href="/staff/inventory" icon={Package} label="Inventory" />
        <SidebarLink href="/staff/distribution" icon={Truck} label="Distribution" />
        <SidebarLink href="/staff/profile" icon={User} label="My Profile" />
        
      </ul>
      
      <div className="flex justify-center mb-4"> 
        <SignOutBtn />
      </div>
    </div>
  );
}