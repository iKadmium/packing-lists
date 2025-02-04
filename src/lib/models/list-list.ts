export interface List {
    id?: number | bigint;
    title: string;
}

export interface ListItem {
    id?: number | bigint;
    listId?: number | bigint;
    title: string;
    order: number;
}

export interface ListWithEntries extends List {
    items: ListItem[];
}