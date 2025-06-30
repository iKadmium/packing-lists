import type { PackingList } from '$lib/models/list-list';
import { listDataSource } from '$lib/server';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad<{ entry: PackingList }> = async ({ params }) => {
	const listId = params.id;

	if (!listId) {
		error(400, { message: 'List ID is required' });
	}

	const listResult = await listDataSource.get(listId);

	if (!listResult) {
		error(404, { message: `List with ID ${listId} not found` });
	}

	return {
		entry: listResult
	};
};
