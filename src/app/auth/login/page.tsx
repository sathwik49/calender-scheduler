import { CardWrapper } from "@/components/auth/card-wrapper";
import { LoginForm } from "@/components/auth/login-form";


export default function LoginPage(){
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