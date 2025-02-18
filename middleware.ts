import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const API_BASE_URL = process.env.API_BASE_URL;

export async function middleware(request: NextRequest) {
  const accessToken = request.cookies.get("accessToken")?.value;
  const refreshToken = request.cookies.get("refreshToken")?.value;
  const requestUrl = new URL(request.url);

  if (!refreshToken && requestUrl.pathname !== "/")
    return NextResponse.redirect(new URL("/", request.url));

  if (!accessToken && refreshToken) {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/refresh_token`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${refreshToken}`,
        },
      });

      if (response.ok) {
        const { accessToken: newAccessToken } = await response.json();
        const nextResponse = NextResponse.next();
        nextResponse.cookies.set("accessToken", newAccessToken, {
          httpOnly: true,
          //   secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
          maxAge: 1800,
        });
        return nextResponse;
      } else return NextResponse.redirect(new URL("/", request.url));
    } catch (error) {
      console.error("Error refreshing token:", error);
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/events(.*)",
    "/timeline(.*)",
    "/goals(.*)",
    "/update-schedule(.*)",
  ],
};
