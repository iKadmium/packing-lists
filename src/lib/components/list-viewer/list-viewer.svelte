<script lang="ts">
	import type { ListWithEntries } from '$lib/models/list-list';
	import ListItem from '../list-item/list-item.svelte';

	let { entry }: { entry: ListWithEntries } = $props();
</script>

<div class="container">
	<div class="list-item-list">
		{#if entry.items.length === 0}
			<p>No items found</p>
		{/if}

		{#each entry.items as item}
			<ListItem {item} />
		{/each}
	</div>
</div>

<style>
	.list-item-list {
		display: flex;
		flex-direction: column;
		gap: 1rem;

		padding: 1rem;
		border: 1px solid var(--text);
		border-radius: 1rem;
	}

	.container {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}
</style>
