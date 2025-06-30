<script lang="ts">
	import { goto } from '$app/navigation';
	import Button from '$lib/components/button/button.svelte';
	import { loggedInStore } from '$lib/logged-in-data-store';

	let password = $state('');
	let loading = $state(false);
	let error = $state('');

	async function handleLogin() {
		if (!password.trim()) {
			error = 'Please enter a password';
			return;
		}

		loading = true;
		error = '';

		try {
			const response = await fetch('/api/auth/login', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ password })
			});

			if (!response.ok) {
				throw new Error('Invalid password');
			}

			loggedInStore.set(true);

			// Redirect to home page or dashboard
			await goto('/');
		} catch (err) {
			error = err instanceof Error ? err.message : 'Login failed';
		} finally {
			loading = false;
		}
	}

	async function handleLogout() {
		loading = true;
		error = '';

		try {
			const response = await fetch('/api/auth/logout', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				}
			});

			if (!response.ok) {
				throw new Error('Logout failed');
			}

			loggedInStore.set(false);

			// Redirect to home page or dashboard
			await goto('/');
		} catch (err) {
			error = err instanceof Error ? err.message : 'Logout failed';
		} finally {
			loading = false;
		}
	}

	function handleKeyPress(event: KeyboardEvent) {
		if (event.key === 'Enter') {
			handleLogin();
		}
	}
</script>

<div class="login-page">
	<div class="login-container">
		{#if $loggedInStore}
			<p>You are currently logged in</p>
		{:else}
			<label for="password">Password</label>
			<input
				type="password"
				id="password"
				bind:value={password}
				placeholder="Enter admin password"
				onkeypress={handleKeyPress}
				disabled={loading}
			/>
		{/if}
		{#if error}
			<span class="danger">
				{error}
			</span>
		{/if}

		<div>
			{#if $loggedInStore}
				<Button color="primary" onclick={handleLogout}>
					{loading ? 'Logging out...' : 'Log out'}
				</Button>
			{:else}
				<Button color="primary" onclick={handleLogin}>
					{loading ? 'Logging in...' : 'Login'}
				</Button>
			{/if}
		</div>
	</div>
</div>

<style>
	.login-page {
		display: flex;
		align-items: center;
		justify-content: center;
		min-height: 100vh;
		width: 100%;
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
	}

	.danger {
		color: var(--red);
	}

	.login-container {
		width: 100%;
		max-width: 400px;
		padding: 20px;
		border: 1px solid var(--primary);
		border-radius: 8px;
		background-color: var(--surface0);
		box-sizing: border-box;
	}

	input[type='password'] {
		width: 100%;
		padding: 10px;
		margin-bottom: 10px;
		border: 1px solid var(--primary);
		border-radius: 4px;
		box-sizing: border-box;
	}
</style>
