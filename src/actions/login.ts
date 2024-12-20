"use server";

import { signIn } from "@/auth";
import { sendVerificationEmail } from "@/lib/emails";
import { generateVerificationToken, getVerificationTokenByEmail, getVerificationTokenByToken } from "@/lib/tokens";
import { getUserByEmail } from "@/lib/user";
import { userLoginSchema, userLoginSchemaType } from "@/schemas/index";
import { AuthError } from "next-auth";

export const login = async (values: userLoginSchemaType) => {
  try {

    const validated = userLoginSchema.safeParse(values);

    if (!validated.success) {
      return { error: "Invalid Fields", success: null };
    }
    const { email, password } = validated.data;

    const existingUser = await getUserByEmail(email);

    if (!existingUser || !existingUser.email || !existingUser.password) {
      return { error: "Email does not exist", success: null };
    }

    if (!existingUser.emailVerified) {
      // const verificationEmail = await getVerificationTokenByEmail(existingUser.email)
      // if(!verificationEmail?.email) return { error:"Email does not exist",success:null };
      
      // const isVerificationEmailExpired = new Date(verificationEmail?.expires) < new Date();
      // if(!isVerificationEmailExpired) return  { error:"Please verify your email",success:null}

      const verificationToken = await generateVerificationToken(
        existingUser.email
      );
      await sendVerificationEmail(
        verificationToken.email,
        verificationToken.token
      );
      return { error:"Please verify your email",success:null}
    }

    await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    return { success: "Login Successfull", error: null };
  } catch (error) {
    console.log("action/login.ts -- " + error);

    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid Credentials", success: null };
        default:
          return {
            error: "Something went wrong.Please try again",
            success: null,
          };
      }
    }

    return { error: "Something went wrong.Please try again", success: null };
  }
};
