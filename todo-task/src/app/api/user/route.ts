"use server"
import bcrypt from "bcrypt"

import {client} from "@/lib/prisma"
export async function POST(req:any) {

  const { username, password } = await req.json();

  // creating a hashedpassword which will be saved in the database safely
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const user = await client.user.create({
        data: {
            username: username,
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

  return new Response(JSON.stringify(username), { status: 201 });
}
