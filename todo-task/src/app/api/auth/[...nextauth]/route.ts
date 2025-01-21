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

            

            return null
          },
        })
    ],
    pages: {
        signIn: "/auth/signin",
        
      },

    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        
        async session({ token, session }: any) {
            session.user.id = token.sub

            return session
        }
    }
  }
  const handler = NextAuth(authOptions);
export const GET = handler
export const POST = handler