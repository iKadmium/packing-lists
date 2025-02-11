<script lang="ts">
	import type { Snippet } from 'svelte';
	import LoadingIcon from 'virtual:icons/line-md/loading-loop';

	export interface ButtonProps {
		elementType?: ButtonElementType;
		busy?: boolean;
		onclick?: () => unknown | Promise<unknown>;
		href?: string;
		children?: Snippet;
		color?: ButtonColor;
	}

	export type ButtonColor = 'primary' | 'delete' | 'edit' | 'success';
	export type ButtonElementType = 'a' | 'button' | 'submit';

	let { elementType, onclick, href, children, color, busy }: ButtonProps = $props();

	function getHsl(
		color: ButtonColor | undefined,
		elementType: ButtonElementType | undefined
	): string {
		if (elementType === 'submit') {
			return 'var(--green)';
		}

		switch (color) {
			default:
			case 'primary':
				return 'var(--sky)';
			case 'delete':
				return 'var(--red)';
			case 'edit':
				return 'var(--yellow)';
			case 'success':
				return 'var(--green)';
		}
	}

	const buttonColor = $derived(getHsl(color, elementType));
</script>

{#if elementType === 'a'}
	<a class="button" style={`--button-color: ${buttonColor};`} {href}>{@render children?.()} </a>
{:else}
	<button
		class="button"
		type={elementType === 'submit' ? 'submit' : 'button'}
		style={`--button-color: ${buttonColor};`}
		disabled={busy}
		onclick={() => onclick?.()}
	>
		{#if busy}
			<LoadingIcon />
		{:else}
			{@render children?.()}
		{/if}
	</button>
{/if}

<style>
	.button:not(:disabled) {
		cursor: pointer;
	}

	.button:disabled {
		background-color: hsl(from var(--button-color) h 0% l);
	}

	.button {
		display: flex;
		padding: 0.5rem 1rem;
		border: 1px solid var(--text);
		border-radius: 1rem;

		align-items: center;
		color: var(--crust);
		font-weight: bold;
		font-size: 24px;
		text-decoration: none;
		background-color: var(--button-color);

		&:not(:disabled):hover {
			background-color: hsl(from var(--button-color) h 100% calc(l * 0.9));
		}
	}
</style>
