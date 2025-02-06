import { getDb } from '$lib/server/db';
import type { ServerInit } from '@sveltejs/kit';
import { migrate } from 'drizzle-orm/better-sqlite3/migrator';

export const init: ServerInit = async () => {
    const db = getDb();
    migrate(db, {
        migrationsFolder: 'drizzle',
    });
};
