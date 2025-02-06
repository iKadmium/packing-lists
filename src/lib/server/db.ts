import Database from "better-sqlite3";
import { drizzle } from "drizzle-orm/better-sqlite3";

export function getDb() {
    const dbFile = process.env.NODE_ENV === 'development' ? './data/db.development.sqlite' : './data/db.sqlite';
    const sqlite = new Database(dbFile);
    const db = drizzle(sqlite);
    return db;
}