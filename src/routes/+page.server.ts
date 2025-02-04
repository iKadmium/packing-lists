import type { List } from "$lib/models/list-list";
import { getDb } from "$lib/server/db";
import { lists } from "$lib/server/schema";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad<{ lists: List[] }> = async () => {
    const db = getDb();
    const listSet = await db.select()
        .from(lists);
    return {
        lists: listSet
    };
};
