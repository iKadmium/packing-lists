<script lang="ts">
	import type { ListItem } from '$lib/models/list-list';

	let { item }: { item: ListItem } = $props();
	let checked = $state(false);
</script>

<div class="list-item">
	<label class:checked>
		<input type="checkbox" class="item-checkbox" bind:checked />
		{item.title}
	</label>
</div>

<style>
	.list-item {
		font-size: xx-large;
		text-decoration: none;
	}

	.checked {
		text-decoration: line-through;
	}

	.item-checkbox {
		margin-right: 1rem;
		width: 1.5rem;
		height: 1.5rem;
	}
</style>
