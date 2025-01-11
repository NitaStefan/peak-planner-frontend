"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { signUpSchema, TSignUpSchema } from "@/lib/validations";
import { Label } from "@/components/ui/label";

const Page = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TSignUpSchema>({ resolver: zodResolver(signUpSchema) });

  const onSubmit = async (data: TSignUpSchema) => {
    // TODO: submit to server

    await new Promise((resolve) => setTimeout(resolve, 1000));
  };

  const inputClass = "border-2";
  const errorClass = "text-red-300";

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
          {errors.email && <p className={errorClass}>{errors.email.message}</p>}
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
        <Input
          disabled={isSubmitting}
          type="submit"
          value="Sign Up"
          className="mt-[15px] bg-blue-dark"
        />
      </form>
      <div className="mt-[15px]">
        <span className="font-karla">Have an account?</span>
        <Link href="/sign-in" className="ml-[6px] underline">
          Sign in
        </Link>
      </div>
    </>
  );
};

export default Page;
