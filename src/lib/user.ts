import { prisma } from "@/lib/db"



export const getUserByEmail = async (email:string) => {
    try {
        const user = await prisma.user.findUnique({ where : { email}} );

        if(user) return user;

        return null;
    } catch (error) {
        console.log("getuserbyemail -- "+error)
        return null;
    }
}

export const getUserById = async (id:string) => {
    try {
        const user = await prisma.user.findUnique({ where : { id }} );

        if(user) return user;

        return null;
    } catch (error) {
        console.log("getuserbyid -- "+error)
        return null;
    }
}