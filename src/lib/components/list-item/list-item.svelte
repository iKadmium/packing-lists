<script lang="ts">
	import type { ListItem } from '$lib/models/packing-list';
	import Button from '../button/button.svelte';

	let { item }: { item: ListItem } = $props();
	let quantityTotal = $state(item.quantity || 1);
	let quantityCompleted = $state(0);
	let completed = $derived(quantityCompleted >= quantityTotal);

	function handleChange(event: Event) {
		const target = event.target as HTMLInputElement;
		if (target.checked) {
			quantityCompleted = item.quantity || 1;
		} else {
			quantityCompleted = 0;
		}
	}
</script>

<div class="list-item">
	<div class="quantity-controls">
		<label class:checked={completed}><input type="checkbox" class="item-checkbox" value={completed} onchange={handleChange} />{item.title}</label>

		{#if item.quantity && item.quantity > 1}
			<Button disabled={quantityCompleted === 0} color="delete" onclick={() => quantityCompleted--}>-</Button>
			<span class="quantity">{quantityCompleted} / {item.quantity}</span>
			<Button disabled={item.quantity ? quantityCompleted >= item.quantity : false} color="success" onclick={() => quantityCompleted++}>+</Button>
		{/if}
	</div>
</div>

<style>
	.quantity-controls {
		display: flex;
		gap: 1rem;
		align-items: center;
	}

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
