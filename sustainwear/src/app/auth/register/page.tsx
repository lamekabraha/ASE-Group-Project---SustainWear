'use client';

import Image from "next/image"
import Form from "next/form";
import Link from "next/link";
import { useState } from "react";
import {useRouter} from 'next/navigation';

export default function RegisterPage(){

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('')
    const router = useRouter()

    const handleSubmit = async (e: { preventDefault: () => void; target: any; }) => {
        e.preventDefault()
        if (!firstName || !lastName || !email || !password || !confirmPassword){
            setError("Please fill all fields");
            return;
        } else if (password != confirmPassword){
            setError("Passwords do not match");
            return;
        }

        setError("");

        try{
            const userExistsRes = await fetch('/api/userExists', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({email})
            }) 

            const {user} = await userExistsRes.json();

            if (user){
                setError("This email is already in use.")
            }

            const registerRes = await fetch('/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    firstName,
                    lastName,
                    email,
                    password
                }),     
            });

            if (registerRes.ok){
                const form = e.target;
                form.reset()
                router.replace("/dashboard")
            }else{
                console.log('User registration failed.')
            }
        }catch(error) {
            console.log('Error when registratiion: ', {error});
        }
    };

    return (
        <div className="relative">
            <div className="flex justify-between">
                <div></div>
                <div>
                    <Image
                        src="/login-img.png"
                        alt="Young man at a garage sale"
                        width={2000}
                        height={1000}
                        className="object-cover w-auto h-screen"
                    /> 
                </div>
            </div>
            <div className="absolute z-1 top-0 left-0 rounded-r-4xl bg-orange w-2/3 h-screen flex justify-center items-center">
                <div className="bg-navy p-6 rounded-4xl gap-y-4 flex flex-col justify-center text-center">
                    <h1 className="text-green text-5xl">Register</h1>
                    <Form action="submit" onSubmit={handleSubmit} className="gap-y-3 flex flex-col">
                        <section className="gap-x-3 flex flex-row">
                            <input type="text" placeholder="First Name" onChange={(e) => setFirstName(e.target.value)} className="w-full text-2xl rounded-xl p-2 bg-white"/>
                            <input type="text" placeholder="Last Name" onChange={(e) => setLastName(e.target.value)} className="w-full text-2xl rounded-xl p-2 bg-white"/>
                        </section>
                        <input type="text" placeholder="Email" onChange={(e) => setEmail(e.target.value)} className="w-full text-2xl rounded-xl p-2 bg-white"/>
                        <section className="gap-x-3 flex flex-row">
                            <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} className="w-full text-2xl rounded-xl p-2 bg-white"/>
                            <input type="password" placeholder="Confirm Password" onChange={(e) => setConfirmPassword(e.target.value)} className="w-full text-2xl rounded-xl p-2 bg-white"/>
                        </section>
                        {error && (
                            <div className="text-alert text-m">{error}</div>
                        )}
                        <button className="bg-green text-white text-2xl rounded-xl p-2">Sign Up</button>
                    </Form>
                    <p className="text-m text-white">Already a member? <Link href='/auth/login' className="text-green">Sign In</Link></p>
                </div>
            </div>
        </div>
    )
}