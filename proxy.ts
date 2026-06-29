import { NextRequest, NextResponse } from "next/server";

const AIXC_HOST = "aixc.nsartgateway.com";

export function proxy(request: NextRequest) {
  const host = request.headers.get("host")?.split(":")[0];

  if (host === AIXC_HOST && request.nextUrl.pathname !== "/aixc") {
    const url = request.nextUrl.clone();
    url.pathname = "/aixc";
    return NextResponse.rewrite(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|favicon.ico|icon.svg|.*\\..*).*)"],
};
