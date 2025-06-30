import { listDataSource } from '$lib/server/index.js';
import { json } from '@sveltejs/kit';

export async function POST({ request }) {
	const packingList = await request.json();
	const id = await listDataSource.post(packingList);

	return json({ id });
}
