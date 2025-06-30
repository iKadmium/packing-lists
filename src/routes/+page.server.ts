import type { Database } from '$lib/models/database';
import type { PackingList } from '$lib/models/list-list';
import { listDataSource } from '$lib/server';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad<{ lists: Database<PackingList> }> = async () => {
	const listResult = await listDataSource.getAll();

	return {
		lists: listResult
	};
};
