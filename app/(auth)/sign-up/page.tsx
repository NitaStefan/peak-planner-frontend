"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { signUpSchema, TSignUpSchema } from "@/lib/validations";

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

  const inputClass = "bg-blue-dark mt-[15px]";
  const errorClass = "text-red-300";

  return (
    <>
      <h1 className="mb-[25px] text-2xl">Create an account</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          {...register("username")}
          type="text"
          placeholder="Username"
          className={inputClass}
        />
        {errors.username && (
          <p className={errorClass}>{errors.username.message}</p>
        )}
        <Input
          {...register("email")}
          type="email"
          placeholder="Email"
          className={inputClass}
        />
        {errors.email && <p className={errorClass}>{errors.email.message}</p>}
        <Input
          {...register("password")}
          type="password"
          placeholder="Password"
          className={inputClass}
        />
        {errors.password && (
          <p className={errorClass}>{errors.password.message}</p>
        )}
        <Input
          disabled={isSubmitting}
          type="submit"
          value="Sign Up"
          className={inputClass}
        />
      </form>
      <div className="mt-[15px]">
        <span className="font-karla">Have an account?</span>
        <Link href="/sign-in" className="ml-[6px]">
          Sign in
        </Link>
      </div>
    </>
  );
};

export default Page;
