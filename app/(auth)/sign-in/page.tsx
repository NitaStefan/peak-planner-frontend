"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signIn } from "@/lib/api";
import { signInSchema, TSignInSchema } from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";

const Page = () => {
  const [serverError, setServerError] = React.useState<string | null>(null);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TSignInSchema>({ resolver: zodResolver(signInSchema) });

  const onSubmit = async (data: TSignInSchema) => {
    try {
      await signIn(data);

      router.push("/");
    } catch (error) {
      if (error instanceof Error) setServerError(error.message);
      else setServerError("An unexpected error occurred");
    }
  };

  const inputClass = "border-2";
  const errorClass = "text-red-400 w-[250px]";

  return (
    <>
      <h1 className="mb-[25px] text-2xl">Sign In</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-[20px]"
      >
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            {...register("email")}
            type="email"
            className={inputClass}
            id="email"
          />
          {errors.email && <p className={errorClass}>{errors.email.message}</p>}
        </div>
        <div>
          <Label htmlFor="password">Password</Label>
          <Input
            {...register("password")}
            type="password"
            className={inputClass}
            id="password"
          />
          {errors.password && (
            <p className={errorClass}>{errors.password.message}</p>
          )}
        </div>
        {serverError && <p className={errorClass}>{serverError}</p>}
        <Input
          disabled={isSubmitting}
          type="submit"
          value="Continue"
          className="mt-[15px] bg-orange-act"
        />
      </form>
      <div className="mt-[15px]">
        <span className="font-karla">No account?</span>
        <Link href="/sign-up" className="ml-[6px] text-orange-act">
          Sign up
        </Link>
      </div>
    </>
  );
};

export default Page;
