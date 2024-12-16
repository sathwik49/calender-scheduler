

export const FormNeutral = ({message}:{message:string | null}) => {
    if(!message) return null;

    return (
        <div className="w-full p-3 font-semibold rounded-md text-sm gap-x-2 flex items-center bg-gray-400 text-black">
            <p>{message}</p>
        </div>
    )
}