<script lang="ts">
	import { browser } from '$app/environment';

	const { children, theme } = $props();
	if (browser) {
		document.body.className = `${theme}-theme`;
	}
</script>

<svelte:head>
	<link rel="stylesheet" href={`/theme/${theme}.css`} />
</svelte:head>

<div class="main-container">
	{@render children?.()}
</div>

<style>
	.main-container {
		display: flex;
		flex-direction: column;
		align-items: center;
		min-height: 100vh;
		padding: 0 2rem;

		max-width: 800px;
		margin: 0 auto;
	}

	:global(body) {
		color: var(--text);
		background-color: var(--base);
	}
</style>
