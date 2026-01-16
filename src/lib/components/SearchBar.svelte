<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';

	let query = '';
	let lastUrlQuery: string | null = null;
	let debounceTimer: ReturnType<typeof setTimeout> | null = null;
	const DEBOUNCE_MS = 400;

	// Sync from URL → input
	$: {
		const current = $page.url.searchParams.get('query');
		if (current !== lastUrlQuery) {
			lastUrlQuery = current;
			query = current ?? '';
		}
	}

	function navigate(value: string) {
		const params = new URLSearchParams($page.url.searchParams);

		if (value.trim()) {
			params.set('query', value);
			params.delete('genre'); // ✅ clear genre when searching
			params.set('page', '1');
		} else {
			params.delete('query');
			params.set('page', '1');
		}

		goto(`/?${params.toString()}`);
	}

	function onInput() {
		if (debounceTimer) clearTimeout(debounceTimer);

		debounceTimer = setTimeout(() => {
			navigate(query);
		}, DEBOUNCE_MS);
	}

	function onSubmit() {
		if (debounceTimer) clearTimeout(debounceTimer);
		navigate(query);
	}
</script>

<form
	on:submit|preventDefault={onSubmit}
	class="flex items-center overflow-hidden rounded-md border border-neutral-700 bg-neutral-800"
>
	<input
		type="search"
		placeholder="Search movies…"
		bind:value={query}
		on:input={onInput}
		class="w-56 bg-transparent px-3 py-2 text-sm text-neutral-100 placeholder:text-neutral-400 focus:outline-none"
	/>

	<button
		type="submit"
		class="border-l border-neutral-700 bg-neutral-700 px-4 py-2 text-sm font-medium text-neutral-100 hover:bg-neutral-600"
	>
		Search
	</button>
</form>
