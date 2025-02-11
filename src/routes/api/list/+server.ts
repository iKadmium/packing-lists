import type { ListWithEntries } from "$lib/models/list-list";
import { getDb } from "$lib/server/db";
import { listItems, lists } from "$lib/server/schema";
import { json } from "@sveltejs/kit";

export async function POST({ request }) {
    const db = getDb();
    const list: ListWithEntries = await request.json();

    let id: number | bigint | undefined;
    await db.transaction(async (tx) => {
        const listResult = await tx.insert(lists).values({
            title: list.title
        });
        id = listResult.lastInsertRowid;
        for (const item of list.items) {
            await tx.insert(listItems).values({
                listId: id as number,
                title: item.title,
                order: item.order
            });
        }
    });
    return json({ id });
}
