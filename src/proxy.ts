/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtDecode } from "jwt-decode";

import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

const intlMiddleware = createMiddleware(routing);

export default function proxy(request: NextRequest) {
  const pathName = request.nextUrl.pathname;
  const token = request.cookies.get("token")?.value;
  let role: "ADMIN" | "USER" | undefined;

  if (pathName === "/") {
    return NextResponse.redirect(new URL("/en", request.url));
  }

  if (token) {
    try {
      const decoded = jwtDecode<any>(token);

      role = decoded.role;
    } catch (error) {
      console.error("Invalid token", error);
    }
  }

  if (pathName === "/admin/dashboard") {
    return NextResponse.redirect(
      new URL("/admin/dashboard/overview", request.url),
    );
  }

  if (token && (pathName === "/auth/signin" || pathName === "/auth/signup")) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (!token && pathName.startsWith("/booking/confirmation")) {
    return NextResponse.redirect(new URL("/auth/signin", request.url));
  }

  if (!token && pathName.startsWith("/profile")) {
    return NextResponse.redirect(new URL("/auth/signin", request.url));
  }

  if (pathName.startsWith("/admin") && role !== "ADMIN") {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
