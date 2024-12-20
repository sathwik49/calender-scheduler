import { signOut } from "@/auth"
import { Button } from "../ui/button"

interface variantTypes {
    variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link" | null ,
    className?:string
}

export const SignOut = ({variant,className}:variantTypes) => {
   return (
    <form  action={async()=>{
        "use server"
        await signOut({redirectTo:"/"})
    }}
    >
       <Button variant={variant} className={className} type="submit">Sign Out</Button>
    </form>
   )
}