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
		display: flex;
		padding: 0.5rem 1rem;
		border: 1px solid var(--text);
		border-radius: 1rem;
		cursor: pointer;
		align-items: center;
		color: var(--crust);
		font-weight: bold;
		font-size: 24px;
		text-decoration: none;
	}

	.primary {
		background-color: var(--sky);
		&:hover {
			background-color: hsl(from var(--sky) h s l / 80%);
		}
	}

	.delete {
		background-color: var(--red);
		&:hover {
			background-color: hsl(from var(--red) h s l / 80%);
		}
	}

	.edit {
		background-color: var(--yellow);
		&:hover {
			background-color: hsl(from var(--yellow) h s l / 80%);
		}
	}

	.success {
		background-color: var(--green);
		&:hover {
			background-color: hsl(from var(--green) h s l / 80%);
		}
	}
</style>
