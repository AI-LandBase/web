import { NextRequest, NextResponse } from "next/server";

function safeEqual(a: string, b: string): boolean {
  const encoder = new TextEncoder();
  const aBuf = encoder.encode(a);
  const bBuf = encoder.encode(b);
  const len = Math.max(aBuf.length, bBuf.length);
  let result = aBuf.length ^ bBuf.length;
  for (let i = 0; i < len; i++) {
    result |= (aBuf[i] ?? 0) ^ (bBuf[i] ?? 0);
  }
  return result === 0;
}

const UNAUTHORIZED = new NextResponse(null, {
  status: 401,
  headers: { "WWW-Authenticate": 'Basic realm="Admin"' },
});

export function middleware(request: NextRequest) {
  const expectedUser = process.env.ADMIN_USER;
  const expectedPass = process.env.ADMIN_PASSWORD;

  if (!expectedUser || !expectedPass) {
    return new NextResponse(null, { status: 500 });
  }

  const authorization = request.headers.get("authorization");
  if (!authorization) return UNAUTHORIZED;

  const spaceIndex = authorization.indexOf(" ");
  if (spaceIndex === -1) return UNAUTHORIZED;

  const scheme = authorization.slice(0, spaceIndex);
  const encoded = authorization.slice(spaceIndex + 1);

  if (scheme.toLowerCase() !== "basic" || !encoded) return UNAUTHORIZED;

  let decoded: string;
  try {
    decoded = atob(encoded);
  } catch {
    return UNAUTHORIZED;
  }

  const colonIndex = decoded.indexOf(":");
  if (colonIndex === -1) return UNAUTHORIZED;

  const user = decoded.slice(0, colonIndex);
  const pass = decoded.slice(colonIndex + 1);

  if (safeEqual(user, expectedUser) && safeEqual(pass, expectedPass)) {
    return NextResponse.next();
  }

  return UNAUTHORIZED;
}

export const config = {
  matcher: ["/inquiries/:path*"],
};
