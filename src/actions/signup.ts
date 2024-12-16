"use server"
import { prisma } from "@/lib/db";
import { sendVerificationEmail } from "@/lib/emails";
import { generateVerificationToken, produceVerificationToken } from "@/lib/tokens";
import { getUserByEmail } from "@/lib/user";
import { userSignUpSchema, userSignUpSchemaType } from "@/schemas/auth/user";
import bcryptjs from "bcryptjs"


export const signUp = async (values:userSignUpSchemaType) => {
    try {
        const { name,email,password } = values;

        const validated = userSignUpSchema.safeParse({email,password,name});

        if(!validated.success){
            return { error:"Invalid Fields",success:null }
        }

        const existingUser = await getUserByEmail(email)

        if(existingUser?.email){
            return { error:"Email Already in use",success:null }
        }

        const hashedPassword = await bcryptjs.hash(password,10);

        const user = await prisma.user.create({
            data : {
                name,
                email,
                password:hashedPassword
            }
        })

        const verificationToken = await generateVerificationToken(user.email);
        await sendVerificationEmail(
            verificationToken.email,
            verificationToken.token,
        )

        return { success:"Verification Email sent",error:null };


    } catch (error) {
        console.log("actions/signup.ts -- "+error)
        return { error:"Something went wrong",success:null }
    }
}