<script lang="ts">
	import { browser } from '$app/environment';
	import { onDestroy, onMount } from 'svelte';
	import RightIcon from 'virtual:icons/mdi/chevron-right';

	let { onDragged }: { onDragged: () => void } = $props();

	let buttonX = $state(0);
	let buttonRef: HTMLButtonElement;
	let containerRef: HTMLDivElement;

	let minX = 0;
	let maxX = 0;
	let mouseDown = false;
	let backgroundMix = $state('0%');

	onMount(() => {
		minX = 0;
		maxX = containerRef.offsetWidth - buttonRef.offsetWidth;
		if (browser) {
			document?.addEventListener('mouseup', handleMouseUp);
		}
	});

	onDestroy(() => {
		if (browser) {
			document?.removeEventListener('mouseup', handleMouseUp);
		}
	});

	function handleMove(clientX: number) {
		setButtonX(clientX - containerRef.getBoundingClientRect().left - buttonRef.offsetWidth / 2);
	}

	function setButtonX(value: number) {
		buttonX = value;
		if (buttonX < minX) {
			buttonX = minX;
		}
		if (buttonX > maxX) {
			buttonX = maxX;
		}
		const mixpct = (buttonX / maxX) * 100;
		backgroundMix = `${mixpct}%`;
	}

	function handleEnd() {
		if (buttonX === maxX) {
			onDragged();
		} else {
			setButtonX(0);
		}
	}

	function handleTouchMove(event: TouchEvent) {
		handleMove(event.touches[0].clientX);
	}

	function handleTouchEnd(event: TouchEvent) {
		handleEnd();
	}

	function handleMouseDown(event: MouseEvent) {
		mouseDown = true;
	}
	function handleMouseUp(event: MouseEvent) {
		mouseDown = false;
		handleEnd();
	}
	function handleMouseMove(event: MouseEvent) {
		if (mouseDown) {
			handleMove(event.clientX);
		}
	}

	function handleBlur(event: FocusEvent) {
		mouseDown = false;
		handleEnd();
	}
</script>

<div class="dragbox-container" bind:this={containerRef} style={`--mixpct: ${backgroundMix};`}>
	<button
		class="dragbox"
		ontouchmove={handleTouchMove}
		ontouchend={handleTouchEnd}
		onmousedown={handleMouseDown}
		onmouseup={handleMouseUp}
		onmousemove={handleMouseMove}
		onblur={handleBlur}
		bind:this={buttonRef}
		style="transform: translateX({buttonX}px);"
		aria-label="Drag me"
		type="button"
	>
		<RightIcon />
	</button>
</div>

<style>
	.dragbox-container {
		--dragbox-size: 48px;

		display: flex;
		justify-content: left;
		align-items: center;
		border-radius: var(--dragbox-size);
		background-color: color-mix(in oklab, var(--crust), var(--text) var(--mixpct));
		border: 1px solid var(--text);

		width: 100%;
		margin: 1rem 0 1rem 0;
	}

	.dragbox {
		padding: 0;
		margin: 0;
		display: flex;
		border: 1px solid var(--text);
		background-color: var(--crust);
		border-radius: var(--dragbox-size);
		font-size: var(--dragbox-size);
		color: var(--text);
		cursor: pointer;
		touch-action: none;
	}
</style>
