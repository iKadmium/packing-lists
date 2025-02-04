import Database from "better-sqlite3";
import { drizzle } from "drizzle-orm/better-sqlite3";
import { migrate } from "drizzle-orm/better-sqlite3/migrator";

export function getDb() {
    const dbFile = process.env.NODE_ENV === 'development' ? './data/db.development.sqlite' : './data/db.sqlite';
    const sqlite = new Database(dbFile);
    const db = drizzle(sqlite);
    migrate(db, {
        migrationsFolder: 'drizzle',
    });
    return db;
}