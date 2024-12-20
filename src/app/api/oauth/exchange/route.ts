import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { nylas, nylasConfig } from "@/lib/nylas";
import { redirect } from "next/navigation";
import { NextRequest } from "next/server";


export async function GET(req:NextRequest){
    const session = await auth();
    const url = new URL(req.url)
    const code = url.searchParams.get("code")

    if(!code){
        return Response.json("Not Authenticated with Nylas",{
            status:400
        })
    }

    try {
        const response = await nylas.auth.exchangeCodeForToken({
            clientId:nylasConfig.clientId,
            clientSecret:nylasConfig.apiKey,
            redirectUri:nylasConfig.redirectUri,
            code:code
        })

        const { grantId,email } = response;

        if(!grantId){
            return redirect("/onboarding")
        }

        await prisma.user.update({
            where:{ id:session?.user?.id },
            data:{
                grantId:grantId,
                grantEmail:email,
            }
        })
        redirect("/dashboard")

    } catch (error) {
        console.log(error)
        return redirect("/onboarding")
       // return { error:"Something went wrong try again or Login again.",success:null}
    }

}