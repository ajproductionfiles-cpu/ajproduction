import { PrismaClient } from "@prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import { PrismaD1 } from "@prisma/adapter-d1";
import { getCloudflareContext } from "@opennextjs/cloudflare";

const globalForPrisma = globalThis as unknown as {
  prisma?: PrismaClient;
};

function resolveAdapter() {
  try {
    const context = getCloudflareContext();
    const d1 = (context.env as { DB?: unknown }).DB;
    if (d1) {
      return new PrismaD1(d1 as ConstructorParameters<typeof PrismaD1>[0]);
    }
  } catch {
    // Non-Cloudflare runtime; use local sqlite adapter.
  }

  const databaseUrl = process.env.DATABASE_URL || "file:./prisma/dev.db";
  return new PrismaBetterSqlite3({ url: databaseUrl });
}

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    adapter: resolveAdapter(),
    log: process.env.NODE_ENV === "development" ? ["warn", "error"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
