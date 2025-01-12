import { AuthResponse, ErrorResponse } from "./types";
import { TSignUpSchema } from "./validations";

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

export async function signUp(data: {
  username: string;
  email: string;
  password: string;
}): Promise<AuthResponse> {
  const response = await apiCall<AuthResponse, TSignUpSchema>(
    "/auth/register",
    "POST",
    data,
  );

  return response;
}
