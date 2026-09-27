import { NextRequest, NextResponse } from "next/server";
import { authCookieOptions, getSupabaseAuthConfig } from "@/lib/supabase-auth";

export async function GET(request: NextRequest) {
  const config = getSupabaseAuthConfig();
  const accessToken = request.cookies.get("layxes_access_token")?.value;
  const refreshToken = request.cookies.get("layxes_refresh_token")?.value;
  if (!config || !accessToken) return NextResponse.json({ user: null });

  let response = await fetch(`${config.url}/auth/v1/user`, { headers: { apikey: config.key, Authorization: `Bearer ${accessToken}` }, cache: "no-store" });
  let tokens: { access_token?: string; refresh_token?: string; expires_in?: number } | null = null;
  if (!response.ok && refreshToken) {
    const refreshed = await fetch(`${config.url}/auth/v1/token?grant_type=refresh_token`, {
      method: "POST",
      headers: { apikey: config.key, "Content-Type": "application/json" },
      body: JSON.stringify({ refresh_token: refreshToken }),
      cache: "no-store",
    });
    if (refreshed.ok) {
      tokens = await refreshed.json();
      response = await fetch(`${config.url}/auth/v1/user`, { headers: { apikey: config.key, Authorization: `Bearer ${tokens?.access_token}` }, cache: "no-store" });
    }
  }
  if (!response.ok) {
    const expired = NextResponse.json({ user: null });
    expired.cookies.delete("layxes_access_token");
    expired.cookies.delete("layxes_refresh_token");
    return expired;
  }
  const user = await response.json();
  const result = NextResponse.json({ user: { id: user.id, email: user.email, metadata: user.user_metadata ?? {} } });
  if (tokens?.access_token && tokens.refresh_token) {
    result.cookies.set("layxes_access_token", tokens.access_token, authCookieOptions(Math.max(60, Number(tokens.expires_in) || 3600)));
    result.cookies.set("layxes_refresh_token", tokens.refresh_token, authCookieOptions(60 * 60 * 24 * 30));
  }
  return result;
}
