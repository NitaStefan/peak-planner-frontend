"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signInSchema, TSignInSchema } from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";

const Page = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TSignInSchema>({ resolver: zodResolver(signInSchema) });

  const onSubmit = async (data: TSignInSchema) => {
    // TODO: submit to server

    await new Promise((resolve) => setTimeout(resolve, 1000));
  };

  const inputClass = "border-2";
  const errorClass = "text-red-300";

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
        <Input
          disabled={isSubmitting}
          type="submit"
          value="Continue"
          className="mt-[15px] bg-blue-dark"
        />
      </form>
    </>
  );
};

export default Page;
