"use server";

import { cookies } from "next/headers";

// token values never pass through client-side JavaScript
export async function storeTokens(accessToken: string, refreshToken: string) {
  const cookieStore = await cookies();

  cookieStore.set("accessToken", accessToken, {
    httpOnly: true, // only accessible by the server
    // only send cookie over https in production
    // secure: process.env.NODE_ENV === 'production',
    sameSite: "strict",
    maxAge: 1800, // 30 min
    path: "/",
  });

  cookieStore.set("refreshToken", refreshToken, {
    httpOnly: true,
    // secure: process.env.NODE_ENV === 'production',
    sameSite: "strict",
    maxAge: 1728000, // 20 days
    path: "/",
  });
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete("accessToken");
  cookieStore.delete("refreshToken");
}

export async function isLoggedIn() {
  const cookieStore = await cookies();
  return !!cookieStore.get("refreshToken");
}
