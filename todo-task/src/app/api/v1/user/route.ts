"use server"

import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import {client} from "@/lib/prisma"
export async function POST(req:any) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return new Response("Unauthorized", { status: 403 });
  }

  const { title, completed } = await req.json();

  const todo = await client.toDos.create({
    data: {
      title,
      completed: completed || false,
      userId: session.user.id,
    },
  });

  return new Response(JSON.stringify(todo), { status: 201 });
}
