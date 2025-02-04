import { getDb } from "$lib/server/db";
import { listItems, lists } from "$lib/server/schema";
import { eq } from "drizzle-orm";
import type { ListWithEntries } from "$lib/models/list-list";
import type { PageServerLoad } from "./$types";
import { error } from "@sveltejs/kit";

export const load: PageServerLoad<{ entry: ListWithEntries }> = async ({ params }) => {
    const listId = parseInt(params.id);
    const db = getDb();
    const listResult = await db.select().from(lists).where(eq(lists.id, listId));
    if (listResult.length === 0) {
        error(404, { message: "List not found" });
    }

    const list = listResult[0];
    const itemsResult = await db.select().from(listItems).where(eq(listItems.listId, listId)).orderBy(listItems.order);

    return {
        entry: {
            ...list,
            items: itemsResult
        }
    };
};
