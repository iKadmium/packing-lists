<script lang="ts">
	import MainContainer from '$lib/components/main-container/main-container.svelte';

	let { children } = $props();
	let themeName = `frappe`;
</script>

<MainContainer theme={themeName}>
	{@render children?.()}
</MainContainer>
