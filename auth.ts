import NextAuth , { DefaultSession } from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import bcryptjs from "bcryptjs"
import Credintials from "next-auth/providers/credentials"
import Google from "next-auth/providers/google"
import Github from "next-auth/providers/github"
import { LoginSchema } from "@/schemas"
import { getUserbyEmail, getUserById } from "@/data/user"
import db from "@/lib/db"

export type ExtendedUser = DefaultSession["user"] & {
  role:"ADMIN" | "USER"
}

declare module "next-auth"{
  interface Session{
    user : ExtendedUser
  } 
}
 
export const { handlers, signIn, signOut, auth } = NextAuth({
  pages: {
    signIn : "/login",
    error : "/error"
  },
  events: {
    async linkAccount({ user }){
      await db.user.update({
        where : { id:user.id },
        data : {
          emailVerified : new Date(),
        }
      })
    }
  },
  callbacks: {
    async signIn({ user,account }){
      if(account?.provider !== "credentials") return true;

      const existingUser = await getUserById(user.id as string);

      if(!existingUser?.emailVerified) return false;

      return true;
    },
    async session({token,session}){
      console.log("session ivoked")
      if(token?.sub){
        session.user.id = token.sub;
      }

      if(token.role && session.user){
        session.user.role = token.role as "ADMIN" | "USER"
      }
      
      return session;
    },
    async jwt({token}){
      console.log("jwt ivoked")
      if(!token.sub) return token;

      const existingUser = await getUserById(token.sub);

      if(!existingUser) return token;

      token.role = existingUser.roles
      return token;
    }
  },
  adapter:PrismaAdapter(db),
  session:{ strategy : "jwt" },
  providers: [
    Credintials({
      async authorize(credentials) {
        const validated = LoginSchema.safeParse(credentials);

        if(validated.success){
          const { email,password } = validated.data
          const user = await getUserbyEmail(email)

          if(!user || !user.password) return null;

          const passwordsMatch = await bcryptjs.compare(password,user.password)

          if(passwordsMatch) return user;
        }
        return null;
      }
    }),
    Google({
      clientId:process.env.AUTH_GOOGLE_ID,
      clientSecret:process.env.AUTH_GOOGLE_SECRET,
    }),
    Github({
      clientId:process.env.AUTH_GITHUB_ID,
      clientSecret:process.env.AUTH_GITHUB_SECRET,
    }),
  ],
})