import {client} from "@/lib/prisma"
import CredentialsProvider from "next-auth/providers/credentials"
import NextAuth from "next-auth"

import bcrypt from "bcrypt"

export const authOptions = {
    providers: [
      CredentialsProvider({
          name: 'Credentials',
          credentials: {
            username : { label: "username", type: "text", placeholder: "John", required: true },
            password: { label: "Password", type: "password", required: true }
          },
          
          async authorize(credentials: any) {
            // creating a hashedpassword which will be saved in the database safely
            const hashedPassword = await bcrypt.hash(credentials.password, 10);
            const existingUser = await client.user.findFirst({
                where: {
                    username: credentials.username
                }
            });

            if (existingUser) {
                const passwordValidation = await bcrypt.compare(credentials.password, existingUser.password);
                if (passwordValidation) {
                    return {
                        id: existingUser.id.toString(),
                        username : existingUser.username,
                        
                    }
                }
                throw new Error("Invalid credentials");
            }

            try {
                const user = await client.user.create({
                    data: {
                        username: credentials.username,
                        password: hashedPassword,
                        
                    }
                });
            
                return {
                    id: user.id.toString(),
                    username: user.username,
                }
            } catch(e) {
                console.error(e);
            }

            return null
          },
        })
    ],
    pages: {
        signIn: "/auth/signin",
        signUp: "/auth/signup",
        
      },

    secret: process.env.JWT_SECRET || "secret",
    callbacks: {
        
        async session({ token, session }: any) {
            session.user.id = token.sub

            return session
        }
    }
  }
  const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };