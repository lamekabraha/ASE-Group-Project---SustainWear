"use client";
import React, { useState } from 'react';
import { useSession } from 'next-auth/react';

interface ProfileFormHandlerProps {
    firstName: string;
    lastName: string;
    email: string;
    setFirstname: (name: string) => void;
    setLastname: (name: string) => void;
    
    children: React.ReactNode; 
}

const ProfileFormHandler: React.FC<ProfileFormHandlerProps> = ({ 
    firstName, 
    lastName, 
    email, 
    setFirstname, 
    setLastname, 
    children 
    }) => {
    
    const { update } = useSession();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [message, setMessage] = useState('');

    const handleProfileSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setMessage('');

        const updatedData = {
            firstName,
            lastName,
        };

        try {
            const res = await fetch('/api/profile', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedData),
            });

            const data = await res.json();

            if (res.ok) {
                const savedUser = data.user; 
                
                if (savedUser.firstName) setFirstname(savedUser.firstName);
                if (savedUser.lastName) setLastname(savedUser.lastName);
                
                await update({ 
                    user: {
                        ...savedUser, 
                        email: email, 
                    }
                }); 

                setMessage('Profile updated successfully! 🎉');
            } else {
                setMessage(`Error: ${data.message || 'Failed to update profile.'}`);
            }
        } catch (error) {
            console.error('Update error:', error);
            setMessage('An unexpected error occurred during profile update.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            {message && (
                <div className={`p-3 mb-4 rounded-md text-sm ${message.includes('Error') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                    {message}
                </div>
            )}
            
            <form className="space-y-7" onSubmit={handleProfileSubmit}>
                                
                <div className="flex items-center">
                    <label htmlFor="firstName" className="w-1/3 text-sm font-medium text-black">First Name:</label>
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
                    <label htmlFor="lastName" className="w-1/3 text-sm font-medium text-black">Last Name:</label>
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
                    <label htmlFor="email" className="w-1/3 text-sm font-medium text-black">Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={email} 
                        readOnly
                        className="flex-1 bg-gray-100 text-gray-500 p-2 rounded-md cursor-not-allowed"
                        style={{borderColor: '#A5D6A7', borderWidth: '1px'}}
                    />
                </div>
                
                <div className="pt-4 flex justify-between">
                    {children}
                    
                    <button
                        type="submit"
                        className="px-4 py-2 text-white font-semibold rounded-md shadow-md hover:opacity-90 disabled:opacity-50"
                        style={{backgroundColor: '#65C158'}}
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'Saving...' : 'Save Changes'}
                    </button>
                </div>
            </form>
        </>
    );
};

export default ProfileFormHandler;