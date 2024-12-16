import { getUserSession } from "@/lib/hooks"


export default async function DashboardPage(){

    const session = await getUserSession()

    return (
        <div>
            Dashboard
            { JSON.stringify(session) }
        </div>
    )
}