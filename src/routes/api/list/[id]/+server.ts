import type { ListWithEntries } from "$lib/models/list-list";
import { getDb } from "$lib/server/db";
import { listItems, lists } from "$lib/server/schema";
import { json } from "@sveltejs/kit";
import { eq } from "drizzle-orm";

export async function DELETE({ params }) {
    const db = getDb();
    const id = Number(params.id);
    await db.delete(listItems).where(eq(listItems.listId, id));
    await db.delete(lists).where(eq(lists.id, id));
    return new Response(null, { status: 204 });
}

export async function PUT({ request }) {
    const db = getDb();
    const list: ListWithEntries = await request.json();

    await db.update(lists).set({ title: list.title }).where(eq(lists.id, list.id as number));

    await db.delete(listItems).where(eq(listItems.listId, list.id as number));
    for (const item of list.items) {
        await db.insert(listItems).values({
            listId: list.id as number,
            title: item.title,
            order: item.order
        });
    }
    return json({ id: list.id });
}