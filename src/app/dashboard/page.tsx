import { auth, signOut } from "@/auth";
import { SignOut } from "@/components/auth/sign-out";
import { getUserSession } from "@/lib/hooks"
import { getUserById } from "@/lib/user";
import { redirect } from "next/navigation";


export default async function DashboardPage(){
    const session = await auth();

    const nylasConnected = await getUserById(session?.user?.id as string)

    if(!nylasConnected?.grantId){
        return redirect("/onboarding");
    }
    
    return (
        <div>
            Dashboard -- 
            { JSON.stringify(session) }
            <form action={async()=>{
                "use server"
                await signOut({
                    redirectTo:"/"
                })
            }}>
                <button type="submit">Sign Out</button>
            </form>
        </div>
    )
}