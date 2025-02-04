import { sqliteTable, integer, text } from "drizzle-orm/sqlite-core"

export const lists = sqliteTable('lists', {
    id: integer().primaryKey({ autoIncrement: true }),
    title: text().notNull(),
});

export const listItems = sqliteTable('listItems', {
    id: integer().primaryKey({ autoIncrement: true }),
    listId: integer().notNull().references(() => lists.id),
    title: text().notNull(),
    order: integer().notNull(),
});

