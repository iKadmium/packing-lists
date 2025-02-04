<script lang="ts">
	import type { Snippet } from 'svelte';

	export interface ButtonProps {
		elementType?: 'a' | 'button' | 'submit';
		onclick?: () => unknown | Promise<unknown>;
		href?: string;
		children?: Snippet;
		color?: 'primary' | 'delete' | 'edit';
	}
	let { elementType, onclick, href, children, color }: ButtonProps = $props();
</script>

{#if elementType === 'a'}
	<a
		class="button"
		class:primary={color === 'primary' || !color}
		class:edit={color === 'edit'}
		{href}
		>{@render children?.()}
	</a>
{:else if elementType === 'submit'}
	<button class="button success" type="submit">{@render children?.()}</button>
{:else}
	<button
		class="button"
		class:primary={color === 'primary' || !color}
		class:delete={color === 'delete'}
		type="button"
		onclick={() => onclick?.()}>{@render children?.()}</button
	>
{/if}

<style>
	.button {
		border: 1px solid var(--text);
		border-radius: 1rem;
		cursor: pointer;
		display: flex;
		align-items: center;
		color: var(--crust);
		font-weight: bold;
		font-size: 24px;

		padding: 0.5rem 1rem;

		text-decoration: none;
	}

	.primary {
		background-color: var(--sky);
	}

	.delete {
		background-color: var(--red);
	}

	.edit {
		background-color: var(--yellow);
	}

	.success {
		background-color: var(--green);
	}
</style>
