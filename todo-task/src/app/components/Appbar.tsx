"use client";

import { useRouter } from "next/navigation"
import { signIn, signOut, useSession } from "next-auth/react";
import { authOptions } from "../api/auth/[...nextauth]/route";
export const Appbar = ()=>{
    const router = useRouter()
    
    return (
        <button onClick={()=>{signIn()}}> Sign In </button>

    )
}