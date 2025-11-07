import NextAuth, {DeffaultSession} from 'next-auth';

declare module 'next-auth' {
    interface Session{
        user:{
            id:string;
            firstName: string | null;
            lastName: string | null;
            email: string | null;
            role: string | null;
        } & DefaultSession['user']
    }

    interface User{
        firstName?: string | null;
        lastName?: string | null;
        email?: string | null;
        role?: string | null;
    }
}