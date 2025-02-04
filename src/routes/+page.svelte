<script lang="ts">
	import ListList from '../lib/components/list-list/list-list.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<h1>Packing Lists</h1>
<ListList lists={data.lists} />
