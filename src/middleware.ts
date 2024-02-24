import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getUser } from "./services/user";

export async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith("/login")) {
    return;
  }

  const user = await getUser();

  if (!user) {
    console.log("no user");
  }
}
