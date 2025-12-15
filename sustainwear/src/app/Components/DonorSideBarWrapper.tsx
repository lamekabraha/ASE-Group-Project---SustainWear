'use client'
import { useState } from "react";
import DonorSidebar from "./DonorSidebar"; 
import {SquareMenu} from 'lucide-react'

export default function DonorSidebarWrapper({
    children,
}: {
    children: React.ReactNode;

}) {
    const [openSideBar, setOpenSideBar] = useState(false)

    const toggleSideBar = () => {
        setOpenSideBar(!openSideBar)
    }

    return(
        <main className="flex h-screen overflow-hidden flex-col md:flex-row relative">
        <SquareMenu
          onClick={toggleSideBar}
          size={30}
          className="text-navy md:hidden mt-5 ml-3 absolute z-10"
        />
      <div
        className={`
          ${openSideBar ? "flex" : "hidden"} 
          md:flex 
        `}
      >
        <DonorSidebar />
      </div>
      <div className={`${openSideBar ? "hidden md:block" : "block"} flex-1 overflow-y-auto mt-4 ml-2 md:mt-0`}>
        {children}
      </div>
    </main>
    )
}