import {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
    CardFooter
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ShowSocial } from "@/components/auth/show-social"

interface CardWrapperProps {
    children:React.ReactNode,
    headerLabel:string,
    backButtonLabel:string,
    backButtonhref:string,
    showSocial?:boolean
}

export const CardWrapper = ({
   children,
   headerLabel,
   backButtonLabel,
   backButtonhref,
   showSocial
}:CardWrapperProps) => {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-center text-2xl">{headerLabel}</CardTitle>
            </CardHeader>
            <CardContent>
                {children}
            </CardContent>
            {
                showSocial ? (
                    <CardFooter>
                        <ShowSocial />
                    </CardFooter>
                ) : ( null )
            }
            <CardFooter className="flex justify-center">
                <Button variant="link">
                    <Link href={backButtonhref} className="text-center w-full"  >
                      {backButtonLabel}
                    </Link>
                </Button>
            </CardFooter>
        </Card>
    )
}