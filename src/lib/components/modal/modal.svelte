<script lang="ts">
	import type { Snippet } from 'svelte';
	import Button from '../button/button.svelte';
	import { fade, fly } from 'svelte/transition';

	interface ModalProps {
		message: Snippet<[]>;
		oncancel: () => unknown;
		actions: Snippet<[]>;
		dialogRef?: HTMLDialogElement;
	}

	let { message, actions, oncancel, dialogRef = $bindable() }: ModalProps = $props();

	function handleClick(event: MouseEvent) {
		if (event.target === dialogRef) {
			oncancel();
		}
	}
</script>

<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
<!-- svelte-ignore a11y_click_events_have_key_events -->
<dialog class="modal" onclose={oncancel} bind:this={dialogRef} onclick={handleClick}>
	<div class="modal-content">
		<h2>{@render message()}</h2>
		<div class="modal-buttons">
			{@render actions?.()}
			<Button onclick={oncancel}>Cancel</Button>
		</div>
	</div>
</dialog>

<style>
	.modal {
		background: unset;
		border: unset;

		&::backdrop {
			background-color: hsl(from var(--crust) h s l / 50%);
		}
	}

	.modal[open] {
		animation: slide-up 300ms ease-in-out;
	}

	.modal-content {
		background-color: var(--crust);
		border: 1px solid var(--text);
		border-radius: 1rem;
		color: var(--text);
		margin: 1rem;
		padding: 1.5rem;
		transition: opacity 2s;

		h2 {
			margin: 0 0 1rem;
		}
	}

	.modal-buttons {
		display: flex;
		justify-content: flex-end;
		gap: 1rem;
	}

	@keyframes slide-up {
		from {
			/* transform: translateY(100px); */
			opacity: 0;
		}
		to {
			/* transform: translateY(0); */
			opacity: 1;
		}
	}
</style>
