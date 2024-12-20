"use server"

import { auth } from "@/auth"
import { prisma } from "@/lib/db"

export const updateSettings = async (name:string) => {
    try {
        const session = await auth()
        const user = await prisma.user.update({
            where : { id:session?.user?.id},
            data:{
                name:name
            }
        })

       return { error:null,success:"Updated Successfully" };
    } catch (error) {
        console.log(error)
        return { error:"Something went wrong.Please try again.",success:null}
    }
}