"use client";

import { useCallback, useEffect, useState, useTransition } from "react";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { BeatLoader, ClipLoader } from "react-spinners";
import { useRouter, useSearchParams } from "next/navigation";
import { verifyEmail } from "@/actions/verify-email";

export const VerifyEmail = () => {
  const [error, setError] = useState<string | null>("");
  const [success, setSuccess] = useState<string | null>("");
  const router = useRouter()

  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const onSubmit = useCallback(async () => {
    if (!token) {
      setError("Invalid Verification Link");
      return;
    }
    const res = await verifyEmail(token);
    setError(res.error);
    if(!res.error){
      router.push("/dashboard")
    }
    //setSuccess(res.success);
  }, [token]);

  useEffect(() => {
    onSubmit();
  }, [onSubmit, token]);

  return (
    <>
      <div className="w-full flex items-center justify-center mb-7">
        <BeatLoader />
      </div>
      <FormError message={error} />
      <FormSuccess message={success} />
    </>
  );
};
