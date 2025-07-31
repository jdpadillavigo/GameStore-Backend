import fs from "fs";
import path from "path";
import { Client } from "pg";
import prisma from "./prisma";

const getEnv = (key: string) => {
  const value = process.env[key];
  return value && value.trim() !== "" ? value : undefined;
};

const ensureAdminUser = async () => {
  const email = getEnv("ADMIN_EMAIL");
  const password = getEnv("ADMIN_PASSWORD");

  if (!email || !password) {
    return;
  }

  const name = getEnv("ADMIN_NAME") ?? "Admin";
  const country = getEnv("ADMIN_COUNTRY") ?? "Perú";
  const tokenRaw = getEnv("ADMIN_TOKEN");
  const token = tokenRaw ? Number(tokenRaw) : 0;

  await prisma.usuario.upsert({
    where: { email },
    update: {
      password,
      name,
      country,
      token,
      role: "admin"
    },
    create: {
      email,
      password,
      name,
      country,
      token,
      role: "admin"
    }
  });
};

const shouldUseSsl = () => {
  if (process.env.PGSSL === "true") return true;
  if (process.env.NODE_ENV === "production") return true;
  return false;
};

const cleanSql = (sql: string) => {
  const lines = sql.split(/\r?\n/);
  const filtered = lines.filter((line) => {
    if (line.trim().startsWith("--")) return false;
    if (line.includes('INSERT INTO public._prisma_migrations')) return false;
    if (line.includes('SET statement_timeout')) return false;
    if (line.includes('SET lock_timeout')) return false;
    if (line.includes('SET idle_in_transaction_session_timeout')) return false;
    if (line.includes("SET client_encoding")) return false;
    if (line.includes("SET standard_conforming_strings")) return false;
    if (line.includes("SELECT pg_catalog.set_config")) return false;
    if (line.includes("SET check_function_bodies")) return false;
    if (line.includes("SET xmloption")) return false;
    if (line.includes("SET client_min_messages")) return false;
    if (line.includes("SET row_security")) return false;
    if (line.trim() === "") return false;
    return true;
  });

  return filtered.join("\n");
};

const findSeedSqlPath = () => {
  const candidates = [
    path.join(process.cwd(), "src", "seed", "seed.sql"),
    path.join(process.cwd(), "dist", "seed", "seed.sql"),
    path.join(__dirname, "..", "seed", "seed.sql")
  ];

  for (const p of candidates) {
    if (fs.existsSync(p)) return p;
  }

  throw new Error("No se encontró seed.sql en rutas esperadas");
};

export const seedDatabaseIfEmpty = async () => {
  const juegosCount = await prisma.juego.count();

  if (juegosCount === 0) {
    const databaseUrl = process.env.DATABASE_URL;
    if (!databaseUrl) {
      throw new Error("DATABASE_URL no está configurado");
    }

    const sqlPath = findSeedSqlPath();
    const rawSql = fs.readFileSync(sqlPath, "utf8");
    const sql = cleanSql(rawSql);

    const client = new Client({
      connectionString: databaseUrl,
      ssl: shouldUseSsl() ? { rejectUnauthorized: false } : undefined
    });

    await client.connect();

    try {
      await client.query("BEGIN");
      await client.query(sql);
      await client.query("COMMIT");
    } catch (err) {
      await client.query("ROLLBACK");
      throw err;
    } finally {
      await client.end();
    }
  }

  await ensureAdminUser();
};
