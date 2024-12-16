import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { prisma } from "@/lib/db";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { userLoginSchema } from "@/schemas/auth/user";
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
        console.log({user})
        console.log({account})
        if(!user.id) return false;
        const existingUser = await getUserById(user.id)
        console.log("user stopped")
        if(!existingUser?.emailVerified) return false;
        return true;
    }
  },
  adapter: PrismaAdapter(prisma),
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
