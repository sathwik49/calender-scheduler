"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { userSignUpSchema, userSignUpSchemaType } from "@/schemas/index";
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
import { signUp } from "@/actions/signup";
import { useState, useTransition } from "react";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { ClipLoader } from "react-spinners";

export const SignUpForm = () => {
  const [error, setError] = useState<string | null>("");
  const [success, setSuccess] = useState<string | null>("");
  const [isLoading, startTransition] = useTransition();

  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
    resolver: zodResolver(userSignUpSchema),
  });

  const onSubmit = (values: userSignUpSchemaType) => {
    //console.log(values)
    //setError(""),setSuccess("")
    startTransition(async () => {
      const res = await signUp(values);
      setError(res.error);
      setSuccess(res.success);
      if (!res.error) {
        form.setValue("name", "");
        form.setValue("email", ""), form.setValue("password", "");
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
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input {...field} disabled={isLoading} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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
            "Sign Up"
          )}
        </Button>
      </form>
    </Form>
  );
};
