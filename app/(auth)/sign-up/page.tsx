"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { signUpSchema, TSignUpSchema } from "@/lib/validations";
import { Label } from "@/components/ui/label";
import { signUp } from "@/lib/api";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

const Page = () => {
  const [serverError, setServerError] = React.useState<string | null>(null);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TSignUpSchema>({ resolver: zodResolver(signUpSchema) });

  const onSubmit = async (data: TSignUpSchema) => {
    try {
      await signUp(data);

      router.push("/");
    } catch (error) {
      if (error instanceof Error) setServerError(error.message);
      else setServerError("An unexpected error occurred");
    }
  };

  return (
    <>
      <h1 className="mb-[25px] text-2xl">Create an account</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-[20px]"
      >
        <div>
          <Label htmlFor="username">Username</Label>
          <Input {...register("username")} type="text" id="username" />
          {errors.username && (
            <p className="error">{errors.username.message}</p>
          )}
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input {...register("email")} type="email" id="email" />
          {errors.email && <p className="error">{errors.email.message}</p>}
        </div>
        <div>
          <Label htmlFor="password">Password</Label>
          <Input {...register("password")} type="password" id="password" />
          {errors.password && (
            <p className="error">{errors.password.message}</p>
          )}
        </div>
        {serverError && <p className="error">{serverError}</p>}
        <Button
          disabled={isSubmitting}
          type="submit"
          className="mt-[15px] bg-orange-act text-lg"
        >
          {isSubmitting ? "Signing up..." : "Sign Up"}
        </Button>
      </form>
      <div className="mt-[15px]">
        <span className="font-karla">Have an account?</span>
        <Link href="/sign-in" className="ml-[6px] text-orange-act">
          Sign in
        </Link>
      </div>
    </>
  );
};

export default Page;
