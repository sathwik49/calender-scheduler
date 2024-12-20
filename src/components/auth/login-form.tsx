"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { userLoginSchema, userLoginSchemaType } from "@/schemas/index";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "../ui/input";
import { login } from "@/actions/login";
import { useState, useTransition } from "react";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { ClipLoader } from "react-spinners";
import { redirect, useRouter } from "next/navigation";

export const LoginForm = () => {
  const [error, setError] = useState<string | null>("");
  const [success, setSuccess] = useState<string | null>("");
  const [isLoading, startTransition] = useTransition();

  const router = useRouter();

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(userLoginSchema),
  });

  const onSubmit = (values:userLoginSchemaType) => {
    //console.log(values)
    //setError(""),setSuccess("")
    startTransition(async () => {
      const res = await login(values);
      setError(res.error);
      //setSuccess(res.success);
      if (!res.error) {
        form.setValue("email", ""), form.setValue("password", "");
        redirect("/onboarding")
      }
      setTimeout(() => (setError(""), setSuccess("")), 4500);
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input {...field} disabled={isLoading} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input {...field} disabled={isLoading} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        {error && <FormError message={error} />}
        {success && <FormSuccess message={success} />}
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? (
            <ClipLoader color="#ffffff" size={20} loading={isLoading} />
          ) : (
            "Login"
          )}
        </Button>
      </form>
    </Form>
  );
};
