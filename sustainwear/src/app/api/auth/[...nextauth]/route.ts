import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import { Session } from "next-auth";
import { JWT } from "next-auth/jwt";
import bcrypt from "bcryptjs";
import { User as PrismaUser } from '@prisma/client';
import prisma from '../../../../../lib/prisma';

const authOptions = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: {label: 'Email', type: 'text'},
                password: {label: 'Password', type: 'password'}
            },

            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    return null;
                }
                const user = await prisma.user.findUnique({
                    where: {
                        email: credentials.email
                    }
                });
                if (!user) {
                    return null;
                }
                const passwordMatch = await bcrypt.compare(credentials.password, (user as PrismaUser).hashedPassword);
                if (!passwordMatch) {
                    return null;
                }
                return user;

            },
        }),
    ],
    session: {
        strategy: 'jwt' as const,
    },
    callbacks:{
        async jwt({token, user}: {token: JWT, user: any}) {
            if (user) {
                token.id = user.userId;
                token.role = user.role;
                token.firstName = user.firstName;
                token.lastName = user.lastName;
                token.email = user.email;
            }
            return token;
        },
        async session({session, token}: {session: Session, token: JWT}) {
            if (token && session.user){
                session.user.id = token.id;
                session.user.role = token.role;
                session.user.firstName = token.firstName;
                session.user.lastName = token.lastName;
                session.user.email = token.email;
            }
            return session
        }
    },
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: '/'
    },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST, authOptions };