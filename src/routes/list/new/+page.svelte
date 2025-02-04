<script lang="ts">
	import { goto } from '$app/navigation';
	import ListEditor from '$lib/components/list-editor/list-editor.svelte';
	import type { ListWithEntries } from '$lib/models/list-list';

	let list = $state<ListWithEntries>({ title: '', items: [] });

	async function handleSubmit(list: ListWithEntries) {
		const result = await fetch('/api/list', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(list)
		});
		const body = (await result.json()) as { id: number };
		await goto(`/`);
	}
</script>

<h1>New List</h1>
<ListEditor onSubmit={handleSubmit} />
