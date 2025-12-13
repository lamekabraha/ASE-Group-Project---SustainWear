'use client';
import React from "react";
import Link from "next/link"; 
import { usePathname } from "next/navigation"; 

import { Home, PlusCircle, History, Leaf, User } from 'lucide-react';
import { SignOutBtn } from "./signOut";

interface SidebarLinkProps {
  href: string;
  icon: React.ElementType;
  label: string;
}

const SidebarLink: React.FC<SidebarLinkProps> = ({ href, icon: Icon, label }) => {
  const pathname = usePathname();
  const isActive = pathname === href || (href !== '/donor' && pathname.startsWith(href));

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


export default function DonorSidebar() {
  
  return (
    <div className="w-64 bg-orange flex flex-col h-screen rounded-tr-2xl rounded-br-2xl relative p-4"> 
      
      <ul className="flex flex-col space-y-9 p-4 mt-auto mb-auto"> 

        <SidebarLink href="/donor" icon={Home} label="Home" />
        <SidebarLink href="/donor/new-donation" icon={PlusCircle} label="New Donation" />
        <SidebarLink href="/donor/donation-history" icon={History} label="Donation History" />
        <SidebarLink href="/donor/my-impact" icon={Leaf} label="My Impact" />
        <SidebarLink href="/donor/profile" icon={User} label="My Profile" />
        
      </ul>
      
      <div className="flex justify-center mb-4"> 
        <SignOutBtn />
      </div>
    </div>
  );
}