import { randomBytes, scryptSync, timingSafeEqual, createHmac } from "node:crypto";

const SESSION_SECRET = process.env.SESSION_SECRET || "studio-session-secret";

export function hashPassword(password: string) {
  const salt = randomBytes(16).toString("hex");
  const hash = scryptSync(password, salt, 64).toString("hex");
  return `${salt}:${hash}`;
}

export function verifyPassword(password: string, storedHash: string) {
  const [salt, hash] = storedHash.split(":");
  if (!salt || !hash) return false;

  const candidate = scryptSync(password, salt, 64);
  const original = Buffer.from(hash, "hex");

  if (candidate.length !== original.length) return false;
  return timingSafeEqual(candidate, original);
}

export function signValue(value: string) {
  return createHmac("sha256", SESSION_SECRET).update(value).digest("base64url");
}

export function encodeSignedPayload(payload: Record<string, unknown>) {
  const data = Buffer.from(JSON.stringify(payload)).toString("base64url");
  const signature = signValue(data);
  return `${data}.${signature}`;
}

export function decodeSignedPayload<T>(token: string): T | null {
  const [data, signature] = token.split(".");
  if (!data || !signature) return null;

  const expected = signValue(data);
  const actualBuffer = Buffer.from(signature);
  const expectedBuffer = Buffer.from(expected);

  if (actualBuffer.length !== expectedBuffer.length) return null;
  if (!timingSafeEqual(actualBuffer, expectedBuffer)) return null;

  try {
    return JSON.parse(Buffer.from(data, "base64url").toString("utf8")) as T;
  } catch {
    return null;
  }
}
