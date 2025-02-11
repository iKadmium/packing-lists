<script lang="ts" module>
	export type Theme = 'frappe' | 'mocha' | 'latte' | 'macchiato';
</script>

<script lang="ts">
	import MainContainer from '$lib/components/main-container/main-container.svelte';

	let { children } = $props();
	const themes: Theme[] = ['frappe', 'mocha', 'macchiato', 'latte'];
	let themeName = $state<Theme>(themes[0]);
</script>

<MainContainer theme={themeName}>
	{@render children?.()}
</MainContainer>
