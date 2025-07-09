import { NextResponse } from "next/server";

export const middleware = async () => {
  return NextResponse.next();
};

export const config = {
  matcher: ["/", "/((?!api|_next|.*\\..*).*)"],
};
