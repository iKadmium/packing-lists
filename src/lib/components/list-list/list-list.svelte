<script lang="ts">
	import { getDatabaseEntries } from '$lib/models/database';
	import type { PackingList } from '$lib/models/packing-list';
	import { fade } from 'svelte/transition';
	import AddIcon from 'virtual:icons/mdi/create-new-folder';
	import DeleteIcon from 'virtual:icons/mdi/delete';
	import EditIcon from 'virtual:icons/mdi/pencil';
	import Button from '../button/button.svelte';
	import Modal from '../modal/modal.svelte';

	export interface ListListProps {
		lists: Record<string, PackingList>;
	}

	let { lists: listsInitial }: { lists: Record<string, PackingList> } = $props();
	let lists = $state(listsInitial);
	let selectedListId = $state<string | null>(null);
	let selectedList = $derived<PackingList | null | undefined>(selectedListId ? lists[selectedListId] : null);
	let dialogRef: HTMLDialogElement | undefined = $state(undefined);
	let busy = $state(false);

	function handleDeleteClicked(id: string) {
		selectedListId = id;
		dialogRef?.showModal();
	}

	function handleCancelClick() {
		dialogRef?.close();
		selectedListId = null;
	}

	async function handleDeleteConfirm(id: string) {
		busy = true;
		const list = selectedList;
		if (!list) {
			return;
		}
		await new Promise((r) => setTimeout(r, 1000));
		await fetch(`/api/list/${id}`, { method: 'DELETE' });
		delete lists[id];
		busy = false;
		dialogRef?.close();
	}
</script>

<div class="container">
	{#if Object.keys(lists).length === 0}
		<p>No lists found</p>
	{/if}

	<div class="list-grid">
		{#each getDatabaseEntries(lists) as [key, list] (key)}
			<div class="list-row" transition:fade>
				<Button elementType="a" href={`/list/${key}`}>{list.title}</Button>
				<Button elementType="a" color="edit" href={`/list/${key}/edit`}><EditIcon /></Button>
				<Button color="delete" busy={busy && selectedListId === key} onclick={() => handleDeleteClicked(key)}>
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
		<Button color="delete" onclick={() => handleDeleteConfirm(selectedListId!)} {busy}>Delete</Button>
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
