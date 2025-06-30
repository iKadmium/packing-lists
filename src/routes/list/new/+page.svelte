<script lang="ts">
	import { goto } from '$app/navigation';
	import ListEditor from '$lib/components/list-editor/list-editor.svelte';
	import type { NewPackingList, PackingList } from '$lib/models/list-list';

	async function handleSubmit(list: PackingList | NewPackingList) {
		const result = await fetch('/api/list', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(list)
		});
		if (!result.ok) {
			throw new Error(`Failed to create list: ${result.statusText}`);
		}
		await goto(`/`);
	}
</script>

<h1>New List</h1>
<ListEditor onSubmit={handleSubmit} />
