// "use server";

// import { prisma } from "@/lib/db";
// import { getUserSession } from "@/lib/hooks";
// import { userOnBoardingSchema } from "@/schemas/auth/user";

// export const onBoarding = async (prevState: any, formData: FormData) => {
//   try {
//     const data = {
//       name: formData.get("name") as string,
//       username: formData.get("username") as string,
//     };

//     const validated = userOnBoardingSchema.safeParse(data);

//     if (!validated.success) {
//       return { error: validated.error.formErrors.fieldErrors, success: null };
//     }

//     const session = await getUserSession();

//     if (!session?.user?.id) {
//       return { error:"User session not found", success: null };
//     }

//     // await prisma.user.update({
//     //   where: { id: session.user.id },
//     //   data: {
//     //     username: validated.data.username,
//     //     name: validated.data.name,
//     //   },
//     // });

//   } catch (error) {
//     console.error(error);
//     //return { error:"An unexpected error occurred", success: null };
//   }
// };
