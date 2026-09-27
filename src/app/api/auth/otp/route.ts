import { NextResponse } from "next/server";
import { getSupabaseAuthConfig } from "@/lib/supabase-auth";

export async function POST(request: Request) {
  const config = getSupabaseAuthConfig();
  if (!config) return NextResponse.json({ error: "Email sign-in is not configured yet." }, { status: 503 });

  const body = await request.json().catch(() => null);
  const email = typeof body?.email === "string" ? body.email.trim().toLowerCase() : "";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Enter a valid email address." }, { status: 400 });
  }

  const response = await fetch(`${config.url}/auth/v1/otp`, {
    method: "POST",
    headers: { apikey: config.key, "Content-Type": "application/json" },
    body: JSON.stringify({ email, create_user: true }),
    cache: "no-store",
  });
  if (!response.ok) {
    const result = await response.json().catch(() => ({}));
    return NextResponse.json({ error: result.msg || result.message || "We couldn't send a code. Please try again." }, { status: response.status });
  }
  return NextResponse.json({ sent: true });
}
