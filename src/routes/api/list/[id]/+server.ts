import { listDataSource } from '$lib/server/index.js';
import { json } from '@sveltejs/kit';

export async function DELETE({ params }) {
	const id = params.id;
	await listDataSource.delete(id);

	return new Response(null, { status: 204 });
}

export async function PUT({ request }) {
	const packingList = await request.json();
	await listDataSource.put(packingList.id, packingList);

	return json({ id: packingList.id });
}
