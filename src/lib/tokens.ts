import { v4 as uuid } from "uuid"
import { prisma } from "@/lib/db";

export const produceVerificationToken = () => {
  const lowercase = "abcdefghijklmnopqrstuvwxyz";
  const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const numbers = "0123456789";
  const specialChars = "-";
  const uuidString = uuid();

  const allChars = lowercase + uppercase + numbers + specialChars + uuidString;
  let token = "";

  for (let i = 0; i < uuidString.length; i++) {
    const randomIndex = Math.floor(Math.random() * allChars.length);
    token += allChars[randomIndex];
  }

  return token;
};


export const generateVerificationToken = async (email:string) => {
    const token = produceVerificationToken();
    const expires = new Date(new Date().getTime() + 3600*1000);

    const existingToken = await prisma.verificationToken.findFirst({
        where : { email }
    })

    if(existingToken){
        await prisma.verificationToken.delete({
            where : { id:existingToken.id },
        })
    }

    const verificationToken = await prisma.verificationToken.create({
        data : {
            email,
            token,
            expires
        }
    })

    return verificationToken;
}



export const getVerificationTokenByToken = async (token:string) => {
    try {
        const verificationToken = await prisma.verificationToken.findFirst({
            where:{token}
        })
        return verificationToken;
    } catch {
        return null;
    }
}

export const getVerificationTokenByEmail = async (email:string) => {
    try {
        const verificationToken = await prisma.verificationToken.findFirst({
            where:{email}
        })
        return verificationToken;
    } catch {
        return null;
    }
}