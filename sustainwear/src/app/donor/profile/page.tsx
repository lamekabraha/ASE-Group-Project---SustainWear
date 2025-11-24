"use client";
import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react'; 
import { useRouter } from 'next/navigation';

import ChangePasswordModal from '@/app/Components/Changepasswordmodal';
import DeleteAccountModal from '@/app/Components/Deleteaccountmodal';
import ProfileFormHandler from '@/app/Components/Profileformhandler';


export default function MyProfilePage() {
    const { data: session, status } = useSession(); 
    const router = useRouter();

    // State for form inputs (passed to the handler)
    const [firstName, setFirstname] = useState("");
    const [lastName, setLastname] = useState("");
    const [email, setemail] = useState(""); 
    
    // State to control modal visibility
    const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false); 
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); 

    // State to control initial session loading (The Fix for the update bug)
    const [isInitialLoad, setIsInitialLoad] = useState(true); 

    // 🔑 FIX: Load session data only on the first render to prevent overwrites
    useEffect(() => {
        if (session && session.user && isInitialLoad) {
            setFirstname(session.user.firstName || ""); 
            setLastname(session.user.lastName || "");   
            setemail(session.user.email || ""); 
            
            setIsInitialLoad(false); 
        }
    }, [session, isInitialLoad]); 
    
    
    if (status === "loading") {
        return (
            <div className="p-10 text-black">
                <h1 className="text-3xl font-semibold mb-8 text-center">Your Profile is loading...</h1>
            </div>
        );
    }
    
    if (status !== 'authenticated') {
        return <div className="p-10 text-black">Please log in to view your profile.</div>;
    }

    return (
        <>
            <div className="p-10 text-black">
                <h1 className="text-3xl font-semibold mb-8">My Profile</h1>

                <div 
                    className="max-w-md mx-auto p-8 rounded-lg border-2" 
                    style={{
                        backgroundColor: 'white',
                        borderColor: '#A5D6A7'
                    }}
                >
                    
                    {/* 1. Renders the Form, Input Fields, and Save Logic */}
                    <ProfileFormHandler 
                        firstName={firstName}
                        lastName={lastName}
                        email={email}
                        setFirstname={setFirstname}
                        setLastname={setLastname}
                    >
                        {/* 2. Change Password Button (opens modal) */}
                        <button
                            type="button"
                            onClick={() => setIsPasswordModalOpen(true)}
                            className="px-4 py-2 text-white font-semibold rounded-md shadow-md hover:opacity-90"
                            style={{backgroundColor: 'orange'}} 
                        >
                            Change Password
                        </button>
                        
                        {/* 3. Delete Account Button (opens modal) */}
                        <button
                            type="button"
                            onClick={() => setIsDeleteModalOpen(true)}
                            className="px-4 py-2 text-white font-semibold rounded-md shadow-md hover:opacity-90"
                            style={{backgroundColor: 'red'}} 
                        >
                            Delete Account
                        </button>
                    </ProfileFormHandler>

                </div>
            </div>

            {/* Modals Render (Rendered outside the main profile box) */}
            <ChangePasswordModal 
                isOpen={isPasswordModalOpen} 
                onClose={() => setIsPasswordModalOpen(false)} 
            />
            <DeleteAccountModal 
                isOpen={isDeleteModalOpen} 
                onClose={() => setIsDeleteModalOpen(false)} 
            />
        </>
    );
}