export interface PackingList {
	title: string;
	items: ListItem[];
}

export interface ListItem {
	title: string;
	order: number;
	quantity?: number;
}
