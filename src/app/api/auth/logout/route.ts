// app/api/auth/logout/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const backendRes = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/auth/logout`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Forward cookies from browser to backend
        cookie: req.headers.get("cookie") || "",
      },
    }
  );

  const data = await backendRes.json();
  const response = NextResponse.json(data);

  // Forward cookie-clearing headers back to browser
  backendRes.headers.getSetCookie().forEach((cookie) => {
    response.headers.append("Set-Cookie", cookie);
  });

  return response;
}