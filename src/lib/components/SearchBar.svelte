<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';

	let query = '';
	let lastUrlQuery: string | null = null;
	let debounceTimer: ReturnType<typeof setTimeout> | null = null;
	const DEBOUNCE_MS = 400;

	// Sync input from URL (but don’t fight user typing)
	$: {
		const current = $page.url.searchParams.get('query');
		if (current !== lastUrlQuery) {
			lastUrlQuery = current;
			query = current ?? '';
		}
	}

	function navigate(value: string) {
		if (!value.trim()) {
			goto('/');
		} else {
			const params = new URLSearchParams($page.url.searchParams);
			params.set('query', query);
			params.set('page', '1');
			goto(`/?${params.toString()}`);
		}
	}

	function onInput() {
		if (debounceTimer) {
			clearTimeout(debounceTimer);
		}

		debounceTimer = setTimeout(() => {
			navigate(query);
		}, DEBOUNCE_MS);
	}

	function onSubmit() {
		if (debounceTimer) {
			clearTimeout(debounceTimer);
		}

		navigate(query);
	}
</script>

<form on:submit|preventDefault={onSubmit} class="flex max-w-xl gap-2">
	<input
		type="search"
		placeholder="Search movies..."
		bind:value={query}
		on:input={onInput}
		class="flex-1 rounded border px-3 py-2"
	/>

	<button type="submit" class="rounded bg-black px-4 py-2 text-white"> Search </button>
</form>
