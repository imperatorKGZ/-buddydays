import { NextResponse } from "next/server";

/** Disabled until a consent-aware analytics provider and persistence layer are configured. */
export async function POST() {
  return NextResponse.json({ error: "Outbound analytics is not configured." }, { status: 501 });
}
