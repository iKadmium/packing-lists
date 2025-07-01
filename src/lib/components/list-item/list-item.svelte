<script lang="ts">
	import type { ListItem } from '$lib/models/packing-list';
	import Button from '../button/button.svelte';

	let { item }: { item: ListItem } = $props();
	let quantityTotal = $state(item.quantity || 1);
	let quantityCompleted = $state(0);
	let isCompleted = $derived(quantityCompleted >= quantityTotal);

	let formId = $derived(`list-item-${item.order}`);

	function handleChange(event: Event) {
		const target = event.target as HTMLInputElement;
		if (target.checked) {
			quantityCompleted = item.quantity || 1;
		} else {
			quantityCompleted = 0;
		}
	}

	function handleAddClick() {
		if (quantityCompleted < (item.quantity || 1)) {
			quantityCompleted++;
		}
		console.log('Quantity completed:', quantityCompleted);
	}

	function handleRemoveClick() {
		if (quantityCompleted > 0) {
			quantityCompleted--;
		}
		console.log('Quantity completed:', quantityCompleted);
	}
</script>

{#if item.quantity === undefined || item.quantity === 1}
	<div class="list-item">
		<label class="single-item" class:checked={isCompleted}>
			<input type="checkbox" checked={isCompleted} class="item-checkbox" value={isCompleted} onchange={handleChange} />{item.title}
		</label>
	</div>
{:else}
	<div class="list-item">
		<input type="checkbox" checked={isCompleted} class="item-checkbox" value={isCompleted} onchange={handleChange} id={formId} name={formId} />

		<div class="item-inner">
			<div class="quantity-inner" class:checked={isCompleted}>
				<label for={formId} class="quantity">{item.quantity} {item.title}</label>
			</div>

			<div class="quantity-controls">
				<Button disabled={quantityCompleted === 0} color="delete" onclick={handleRemoveClick}>-</Button>
				<span>{quantityCompleted} / {item.quantity}</span>
				<Button disabled={item.quantity ? quantityCompleted >= item.quantity : false} color="success" onclick={handleAddClick}>+</Button>
			</div>
		</div>
	</div>
{/if}

<style>
	.quantity-controls {
		display: flex;
		gap: 1rem;
		align-items: center;
	}

	.quantity-inner {
		display: flex;
		flex-wrap: wrap;
		flex-direction: row;
		gap: 1rem;
	}

	.single-item {
		display: flex;
		align-items: center;

		& input {
			flex-shrink: 0;
		}
	}

	.list-item {
		font-size: xx-large;
		text-decoration: none;
		display: flex;
		flex-direction: row;
		align-items: center;
	}

	.item-inner {
		display: flex;
		flex-direction: row;
		align-items: center;
		width: 100%;
		justify-content: space-between;
	}

	@media (max-width: 600px) {
		.list-item {
			font-size: x-large;
		}

		.item-inner {
			flex-direction: column;
			align-items: flex-start;
		}
	}

	.checked {
		text-decoration: line-through;
		color: var(--overlay0);
	}

	.item-checkbox {
		margin-right: 1rem;
		width: 1.5rem;
		height: 1.5rem;
		flex-shrink: 0;
	}
</style>
