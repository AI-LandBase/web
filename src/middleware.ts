import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const authorization = request.headers.get("authorization");

  const expectedUser = process.env.ADMIN_USER;
  const expectedPass = process.env.ADMIN_PASSWORD;

  if (!expectedUser || !expectedPass) {
    return NextResponse.json(
      { error: "認証が設定されていません" },
      { status: 500 }
    );
  }

  if (authorization) {
    const [scheme, encoded] = authorization.split(" ");
    if (scheme === "Basic" && encoded) {
      const decoded = atob(encoded);
      const [user, pass] = decoded.split(":");
      if (user === expectedUser && pass === expectedPass) {
        return NextResponse.next();
      }
    }
  }

  return new NextResponse(null, {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="Admin"',
    },
  });
}

export const config = {
  matcher: ["/inquiries/:path*"],
};
