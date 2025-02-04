<script lang="ts">
	const { children, theme } = $props();
</script>

<svelte:head>
	<link rel="stylesheet" href={`/theme/${theme}.css`} />
</svelte:head>

<div class={`main-container ${theme}-theme`}>
	{@render children?.()}
</div>

<style>
	.main-container {
		display: flex;
		flex-direction: column;
		align-items: center;
		min-height: 100vh;
		padding: 0 2rem;

		color: var(--text);
		background-color: var(--base);
	}
</style>
