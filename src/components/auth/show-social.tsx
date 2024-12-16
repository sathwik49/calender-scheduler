import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa6";
import { signIn } from "@/auth";

export const ShowSocial = async () => {
  return (
    <div className="w-full flex items-center justify-center gap-4">
      <form
        className="flex justify-center items-center w-full"
        action={async () => {
          "use server";
          await signIn("google",{
            redirectTo:"/dashboard"
          })
        }}
      >
        <Button variant="outline" className="w-full" size="icon">
          <FcGoogle className="text-3xl" />
          <p className="text-medium py-4">Google</p>
        </Button>
      </form>
      <form
        className="flex justify-center items-center  w-full"
        action={async () => {
          "use server";
          await signIn("github",{
            redirectTo:"/dashboard"
          })
        }}
      >
        <Button variant="outline" className="w-full" size="icon">
          <FaGithub className="text-3xl" />
          <p className="text-medium py-4">Github</p>
        </Button>
      </form>
    </div>
  );
};
