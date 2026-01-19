<script lang="ts">
	import { beforeNavigate, afterNavigate } from '$app/navigation';
	import { Clapperboard } from 'lucide-svelte';

	import SearchBar from '$lib/components/SearchBar.svelte';
	import GenreFilter from '$lib/components/GenreFilter.svelte';
	import Pagination from '$lib/components/Pagination.svelte';
	import MovieCard from '$lib/components/MovieCard.svelte';

	// ✅ Svelte 5 props
	const { data } = $props<{ data: any }>();

	// ✅ Svelte 5 state
	let isLoading = $state(false);

	beforeNavigate(() => {
		isLoading = true;
	});

	afterNavigate(() => {
		isLoading = false;
	});
</script>

<div class="min-h-screen bg-neutral-900 text-neutral-100">
	<header class="border-b border-neutral-800 bg-neutral-900">
		<div class="mx-auto flex max-w-7xl flex-wrap items-center gap-4 p-4">
			<h1 class="mr-auto flex items-center gap-2 text-lg font-semibold tracking-tight">
				<Clapperboard class="h-5 w-5 text-neutral-200" />
				<span>Reel Search App</span>
			</h1>

			<div class="flex flex-wrap items-center gap-3">
				<SearchBar />
				<GenreFilter />
			</div>
		</div>
	</header>

	<main class="mx-auto max-w-7xl p-4">
		{#if data.error}
			<div class="mt-6 rounded-md border border-red-800 bg-red-900/30 p-4 text-red-200">
				<p class="font-medium">Something went wrong</p>
				<p class="mt-1 text-sm">{data.error}</p>

				<button
					class="mt-3 rounded-md border border-red-700 bg-red-800 px-3 py-1.5 text-sm hover:bg-red-700"
					onclick={() => location.reload()}
				>
					Retry
				</button>
			</div>
		{:else if isLoading}
			<p class="mt-6 text-neutral-400">Loading results…</p>
		{:else if data.results.length === 0}
			<p class="mt-6 text-neutral-400">No results found. Try a different search or filter.</p>
		{:else}
			<!-- ✅ RESULT META GRID -->
			<div class="mb-4 grid grid-cols-1 gap-2 text-sm text-neutral-400 sm:grid-cols-2">
				<div class="text-left">
					Page {data.page} of {data.totalPages} — showing {data.results.length} results
				</div>

				<div class="text-left sm:text-right">
					{#if data.mode === 'top-rated'}
						Top‑rated movies
					{:else if data.mode === 'search'}
						Search results
					{:else if data.mode === 'genre'}
						Browsing by genre
					{/if}
				</div>
			</div>

			<div class="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
				{#each data.results as movie}
					<MovieCard {movie} />
				{/each}
			</div>

			<div class="mt-8">
				<Pagination currentPage={data.page} totalPages={data.totalPages} />
			</div>
		{/if}
	</main>
</div>
