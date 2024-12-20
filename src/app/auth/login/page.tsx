import { CardWrapper } from "@/components/auth/card-wrapper";
import { LoginForm } from "@/components/auth/login-form";
import { getUserSession } from "@/lib/hooks";
import { redirect } from "next/navigation";


export default async function LoginPage(){
    // const session = await getUserSession();
    // if(session?.user) return redirect("/dashboard");
    
    return (
        <div className="w-[400px]">
            <CardWrapper 
              headerLabel="Welcome Back"
              backButtonLabel="Don't have an account?"
              backButtonhref="/auth/signup"
              showSocial
            >
                <LoginForm />
            </CardWrapper>
        </div>
    )
}