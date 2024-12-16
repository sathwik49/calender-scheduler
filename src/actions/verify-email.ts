"use server"

import { prisma } from "@/lib/db"
import { getVerificationTokenByToken } from "@/lib/tokens"
import { getUserByEmail } from "@/lib/user"


export const verifyEmail = async (token:string) => {
    try {
        const existingToken = await getVerificationTokenByToken(token)

        if(!existingToken?.token){
            return { error:"Try to Login again.",success:null }
        }

        const hasExpired = new Date(existingToken.expires)  < new Date()

        if(hasExpired){
            return { error:"Verification Link Expired.Please Login again.",success:null }
        }

        const existingUser = await getUserByEmail(existingToken.email)

        if(!existingUser){
            return { error:"Email doesnot exist",success:null }
        }

        await prisma.user.update({
            where : { id:existingUser.id},
            data : {
                emailVerified : new Date(),
            }
        })

        await prisma.verificationToken.delete({
            where : { id:existingToken.id }
        })

        return { success:"Email verified.", error:null}
    } catch (error) {
        return { error:"Something went wrong",success:null }
    }
}