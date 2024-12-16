import { CardWrapper } from "@/components/auth/card-wrapper";
import { VerifyEmail } from "@/components/auth/verify-email";


export default function VerifyEmailPage(){
    return (
        <CardWrapper
          headerLabel="Email Verification"
          backButtonLabel="Back to login"
          backButtonhref="/auth/login"
        >
            <VerifyEmail />
        </CardWrapper>
    )
}