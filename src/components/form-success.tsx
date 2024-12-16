import { CircleCheckIcon } from "lucide-react"


export const FormSuccess = ({message}:{message:string | null}) => {
    if(!message) return null;

    return (
        <div className="w-full p-3 font-semibold rounded-md text-sm gap-x-2 flex items-center bg-emerald-100 text-emerald-500">
            <CircleCheckIcon className="h-4 w-4" />
            <p>{message}</p>
        </div>
    )
}