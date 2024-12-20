"use client";

import { useForm } from "react-hook-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { settingsFormSchema, settingsFormSchemaType } from "@/schemas";
import { Input } from "../ui/input";
import { FormError } from "../form-error";
import { FormSuccess } from "../form-success";
import { ClipLoader } from "react-spinners";
import { Button } from "../ui/button";
import { useState, useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { prisma } from "@/lib/db";
import { updateSettings } from "@/actions/updateSettings";
import { Label } from "../ui/label";

interface dataProps {
  name: string;
  email: string;
}

export const SettingsForm = ({ name, email }: dataProps) => {
  const [error, setError] = useState<string | null>("");
  const [success, setSuccess] = useState<string | null>("");
  const [isLoading, startTransition] = useTransition();
  const [updatedName, setUpdatedName] = useState(name);
  const [upemail, setupEmail] = useState(email);

  const onSubmit = (e: any) => {
    e.preventDefault()
    startTransition(async () => {
      const res = await updateSettings(updatedName);
      setError(res.error), setSuccess(res.success);
      if(!res.error) setUpdatedName(updatedName)
      setTimeout(() => (setError(""), setSuccess("")), 4500);
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Settings</CardTitle>
        <CardDescription className="text-lg">
          Manage your settings
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form className="space-y-6" onSubmit={onSubmit}>
          <div className="space-y-4">
            <Label className="text-md">Name</Label>
            <Input
              value={updatedName}
              onChange={(e) => setUpdatedName(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label className="text-md">Email</Label>
            <Input value={upemail} disabled />
          </div>
          <div className="space-y-4">
          {error && <FormError message={error} />}
          {success && <FormSuccess message={success} />}
          <Button type="submit" disabled={isLoading} className="w-[200px]">
            {isLoading ? (
              <ClipLoader color="#ffffff" size={20} loading={isLoading} />
            ) : (
              "Save Changes"
            )}
          </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
