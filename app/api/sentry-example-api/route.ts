import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export function GET() {
  return NextResponse.json({ status: "healthy", message: "KP Elite Golf API operational" });
}
