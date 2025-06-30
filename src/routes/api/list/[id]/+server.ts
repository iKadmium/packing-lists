import { listDataSource } from '$lib/server/index.js';
import { json } from '@sveltejs/kit';

export async function DELETE({ params }) {
	const id = params.id;
	if (!id) {
		return new Response('ID is required', { status: 400 });
	}
	await listDataSource.delete(id);

	return new Response(null, { status: 204 });
}

export async function PUT({ request, params }) {
	const id = params.id;
	if (!id) {
		return new Response('ID is required', { status: 400 });
	}
	const packingList = await request.json();
	await listDataSource.put(id, packingList);

	return json({ id: packingList.id });
}
