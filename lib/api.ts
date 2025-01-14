"use server";

import { AuthResponse, ErrorResponse, PlannedEvent } from "./types";
import { TSignInSchema, TSignUpSchema } from "./validations";
import { getAccessToken, storeTokens } from "./actions";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function apiCall<T, K = undefined>(
  endpoint: string,
  method: string,
  accessToken?: string,
  body?: K,
): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
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
    undefined,
    data,
  );

  await storeTokens(response.accessToken, response.refreshToken);
}

export async function signIn(data: TSignInSchema): Promise<void> {
  const response = await apiCall<AuthResponse, TSignInSchema>(
    "/auth/login",
    "POST",
    undefined,
    data,
  );

  await storeTokens(response.accessToken, response.refreshToken);
}

export async function getPlannedEvents() {
  const accessToken = await getAccessToken();

  const response = await apiCall<PlannedEvent>(
    "/planned-events",
    "GET",
    accessToken,
  );

  return response;
}
