"use client"
import { cn } from "@/lib/utils"
import { CalendarCheck, HomeIcon, LucideProps, Settings, Users2 } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ForwardRefExoticComponent, RefAttributes } from "react"

interface DashboardLinks {
    id:string,
    name:string,
    href:string,
    icon:ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>,
}

export const dashBoardLinks:DashboardLinks[] = [
    {
        id:"0",
        name:"Event Types",
        href:"/dashboard",
        icon:HomeIcon
    },
    {
        id:"1",
        name:"Meetings",
        href:"/dashboard/meetings",
        icon:Users2
    },
    {
        id:"2",
        name:"Availability",
        href:"/dashboard/availability",
        icon:CalendarCheck
    },
    {
        id:"3",
        name:"Settings",
        href:"/dashboard/settings",
        icon:Settings
    },
]

export const DashboardLinks = () => {

    const pathName = usePathname();

    return (
        <>
        {
            dashBoardLinks.map((link)=>(
                <Link className={cn(
                    pathName === link.href ? "text-primary bg-primary/10" : "text-muted-foreground hover:text-foreground",
                    "flex items-center rounded-lg gap-3 px-3 py-2 transition-all hover:text-primary"
                )} href={link.href} key={link.id}>
                 <link.icon className="size-4" />
                 {link.name}
                </Link>
            ))
        }
        </>
    )
}