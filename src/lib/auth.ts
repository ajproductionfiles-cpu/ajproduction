import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import { decodeSignedPayload, encodeSignedPayload } from "@/lib/security";
import { ensureSiteSeeded } from "@/lib/site/data";
import { ADMIN_SESSION_COOKIE } from "@/lib/constants";

type SessionPayload = {
  sub: string;
  exp: number;
};

export async function createAdminSession(userId: string) {
  const store = await cookies();
  const value = encodeSignedPayload({
    sub: userId,
    exp: Date.now() + 1000 * 60 * 60 * 24 * 7,
  });

  store.set(ADMIN_SESSION_COOKIE, value, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
}

export async function clearAdminSession() {
  const store = await cookies();
  store.delete(ADMIN_SESSION_COOKIE);
}

export async function getCurrentAdmin() {
  await ensureSiteSeeded();
  const store = await cookies();
  const token = store.get(ADMIN_SESSION_COOKIE)?.value;
  if (!token) return null;

  const session = decodeSignedPayload<SessionPayload>(token);
  if (!session || session.exp < Date.now()) {
    return null;
  }

  return prisma.adminUser.findUnique({
    where: { id: session.sub },
  });
}

export async function requireAdmin() {
  const admin = await getCurrentAdmin();
  if (!admin) {
    redirect("/login");
  }
  return admin;
}
