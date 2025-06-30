export type NewPackingList = Omit<PackingList, 'id'>

export interface PackingList {
	id: string;
	title: string;
	items: ListItem[];
}

export interface ListItem {
	title: string;
	order: number;
}
