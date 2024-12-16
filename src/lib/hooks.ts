import { auth } from "@/auth";
import { redirect } from "next/navigation"


export const getUserSession = async () => {
    const session = await auth()

    if(!session?.user) return redirect("/auth/login");

    const hasExpired = new Date(session.expires) < new Date();

    if(hasExpired)  return redirect("/auth/login");

    return session;
}