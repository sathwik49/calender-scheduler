import type { Metadata } from "next";
import Link from "next/link";
import Logo from "/public/Logo.png";
import Image from "next/image";
import { DashboardLinks } from "@/components/dashboard/DashboardLinks";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Calendar, Menu } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { auth, signOut } from "@/auth";

export const metadata: Metadata = {
  title: "CalOrganizer",
};

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  //console.log(session?.user?.image)

  return (
    <>
      <div className="min-h-screen w-full grid md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
        <div className="hidden md:block border-r bg-muted/40">
          <div className="flex h-full max-h-screen flex-col gap-2">
            <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
              <Link href="/" className="flex items-center gap-1">
                {/* <Image
                  src={Logo}
                  alt="Logo"
                  width={34}
                  height={34}
                  className="size-8"
                /> */}
                <Calendar className="size-7" />
                <p className="text-xl font-bold">
                  Cal<span className="text-blue-600">Organizer</span>
                </p>
              </Link>
            </div>
            <div className="flex-1">
              <nav className="grid items-start px-2 lg:px-4">
                <DashboardLinks />
              </nav>
            </div>
          </div>
        </div>
        <div className="flex flex-col">
          <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  className="md:hidden shrink-0"
                  size="icon"
                  variant="outline"
                >
                  <Menu className="size-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="flex flex-col">
                <nav className="grid gap-2 mt-10">
                  <DashboardLinks />
                </nav>
              </SheetContent>
            </Sheet>
            <div className="ml-auto flex items-center gap-x-4">
              <ThemeToggle />
              <DropdownMenu>
                <DropdownMenuTrigger className="rounded-full">
                  <Button
                    variant="secondary"
                    size="icon"
                    className="rounded-full"
                  >
                    {session?.user?.image ? (
                      <img
                        src={session?.user?.image as string}
                        alt="Profile Image"
                        width={20}
                        height={20}
                        className="w-full h-full rounded-full"
                      />
                    ) : (
                      <div className="w-full h-full rounded-full flex items-center justify-center bg-gray-500 text-white">
                        {session?.user?.name
                          ? session?.user?.name[0].toUpperCase()
                          : null}
                      </div>
                    )}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard/settings">Settings</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <form className="cursor-pointer w-full" action={async()=>{
                      "use server"
                      await signOut({redirectTo:"/"})
                    }}>
                      <button className="w-full text-left" type="submit">Log Out</button>
                    </form>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </header>
          <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
            {children}
          </main>
        </div>
      </div>
    </>
  );
}
