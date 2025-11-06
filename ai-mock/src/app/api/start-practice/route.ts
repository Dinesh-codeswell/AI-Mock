import { NextResponse } from "next/server";

export async function POST() {
  // Minimal API endpoint to validate connectivity from CTA button
  return NextResponse.json({ ok: true, message: "Practice session initialized." }, { status: 200 });
}