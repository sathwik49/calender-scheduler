import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { prisma } from "@/lib/db";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { userLoginSchema } from "@/schemas/index";
import { getUserByEmail, getUserById } from "@/lib/user";
import bcryptjs from "bcryptjs";

export const { handlers, signIn, signOut, auth } = NextAuth({
  pages: {
    error:"/auth/error"
  },
  events: {
    async linkAccount({ user }) {
      await prisma.user.update({
        where: { id: user.id },
        data: {
          emailVerified: new Date(),
        },
      });
    },
  },
  callbacks: {
    async signIn({ user,account }){
        if(account?.type!=="credentials") return true;
        if(!user.id) return false;
        const existingUser = await getUserById(user.id)
        if(!existingUser?.emailVerified) return false;
        return true;
    },
    async session({token,session}){
      //console.log({session})
      if(token?.sub){
        session.user.id = token.sub;
      }
      // const user = await getUserById(session.user.id)
      // if(user?.grantId){
      //   session.user.calenderConnected = true
      // }
      return session;
    },
    async jwt({token}){
      //console.log({token})
      if(!token.sub) return token;

      // const existingUser = await getUserById(token.sub);

      // if(!existingUser) return token;

      return token;
    }
  },
  adapter: PrismaAdapter(prisma),
  session: {
    strategy:"jwt",
  },
  providers: [
    Credentials({
      async authorize(credentials) {
        const { email, password } = credentials;
        const validated = userLoginSchema.safeParse({ email, password });

        if (validated.success) {
          const { email, password } = validated.data;

          const user = await getUserByEmail(email);

          if (!user || !user.password) return null;

          const isPasswordMatching = await bcryptjs.compare(
            password,
            user.password
          );
          if (isPasswordMatching) return user;
        }
        return null;
      },
    }),
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
    GitHub({
      clientId: process.env.AUTH_GITHUB_ID,
      clientSecret: process.env.AUTH_GITHUB_SECRET,
    }),
  ],
});
