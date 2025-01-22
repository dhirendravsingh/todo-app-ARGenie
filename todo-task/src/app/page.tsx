import { getServerSession } from "next-auth";
import { redirect } from 'next/navigation'
import { Appbar } from "./components/Appbar";
 import { authOptions } from "./api/auth/[...nextauth]/route";
export default async function Page() {
  const session = await getServerSession(authOptions);
  if (session?.user) {
    return <Appbar/>  } 
    else {
    redirect('/auth/signup')
  }
 
}
