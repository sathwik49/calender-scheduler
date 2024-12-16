import {TriangleAlert } from 'lucide-react'


export const FormError = ({message}:{message:string | null}) => {
    if(!message) return null;

    return (
        <div className="w-full p-3 font-semibold rounded-md text-sm gap-x-2 flex items-center bg-destructive/15 text-red-500">
            <TriangleAlert className="h-4 w-4" />
            <p>{message}</p>
        </div>
    )
}