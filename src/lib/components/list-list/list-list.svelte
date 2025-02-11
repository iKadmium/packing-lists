<script lang="ts">
	import type { List } from '$lib/models/list-list';
	import Button from '../button/button.svelte';
	import DeleteIcon from 'virtual:icons/mdi/delete';
	import EditIcon from 'virtual:icons/mdi/pencil';
	import AddIcon from 'virtual:icons/mdi/create-new-folder';
	import Modal from '../modal/modal.svelte';
	import { fade } from 'svelte/transition';

	let { lists: listsInitial }: { lists: List[] } = $props();
	let lists = $state([...listsInitial]);
	let selectedList = $state<List | null>(null);
	let dialogRef: HTMLDialogElement | undefined = $state(undefined);
	let busy = $state(false);

	function handleDeleteClicked(list: List) {
		selectedList = list;
		dialogRef?.showModal();
	}

	function handleCancelClick() {
		dialogRef?.close();
		selectedList = null;
	}

	async function handleDeleteConfirm() {
		busy = true;
		const list = selectedList;
		if (!list) {
			return;
		}
		await new Promise((r) => setTimeout(r, 1000));
		await fetch(`/api/list/${list.id}`, { method: 'DELETE' });
		lists = lists.filter((l) => l.id !== list.id);
		busy = false;
		dialogRef?.close();
	}
</script>

<div class="container">
	{#if lists.length === 0}
		<p>No lists found</p>
	{/if}

	<div class="list-grid">
		{#each lists as list}
			<div class="list-row" transition:fade>
				<Button elementType="a" href={`/list/${list.id}`}>{list.title}</Button>
				<Button elementType="a" color="edit" href={`/list/${list.id}/edit`}><EditIcon /></Button>
				<Button
					color="delete"
					busy={busy && selectedList === list}
					onclick={() => handleDeleteClicked(list)}
				>
					<DeleteIcon />
				</Button>
			</div>
		{/each}
	</div>

	<Button elementType="a" href="list/new"><AddIcon /></Button>
</div>

<Modal oncancel={handleCancelClick} bind:dialogRef>
	{#snippet message()}
		Are you sure you want to delete {selectedList?.title}? This action cannot be undone.
	{/snippet}
	{#snippet actions()}
		<Button color="delete" onclick={handleDeleteConfirm} {busy}>Delete</Button>
	{/snippet}
</Modal>

<style>
	.list-grid {
		display: grid;
		gap: 1rem;
		width: 100%;
		align-items: center;
	}

	.list-row {
		display: grid;
		gap: 1rem;
		grid-template-columns: 1fr auto auto;
		grid-template-rows: subgrid;
	}

	.container {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		align-items: flex-start;
		width: 100%;
	}
</style>
