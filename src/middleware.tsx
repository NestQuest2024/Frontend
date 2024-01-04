import { NextResponse } from "next/server";

export default function middleware(req: any) {
  const isAuthenticated = req.cookies.get("token");
  const userType = req.cookies.get('userType')?.value;

  let url = req.url;

  if ((isAuthenticated && url.includes("/auth/sign-up")) || (isAuthenticated && url.includes("/auth/sign-in"))) {
    return NextResponse.redirect("http://localhost:3000");
  }

  if (isAuthenticated && userType !== "Administrator" && url.includes("/dashboard")) {
    return NextResponse.redirect("http://localhost:3000");
  }

  if (isAuthenticated && userType === "Default" && url.includes("/createOffers")) {
    return NextResponse.redirect("http://localhost:3000");
  }

   if (!isAuthenticated && url.includes("/profile")) {
    return NextResponse.redirect("http://localhost:3000");
   }
}