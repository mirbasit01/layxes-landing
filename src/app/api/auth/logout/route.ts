import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAuthConfig } from "@/lib/supabase-auth";

export async function POST(request: NextRequest) {
  const config = getSupabaseAuthConfig();
  const accessToken = request.cookies.get("layxes_access_token")?.value;
  if (config && accessToken) {
    await fetch(`${config.url}/auth/v1/logout`, { method: "POST", headers: { apikey: config.key, Authorization: `Bearer ${accessToken}` }, cache: "no-store" }).catch(() => undefined);
  }
  const response = NextResponse.json({ signedOut: true });
  response.cookies.delete("layxes_access_token");
  response.cookies.delete("layxes_refresh_token");
  return response;
}
