"use client"; 
import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react'; 

export default function MyProfilePage() {
  
  const { data: session, status } = useSession();

  const [firstName, setFirstname] = useState("");
  const [lastName, setLastname] = useState("");
  const [email, setemail] = useState("");
  const [phone, setphone] = useState(""); 

  useEffect(() => {
    if (session && session.user) {
      setFirstname(session.user.firstName || ""); 
      setLastname(session.user.lastName || "");   
      setemail(session.user.email || "");         
    }
  }, [session]); 

  if (status === "loading") {
    return (
      <div className="p-10 text-black">
        <h1 className="text-3xl font-semibold mb-8 text-center">Your Profile is loading...</h1>
      </div>
    );
  }

  return (

    <div className="p-10 text-black">
      <h1 className="text-3xl font-semibold mb-8">My Profile</h1>

      <div 
        className="max-w-md mx-auto p-8 rounded-lg border-2" 
        style={{
          backgroundColor: 'white',
          borderColor: '#A5D6A7'
        }}
      >
        
        <form className="space-y-7">
          
          <div className="flex items-center">
            <label htmlFor="firstName" className="w-1/3 text-sm font-medium text-black">
              First Name:
            </label>
            <input
              type="text"
              id="firstName"
              value={firstName}
              onChange={(e) => setFirstname(e.target.value)}
              className="flex-1 bg-white text-gray-900 p-2 rounded-md"
              style={{borderColor: '#A5D6A7', borderWidth: '1px'}}
            />
          </div>

          <div className="flex items-center">
            <label htmlFor="lastName" className="w-1/3 text-sm font-medium text-black">
              Last Name:
            </label>
            <input
              type="text"
              id="lastName"
              value={lastName}
              onChange={(e) => setLastname(e.target.value)}
              className="flex-1 bg-white text-black-900 p-2 rounded-md"
              style={{borderColor: '#A5D6A7', borderWidth: '1px'}}
            />
          </div>

          <div className="flex items-center">
            <label htmlFor="email" className="w-1/3 text-sm font-medium text-black">
              Email:
            </label>
            <input
              type="email"
              id="email"
              value={email} 
              onChange={(e) => setemail(e.target.value)}
              className="flex-1 bg-white text-gray-900 p-2 rounded-md"
              style={{borderColor: '#A5D6A7', borderWidth: '1px'}}
            />
          </div>

          <div className="flex items-center">
            <label htmlFor="phone" className="w-1/3 text-sm font-medium text-black">
              Phone Number:
            </label>
            <input
              type="tel"
              id="phone"
              value={phone}
              onChange={(e) => setphone(e.target.value)}
              className="flex-1 bg-white text-gray-900 p-2 rounded-md"
              style={{borderColor: '#A5D6A7', borderWidth: '1px'}}
              placeholder="1234 567 890"
            />
          </div>

          <div className="pt-4 flex justify-between">
            <button
              type="button"
              className="px-4 py-2 text-white font-semibold rounded-md shadow-md hover:opacity-90"
              style={{backgroundColor: 'orange'}} 
            >
              Change Password
            </button>
            
            <button
              type="button"
              className="px-4 py-2 text-white font-semibold rounded-md shadow-md hover:opacity-90"
              style={{backgroundColor: 'red'}} 
            >
              Delete Account
            </button>
            
            <button
              type="submit"
              className="px-4 py-2 text-white font-semibold rounded-md shadow-md hover:opacity-90"
              style={{backgroundColor: '#65C158'}}
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}