'use client';
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Users, HeartHandshake, Package, LineChart, User } from 'lucide-react';
import {SignOutBtn} from "./signOut";
interface SidebarLinkProps {
  href: string;
  icon: React.ElementType;
  label: string;
}

const SidebarLink: React.FC<SidebarLinkProps> = ({ href, icon: Icon, label }) => {
  const pathname = usePathname();
  const isActive = pathname === href || (href !== '/admin' && pathname.startsWith(href));

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

export default function AdminSidebar() {
  
  return (
    <div className="w-70 bg-orange flex flex-col h-screen rounded-tr-2xl rounded-br-2xl relative p-4">      
      <ul className="flex flex-col space-y-9 p-4 mt-auto mb-auto">
        <SidebarLink href="/admin" icon={Home} label="Home" />
        <SidebarLink href="/admin/manage-users" icon={Users} label="Manage Users" />
        <SidebarLink href="/admin/inventory" icon={Package} label="Inventory" />
        <SidebarLink href="/admin/reports" icon={LineChart} label="Reports" />
        <SidebarLink href="/admin/profile" icon={User} label="My Profile" />
      </ul>
      <div className="flex justify-center mb-4">
        <SignOutBtn />
      </div>
    </div>
  );
}