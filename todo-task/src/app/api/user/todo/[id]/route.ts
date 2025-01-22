"use server"

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import {client} from "@/lib/prisma"
export async function PUT(req : any, { params }: { params: any }) {
    const session = await getServerSession(authOptions);
  
    if (!session) {
      return new Response("You are not logged in", { status: 403 });
    }
  
    const { title, completed } = await req.json();
  
    const newTodo = await client.toDos.update({
      where: { id: Number(params.id) },
      data: { title, completed },
    });
  
    return new Response(JSON.stringify(newTodo), { status: 200 });
  }
  

  export async function DELETE(req : any, { params }: { params: any }) {
    const session = await getServerSession(authOptions);
  
    if (!session) {
      return new Response("You are not logged in", { status: 403 });
    }
  
    await client.toDos.delete({
      where: { id: Number(params.id) },
    });
  
    return new Response("Todo deleted", { status: 200 });
  }
  