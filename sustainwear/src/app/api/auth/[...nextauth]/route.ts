import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import prisma from '../../../../../lib/prisma';

const authOptions = {
    callbacks: {
        async jwt({ token, user }: { token: any, user: any }){
            if (user) {
                token.id = user.id;
                token.firstName = user.firstName;
                token.lastName = user.lastName;
                token.email = user.email;
                token.role = user.role;
            }
            return token;
        },
        async session({session, token}: {session: any, token: any}) {
            if (token) {
                session.user.id = token.id;
                session.user.firstName = token.firstName;
                session.user.lastName = token.lastName;
                session.user.email = token.email;
                session.user.role = token.role;
            }
            return session;
        }
    },
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: {label: 'Email', type: 'text'},
                password: {label: 'Password', type: 'password'}
            },

            async authorize(credentials) {
                const { email, password } = credentials;

                try {
                    const user = await prisma.user.findFirst({where: {email}});

                    if (!user){
                        return null;
                    } 

                    const passwordMatch = await bcrypt.compare(password, user.hashedPassword);

                    if (!passwordMatch){

                        return null;
                    }
                    return user;
                }catch (error) {
                    console.log("Error: ", {error});
                    return null;
                }
            },
        }),
    ],
    session: {
        strategy: 'jwt' as const,
    },
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: '/'
    },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST, authOptions };