<script lang="ts">
	import type { PackingList } from '$lib/models/packing-list';
	import ListItem from '../list-item/list-item.svelte';

	let { entry }: { entry: PackingList } = $props();
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
		width: 100%;

		padding: 1rem;
		border: 1px solid var(--text);
		border-radius: 1rem;
		box-sizing: border-box;
	}

	.container {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		width: 100%;
	}
</style>
