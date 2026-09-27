import { NextResponse } from "next/server";
import { authCookieOptions, getSupabaseAuthConfig } from "@/lib/supabase-auth";

export async function POST(request: Request) {
  const config = getSupabaseAuthConfig();
  if (!config) return NextResponse.json({ error: "Email sign-in is not configured yet." }, { status: 503 });

  const body = await request.json().catch(() => null);
  const email = typeof body?.email === "string" ? body.email.trim().toLowerCase() : "";
  const token = typeof body?.token === "string" ? body.token.replace(/\s/g, "") : "";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || !/^\d{6}$/.test(token)) {
    return NextResponse.json({ error: "Enter the six-digit code sent to your email." }, { status: 400 });
  }

  const response = await fetch(`${config.url}/auth/v1/verify`, {
    method: "POST",
    headers: { apikey: config.key, "Content-Type": "application/json" },
    body: JSON.stringify({ email, token, type: "email" }),
    cache: "no-store",
  });
  const result = await response.json().catch(() => ({}));
  if (!response.ok || !result.access_token || !result.refresh_token) {
    return NextResponse.json({ error: result.msg || result.message || "That code is invalid or expired." }, { status: 400 });
  }

  const next = NextResponse.json({ user: { id: result.user?.id, email: result.user?.email, metadata: result.user?.user_metadata ?? {} } });
  const age = Math.max(60, Number(result.expires_in) || 3600);
  next.cookies.set("layxes_access_token", result.access_token, authCookieOptions(age));
  next.cookies.set("layxes_refresh_token", result.refresh_token, authCookieOptions(60 * 60 * 24 * 30));
  return next;
}
