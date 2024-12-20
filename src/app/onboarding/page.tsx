import { auth } from "@/auth";
import { SignOut } from "@/components/auth/sign-out";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getUserById } from "@/lib/user";
import { CalendarCheck2 } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function OnBoardingPage() {
  const session = await auth();

  const user = await getUserById(session?.user?.id as string)

  if(user?.grantId){
    return redirect("/dashboard");
  }

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-gradient-to-tl from-sky-400 to-blue-600">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">You are almost done!</CardTitle>
          <CardDescription className="text-md">
            To Proceed further you need to connect your Calender
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button asChild className="w-full">
            <Link href="/api/auth">
              <CalendarCheck2 className="size-4 mr-2" />
              Connect your calender
            </Link>
          </Button>
        </CardContent>
        <CardFooter className="flex justify-center items-center" >
          <SignOut variant="destructive"  />
        </CardFooter>
      </Card>
    </div>
  );
}
