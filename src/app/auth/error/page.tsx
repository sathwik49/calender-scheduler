"use client"

import { CardWrapper } from "@/components/auth/card-wrapper";
import { Button } from "@/components/ui/button";
import { useRouter, useSearchParams } from "next/navigation"

export default function AuthErrorPage(){

    const params = useSearchParams();
    const router = useRouter();
    const error = params.get('error')

    return (
        <div className="bg-white text-black">
            {error}
        </div>
    )
}