<script lang="ts">
	import { goto } from '$app/navigation';
	import Dragbox from '$lib/components/dragbox/dragbox.svelte';
	import ListViewer from '$lib/components/list-viewer/list-viewer.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	async function handleDragged() {
		await goto('/');
	}
</script>

<h1>{data.entry.title}</h1>
<ListViewer entry={data.entry} />
<Dragbox onDragged={() => handleDragged()} />
