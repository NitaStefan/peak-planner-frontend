"use server";

import { cookies } from "next/headers";
import { cache } from "react";

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete("accessToken");
  cookieStore.delete("refreshToken");
}

// cache instead of context to avoid client-side JavaScript
// cached function persists through a single render cycle
// navigation naturally triggers a new render cycle, resetting the cache
export const isLoggedIn = cache(async () => {
  console.log("CACHED isLoggedIn CALLED");
  const cookieStore = await cookies();
  return !!cookieStore.get("refreshToken");
});

export const storeTokens = async (
  accessToken: string,
  refreshToken: string,
) => {
  const cookieStore = await cookies();

  cookieStore.set("accessToken", accessToken, {
    httpOnly: true, // only accessible by the server (in the nodejs environment)
    // only send cookie over https in production
    // secure: process.env.NODE_ENV === 'production',
    sameSite: "strict",
    maxAge: 1800, // 30 min
  });

  cookieStore.set("refreshToken", refreshToken, {
    httpOnly: true,
    // secure: process.env.NODE_ENV === 'production',
    sameSite: "strict",
    maxAge: 1728000, // 20 days
  });
};

export const getAccessToken = async () => {
  // cannot set cookies here
  const cookieStore = await cookies();

  return cookieStore.get("accessToken")?.value;
};
