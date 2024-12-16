import { CardWrapper } from "@/components/auth/card-wrapper";
import { SignUpForm } from "@/components/auth/signup-form";


export default function SignupPage(){
    return (
        <div className="w-[400px]">
        <CardWrapper
          headerLabel="Create an account"
          backButtonLabel="Already have an account?"
          backButtonhref="/auth/login"
          showSocial
        >
            <SignUpForm />
        </CardWrapper>
        </div>
    )
}