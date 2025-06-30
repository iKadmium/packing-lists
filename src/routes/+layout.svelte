<script lang="ts" module>
	export type Theme = 'frappe' | 'mocha' | 'latte' | 'macchiato';
</script>

<script lang="ts">
	import MainContainer from '$lib/components/main-container/main-container.svelte';
	import { loggedInStore } from '$lib/logged-in-data-store';
	import type { LayoutProps } from './$types';

	let { children, data }: LayoutProps = $props();
	const themes: Theme[] = ['frappe', 'mocha', 'macchiato', 'latte'];
	let themeName = $state<Theme>(themes[0]);

	loggedInStore.set(data.loggedIn);
</script>

<MainContainer theme={themeName}>
	{@render children?.()}
</MainContainer>
