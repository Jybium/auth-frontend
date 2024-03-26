import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import * as jose from "jose";
export async function middleware(request, response) {

   const headersList = headers();
   const bearerToken = headersList.get("authorization").substring(7);
  console.log(bearerToken)
 const currentUrl = request.url;
  const url = request.nextUrl.clone();
  url.pathname = `/login?redirect=${encodeURI(currentUrl)}`;

  if (!bearerToken) {
    return new NextResponse(
      JSON.stringify({ errorMessage: "Unauthorized request" }),
      { status: 401 }
    );
  }

  const token = bearerToken.split(" ")[1];

  if (!token) {
    return (
      new
        NextResponse.json({ message: "Unauthorised request" }, { status: 401 }),
        NextResponse.redirect(encodeURI(url).replace("%253F", "?"))
      );
  }

  const secret = new TextEncoder().encode(process.env.JWT_SECRET);

  try {
    await jose.jwtVerify(token, secret);
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ errorMessage: "Unauthorized request" }),
      { status: 401 }
    );
  }
}

export const config = {
  matcher: ["/api/auth/me", "/me"],
};