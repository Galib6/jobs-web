import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { authTokenKey } from "./@apis/auth/constants";
import { ENV } from "./environments";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (pathname.startsWith("/admin")) {
    const token = request.cookies.get(authTokenKey);
    if (!token) {
      return NextResponse.redirect(new URL("/auth/sign-in", request.url));
    }
    const tokenValue = String(token?.value);
    try {
      const res = await fetch(`${ENV.apiUrl}/health`, {
        headers: {
          Authorization: `Bearer ${tokenValue}`,
        },
      });
      const resData = await res.json();
      if (!resData?.success) {
        return NextResponse.redirect(new URL("/auth/sign-in", request.url));
      }
    } catch (e) {
      console.log("🚀😬 ~ middleware ~ e:", e);
    }

    // Optionally, add token validation logic here
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
