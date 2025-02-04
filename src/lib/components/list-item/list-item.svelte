<script lang="ts">
	import type { ListItem } from '$lib/models/list-list';

	let { item }: { item: ListItem } = $props();
</script>

<div class="list-item">
	<label><input type="checkbox" class="item-checkbox" />{item.title}</label>
</div>

<style>
	.list-item {
		font-size: xx-large;
		text-decoration: none;
	}

	.item-checkbox {
		margin-right: 1rem;
		width: 1.5rem;
		height: 1.5rem;
	}
</style>
