import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAuthConfig } from "@/lib/supabase-auth";

const fields = ["name", "phone", "address", "city", "province", "postal"] as const;

export async function PUT(request: NextRequest) {
  const config = getSupabaseAuthConfig();
  const token = request.cookies.get("layxes_access_token")?.value;
  if (!config || !token) return NextResponse.json({ error: "Please sign in to save your details." }, { status: 401 });

  const body = await request.json().catch(() => null);
  const profile = Object.fromEntries(fields.map((field) => [field, typeof body?.[field] === "string" ? body[field].trim().slice(0, 200) : ""]));
  const response = await fetch(`${config.url}/auth/v1/user`, {
    method: "PUT",
    headers: { apikey: config.key, Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify({ data: { customer_profile: profile } }),
    cache: "no-store",
  });
  if (!response.ok) return NextResponse.json({ error: "We couldn't save your details." }, { status: 502 });
  return NextResponse.json({ saved: true });
}
