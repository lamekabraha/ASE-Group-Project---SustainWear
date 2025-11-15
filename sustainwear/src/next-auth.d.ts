import NextAuth, {DeffaultSession} from 'next-auth';

declare module 'next-auth' {
    interface Session{
        user:{
            id:number;
            firstName: string | null;
            lastName: string | null;
            email: string | null;
            role: string | null;
        } & DefaultSession['user']
    }

    interface User{
        id?:number;
        firstName?: string | null;
        lastName?: string | null;
        email?: string | null;
        role?: string | null;
    }
}

declare module 'next-auth/jwt'{
    interface JWT{
        id?:number;
        firstName?: string | null;
        lastName?: string | null;
        email?: string | null;
        role?: string | null;
    }
}