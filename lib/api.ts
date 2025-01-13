"use server";

import { cookies } from "next/headers";
import { AuthResponse, ErrorResponse } from "./types";
import { TSignInSchema, TSignUpSchema } from "./validations";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

async function apiCall<T, K = undefined>(
  endpoint: string,
  method: string,
  body?: K,
): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!response.ok) {
    const errorData: ErrorResponse = await response.json();
    throw new Error(errorData.message || "An error occurred");
  }

  return response.json();
}

export async function signUp(data: TSignUpSchema): Promise<void> {
  const response = await apiCall<AuthResponse, TSignUpSchema>(
    "/auth/register",
    "POST",
    data,
  );

  const cookieStore = await cookies();

  cookieStore.set("accessToken", response.accessToken, {
    httpOnly: true, // only accessible by the server (in the nodejs environment)
    // only send cookie over https in production
    // secure: process.env.NODE_ENV === 'production',
    sameSite: "strict",
    maxAge: 1800, // 30 min
    path: "/",
  });

  cookieStore.set("refreshToken", response.refreshToken, {
    httpOnly: true,
    // secure: process.env.NODE_ENV === 'production',
    sameSite: "strict",
    maxAge: 1728000, // 20 days
    path: "/",
  });
}

export async function signIn(data: TSignInSchema): Promise<void> {
  const response = await apiCall<AuthResponse, TSignInSchema>(
    "/auth/login",
    "POST",
    data,
  );

  const cookieStore = await cookies();

  cookieStore.set("accessToken", response.accessToken, {
    httpOnly: true,
    // secure: process.env.NODE_ENV === 'production',
    sameSite: "strict",
    maxAge: 1800, // 30 min
    path: "/",
  });

  cookieStore.set("refreshToken", response.refreshToken, {
    httpOnly: true,
    // secure: process.env.NODE_ENV === 'production',
    sameSite: "strict",
    maxAge: 1728000, // 20 days
    path: "/",
  });
}
