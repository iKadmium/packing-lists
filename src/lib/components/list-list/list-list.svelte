<script lang="ts">
	import type { List } from '$lib/models/list-list';
	import Button from '../button/button.svelte';
	import DeleteIcon from 'virtual:icons/mdi/delete';
	import EditIcon from 'virtual:icons/mdi/pencil';
	import AddIcon from 'virtual:icons/mdi/create-new-folder';
	import Modal from '../modal/modal.svelte';

	let { lists: listsInitial }: { lists: List[] } = $props();
	let lists = $state([...listsInitial]);
	let selectedList = $state<List | null>(null);
	let dialogRef: HTMLDialogElement | undefined = $state(undefined);

	function handleDeleteClicked(list: List) {
		selectedList = list;
		dialogRef?.showModal();
	}

	function handleCancelClick() {
		dialogRef?.close();
		selectedList = null;
	}

	async function handleDeleteConfirm() {
		dialogRef?.close();
		const list = selectedList;
		if (!list) {
			return;
		}
		await fetch(`/api/list/${list.id}`, { method: 'DELETE' });
		lists = lists.filter((l) => l.id !== list.id);
	}
</script>

<div class="container">
	{#if lists.length === 0}
		<p>No lists found</p>
	{/if}

	<div class="list-grid">
		{#each lists as list}
			<Button elementType="a" href={`/list/${list.id}`}>{list.title}</Button>
			<Button elementType="a" color="edit" href={`/list/${list.id}/edit`}><EditIcon /></Button>
			<Button color="delete" onclick={() => handleDeleteClicked(list)}><DeleteIcon /></Button>
		{/each}
	</div>

	<Button elementType="a" href="list/new"><AddIcon /></Button>
</div>

<Modal oncancel={handleCancelClick} bind:dialogRef>
	{#snippet message()}
		Are you sure you want to delete {selectedList?.title}? This action cannot be undone.
	{/snippet}
	{#snippet actions()}
		<Button color="delete" onclick={handleDeleteConfirm}>Delete</Button>
	{/snippet}
</Modal>

<style>
	.list-grid {
		display: grid;
		grid-template-columns: 1fr auto auto;
		gap: 1rem;
		width: 100%;
		align-items: center;
	}

	.container {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		align-items: flex-start;
		width: 100%;
	}
</style>
