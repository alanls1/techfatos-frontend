import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const publicRoutes = ["/alan-admin/login"];

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const token = req.cookies.get("CinetokAuthToken");

  if (publicRoutes.includes(pathname)) {
    return NextResponse.next();
  }

  if (!token) {
    return NextResponse.redirect(new URL("/alan-admin/login", req.url));
  }

  return NextResponse.next();
}
