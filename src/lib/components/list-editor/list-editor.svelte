<script lang="ts">
	import { goto } from '$app/navigation';
	import { flip } from 'svelte/animate';
	import { fade, fly } from 'svelte/transition';
	import CancelIcon from 'virtual:icons/mdi/cancel';
	import SaveIcon from 'virtual:icons/mdi/content-save';
	import AddIcon from 'virtual:icons/mdi/create-new-folder';
	import DeleteIcon from 'virtual:icons/mdi/delete';
	import Button from '../button/button.svelte';
	import Draggable from '../draggable/draggable.svelte';
	import Modal from '../modal/modal.svelte';
	import type { PackingList } from '$lib/models/packing-list';

	let {
		initial,
		onSubmit
	}: {
		initial?: PackingList;
		onSubmit: (list: PackingList) => unknown | Promise<unknown>;
	} = $props();

	const list = $state<PackingList>(initial || { title: '', items: [{ title: '', order: 0, quantity: 1 }] });
	let dialogRef: HTMLDialogElement | undefined = $state(undefined);
	let draggingIndex: number | undefined = $state(undefined);
	let draggingTargetIndex: number | undefined = $state(undefined);
	let itemsRef: HTMLDivElement | undefined = $state(undefined);
	let busy = $state(false);

	async function handleSubmit(event: SubmitEvent & { currentTarget: EventTarget & HTMLFormElement }) {
		event.preventDefault();
		try {
			const newList = $state.snapshot(list);
			newList.items.forEach((item, i) => (item.order = i));
			busy = true;
			await onSubmit(newList);
		} catch (error) {
			console.error('Error submitting list:', error);
		} finally {
			busy = false;
		}
	}

	function handleRemoveItem(i: number) {
		list.items.splice(i, 1);
	}

	function handleReturnClick() {
		dialogRef?.showModal();
	}

	function handleCancelClick() {
		dialogRef?.close();
	}

	async function handleReturnConfirm() {
		await goto('/');
	}

	function getMiddle(element: HTMLElement) {
		const rect = element.getBoundingClientRect();
		return rect.top + rect.height / 2;
	}

	function onDragMove(y: number, _index: number) {
		if (!itemsRef) return;
		const childElements = Array.from(itemsRef.querySelectorAll<HTMLDivElement>('.list-item'));

		const closest = childElements.reduce((prev, curr) => (Math.abs(getMiddle(curr) - y) < Math.abs(getMiddle(prev) - y) ? curr : prev));
		if (y < getMiddle(closest)) {
			draggingTargetIndex = childElements.indexOf(closest);
		} else {
			draggingTargetIndex = childElements.indexOf(closest) + 1;
		}
	}

	function onDragStart(index: number) {
		draggingIndex = index;
	}

	function onDragEnd(_y: number) {
		if (draggingIndex !== undefined && draggingTargetIndex !== undefined) {
			const removedItem = list.items.splice(draggingIndex, 1)[0];
			const adjustedIndex = draggingTargetIndex > draggingIndex ? draggingTargetIndex - 1 : draggingTargetIndex;
			list.items.splice(adjustedIndex, 0, removedItem);
		}
		draggingIndex = undefined;
		draggingTargetIndex = undefined;
	}
</script>

<form class="list-editor" onsubmit={handleSubmit}>
	<div class="titled-row">
		<label for="title"> Title:</label>
		<input name="title" class="input" type="text" bind:value={list.title} />
	</div>

	<h2>Items</h2>
	<div class="items" bind:this={itemsRef}>
		{#each list.items as item, i (item.order)}
			<div class="item-container" animate:flip={{ duration: 300 }} transition:fly={{ duration: 300 }}>
				{#if draggingTargetIndex === i}
					<div class="drag-target" in:fade={{ duration: 200 }}></div>
				{/if}
				<div class="list-item" class:dragging={draggingIndex === i}>
					<Draggable onmove={(y) => onDragMove(y, i)} onstart={() => onDragStart(i)} onend={(y) => onDragEnd(y)} />
					<input type="number" class="input number-input" bind:value={list.items[i].quantity} min="0" />
					<input type="text" class="input" bind:value={list.items[i].title} />
					<Button color="delete" onclick={() => handleRemoveItem(i)}><DeleteIcon /></Button>
				</div>
			</div>
		{/each}
		{#if draggingTargetIndex === list.items.length}
			<div class="drag-target"></div>
		{/if}
	</div>

	<div class="actions">
		<Button onclick={() => list.items.push({ title: '', order: list.items.length, quantity: 1 })} elementType="button">
			<AddIcon />
		</Button>
		<Button {busy} elementType="submit"><SaveIcon /></Button>
		<Button elementType="button" color="delete" onclick={handleReturnClick}>
			<CancelIcon />
		</Button>
	</div>
</form>

<Modal oncancel={handleCancelClick} bind:dialogRef>
	{#snippet message()}
		Are you sure you want to cancel and return to the menu? All changes will be lost.
	{/snippet}
	{#snippet actions()}
		<Button color="delete" onclick={handleReturnConfirm}>Return</Button>
	{/snippet}
</Modal>

<style>
	.drag-target {
		height: 5px;
		background-color: var(--peach);
		width: 100%;
	}

	.actions {
		display: flex;
		flex-direction: row;
		gap: 0.5rem;
		margin-top: 1rem;
	}

	.items {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.list-editor {
		display: flex;
		flex-direction: column;
		width: 100%;
	}

	.list-item {
		display: flex;
		align-items: stretch;
		gap: 0.5rem;
		border-radius: 0.5rem;
		border-width: 1px;
		border-style: solid;
		border-color: transparent;
	}

	.dragging {
		background-color: var(--surface1);
		border-color: var(--peach);
	}

	.titled-row {
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}

	.item-container {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.input {
		flex: 1;
		border: 1px solid var(--text);
		border-radius: 0.5rem;
		padding: 0.5rem;
		display: flex;

		background-color: var(--surface0);
		color: var(--text);
		font-size: 20px;
	}

	.number-input {
		flex: 0;
		width: 4rem;
	}

	h2 {
		margin: 0.5rem 0;
		font-size: large;
	}
</style>
