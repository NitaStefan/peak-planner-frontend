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
