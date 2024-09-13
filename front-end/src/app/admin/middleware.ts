import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const publicRoutes = ["/admin/login"];

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const token = req.cookies.get("CinetokAuthToken");
  console.log(token, "token");

  if (publicRoutes.includes(pathname)) {
    return NextResponse.next();
  }

  if (!token) {
    return NextResponse.redirect(new URL("/admin/login", req.url));
  }

  return NextResponse.next();
}
