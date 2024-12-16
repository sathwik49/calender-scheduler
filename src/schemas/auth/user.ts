import * as z from "zod"


export const userSignUpSchema = z.object({
    name : z.string().min(1,{message:"Required"}),
    email : z.string().min(1,{message:"Required"}).email({message:"Invalid Email"}),
    password : z.string().min(1,{message:"Required"}).min(6,{message:"Password must contain 6 characters"})
})

export type userSignUpSchemaType = z.infer<typeof userSignUpSchema>


export const userLoginSchema = z.object({
    email : z.string().min(1,{message:"Required"}).email({message:"Invalid Email"}),
    password : z.string().min(1,{message:"Required"})
})

export type userLoginSchemaType = z.infer<typeof userLoginSchema>