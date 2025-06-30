<script lang="ts">
	import { goto } from '$app/navigation';
	import ListEditor from '$lib/components/list-editor/list-editor.svelte';
	import type { PackingList } from '$lib/models/packing-list';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	async function handleSubmit(list: PackingList) {
		await fetch(`/api/list/${data.id}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(list)
		});
		await goto(`/`);
	}
</script>

<h1>{data.entry.title}</h1>
<ListEditor initial={data.entry} onSubmit={handleSubmit} />
