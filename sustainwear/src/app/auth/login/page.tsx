'use client'
import Image from "next/image";
import Form from "next/form";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn, getSession, signOut } from "next-auth/react";

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
        setError('Please fill all fields');
        return;
    }

    try {
        const res = await signIn('credentials', {
            email,
            password,
            redirect: false,
        });

        if (res?.error) {
            setError('Invalid Credentials');
            return;
        }

        const session = await getSession();
        const userRole = session?.user?.role;

        switch(userRole) {
            case 'Admin':
                router.replace('/admin');
                return;
            case 'Donor':
                router.replace('/donor');
                return;
            case 'Staff':
                router.replace('/staff');
                return;
            default:
                setError('Invalid Role');
                await signOut();
                return;
        }

    } catch (error) {
        console.log('Error when logging in: ', error);
    }
}


    return (
        <div className="flex justify-between bg-orange h-screen">
            <div className="w-2/3 flex justify-center items-center">
                <div className="bg-navy p-6 rounded-4xl gap-y-4 flex flex-col justify-center text-center">
                    <h1 className="text-green text-5xl">Sign In</h1>

                    <Form action="submit" onSubmit={handleSubmit} className="gap-y-3 flex flex-col">
                        <input 
                            type="text"
                            placeholder="Email"
                            onChange={e => setEmail(e.target.value)}
                            className="w-full text-2xl rounded-xl p-2 bg-white"
                        />

                        <input 
                            type="password"
                            placeholder="Password"
                            onChange={e => setPassword(e.target.value)}
                            className="w-full text-2xl rounded-xl p-2 bg-white"
                        />

                        {error && (
                            <div className="text-alert text-m">{error}</div>
                        )}

                        <button type="submit" className="bg-green text-white text-2xl rounded-xl p-2">
                            Sign In
                        </button>
                    </Form>

                    <p className="text-m text-white">
                        New to <strong>Sustain</strong>Wear?{" "}
                        <Link href='/auth/register' className="text-green">Register</Link>
                    </p>
                </div>
            </div>
            
            <div className="relative w-1/3 h-full"> 
                <div className="h-full w-full bg-orange absolute rounded-r-4xl"></div> 
                
                <Image
                    src="/login-img.png"
                    alt="Young man at a garage sale"
                    priority 
                    fill
                    className="object-cover rounded-r-4xl" 
                /> 
            </div>
        </div>
    );
}