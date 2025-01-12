"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { signUpSchema, TSignUpSchema } from "@/lib/validations";
import { Label } from "@/components/ui/label";
import { signUp } from "@/lib/api";

const Page = () => {
  const [serverError, setServerError] = React.useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TSignUpSchema>({ resolver: zodResolver(signUpSchema) });

  const onSubmit = async (data: TSignUpSchema) => {
    try {
      const response = await signUp(data);

      // Store tokens (implementation depends on chosen method)
      // storeTokens(response.accessToken, response.refreshToken);

      // Redirect to dashboard or home page
      // router.push('/dashboard');
    } catch (error) {
      if (error instanceof Error) setServerError(error.message);
      else setServerError("An unexpected error occurred");
    }
  };

  const inputClass = "border-2";
  const errorClass = "text-red-400 w-[250px]";

  return (
    <>
      <h1 className="mb-[25px] text-2xl">Create an account</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-[20px]"
      >
        <div>
          <Label htmlFor="username">Username</Label>
          <Input
            {...register("username")}
            type="text"
            className={inputClass}
            id="username"
          />
          {errors.username && (
            <p className={errorClass}>{errors.username.message}</p>
          )}
        </div>
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
          value={isSubmitting ? "Signing up..." : "Sign Up"}
          className="mt-[15px] bg-orange-act"
        />
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
