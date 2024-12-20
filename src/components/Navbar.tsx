import Link from "next/link"
import { Button } from "@/components/ui/button"


export const Navbar = () => {
    return (
        <nav className="flex items-center justify-between mx-5 py-5">
            <Link href="/" className="flex items-center justify-center" >
              <h4 className="text-2xl font-semibold">Cal<span className="text-blue-600">Organizer</span></h4>
            </Link>
           <div className="flex gap-5 mr-3">
           <Button variant="ghost">
                <Link href="/auth/login" >
                   Sign In
                </Link>
            </Button>
            <Button color="primary">
                <Link href="/auth/signup" >
                   Get Started
                </Link>
            </Button>
           </div>
        </nav>
    )
}

